'use client';

import Link from 'next/link';
import { Search, ShoppingCart, Menu, ChevronDown } from 'lucide-react';
import { CountrySwitcher } from '@/components/country/country-switcher';

const NAV_ITEMS = [
  { label: 'TIENDA', href: '/productos' },
  { label: 'OFERTAS', href: '/ofertas' },
  { label: 'PROTEÍNA', href: '/categorias/proteina' },
  { label: 'PRE-ENTRENO', href: '/categorias/pre-entreno' },
  { label: 'CREATINA', href: '/categorias/creatina' },
  { label: 'VITAMINAS', href: '/categorias/vitaminas' },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 w-full">
      {/* Promo banner */}
      <div className="bg-gradient-to-r from-[#1a1a1a] to-[#0a0a0a] text-white">
        <div className="mx-auto flex h-9 max-w-7xl items-center justify-center px-4 text-xs font-semibold">
          <span className="bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
            BF EARLY SALE: HASTA 40% OFF EN PRODUCTOS SIGNATURE
          </span>
          <Link href="/ofertas" className="ml-2 text-[#FFB800] hover:underline">
            COMPRAR AHORA →
          </Link>
        </div>
      </div>

      {/* Main header with glassmorphism */}
      <div className="border-b border-white/10 bg-[#14181F]/95 backdrop-blur-xl">
        <div className="mx-auto flex h-14 max-w-7xl items-center gap-3 px-4 sm:px-6 lg:px-8">
          {/* Logo with glow */}
          <Link href="/" className="flex items-center gap-2">
            <span
              className="text-xl font-extrabold italic text-[#1F5AF6]"
              style={{ textShadow: '0 0 20px rgba(31,90,246,0.5)' }}
            >
              EQ
            </span>
            <span className="hidden text-base font-extrabold tracking-tight text-white sm:inline">EQUASTORE</span>
          </Link>

          {/* Search with depth */}
          <div className="hidden flex-1 sm:flex">
            <div className="flex w-full max-w-2xl overflow-hidden rounded-lg border border-white/10 bg-white/5 backdrop-blur-md">
              <select className="border-r border-white/10 bg-transparent px-2 text-xs font-semibold text-slate-300 focus:outline-none">
                <option className="bg-slate-900">Todo</option>
                <option className="bg-slate-900">Proteína</option>
                <option className="bg-slate-900">Pre-entreno</option>
                <option className="bg-slate-900">Creatina</option>
              </select>
              <input
                type="text"
                placeholder="Buscar suplementos..."
                className="h-10 flex-1 bg-transparent px-3 text-sm text-white placeholder:text-slate-500 focus:outline-none"
              />
              <button className="flex h-10 items-center bg-[#1F5AF6] px-4 transition hover:bg-[#1A4DD6]">
                <Search className="h-4 w-4 text-white" />
              </button>
            </div>
          </div>

          {/* Right */}
          <div className="ml-auto flex items-center gap-3">
            <CountrySwitcher />
            <Link href="/cuenta" className="hidden text-xs hover:text-[#1F5AF6] sm:block">
              <div className="text-slate-400">Hola</div>
              <div className="font-bold text-white">Mi cuenta</div>
            </Link>
            <Link href="/carrito" className="relative flex items-center hover:text-[#1F5AF6]">
              <div className="relative">
                <ShoppingCart className="h-5 w-5 text-[#1F5AF6]" />
                <span className="absolute -right-1.5 -top-1.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-[#FFB800] px-1 text-[10px] font-bold text-black shadow-md">
                  0
                </span>
              </div>
            </Link>
            <button className="md:hidden">
              <Menu className="h-5 w-5 text-white" />
            </button>
          </div>
        </div>
      </div>

      {/* Blue nav with depth shadow */}
      <nav className="bg-[#1F5AF6] text-white shadow-[0_4px_20px_rgba(31,90,246,0.3)]">
        <div className="mx-auto flex h-10 max-w-7xl items-center gap-1 px-4 text-xs font-bold sm:px-6 lg:px-8">
          <button className="flex items-center gap-1 px-2 py-1 transition hover:bg-white/10">
            <Menu className="h-3.5 w-3.5" />
            MENÚ
          </button>
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="flex items-center gap-0.5 px-2 py-1 transition hover:bg-white/10"
            >
              {item.label}
              <ChevronDown className="h-3 w-3 opacity-50" />
            </Link>
          ))}
        </div>
      </nav>
    </header>
  );
}
