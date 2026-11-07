'use client';

import type { Product } from '@/types/product';
import type { CountryCode } from '@/lib/countries';
import { ProductCard } from './product-card';

interface ProductGridProps {
  products: Product[];
  country: CountryCode;
  onQuickView?: (product: Product) => void;
}

export function ProductGrid({ products, country, onQuickView }: ProductGridProps) {
  if (products.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-slate-300 bg-slate-50 p-12 text-center">
        <p className="text-slate-500">No hay productos disponibles.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
      {products.map((product, i) => (
        <ProductCard
          key={product.id}
          product={product}
          country={country}
          onQuickView={onQuickView}
          index={i}
        />
      ))}
    </div>
  );
}
