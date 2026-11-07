'use client';

import Link from 'next/link';
import { Search, ShoppingCart, Menu, MapPin, ChevronDown } from 'lucide-react';
import { CountrySwitcher } from '@/components/country/country-switcher';

const NAV_ITEMS = [
  { label: 'SHOP ALL', href: '/productos' },
  { label: 'SALES', href: '/ofertas' },
  { label: 'PROTEÍNA', href: '/categorias/proteina' },
  { label: 'PRE-ENTRENO', href: '/categorias/pre-entreno' },
  { label: 'CREATINA', href: '/categorias/creatina' },
  { label: 'VITAMINAS', href: '/categorias/vitaminas' },
  { label: 'RENDIMIENTO', href: '/categorias/rendimiento' },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 w-full">
      {/* Promo banner — charcoal black like BB.com */}
      <div className="bg-[#2B2B2B] text-white">
        <div className="mx-auto flex h-10 max-w-7xl items-center justify-center px-4 text-xs">
          <span className="flex items-center gap-2">
            <span className="text-sm">🎁</span>
            <span className="font-bold">BF EARLY SALE: GET UP TO 40% OFF SELECT SIGNATURE PRODUCTS</span>
            <Link href="/ofertas" className="ml-1 text-[#3B82F6] underline">
              SHOP NOW
            </Link>
          </span>
        </div>
      </div>

      {/* Main header — dark navy like BB.com #14181F */}
      <div className="bg-[#14181F] text-white">
        <div className="mx-auto flex h-16 max-w-7xl items-center gap-4 px-4 sm:px-6 lg:px-8">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl font-black italic text-[#1F5AF6]">EQ</span>
            <span className="hidden text-lg font-black tracking-tight sm:inline">EQUASTORE</span>
          </Link>

          {/* Deliver to */}
          <Link href="#" className="hidden items-center gap-1 text-xs lg:flex">
            <MapPin className="h-4 w-4 text-white/70" />
            <div>
              <div className="text-white/60">Deliver to</div>
              <div className="font-bold">LATAM</div>
            </div>
          </Link>

          {/* Search bar — large, spans most of header */}
          <div className="hidden flex-1 sm:flex">
            <div className="flex w-full max-w-3xl items-stretch overflow-hidden rounded-md bg-white">
              <select className="h-10 border-r border-slate-200 bg-slate-50 px-3 text-xs font-bold text-slate-700 focus:outline-none">
                <option>Shop</option>
                <option>Proteína</option>
                <option>Pre-entreno</option>
                <option>Creatina</option>
              </select>
              <input
                type="text"
                placeholder="Buscar Signature Protein, Creatine..."
                className="h-10 flex-1 px-3 text-sm text-black placeholder:text-slate-500 focus:outline-none"
              />
              <button className="flex h-10 items-center justify-center bg-[#8A8A8A] px-4 hover:bg-slate-600">
                <Search className="h-4 w-4 text-white" />
              </button>
            </div>
          </div>

          {/* Account + Cart */}
          <div className="ml-auto flex items-center gap-4">
            <CountrySwitcher />
            <Link href="/cuenta" className="hidden items-center gap-1 text-xs hover:text-[#1F5AF6] sm:flex">
              <div>
                <div className="text-white/60">Hello, Sign in</div>
                <div className="font-bold">Account & Lists</div>
              </div>
            </Link>
            <Link href="/carrito" className="relative flex items-center gap-1 text-xs hover:text-[#1F5AF6]">
              <div className="relative">
                <ShoppingCart className="h-6 w-6 text-[#1F5AF6]" />
                <span className="absolute -right-1.5 -top-1.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-[#1F5AF6] px-1 text-[10px] font-black text-white">
                  0
                </span>
              </div>
              <span className="hidden font-bold sm:inline">Cart</span>
            </Link>
            <button aria-label="Menu" className="md:hidden">
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>

      {/* Blue nav bar — BB.com exact #1F5AF6 */}
      <nav className="bg-[#1F5AF6] text-white">
        <div className="mx-auto flex h-10 max-w-7xl items-center gap-1 px-4 text-xs font-bold sm:px-6 lg:px-8">
          <button className="flex items-center gap-1 px-2 py-1 hover:bg-white/10">
            <Menu className="h-3.5 w-3.5" />
            MENU
          </button>
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="flex items-center gap-0.5 px-2 py-1 hover:bg-white/10"
            >
              {item.label}
              <ChevronDown className="h-3 w-3 opacity-60" />
            </Link>
          ))}
          <Link
            href="/app"
            className="ml-auto flex items-center gap-1 px-2 py-1 hover:bg-white/10"
          >
            📱 DOWNLOAD THE APP
          </Link>
        </div>
      </nav>
    </header>
  );
}
