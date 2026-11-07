import Link from 'next/link';
import { ChevronLeft, ChevronRight, Star, Flame, Sparkles } from 'lucide-react';

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-[#0a0f1c]">
      {/* Background image with depth */}
      <div className="relative h-[520px] overflow-hidden sm:h-[580px]">
        {/* Gym image */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=1920&q=80')",
          }}
        />
        {/* Multi-layer gradient for depth */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a0f1c] via-[#0a0f1c]/80 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0f1c] via-transparent to-transparent" />

        {/* Floating glow orbs for depth */}
        <div className="pointer-events-none absolute left-1/4 top-1/4 h-64 w-64 rounded-full bg-[#1F5AF6]/20 blur-[100px]" />
        <div className="pointer-events-none absolute right-1/4 bottom-1/4 h-48 w-48 rounded-full bg-[#3B82F6]/15 blur-[80px]" />

        {/* Content with layered depth */}
        <div className="relative mx-auto flex h-full max-w-7xl items-center px-4 sm:px-6 lg:px-8">
          <div className="max-w-lg text-white" style={{ transform: 'translateZ(20px)' }}>
            {/* Badge with glow */}
            <div className="mb-4 inline-flex items-center gap-1.5 rounded-lg bg-[#DC2626] px-3 py-1.5 text-xs font-bold shadow-[0_4px_20px_rgba(220,38,38,0.4)]">
              <Flame className="h-3 w-3" />
              BLACK FRIDAY EARLY SALE
            </div>

            {/* Headline with text shadow for depth */}
            <h1 className="text-5xl font-extrabold leading-[0.95] tracking-tight sm:text-6xl" style={{ textShadow: '0 4px 30px rgba(0,0,0,0.5)' }}>
              B2G1 FREE
            </h1>
            <p className="mt-3 text-xl font-bold uppercase tracking-wide text-[#1F5AF6]" style={{ textShadow: '0 2px 20px rgba(31,90,246,0.5)' }}>
              Hasta 40% OFF en Signature
            </p>

            {/* CTA with glow shadow */}
            <Link
              href="/ofertas"
              className="mt-6 inline-flex h-12 items-center rounded-lg bg-[#1F5AF6] px-8 text-sm font-bold text-white shadow-[0_8px_30px_rgba(31,90,246,0.5)] transition-all hover:shadow-[0_12px_40px_rgba(31,90,246,0.7)] hover:bg-[#1A4DD6]"
            >
              COMPRAR AHORA
            </Link>

            {/* Trust with glass effect */}
            <div className="mt-6 inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-medium text-white/90 backdrop-blur-md">
              <span className="flex items-center gap-1">
                <Star className="h-3.5 w-3.5 fill-[#FFB800] text-[#FFB800]" />
                4.9/5 · 10K+ clientes
              </span>
              <span className="text-white/30">|</span>
              <span>Envío gratis +$25</span>
              <span className="text-white/30">|</span>
              <span>ISO Certified</span>
            </div>
          </div>
        </div>

        {/* Carousel controls with glassmorphism */}
        <button className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full border border-white/20 bg-black/30 p-2.5 backdrop-blur-md transition hover:bg-black/50">
          <ChevronLeft className="h-4 w-4 text-white" />
        </button>
        <button className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full border border-white/20 bg-black/30 p-2.5 backdrop-blur-md transition hover:bg-black/50">
          <ChevronRight className="h-4 w-4 text-white" />
        </button>

        {/* Dots */}
        <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-1.5">
          <span className="h-1.5 w-6 rounded-full bg-[#1F5AF6] shadow-[0_0_8px_rgba(31,90,246,0.6)]" />
          {[2,3,4,5,6,7,8].map(i => (
            <span key={i} className="h-1.5 w-1.5 rounded-full bg-white/30" />
          ))}
        </div>
      </div>

      {/* Promo strip with depth */}
      <div className="border-t border-white/10 bg-[#14181F]">
        <div className="mx-auto grid max-w-7xl grid-cols-1 sm:grid-cols-3">
          <PromoLink badge="NEW" badgeColor="bg-[#FFB800] text-black" text="Bodybuilding Peptides disponibles" href="/categorias/peptidos" />
          <PromoLink badge="5X" badgeColor="bg-[#1F5AF6] text-white" text="Gana 5 puntos por cada $1" href="/rewards" />
          <PromoLink badge="QUIZ" badgeColor="bg-[#17C3A3] text-black" text="Encontrá tu stack ideal" href="/quiz" />
        </div>
      </div>
    </section>
  );
}

function PromoLink({ badge, badgeColor, text, href }: { badge: string; badgeColor: string; text: string; href: string }) {
  return (
    <Link
      href={href}
      className="group flex items-center justify-center gap-2 border-b border-white/10 py-2.5 text-xs font-semibold transition hover:bg-white/5 sm:border-b-0 sm:border-r sm:last:border-r-0"
    >
      <span className={`rounded px-1.5 py-0.5 text-[10px] font-bold shadow-md ${badgeColor}`}>
        {badge}
      </span>
      <span className="text-white">{text}</span>
      <span className="text-[#1F5AF6] transition-colors group-hover:text-[#3B82F6]">Saber más →</span>
    </Link>
  );
}
