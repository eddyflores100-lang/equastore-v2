import Link from 'next/link';
import { Dumbbell, Zap, Flame, Heart } from 'lucide-react';

const GOALS = [
  {
    icon: Dumbbell,
    title: 'Fuerza & Músculo',
    desc: 'Proteínas, creatinas y pre-entrenos',
    href: '/categorias/fuerza',
    color: 'bg-amber-500',
  },
  {
    icon: Zap,
    title: 'Rendimiento',
    desc: 'BCAA, intra-entreno y energía',
    href: '/categorias/rendimiento',
    color: 'bg-blue-500',
  },
  {
    icon: Flame,
    title: 'Peso Saludable',
    desc: 'Quemadores y termogénicos',
    href: '/categorias/definicion',
    color: 'bg-rose-500',
  },
  {
    icon: Heart,
    title: 'Recuperación',
    desc: 'Magnesio, colágeno y sueño',
    href: '/categorias/suplementos',
    color: 'bg-emerald-500',
  },
];

export function ShopByGoal() {
  return (
    <section className="bg-slate-50 py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="mb-6 text-2xl font-black text-slate-900">COMPRA POR OBJETIVO</h2>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {GOALS.map((goal) => {
            const Icon = goal.icon;
            return (
              <Link
                key={goal.title}
                href={goal.href}
                className="group flex flex-col items-center gap-3 border border-slate-200 bg-white p-6 text-center transition hover:border-amber-400 hover:shadow-md"
              >
                <div className={`flex h-14 w-14 items-center justify-center rounded-full ${goal.color} text-white`}>
                  <Icon className="h-7 w-7" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900">{goal.title}</h3>
                  <p className="mt-1 text-xs text-slate-500">{goal.desc}</p>
                </div>
                <span className="text-xs font-bold text-amber-600 group-hover:underline">
                  SHOP NOW &gt;
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
