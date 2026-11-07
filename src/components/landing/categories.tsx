'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { MOCK_CATEGORIES } from '@/lib/products/mock-data';

const GRADIENTS: Record<string, string> = {
  suplementos: 'from-emerald-500/15 to-emerald-700/5',
  fuerza: 'from-amber-500/15 to-orange-700/5',
  definicion: 'from-rose-500/15 to-rose-700/5',
  vitalidad: 'from-violet-500/15 to-indigo-700/5',
};

export function Categories() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <div className="mb-10">
        <p className="text-xs font-medium uppercase tracking-wider text-amber-600">Compra por objetivo</p>
        <h2 className="mt-2 text-3xl font-semibold text-slate-900 sm:text-4xl">
          Encontrá lo que necesitás
        </h2>
      </div>

      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        {MOCK_CATEGORIES.map((cat) => (
          <Link
            key={cat.slug}
            href={`/categorias/${cat.slug}`}
            className={`group relative overflow-hidden rounded-2xl border border-slate-200 bg-gradient-to-br ${GRADIENTS[cat.slug] || GRADIENTS.suplementos} p-6 transition-all hover:border-slate-300 hover:shadow-md`}
          >
            <div className="flex h-full flex-col justify-between gap-4">
              <div>
                <div className="text-3xl">{cat.emoji}</div>
                <h3 className="mt-3 text-lg font-semibold text-slate-900">{cat.name}</h3>
                <p className="mt-1 text-xs text-slate-600 line-clamp-2">{cat.description}</p>
              </div>
              <div className="flex items-center gap-1 text-xs font-medium text-slate-900">
                <span>{cat.productCount} productos</span>
                <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
