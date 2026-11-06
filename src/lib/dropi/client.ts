/**
 * Equastore v2 — Dropi multi-country API client
 *
 * Dropi has separate API endpoints per country, each with its own auth token.
 * This client routes requests to the correct country based on CountryCode.
 *
 * Docs: https://api.dropi.co/ (Colombia — primary)
 * Endpoints used:
 *   GET  /products               — list products (paginated)
 *   GET  /products/{id}          — product details
 *   GET  /categories             — list categories
 *   POST /orders                 — create order
 *   GET  /orders/{id}            — order status
 *   POST /webhooks                — register webhook for product updates
 */

import { CountryCode, getCountryConfig } from '@/lib/countries';

export interface DropiProduct {
  id: number;
  sku: string;
  name: string;
  description?: string;
  price: number;
  compareAtPrice?: number;
  currency: string;
  images?: string[];
  stock: number;
  category?: string;
  brand?: string;
  weight?: number;
  variants?: DropiProductVariant[];
}

export interface DropiProductVariant {
  id: number;
  name: string;
  sku: string;
  price: number;
  stock: number;
}

export interface DropiCreateOrderItem {
  sku: string;
  quantity: number;
  variantId?: number;
}

export interface DropiCreateOrderPayload {
  customer: {
    name: string;
    email?: string;
    phone: string;
    documentId: string;
    documentType?: string;
  };
  shippingAddress: {
    fullName: string;
    street: string;
    city: string;
    region: string;
    zipCode?: string;
    country: string;
    phone: string;
  };
  items: DropiCreateOrderItem[];
  paymentMethod: 'COD' | 'PREPAID';
  notes?: string;
}

export interface DropiOrder {
  id: number;
  orderNumber: string;
  status: 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled';
  total: number;
  currency: string;
  trackingNumber?: string;
  courier?: string;
  createdAt: string;
}

class DropiClient {
  /**
   * Get the Dropi API token for a specific country from env.
   * Throws if not configured.
   */
  private getToken(country: CountryCode): string {
    const config = getCountryConfig(country);
    const token = process.env[config.dropiTokenEnv];
    if (!token || token.startsWith('replace-with-')) {
      throw new Error(
        `Dropi token for ${country} not configured. Set ${config.dropiTokenEnv} in .env.local`
      );
    }
    return token;
  }

  private async request<T>(
    country: CountryCode,
    path: string,
    options: RequestInit = {}
  ): Promise<T> {
    const config = getCountryConfig(country);
    const url = `${config.dropiApiUrl}${path}`;
    const token = this.getToken(country);

    const response = await fetch(url, {
      ...options,
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
        Accept: 'application/json',
        ...(options.headers || {}),
      },
      // Cache strategy: short cache for product reads, no cache for orders
      next: options.method === 'GET' ? { revalidate: 60 } : undefined,
    });

    if (!response.ok) {
      const text = await response.text();
      throw new Error(
        `Dropi API ${country} ${options.method || 'GET'} ${path} failed: ${response.status} ${text}`
      );
    }

    return response.json() as Promise<T>;
  }

  // --- Products ---

  async listProducts(country: CountryCode, page = 1, perPage = 50): Promise<DropiProduct[]> {
    const data = await this.request<{ data: DropiProduct[] }>(
      country,
      `/products?page=${page}&per_page=${perPage}`
    );
    return data.data;
  }

  async getProduct(country: CountryCode, productId: number): Promise<DropiProduct> {
    return this.request<DropiProduct>(country, `/products/${productId}`);
  }

  async listCategories(country: CountryCode): Promise<{ id: number; name: string }[]> {
    return this.request(country, '/categories');
  }

  // --- Orders ---

  async createOrder(
    country: CountryCode,
    payload: DropiCreateOrderPayload
  ): Promise<DropiOrder> {
    return this.request<DropiOrder>(country, '/orders', {
      method: 'POST',
      body: JSON.stringify(payload),
    });
  }

  async getOrder(country: CountryCode, orderId: number): Promise<DropiOrder> {
    return this.request<DropiOrder>(country, `/orders/${orderId}`);
  }

  // --- Webhook registration (optional — Dropi may auto-register) ---

  async registerWebhook(
    country: CountryCode,
    callbackUrl: string,
    events: string[] = ['product.updated', 'product.stock_changed', 'order.status_changed']
  ): Promise<{ id: number; url: string }> {
    return this.request<{ id: number; url: string }>(country, '/webhooks', {
      method: 'POST',
      body: JSON.stringify({ url: callbackUrl, events }),
    });
  }
}

// Singleton client
let _client: DropiClient | null = null;
export function getDropiClient(): DropiClient {
  if (!_client) _client = new DropiClient();
  return _client;
}
