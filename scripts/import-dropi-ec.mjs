import { readFile, rename, rm, writeFile } from 'node:fs/promises';
import { randomUUID } from 'node:crypto';
import { fileURLToPath } from 'node:url';

const snapshot = fileURLToPath(new URL('../src/lib/products/dropi-ec.json', import.meta.url));
const imageBase = 'https://d39ru7awumhhs2.cloudfront.net/';
const endpoint = 'https://api.dropi.ec/integrations/products/v2/';

export function toCatalogProduct(product, id, amount, category) {
  if (String(product?.id) !== id || typeof product.name !== 'string' || !product.name.trim()) {
    throw new Error(`Producto ${id}: Dropi devolvió datos incompletos.`);
  }
  const images = (Array.isArray(product.photos) ? product.photos : [])
    .flatMap((photo) => {
      const urlS3 = photo?.urlS3;
      if (typeof urlS3 !== 'string' || !urlS3.trim()) return [];
      const image = URL.parse(urlS3.trim(), imageBase);
      return image?.protocol === 'https:' && !image.username && !image.password ? [image.href] : [];
    });
  if (!images.length) throw new Error(`Producto ${id}: no tiene fotos válidas.`);

  const description = typeof product.description === 'string'
    ? product.description.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim()
    : '';

  return {
    id: `dropi-ec-${id}`,
    slug: `dropi-ec-${id}`,
    title: product.name.trim(),
    description: description || product.name.trim(),
    category,
    images: [...new Set(images)],
    prices: { EC: { currency: 'USD', amount, dropiSku: String(product.sku || id) } },
  };
}

async function run(args) {
  const [id, rawAmount, category, ...flags] = args;
  const amount = Number(rawAmount);
  const dryRun = flags.length === 1 && flags[0] === '--dry-run';
  if (!/^[1-9]\d*$/.test(id ?? '') || !/^\d+(?:\.\d{1,2})?$/.test(rawAmount ?? '')
      || !Number.isFinite(amount) || amount <= 0 || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(category ?? '')
      || (flags.length && !dryRun)) {
    throw new Error('Uso: npm run import:dropi:ec -- ID PRECIO_USD CATEGORÍA [--dry-run]');
  }
  const token = process.env.DROPI_EC_TOKEN?.trim();
  if (!token || token.startsWith('replace-with-')) {
    throw new Error('Configura DROPI_EC_TOKEN en el entorno local.');
  }
  const response = await fetch(endpoint + id, {
    headers: { 'dropi-integration-key': token },
    redirect: 'error',
    signal: AbortSignal.timeout(15000),
  });
  if (!response.ok) throw new Error(`Dropi Ecuador respondió HTTP ${response.status} para el producto ${id}.`);
  const data = await response.json();
  if (data.isSuccess !== true) throw new Error(`Dropi Ecuador rechazó la consulta del producto ${id}.`);
  const product = toCatalogProduct(data.objects, id, amount, category);
  if (dryRun) {
    console.log(JSON.stringify(product, null, 2));
    return;
  }

  const products = JSON.parse(await readFile(snapshot, 'utf8'));
  const updated = [...products.filter((entry) => entry.id !== product.id), product];
  const temporary = `${snapshot}.${randomUUID()}.tmp`;
  try {
    await writeFile(temporary, JSON.stringify(updated, null, 2) + '\n');
    await rename(temporary, snapshot);
  } finally {
    await rm(temporary, { force: true });
  }
  console.log(`Importado ${product.id}: ${product.title}.`);
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  run(process.argv.slice(2)).catch((error) => {
    console.error(error.message);
    process.exitCode = 1;
  });
}
