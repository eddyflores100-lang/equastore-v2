'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Search, Heart, User, ShoppingBag, Star, Truck, Shield, Leaf, Zap, Flame, CheckCircle2 } from 'lucide-react';
import { useCountry } from '@/components/country/country-provider';
import { CountrySwitcher } from '@/components/country/country-switcher';

export function SiteHeader() {
  const { country } = useCountry();
  const base = `/${country.toLowerCase()}`;

  return (
    <header className="absolute top-0 z-50 w-full">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        {/* Logo */}
        <Link href={base} className="text-lg font-extrabold tracking-tight text-white">
          EQUASTORE
        </Link>

        {/* Search bar — pill, translucent purple */}
        <div className="hidden flex-1 px-8 sm:flex">
          <div className="flex w-full max-w-xl items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 backdrop-blur-md">
            <Search className="h-4 w-4 text-white/60" />
            <input
              type="text"
              placeholder="Buscar productos..."
              className="flex-1 bg-transparent text-sm text-white placeholder:text-white/50 focus:outline-none"
            />
          </div>
        </div>

        {/* Right icons */}
        <div className="flex items-center gap-4">
          <Link href={`${base}/productos`} className="text-sm font-medium text-white hover:text-white/80">
            Productos
          </Link>
          <button className="relative">
            <Heart className="h-5 w-5 text-white" />
          </button>
          <button className="relative">
            <User className="h-5 w-5 text-white" />
            <span className="absolute -right-1 -top-1 h-2 w-2 rounded-full bg-red-500" />
          </button>
          <Link href={`${base}/carrito`} className="relative">
            <ShoppingBag className="h-5 w-5 text-white" />
            <span className="absolute -right-1.5 -top-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white">0</span>
          </Link>
          <CountrySwitcher />
        </div>
      </div>
    </header>
  );
}
