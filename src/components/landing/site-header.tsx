'use client';

import Link from 'next/link';
import { ShoppingBag, Search, Menu } from 'lucide-react';
import { CountrySwitcher } from '@/components/country/country-switcher';
import { useCountry } from '@/components/country/country-provider';

export function SiteHeader() {
  const { config } = useCountry();
  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200/80 bg-white/80 backdrop-blur-xl">
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        {/* Left: logo + nav */}
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center gap-1.5 text-lg font-bold tracking-tight">
            <span className="inline-flex h-7 w-7 items-center justify-center rounded-md bg-slate-900 text-[10px] text-amber-400">
              EQ
            </span>
            <span className="text-slate-900">equastore</span>
          </Link>
          <nav className="hidden md:flex items-center gap-6 text-sm text-slate-600">
            <Link href="/productos" className="transition-colors hover:text-slate-900">
              Productos
            </Link>
            <Link href="/categorias/suplementos" className="transition-colors hover:text-slate-900">
              Suplementos
            </Link>
            <Link href="/categorias/fuerza" className="transition-colors hover:text-slate-900">
              Fuerza
            </Link>
            <Link href="/comunidad" className="transition-colors hover:text-slate-900">
              Comunidad
            </Link>
          </nav>
        </div>

        {/* Right: actions */}
        <div className="flex items-center gap-2">
          <button
            aria-label="Buscar"
            className="hidden h-9 w-9 items-center justify-center rounded-lg text-slate-600 hover:bg-slate-100 sm:inline-flex"
          >
            <Search className="h-4 w-4" />
          </button>
          <CountrySwitcher />
          <button
            aria-label="Carrito"
            className="relative inline-flex h-9 w-9 items-center justify-center rounded-lg text-slate-700 hover:bg-slate-100"
          >
            <ShoppingBag className="h-4 w-4" />
            <span className="absolute -right-0.5 -top-0.5 inline-flex h-4 min-w-4 items-center justify-center rounded-full bg-amber-500 px-1 text-[10px] font-semibold text-slate-950">
              0
            </span>
          </button>
          <button
            aria-label="Menú"
            className="md:hidden inline-flex h-9 w-9 items-center justify-center rounded-lg text-slate-700 hover:bg-slate-100"
          >
            <Menu className="h-4 w-4" />
          </button>
        </div>
      </div>
    </header>
  );
}
