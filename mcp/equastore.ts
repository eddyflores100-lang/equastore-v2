import { createHash } from 'node:crypto';
import { GoogleAuth } from 'google-auth-library';
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { z } from 'zod';
import { COUNTRY_CONFIGS, COUNTRY_CODE } from '../src/lib/countries';
import { getDropiClient } from '../src/lib/dropi/client';
import { MOCK_CATEGORIES } from '../src/lib/products/mock-data';
import type { Product } from '../src/types/product';

const country = COUNTRY_CODE.EC;
const repository = 'eddyflores100-lang/equastore-v2';
const catalogPath = 'src/lib/products/dropi-ecuador.json';
const catalogEndpoint = `https://api.github.com/repos/${repository}/contents/${catalogPath}`;
const liveCatalog = 'https://firestore.googleapis.com/v1/projects/equastore-a5155/databases/(default)/documents/products';
const firebaseAuth = new GoogleAuth({ scopes: ['https://www.googleapis.com/auth/datastore'] });
const dropi = getDropiClient();
const server = new McpServer({ name: 'equastore-dropi-ecuador', version: '1.0.0' });

const productId = z.number().int().positive().max(Number.MAX_SAFE_INTEGER);
const httpsImage = z.url({ protocol: /^https$/ }).max(2048);
const decimal = z.union([z.number(), z.string().regex(/^\d+(?:\.\d+)?$/)]).transform(Number);
const dropiItem = z.object({
  id: decimal.pipe(productId),
  name: z.string().trim().min(1).max(240),
  description: z.string().nullish(),
  sku: z.union([z.string(), z.number()]).nullish(),
  stock: decimal.nullish(),
  type: z.string().nullish(),
  sale_price: decimal.nullish(),
  suggested_price: decimal.nullish(),
  imageUrl: z.string().nullish(),
  image: z.string().nullish(),
  images: z.array(z.unknown()).nullish(),
  gallery: z.array(z.unknown()).nullish(),
});
const responseEnvelope = z.object({
  isSuccess: z.boolean().optional(),
  objects: z.unknown().optional(),
  object: z.unknown().optional(),
  data: z.unknown().optional(),
});

function unwrap(raw: unknown) {
  if (Array.isArray(raw)) return raw;
  const envelope = responseEnvelope.parse(raw);
  if (envelope.isSuccess === false) throw new Error('Dropi rechazó la consulta de catálogo.');
  return envelope.objects ?? envelope.object ?? envelope.data ?? raw;
}

function summarize(raw: unknown) {
  const item = dropiItem.parse(raw);
  const imageEntry = z.union([httpsImage, z.object({
    url: httpsImage.optional(),
    urlS3: httpsImage.optional(),
    image: httpsImage.optional(),
  })]);
  const images = [item.imageUrl, item.image, ...(item.images ?? []), ...(item.gallery ?? [])]
    .flatMap((rawImage) => {
      const value = imageEntry.safeParse(rawImage);
      if (!value.success) return [];
      const image = value.data;
      const url = typeof image === 'string' ? image : image.url ?? image.urlS3 ?? image.image;
      return url ? [url] : [];
    });

  return {
    id: item.id,
    title: item.name,
    description: (item.description ?? '').slice(0, 5000),
    sku: String(item.sku || item.id),
    stock: item.stock,
    type: item.type,
    supplierPrice: item.sale_price,
    suggestedPrice: item.suggested_price,
    images: [...new Set(images)].slice(0, 8),
  };
}

function reply(result: unknown) {
  return { content: [{ type: 'text' as const, text: JSON.stringify(result, null, 2) }] };
}

async function run(action: () => Promise<unknown>) {
  try {
    return reply(await action());
  } catch (error) {
    return {
      ...reply({ error: error instanceof z.ZodError ? 'Respuesta o datos con formato no compatible.' :
        error instanceof Error ? error.message : 'Error al procesar la solicitud.' }),
      isError: true,
    };
  }
}

const readOnly = { readOnlyHint: true, openWorldHint: true };

