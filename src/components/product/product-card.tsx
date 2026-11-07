'use client';

import { motion } from 'framer-motion';
import { CardBody, CardContainer, CardItem } from '@/components/ui/3d-card';
import Link from 'next/link';
import { Star, Plus } from 'lucide-react';
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

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
    >
      <CardContainer containerClassName="py-2">
        <CardBody className="group/card relative w-full rounded-2xl border border-white/10 bg-white/[0.03] p-4 hover:border-[#5142f5]/30 hover:shadow-[0_8px_30px_rgba(81,66,245,0.1)]">
          <CardItem translateZ={50} className="mb-3 w-full overflow-hidden rounded-xl">
            <Link href={`${base}/producto/${product.slug}`} className="relative block aspect-square">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={product.images[0]} alt={product.title} className="h-full w-full rounded-xl object-cover" />
              {discount > 0 && (
                <span className="absolute left-2 top-2 rounded-full bg-[#5142f5] px-2 py-0.5 text-[10px] font-bold text-white">-{discount}%</span>
              )}
            </Link>
          </CardItem>

          <CardItem as="p" translateZ={20} className="text-[10px] font-bold uppercase tracking-wider text-[#5142f5]">
            {product.category}
          </CardItem>

          <CardItem as="h3" translateZ={30} className="mt-1 text-sm font-bold text-white">
            {product.title}
          </CardItem>

          {product.rating && (
            <CardItem as="div" translateZ={20} className="mt-1 flex items-center gap-1 text-[11px]">
              <Star className="h-3 w-3 fill-white/60 text-white/60" />
              <span className="text-white/40">{product.rating.toFixed(1)} · {product.reviewCount?.toLocaleString()}</span>
            </CardItem>
          )}

          <CardItem as="div" translateZ={20} className="mt-2 flex items-baseline gap-2">
            {discount > 0 && <span className="text-xs text-white/30 line-through">{symbol}{price.originalAmount?.toLocaleString()}</span>}
            <span className="text-lg font-extrabold text-white">{symbol}{price.amount.toLocaleString()}</span>
          </CardItem>

          <CardItem translateZ={40} className="mt-3 w-full">
            <button
              onClick={() => onQuickView?.(product)}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#5142f5] py-2.5 text-xs font-bold text-white transition hover:bg-[#4334D6]"
            >
              <Plus className="h-3.5 w-3.5" />
              AGREGAR
            </button>
          </CardItem>
        </CardBody>
      </CardContainer>
    </motion.div>
  );
}

function currencySymbol(currency: string): string {
  const s: Record<string, string> = { USD:'$', COP:'$', MXN:'$', CLP:'$', PEN:'S/' };
  return s[currency] || '$';
}
