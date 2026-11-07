'use client';

import Link from 'next/link';
import { Star, ShoppingCart, Eye, Heart } from 'lucide-react';
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
  const [isFavorite, setIsFavorite] = useState(false);
  const price = getProductPrice(product, country);
  const discount = getDiscountPercent(price);
  const symbol = currencySymbol(price.currency);

  return (
    <div className="group relative flex flex-col overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition-all hover:shadow-md">
      {/* Image */}
      <div className="relative aspect-square overflow-hidden bg-slate-50">
        <Link href={`/producto/${product.slug}`}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={product.images[0]}
            alt={product.title}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </Link>

        {/* Badges */}
        <div className="absolute left-3 top-3 flex flex-col gap-2">
          {product.badge && (
            <span className={`${product.badge.color} rounded-full px-2.5 py-1 text-xs font-semibold text-white shadow-sm`}>
              {product.badge.text}
            </span>
          )}
          {discount > 0 && !product.badge && (
            <span className="rounded-full bg-orange-500 px-2.5 py-1 text-xs font-semibold text-white shadow-sm">
              -{discount}%
            </span>
          )}
        </div>

        {/* Favorite */}
        <button
          type="button"
          onClick={() => setIsFavorite((v) => !v)}
          aria-label="Agregar a favoritos"
          className="absolute right-3 top-3 rounded-full bg-white/90 p-2 text-slate-600 shadow-sm transition-colors hover:text-rose-500"
        >
          <Heart className={`h-4 w-4 ${isFavorite ? 'fill-rose-500 text-rose-500' : ''}`} />
        </button>

        {/* Quick view overlay */}
        <button
          type="button"
          onClick={() => onQuickView?.(product)}
          className="absolute bottom-3 left-1/2 -translate-x-1/2 translate-y-4 rounded-full bg-slate-900/90 px-4 py-2 text-xs font-medium text-white opacity-0 shadow-lg transition-all group-hover:translate-y-0 group-hover:opacity-100"
        >
          <Eye className="mr-1 inline h-3.5 w-3.5" />
          Vista rápida
        </button>
      </div>

      {/* Body */}
      <div className="flex flex-1 flex-col gap-2 p-4">
        {product.brand && (
          <span className="text-xs font-medium uppercase tracking-wide text-blue-600">
            {product.brand}
          </span>
        )}
        <Link href={`/producto/${product.slug}`} className="line-clamp-2 font-semibold text-slate-900 hover:text-blue-600">
          {product.title}
        </Link>
        <p className="line-clamp-2 text-sm text-slate-500">{product.description}</p>

        {/* Rating */}
        {product.rating && (
          <div className="flex items-center gap-1 text-xs">
            <div className="flex">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className={`h-3.5 w-3.5 ${
                    star <= Math.round(product.rating!)
                      ? 'fill-amber-400 text-amber-400'
                      : 'fill-slate-200 text-slate-200'
                  }`}
                />
              ))}
            </div>
            <span className="font-medium text-slate-700">{product.rating.toFixed(1)}</span>
            {product.reviewCount && (
              <span className="text-slate-400">({product.reviewCount.toLocaleString()})</span>
            )}
          </div>
        )}

        {/* Price */}
        <div className="mt-auto flex items-end justify-between pt-2">
          <div className="flex flex-col">
            {price.originalAmount && price.originalAmount > price.amount && (
              <span className="text-xs text-slate-400 line-through">
                {symbol}
                {price.originalAmount.toLocaleString()}
              </span>
            )}
            <span className="text-lg font-bold text-slate-900">
              {symbol}
              {price.amount.toLocaleString()}
              <span className="ml-1 text-xs font-normal text-slate-500">{price.currency}</span>
            </span>
          </div>
          <button
            type="button"
            aria-label="Agregar al carrito"
            className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-blue-700 text-white transition-colors hover:bg-blue-800"
          >
            <ShoppingCart className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

function currencySymbol(currency: string): string {
  const symbols: Record<string, string> = {
    USD: '$',
    COP: '$',
    MXN: '$',
    CLP: '$',
    PEN: 'S/',
  };
  return symbols[currency] || '$';
}
