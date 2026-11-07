'use client';

import { motion } from 'framer-motion';
import { useCountry } from '@/components/country/country-provider';

export function Newsletter() {
  const { country } = useCountry();

  return (
    <section className="relative overflow-hidden bg-black py-24">
      {/* Glow background */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-96 w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#5142f5]/15 blur-[120px]" />

      <div className="relative mx-auto max-w-2xl px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl font-extrabold uppercase tracking-tight text-white sm:text-5xl">
            Recibí <span className="bg-gradient-to-r from-[#5142f5] to-[#22D3EE] bg-clip-text text-transparent">10% off</span>
          </h2>
          <p className="mt-4 text-white/40">Ofertas exclusivas, lanzamientos y guías de suplementación.</p>

          <form className="mt-8 flex gap-2">
            <input
              type="email"
              placeholder="tu@email.com"
              className="h-12 flex-1 rounded-full border border-white/10 bg-white/5 px-6 text-sm text-white placeholder:text-white/30 focus:border-[#5142f5] focus:outline-none"
            />
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              type="submit"
              className="rounded-full bg-[#5142f5] px-8 text-sm font-bold uppercase text-white"
              style={{ boxShadow: '0 4px 20px rgba(81,66,245,0.4)' }}
            >
              Suscribirme
            </motion.button>
          </form>
        </motion.div>
      </div>
    </section>
  );
}
