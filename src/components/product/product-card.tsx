'use client';

import Link from 'next/link';
import { Star, Plus } from 'lucide-react';
import { motion } from 'framer-motion';
import type { Product } from '@/types/product';
import type { CountryCode } from '@/lib/countries';
import { getProductPrice, getDiscountPercent } from '@/lib/products/mock-data';
import { useCountry } from '@/components/country/country-provider';

interface ProductCardProps {
  product: Product;
  country: CountryCode;
  onQuickView?: (product: Product) => void;
  index?: number;
}

export function ProductCard({ product, country, onQuickView, index = 0 }: ProductCardProps) {
  const { country: ctxCountry } = useCountry();
  const base = `/${ctxCountry.toLowerCase()}`;
  const price = getProductPrice(product, country);
  const discount = getDiscountPercent(price);
  const symbol = currencySymbol(price.currency);
  const isPopular = product.badge?.text === 'MÁS VENDIDO';
  const isNew = product.badge?.text === 'NUEVO';

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className="group relative"
    >
      <motion.div
        whileHover={{ y: -6 }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        className="overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm transition-shadow hover:shadow-xl"
      >
        {/* Image */}
        <Link href={`${base}/producto/${product.slug}`} className="relative block aspect-square overflow-hidden bg-slate-50">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={product.images[0]}
            alt={product.title}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />

          {/* Badge — top left */}
          {isPopular && (
            <span className="absolute left-3 top-3 rounded-full bg-[#5142f5] px-3 py-1 text-[10px] font-bold text-white shadow-md">
              POPULAR
            </span>
          )}
          {isNew && (
            <span className="absolute left-3 top-3 rounded-full bg-[#22D3EE] px-3 py-1 text-[10px] font-bold text-white shadow-md">
              NUEVO
            </span>
          )}
          {discount > 0 && !isPopular && !isNew && (
            <span className="absolute left-3 top-3 rounded-full bg-[#FF4B5C] px-3 py-1 text-[10px] font-bold text-white shadow-md">
              -{discount}%
            </span>
          )}
        </Link>

        {/* Body */}
        <div className="p-4">
          {/* Category */}
          <p className="text-[10px] font-bold uppercase tracking-wider text-[#5142f5]">
            {product.category}
          </p>

          {/* Title */}
          <Link href={`${base}/producto/${product.slug}`} className="mt-1 block text-sm font-bold text-slate-900 hover:text-[#5142f5]">
            {product.title}
          </Link>

          {/* Rating */}
          {product.rating && (
            <div className="mt-1 flex items-center gap-1 text-[11px]">
              <div className="flex">
                {[1,2,3,4,5].map(s => (
                  <Star key={s} className={`h-3 w-3 ${s <= Math.round(product.rating!) ? 'fill-amber-400 text-amber-400' : 'fill-slate-200 text-slate-200'}`} />
                ))}
              </div>
              <span className="text-slate-400">({product.reviewCount?.toLocaleString()})</span>
            </div>
          )}

          {/* Price */}
          <div className="mt-2 flex items-center gap-2">
            {discount > 0 && (
              <span className="text-xs text-slate-400 line-through">{symbol}{price.originalAmount?.toLocaleString()}</span>
            )}
            <span className="text-lg font-extrabold text-slate-900">{symbol}{price.amount.toLocaleString()}</span>
          </div>

          {/* Add button */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onQuickView?.(product)}
            className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl bg-[#5142f5] py-2 text-xs font-bold text-white transition hover:bg-[#4334D6]"
          >
            <Plus className="h-3.5 w-3.5" />
            AGREGAR
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
}

function currencySymbol(currency: string): string {
  const symbols: Record<string, string> = { USD:'$', COP:'$', MXN:'$', CLP:'$', PEN:'S/' };
  return symbols[currency] || '$';
}
