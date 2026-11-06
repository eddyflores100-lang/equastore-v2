import Link from 'next/link';
import { ShoppingCart, Shield, Truck, Star } from 'lucide-react';
import { CountrySwitcher } from '@/components/country/country-switcher';

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between gap-4">
          <div className="flex items-center gap-6">
            <Link href="/" className="flex items-center gap-2 font-bold text-xl">
              <span className="text-blue-600">EQUA</span>
              <span className="text-slate-900">STORE</span>
            </Link>
            <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600">
              <Link href="/productos" className="hover:text-blue-600 transition-colors">
                Productos
              </Link>
              <Link href="/categorias/suplementos" className="hover:text-blue-600 transition-colors">
                Suplementos
              </Link>
              <Link href="/comunidad" className="hover:text-blue-600 transition-colors">
                Comunidad
              </Link>
            </nav>
          </div>
          <div className="flex items-center gap-3">
            <CountrySwitcher />
            <button className="inline-flex h-9 items-center gap-2 rounded-lg px-3 text-sm font-medium text-slate-700 hover:bg-slate-100">
              <ShoppingCart className="h-4 w-4" />
              <span className="hidden sm:inline">Carrito</span>
              <span className="rounded-full bg-blue-600 text-white text-xs px-1.5 py-0.5">0</span>
            </button>
          </div>
        </div>
      </div>
      {/* Trust strip */}
      <div className="hidden md:block border-t border-slate-100 bg-slate-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-2">
          <div className="flex items-center justify-between text-xs text-slate-600">
            <div className="flex items-center gap-1.5">
              <Shield className="h-3.5 w-3.5 text-blue-600" />
              <span>ISO Certified Lab</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Truck className="h-3.5 w-3.5 text-blue-600" />
              <span>Envío gratis +$25</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Star className="h-3.5 w-3.5 text-blue-600 fill-blue-600" />
              <span>4.9/5 · +10K clientes</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Shield className="h-3.5 w-3.5 text-blue-600" />
              <span>Garantía 30 días</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
