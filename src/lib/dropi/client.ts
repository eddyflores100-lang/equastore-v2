/**
 * Equastore v2 — Dropi API client (REAL API, not mock)
 *
 * Dropi API docs: POST /integrations/products/index
 * Auth: header "dropi-integration-key"
 * Base URLs: https://api.dropi.{co|ec|mx|cl|pe}/integrations
 *
 * The token is per-country. Set DROPI_{CC}_TOKEN in env.
 */

import { CountryCode, getCountryConfig } from '@/lib/countries';

export interface DropiProduct {
  id: number;
  name: string;
  description?: string;
  price: number;
  comparePrice?: number;
  sku?: string;
  images?: string[];
  stock?: number;
  categoryName?: string;
  brandName?: string;
  weight?: number;
  productId: number;
  imageUrl?: string;
}

export interface DropiProductResponse {
  isSuccess: boolean;
  objects: DropiProduct[];
  count?: number;
  message?: string;
  status?: number;
}

class DropiClient {
  private getBaseUrl(country: CountryCode): string {
    const config = getCountryConfig(country);
    // Dropi uses api.dropi.{co|ec|mx|cl|pe}/integrations
    const countryCode = country.toLowerCase();
    return `https://api.dropi.${countryCode === 'ec' ? 'ec' : countryCode}/integrations`;
  }

  private getToken(country: CountryCode): string | null {
    const config = getCountryConfig(country);
    const token = process.env[config.dropiTokenEnv];
    if (!token || token.startsWith('replace-with-')) {
      return null;
    }
    return token;
  }

  async listProducts(country: CountryCode, page = 1, pageSize = 50): Promise<DropiProduct[]> {
    const token = this.getToken(country);
    if (!token) {
      console.warn(`[Dropi] No token for ${country}. Using mock data.`);
      return [];
    }

    const url = `${this.getBaseUrl(country)}/products/index`;
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'dropi-integration-key': token,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        pageSize,
        startData: (page - 1) * pageSize + 1,
        no_count: true,
        order_by: 'id',
        order_type: 'asc',
        keywords: '',
        favorite: false,
        privated_product: false,
      }),
      next: { revalidate: 300 }, // Cache 5 min
    });

    if (!response.ok) {
      console.error(`[Dropi] ${country} products failed: ${response.status}`);
      return [];
    }

    const data: DropiProductResponse = await response.json();
    return data.objects || [];
  }

  async listCategories(country: CountryCode): Promise<{ id: number; name: string }[]> {
    const token = this.getToken(country);
    if (!token) return [];

    const url = `${this.getBaseUrl(country)}/categories`;
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'dropi-integration-key': token,
        'Content-Type': 'application/json',
      },
      next: { revalidate: 3600 },
    });

    if (!response.ok) return [];
    const data = await response.json();
    return data.objects || [];
  }

  async createOrder(country: CountryCode, orderData: unknown): Promise<unknown> {
    const token = this.getToken(country);
    if (!token) throw new Error(`No Dropi token for ${country}`);

    const url = `${this.getBaseUrl(country)}/orders/new`;
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'dropi-integration-key': token,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(orderData),
    });

    return response.json();
  }
}

let _client: DropiClient | null = null;
export function getDropiClient(): DropiClient {
  if (!_client) _client = new DropiClient();
  return _client;
}

/**
 * Convert Dropi products to our Product type.
 * If Dropi returns empty (no token), falls back to mock data.
 */
export async function fetchProducts(country: CountryCode): Promise<import('@/types/product').Product[]> {
  const client = getDropiClient();
  const dropiProducts = await client.listProducts(country);

  if (dropiProducts.length === 0) {
    // Fallback to mock
    const { MOCK_PRODUCTS } = await import('@/lib/products/mock-data');
    return MOCK_PRODUCTS;
  }

  const config = getCountryConfig(country);
  return dropiProducts.map((dp) => ({
    id: `dropi-${dp.id}`,
    slug: dp.name?.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') || `product-${dp.id}`,
    title: dp.name || `Producto ${dp.id}`,
    description: dp.description || dp.name || '',
    brand: dp.brandName || 'Dropi',
    category: dp.categoryName?.toLowerCase() || 'suplementos',
    images: dp.images?.length ? dp.images : [dp.imageUrl || ''],
    prices: {
      [country]: {
        currency: config.currency,
        amount: dp.price || 0,
        originalAmount: dp.comparePrice || undefined,
        dropiSku: dp.sku || String(dp.id),
      },
    },
    rating: undefined,
    reviewCount: undefined,
    specifications: [],
  }));
}
