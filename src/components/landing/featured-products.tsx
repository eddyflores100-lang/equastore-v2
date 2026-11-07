'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
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
    <section className="bg-white py-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="mb-6 flex items-end justify-between border-b border-slate-200 pb-3">
          <h2 className="text-xl font-black text-slate-900 sm:text-2xl">
            BEST SELLERS
          </h2>
          <Link
            href="/productos"
            className="flex items-center gap-1 text-xs font-bold text-amber-600 hover:text-amber-700"
          >
            VER TODOS
            <ChevronRight className="h-3 w-3" />
          </Link>
        </div>

        {/* Product grid */}
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
