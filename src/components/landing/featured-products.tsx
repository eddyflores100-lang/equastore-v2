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
  const [qv, setQv] = useState<Product | null>(null);
  const [open, setOpen] = useState(false);
  const products = getFeaturedProducts(8);

  return (
    <section className="bg-gradient-to-b from-[#0a0a14] to-black py-24">
      <div className="mx-auto max-w-7xl px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <p className="text-sm font-bold uppercase tracking-wider text-[#5142f5]">Bestsellers</p>
          <h2 className="mt-2 text-4xl font-extrabold uppercase tracking-tight text-white sm:text-5xl">
            Más <span className="bg-gradient-to-r from-[#5142f5] to-[#FF4B5C] bg-clip-text text-transparent">vendidos</span>
          </h2>
        </motion.div>

        <ProductGrid
          products={products}
          country={country}
          onQuickView={(p) => { setQv(p); setOpen(true); }}
        />
        <ProductQuickView product={qv} country={country} open={open} onOpenChange={setOpen} />
      </div>
    </section>
  );
}
