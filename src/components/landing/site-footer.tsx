import Link from 'next/link';
import { Instagram, Facebook, Send } from 'lucide-react';

export function SiteFooter() {
  return (
    <footer className="bg-[#0A0E1A] text-slate-400">
      {/* Newsletter */}
      <div className="border-b border-white/5">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
          <div className="grid gap-6 lg:grid-cols-2 lg:items-center">
            <div>
              <h2 className="text-2xl font-semibold text-white sm:text-3xl">
                Recibí 10% off en tu primera compra
              </h2>
              <p className="mt-2 text-sm text-slate-500">
                Suscribite y enterate de lanzamientos, ofertas exclusivas y guías de suplementación.
              </p>
            </div>
            <form className="flex flex-col gap-3 sm:flex-row">
              <input
                type="email"
                placeholder="tu@email.com"
                aria-label="Email"
                className="h-11 flex-1 rounded-lg border border-white/10 bg-white/[0.03] px-4 text-sm text-white placeholder:text-slate-500 focus:border-amber-500/50 focus:outline-none focus:ring-2 focus:ring-amber-500/20"
              />
              <button
                type="submit"
                className="inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-amber-500 px-6 text-sm font-medium text-slate-950 transition hover:bg-amber-400"
              >
                Suscribirme
                <Send className="h-4 w-4" />
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Links */}
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-5">
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center gap-1.5">
              <span className="inline-flex h-7 w-7 items-center justify-center rounded-md bg-white text-[10px] text-amber-500">
                EQ
              </span>
              <span className="font-semibold text-white">equastore</span>
            </Link>
            <p className="mt-3 text-xs leading-relaxed text-slate-500">
              Suplementos de grado farmacéutico, enviados a LATAM con pago flexible.
            </p>
            <div className="mt-4 flex gap-2">
              <a href="#" aria-label="Instagram" className="rounded-md border border-white/10 p-2 hover:border-amber-500/30 hover:text-amber-400">
                <Instagram className="h-3.5 w-3.5" />
              </a>
              <a href="#" aria-label="Facebook" className="rounded-md border border-white/10 p-2 hover:border-amber-500/30 hover:text-amber-400">
                <Facebook className="h-3.5 w-3.5" />
              </a>
            </div>
          </div>

          <FooterCol title="Tienda" links={[
            { label: 'Todos los productos', href: '/productos' },
            { label: 'Suplementos', href: '/categorias/suplementos' },
            { label: 'Fuerza', href: '/categorias/fuerza' },
            { label: 'Ofertas', href: '/ofertas' },
          ]} />
          <FooterCol title="Empresa" links={[
            { label: 'Sobre Equastore', href: '/sobre' },
            { label: 'Blog', href: '/blog' },
            { label: 'Comunidad', href: '/comunidad' },
            { label: 'App UNBROKEN', href: '/app' },
          ]} />
          <FooterCol title="Soporte" links={[
            { label: 'Centro de ayuda', href: '/ayuda' },
            { label: 'Envíos', href: '/envios' },
            { label: 'Devoluciones', href: '/devoluciones' },
            { label: 'WhatsApp', href: '/whatsapp' },
          ]} />
          <FooterCol title="Legal" links={[
            { label: 'Términos', href: '/terminos' },
            { label: 'Privacidad', href: '/privacidad' },
            { label: 'Cookies', href: '/cookies' },
          ]} />
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-white/5 pt-6 sm:flex-row">
          <p className="text-xs text-slate-600">© 2026 Equastore · AliceLabs LLC. Todos los derechos reservados.</p>
          <div className="flex items-center gap-2 text-[10px] text-slate-600">
            <span>Pagos:</span>
            {['VISA', 'MC', 'PSE', 'OXXO', 'BTC'].map((m) => (
              <span key={m} className="rounded border border-white/10 px-1.5 py-0.5">{m}</span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, links }: { title: string; links: { label: string; href: string }[] }) {
  return (
    <div>
      <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-500">{title}</h3>
      <ul className="mt-4 space-y-2.5">
        {links.map((link) => (
          <li key={link.label}>
            <Link href={link.href} className="text-sm text-slate-400 transition hover:text-amber-400">
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
