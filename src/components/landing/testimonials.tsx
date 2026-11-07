'use client';

import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

const TESTIMONIALS = [
  { name: 'Carlos M.', role: 'Crossfitter · Quito', text: 'El Gladiator Pump llegó en 24h. Calidad brutal, sin azúcares. ISO en el empaque.', rating: 5, color: '#5142f5' },
  { name: 'Valeria R.', role: 'Yoga · Bogotá', text: 'El Glicinato de Magnesio cambió mi sueño. 48h a Colombia, más barato que importar.', rating: 5, color: '#22D3EE' },
  { name: 'Mateo L.', role: 'Powerlifter · CDMX', text: 'Creatina 99.9% pura. Pagué con SPEI sin comisión. Cliente recurrente.', rating: 5, color: '#FF4B5C' },
  { name: 'Javiera S.', role: 'Atleta · Santiago', text: 'Turkesterone llegó a Chile en 3 días. Resultados visibles en 2 semanas.', rating: 5, color: '#10B981' },
  { name: 'Diego P.', role: 'Coach · Lima', text: 'Compré 6 Colágenos + Moringa. Envío gratis, pagué con cripto. Perfecto.', rating: 5, color: '#FFB800' },
];

export function Testimonials() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-black to-[#0a0a14] py-24">
      {/* Glow */}
      <div className="pointer-events-none absolute left-1/2 top-0 h-64 w-[600px] -translate-x-1/2 rounded-full bg-[#5142f5]/10 blur-[120px]" />

      <div className="mx-auto max-w-7xl px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 text-center"
        >
          <p className="text-sm font-bold uppercase tracking-wider text-[#5142f5]">Comunidad</p>
          <h2 className="mt-2 text-4xl font-extrabold uppercase tracking-tight text-white sm:text-5xl">
            +10.000 clientes <span className="bg-gradient-to-r from-[#FFB800] to-[#FF4B5C] bg-clip-text text-transparent">satisfechos</span>
          </h2>
        </motion.div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {TESTIMONIALS.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -4 }}
              className="relative rounded-2xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-sm"
            >
              {/* Stars */}
              <div className="mb-3 flex gap-1">
                {[1,2,3,4,5].map(s => <Star key={s} className="h-4 w-4" style={{ fill: t.color, color: t.color }} />)}
              </div>
              {/* Text */}
              <p className="text-sm text-white/70 leading-relaxed">"{t.text}"</p>
              {/* Author */}
              <div className="mt-4 flex items-center gap-3 border-t border-white/5 pt-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full text-sm font-bold text-white" style={{ background: `linear-gradient(135deg, ${t.color}, ${t.color}80)` }}>
                  {t.name.charAt(0)}
                </div>
                <div>
                  <div className="text-sm font-bold text-white">{t.name}</div>
                  <div className="text-xs text-white/40">{t.role}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
