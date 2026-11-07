import Link from 'next/link';
import { Dumbbell, Zap, Flame, Heart } from 'lucide-react';

const GOALS = [
  { icon: Dumbbell, title: 'Strength & Muscle', desc: 'Protein, creatine, pre-workout', href: '/categorias/fuerza' },
  { icon: Zap, title: 'Sports Performance', desc: 'BCAA, intra-workout, energy', href: '/categorias/rendimiento' },
  { icon: Flame, title: 'Healthy Weight', desc: 'Burners and thermogenics', href: '/categorias/definicion' },
  { icon: Heart, title: 'Recovery', desc: 'Magnesium, collagen, sleep', href: '/categorias/suplementos' },
];

export function ShopByGoal() {
  return (
    <section className="bg-[#D6E4F0] py-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="mb-5 text-xl font-black uppercase text-slate-900">SHOP BY GOAL</h2>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {GOALS.map((goal) => {
            const Icon = goal.icon;
            return (
              <Link
                key={goal.title}
                href={goal.href}
                className="group flex flex-col items-center gap-3 border border-slate-300 bg-white p-5 text-center transition hover:border-[#1F5AF6] hover:shadow-md"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#1F5AF6] text-white">
                  <Icon className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-black text-slate-900">{goal.title}</h3>
                  <p className="mt-1 text-xs text-slate-500">{goal.desc}</p>
                </div>
                <span className="text-xs font-bold text-[#1F5AF6] group-hover:underline">SHOP NOW &gt;</span>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
