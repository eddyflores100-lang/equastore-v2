'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { useCountry } from '@/components/country/country-provider';

export function SiteFooter() {
  const { country } = useCountry();
  const base = `/${country.toLowerCase()}`;

  return (
    <footer className="bg-[#5142f5] text-white pt-16 pb-4 px-6 md:px-12 text-sm relative overflow-hidden">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
          {/* Brand */}
          <div className="col-span-2 sm:col-span-1">
            <h3 className="text-lg font-extrabold">EQUASTORE</h3>
            <p className="mt-2 text-white/70">Potenciando tu evolución física.</p>
          </div>

          {/* Tienda */}
          <div>
            <h4 className="font-bold mb-3">Tienda</h4>
            <ul className="space-y-2 text-white/70">
              <li><Link href={`${base}/productos`} className="hover:text-white">Catálogo</Link></li>
              <li><Link href={`${base}/categorias/suplementos`} className="hover:text-white">Suplementos</Link></li>
              <li><Link href={`${base}/ofertas`} className="hover:text-white">Ofertas</Link></li>
            </ul>
          </div>

          {/* Comunidad */}
          <div>
            <h4 className="font-bold mb-3">Comunidad</h4>
            <ul className="space-y-2 text-white/70">
              <li><Link href={`${base}/blog`} className="hover:text-white">Blogs de salud</Link></li>
              <li><Link href={`${base}/comunidad`} className="hover:text-white">Comunidad</Link></li>
              <li><Link href={`${base}/app`} className="hover:text-white">App UNBROKEN</Link></li>
            </ul>
          </div>

          {/* Pagos */}
          <div>
            <h4 className="font-bold mb-3">Pagos seguros</h4>
            <div className="flex gap-2">
              {['VISA', 'MC', 'Amex', 'PayPal'].map(p => (
                <span key={p} className="rounded border border-white/30 px-2 py-1 text-[10px] font-bold">{p}</span>
              ))}
            </div>
            <h4 className="font-bold mb-3 mt-4">Síguenos</h4>
            <div className="flex gap-2">
              {['IG', 'FB', 'Tk'].map(s => (
                <a key={s} href="#" className="rounded border border-white/30 px-2 py-1 text-[10px] font-bold hover:bg-white/10">{s}</a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-white/20 pt-4 text-center text-xs text-white/50">
          © 2026 ALICELABS LLC · TODOS LOS DERECHOS RESERVADOS. Términos · Privacidad
        </div>
      </div>
    </footer>
  );
}
