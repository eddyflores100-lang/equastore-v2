'use client';

import { motion } from 'framer-motion';

export function PromoBanner() {
  return (
    <section className="relative overflow-hidden border-y border-white/10 bg-gradient-to-r from-[#5142f5] via-[#4334D6] to-[#5142f5] py-6">
      {/* Animated shimmer */}
      <motion.div
        animate={{ x: ['-100%', '100%'] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
        className="absolute inset-0 opacity-20"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)' }}
      />
      <div className="relative mx-auto flex max-w-7xl items-center justify-center gap-8 px-8">
        {['🚀 Envío gratis +$25', '⚡ Pago con cripto', '🛡️ ISO Certified', '📦 COD disponible', '🌍 5 países LATAM'].map((text, i) => (
          <motion.span
            key={i}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="text-sm font-bold text-white/90"
          >
            {text}
          </motion.span>
        ))}
      </div>
    </section>
  );
}