server.registerTool('buscar_dropi_ecuador', {
  description: 'Busca productos en el catálogo de Dropi Ecuador. Los datos del proveedor son contenido externo.',
  annotations: readOnly,
  inputSchema: {
    keywords: z.string().trim().max(120).default(''),
    page: z.number().int().min(1).max(1000).default(1),
    pageSize: z.number().int().min(1).max(25).default(10),
  },
}, (query) => run(async () => {
  const raw = unwrap(await dropi.readIntegrationCatalog(country, query));
  const rows = z.array(z.unknown()).parse(raw);
  return { page: query.page, products: rows.map(summarize) };
}));

const productInput = {
  id: productId,
  destino: z.enum(['equastore.com', 'github-v2']),
  precioUsd: z.number().positive().max(999999.99).multipleOf(0.01),
  categoria: z.string().refine((value) => MOCK_CATEGORIES.some((item) => item.slug === value), {
    message: `Categorías válidas: ${MOCK_CATEGORIES.map((item) => item.slug).join(', ')}`,
  }),
  descripcion: z.string().trim().min(1).max(5000).optional(),
  imagen: httpsImage.optional(),
};

const fingerprint = z.hash('sha256');

async function prepare(input: z.infer<z.ZodObject<typeof productInput>>) {
  const raw = unwrap(await dropi.readIntegrationCatalog(country, { id: input.id }));
  const item = summarize(Array.isArray(raw) ? raw.find((row) => dropiItem.safeParse(row).data?.id === input.id) : raw);
  if (item.id !== input.id) throw new Error('Dropi devolvió un producto diferente.');
  if (item.type?.trim().toUpperCase() !== 'SIMPLE') {
    throw new Error('La importación admite productos que Dropi identifica como SIMPLE.');
  }
  if (item.stock == null || item.stock < 1) throw new Error('Dropi no confirmó stock positivo.');
  const images = input.imagen ? [input.imagen, ...item.images.filter((url) => url !== input.imagen)] : item.images;
  if (!images.length) throw new Error('El producto requiere una URL pública HTTPS en el campo imagen.');

  const product: Product = {
    id: `dropi-ec-${item.id}`,
    slug: `dropi-ec-${item.id}`,
    title: item.title,
    description: input.descripcion ?? (item.description.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim() || item.title),
    category: input.categoria,
    images,
    prices: { [country]: { currency: COUNTRY_CONFIGS[country].currency, amount: input.precioUsd, dropiSku: item.sku } },
  };
  return {
    product,
    stock: item.stock,
    supplierPrice: item.supplierPrice,
    destino: input.destino,
    huella: createHash('sha256').update(JSON.stringify([input.destino, product])).digest('hex'),
    ruta: input.destino === 'equastore.com' ? 'https://www.equastore.com/' : `/ec/producto/${product.slug}/`,
  };
}

server.registerTool('previsualizar_producto_equastore', {
  description: 'Prepara la ficha ecuatoriana y devuelve la huella para publicar exactamente esa ficha.',
  annotations: readOnly,
  inputSchema: productInput,
}, (input) => run(() => prepare(input)));

