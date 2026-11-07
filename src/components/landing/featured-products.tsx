'use client';

import { useState } from 'react';
import { ProductGrid } from '@/components/product/product-grid';
import { ProductQuickView } from '@/components/product/product-quick-view';
import { useCountry } from '@/components/country/country-provider';
import { getFeaturedProducts } from '@/lib/products/mock-data';
import type { Product } from '@/types/product';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

export function FeaturedProducts() {
  const { country } = useCountry();
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [quickViewOpen, setQuickViewOpen] = useState(false);

  const products = getFeaturedProducts(8);

  const handleQuickView = (product: Product) => {
    setQuickViewProduct(product);
    setQuickViewOpen(true);
  };

  return (
    <section id="productos" className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="mb-8 flex items-end justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl">Productos destacados</h2>
          <p className="mt-2 text-sm text-slate-500">
            Los más vendidos en LATAM · calificación 4.5+
          </p>
        </div>
        <Link
          href="/productos"
          className="inline-flex items-center gap-1 text-sm font-medium text-blue-700 hover:text-blue-800"
        >
          Ver todos
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>

      <ProductGrid products={products} country={country} onQuickView={handleQuickView} />

      <ProductQuickView
        product={quickViewProduct}
        country={country}
        open={quickViewOpen}
        onOpenChange={setQuickViewOpen}
      />
    </section>
  );
}
