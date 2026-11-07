'use client';

import Link from 'next/link';
import { Star, Plus, Eye } from 'lucide-react';
import { useState } from 'react';
import type { Product } from '@/types/product';
import type { CountryCode } from '@/lib/countries';
import { getProductPrice, getDiscountPercent } from '@/lib/products/mock-data';

interface ProductCardProps {
  product: Product;
  country: CountryCode;
  onQuickView?: (product: Product) => void;
}

const CATEGORY_GRADIENTS: Record<string, string> = {
  suplementos: 'from-emerald-500/30 via-emerald-700/10 to-slate-950',
  fuerza: 'from-amber-500/30 via-orange-700/10 to-slate-950',
  definicion: 'from-rose-500/30 via-rose-700/10 to-slate-950',
  vitalidad: 'from-violet-500/30 via-indigo-700/10 to-slate-950',
};

export function ProductCard({ product, country, onQuickView }: ProductCardProps) {
  const [hovered, setHovered] = useState(false);
  const price = getProductPrice(product, country);
  const discount = getDiscountPercent(price);
  const symbol = currencySymbol(price.currency);
  const gradient = CATEGORY_GRADIENTS[product.category] || CATEGORY_GRADIENTS.suplementos;

  return (
    <div
      className="group relative flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white transition-all duration-300 hover:border-slate-300 hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)]"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Image area with category-tinted gradient packshot */}
      <div className="relative aspect-square overflow-hidden bg-slate-50">
        <div className={`absolute inset-0 bg-gradient-to-br ${gradient}`} />
        {/* Packshot placeholder: brand monogram */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <div className="text-5xl font-bold tracking-tight text-white/95">
              {(product.brand || 'EQ').slice(0, 2).toUpperCase()}
            </div>
            <div className="mt-1 text-[10px] uppercase tracking-[0.2em] text-white/40">
              {product.category}
            </div>
          </div>
        </div>

        {/* Discount badge */}
        {discount > 0 && (
          <span className="absolute left-3 top-3 rounded-full bg-rose-500 px-2 py-0.5 text-[11px] font-semibold text-white shadow-sm">
            −{discount}%
          </span>
        )}

        {/* Quick view button — appears on hover */}
        <button
          type="button"
          onClick={() => onQuickView?.(product)}
          className={`absolute bottom-3 left-1/2 -translate-x-1/2 rounded-full bg-white/95 px-4 py-1.5 text-xs font-medium text-slate-900 shadow-lg backdrop-blur transition-all duration-300 ${
            hovered ? 'translate-y-0 opacity-100' : 'translate-y-3 opacity-0'
          }`}
        >
          <Eye className="mr-1 inline h-3 w-3" />
          Vista rápida
        </button>
      </div>

      {/* Body */}
      <div className="flex flex-1 flex-col gap-1.5 p-4">
        {product.brand && (
          <span className="text-[10px] font-medium uppercase tracking-wider text-amber-600">
            {product.brand}
          </span>
        )}
        <Link
          href={`/producto/${product.slug}`}
          className="line-clamp-2 text-sm font-medium text-slate-900 transition-colors hover:text-amber-700"
        >
          {product.title}
        </Link>

        {/* Rating */}
        {product.rating && (
          <div className="flex items-center gap-1 text-[11px]">
            <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
            <span className="font-medium text-slate-700">{product.rating.toFixed(1)}</span>
            <span className="text-slate-400">·</span>
            <span className="text-slate-500">{product.reviewCount?.toLocaleString()}</span>
          </div>
        )}

        {/* Price */}
        <div className="mt-auto flex items-end justify-between pt-2">
          <div className="flex flex-col">
            {price.originalAmount && price.originalAmount > price.amount && (
              <span className="text-[11px] text-slate-400 line-through">
                {symbol}{price.originalAmount.toLocaleString()}
              </span>
            )}
            <span className="text-lg font-bold text-slate-900">
              {symbol}{price.amount.toLocaleString()}
              <span className="ml-1 text-[10px] font-normal text-slate-500">{price.currency}</span>
            </span>
          </div>
          <button
            type="button"
            aria-label="Agregar al carrito"
            className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-slate-900 text-white transition-colors hover:bg-amber-500 hover:text-slate-950"
          >
            <Plus className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

function currencySymbol(currency: string): string {
  const symbols: Record<string, string> = {
    USD: '$', COP: '$', MXN: '$', CLP: '$', PEN: 'S/',
  };
  return symbols[currency] || '$';
}
