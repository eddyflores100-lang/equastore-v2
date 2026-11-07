'use client';

import Link from 'next/link';
import { Star, ShoppingCart } from 'lucide-react';
import { motion } from 'framer-motion';
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
  const glowColor = categoryGlow(product.category);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, delay: index * 0.08, ease: 'easeOut' }}
      className="group relative"
      style={{ perspective: '1000px' }}
    >
      <motion.div
        whileHover={{ y: -8, rotateX: 2, rotateY: -2 }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        style={{
          borderRadius: '12px',
          overflow: 'hidden',
          background: '#fff',
          boxShadow: '0 4px 12px -2px rgba(0,0,0,0.08)',
          border: '1px solid #e5e7eb',
          transformStyle: 'preserve-3d',
        }}
      >
        {/* Image */}
        <Link href={`${base}/producto/${product.slug}`} className="relative block aspect-square overflow-hidden">
          <div style={{ position: 'absolute', inset: 0, background: `linear-gradient(135deg, ${glowColor}40, #0f172a 70%)` }} />
          <div style={{ position: 'absolute', left: '50%', top: '50%', width: '140px', height: '140px', transform: 'translate(-50%, -50%)', borderRadius: '50%', background: `radial-gradient(circle, ${glowColor}, transparent 70%)`, opacity: 0.4, filter: 'blur(40px)' }} />
          <div className="absolute inset-0 flex items-center justify-center">
            <span style={{ fontSize: '3.5rem', fontWeight: 900, color: 'rgba(255,255,255,0.9)', textShadow: `0 4px 30px rgba(0,0,0,0.6), 0 0 40px ${glowColor}80` }}>
              {(product.brand || 'EQ').slice(0, 2).toUpperCase()}
            </span>
          </div>
          <div style={{ position: 'absolute', inset: 0, boxShadow: 'inset 0 0 60px rgba(0,0,0,0.3), inset 0 -20px 40px rgba(0,0,0,0.15)' }} />

          {/* Badges */}
          <div className="absolute left-2 top-2 flex flex-col gap-1">
            {discount > 0 && (
              <span style={{ borderRadius: '4px', padding: '2px 8px', fontSize: '10px', fontWeight: 700, color: '#fff', background: 'linear-gradient(135deg, #DC2626, #B91C1C)', boxShadow: '0 2px 8px rgba(220,38,38,0.4)' }}>−{discount}%</span>
            )}
            <span style={{ borderRadius: '4px', padding: '2px 8px', fontSize: '10px', fontWeight: 700, color: '#000', background: 'linear-gradient(135deg, #FFB800, #E5A700)', boxShadow: '0 2px 8px rgba(255,184,0,0.4)' }}>B2G1 FREE</span>
          </div>
        </Link>

        {/* Body */}
        <div className="flex flex-1 flex-col p-3">
          <div className="text-[10px] font-bold uppercase tracking-wider text-[#1F5AF6]">{product.brand || 'Equastore'}</div>
          <Link href={`${base}/producto/${product.slug}`} className="mt-0.5 line-clamp-2 text-sm font-semibold text-slate-900 hover:text-[#1F5AF6]">{product.title}</Link>

          {product.rating && (
            <div className="mt-1 flex items-center gap-1 text-[11px]">
              <div className="flex">
                {[1,2,3,4,5].map(s => <Star key={s} className={`h-3 w-3 ${s <= Math.round(product.rating!) ? 'fill-[#FFB800] text-[#FFB800]' : 'fill-slate-200 text-slate-200'}`} />)}
              </div>
              <span className="font-semibold text-slate-700">{product.rating.toFixed(1)}</span>
              <span className="text-slate-400">({product.reviewCount?.toLocaleString()})</span>
            </div>
          )}

          <div className="mt-1 text-[11px] text-slate-500">{product.specifications?.[0] || 'Suplemento premium'}</div>
          <div className="mt-1 text-[11px] font-bold text-emerald-600">En stock</div>

          <div className="mt-2 flex items-baseline gap-2">
            {discount > 0 && <span className="text-xs text-slate-400 line-through">{symbol}{price.originalAmount?.toLocaleString()}</span>}
            <span style={{ fontSize: '1.125rem', fontWeight: 800, color: discount > 0 ? '#DC2626' : '#111827' }}>{symbol}{price.amount.toLocaleString()}</span>
            <span className="text-[10px] text-slate-500">{price.currency}</span>
          </div>

          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => onQuickView?.(product)}
            style={{
              marginTop: '8px',
              height: '36px',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px',
              borderRadius: '8px',
              fontSize: '12px',
              fontWeight: 700,
              color: '#fff',
              background: 'linear-gradient(135deg, #1F5AF6, #1A4DD6)',
              boxShadow: '0 4px 12px rgba(31,90,246,0.35), inset 0 1px 0 rgba(255,255,255,0.15)',
              border: 'none',
              cursor: 'pointer',
            }}
          >
            <ShoppingCart className="h-3.5 w-3.5" />COMPRAR
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
}

function categoryGlow(category: string): string {
  const glows: Record<string, string> = { suplementos: '#10B981', fuerza: '#F59E0B', definicion: '#EF4444', vitalidad: '#8B5CF6' };
  return glows[category] || '#1F5AF6';
}

function currencySymbol(currency: string): string {
  const symbols: Record<string, string> = { USD:'$', COP:'$', MXN:'$', CLP:'$', PEN:'S/' };
  return symbols[currency] || '$';
}
