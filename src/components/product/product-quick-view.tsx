'use client';

import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from '@/components/ui/sheet';
import { Star, ShoppingCart, Shield, Truck, CheckCircle2 } from 'lucide-react';
import type { Product } from '@/types/product';
import type { CountryCode } from '@/lib/countries';
import { getProductPrice, getDiscountPercent } from '@/lib/products/mock-data';
import { useState } from 'react';

interface ProductQuickViewProps {
  product: Product | null;
  country: CountryCode;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ProductQuickView({ product, country, open, onOpenChange }: ProductQuickViewProps) {
  const [quantity, setQuantity] = useState(1);
  if (!product) return null;

  const price = getProductPrice(product, country);
  const discount = getDiscountPercent(price);
  const symbol = currencySymbol(price.currency);

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full sm:max-w-2xl overflow-y-auto">
        <SheetHeader>
          <SheetTitle className="text-xl">{product.title}</SheetTitle>
          <SheetDescription className="sr-only">Detalles del producto</SheetDescription>
        </SheetHeader>

        <div className="mt-6 grid gap-6 sm:grid-cols-2">
          {/* Image */}
          <div className="relative aspect-square overflow-hidden rounded-xl bg-slate-50">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={product.images[0]} alt={product.title} className="h-full w-full object-cover" />
            {discount > 0 && (
              <span className="absolute left-3 top-3 rounded-full bg-orange-500 px-2.5 py-1 text-xs font-semibold text-white">
                -{discount}%
              </span>
            )}
          </div>

          {/* Details */}
          <div className="flex flex-col gap-4">
            {product.brand && (
              <span className="text-xs font-medium uppercase tracking-wide text-blue-600">
                {product.brand}
              </span>
            )}

            {product.rating && (
              <div className="flex items-center gap-1.5 text-sm">
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`h-4 w-4 ${
                        star <= Math.round(product.rating!)
                          ? 'fill-amber-400 text-amber-400'
                          : 'fill-slate-200 text-slate-200'
                      }`}
                    />
                  ))}
                </div>
                <span className="font-medium">{product.rating.toFixed(1)}</span>
                <span className="text-slate-500">({product.reviewCount} reseñas)</span>
              </div>
            )}

            <p className="text-sm text-slate-600">{product.description}</p>

            <div className="flex items-end gap-3">
              {price.originalAmount && price.originalAmount > price.amount && (
                <span className="text-base text-slate-400 line-through">
                  {symbol}
                  {price.originalAmount.toLocaleString()}
                </span>
              )}
              <span className="text-2xl font-bold text-slate-900">
                {symbol}
                {price.amount.toLocaleString()}
              </span>
              <span className="text-sm text-slate-500">{price.currency}</span>
            </div>

            {/* Quantity + cart */}
            <div className="flex items-center gap-3">
              <div className="flex items-center rounded-lg border border-slate-200">
                <button
                  type="button"
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="px-3 py-2 text-slate-600 hover:bg-slate-50"
                >
                  −
                </button>
                <span className="w-10 text-center text-sm font-medium">{quantity}</span>
                <button
                  type="button"
                  onClick={() => setQuantity((q) => q + 1)}
                  className="px-3 py-2 text-slate-600 hover:bg-slate-50"
                >
                  +
                </button>
              </div>
              <button
                type="button"
                className="inline-flex flex-1 items-center justify-center gap-2 rounded-lg bg-blue-700 px-4 py-2.5 text-sm font-medium text-white hover:bg-blue-800"
              >
                <ShoppingCart className="h-4 w-4" />
                Agregar — {symbol}
                {(price.amount * quantity).toLocaleString()}
              </button>
            </div>

            {/* Trust */}
            <div className="mt-2 space-y-2 border-t border-slate-100 pt-4 text-xs text-slate-600">
              <div className="flex items-center gap-2">
                <Shield className="h-4 w-4 text-blue-600" />
                <span>ISO Certified Lab — calidad farmacéutica</span>
              </div>
              <div className="flex items-center gap-2">
                <Truck className="h-4 w-4 text-blue-600" />
                <span>Envío 24-72h · gratis +{symbol}{(country === 'EC' ? 25 : country === 'CO' ? 100000 : 999).toLocaleString()}</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                <span>Garantía 30 días — devolución sin preguntas</span>
              </div>
            </div>

            {/* Specs */}
            {product.specifications && product.specifications.length > 0 && (
              <div className="mt-2 border-t border-slate-100 pt-4">
                <h4 className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Especificaciones
                </h4>
                <ul className="space-y-1.5 text-sm">
                  {product.specifications.map((spec) => (
                    <li key={spec} className="flex items-start gap-2">
                      <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 flex-shrink-0 text-emerald-600" />
                      <span>{spec}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </SheetContent>
    </Sheet>
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
