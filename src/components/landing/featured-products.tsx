'use client';

import { motion } from 'framer-motion';
import { ProductGrid } from '@/components/product/product-grid';
import { ProductQuickView } from '@/components/product/product-quick-view';
import { useCountry } from '@/components/country/country-provider';
import { getFeaturedProducts } from '@/lib/products/mock-data';
import type { Product } from '@/types/product';
import { useState } from 'react';
import { TextGenerateEffect } from '@/components/ui/text-generate-effect';

export function FeaturedProducts() {
  const { country } = useCountry();
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [quickViewOpen, setQuickViewOpen] = useState(false);
  const products = getFeaturedProducts(8);

  return (
    <section className="relative overflow-hidden bg-black py-24">
      {/* Glow */}
      <div className="pointer-events-none absolute left-1/2 top-0 h-64 w-[600px] -translate-x-1/2 rounded-full bg-[#5142f5]/20 blur-[120px]" />

      <div className="mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
        >
          <p className="text-sm font-bold uppercase tracking-wider text-[#22D3EE]">Los más vendidos</p>
          <h2 className="mt-2 text-4xl font-extrabold text-white sm:text-5xl">
            Productos que <span className="bg-gradient-to-r from-[#5142f5] to-[#FF4B5C] bg-clip-text text-transparent">transforman</span>
          </h2>
          <div className="mt-4 max-w-xl mx-auto">
            <TextGenerateEffect
              words="Suplementos de grado farmacéutico, enviados a LATAM. Calidad verificada, resultados reales."
              className="text-sm text-white/50"
            />
          </div>
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
      </div>
    </section>
  );
}
