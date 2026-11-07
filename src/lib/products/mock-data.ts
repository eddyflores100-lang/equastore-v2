/**
 * Equastore v2 — Mock product catalog
 *
 * Used during development until Dropi API integration is wired up.
 * Replace with calls to getDropiClient().listProducts(country) in production.
 *
 * Products are based on the original equastore.com catalog (Gladiator,
 * Creatina, Mobiflex, Moringa, etc.) with multi-country pricing.
 */

import type { Product, ProductCategory, ProductPrice } from '@/types/product';
import type { CountryCode } from '@/lib/countries';

export const MOCK_CATEGORIES: ProductCategory[] = [
  {
    slug: 'suplementos',
    name: 'Suplementos',
    description: 'Vitaminas, minerales y fórmulas para rendimiento físico y bienestar.',
    emoji: '💊',
    productCount: 8,
  },
  {
    slug: 'fuerza',
    name: 'Fuerza',
    description: 'Pre-entrenos y creatinas para máxima potencia.',
    emoji: '💪',
    productCount: 4,
  },
  {
    slug: 'definicion',
    name: 'Definición',
    description: 'Quemadores y termogénicos para reducir grasa.',
    emoji: '🔥',
    productCount: 3,
  },
  {
    slug: 'vitalidad',
    name: 'Vitalidad',
    description: 'Adaptógenos y energizantes naturales.',
    emoji: '⚡',
    productCount: 3,
  },
  // Categorías del nav (para que generateStaticParams cree las páginas)
  {
    slug: 'proteina',
    name: 'Proteína',
    description: 'Proteínas de suero, isoladas y vegetales.',
    emoji: '🥤',
    productCount: 0,
  },
  {
    slug: 'pre-entreno',
    name: 'Pre-entreno',
    description: 'Pre-entrenos para energía y foco.',
    emoji: '⚡',
    productCount: 0,
  },
  {
    slug: 'creatina',
    name: 'Creatina',
    description: 'Creatina monohidratada y micronizada.',
    emoji: '🔬',
    productCount: 0,
  },
  {
    slug: 'vitaminas',
    name: 'Vitaminas',
    description: 'Multivitamínicos y minerales.',
    emoji: '💊',
    productCount: 0,
  },
  {
    slug: 'rendimiento',
    name: 'Rendimiento',
    description: 'BCAA, intra-entreno y energía.',
    emoji: '🏃',
    productCount: 0,
  },
  {
    slug: 'peptidos',
    name: 'Péptidos',
    description: 'Péptidos para recuperación y salud.',
    emoji: '🧬',
    productCount: 0,
  },
];

const placeholderImg = (label: string, color = '1e3a8a') =>
  `data:image/svg+xml;utf8,${encodeURIComponent(
    `<svg xmlns='http://www.w3.org/2000/svg' width='600' height='600' viewBox='0 0 600 600'><rect width='600' height='600' fill='#${color}'/><text x='300' y='300' font-family='sans-serif' font-size='48' font-weight='bold' fill='white' text-anchor='middle' dominant-baseline='middle'>${label}</text></svg>`
  )}`;

// Product star uses the 3D rendered image
const productStarImg = '/equastore-v2/products/gladiator-3d.png';

