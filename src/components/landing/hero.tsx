import Link from 'next/link';
import { ChevronRight, Flame, Star } from 'lucide-react';

export function Hero() {
  return (
    <section className="bg-black text-white">
      {/* Hero banner — full width */}
      <div className="relative overflow-hidden">
        {/* Background image — gym/fitness image */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1920&q=80')",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/70 to-black/40" />

        <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-32">
          <div className="max-w-2xl">
            {/* Badge */}
            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-amber-400 px-3 py-1 text-xs font-bold text-black">
              <Flame className="h-3 w-3" />
              BLACK FRIDAY EARLY SALE
            </div>

            {/* Headline */}
            <h1 className="text-4xl font-black leading-none tracking-tight sm:text-5xl lg:text-6xl">
              HASTA <span className="text-amber-400">40% OFF</span>
              <br />
              EN SUPLEMENTOS
              <br />
              <span className="text-amber-400">SIGNATURE</span>
            </h1>

            <p className="mt-4 max-w-lg text-base text-slate-300 sm:text-lg">
              La marca #1 en suplementos deportivos de LATAM desde 2019. Calidad farmacéutica, envío en 24-72h, pago flexible.
            </p>

            {/* CTAs */}
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/ofertas"
                className="inline-flex h-12 items-center gap-2 bg-amber-400 px-6 text-sm font-black text-black transition hover:bg-amber-500"
              >
                SHOP NOW
                <ChevronRight className="h-4 w-4" />
              </Link>
              <Link
                href="/productos"
                className="inline-flex h-12 items-center gap-2 border border-white/30 bg-white/10 px-6 text-sm font-bold text-white backdrop-blur transition hover:bg-white/20"
              >
                Ver catálogo
              </Link>
            </div>

            {/* Trust row */}
            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-slate-300">
              <span className="flex items-center gap-1">
                <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                4.9/5 · 10K+ reseñas
              </span>
              <span>★ Envío gratis +$25</span>
              <span>★ Pago con tarjeta, COD, cripto</span>
              <span>★ ISO Certified Lab</span>
            </div>
          </div>
        </div>
      </div>

      {/* Secondary promo banners — 3 cards */}
      <div className="border-t border-white/10">
        <div className="mx-auto grid max-w-7xl grid-cols-1 divide-y divide-white/10 sm:grid-cols-3 sm:divide-x sm:divide-y-0">
          <PromoCard
            badge="NUEVO"
            title="Bodybuilding Peptides"
            text="Ahora disponibles en Equastore"
            href="/categorias/peptidos"
            color="text-amber-400"
          />
          <PromoCard
            badge="5X POINTS"
            title="Members Rewards"
            text="Gana 5 puntos por cada $1"
            href="/rewards"
            color="text-rose-400"
          />
          <PromoCard
            badge="QUIZ"
            title="Encontrá tu Stack"
            text="Tomá el quiz y armá tu stack ideal"
            href="/quiz"
            color="text-emerald-400"
          />
        </div>
      </div>
    </section>
  );
}

function PromoCard({
  badge,
  title,
  text,
  href,
  color,
}: {
  badge: string;
  title: string;
  text: string;
  href: string;
  color: string;
}) {
  return (
    <Link
      href={href}
      className="group flex items-center gap-4 p-5 transition hover:bg-white/[0.03]"
    >
      <div className={`text-xs font-black ${color}`}>{badge}</div>
      <div className="flex-1">
        <div className="text-sm font-bold text-white">{title}</div>
        <div className="text-xs text-slate-400">{text}</div>
      </div>
      <ChevronRight className="h-4 w-4 text-slate-500 transition-transform group-hover:translate-x-1" />
    </Link>
  );
}
