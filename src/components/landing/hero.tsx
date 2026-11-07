'use client';

import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { Sparkles as SparklesIcon, ArrowRight, Star, Zap, Shield, Truck } from 'lucide-react';
import { useCountry } from '@/components/country/country-provider';

import { TextGenerateEffect } from '@/components/ui/text-generate-effect';

export function Hero() {
  const { country } = useCountry();
  const base = `/${country.toLowerCase()}`;
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.8]);

  const words = 'Suplementos de élite. Equipamiento inteligente. Todo lo que necesitás para construir tu mejor versión.';

  return (
    <section ref={ref} className="relative min-h-screen overflow-hidden bg-black">
      {/* Gradient overlay */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/40 via-[#5142f5]/20 to-black" />
      <div className="pointer-events-none absolute inset-0" style={{ background: 'radial-gradient(ellipse at center, rgba(81,66,245,0.15), transparent 60%)' }} />

      {/* Content with parallax */}
      <motion.div
        style={{ y, opacity, scale }}
        className="relative z-10 mx-auto flex min-h-screen max-w-7xl flex-col items-center justify-center px-6 text-center"
      >
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-4 py-2 backdrop-blur-md"
        >
          <SparklesIcon className="h-3.5 w-3.5 text-[#22D3EE]" />
          <span className="text-xs font-medium text-white/80">Nuevo · Rediseño 2026</span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8, ease: 'easeOut' }}
          className="text-5xl font-extrabold leading-[1.05] tracking-tight text-white sm:text-7xl lg:text-8xl"
        >
          Tu cuerpo,
          <br />
          <span className="bg-gradient-to-r from-[#5142f5] via-[#22D3EE] to-[#FF4B5C] bg-clip-text text-transparent">
            tu poder
          </span>
        </motion.h1>

        {/* Text generate effect — Aceternity */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-6 max-w-2xl"
        >
          <TextGenerateEffect words={words} className="text-base text-white/60 sm:text-lg" />
        </motion.div>

        {/* CTA buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.6 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-4"
        >
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link
              href={`${base}/productos`}
              className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-white px-8 py-4 text-sm font-bold text-black"
              style={{ boxShadow: '0 0 40px rgba(255,255,255,0.3)' }}
            >
              Explorar productos
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </motion.div>

          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link
              href={`${base}/ofertas`}
              className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/5 px-8 py-4 text-sm font-bold text-white backdrop-blur-md hover:bg-white/10"
            >
              Ver ofertas
            </Link>
          </motion.div>
        </motion.div>

        {/* Stats row — floating glass cards */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.6 }}
          className="mt-16 grid grid-cols-2 gap-4 sm:grid-cols-4"
        >
          {[
            { icon: Star, value: '4.9', label: 'Rating', color: '#FFB800' },
            { icon: Zap, value: '24h', label: 'Envío', color: '#22D3EE' },
            { icon: Shield, value: 'ISO', label: 'Certificado', color: '#5142f5' },
            { icon: Truck, value: '+$25', label: 'Envío gratis', color: '#FF4B5C' },
          ].map((stat, i) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.4 + i * 0.1, type: 'spring' }}
                className="flex flex-col items-center gap-1 rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-md"
              >
                <Icon className="h-5 w-5" style={{ color: stat.color }} />
                <span className="text-xl font-extrabold text-white">{stat.value}</span>
                <span className="text-[10px] text-white/50">{stat.label}</span>
              </motion.div>
            );
          })}
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="flex flex-col items-center gap-1 text-white/40"
        >
          <span className="text-[10px] uppercase tracking-widest">Scroll</span>
          <div className="h-8 w-px bg-gradient-to-b from-white/40 to-transparent" />
        </motion.div>
      </motion.div>
    </section>
  );
}
