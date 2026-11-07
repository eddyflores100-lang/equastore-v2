'use client';

import Link from 'next/link';
import { Dumbbell, Zap, Flame, Heart } from 'lucide-react';
import { useCountry } from '@/components/country/country-provider';

const GOALS = [
  { icon: Dumbbell, title: 'Fuerza y Músculo', desc: 'Proteína, creatina, pre-entreno', href: '/categorias/fuerza', color: '#F59E0B' },
  { icon: Zap, title: 'Rendimiento', desc: 'BCAA, intra-entreno, energía', href: '/categorias/rendimiento', color: '#3B82F6' },
  { icon: Flame, title: 'Peso Saludable', desc: 'Quemadores y termogénicos', href: '/categorias/definicion', color: '#EF4444' },
  { icon: Heart, title: 'Recuperación', desc: 'Magnesio, colágeno, sueño', href: '/categorias/suplementos', color: '#10B981' },
];

export function ShopByGoal() {
  const { country } = useCountry();
  const base = `/${country.toLowerCase()}`;

  return (
    <section style={{ background: '#F0F4F8', padding: '48px 0' }}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 style={{ fontSize: '1.25rem', fontWeight: 800, textTransform: 'uppercase', marginBottom: '24px' }} className="text-slate-900">Compra por objetivo</h2>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {GOALS.map((goal) => {
            const Icon = goal.icon;
            return (
              <Link
                key={goal.title}
                href={`${base}${goal.href}`}
                className="group relative flex flex-col items-center gap-3 overflow-hidden rounded-2xl p-6 text-center"
                style={{
                  background: '#fff',
                  border: '1px solid #e5e7eb',
                  boxShadow: '0 4px 12px -2px rgba(0,0,0,0.06)',
                  transition: 'box-shadow 0.3s ease, transform 0.3s ease',
                }}
              >
                {/* Glow behind icon */}
                <div style={{
                  position: 'absolute',
                  left: '50%',
                  top: '24px',
                  width: '80px',
                  height: '80px',
                  transform: 'translateX(-50%)',
                  borderRadius: '50%',
                  background: goal.color,
                  opacity: 0.2,
                  filter: 'blur(24px)',
                }} />

                {/* Icon circle with gradient + shadow */}
                <div style={{
                  position: 'relative',
                  width: '56px',
                  height: '56px',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#fff',
                  background: `linear-gradient(135deg, ${goal.color}, ${goal.color}dd)`,
                  boxShadow: `0 8px 20px ${goal.color}50, inset 0 1px 0 rgba(255,255,255,0.2)`,
                }}>
                  <Icon className="h-7 w-7" />
                </div>

                <div>
                  <h3 style={{ fontWeight: 700, color: '#111827' }}>{goal.title}</h3>
                  <p style={{ marginTop: '4px', fontSize: '12px', color: '#6b7280' }}>{goal.desc}</p>
                </div>

                <span style={{ fontSize: '12px', fontWeight: 700, color: '#1F5AF6' }}>Comprar →</span>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
