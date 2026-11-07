'use client';

import Link from 'next/link';
import { Dumbbell, Zap, Flame, Heart } from 'lucide-react';
import { useRef, useState, type MouseEvent } from 'react';

const GOALS = [
  { icon: Dumbbell, title: 'Fuerza y Músculo', desc: 'Proteína, creatina, pre-entreno', href: '/categorias/fuerza', color: '#F59E0B' },
  { icon: Zap, title: 'Rendimiento', desc: 'BCAA, intra-entreno, energía', href: '/categorias/rendimiento', color: '#3B82F6' },
  { icon: Flame, title: 'Peso Saludable', desc: 'Quemadores y termogénicos', href: '/categorias/definicion', color: '#EF4444' },
  { icon: Heart, title: 'Recuperación', desc: 'Magnesio, colágeno, sueño', href: '/categorias/suplementos', color: '#10B981' },
];

export function ShopByGoal() {
  return (
    <section className="bg-[#F0F4F8] py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="mb-6 text-xl font-extrabold uppercase tracking-tight text-slate-900">Compra por objetivo</h2>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {GOALS.map((goal) => (
            <GoalCard key={goal.title} goal={goal} />
          ))}
        </div>
      </div>
    </section>
  );
}

function GoalCard({ goal }: { goal: typeof GOALS[0] }) {
  const ref = useRef<HTMLAnchorElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);
  const Icon = goal.icon;

  const handleMouseMove = (e: MouseEvent<HTMLAnchorElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    setTilt({
      x: ((y - centerY) / centerY) * -6,
      y: ((x - centerX) / centerX) * 6,
    });
  };

  return (
    <Link
      ref={ref}
      href={goal.href}
      className="group relative"
      style={{ perspective: '800px' }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => { setHovered(false); setTilt({ x: 0, y: 0 }); }}
    >
      {/* Glow behind card */}
      <div
        className="absolute -inset-1 rounded-2xl opacity-0 blur-md transition-opacity duration-300 group-hover:opacity-30"
        style={{ background: `linear-gradient(135deg, ${goal.color}, transparent)` }}
      />

      <div
        className="relative flex flex-col items-center gap-3 rounded-2xl border border-slate-200 bg-white p-6 text-center transition-all duration-200 group-hover:shadow-[0_15px_40px_-10px_rgba(0,0,0,0.15)]"
        style={{
          transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
          transformStyle: 'preserve-3d',
          transition: hovered ? 'transform 0.1s ease-out' : 'transform 0.4s ease-out',
        }}
      >
        {/* Icon with glow circle */}
        <div className="relative">
          {/* Glow behind icon */}
          <div
            className="absolute inset-0 rounded-full opacity-30 blur-xl transition-opacity group-hover:opacity-60"
            style={{ background: goal.color }}
          />
          <div
            className="relative flex h-14 w-14 items-center justify-center rounded-full text-white shadow-lg"
            style={{
              background: `linear-gradient(135deg, ${goal.color}, ${goal.color}dd)`,
              boxShadow: `0 8px 20px ${goal.color}40`,
              transform: 'translateZ(30px)',
            }}
          >
            <Icon className="h-7 w-7" />
          </div>
        </div>

        <div style={{ transform: 'translateZ(20px)' }}>
          <h3 className="font-bold text-slate-900">{goal.title}</h3>
          <p className="mt-1 text-xs text-slate-500">{goal.desc}</p>
        </div>

        <span className="text-xs font-bold text-[#1F5AF6] group-hover:underline" style={{ transform: 'translateZ(15px)' }}>
          Comprar →
        </span>
      </div>
    </Link>
  );
}
