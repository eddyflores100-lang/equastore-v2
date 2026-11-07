import Link from 'next/link';
import { ChevronLeft, ChevronRight, Star, Flame } from 'lucide-react';

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-[#0a0f1c]">
      <div className="relative h-[520px] overflow-hidden sm:h-[580px]">
        {/* Background image */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=1920&q=80')",
          }}
        />
        {/* Multi-layer gradients for depth */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a0f1c] via-[#0a0f1c]/85 to-[#0a0f1c]/30" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0f1c] via-transparent to-[#0a0f1c]/40" />

        {/* Floating glow orbs — PERMANENT, always visible */}
        <div className="pointer-events-none absolute left-1/4 top-1/3 h-72 w-72 rounded-full bg-[#1F5AF6]/25 blur-[120px]" />
        <div className="pointer-events-none absolute right-1/3 bottom-1/4 h-56 w-56 rounded-full bg-[#3B82F6]/20 blur-[100px]" />
        <div className="pointer-events-none absolute left-1/2 top-1/2 h-40 w-40 rounded-full bg-[#DC2626]/10 blur-[80px]" />

        {/* Content */}
        <div className="relative mx-auto flex h-full max-w-7xl items-center px-4 sm:px-6 lg:px-8">
          <div className="max-w-lg text-white">
            {/* Badge with permanent glow */}
            <div className="mb-4 inline-flex items-center gap-1.5 rounded-lg bg-gradient-to-br from-[#DC2626] to-[#B91C1C] px-3 py-1.5 text-xs font-bold shadow-[0_4px_20px_rgba(220,38,38,0.5)]">
              <Flame className="h-3 w-3" />
              BLACK FRIDAY EARLY SALE
            </div>

            {/* Headline with permanent text glow */}
            <h1 className="text-5xl font-extrabold leading-[0.95] tracking-tight text-glow-white sm:text-6xl">
              B2G1 FREE
            </h1>
            <p className="mt-3 text-xl font-bold uppercase tracking-wide text-[#1F5AF6] text-glow-blue">
              Hasta 40% OFF en Signature
            </p>

            {/* CTA with permanent gradient + glow */}
            <Link
              href="/ofertas"
              className="depth-btn glow-blue mt-6 inline-flex h-12 items-center rounded-lg px-8 text-sm font-bold text-white"
            >
              COMPRAR AHORA
            </Link>

            {/* Trust with glass effect — always visible */}
            <div className="glass-light mt-6 inline-flex items-center gap-3 rounded-full px-4 py-2 text-xs font-medium text-white/90">
              <span className="flex items-center gap-1">
                <Star className="h-3.5 w-3.5 fill-[#FFB800] text-[#FFB800]" />
                4.9/5 · 10K+
              </span>
              <span className="text-white/30">|</span>
              <span>Envío +$25</span>
              <span className="text-white/30">|</span>
              <span>ISO</span>
            </div>
          </div>
        </div>

        {/* Carousel buttons with glass */}
        <button className="glass-light absolute left-3 top-1/2 -translate-y-1/2 rounded-full p-2.5">
          <ChevronLeft className="h-4 w-4 text-white" />
        </button>
        <button className="glass-light absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-2.5">
          <ChevronRight className="h-4 w-4 text-white" />
        </button>

        {/* Dots with glow on active */}
        <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-1.5">
          <span className="h-1.5 w-6 rounded-full bg-[#1F5AF6] shadow-[0_0_10px_rgba(31,90,246,0.8)]" />
          {[2,3,4,5,6,7,8].map(i => (
            <span key={i} className="h-1.5 w-1.5 rounded-full bg-white/30" />
          ))}
        </div>
      </div>

      {/* Promo strip */}
      <div className="border-t border-white/10 bg-[#14181F]">
        <div className="mx-auto grid max-w-7xl grid-cols-1 sm:grid-cols-3">
          <Link href="/categorias/peptidos" className="group flex items-center justify-center gap-2 border-b border-white/10 py-2.5 text-xs font-semibold transition hover:bg-white/5 sm:border-b-0 sm:border-r sm:last:border-r-0">
            <span className="depth-badge-yellow rounded px-1.5 py-0.5 text-[10px] font-bold text-black">NEW</span>
            <span className="text-white">Bodybuilding Peptides</span>
            <span className="text-[#1F5AF6] group-hover:text-[#3B82F6]">→</span>
          </Link>
          <Link href="/rewards" className="group flex items-center justify-center gap-2 border-b border-white/10 py-2.5 text-xs font-semibold transition hover:bg-white/5 sm:border-b-0 sm:border-r sm:last:border-r-0">
            <span className="depth-btn rounded px-1.5 py-0.5 text-[10px] font-bold text-white">5X</span>
            <span className="text-white">Gana 5 puntos por $1</span>
            <span className="text-[#1F5AF6] group-hover:text-[#3B82F6]">→</span>
          </Link>
          <Link href="/quiz" className="group flex items-center justify-center gap-2 py-2.5 text-xs font-semibold transition hover:bg-white/5">
            <span className="rounded px-1.5 py-0.5 text-[10px] font-bold text-black" style={{ background: 'linear-gradient(135deg, #17C3A3, #0EA271)', boxShadow: '0 2px 8px rgba(23,195,163,0.4)' }}>QUIZ</span>
            <span className="text-white">Encontrá tu stack</span>
            <span className="text-[#1F5AF6] group-hover:text-[#3B82F6]">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
