'use client';

import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { ArrowRight, Flame, Star, Truck, Shield, Zap } from 'lucide-react';
import { useCountry } from '@/components/country/country-provider';

export function Hero() {
  const { country } = useCountry();
  const base = `/${country.toLowerCase()}`;
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const textY = useTransform(scrollYProgress, [0, 1], ['0%', '25%']);
  const imgY = useTransform(scrollYProgress, [0, 1], ['0%', '-20%']);
  const imgScale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);

  return (
    <section ref={ref} className="relative min-h-screen overflow-hidden bg-black">
      {/* Glow gradient background */}
      <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse 80% 60% at 70% 50%, rgba(81,66,245,0.25), transparent 70%)' }} />
      <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse 60% 40% at 20% 80%, rgba(34,211,238,0.08), transparent 60%)' }} />

      {/* Product image — right side, parallax + scale */}
      <motion.div
        style={{ y: imgY, scale: imgScale }}
        className="absolute inset-0 flex items-center justify-end"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/equastore-v2/product-3d.png"
          alt="Producto estrella"
          className="h-full w-full object-cover opacity-40"
          style={{
            maskImage: 'linear-gradient(to left, black 20%, transparent 70%)',
            WebkitMaskImage: 'linear-gradient(to left, black 20%, transparent 70%)',
          }}
        />
      </motion.div>

      {/* Floating glow orbs */}
      <motion.div
        animate={{ y: [0, -20, 0], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute right-1/4 top-1/4 h-64 w-64 rounded-full bg-[#5142f5]/20 blur-[100px]"
      />
      <motion.div
        animate={{ y: [0, 15, 0], opacity: [0.2, 0.4, 0.2] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        className="absolute left-1/3 bottom-1/3 h-48 w-48 rounded-full bg-[#22D3EE]/10 blur-[80px]"
      />

      {/* Content */}
      <motion.div
        style={{ y: textY }}
        className="relative z-10 mx-auto flex min-h-screen max-w-7xl items-center px-8"
      >
        <div className="max-w-xl">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#5142f5]/30 bg-[#5142f5]/10 px-4 py-2 backdrop-blur-sm"
          >
            <Flame className="h-3.5 w-3.5 text-[#5142f5]" />
            <span className="text-xs font-bold uppercase tracking-wider text-[#5142f5]">Black Friday · 40% OFF</span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-6xl font-extrabold uppercase tracking-tight text-white sm:text-7xl lg:text-8xl"
            style={{ lineHeight: 0.9 }}
          >
            Tu cuerpo.<br />
            Tu meta.<br />
            <span className="bg-gradient-to-r from-[#5142f5] via-[#7C6FF7] to-[#22D3EE] bg-clip-text text-transparent">Tu poder.</span>
          </motion.h1>

          {/* Subhead */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mt-8 text-lg text-white/50"
          >
            Suplementos de grado farmacéutico.<br />
            Envío a LATAM en 24-72h. Pago con tarjeta, COD o cripto.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="mt-10 flex flex-wrap gap-4"
          >
            <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}>
              <Link
                href={`${base}/productos`}
                className="inline-flex items-center gap-2 rounded-full bg-[#5142f5] px-8 py-4 text-sm font-bold uppercase tracking-wide text-white"
                style={{ boxShadow: '0 8px 30px rgba(81,66,245,0.4)' }}
              >
                Comprar ahora
                <ArrowRight className="h-4 w-4" />
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}>
              <Link
                href={`${base}/ofertas`}
                className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-8 py-4 text-sm font-bold uppercase tracking-wide text-white backdrop-blur-sm hover:bg-white/10"
              >
                Ver ofertas
              </Link>
            </motion.div>
          </motion.div>

          {/* Trust stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="mt-12 flex items-center gap-6"
          >
            {[
              { icon: Star, text: '4.9/5', label: 'rating', color: '#FFB800' },
              { icon: Truck, text: '24h', label: 'envío', color: '#22D3EE' },
              { icon: Shield, text: 'ISO', label: 'calidad', color: '#5142f5' },
              { icon: Zap, text: '+10K', label: 'clientes', color: '#FF4B5C' },
            ].map((stat) => {
              const Icon = stat.icon;
              return (
                <div key={stat.label} className="flex items-center gap-2">
                  <Icon className="h-4 w-4" style={{ color: stat.color }} />
                  <div>
                    <span className="text-sm font-bold text-white">{stat.text}</span>
                    <span className="ml-1 text-xs text-white/30">{stat.label}</span>
                  </div>
                </div>
              );
            })}
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="flex flex-col items-center gap-1 text-white/30"
        >
          <span className="text-[10px] uppercase tracking-widest">Scroll</span>
          <div className="h-8 w-px bg-gradient-to-b from-white/30 to-transparent" />
        </motion.div>
      </motion.div>
    </section>
  );
}
