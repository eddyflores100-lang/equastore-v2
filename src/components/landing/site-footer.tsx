import Link from 'next/link';
import { Instagram, Facebook, Twitter, Send } from 'lucide-react';

export function SiteFooter() {
  return (
    <footer className="bg-slate-900 text-slate-300">
      {/* Newsletter */}
      <div className="border-b border-slate-800">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
            <div>
              <h2 className="text-2xl font-bold text-white">Únete y recibe 10% off</h2>
              <p className="mt-2 text-sm text-slate-400">
                Suscríbete al newsletter para recibir ofertas exclusivas y guías de suplementación.
              </p>
            </div>
            <form className="flex flex-col gap-3 sm:flex-row">
              <input
                type="email"
                placeholder="tu@email.com"
                className="h-11 flex-1 rounded-lg border border-slate-700 bg-slate-800 px-4 text-sm text-white placeholder:text-slate-500 focus:border-blue-500 focus:outline-none"
              />
              <button
                type="submit"
                className="inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-orange-500 px-6 text-sm font-medium text-white hover:bg-orange-600"
              >
                Suscribirme
                <Send className="h-4 w-4" />
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Links */}
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4 lg:grid-cols-5">
          <div className="col-span-2 lg:col-span-1">
            <div className="flex items-center gap-2 font-bold text-xl text-white">
              <span className="text-blue-400">EQUA</span>
              <span>STORE</span>
            </div>
            <p className="mt-3 text-sm text-slate-400">
              Tu cuerpo, tu meta, tu poder. Suplementos deportivos y de wellness con calidad farmacéutica.
            </p>
            <div className="mt-4 flex gap-3">
              <a href="#" aria-label="Instagram" className="rounded-full bg-slate-800 p-2 hover:bg-slate-700">
                <Instagram className="h-4 w-4" />
              </a>
              <a href="#" aria-label="Facebook" className="rounded-full bg-slate-800 p-2 hover:bg-slate-700">
                <Facebook className="h-4 w-4" />
              </a>
              <a href="#" aria-label="Twitter" className="rounded-full bg-slate-800 p-2 hover:bg-slate-700">
                <Twitter className="h-4 w-4" />
              </a>
            </div>
          </div>

          <FooterColumn
            title="Tienda"
            links={[
              { label: 'Todos los productos', href: '/productos' },
              { label: 'Suplementos', href: '/categorias/suplementos' },
              { label: 'Fuerza', href: '/categorias/fuerza' },
              { label: 'Definición', href: '/categorias/definicion' },
              { label: 'Vitalidad', href: '/categorias/vitalidad' },
            ]}
          />
          <FooterColumn
            title="Empresa"
            links={[
              { label: 'Sobre Equastore', href: '/sobre-nosotros' },
              { label: 'Comunidad', href: '/comunidad' },
              { label: 'Blog de salud', href: '/blog' },
              { label: 'App UNBROKEN', href: '/app' },
            ]}
          />
          <FooterColumn
            title="Soporte"
            links={[
              { label: 'Centro de ayuda', href: '/ayuda' },
              { label: 'Envíos y entregas', href: '/envios' },
              { label: 'Devoluciones', href: '/devoluciones' },
              { label: 'Contacto', href: '/contacto' },
              { label: 'WhatsApp', href: '/whatsapp' },
            ]}
          />
          <FooterColumn
            title="Legal"
            links={[
              { label: 'Términos', href: '/terminos' },
              { label: 'Privacidad', href: '/privacidad' },
              { label: 'Cookies', href: '/cookies' },
              { label: 'Pagos seguros', href: '/pagos' },
            ]}
          />
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-slate-800 pt-6 sm:flex-row">
          <p className="text-xs text-slate-500">
            © 2026 Equastore · AliceLabs LLC. Todos los derechos reservados.
          </p>
          <div className="flex items-center gap-3 text-xs text-slate-500">
            <span>Pagos:</span>
            <span className="rounded bg-slate-800 px-2 py-1">VISA</span>
            <span className="rounded bg-slate-800 px-2 py-1">MC</span>
            <span className="rounded bg-slate-800 px-2 py-1">PSE</span>
            <span className="rounded bg-slate-800 px-2 py-1">OXXO</span>
            <span className="rounded bg-slate-800 px-2 py-1">BTC</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({ title, links }: { title: string; links: { label: string; href: string }[] }) {
  return (
    <div>
      <h3 className="text-sm font-semibold text-white">{title}</h3>
      <ul className="mt-4 space-y-2">
        {links.map((link) => (
          <li key={link.label}>
            <Link href={link.href} className="text-sm text-slate-400 hover:text-white">
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
