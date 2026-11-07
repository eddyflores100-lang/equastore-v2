'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { ProductGrid } from '@/components/product/product-grid';
import { ProductQuickView } from '@/components/product/product-quick-view';
import { useCountry } from '@/components/country/country-provider';
import { getFeaturedProducts } from '@/lib/products/mock-data';
import type { Product } from '@/types/product';

export function FeaturedProducts() {
  const { country } = useCountry();
  const base = `/${country.toLowerCase()}`;
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [quickViewOpen, setQuickViewOpen] = useState(false);
  const products = getFeaturedProducts(8);

  return (
    <section className="bg-white py-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          style={{ borderBottom: '2px solid #5142F5', marginBottom: '16px', paddingBottom: '8px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
        >
          <h2 style={{ fontSize: '1.5rem', fontWeight: 800, textTransform: 'uppercase', color: '#111827' }}>Más vendidos</h2>
          <Link href={`${base}/productos`} style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '12px', fontWeight: 700, color: '#5142F5' }}>
            Ver todos <ChevronRight className="h-3 w-3" />
          </Link>
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
