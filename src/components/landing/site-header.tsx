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
      <div className="bg-[#1a1a1a] text-white">
        <div className="mx-auto flex h-9 max-w-7xl items-center justify-center px-4 text-xs font-semibold">
          <span>BF EARLY SALE: HASTA 40% OFF EN PRODUCTOS SIGNATURE</span>
          <Link href="/ofertas" className="ml-2 text-[#FFB800] hover:underline">
            COMPRAR AHORA &gt;
          </Link>
        </div>
      </div>

      {/* Main header */}
      <div className="bg-[#14181F] text-white">
        <div className="mx-auto flex h-14 max-w-7xl items-center gap-3 px-4 sm:px-6 lg:px-8">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <span className="text-xl font-extrabold italic text-[#1F5AF6]">EQ</span>
            <span className="hidden text-base font-extrabold tracking-tight sm:inline">EQUASTORE</span>
          </Link>

          {/* Search */}
          <div className="hidden flex-1 sm:flex">
            <div className="flex w-full max-w-2xl overflow-hidden rounded-md">
              <select className="border-r border-slate-300 bg-slate-100 px-2 text-xs font-semibold text-slate-700 focus:outline-none">
                <option>Todo</option>
                <option>Proteína</option>
                <option>Pre-entreno</option>
                <option>Creatina</option>
              </select>
              <input
                type="text"
                placeholder="Buscar suplementos..."
                className="h-10 flex-1 px-3 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none"
              />
              <button className="flex h-10 items-center bg-[#1F5AF6] px-4 hover:bg-[#1A4DD6]">
                <Search className="h-4 w-4 text-white" />
              </button>
            </div>
          </div>

          {/* Right */}
          <div className="ml-auto flex items-center gap-3">
            <CountrySwitcher />
            <Link
              href="/cuenta"
              className="hidden text-xs hover:text-[#1F5AF6] sm:block"
            >
              <div className="text-slate-400">Hola</div>
              <div className="font-bold">Mi cuenta</div>
            </Link>
            <Link
              href="/carrito"
              className="relative flex items-center hover:text-[#1F5AF6]"
            >
              <ShoppingCart className="h-5 w-5 text-[#1F5AF6]" />
              <span className="absolute -right-1.5 -top-1.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-[#FFB800] px-1 text-[10px] font-bold text-black">
                0
              </span>
            </Link>
            <button className="md:hidden">
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Blue nav */}
      <nav className="bg-[#1F5AF6] text-white">
        <div className="mx-auto flex h-10 max-w-7xl items-center gap-1 px-4 text-xs font-bold sm:px-6 lg:px-8">
          <button className="flex items-center gap-1 px-2 py-1 hover:bg-white/10">
            <Menu className="h-3.5 w-3.5" />
            MENÚ
          </button>
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="flex items-center gap-0.5 px-2 py-1 hover:bg-white/10"
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
