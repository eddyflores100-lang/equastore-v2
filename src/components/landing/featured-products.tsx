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

  return (
    <section className="bg-white py-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-4 flex items-center justify-between border-b-2 border-[#1F5AF6] pb-2">
          <h2 className="text-xl font-black uppercase text-slate-900 sm:text-2xl">
            BEST SELLERS
          </h2>
          <Link href="/productos" className="flex items-center gap-1 text-xs font-bold text-[#1F5AF6]">
            VER TODOS <ChevronRight className="h-3 w-3" />
          </Link>
        </div>

        <ProductGrid
          products={products}
          country={country}
          onQuickView={(p) => { setQuickViewProduct(p); setQuickViewOpen(true); }}
        />

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
