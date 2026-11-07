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
      <Link href={`/producto/${product.slug}`} className="relative block aspect-square overflow-hidden bg-slate-100">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={product.images[0]}
          alt={product.title}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />

        {/* Badges */}
        <div className="absolute left-2 top-2 flex flex-col gap-1">
          {discount > 0 && (
            <span className="bg-[#DC2626] px-2 py-0.5 text-[10px] font-bold text-white">
              −{discount}%
            </span>
          )}
          <span className="bg-[#FFB800] px-2 py-0.5 text-[10px] font-bold text-black">
            B2G1 FREE
          </span>
        </div>

        {/* Quick view */}
        {hovered && (
          <button
            onClick={(e) => { e.preventDefault(); onQuickView?.(product); }}
            className="absolute bottom-2 left-1/2 -translate-x-1/2 bg-white px-4 py-1.5 text-xs font-bold text-slate-900 shadow-lg"
          >
            Vista rápida
          </button>
        )}
      </Link>

      {/* Body */}
      <div className="flex flex-1 flex-col p-3">
        <div className="text-[10px] font-bold uppercase tracking-wider text-[#1F5AF6]">
          {product.brand || 'Equastore'}
        </div>

        <Link
          href={`/producto/${product.slug}`}
          className="mt-0.5 line-clamp-2 text-sm font-semibold text-slate-900 hover:text-[#1F5AF6]"
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
            <span className="font-semibold text-slate-700">{product.rating.toFixed(1)}</span>
            <span className="text-slate-400">({product.reviewCount?.toLocaleString()})</span>
          </div>
        )}

        <div className="mt-1 text-[11px] text-slate-500">
          {product.specifications?.[0] || 'Suplemento premium'}
        </div>

        <div className="mt-1 text-[11px] font-bold text-emerald-600">En stock</div>

        {/* Price */}
        <div className="mt-2 flex items-baseline gap-2">
          {discount > 0 && (
            <span className="text-xs text-slate-400 line-through">
              {symbol}{price.originalAmount?.toLocaleString()}
            </span>
          )}
          <span className={`text-lg font-extrabold ${discount > 0 ? 'text-[#DC2626]' : 'text-slate-900'}`}>
            {symbol}{price.amount.toLocaleString()}
          </span>
          <span className="text-[10px] text-slate-500">{price.currency}</span>
        </div>

        {/* Button */}
        <button
          onClick={() => onQuickView?.(product)}
          className="mt-2 inline-flex h-9 items-center justify-center gap-1.5 bg-[#1F5AF6] text-xs font-bold text-white transition hover:bg-[#1A4DD6]"
        >
          <ShoppingCart className="h-3.5 w-3.5" />
          COMPRAR
        </button>
      </div>
    </div>
  );
}

function currencySymbol(currency: string): string {
  const symbols: Record<string, string> = { USD:'$', COP:'$', MXN:'$', CLP:'$', PEN:'S/' };
  return symbols[currency] || '$';
}
