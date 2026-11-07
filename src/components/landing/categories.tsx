'use client';

import Link from 'next/link';
import { MOCK_CATEGORIES } from '@/lib/products/mock-data';

export function Categories() {
  return (
    <section className="bg-slate-50 py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 text-center">
          <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl">Compra por objetivo</h2>
          <p className="mt-2 text-sm text-slate-500">
            Encuentra lo que necesitás según tu meta
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          {MOCK_CATEGORIES.map((cat) => (
            <Link
              key={cat.slug}
              href={`/categorias/${cat.slug}`}
              className="group flex flex-col items-center gap-3 rounded-2xl border border-slate-200 bg-white p-6 transition-all hover:-translate-y-1 hover:border-blue-200 hover:shadow-md"
            >
              <span className="text-4xl transition-transform group-hover:scale-110">{cat.emoji}</span>
              <div className="text-center">
                <h3 className="font-semibold text-slate-900">{cat.name}</h3>
                <p className="mt-1 text-xs text-slate-500">{cat.productCount} productos</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
