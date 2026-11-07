'use client';

import Link from 'next/link';
import { Search, ShoppingCart, Menu, ChevronDown } from 'lucide-react';
import { CountrySwitcher } from '@/components/country/country-switcher';
import { useCountry } from '@/components/country/country-provider';

const NAV_ITEMS = [
  { label: 'TIENDA', href: '/productos' },
  { label: 'OFERTAS', href: '/ofertas' },
  { label: 'PROTEÍNA', href: '/categorias/proteina' },
  { label: 'PRE-ENTRENO', href: '/categorias/pre-entreno' },
  { label: 'CREATINA', href: '/categorias/creatina' },
  { label: 'VITAMINAS', href: '/categorias/vitaminas' },
];

export function SiteHeader() {
  const { country } = useCountry();
  const base = `/${country.toLowerCase()}`;

  return (
    <header className="sticky top-0 z-50 w-full">
      {/* Promo */}
      <div style={{ background: 'linear-gradient(90deg, #1a1a1a, #0a0a0a)' }} className="text-white">
        <div className="mx-auto flex h-9 max-w-7xl items-center justify-center px-4 text-xs font-semibold">
          <span>BF EARLY SALE: HASTA 40% OFF EN PRODUCTOS SIGNATURE</span>
          <Link href={`${base}/ofertas`} className="ml-2 text-[#FFB800] hover:underline">COMPRAR AHORA →</Link>
        </div>
      </div>

      {/* Header with glassmorphism - INLINE STYLES for guaranteed render */}
      <div style={{
        background: 'rgba(20,24,31,0.85)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        borderBottom: '1px solid rgba(255,255,255,0.08)',
      }}>
        <div className="mx-auto flex h-14 max-w-7xl items-center gap-3 px-4 sm:px-6 lg:px-8">
          <Link href={base} className="flex items-center gap-2">
            <span style={{
              fontSize: '22px',
              fontWeight: 800,
              fontStyle: 'italic',
              color: '#1F5AF6',
              textShadow: '0 0 20px rgba(31,90,246,0.6)',
            }}>EQ</span>
            <span className="hidden text-base font-extrabold tracking-tight text-white sm:inline">EQUASTORE</span>
          </Link>

          {/* Search with glass */}
          <div className="hidden flex-1 sm:flex">
            <div style={{
              display: 'flex',
              width: '100%',
              maxWidth: '32rem',
              overflow: 'hidden',
              borderRadius: '8px',
              border: '1px solid rgba(255,255,255,0.1)',
              background: 'rgba(255,255,255,0.05)',
            }}>
              <select className="bg-transparent px-2 text-xs font-semibold text-slate-300 focus:outline-none" style={{ borderRight: '1px solid rgba(255,255,255,0.1)' }}>
                <option className="bg-slate-900">Todo</option>
                <option className="bg-slate-900">Proteína</option>
              </select>
              <input
                type="text"
                placeholder="Buscar suplementos..."
                className="h-10 flex-1 bg-transparent px-3 text-sm text-white placeholder:text-slate-500 focus:outline-none"
              />
              <button style={{
                background: 'linear-gradient(135deg, #1F5AF6, #1A4DD6)',
                boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.15)',
              }} className="flex h-10 items-center px-4 hover:opacity-90">
                <Search className="h-4 w-4 text-white" />
              </button>
            </div>
          </div>

          <div className="ml-auto flex items-center gap-3">
            <CountrySwitcher />
            <Link href={`${base}/cuenta`} className="hidden text-xs hover:text-[#1F5AF6] sm:block">
              <div className="text-slate-400">Hola</div>
              <div className="font-bold text-white">Mi cuenta</div>
            </Link>
            <Link href={`${base}/carrito`} className="relative flex items-center hover:text-[#1F5AF6]">
              <ShoppingCart className="h-5 w-5 text-[#1F5AF6]" />
              <span style={{
                position: 'absolute',
                right: '-6px',
                top: '-6px',
                background: 'linear-gradient(135deg, #FFB800, #E5A700)',
                boxShadow: '0 2px 8px rgba(255,184,0,0.4)',
              }} className="flex h-4 min-w-4 items-center justify-center rounded-full px-1 text-[10px] font-bold text-black">0</span>
            </Link>
            <button className="md:hidden">
              <Menu className="h-5 w-5 text-white" />
            </button>
          </div>
        </div>
      </div>

      {/* Blue nav with shadow */}
      <nav style={{
        background: 'linear-gradient(180deg, #1F5AF6, #1A4DD6)',
        boxShadow: '0 4px 20px rgba(31,90,246,0.3)',
      }} className="text-white">
        <div className="mx-auto flex h-10 max-w-7xl items-center gap-1 px-4 text-xs font-bold sm:px-6 lg:px-8">
          <button className="flex items-center gap-1 px-2 py-1 hover:bg-white/10">
            <Menu className="h-3.5 w-3.5" />MENÚ
          </button>
          {NAV_ITEMS.map((item) => (
            <Link key={item.label} href={`${base}${item.href}`} className="flex items-center gap-0.5 px-2 py-1 hover:bg-white/10">
              {item.label}<ChevronDown className="h-3 w-3 opacity-50" />
            </Link>
          ))}
        </div>
      </nav>
    </header>
  );
}
