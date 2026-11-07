'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import { useCountry } from '@/components/country/country-provider';
import { CountrySwitcher } from '@/components/country/country-switcher';

export function SiteHeader() {
  const { country } = useCountry();
  const base = `/${country.toLowerCase()}`;

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 z-50 w-full"
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-[#5142f5] to-[#22D3EE]">
            <Sparkles className="h-4 w-4 text-white" />
          </div>
          <span className="text-lg font-extrabold text-white">EQUASTORE</span>
        </div>

        <nav className="hidden items-center gap-6 text-sm md:flex">
          <Link href={`${base}/productos`} className="text-white/60 hover:text-white">Productos</Link>
          <Link href={`${base}/categorias/suplementos`} className="text-white/60 hover:text-white">Categorías</Link>
          <Link href={`${base}/ofertas`} className="text-white/60 hover:text-white">Ofertas</Link>
        </nav>

        <div className="flex items-center gap-3">
          <CountrySwitcher />
          <Link
            href={`${base}/productos`}
            className="rounded-full bg-white px-4 py-1.5 text-xs font-bold text-black transition hover:bg-white/80"
          >
            Comprar
          </Link>
        </div>
      </div>
    </motion.header>
  );
}
