import Link from 'next/link';
import { ChevronLeft, ChevronRight, Star, Flame } from 'lucide-react';

export function Hero() {
  return (
    <section className="relative bg-black">
      {/* Hero */}
      <div className="relative h-[500px] overflow-hidden sm:h-[560px]">
        {/* Background — dark gym with blue lighting */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=1920&q=80')",
          }}
        />
        {/* Dark blue gradient — left to right */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a0f1c] via-[#0a0f1c]/80 to-[#0a0f1c]/20" />

        <div className="relative mx-auto flex h-full max-w-7xl items-center px-4 sm:px-6 lg:px-8">
          <div className="max-w-lg text-white">
            {/* Sale badge — RED for urgency */}
            <div className="mb-4 inline-flex items-center gap-1.5 rounded bg-[#DC2626] px-3 py-1 text-xs font-bold">
              <Flame className="h-3 w-3" />
              BLACK FRIDAY EARLY SALE
            </div>

            {/* Headline — bold sans, NOT italic serif */}
            <h1 className="text-5xl font-extrabold leading-[0.95] tracking-tight sm:text-6xl">
              B2G1 FREE
            </h1>
            <p className="mt-3 text-xl font-bold uppercase tracking-wide text-[#1F5AF6]">
              Hasta 40% OFF en Signature
            </p>

            {/* CTA */}
            <Link
              href="/ofertas"
              className="mt-6 inline-flex h-12 items-center bg-[#1F5AF6] px-8 text-sm font-bold text-white shadow-lg transition hover:bg-[#1A4DD6]"
            >
              COMPRAR AHORA
            </Link>

            {/* Trust */}
            <div className="mt-6 flex items-center gap-4 text-xs font-medium text-white/90">
              <span className="flex items-center gap-1">
                <Star className="h-3.5 w-3.5 fill-[#FFB800] text-[#FFB800]" />
                4.9/5 · 10K+ clientes
              </span>
              <span className="text-white/40">|</span>
              <span>Envío gratis +$25</span>
              <span className="text-white/40">|</span>
              <span>ISO Certified</span>
            </div>
          </div>
        </div>

        {/* Carousel controls */}
        <button className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full border border-white/20 bg-black/30 p-2 backdrop-blur hover:bg-black/50">
          <ChevronLeft className="h-4 w-4 text-white" />
        </button>
        <button className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full border border-white/20 bg-black/30 p-2 backdrop-blur hover:bg-black/50">
          <ChevronRight className="h-4 w-4 text-white" />
        </button>

        {/* Dots */}
        <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-1.5">
          <span className="h-1.5 w-6 rounded-full bg-[#1F5AF6]" />
          {[2,3,4,5,6,7,8].map(i => (
            <span key={i} className="h-1.5 w-1.5 rounded-full bg-white/30" />
          ))}
        </div>
      </div>

      {/* Promo strip */}
      <div className="border-t border-white/10 bg-[#14181F]">
        <div className="mx-auto grid max-w-7xl grid-cols-1 sm:grid-cols-3">
          <Link href="/categorias/peptidos" className="flex items-center justify-center gap-2 border-b border-white/10 py-2.5 text-xs font-semibold sm:border-b-0 sm:border-r sm:last:border-r-0">
            <span className="rounded bg-[#FFB800] px-1.5 py-0.5 text-[10px] font-bold text-black">NEW</span>
            <span className="text-white">Bodybuilding Peptides disponibles</span>
            <span className="text-[#1F5AF6]">Saber más</span>
          </Link>
          <Link href="/rewards" className="flex items-center justify-center gap-2 border-b border-white/10 py-2.5 text-xs font-semibold sm:border-b-0 sm:border-r sm:last:border-r-0">
            <span className="rounded bg-[#1F5AF6] px-1.5 py-0.5 text-[10px] font-bold text-white">5X</span>
            <span className="text-white">Gana 5 puntos por cada $1</span>
            <span className="text-[#1F5AF6]">Saber más</span>
          </Link>
          <Link href="/quiz" className="flex items-center justify-center gap-2 py-2.5 text-xs font-semibold">
            <span className="rounded bg-[#17C3A3] px-1.5 py-0.5 text-[10px] font-bold text-black">QUIZ</span>
            <span className="text-white">Encontrá tu stack ideal</span>
            <span className="text-[#1F5AF6]">Saber más</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
