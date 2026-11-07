'use client';

import { motion } from 'framer-motion';
import { BentoGrid, BentoGridItem } from '@/components/ui/bento-grid';
import { Dumbbell, Zap, Flame, Heart, Shield, Truck, Leaf, Sparkles } from 'lucide-react';

const items = [
  { icon: Dumbbell, title: 'Fuerza', desc: 'Proteínas, creatinas, pre-entrenos', color: '#FF4B5C' },
  { icon: Zap, title: 'Rendimiento', desc: 'BCAA, energía, foco mental', color: '#22D3EE' },
  { icon: Flame, title: 'Definición', desc: 'Quemadores, termogénicos', color: '#FFB800' },
  { icon: Heart, title: 'Vitalidad', desc: 'Adaptógenos, colágeno', color: '#10B981' },
  { icon: Shield, title: 'Calidad ISO', desc: 'Certificación en cada lote', color: '#5142f5' },
  { icon: Truck, title: 'Envío Express', desc: '24-72h a toda LATAM', color: '#7C6FF7' },
  { icon: Leaf, title: 'Eco-Friendly', desc: 'Empaques sostenibles', color: '#10B981' },
  { icon: Sparkles, title: 'IA Recomendaciones', desc: 'Encontrá tu stack ideal', color: '#22D3EE' },
];

export function Categories() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-black to-[#0a0a1a] py-24">
      <div className="mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 text-center"
        >
          <p className="text-sm font-bold uppercase tracking-wider text-[#22D3EE]">Explorá</p>
          <h2 className="mt-2 text-4xl font-extrabold text-white sm:text-5xl">
            Todo en un <span className="bg-gradient-to-r from-[#5142f5] to-[#22D3EE] bg-clip-text text-transparent">lugar</span>
          </h2>
        </motion.div>

        <BentoGrid className="md:grid-cols-4 md:grid-rows-2">
          {items.map((item, i) => {
            const Icon = item.icon;
            return (
              <BentoGridItem
                key={item.title}
                title={<span className="flex items-center gap-2 text-white"><Icon className="h-4 w-4" style={{ color: item.color }} /> {item.title}</span>}
                description={<span className="text-white/50">{item.desc}</span>}
                header={
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.05 }}
                    className="flex h-full w-full items-center justify-center"
                  >
                    <div
                      className="flex h-16 w-16 items-center justify-center rounded-2xl"
                      style={{
                        background: `linear-gradient(135deg, ${item.color}30, transparent)`,
                        border: `1px solid ${item.color}30`,
                      }}
                    >
                      <Icon className="h-8 w-8" style={{ color: item.color }} />
                    </div>
                  </motion.div>
                }
                className={i === 3 || i === 6 ? 'md:col-span-2' : ''}
                icon={<Icon className="h-4 w-4" style={{ color: item.color }} />}
              />
            );
          })}
        </BentoGrid>
      </div>
    </section>
  );
}
