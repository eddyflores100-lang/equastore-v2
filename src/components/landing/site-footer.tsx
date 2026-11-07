import Link from 'next/link';
import { Truck, ShieldCheck, CreditCard, Award } from 'lucide-react';

const SHIP_INFO = [
  { icon: Truck, title: 'ENVÍOS A LATAM', desc: 'Ecuador · Colombia · México · Chile · Perú' },
  { icon: Award, title: 'USA MADE', desc: 'Calidad certificada ISO en cada lote' },
  { icon: ShieldCheck, title: 'FREE SHIPPING +$25', desc: 'En todos los productos Signature' },
  { icon: CreditCard, title: 'SAFE & SECURE PAYMENTS', desc: 'Tarjeta · Transferencia · COD · Cripto' },
];

const FOOTER_COLS = [
  { title: 'Tienda', links: [
    { label: 'Shop All', href: '/productos' },
    { label: 'Proteína', href: '/categorias/proteina' },
    { label: 'Pre-entreno', href: '/categorias/pre-entreno' },
    { label: 'Creatina', href: '/categorias/creatina' },
    { label: 'Vitaminas', href: '/categorias/vitaminas' },
    { label: 'Ofertas', href: '/ofertas' },
  ]},
  { title: 'Soporte', links: [
    { label: 'Help Center', href: '/ayuda' },
    { label: 'Envíos y entregas', href: '/envios' },
    { label: 'Returns & Exchanges', href: '/devoluciones' },
    { label: 'Track Order', href: '/seguimiento' },
    { label: 'WhatsApp', href: '/whatsapp' },
  ]},
  { title: 'Empresa', links: [
    { label: 'About Us', href: '/sobre' },
    { label: 'Blog', href: '/blog' },
    { label: 'Comunidad', href: '/comunidad' },
    { label: 'App UNBROKEN', href: '/app' },
    { label: 'Afiliados', href: '/afiliados' },
  ]},
  { title: 'Legal', links: [
    { label: 'Privacy Policy', href: '/privacidad' },
    { label: 'Terms of Use', href: '/terminos' },
    { label: 'Cookies', href: '/cookies' },
    { label: 'Accessibility', href: '/accesibilidad' },
  ]},
];

export function SiteFooter() {
  return (
    <footer className="bg-[#14181F] text-slate-300">
      {/* Shipping info bar */}
      <div className="border-b border-white/10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 divide-y divide-white/10 sm:grid-cols-4 sm:divide-x sm:divide-y-0">
            {SHIP_INFO.map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.title} className="flex items-center gap-3 p-4">
                  <Icon className="h-6 w-6 flex-shrink-0 text-[#1F5AF6]" />
                  <div>
                    <div className="text-xs font-black text-white">{item.title}</div>
                    <div className="text-[11px] text-slate-400">{item.desc}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Newsletter */}
      <div className="border-b border-white/10">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="grid gap-4 lg:grid-cols-2 lg:items-center">
            <div>
              <h2 className="text-lg font-black text-white">SUBSCRIBE TO GET SPECIAL OFFERS</h2>
              <p className="text-xs text-slate-400">Free giveaways, deals una vez en la vida.</p>
            </div>
            <form className="flex gap-2">
              <input
                type="email"
                placeholder="tu@email.com"
                className="h-10 flex-1 border border-white/10 bg-white/[0.03] px-3 text-sm text-white placeholder:text-slate-500 focus:border-[#1F5AF6] focus:outline-none"
              />
              <button type="submit" className="h-10 bg-[#1F5AF6] px-6 text-sm font-black text-white hover:bg-[#1A4DD6]">
                JOIN
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Links */}
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-5">
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center gap-2">
              <span className="text-2xl font-black italic text-[#1F5AF6]">EQ</span>
              <span className="font-black text-white">EQUASTORE</span>
            </Link>
            <p className="mt-3 text-xs text-slate-500">The world's largest fitness destination since 2019.</p>
            <div className="mt-4 flex gap-2">
              {['IG','FB','YT','TT'].map(s => (
                <a key={s} href="#" className="flex h-7 w-7 items-center justify-center rounded border border-white/10 text-[10px] font-bold hover:border-[#1F5AF6] hover:text-[#1F5AF6]">{s}</a>
              ))}
            </div>
          </div>
          {FOOTER_COLS.map(col => (
            <div key={col.title}>
              <h3 className="text-xs font-black uppercase text-white">{col.title}</h3>
              <ul className="mt-3 space-y-2">
                {col.links.map(l => (
                  <li key={l.label}>
                    <Link href={l.href} className="text-xs text-slate-400 hover:text-[#1F5AF6]">{l.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* FDA disclaimer — BB.com exact */}
        <div className="mt-8 border-t border-white/10 pt-4">
          <p className="text-[10px] leading-relaxed text-slate-600">
            *These statements have not been evaluated by the Food and Drug Administration. This product is not intended to diagnose, treat, cure, or prevent any disease. Always consult with a qualified healthcare professional prior to beginning any diet or exercise program or taking any dietary supplement.
          </p>
        </div>
        <div className="mt-4 flex flex-col items-center justify-between gap-2 border-t border-white/10 pt-4 sm:flex-row">
          <p className="text-[11px] text-slate-600">© 2019-2026 Equastore · AliceLabs LLC. All rights reserved.</p>
          <div className="flex items-center gap-1.5 text-[10px] text-slate-600">
            <span>Pagos:</span>
            {['VISA','MC','AMEX','PSE','OXXO','SPEI','BTC'].map(m => (
              <span key={m} className="rounded border border-white/10 px-1.5 py-0.5">{m}</span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
