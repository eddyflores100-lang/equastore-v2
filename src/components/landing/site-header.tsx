'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Search, ShoppingCart, User, Menu, ChevronDown, MapPin } from 'lucide-react';
import { CountrySwitcher } from '@/components/country/country-switcher';

const NAV_CATEGORIES = [
  { label: 'PROTEÍNA', href: '/categorias/proteina' },
  { label: 'PRE-ENTRENO', href: '/categorias/pre-entreno' },
  { label: 'CREATINA', href: '/categorias/creatina' },
  { label: 'VITAMINAS', href: '/categorias/vitaminas' },
  { label: 'REDUCTORES', href: '/categorias/reductores' },
  { label: 'RENDIMIENTO', href: '/categorias/rendimiento' },
];

export function SiteHeader() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full">
      {/* Promo banner — top */}
      <div className="bg-black text-white">
        <div className="mx-auto flex h-9 max-w-7xl items-center justify-between px-4 text-xs">
          <p className="flex items-center gap-2">
            <span className="font-bold text-amber-400">★ BF EARLY SALE</span>
            <span className="hidden sm:inline">HASTA 40% OFF EN PRODUCTOS SIGNATURE</span>
            <span className="sm:hidden">40% OFF</span>
            <Link href="/ofertas" className="ml-1 font-bold text-amber-400 underline hover:text-amber-300">
              SHOP NOW &gt;
            </Link>
          </p>
          <div className="hidden items-center gap-4 sm:flex">
            <span className="flex items-center gap-1 text-slate-300">
              <MapPin className="h-3 w-3" />
              Envíos a LATAM
            </span>
            <Link href="/rewards" className="text-slate-300 hover:text-white">
              Gana 5 puntos por $1
            </Link>
          </div>
        </div>
      </div>

      {/* Main bar */}
      <div className="bg-[#0a0a0a] text-white shadow-lg">
        <div className="mx-auto flex h-16 max-w-7xl items-center gap-4 px-4 sm:px-6 lg:px-8">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <span className="bg-amber-400 px-2 py-1 text-xs font-black text-black">EQ</span>
            <span className="hidden text-lg font-black tracking-tight sm:inline">EQUASTORE</span>
          </Link>

          {/* Search */}
          <div className="hidden flex-1 sm:flex">
            <div className="flex w-full max-w-2xl items-center rounded-md bg-white">
              <input
                type="text"
                placeholder="Buscar suplementos, marcas, ingredientes..."
                className="h-10 flex-1 rounded-l-md px-4 text-sm text-black placeholder:text-slate-500 focus:outline-none"
              />
              <select className="hidden h-10 border-l border-slate-200 bg-slate-50 px-2 text-xs text-slate-700 focus:outline-none md:block">
                <option>Todas las categorías</option>
                <option>Proteína</option>
                <option>Pre-entreno</option>
                <option>Creatina</option>
                <option>Vitaminas</option>
              </select>
              <button className="h-10 bg-amber-400 px-4 hover:bg-amber-500">
                <Search className="h-4 w-4 text-black" />
              </button>
            </div>
          </div>

          {/* Right actions */}
          <div className="ml-auto flex items-center gap-4">
            <CountrySwitcher />
            <Link
              href="/cuenta"
              className="hidden items-center gap-1 text-xs hover:text-amber-400 sm:flex"
            >
              <User className="h-5 w-5" />
              <div>
                <div className="text-slate-400">Hola, Sign in</div>
                <div className="font-bold">Cuenta</div>
              </div>
            </Link>
            <Link
              href="/carrito"
              className="relative flex items-center text-xs hover:text-amber-400"
            >
              <ShoppingCart className="h-6 w-6" />
              <span className="ml-1 hidden font-bold sm:inline">Carrito</span>
              <span className="absolute -right-2 -top-2 flex h-4 min-w-4 items-center justify-center rounded-full bg-amber-400 px-1 text-[10px] font-black text-black">
                0
              </span>
            </Link>
            <button
              aria-label="Menú"
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden"
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>

      {/* Category nav */}
      <nav className="hidden bg-[#1a1a1a] text-white md:block">
        <div className="mx-auto flex h-11 max-w-7xl items-center gap-6 px-4 text-xs font-bold tracking-wide sm:px-6 lg:px-8">
          <Link
            href="/productos"
            className="flex items-center gap-1 bg-amber-400 px-3 py-2 text-black hover:bg-amber-500"
          >
            <Menu className="h-3 w-3" />
            SHOP ALL
          </Link>
          {NAV_CATEGORIES.map((cat) => (
            <Link
              key={cat.label}
              href={cat.href}
              className="flex items-center gap-1 hover:text-amber-400"
            >
              {cat.label}
              <ChevronDown className="h-3 w-3 opacity-50" />
            </Link>
          ))}
          <Link href="/ofertas" className="ml-auto text-rose-400 hover:text-rose-300">
            🔥 OFERTAS
          </Link>
        </div>
      </nav>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="border-b border-slate-800 bg-[#0a0a0a] text-white md:hidden">
          <div className="space-y-1 p-4">
            {NAV_CATEGORIES.map((cat) => (
              <Link
                key={cat.label}
                href={cat.href}
                className="block py-2 text-sm font-bold hover:text-amber-400"
              >
                {cat.label}
              </Link>
            ))}
            <Link href="/ofertas" className="block py-2 text-sm font-bold text-rose-400">
              🔥 OFERTAS
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
