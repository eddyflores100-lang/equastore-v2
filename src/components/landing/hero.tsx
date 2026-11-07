'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Star, Truck, Shield, Leaf, Zap, Flame, CheckCircle2, ArrowRight } from 'lucide-react';
import { useCountry } from '@/components/country/country-provider';

export function Hero() {
  const { country } = useCountry();
  const base = `/${country.toLowerCase()}`;

  return (
    <section className="relative overflow-hidden bg-[#5142f5] pt-32 pb-24 px-6 md:px-12">
      {/* Light sweep gradient */}
      <div className="pointer-events-none absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(255,255,255,0.05) 0%, transparent 50%)' }} />
      {/* Decorative glow */}
      <div className="pointer-events-none absolute -right-20 top-20 h-96 w-96 rounded-full bg-[#6C5CE7]/30 blur-[100px]" />

      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 lg:grid-cols-2 lg:items-center">
        {/* Left: Text */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
        >
          <h1 className="text-5xl font-extrabold leading-[1.1] tracking-tight sm:text-6xl">
            <span className="block text-white">Tu cuerpo,</span>
            <span className="block" style={{ color: '#22D3EE' }}>tu meta,</span>
            <span className="block" style={{ color: '#FF4B5C' }}>tu poder</span>
          </h1>

          <p className="mt-6 text-lg text-white">
            Desde suplementos de élite hasta equipamiento inteligente.
          </p>
          <p className="mt-1 text-sm text-white/60">
            Todo lo que necesitas para construir tu mejor versión.
          </p>

          {/* Buttons — pill shape */}
          <div className="mt-8 flex flex-wrap gap-3">
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
              <Link
                href={`${base}/productos`}
                className="inline-flex items-center gap-2 rounded-full px-7 py-3 text-sm font-bold text-white shadow-lg transition"
                style={{
                  background: 'linear-gradient(135deg, #FF4B5C, #E33B4B)',
                  boxShadow: '0 8px 30px rgba(255,75,92,0.4)',
                }}
              >
                Comprar Ahora
                <ArrowRight className="h-4 w-4" />
              </Link>
            </motion.div>

            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
              <Link
                href={`${base}/ofertas`}
                className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-7 py-3 text-sm font-bold text-white backdrop-blur-md transition hover:bg-white/20"
              >
                Ver Oferta RTO IA
              </Link>
            </motion.div>
          </div>

          {/* Trust row */}
          <div className="mt-6 flex items-center gap-4 text-sm">
            <span className="flex items-center gap-1.5 text-white">
              <CheckCircle2 className="h-4 w-4 text-emerald-400" />
              Garantía 30 días
            </span>
            <span className="flex items-center gap-1.5 text-white/80">
              <span className="h-1.5 w-1.5 rounded-full bg-white/40" />
              Envíos gratis &gt; $25
            </span>
          </div>
        </motion.div>

        {/* Right: 3D Product image with floating glassmorphic badges */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
          className="relative flex items-center justify-center"
        >
          {/* Glow behind product */}
          <div className="absolute inset-0" style={{ background: 'radial-gradient(circle at center, rgba(255,255,255,0.15), transparent 60%)' }} />

          {/* Product image — floating animation */}
          <motion.div
            animate={{ y: [0, -12, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            className="relative z-10"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/equastore-v2/product-3d.png"
              alt="Producto estrella"
              className="w-full max-w-md rounded-[40px]"
              style={{ filter: 'drop-shadow(0 20px 40px rgba(0,0,0,0.2))' }}
            />
          </motion.div>

          {/* Floating glassmorphic badges */}
          {/* Top-left: Envío rápido */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="absolute left-0 top-4 flex items-center gap-2 rounded-2xl border border-white/20 bg-white/90 p-3 shadow-xl backdrop-blur-lg"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100">
              <Truck className="h-4 w-4 text-blue-600" />
            </div>
            <div>
              <div className="text-xs font-bold text-slate-900">ENVÍO RÁPIDO</div>
              <div className="text-[10px] text-slate-500">24-48 horas</div>
            </div>
          </motion.div>

          {/* Top-right: Energía Pura */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.8, duration: 0.5 }}
            className="absolute right-0 top-12 rounded-2xl border border-white/20 bg-white/90 p-3 shadow-xl backdrop-blur-lg"
          >
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-orange-100">
                <Flame className="h-4 w-4 text-orange-500" />
              </div>
              <div>
                <div className="text-xs font-bold text-slate-900">Energía Pura</div>
                <div className="text-[10px] text-slate-500">Performance 95%</div>
              </div>
            </div>
            <div className="mt-2 h-1.5 w-20 overflow-hidden rounded-full bg-slate-200">
              <div className="h-full w-[95%] rounded-full" style={{ background: 'linear-gradient(90deg, #FF4B5C, #FF8A4B)' }} />
            </div>
          </motion.div>

          {/* Right-middle: Rating */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1, duration: 0.5 }}
            className="absolute -right-2 top-1/2 flex items-center gap-1 rounded-full bg-slate-900/80 px-3 py-1.5 backdrop-blur-md"
          >
            <div className="flex">
              {[1,2,3,4,5].map(s => <Star key={s} className="h-3 w-3 fill-amber-400 text-amber-400" />)}
            </div>
            <span className="text-xs font-bold text-white">4.9/5</span>
          </motion.div>

          {/* Rotated OFFERTA badge */}
          <motion.div
            initial={{ opacity: 0, rotate: -15 }}
            animate={{ opacity: 1, rotate: -12 }}
            transition={{ delay: 0.7, duration: 0.5 }}
            className="absolute right-4 bottom-20 rounded-xl px-3 py-2 text-center shadow-xl"
            style={{ background: '#FF4B5C', transform: 'rotate(-12deg)' }}
          >
            <div className="text-[10px] font-bold text-white">OFERTA</div>
            <div className="text-sm font-extrabold text-white">-20% OFF</div>
          </motion.div>

          {/* Bottom-left: ECO-FRIENDLY */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.5 }}
            className="absolute bottom-4 left-0 flex items-center gap-2 rounded-2xl border border-white/20 bg-white/90 p-3 shadow-xl backdrop-blur-lg"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-100">
              <Leaf className="h-4 w-4 text-emerald-600" />
            </div>
            <div>
              <div className="text-xs font-bold text-slate-900">ECO-FRIENDLY</div>
              <div className="text-[10px] text-slate-500">Sostenible</div>
            </div>
          </motion.div>

          {/* Left-middle: CALIDAD LAB */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1, duration: 0.5 }}
            className="absolute -left-2 top-1/3 flex items-center gap-2 rounded-2xl border border-white/20 bg-white/90 p-3 shadow-xl backdrop-blur-lg"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100">
              <Shield className="h-4 w-4 text-blue-600" />
            </div>
            <div>
              <div className="text-xs font-bold text-slate-900">CALIDAD LAB</div>
              <div className="text-[10px] text-slate-500">Certificado ISO</div>
            </div>
          </motion.div>

          {/* Chat FAB */}
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.5, duration: 0.4, type: 'spring' }}
            className="absolute bottom-0 right-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#5142f5] shadow-xl"
            style={{ boxShadow: '0 8px 24px rgba(81,66,245,0.5)' }}
          >
            <Zap className="h-5 w-5 text-white" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
