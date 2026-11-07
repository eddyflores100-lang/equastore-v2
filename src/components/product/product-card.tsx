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
  const glowColor = categoryGlow(product.category);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setTilt({
      x: ((y - rect.height/2) / (rect.height/2)) * -6,
      y: ((x - rect.width/2) / (rect.width/2)) * 6,
    });
  };

  return (
    <div
      ref={cardRef}
      className="group relative depth-card rounded-xl bg-white"
      style={{ perspective: '1000px' }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => { setHovered(false); setTilt({x:0,y:0}); }}
    >
      {/* Image area with permanent depth */}
      <Link
        href={`/producto/${product.slug}`}
        className="relative block aspect-square overflow-hidden rounded-t-xl"
        style={{ background: `linear-gradient(135deg, ${glowColor}30, #0f172a 70%)` }}
      >
        {/* Permanent radial glow behind product */}
        <div
          className="absolute left-1/2 top-1/2 h-32 w-32 -translate-x-1/2 -translate-y-1/2 rounded-full opacity-40 blur-3xl"
          style={{ background: `radial-gradient(circle, ${glowColor}, transparent 70%)` }}
        />

        {/* Brand monogram with text shadow */}
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-6xl font-black text-white/90" style={{ textShadow: '0 4px 30px rgba(0,0,0,0.6), 0 0 40px ' + glowColor + '40' }}>
            {(product.brand || 'EQ').slice(0, 2).toUpperCase()}
          </span>
        </div>

        {/* Inner shadow on image for depth */}
        <div className="absolute inset-0 img-depth rounded-t-xl" />

        {/* Shine sweep on hover */}
        <div className="absolute inset-0 overflow-hidden rounded-t-xl">
          <div className="absolute -inset-y-4 -left-1/2 w-1/2 rotate-12 bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover:translate-x-[300%]" />
        </div>

        {/* Badges with depth */}
        <div className="absolute left-2 top-2 flex flex-col gap-1">
          {discount > 0 && (
            <span className="depth-badge-red rounded px-2 py-0.5 text-[10px] font-bold text-white">
              −{discount}%
            </span>
          )}
          <span className="depth-badge-yellow rounded px-2 py-0.5 text-[10px] font-bold text-black">
            B2G1 FREE
          </span>
        </div>

        {/* Quick view */}
        {hovered && (
          <button
            onClick={(e) => { e.preventDefault(); onQuickView?.(product); }}
            className="absolute bottom-2 left-1/2 -translate-x-1/2 rounded-full bg-white/95 px-4 py-1.5 text-xs font-bold text-slate-900 shadow-xl backdrop-blur"
          >
            Vista rápida
          </button>
        )}
      </Link>

      {/* Body */}
      <div
        className="flex flex-1 flex-col p-3 rounded-b-xl bg-white"
        style={{
          transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
          transformStyle: 'preserve-3d',
          transition: hovered ? 'transform 0.1s ease-out' : 'transform 0.4s ease-out',
        }}
      >
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
          className="depth-btn mt-2 inline-flex h-9 items-center justify-center gap-1.5 rounded-lg text-xs font-bold text-white"
        >
          <ShoppingCart className="h-3.5 w-3.5" />
          COMPRAR
        </button>
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
