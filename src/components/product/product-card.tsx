'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, Star, Plus } from 'lucide-react';
import type { Product } from '@/types/product';
import type { CountryCode } from '@/lib/countries';
import { getProductPrice, getDiscountPercent } from '@/lib/products/mock-data';
import { useCountry } from '@/components/country/country-provider';
import { CardBody, CardContainer, CardItem } from '@/components/ui/3d-card';

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

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
    >
      {/* Aceternity 3D Card */}
      <CardContainer containerClassName="py-4">
        <CardBody className="group/card relative h-auto w-full rounded-3xl border border-white/10 bg-white/5 p-4 backdrop-blur-sm hover:shadow-2xl hover:shadow-[#5142f5]/20">
          {/* Image */}
          <CardItem translateZ={50} className="mb-3 w-full overflow-hidden rounded-2xl">
            <Link href={`${base}/producto/${product.slug}`} className="relative block aspect-square">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={product.images[0]}
                alt={product.title}
                className="h-full w-full rounded-2xl object-cover"
              />
              {isPopular && (
                <span className="absolute left-3 top-3 rounded-full bg-[#5142f5] px-3 py-1 text-[10px] font-bold text-white shadow-lg">POPULAR</span>
              )}
              {discount > 0 && !isPopular && (
                <span className="absolute left-3 top-3 rounded-full bg-[#FF4B5C] px-3 py-1 text-[10px] font-bold text-white shadow-lg">-{discount}%</span>
              )}
            </Link>
          </CardItem>

          {/* Category */}
          <CardItem as="p" translateZ={20} className="text-[10px] font-bold uppercase tracking-wider text-[#22D3EE]">
            {product.category}
          </CardItem>

          {/* Title */}
          <CardItem as="h3" translateZ={30} className="mt-1 text-sm font-bold text-white">
            {product.title}
          </CardItem>

          {/* Rating */}
          {product.rating && (
            <CardItem as="div" translateZ={20} className="mt-1 flex items-center gap-1 text-[11px]">
              <Star className="h-3 w-3 fill-[#FFB800] text-[#FFB800]" />
              <span className="text-white/60">{product.rating.toFixed(1)}</span>
              <span className="text-white/30">({product.reviewCount?.toLocaleString()})</span>
            </CardItem>
          )}

          {/* Price */}
          <CardItem as="div" translateZ={20} className="mt-2 flex items-baseline gap-2">
            {discount > 0 && <span className="text-xs text-white/30 line-through">{symbol}{price.originalAmount?.toLocaleString()}</span>}
            <span className="text-lg font-extrabold text-white">{symbol}{price.amount.toLocaleString()}</span>
          </CardItem>

          {/* Button */}
          <CardItem translateZ={40} className="mt-3 w-full">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onQuickView?.(product)}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#5142f5] py-2.5 text-xs font-bold text-white transition hover:bg-[#4334D6]"
              style={{ boxShadow: '0 4px 12px rgba(81,66,245,0.3)' }}
            >
              <Plus className="h-3.5 w-3.5" />
              AGREGAR
            </motion.button>
          </CardItem>
        </CardBody>
      </CardContainer>
    </motion.div>
  );
}

function currencySymbol(currency: string): string {
  const symbols: Record<string, string> = { USD:'$', COP:'$', MXN:'$', CLP:'$', PEN:'S/' };
  return symbols[currency] || '$';
}