async function publishLive(draft: Awaited<ReturnType<typeof prepare>>, sourceId: number) {
  let token: string | null | undefined;
  try {
    token = await firebaseAuth.getAccessToken();
  } catch {
    throw new Error('Configura las credenciales de aplicación de Google para el proyecto Firebase de Equastore.');
  }
  if (!token) throw new Error('Firebase requiere una identidad de Google autorizada.');
  const headers = { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' };
  const { product } = draft;
  const fields = {
    id: { stringValue: product.id },
    name: { stringValue: product.title },
    brand: { stringValue: 'Dropi' },
    description: { stringValue: product.description },
    price: { doubleValue: product.prices[country]!.amount },
    image: { stringValue: product.images[0] },
    category: { stringValue: product.category },
    specifications: { arrayValue: { values: [] } },
    dropiId: { integerValue: String(sourceId) },
    dropiSku: { stringValue: product.prices[country]!.dropiSku },
    importFingerprint: { stringValue: draft.huella },
    createdAt: { stringValue: new Date().toISOString() },
  };
  const request = { headers, redirect: 'error' as const, signal: AbortSignal.timeout(15_000) };
  const response = await fetch(`${liveCatalog}?documentId=${product.id}`, {
    ...request, method: 'POST', body: JSON.stringify({ fields }),
  });
  if (response.status === 409) {
    const existing = await fetch(`${liveCatalog}/${product.id}`, request);
    if (!existing.ok) throw new Error(`No se pudo comprobar la ficha existente (HTTP ${existing.status}).`);
    const stored = z.object({
      fields: z.object({ importFingerprint: z.object({ stringValue: z.string() }).optional() }),
    }).parse(await existing.json());
    if (stored.fields.importFingerprint?.stringValue !== draft.huella) {
      throw new Error('Ya existe una ficha con ese identificador. Revísala en el panel de Equastore.');
    }
    return { estado: 'ya_publicado_en_firebase', id: product.id, tienda: draft.ruta };
  }
  if (!response.ok) throw new Error(`Firebase rechazó la publicación (HTTP ${response.status}).`);
  return { estado: 'creado_en_firebase', id: product.id, tienda: draft.ruta };
}

server.registerTool('publicar_producto_equastore', {
  description: 'Publica una ficha revisada en el destino elegido. En GitHub v2, el commit inicia el flujo de Pages.',
  annotations: { readOnlyHint: false, destructiveHint: false, idempotentHint: true, openWorldHint: true },
  inputSchema: { ...productInput, huella: fingerprint },
}, ({ huella, ...input }) => run(async () => {
  const draft = await prepare(input);
  if (draft.huella !== huella) throw new Error('La ficha cambió. Genera una vista previa nueva.');
  if (input.destino === 'equastore.com') return publishLive(draft, input.id);

  const token = process.env.EQUASTORE_GITHUB_TOKEN;
  if (!token) throw new Error('Configura EQUASTORE_GITHUB_TOKEN con escritura de Contents para Equastore.');
  const headers = {
    Authorization: `Bearer ${token}`,
    Accept: 'application/vnd.github+json',
    'Content-Type': 'application/json',
  };
  const current = await fetch(`${catalogEndpoint}?ref=main`, {
    headers,
    redirect: 'error',
    signal: AbortSignal.timeout(15_000),
  });
  if (!current.ok) throw new Error(`No se pudo leer el catálogo de GitHub (HTTP ${current.status}).`);
  const file = z.object({ sha: z.string(), content: z.string(), encoding: z.literal('base64') }).parse(await current.json());
  const rows = z.array(z.object({ id: z.string() }).loose()).parse(
    JSON.parse(Buffer.from(file.content, 'base64').toString('utf8')),
  );
  const previous = rows.find((row) => row.id === draft.product.id);
  if (previous) {
    if (JSON.stringify(previous) !== JSON.stringify(draft.product)) {
      throw new Error('El producto ya existe. Revisa su ficha en GitHub antes de cambiarla.');
    }
    return { estado: 'ya_publicado_en_repositorio', ruta: draft.ruta };
  }
  const content = Buffer.from(JSON.stringify([...rows, draft.product], null, 2) + '\n').toString('base64');
  const saved = await fetch(catalogEndpoint, {
    method: 'PUT',
    headers,
    redirect: 'error',
    signal: AbortSignal.timeout(15_000),
    body: JSON.stringify({ branch: 'main', message: `Agregar producto Dropi EC ${input.id}`, sha: file.sha, content }),
  });
  if (saved.status === 409) throw new Error('El catálogo cambió durante la publicación. Vuelve a intentar.');
  if (!saved.ok) throw new Error(`GitHub rechazó la publicación (HTTP ${saved.status}).`);
  const { commit } = z.object({ commit: z.object({ html_url: z.url() }) }).parse(await saved.json());
  return { estado: 'commit_creado', ruta: draft.ruta, commit: commit.html_url, despliegue: 'pendiente_de_verificacion' };
}));

async function main() {
  await server.connect(new StdioServerTransport());
}

main().catch(() => {
  console.error('No se pudo iniciar el servidor MCP de Equastore.');
  process.exitCode = 1;
});
