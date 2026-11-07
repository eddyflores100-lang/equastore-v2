'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
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
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-8">
        <Link href={base} className="text-base font-extrabold uppercase tracking-tight text-white">
          Equastore
        </Link>
        <div className="flex items-center gap-6">
          <nav className="hidden gap-6 text-sm md:flex">
            <Link href={`${base}/productos`} className="text-white/60 hover:text-white">Productos</Link>
            <Link href={`${base}/ofertas`} className="text-white/60 hover:text-white">Ofertas</Link>
            <Link href={`${base}/categorias/suplementos`} className="text-white/60 hover:text-white">Categorías</Link>
          </nav>
          <CountrySwitcher />
          <Link
            href={`${base}/productos`}
            className="rounded-full bg-white px-4 py-1.5 text-xs font-bold uppercase text-black hover:bg-white/80"
          >
            Comprar
          </Link>
        </div>
      </div>
    </motion.header>
  );
}
