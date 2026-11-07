'use client';

import { useState } from 'react';
import { Star, ShoppingCart, Shield, Truck, CheckCircle2, Minus, Plus } from 'lucide-react';
import { toast } from 'sonner';
import type { Product } from '@/types/product';
import type { CountryCode, CountryConfig } from '@/lib/countries';

interface PriceInfo {
  currency: string;
  amount: number;
  originalAmount?: number;
  dropiSku?: string;
}

interface Props {
  product: Product;
  country: CountryCode;
  price: PriceInfo;
  symbol: string;
  config: CountryConfig;
}

export function ProductDetailClient({ product, country, price, symbol, config }: Props) {
  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = () => {
    toast.success(`${quantity} × ${product.title} agregado al carrito`);
  };

  return (
    <div className="flex flex-col gap-5">
      {product.brand && (
        <span className="text-xs font-medium uppercase tracking-wide text-blue-600">
          {product.brand}
        </span>
      )}

      <h1 className="text-3xl font-bold text-slate-900">{product.title}</h1>

      {product.rating && (
        <div className="flex items-center gap-2 text-sm">
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
          {product.reviewCount && (
            <span className="text-slate-500">({product.reviewCount.toLocaleString()} reseñas)</span>
          )}
        </div>
      )}

      <p className="text-base text-slate-600">{product.description}</p>

      {/* Price */}
      <div className="flex items-end gap-3 border-y border-slate-100 py-4">
        {price.originalAmount && price.originalAmount > price.amount && (
          <span className="text-base text-slate-400 line-through">
            {symbol}{price.originalAmount.toLocaleString()}
          </span>
        )}
        <span className="text-3xl font-bold text-slate-900">
          {symbol}{price.amount.toLocaleString()}
        </span>
        <span className="text-sm text-slate-500">{price.currency}</span>
      </div>

      {/* Quantity + cart */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="flex items-center rounded-lg border border-slate-200">
          <button
            type="button"
            onClick={() => setQuantity((q) => Math.max(1, q - 1))}
            className="px-3 py-2 text-slate-600 hover:bg-slate-50"
            aria-label="Disminuir cantidad"
          >
            <Minus className="h-4 w-4" />
          </button>
          <span className="w-12 text-center text-sm font-medium">{quantity}</span>
          <button
            type="button"
            onClick={() => setQuantity((q) => q + 1)}
            className="px-3 py-2 text-slate-600 hover:bg-slate-50"
            aria-label="Aumentar cantidad"
          >
            <Plus className="h-4 w-4" />
          </button>
        </div>
        <button
          type="button"
          onClick={handleAddToCart}
          className="inline-flex flex-1 items-center justify-center gap-2 rounded-lg bg-blue-700 px-6 py-3 text-sm font-medium text-white hover:bg-blue-800"
        >
          <ShoppingCart className="h-4 w-4" />
          Agregar — {symbol}{(price.amount * quantity).toLocaleString()}
        </button>
      </div>

      {/* Trust */}
      <div className="space-y-2 border-t border-slate-100 pt-4 text-sm text-slate-600">
        <div className="flex items-center gap-2">
          <Shield className="h-4 w-4 text-blue-600" />
          <span>ISO Certified Lab — calidad farmacéutica</span>
        </div>
        <div className="flex items-center gap-2">
          <Truck className="h-4 w-4 text-blue-600" />
          <span>Envío 24-72h · gratis sobre {symbol}{config.freeShippingThreshold.toLocaleString()}</span>
        </div>
        <div className="flex items-center gap-2">
          <CheckCircle2 className="h-4 w-4 text-emerald-600" />
          <span>Garantía 30 días — devolución sin preguntas</span>
        </div>
      </div>
    </div>
  );
}
