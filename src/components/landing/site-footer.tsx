import Link from 'next/link';
import { Truck, ShieldCheck, CreditCard, Award } from 'lucide-react';

const SHIP_INFO = [
  { icon: Truck, title: 'ENVÍOS A LATAM', desc: 'Ecuador · Colombia · México · Chile · Perú' },
  { icon: Award, title: 'CALIDAD ISO', desc: 'Certificación en cada lote' },
  { icon: ShieldCheck, title: 'ENVÍO GRATIS +$25', desc: 'En productos Signature' },
  { icon: CreditCard, title: 'PAGOS SEGUROS', desc: 'Tarjeta · Transferencia · COD · Cripto' },
];

const FOOTER_COLS = [
  { title: 'Tienda', links: [
    { label: 'Todos los productos', href: '/productos' },
    { label: 'Proteína', href: '/categorias/proteina' },
    { label: 'Pre-entreno', href: '/categorias/pre-entreno' },
    { label: 'Creatina', href: '/categorias/creatina' },
    { label: 'Vitaminas', href: '/categorias/vitaminas' },
    { label: 'Ofertas', href: '/ofertas' },
  ]},
  { title: 'Soporte', links: [
    { label: 'Centro de ayuda', href: '/ayuda' },
    { label: 'Envíos', href: '/envios' },
    { label: 'Devoluciones', href: '/devoluciones' },
    { label: 'Seguimiento', href: '/seguimiento' },
    { label: 'WhatsApp', href: '/whatsapp' },
  ]},
  { title: 'Empresa', links: [
    { label: 'Sobre nosotros', href: '/sobre' },
    { label: 'Blog', href: '/blog' },
    { label: 'Comunidad', href: '/comunidad' },
    { label: 'App UNBROKEN', href: '/app' },
    { label: 'Afiliados', href: '/afiliados' },
  ]},
  { title: 'Legal', links: [
    { label: 'Privacidad', href: '/privacidad' },
    { label: 'Términos', href: '/terminos' },
    { label: 'Cookies', href: '/cookies' },
  ]},
];

export function SiteFooter() {
  return (
    <footer className="bg-[#14181F] text-slate-300">
      {/* Shipping bar */}
      <div className="border-b border-white/10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 divide-y divide-white/10 sm:grid-cols-4 sm:divide-x sm:divide-y-0">
            {SHIP_INFO.map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.title} className="flex items-center gap-3 p-4">
                  <Icon className="h-6 w-6 flex-shrink-0 text-[#1F5AF6]" />
                  <div>
                    <div className="text-xs font-bold text-white">{item.title}</div>
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
              <h2 className="text-lg font-bold text-white">Suscribite y recibí ofertas exclusivas</h2>
              <p className="text-xs text-slate-400">Descuentos, sorteos y promociones únicas.</p>
            </div>
            <form className="flex gap-2">
              <input
                type="email"
                placeholder="tu@email.com"
                className="h-10 flex-1 border border-white/10 bg-white/[0.03] px-3 text-sm text-white placeholder:text-slate-500 focus:border-[#1F5AF6] focus:outline-none"
              />
              <button type="submit" className="h-10 bg-[#1F5AF6] px-6 text-sm font-bold text-white hover:bg-[#1A4DD6]">
                Unirse
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
              <span className="text-xl font-extrabold italic text-[#1F5AF6]">EQ</span>
              <span className="font-bold text-white">EQUASTORE</span>
            </Link>
            <p className="mt-3 text-xs text-slate-500">El destino fitness #1 de LATAM desde 2019.</p>
            <div className="mt-4 flex gap-2">
              {['IG','FB','YT','TT'].map(s => (
                <a key={s} href="#" className="flex h-7 w-7 items-center justify-center rounded border border-white/10 text-[10px] font-bold hover:border-[#1F5AF6] hover:text-[#1F5AF6]">{s}</a>
              ))}
            </div>
          </div>
          {FOOTER_COLS.map(col => (
            <div key={col.title}>
              <h3 className="text-xs font-bold uppercase text-white">{col.title}</h3>
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

        <div className="mt-8 border-t border-white/10 pt-4">
          <p className="text-[10px] leading-relaxed text-slate-600">
            *These statements have not been evaluated by the Food and Drug Administration. This product is not intended to diagnose, treat, cure, or prevent any disease.
          </p>
        </div>
        <div className="mt-4 flex flex-col items-center justify-between gap-2 border-t border-white/10 pt-4 sm:flex-row">
          <p className="text-[11px] text-slate-600">© 2019-2026 Equastore · AliceLabs LLC. Todos los derechos reservados.</p>
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