export const MOCK_PRODUCTS: Product[] = [
  {
    id: 'gladiator-pump',
    slug: 'gladiator-pump',
    title: 'Gladiator Pump',
    description:
      'Pre-entreno de máxima intensidad con beta-alanina, citrulina y cafeína. 300g para 30 sesiones. Sabor frutas tropicales.',
    brand: 'Equastore',
    category: 'fuerza',
    images: [productStarImg],
    badge: { text: 'MÁS VENDIDO', color: 'bg-orange-500' },
    rating: 4.9,
    reviewCount: 1247,
    specifications: [
      '300g (30 servicios)',
      'Beta-alanina 3.2g',
      'Cafeína 250mg',
      'Sin azúcar agregada',
    ],
    prices: {
      EC: { currency: 'USD', amount: 28, originalAmount: 35, dropiSku: 'GLAD-PUMP-EC' },
      CO: { currency: 'COP', amount: 109000, originalAmount: 135000, dropiSku: 'GLAD-PUMP-CO' },
      MX: { currency: 'MXN', amount: 549, originalAmount: 699, dropiSku: 'GLAD-PUMP-MX' },
      CL: { currency: 'CLP', amount: 18900, originalAmount: 23900, dropiSku: 'GLAD-PUMP-CL' },
      PE: { currency: 'PEN', amount: 99, originalAmount: 129, dropiSku: 'GLAD-PUMP-PE' },
    },
  },
  {
    id: 'creatina-monohidratada',
    slug: 'creatina-monohidratada',
    title: 'Creatina Monohidratada',
    description:
      'Creatina pura 99.9% micronizada. Mejora fuerza, masa muscular y recuperación. 500g — 100 servicios.',
    brand: 'Equastore',
    category: 'fuerza',
    images: [placeholderImg('Creatina', '0f766e')],
    badge: { text: '-25%', color: 'bg-orange-500' },
    rating: 4.8,
    reviewCount: 892,
    specifications: [
      '500g (100 servicios)',
      'Creatina monohidratada 5g por servicio',
      'Micronizada para mejor absorción',
      'Sin sabor — mezcla con cualquier líquido',
    ],
    prices: {
      EC: { currency: 'USD', amount: 24.99, originalAmount: 32 },
      CO: { currency: 'COP', amount: 95000, originalAmount: 120000 },
      MX: { currency: 'MXN', amount: 489, originalAmount: 649 },
      CL: { currency: 'CLP', amount: 16900, originalAmount: 21900 },
      PE: { currency: 'PEN', amount: 89, originalAmount: 119 },
    },
  },
  {
    id: 'mobiflex',
    slug: 'mobiflex',
    title: 'Mobiflex — Articulaciones',
    description:
      'Glucosamina + condroitina + MSM + colágeno hidrolizado. Alivio articular en 14 días. 60 cápsulas.',
    brand: 'Equastore',
    category: 'suplementos',
    images: [placeholderImg('Mobiflex', '0d9488')],
    rating: 4.7,
    reviewCount: 445,
    specifications: [
      '60 cápsulas',
      'Glucosamina 1500mg',
      'Condroitina 1200mg',
      'MSM 1000mg + Colágeno',
    ],
    prices: {
      EC: { currency: 'USD', amount: 26.99, originalAmount: 34.99 },
      CO: { currency: 'COP', amount: 105000, originalAmount: 135000 },
      MX: { currency: 'MXN', amount: 539, originalAmount: 699 },
      CL: { currency: 'CLP', amount: 18900, originalAmount: 23900 },
      PE: { currency: 'PEN', amount: 95, originalAmount: 125 },
    },
  },
  {
    id: 'moringa',
    slug: 'moringa',
    title: 'Moringa Orgánica',
    description:
      'Súper alimento rico en antioxidantes, vitaminas y minerales. Polvo 100% puro de hojas de moringa. 200g.',
    brand: 'Equastore',
    category: 'vitalidad',
    images: [placeholderImg('Moringa', '166534')],
    badge: { text: 'ORGÁNICO', color: 'bg-emerald-600' },
    rating: 4.6,
    reviewCount: 312,
    specifications: [
      '200g polvo',
      '100% hojas de moringa orgánica',
      'Certificado sin pesticidas',
      'Rico en hierro y vitamina C',
    ],
    prices: {
      EC: { currency: 'USD', amount: 19.99, originalAmount: 24.99 },
      CO: { currency: 'COP', amount: 78000, originalAmount: 95000 },
      MX: { currency: 'MXN', amount: 399, originalAmount: 499 },
      CL: { currency: 'CLP', amount: 13900, originalAmount: 17900 },
      PE: { currency: 'PEN', amount: 72, originalAmount: 95 },
    },
  },
  {
    id: 'turkesterone',
    slug: 'turkesterone-old-school',
    title: 'Turkesterone Old School',
    description:
      'Adaptógeno anabólico natural. Aumenta síntesis de proteína muscular sin hormonas. 60 cápsulas.',
    brand: 'Equastore',
    category: 'vitalidad',
    images: [placeholderImg('Turkesterone', '7c2d12')],
    badge: { text: 'NUEVO', color: 'bg-blue-600' },
    rating: 4.5,
    reviewCount: 178,
    specifications: [
      '60 cápsulas',
      'Extracto de Ajuga Turkestanica 500mg',
      'Estandarizado al 10% turkesterona',
      'Sin estimulantes',
    ],
    prices: {
      EC: { currency: 'USD', amount: 32, originalAmount: 40 },
      CO: { currency: 'COP', amount: 125000, originalAmount: 159000 },
      MX: { currency: 'MXN', amount: 649, originalAmount: 799 },
      CL: { currency: 'CLP', amount: 21900, originalAmount: 27900 },
      PE: { currency: 'PEN', amount: 119, originalAmount: 149 },
    },
  },
  {
    id: '6-colagenos',
    slug: '6-colagenos',
    title: '6 Colágenos Hidrolizados',
    description:
      'Mezcla de 6 tipos de colágeno (I, II, III, V, VIII, X) + vitamina C + ácido hialurónico. Piel, cabello y articulaciones. 30 servicios.',
    brand: 'Equastore',
    category: 'suplementos',
    images: [placeholderImg('6 Colágenos', 'be185d')],
    rating: 4.8,
    reviewCount: 623,
    specifications: [
      '300g (30 servicios)',
      '6 tipos de colágeno hidrolizado',
      'Vitamina C 80mg',
      'Ácido hialurónico 50mg',
    ],
    prices: {
      EC: { currency: 'USD', amount: 29.99, originalAmount: 39.99 },
      CO: { currency: 'COP', amount: 115000, originalAmount: 145000 },
      MX: { currency: 'MXN', amount: 599, originalAmount: 799 },
      CL: { currency: 'CLP', amount: 19900, originalAmount: 25900 },
      PE: { currency: 'PEN', amount: 105, originalAmount: 139 },
    },
  },
  {
    id: 'magnesio-glicinato',
    slug: 'glicinato-de-magnesio',
    title: 'Glicinato de Magnesio',
    description:
      'Magnesio altamente biodisponible para reducir estrés, mejorar sueño y recuperación muscular. 60 cápsulas.',
    brand: 'Equastore',
    category: 'suplementos',
    images: [placeholderImg('Magnesio', '4338ca')],
    rating: 4.7,
    reviewCount: 289,
    specifications: [
      '60 cápsulas',
      'Glicinato de magnesio 400mg',
      'Máxima biodisponibilidad',
      'Sin efecto laxante',
    ],
    prices: {
      EC: { currency: 'USD', amount: 22.99, originalAmount: 28.99 },
      CO: { currency: 'COP', amount: 89000, originalAmount: 110000 },
      MX: { currency: 'MXN', amount: 459, originalAmount: 599 },
      CL: { currency: 'CLP', amount: 15900, originalAmount: 19900 },
      PE: { currency: 'PEN', amount: 82, originalAmount: 105 },
    },
  },
  {
    id: 'colon-cleanse-detox',
    slug: 'colon-cleanse-liver-detox',
    title: 'Colon Cleanse & Liver Detox',
    description:
      'Detox de colon e hígado con fibra psyllium, milk thistle y probióticos. 14 días de programa. 420g.',
    brand: 'Equastore',
    category: 'definicion',
    images: [placeholderImg('Detox', 'ea580c')],
    rating: 4.4,
    reviewCount: 156,
    specifications: [
      '420g (14 servicios)',
      'Psyllium husk 5g',
      'Milk Thistle 500mg',
      '3 cepas probióticas',
    ],
    prices: {
      EC: { currency: 'USD', amount: 27.99, originalAmount: 35 },
      CO: { currency: 'COP', amount: 108000, originalAmount: 135000 },
      MX: { currency: 'MXN', amount: 559, originalAmount: 699 },
      CL: { currency: 'CLP', amount: 18900, originalAmount: 23900 },
      PE: { currency: 'PEN', amount: 99, originalAmount: 129 },
    },
  },
];

