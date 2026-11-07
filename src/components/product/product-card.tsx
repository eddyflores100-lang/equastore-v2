'use client';

import Link from 'next/link';
import { Star, ShoppingCart } from 'lucide-react';
import { useState, useRef, type MouseEvent } from 'react';
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
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const price = getProductPrice(product, country);
  const discount = getDiscountPercent(price);
  const symbol = currencySymbol(price.currency);

  // 3D tilt effect on mouse move
  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -8;
    const rotateY = ((x - centerX) / centerX) * 8;
    setTilt({ x: rotateX, y: rotateY });
  };

  const handleMouseLeave = () => {
    setHovered(false);
    setTilt({ x: 0, y: 0 });
  };

  return (
    <div
      ref={cardRef}
      className="group relative"
      style={{ perspective: '1000px' }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={handleMouseLeave}
    >
      {/* Glow border behind card */}
      <div
        className="absolute -inset-0.5 rounded-xl bg-gradient-to-br from-[#1F5AF6] via-[#3B82F6] to-[#1F5AF6] opacity-0 blur-sm transition-opacity duration-300 group-hover:opacity-40"
      />

      <div
        className="relative flex flex-col overflow-hidden rounded-xl border border-slate-200 bg-white transition-all duration-200 group-hover:shadow-[0_20px_50px_-10px_rgba(31,90,246,0.25)]"
        style={{
          transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
          transformStyle: 'preserve-3d',
          transition: hovered ? 'transform 0.1s ease-out' : 'transform 0.4s ease-out',
        }}
      >
        {/* Image */}
        <Link
          href={`/producto/${product.slug}`}
          className="relative block aspect-square overflow-hidden bg-gradient-to-br from-slate-800 to-slate-950"
          style={{ transform: 'translateZ(30px)' }}
        >
          {/* Product image with depth gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-slate-700/80 via-slate-800 to-slate-950" />

          {/* Glow behind product */}
          <div
            className="absolute left-1/2 top-1/2 h-32 w-32 -translate-x-1/2 -translate-y-1/2 rounded-full opacity-30 blur-3xl transition-opacity duration-500 group-hover:opacity-60"
            style={{
              background: `radial-gradient(circle, ${categoryGlow(product.category)}, transparent)`,
            }}
          />

          {/* Brand monogram with 3D depth */}
          <div className="absolute inset-0 flex items-center justify-center">
            <span
              className="text-6xl font-black text-white/90 transition-transform duration-300 group-hover:scale-110"
              style={{ textShadow: '0 4px 20px rgba(0,0,0,0.5)' }}
            >
              {(product.brand || 'EQ').slice(0, 2).toUpperCase()}
            </span>
          </div>

          {/* Shine sweep on hover */}
          <div className="absolute inset-0 overflow-hidden">
            <div
              className="absolute -inset-y-4 -left-1/2 w-1/2 rotate-12 bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover:translate-x-[300%]"
            />
          </div>

          {/* Badges with depth shadow */}
          <div className="absolute left-2 top-2 flex flex-col gap-1" style={{ transform: 'translateZ(40px)' }}>
            {discount > 0 && (
              <span className="rounded bg-[#DC2626] px-2 py-0.5 text-[10px] font-bold text-white shadow-lg">
                −{discount}%
              </span>
            )}
            <span className="rounded bg-[#FFB800] px-2 py-0.5 text-[10px] font-bold text-black shadow-lg">
              B2G1 FREE
            </span>
          </div>

          {/* Quick view */}
          {hovered && (
            <button
              onClick={(e) => { e.preventDefault(); onQuickView?.(product); }}
              className="absolute bottom-2 left-1/2 -translate-x-1/2 rounded-full bg-white/95 px-4 py-1.5 text-xs font-bold text-slate-900 shadow-xl backdrop-blur"
              style={{ transform: 'translate(-50%, 0) translateZ(50px)' }}
            >
              Vista rápida
            </button>
          )}
        </Link>

        {/* Body */}
        <div className="flex flex-1 flex-col p-3" style={{ transform: 'translateZ(20px)' }}>
          <div className="text-[10px] font-bold uppercase tracking-wider text-[#1F5AF6]">
            {product.brand || 'Equastore'}
          </div>

          <Link
            href={`/producto/${product.slug}`}
            className="mt-0.5 line-clamp-2 text-sm font-semibold text-slate-900 hover:text-[#1F5AF6]"
          >
            {product.title}
          </Link>

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

          <button
            onClick={() => onQuickView?.(product)}
            className="mt-2 inline-flex h-9 items-center justify-center gap-1.5 rounded-lg bg-[#1F5AF6] text-xs font-bold text-white shadow-md transition-all hover:shadow-[0_4px_12px_rgba(31,90,246,0.4)] hover:bg-[#1A4DD6]"
          >
            <ShoppingCart className="h-3.5 w-3.5" />
            COMPRAR
          </button>
        </div>
      </div>
    </div>
  );
}

function categoryGlow(category: string): string {
  const glows: Record<string, string> = {
    suplementos: '#10B981',
    fuerza: '#F59E0B',
    definicion: '#EF4444',
    vitalidad: '#8B5CF6',
  };
  return glows[category] || '#1F5AF6';
}

function currencySymbol(currency: string): string {
  const symbols: Record<string, string> = { USD:'$', COP:'$', MXN:'$', CLP:'$', PEN:'S/' };
  return symbols[currency] || '$';
}
