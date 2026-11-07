import Link from 'next/link';
import { Dumbbell, Zap, Flame, Heart } from 'lucide-react';

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
          {GOALS.map((goal) => {
            const Icon = goal.icon;
            return (
              <Link
                key={goal.title}
                href={goal.href}
                className="group depth-card relative flex flex-col items-center gap-3 overflow-hidden rounded-2xl bg-white p-6 text-center"
              >
                {/* Permanent glow behind icon */}
                <div
                  className="absolute left-1/2 top-6 h-20 w-20 -translate-x-1/2 rounded-full opacity-20 blur-2xl transition-opacity group-hover:opacity-40"
                  style={{ background: goal.color }}
                />

                {/* Icon circle with gradient + permanent shadow */}
                <div
                  className="icon-depth relative flex h-14 w-14 items-center justify-center rounded-full text-white"
                  style={{
                    background: `linear-gradient(135deg, ${goal.color}, ${goal.color}dd)`,
                    boxShadow: `0 8px 20px ${goal.color}50, inset 0 1px 0 rgba(255,255,255,0.2)`,
                  }}
                >
                  <Icon className="h-7 w-7" />
                </div>

                <div>
                  <h3 className="font-bold text-slate-900">{goal.title}</h3>
                  <p className="mt-1 text-xs text-slate-500">{goal.desc}</p>
                </div>

                <span className="text-xs font-bold text-[#1F5AF6] group-hover:underline">
                  Comprar →
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
