'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Dumbbell, Zap, Flame, Heart, ArrowUpRight } from 'lucide-react';
import { useCountry } from '@/components/country/country-provider';

const GOALS = [
  { icon: Dumbbell, title: 'Fuerza', desc: 'Proteína, creatina, pre-entreno', href: '/categorias/fuerza', color: '#5142f5' },
  { icon: Zap, title: 'Rendimiento', desc: 'BCAA, energía, foco', href: '/categorias/rendimiento', color: '#22D3EE' },
  { icon: Flame, title: 'Definición', desc: 'Quemadores, termogénicos', href: '/categorias/definicion', color: '#FF4B5C' },
  { icon: Heart, title: 'Vitalidad', desc: 'Magnesio, colágeno, adaptógenos', href: '/categorias/vitalidad', color: '#10B981' },
];

export function Categories() {
  const { country } = useCountry();
  const base = `/${country.toLowerCase()}`;

  return (
    <section className="bg-black py-24">
      <div className="mx-auto max-w-7xl px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <p className="text-sm font-bold uppercase tracking-wider text-[#5142f5]">Explorá</p>
          <h2 className="mt-2 text-4xl font-extrabold uppercase tracking-tight text-white sm:text-5xl">
            Compra por <span className="bg-gradient-to-r from-[#5142f5] to-[#22D3EE] bg-clip-text text-transparent">objetivo</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {GOALS.map((goal, i) => {
            const Icon = goal.icon;
            return (
              <motion.div
                key={goal.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -8 }}
              >
                <Link
                  href={`${base}${goal.href}`}
                  className="group relative flex flex-col gap-4 overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-sm transition hover:border-[#5142f5]/40"
                >
                  {/* Glow on hover */}
                  <div
                    className="absolute -inset-1 opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-20"
                    style={{ background: goal.color }}
                  />
                  {/* Icon */}
                  <div className="relative flex h-14 w-14 items-center justify-center rounded-2xl" style={{ background: `${goal.color}20`, border: `1px solid ${goal.color}30` }}>
                    <Icon className="h-7 w-7" style={{ color: goal.color }} />
                  </div>
                  {/* Text */}
                  <div>
                    <h3 className="text-lg font-bold text-white">{goal.title}</h3>
                    <p className="mt-1 text-sm text-white/40">{goal.desc}</p>
                  </div>
                  {/* Arrow */}
                  <ArrowUpRight className="h-5 w-5 text-white/20 transition-all group-hover:text-white/60 group-hover:translate-x-1" />
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
