'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Flame, Star } from 'lucide-react';
import { useCountry } from '@/components/country/country-provider';

export function Hero() {
  const { country } = useCountry();
  const base = `/${country.toLowerCase()}`;

  return (
    <section className="relative overflow-hidden bg-[#0a0f1c]">
      <div className="relative h-[560px] overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0" style={{ background: 'linear-gradient(90deg, rgba(10,15,28,0.97), rgba(10,15,28,0.7), rgba(10,15,28,0.3))' }} />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(0deg, rgba(10,15,28,0.9), transparent, rgba(10,15,28,0.4))' }} />

        {/* Glow orbs */}
        <div className="pointer-events-none absolute left-1/4 top-1/3 h-72 w-72 rounded-full" style={{ background: 'rgba(31,90,246,0.25)', filter: 'blur(120px)' }} />
        <div className="pointer-events-none absolute right-1/3 bottom-1/4 h-56 w-56 rounded-full" style={{ background: 'rgba(59,130,246,0.15)', filter: 'blur(100px)' }} />

        {/* Content */}
        <div className="relative mx-auto flex h-full max-w-7xl items-center px-4 sm:px-6 lg:px-8">
          <div className="grid w-full grid-cols-1 gap-8 lg:grid-cols-2 lg:items-center">
            {/* Left: Text */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              className="max-w-lg text-white"
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.6 }}
                style={{
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
                }}
              >
                <Flame className="h-3 w-3" />
                BLACK FRIDAY EARLY SALE
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.7 }}
                style={{ fontSize: '3.5rem', fontWeight: 800, lineHeight: 0.95, textShadow: '0 4px 30px rgba(0,0,0,0.6)' }}
              >
                B2G1 FREE
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.6 }}
                style={{ marginTop: '12px', fontSize: '1.25rem', fontWeight: 700, textTransform: 'uppercase', color: '#1F5AF6', textShadow: '0 2px 20px rgba(31,90,246,0.6)' }}
              >
                Hasta 40% OFF en Signature
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.6 }}
              >
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
                    boxShadow: '0 8px 30px rgba(31,90,246,0.5)',
                    marginTop: '24px',
                    textDecoration: 'none',
                  }}
                >
                  COMPRAR AHORA
                </Link>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7, duration: 0.5 }}
                style={{
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
                }}
              >
                <span className="flex items-center gap-1">
                  <Star className="h-3.5 w-3.5" style={{ fill: '#FFB800', color: '#FFB800' }} />
                  4.9/5 · 10K+
                </span>
                <span style={{ color: 'rgba(255,255,255,0.3)' }}>|</span>
                <span>Envío +$25</span>
                <span style={{ color: 'rgba(255,255,255,0.3)' }}>|</span>
                <span>ISO</span>
              </motion.div>
            </motion.div>

            {/* Right: 3D Product Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8, rotateY: -15 }}
              animate={{ opacity: 1, scale: 1, rotateY: 0 }}
              transition={{ delay: 0.3, duration: 1, ease: 'easeOut' }}
              className="relative flex items-center justify-center"
              style={{ perspective: '1000px' }}
            >
              {/* Glow behind product */}
              <div
                className="absolute inset-0"
                style={{
                  background: 'radial-gradient(circle at center, rgba(31,90,246,0.3), transparent 60%)',
                }}
              />

              {/* 3D Product Image with float animation */}
              <motion.div
                animate={{ y: [0, -15, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                style={{ position: 'relative', zIndex: 1 }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/equastore-v2/product-3d.png"
                  alt="Producto estrella - Suplemento Signature"
                  style={{
                    width: '100%',
                    maxWidth: '420px',
                    height: 'auto',
                    filter: 'drop-shadow(0 20px 40px rgba(31,90,246,0.3))',
                  }}
                />
              </motion.div>

              {/* Product badge floating */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1, duration: 0.6 }}
                style={{
                  position: 'absolute',
                  right: '10%',
                  top: '15%',
                  borderRadius: '8px',
                  padding: '8px 16px',
                  background: 'linear-gradient(135deg, #FFB800, #E5A700)',
                  boxShadow: '0 8px 24px rgba(255,184,0,0.4)',
                  color: '#000',
                  fontSize: '14px',
                  fontWeight: 800,
                  zIndex: 2,
                }}
              >
                −25% OFF
              </motion.div>
            </motion.div>
          </div>
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
