import Link from 'next/link';
import { ArrowRight, ShieldCheck, Truck, Star, Zap, TrendingUp } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-blue-900 via-blue-800 to-slate-900 text-white">
      {/* Decorative gradient orbs */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-24 -right-24 h-96 w-96 rounded-full bg-orange-500/20 blur-3xl" />
        <div className="absolute top-1/2 -left-24 h-96 w-96 rounded-full bg-blue-400/20 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <div className="space-y-6">
            <Badge className="bg-orange-500/20 text-orange-200 border-orange-400/30 hover:bg-orange-500/30">
              <Zap className="h-3 w-3 mr-1 fill-orange-300" />
              Nuevo · Multi-país LATAM
            </Badge>

            <h1 className="text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl">
              Tu cuerpo,
              <br />
              <span className="bg-gradient-to-r from-orange-300 to-blue-200 bg-clip-text text-transparent">
                tu meta, tu poder
              </span>
            </h1>

            <p className="max-w-lg text-lg text-blue-100/90">
              Suplementos deportivos y wellness con ingredientes de grado farmacéutico. Envío
              directo desde Dropi a Ecuador, Colombia, México, Chile y Perú. Pago con tarjeta,
              transferencia, efectivo, COD o cripto.
            </p>

            <div className="flex flex-wrap gap-3">
              <Link
                href="/productos"
                className="inline-flex h-10 items-center justify-center gap-2 rounded-lg bg-orange-500 px-6 text-sm font-medium text-white transition-colors hover:bg-orange-600"
              >
                Ver catálogo
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="#ofertas"
                className="inline-flex h-10 items-center justify-center gap-2 rounded-lg border border-blue-300/40 bg-white/5 px-6 text-sm font-medium text-white transition-colors hover:bg-white/10"
              >
                Ofertas de la semana
              </Link>
            </div>

            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-blue-100/80">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="h-4 w-4 text-blue-200" />
                ISO Certified Lab
              </span>
              <span className="flex items-center gap-1.5">
                <Truck className="h-4 w-4 text-blue-200" />
                Envío 24-72h
              </span>
              <span className="flex items-center gap-1.5">
                <Star className="h-4 w-4 text-blue-200 fill-blue-200" />
                4.9/5 (10K+)
              </span>
            </div>
          </div>

          {/* Hero visual: floating product cards */}
          <div className="relative hidden lg:block">
            <div className="relative h-[480px]">
              <FloatingCard
                className="absolute top-0 right-0 w-64 rotate-3"
                title="Gladiator Pump"
                subtitle="Pre-entreno · 300g"
                price="$28"
                originalPrice="$35"
                emoji="💪"
              />
              <FloatingCard
                className="absolute top-32 left-0 w-64 -rotate-2"
                title="Creatina Monohidratada"
                subtitle="500g · Pureza 99.9%"
                price="$24"
                originalPrice="$32"
                emoji="⚡"
              />
              <FloatingCard
                className="absolute bottom-0 right-12 w-64 rotate-2"
                title="Turkesterone Old School"
                subtitle="Adaptógeno · 60 caps"
                price="$32"
                originalPrice="$40"
                emoji="🌿"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function FloatingCard({
  className,
  title,
  subtitle,
  price,
  originalPrice,
  emoji,
}: {
  className: string;
  title: string;
  subtitle: string;
  price: string;
  originalPrice: string;
  emoji: string;
}) {
  return (
    <div
      className={`${className} rounded-2xl bg-white p-4 shadow-2xl ring-1 ring-slate-900/5 transition-transform hover:scale-105`}
    >
      <div className="flex items-start justify-between">
        <div className="text-4xl">{emoji}</div>
        <div className="rounded-full bg-orange-100 px-2 py-0.5 text-xs font-semibold text-orange-700">
          -20%
        </div>
      </div>
      <h3 className="mt-3 font-semibold text-slate-900">{title}</h3>
      <p className="text-xs text-slate-500">{subtitle}</p>
      <div className="mt-2 flex items-center gap-2">
        <span className="text-lg font-bold text-slate-900">{price}</span>
        <span className="text-sm text-slate-400 line-through">{originalPrice}</span>
      </div>
    </div>
  );
}
