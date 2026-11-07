'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { useCountry } from '@/components/country/country-provider';
import { Star, Truck, Shield, CreditCard, Award } from 'lucide-react';

const SHIP_INFO = [
  { icon: Truck, title: 'ENVÍOS LATAM', desc: 'Ecuador · Colombia · México · Chile · Perú' },
  { icon: Award, title: 'CALIDAD ISO', desc: 'Certificación en cada lote' },
  { icon: Shield, title: 'ENVÍO GRATIS +$25', desc: 'En productos Signature' },
  { icon: CreditCard, title: 'PAGOS SEGUROS', desc: 'Tarjeta · Transferencia · COD · Cripto' },
];

export function SiteFooter() {
  const { country } = useCountry();
  const base = `/${country.toLowerCase()}`;

  return (
    <footer className="relative overflow-hidden bg-black">
      {/* Aurora background — Aceternity */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-40 left-1/2 h-80 w-[800px] -translate-x-1/2 rounded-full bg-[#5142f5]/20 blur-[100px]" />
      </div>

      {/* Shipping info bar */}
      <div className="relative border-b border-white/10">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid grid-cols-2 divide-white/10 sm:grid-cols-4 sm:divide-x">
            {SHIP_INFO.map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.title} className="flex items-center gap-3 p-5">
                  <Icon className="h-6 w-6 text-[#22D3EE]" />
                  <div>
                    <div className="text-xs font-bold text-white">{item.title}</div>
                    <div className="text-[11px] text-white/40">{item.desc}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Newsletter */}
      <div className="relative border-b border-white/10">
        <div className="mx-auto max-w-7xl px-6 py-12">
          <div className="grid gap-6 lg:grid-cols-2 lg:items-center">
            <div>
              <h2 className="text-2xl font-extrabold text-white">Recibí 10% off</h2>
              <p className="mt-1 text-sm text-white/40">Ofertas exclusivas y novedades cada semana.</p>
            </div>
            <form className="flex gap-2">
              <input
                type="email"
                placeholder="tu@email.com"
                className="h-11 flex-1 rounded-full border border-white/10 bg-white/5 px-5 text-sm text-white placeholder:text-white/30 focus:border-[#5142f5] focus:outline-none"
              />
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                type="submit"
                className="rounded-full bg-[#5142f5] px-6 text-sm font-bold text-white"
                style={{ boxShadow: '0 4px 20px rgba(81,66,245,0.4)' }}
              >
                Unirse
              </motion.button>
            </form>
          </div>
        </div>
      </div>

      {/* Links */}
      <div className="relative mx-auto max-w-7xl px-6 py-12">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-5">
          <div className="col-span-2 md:col-span-1">
            <Link href={base} className="text-lg font-extrabold text-white">EQUASTORE</Link>
            <p className="mt-3 text-xs text-white/40">Tu cuerpo, tu meta, tu poder.</p>
            <div className="mt-4 flex gap-2">
              {['IG', 'FB', 'YT', 'TT'].map(s => (
                <a key={s} href="#" className="flex h-8 w-8 items-center justify-center rounded-full border border-white/10 text-[10px] font-bold text-white/60 hover:border-[#5142f5] hover:text-[#5142f5]">{s}</a>
              ))}
            </div>
          </div>
          {[
            { title: 'Tienda', links: [['Productos', '/productos'], ['Ofertas', '/ofertas'], ['Suplementos', '/categorias/suplementos'], ['Fuerza', '/categorias/fuerza']] },
            { title: 'Soporte', links: [['Ayuda', '/ayuda'], ['Envíos', '/envios'], ['Devoluciones', '/devoluciones'], ['WhatsApp', '/whatsapp']] },
            { title: 'Empresa', links: [['Sobre nosotros', '/sobre'], ['Blog', '/blog'], ['App UNBROKEN', '/app'], ['Comunidad', '/comunidad']] },
            { title: 'Legal', links: [['Privacidad', '/privacidad'], ['Términos', '/terminos'], ['Cookies', '/cookies']] },
          ].map(col => (
            <div key={col.title}>
              <h3 className="text-xs font-bold uppercase text-white">{col.title}</h3>
              <ul className="mt-3 space-y-2">
                {col.links.map(([label, href]) => (
                  <li key={label}>
                    <Link href={`${base}${href}`} className="text-xs text-white/40 hover:text-[#22D3EE]">{label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-3 border-t border-white/10 pt-6 sm:flex-row">
          <p className="text-[11px] text-white/30">© 2026 AliceLabs LLC · Todos los derechos reservados.</p>
          <div className="flex gap-1.5">
            {['VISA', 'MC', 'AMEX', 'PSE', 'OXXO', 'SPEI', 'BTC'].map(m => (
              <span key={m} className="rounded border border-white/10 px-1.5 py-0.5 text-[10px] text-white/30">{m}</span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
