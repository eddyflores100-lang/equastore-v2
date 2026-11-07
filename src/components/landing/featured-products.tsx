'use client';

import { motion } from 'framer-motion';
import { ProductGrid } from '@/components/product/product-grid';
import { ProductQuickView } from '@/components/product/product-quick-view';
import { useCountry } from '@/components/country/country-provider';
import { getFeaturedProducts } from '@/lib/products/mock-data';
import type { Product } from '@/types/product';
import { useState } from 'react';

export function FeaturedProducts() {
  const { country } = useCountry();
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [quickViewOpen, setQuickViewOpen] = useState(false);
  const products = getFeaturedProducts(8);

  return (
    <section className="mx-auto max-w-7xl px-6 py-24 space-y-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <p className="text-sm font-bold uppercase tracking-wider text-[#5142f5]">Los más hot</p>
        <h2 className="mt-2 text-3xl font-extrabold text-slate-900">POPULAR</h2>
      </motion.div>

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
    </section>
  );
}
