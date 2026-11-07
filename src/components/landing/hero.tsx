import Link from 'next/link';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';

export function Hero() {
  return (
    <section className="relative bg-black">
      {/* Hero carousel — full-width gym image with blue tint */}
      <div className="relative h-[500px] overflow-hidden sm:h-[600px]">
        {/* Background gym image */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1920&q=80')",
          }}
        />
        {/* Dark blue gradient overlay — BB.com style */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0D1520]/90 via-[#0D1520]/60 to-transparent" />

        {/* Content */}
        <div className="relative mx-auto flex h-full max-w-7xl items-center px-4 sm:px-6 lg:px-8">
          <div className="max-w-xl text-white">
            {/* Badge */}
            <div className="mb-4 inline-block bg-[#1F5AF6] px-4 py-1.5 text-sm font-black">
              BLACK FRIDAY SALE
            </div>

            {/* Headline */}
            <h1 className="text-5xl font-black italic leading-none sm:text-6xl lg:text-7xl">
              B2G1
              <span className="text-[#1F5AF6]"> FREE</span>
            </h1>
            <p className="mt-3 text-lg font-bold uppercase tracking-wider sm:text-xl">
              Hasta 40% OFF en Signature
            </p>

            <p className="mt-4 max-w-md text-sm text-white/80">
              Suplementos de grado farmacéutico, envío a LATAM en 24-72h. Pago con tarjeta, transferencia, COD o cripto.
            </p>

            {/* CTA — BB.com blue button */}
            <Link
              href="/ofertas"
              className="mt-6 inline-flex h-12 items-center bg-[#1F5AF6] px-8 text-sm font-black text-white shadow-lg transition hover:bg-[#1A4DD6]"
            >
              SHOP NOW
            </Link>

            {/* Trust row */}
            <div className="mt-6 flex items-center gap-4 text-xs text-white/70">
              <span className="flex items-center gap-1">
                <Star className="h-3.5 w-3.5 fill-[#1F5AF6] text-[#1F5AF6]" />
                4.9/5 · 10K+ reseñas
              </span>
              <span>·</span>
              <span>Envío gratis +$25</span>
              <span>·</span>
              <span>ISO Certified</span>
            </div>
          </div>
        </div>

        {/* Carousel arrows */}
        <button className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-white/20 p-2 backdrop-blur hover:bg-white/30">
          <ChevronLeft className="h-5 w-5 text-white" />
        </button>
        <button className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-white/20 p-2 backdrop-blur hover:bg-white/30">
          <ChevronRight className="h-5 w-5 text-white" />
        </button>

        {/* Pagination dots */}
        <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-1.5">
          <span className="h-1.5 w-6 rounded-full bg-[#1F5AF6]" />
          {[2,3,4,5,6,7,8].map(i => (
            <span key={i} className="h-1.5 w-1.5 rounded-full bg-white/40" />
          ))}
        </div>
      </div>

      {/* Promo strip — 3 items like BB.com */}
      <div className="border-t border-white/10 bg-[#14181F]">
        <div className="mx-auto grid max-w-7xl grid-cols-1 sm:grid-cols-3">
          <PromoLink
            badge="NEW"
            badgeColor="bg-[#FFB800] text-black"
            text="BODYBUILDING PEPTIDES ARE LIVE"
            href="/categorias/peptidos"
          />
          <PromoLink
            badge="5X"
            badgeColor="bg-[#1F5AF6] text-white"
            text="MEMBERS EARN 5 POINTS PER $1"
            href="/rewards"
          />
          <PromoLink
            badge="QUIZ"
            badgeColor="bg-[#17C3A3] text-black"
            text="FIND YOUR STACK — TAKE THE QUIZ"
            href="/quiz"
          />
        </div>
      </div>
    </section>
  );
}

function PromoLink({ badge, badgeColor, text, href }: { badge: string; badgeColor: string; text: string; href: string }) {
  return (
    <Link href={href} className="flex items-center justify-center gap-2 border-b border-white/10 py-2.5 text-xs sm:border-b-0 sm:border-r sm:last:border-r-0">
      <span className={`rounded px-1.5 py-0.5 text-[10px] font-black ${badgeColor}`}>
        {badge}
      </span>
      <span className="font-bold text-white">{text}</span>
      <span className="text-[#1F5AF6] underline">LEARN MORE</span>
    </Link>
  );
}
