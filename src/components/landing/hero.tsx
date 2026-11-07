'use client';

import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { ArrowRight } from 'lucide-react';
import { useCountry } from '@/components/country/country-provider';

export function Hero() {
  const { country } = useCountry();
  const base = `/${country.toLowerCase()}`;
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const textY = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const imgY = useTransform(scrollYProgress, [0, 1], ['0%', '-15%']);

  return (
    <section ref={ref} className="relative h-screen overflow-hidden bg-black">
      {/* Product image — right side, parallax */}
      <motion.div
        style={{ y: imgY }}
        className="absolute inset-0 flex items-center justify-end"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/equastore-v2/product-3d.png"
          alt="Producto estrella"
          className="h-full w-full object-cover opacity-50"
          style={{
            maskImage: 'linear-gradient(to left, black 30%, transparent 80%)',
            WebkitMaskImage: 'linear-gradient(to left, black 30%, transparent 80%)',
          }}
        />
      </motion.div>

      {/* Text — left, tons of whitespace, minimal */}
      <motion.div
        style={{ y: textY }}
        className="relative z-10 mx-auto flex h-full max-w-7xl items-center px-8"
      >
        <div className="max-w-xl">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-6xl font-extrabold uppercase tracking-tight text-white sm:text-7xl lg:text-8xl"
            style={{ lineHeight: 0.9 }}
          >
            Tu cuerpo.<br />
            Tu meta.<br />
            <span style={{ color: '#5142f5' }}>Tu poder.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="mt-10 text-lg text-white/40"
          >
            Suplementos de grado farmacéutico.<br />
            Envío a LATAM en 24-72h.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="mt-12"
          >
            <Link
              href={`${base}/productos`}
              className="inline-flex items-center gap-2 rounded-full bg-white px-8 py-4 text-sm font-bold uppercase tracking-wide text-black transition hover:bg-white/80"
            >
              Comprar ahora
              <ArrowRight className="h-4 w-4" />
            </Link>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
