'use client';

import { InfiniteMovingCards } from '@/components/ui/infinite-moving-cards';
import { Star } from 'lucide-react';

const testimonials = [
  {
    quote: 'El Gladiator Pump llegó en 24h a Quito. Calidad brutal, sin azúcares. El certificado ISO viene en el empaque.',
    name: 'Carlos M.',
    title: 'Crossfitter · Quito, Ecuador',
    rating: 5,
  },
  {
    quote: 'El Glicinato de Magnesio cambió mi sueño. Antes usaba otro importado de USA. Con Equastore lo tengo en 48h y más barato.',
    name: 'Valeria R.',
    title: 'Yoga teacher · Bogotá, Colombia',
    rating: 5,
  },
  {
    quote: 'La creatina es 99.9% pura — lo verifiqué con el lab de mi gym. Y pagué con SPEI sin comisión. Cliente recurrente.',
    name: 'Mateo L.',
    title: 'Powerlifter · CDMX, México',
    rating: 5,
  },
  {
    quote: 'Pedí Turkesterone y llegué a Chile en 3 días. Resultados visibles en 2 semanas. El mejor precio que encontré.',
    name: 'Javiera S.',
    title: 'Atleta · Santiago, Chile',
    rating: 5,
  },
  {
    quote: 'Compré 6 Colágenos y el Moringa. Envío gratis, pagué con cripto. Llegó todo perfecto a Lima.',
    name: 'Diego P.',
    title: 'Fitness coach · Lima, Perú',
    rating: 5,
  },
];

export function Testimonials() {
  return (
    <section className="relative overflow-hidden bg-[#0a0a1a] py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-12 text-center">
          <p className="text-sm font-bold uppercase tracking-wider text-[#22D3EE]">Comunidad</p>
          <h2 className="mt-2 text-4xl font-extrabold text-white sm:text-5xl">
            +10.000 clientes <span className="bg-gradient-to-r from-[#FFB800] to-[#FF4B5C] bg-clip-text text-transparent">satisfechos</span>
          </h2>
        </div>
      </div>

      <div className="relative">
        <InfiniteMovingCards
          items={testimonials.map(t => ({
            quote: t.quote,
            name: t.name,
            title: t.title,
          }))}
          direction="right"
          speed="slow"
        />
      </div>
    </section>
  );
}
