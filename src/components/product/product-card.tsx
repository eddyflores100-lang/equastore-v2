'use client';

import Link from 'next/link';
import { Star, ShoppingCart } from 'lucide-react';
import { useState } from 'react';
import type { Product } from '@/types/product';
import type { CountryCode } from '@/lib/countries';
import { getProductPrice, getDiscountPercent } from '@/lib/products/mock-data';

interface ProductCardProps {
  product: Product;
  country: CountryCode;
  onQuickView?: (product: Product) => void;
}

export function ProductCard({ product, country, onQuickView }: ProductCardProps) {
  const [hovered, setHovered] = useState(false);
  const price = getProductPrice(product, country);
  const discount = getDiscountPercent(price);
  const symbol = currencySymbol(price.currency);

  return (
    <div
      className="group relative flex flex-col overflow-hidden border border-slate-200 bg-white transition hover:border-[#1F5AF6] hover:shadow-lg"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Image */}
      <Link href={`/producto/${product.slug}`} className="relative block aspect-square overflow-hidden bg-slate-900">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-700 via-slate-800 to-slate-950" />
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-6xl font-black text-white/80">
            {(product.brand || 'EQ').slice(0, 2).toUpperCase()}
          </span>
        </div>

        {/* Badges — stacked top-left like BB.com */}
        <div className="absolute left-2 top-2 flex flex-col gap-1">
          {discount > 0 && (
            <span className="bg-[#1F5AF6] px-2 py-0.5 text-[10px] font-black text-white">
              −{discount}%
            </span>
          )}
          <span className="bg-[#FFB800] px-2 py-0.5 text-[10px] font-black text-black">
            B2G1 FREE
          </span>
          {product.badge?.text === 'MÁS VENDIDO' && (
            <span className="bg-black px-2 py-0.5 text-[10px] font-black text-[#1F5AF6]">
              BESTSELLER
            </span>
          )}
        </div>

        {/* Hover — Quick View */}
        {hovered && (
          <button
            onClick={(e) => { e.preventDefault(); onQuickView?.(product); }}
            className="absolute bottom-2 left-1/2 -translate-x-1/2 bg-white px-4 py-1.5 text-xs font-bold text-black shadow-lg"
          >
            Quick View
          </button>
        )}
      </Link>

      {/* Body */}
      <div className="flex flex-1 flex-col p-3">
        {/* Brand */}
        <div className="text-[10px] font-bold uppercase tracking-wider text-[#1F5AF6]">
          {product.brand || 'Equastore'}
        </div>

        {/* Title */}
        <Link
          href={`/producto/${product.slug}`}
          className="mt-0.5 line-clamp-2 text-sm font-bold text-slate-900 hover:text-[#1F5AF6]"
        >
          {product.title}
        </Link>

        {/* Rating */}
        {product.rating && (
          <div className="mt-1 flex items-center gap-1 text-[11px]">
            <div className="flex">
              {[1,2,3,4,5].map(s => (
                <Star key={s} className={`h-3 w-3 ${s <= Math.round(product.rating!) ? 'fill-[#FFB800] text-[#FFB800]' : 'fill-slate-200 text-slate-200'}`} />
              ))}
            </div>
            <span className="font-bold text-slate-700">{product.rating.toFixed(1)}</span>
            <span className="text-slate-400">({product.reviewCount?.toLocaleString()})</span>
          </div>
        )}

        {/* Spec */}
        <div className="mt-1 text-[11px] text-slate-500">
          {product.specifications?.[0] || 'Suplemento premium'}
        </div>

        {/* Stock */}
        <div className="mt-1 text-[11px] font-bold text-emerald-600">In stock</div>

        {/* Price */}
        <div className="mt-2 flex items-baseline gap-2">
          {discount > 0 && (
            <span className="text-xs text-slate-400 line-through">
              {symbol}{price.originalAmount?.toLocaleString()}
            </span>
          )}
          <span className={`text-lg font-black ${discount > 0 ? 'text-[#1F5AF6]' : 'text-slate-900'}`}>
            {symbol}{price.amount.toLocaleString()}
          </span>
          <span className="text-[10px] text-slate-500">{price.currency}</span>
        </div>

        {/* Quick Order button */}
        <button
          onClick={() => onQuickView?.(product)}
          className="mt-2 inline-flex h-9 items-center justify-center gap-1.5 bg-[#1F5AF6] text-xs font-black text-white transition hover:bg-[#1A4DD6]"
        >
          <ShoppingCart className="h-3.5 w-3.5" />
          QUICK ORDER
        </button>
      </div>
    </div>
  );
}

function currencySymbol(currency: string): string {
  const symbols: Record<string, string> = { USD:'$', COP:'$', MXN:'$', CLP:'$', PEN:'S/' };
  return symbols[currency] || '$';
}