/**
 * Get a product by slug.
 */
export function getProductBySlug(slug: string): Product | undefined {
  return MOCK_PRODUCTS.find((p) => p.slug === slug);
}

/**
 * Get all products in a category.
 */
export function getProductsByCategory(categorySlug: string): Product[] {
  return MOCK_PRODUCTS.filter((p) => p.category === categorySlug);
}

/**
 * Get featured products (top-rated or badged).
 */
export function getFeaturedProducts(limit = 8): Product[] {
  return [...MOCK_PRODUCTS]
    .sort((a, b) => (b.rating || 0) - (a.rating || 0))
    .slice(0, limit);
}

/**
 * Get the price for a product in a specific country.
 * Always returns a price — falls back to EC (Ecuador USD) if the country
 * doesn't have a price configured for this product.
 */
export function getProductPrice(product: Product, country: CountryCode): ProductPrice {
  return product.prices[country] || product.prices.EC || {
    currency: 'USD',
    amount: 0,
  };
}

/**
 * Calculate discount percentage from price.
 */
export function getDiscountPercent(price: { amount: number; originalAmount?: number }): number {
  if (!price.originalAmount || price.originalAmount <= price.amount) return 0;
  return Math.round(((price.originalAmount - price.amount) / price.originalAmount) * 100);
}
