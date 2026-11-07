'use client';

import Link from 'next/link';
import { ArrowRight, Star, ShieldCheck, Truck } from 'lucide-react';
import { useCountry } from '@/components/country/country-provider';

export function Hero() {
  const { config } = useCountry();
  return (
    <section className="relative overflow-hidden bg-[#0A0E1A] text-white">
      {/* Subtle grid background, very Vida Glow / AG1 */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            'linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)',
          backgroundSize: '64px 64px',
        }}
      />
      {/* Glow accent */}
      <div className="pointer-events-none absolute -top-32 left-1/2 h-96 w-[700px] -translate-x-1/2 rounded-full bg-amber-500/10 blur-[120px]" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 py-20 lg:grid-cols-12 lg:py-28">
          {/* Left: copy + CTA */}
          <div className="lg:col-span-6 space-y-7">
            <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/20 bg-amber-500/5 px-3 py-1 text-xs">
              <span className="h-1.5 w-1.5 rounded-full bg-amber-400 animate-pulse" />
              <span className="text-amber-200/90">Lote nuevo · 12 productos premium</span>
            </div>

            <h1 className="text-4xl font-semibold leading-[1.05] tracking-tight sm:text-5xl lg:text-[3.5rem]">
              Suplementos de
              <span className="block bg-gradient-to-r from-amber-200 via-amber-400 to-orange-300 bg-clip-text text-transparent">
                grado farmacéutico
              </span>
              para tu cuerpo.
            </h1>

            <p className="max-w-md text-base text-slate-300 sm:text-lg leading-relaxed">
              Marcas verificadas por ISO, enviadas a tu puerta en 24-72h.
              Pago con tarjeta, transferencia, efectivo, COD o cripto.
            </p>

            <div className="flex flex-wrap gap-3">
              <Link
                href="/productos"
                className="inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-amber-500 px-6 text-sm font-medium text-slate-950 transition hover:bg-amber-400"
              >
                Ver catálogo
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="#mejores-vendidos"
                className="inline-flex h-11 items-center justify-center gap-2 rounded-lg border border-white/15 bg-white/[0.02] px-6 text-sm font-medium text-white transition hover:bg-white/[0.05]"
              >
                Mejores vendidos
              </Link>
            </div>

            {/* Mini stats */}
            <div className="grid max-w-md grid-cols-3 gap-6 pt-4 border-t border-white/10">
              <Stat value="10K+" label="clientes" />
              <Stat value="4.9★" label="rating" />
              <Stat value="30d" label="garantía" />
            </div>
          </div>

          {/* Right: premium product showcase — single hero product */}
          <div className="lg:col-span-6">
            <div className="relative mx-auto aspect-[4/5] w-full max-w-md">
              {/* Glow behind product */}
              <div className="absolute inset-x-6 top-1/4 bottom-1/4 rounded-[2rem] bg-gradient-to-br from-amber-500/30 via-orange-500/20 to-transparent blur-3xl" />

              {/* Product card */}
              <div className="relative flex h-full flex-col overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-slate-900/80 to-slate-950/95 backdrop-blur">
                {/* Image area with gradient placeholder */}
                <div className="relative flex-1 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-amber-600/40 via-orange-700/20 to-slate-950" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <div className="mx-auto mb-3 h-32 w-32 rounded-full bg-amber-500/30 blur-2xl" />
                      <div className="text-6xl font-bold tracking-tight text-white/90">EQ</div>
                      <div className="mt-1 text-xs text-white/40">PACKSHOT</div>
                    </div>
                  </div>
                  {/* Top badge */}
                  <div className="absolute left-5 top-5">
                    <span className="rounded-full bg-amber-500 px-3 py-1 text-xs font-semibold text-slate-950">
                      -25% hoy
                    </span>
                  </div>
                  {/* Top-right rating */}
                  <div className="absolute right-5 top-5 flex items-center gap-1 rounded-full bg-black/40 px-3 py-1 text-xs backdrop-blur">
                    <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                    <span className="font-medium">4.9</span>
                  </div>
                </div>

                {/* Footer with price + CTA */}
                <div className="border-t border-white/10 p-5">
                  <div className="flex items-end justify-between gap-3">
                    <div>
                      <div className="text-xs text-amber-300/80">Producto destacado</div>
                      <div className="text-lg font-semibold">Gladiator Pump</div>
                      <div className="mt-1 flex items-baseline gap-2">
                        <span className="text-xl font-bold">{config.currencySymbol}{(countryPrice(config.code, 'gladiator')).toLocaleString()}</span>
                        <span className="text-sm text-slate-400 line-through">{config.currencySymbol}{(countryPrice(config.code, 'gladiator') * 1.25).toLocaleString()}</span>
                      </div>
                    </div>
                    <Link
                      href="/producto/gladiator-pump"
                      className="inline-flex h-9 items-center justify-center rounded-lg bg-white px-4 text-xs font-semibold text-slate-950 transition hover:bg-amber-300"
                    >
                      Ver
                    </Link>
                  </div>
                </div>
              </div>

              {/* Floating trust pill */}
              <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 rounded-full border border-white/10 bg-slate-950/90 px-4 py-2 backdrop-blur">
                <div className="flex items-center gap-4 text-xs text-slate-300">
                  <span className="flex items-center gap-1">
                    <ShieldCheck className="h-3.5 w-3.5 text-amber-400" />
                    ISO Lab
                  </span>
                  <span className="flex items-center gap-1">
                    <Truck className="h-3.5 w-3.5 text-amber-400" />
                    Envío {config.code === 'EC' ? '24h' : '48-72h'}
                  </span>
                  <span className="flex items-center gap-1">
                    <Star className="h-3.5 w-3.5 text-amber-400 fill-amber-400" />
                    10K reviews
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div>
      <div className="text-2xl font-semibold">{value}</div>
      <div className="text-xs text-slate-400">{label}</div>
    </div>
  );
}

function countryPrice(country: string, slug: string): number {
  const prices: Record<string, number> = {
    EC: 28, CO: 109000, MX: 549, CL: 18900, PE: 99,
  };
  return prices[country] || 28;
}
