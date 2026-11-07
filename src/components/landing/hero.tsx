'use client';

import Link from 'next/link';
import { ChevronLeft, ChevronRight, Star, Flame } from 'lucide-react';
import { useCountry } from '@/components/country/country-provider';

export function Hero() {
  const { country } = useCountry();
  const base = `/${country.toLowerCase()}`;

  return (
    <section className="relative overflow-hidden bg-[#0a0f1c]">
      <div className="relative h-[520px] overflow-hidden sm:h-[580px]">
        {/* Background */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=1920&q=80')" }}
        />
        {/* Dark overlays for depth */}
        <div className="absolute inset-0" style={{ background: 'linear-gradient(90deg, rgba(10,15,28,0.95), rgba(10,15,28,0.7), rgba(10,15,28,0.2))' }} />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(0deg, rgba(10,15,28,0.8), transparent, rgba(10,15,28,0.3))' }} />

        {/* GLOW ORBS - always visible */}
        <div style={{ position: 'absolute', left: '20%', top: '25%', width: '300px', height: '300px', borderRadius: '50%', background: 'rgba(31,90,246,0.25)', filter: 'blur(120px)' }} />
        <div style={{ position: 'absolute', right: '25%', bottom: '20%', width: '224px', height: '224px', borderRadius: '50%', background: 'rgba(59,130,246,0.2)', filter: 'blur(100px)' }} />
        <div style={{ position: 'absolute', left: '50%', top: '40%', width: '160px', height: '160px', borderRadius: '50%', background: 'rgba(220,38,38,0.1)', filter: 'blur(80px)' }} />

        {/* Content */}
        <div className="relative mx-auto flex h-full max-w-7xl items-center px-4 sm:px-6 lg:px-8">
          <div className="max-w-lg text-white">
            {/* Badge - red gradient + glow */}
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              borderRadius: '8px',
              padding: '6px 12px',
              fontSize: '12px',
              fontWeight: 700,
              background: 'linear-gradient(135deg, #DC2626, #B91C1C)',
              boxShadow: '0 4px 20px rgba(220,38,38,0.5)',
              marginBottom: '16px',
            }}>
              <Flame className="h-3 w-3" />
              BLACK FRIDAY EARLY SALE
            </div>

            {/* Headline with STRONG text shadow */}
            <h1 style={{
              fontSize: '3.5rem',
              fontWeight: 800,
              lineHeight: 0.95,
              letterSpacing: '-0.02em',
              textShadow: '0 4px 30px rgba(0,0,0,0.6), 0 0 40px rgba(31,90,246,0.3)',
            }}>B2G1 FREE</h1>

            <p style={{
              marginTop: '12px',
              fontSize: '1.25rem',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              color: '#1F5AF6',
              textShadow: '0 2px 20px rgba(31,90,246,0.6)',
            }}>Hasta 40% OFF en Signature</p>

            {/* CTA - gradient + glow */}
            <Link
              href={`${base}/ofertas`}
              style={{
                display: 'inline-flex',
                height: '48px',
                alignItems: 'center',
                borderRadius: '8px',
                padding: '0 32px',
                fontSize: '14px',
                fontWeight: 700,
                color: '#fff',
                background: 'linear-gradient(135deg, #1F5AF6, #1A4DD6)',
                boxShadow: '0 8px 30px rgba(31,90,246,0.5), inset 0 1px 0 rgba(255,255,255,0.15)',
                marginTop: '24px',
                textDecoration: 'none',
              }}
            >COMPRAR AHORA</Link>

            {/* Trust pill - glassmorphism */}
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '12px',
              borderRadius: '999px',
              padding: '8px 16px',
              fontSize: '12px',
              fontWeight: 500,
              color: 'rgba(255,255,255,0.9)',
              background: 'rgba(255,255,255,0.05)',
              backdropFilter: 'blur(12px)',
              WebkitBackdropFilter: 'blur(12px)',
              border: '1px solid rgba(255,255,255,0.1)',
              marginTop: '24px',
            }}>
              <span className="flex items-center gap-1">
                <Star className="h-3.5 w-3.5" style={{ fill: '#FFB800', color: '#FFB800' }} />
                4.9/5 · 10K+
              </span>
              <span style={{ color: 'rgba(255,255,255,0.3)' }}>|</span>
              <span>Envío +$25</span>
              <span style={{ color: 'rgba(255,255,255,0.3)' }}>|</span>
              <span>ISO</span>
            </div>
          </div>
        </div>

        {/* Carousel buttons - glass */}
        <button style={{
          position: 'absolute',
          left: '12px',
          top: '50%',
          transform: 'translateY(-50%)',
          borderRadius: '999px',
          padding: '10px',
          background: 'rgba(255,255,255,0.05)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          border: '1px solid rgba(255,255,255,0.15)',
        }}><ChevronLeft className="h-4 w-4 text-white" /></button>

        <button style={{
          position: 'absolute',
          right: '12px',
          top: '50%',
          transform: 'translateY(-50%)',
          borderRadius: '999px',
          padding: '10px',
          background: 'rgba(255,255,255,0.05)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          border: '1px solid rgba(255,255,255,0.15)',
        }}><ChevronRight className="h-4 w-4 text-white" /></button>

        {/* Dots */}
        <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-1.5">
          <span style={{ height: '6px', width: '24px', borderRadius: '999px', background: '#1F5AF6', boxShadow: '0 0 10px rgba(31,90,246,0.8)' }} />
          {[2,3,4,5,6,7,8].map(i => <span key={i} style={{ height: '6px', width: '6px', borderRadius: '999px', background: 'rgba(255,255,255,0.3)' }} />)}
        </div>
      </div>

      {/* Promo strip */}
      <div style={{ background: '#14181F', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
        <div className="mx-auto grid max-w-7xl grid-cols-1 sm:grid-cols-3">
          <Link href={`${base}/categorias/peptidos`} className="group flex items-center justify-center gap-2 border-b py-2.5 text-xs font-semibold hover:bg-white/5 sm:border-b-0 sm:border-r sm:last:border-r-0" style={{ borderColor: 'rgba(255,255,255,0.08)' }}>
            <span style={{ borderRadius: '4px', padding: '2px 6px', fontSize: '10px', fontWeight: 700, color: '#000', background: 'linear-gradient(135deg, #FFB800, #E5A700)', boxShadow: '0 2px 8px rgba(255,184,0,0.4)' }}>NEW</span>
            <span className="text-white">Bodybuilding Peptides</span>
            <span className="text-[#1F5AF6] group-hover:text-[#3B82F6]">→</span>
          </Link>
          <Link href={`${base}/rewards`} className="group flex items-center justify-center gap-2 border-b py-2.5 text-xs font-semibold hover:bg-white/5 sm:border-b-0 sm:border-r sm:last:border-r-0" style={{ borderColor: 'rgba(255,255,255,0.08)' }}>
            <span style={{ borderRadius: '4px', padding: '2px 6px', fontSize: '10px', fontWeight: 700, color: '#fff', background: 'linear-gradient(135deg, #1F5AF6, #1A4DD6)', boxShadow: '0 2px 8px rgba(31,90,246,0.4)' }}>5X</span>
            <span className="text-white">Gana 5 puntos por $1</span>
            <span className="text-[#1F5AF6] group-hover:text-[#3B82F6]">→</span>
          </Link>
          <Link href={`${base}/quiz`} className="group flex items-center justify-center gap-2 py-2.5 text-xs font-semibold hover:bg-white/5">
            <span style={{ borderRadius: '4px', padding: '2px 6px', fontSize: '10px', fontWeight: 700, color: '#000', background: 'linear-gradient(135deg, #17C3A3, #0EA271)', boxShadow: '0 2px 8px rgba(23,195,163,0.4)' }}>QUIZ</span>
            <span className="text-white">Encontrá tu stack</span>
            <span className="text-[#1F5AF6] group-hover:text-[#3B82F6]">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
