/**
 * Equastore v2 — Product types
 *
 * Aligned with Prisma schema (Product + Inventory).
 */

import type { CountryCode } from '@/lib/countries';

export interface ProductPrice {
  currency: string;
  amount: number;
  originalAmount?: number; // for discount display
  dropiSku?: string;
}

export interface Product {
  id: string;
  slug: string;
  title: string;
  description: string;
  brand?: string;
  category: string;
  images: string[];
  badge?: {
    text: string;
    color: string;
  };
  rating?: number;
  reviewCount?: number;
  specifications?: string[];
  // Prices per country — populated from Inventory rows
  prices: Partial<Record<CountryCode, ProductPrice>>;
}

export interface CartItem {
  productId: string;
  slug: string;
  title: string;
  image: string;
  quantity: number;
  unitPrice: number;
  currency: string;
  dropiSku?: string;
}

export interface ProductCategory {
  slug: string;
  name: string;
  description: string;
  emoji: string;
  productCount: number;
}
