import Link from 'next/link';
import { Truck, ShieldCheck, CreditCard, Award } from 'lucide-react';

const SHIP_INFO = [
  { icon: Truck, title: 'ENVÍOS A LATAM', desc: 'Ecuador · Colombia · México · Chile · Perú' },
  { icon: Award, title: 'CALIDAD USA MADE', desc: 'Certificación ISO en cada lote' },
  { icon: ShieldCheck, title: 'ENVÍO GRATIS +$25', desc: 'En todos los productos Signature' },
  { icon: CreditCard, title: 'PAGOS SEGUROS', desc: 'Tarjeta · Transferencia · COD · Cripto' },
];

const FOOTER_COLS = [
  {
    title: 'Tienda',
    links: [
      { label: 'Todos los productos', href: '/productos' },
      { label: 'Proteínas', href: '/categorias/proteina' },
      { label: 'Pre-entrenos', href: '/categorias/pre-entreno' },
      { label: 'Creatinas', href: '/categorias/creatina' },
      { label: 'Vitaminas', href: '/categorias/vitaminas' },
      { label: 'Ofertas', href: '/ofertas' },
    ],
  },
  {
    title: 'Soporte',
    links: [
      { label: 'Centro de ayuda', href: '/ayuda' },
      { label: 'Envíos y entregas', href: '/envios' },
      { label: 'Devoluciones', href: '/devoluciones' },
      { label: 'Seguimiento de orden', href: '/seguimiento' },
      { label: 'Contacto', href: '/contacto' },
      { label: 'WhatsApp', href: '/whatsapp' },
    ],
  },
  {
    title: 'Empresa',
    links: [
      { label: 'Sobre Equastore', href: '/sobre' },
      { label: 'Blog de salud', href: '/blog' },
      { label: 'Comunidad', href: '/comunidad' },
      { label: 'App UNBROKEN', href: '/app' },
      { label: 'Carreras', href: '/carreras' },
      { label: 'Programa de afiliados', href: '/afiliados' },
    ],
  },
  {
    title: 'Legal',
    links: [
      { label: 'Términos de uso', href: '/terminos' },
      { label: 'Política de privacidad', href: '/privacidad' },
      { label: 'Cookies', href: '/cookies' },
      { label: 'Accesibilidad', href: '/accesibilidad' },
    ],
  },
];

export function SiteFooter() {
  return (
    <footer className="bg-black text-slate-300">
      {/* Shipping info bar */}
      <div className="border-b border-white/10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 divide-y divide-white/10 sm:grid-cols-4 sm:divide-x sm:divide-y-0">
            {SHIP_INFO.map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.title} className="flex items-center gap-3 p-5">
                  <Icon className="h-6 w-6 flex-shrink-0 text-amber-400" />
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
      <div className="border-b border-white/10 bg-white/[0.02]">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
          <div className="grid gap-6 lg:grid-cols-2 lg:items-center">
            <div>
              <h2 className="text-xl font-black text-white sm:text-2xl">
                SUSCRIBÍTE Y RECIBÍ OFERTAS EXCLUSIVAS
              </h2>
              <p className="mt-1 text-sm text-slate-400">
                Free giveaways, descuentamientos y deals una vez en la vida.
              </p>
            </div>
            <form className="flex flex-col gap-2 sm:flex-row">
              <input
                type="email"
                placeholder="tu@email.com"
                aria-label="Email"
                className="h-11 flex-1 border border-white/10 bg-white/[0.03] px-4 text-sm text-white placeholder:text-slate-500 focus:border-amber-400 focus:outline-none"
              />
              <button
                type="submit"
                className="h-11 bg-amber-400 px-8 text-sm font-black text-black transition hover:bg-amber-500"
              >
                JOIN
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Links */}
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-5">
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center gap-2">
              <span className="bg-amber-400 px-2 py-1 text-xs font-black text-black">EQ</span>
              <span className="font-black text-white">EQUASTORE</span>
            </Link>
            <p className="mt-3 text-xs text-slate-500">
              The world's largest fitness destination since 2019.
            </p>
            <div className="mt-4 flex gap-2">
              {['IG', 'FB', 'YT', 'TT'].map((s) => (
                <a
                  key={s}
                  href="#"
                  className="flex h-8 w-8 items-center justify-center rounded border border-white/10 text-[10px] font-bold hover:border-amber-400 hover:text-amber-400"
                >
                  {s}
                </a>
              ))}
            </div>
          </div>

          {FOOTER_COLS.map((col) => (
            <div key={col.title}>
              <h3 className="text-xs font-black uppercase tracking-wider text-white">{col.title}</h3>
              <ul className="mt-4 space-y-2">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link href={link.href} className="text-xs text-slate-400 hover:text-amber-400">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Disclaimer */}
        <div className="mt-12 border-t border-white/10 pt-6">
          <p className="text-[10px] leading-relaxed text-slate-600">
            *These statements have not been evaluated by the Food and Drug Administration. This product is not intended to diagnose, treat, cure, or prevent any disease. Always consult with a qualified healthcare professional prior to beginning any diet or exercise program or taking any dietary supplement.
          </p>
        </div>

        <div className="mt-6 flex flex-col items-center justify-between gap-3 border-t border-white/10 pt-6 sm:flex-row">
          <p className="text-[11px] text-slate-600">
            © 2019-2026 Equastore · AliceLabs LLC. Todos los derechos reservados.
          </p>
          <div className="flex items-center gap-2 text-[10px] text-slate-600">
            <span>Pagos:</span>
            {['VISA', 'MC', 'AMEX', 'PSE', 'OXXO', 'SPEI', 'BTC'].map((m) => (
              <span key={m} className="rounded border border-white/10 px-1.5 py-0.5">{m}</span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
