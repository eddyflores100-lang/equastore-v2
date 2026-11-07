'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { ProductGrid } from '@/components/product/product-grid';
import { ProductQuickView } from '@/components/product/product-quick-view';
import { useCountry } from '@/components/country/country-provider';
import { getFeaturedProducts } from '@/lib/products/mock-data';
import type { Product } from '@/types/product';

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
    <section id="mejores-vendidos" className="bg-slate-50 py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 flex items-end justify-between">
          <div>
            <p className="text-xs font-medium uppercase tracking-wider text-amber-600">
              Los más vendidos
            </p>
            <h2 className="mt-2 text-3xl font-semibold text-slate-900 sm:text-4xl">
              Productos que tu cuerpo necesita
            </h2>
          </div>
          <Link
            href="/productos"
            className="hidden items-center gap-1 text-sm font-medium text-slate-900 hover:text-amber-700 sm:inline-flex"
          >
            Ver catálogo
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
      </div>
    </section>
  );
}
