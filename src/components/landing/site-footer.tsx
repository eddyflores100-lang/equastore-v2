'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { useCountry } from '@/components/country/country-provider';

export function SiteFooter() {
  const { country } = useCountry();
  const base = `/${country.toLowerCase()}`;

  return (
    <footer className="bg-black border-t border-white/10">
      <div className="mx-auto max-w-7xl px-8 py-16">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          <div className="col-span-2 md:col-span-1">
            <h3 className="text-lg font-extrabold text-white">EQUASTORE</h3>
            <p className="mt-2 text-sm text-white/30">Tu cuerpo, tu meta, tu poder.</p>
          </div>
          {[
            { title: 'Tienda', links: [['Productos', '/productos'], ['Ofertas', '/ofertas'], ['Categorías', '/categorias/suplementos']] },
            { title: 'Soporte', links: [['Ayuda', '/ayuda'], ['Envíos', '/envios'], ['WhatsApp', '/whatsapp']] },
            { title: 'Empresa', links: [['Sobre', '/sobre'], ['Blog', '/blog'], ['App', '/app']] },
          ].map(col => (
            <div key={col.title}>
              <h4 className="text-xs font-bold uppercase text-white/60">{col.title}</h4>
              <ul className="mt-4 space-y-3">
                {col.links.map(([label, href]) => (
                  <li key={label}>
                    <Link href={`${base}${href}`} className="text-sm text-white/40 hover:text-white">{label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-12 flex justify-between border-t border-white/10 pt-6">
          <p className="text-xs text-white/20">© 2026 AliceLabs LLC</p>
          <div className="flex gap-2">
            {['VISA','MC','PSE','BTC'].map(m => <span key={m} className="text-[10px] text-white/20">{m}</span>)}
          </div>
        </div>
      </div>
    </footer>
  );
}
