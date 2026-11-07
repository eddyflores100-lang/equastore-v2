'use client';

import { useState } from 'react';
import { ProductGrid } from '@/components/product/product-grid';
import { ProductQuickView } from '@/components/product/product-quick-view';
import type { Product, ProductCategory } from '@/types/product';
import type { CountryCode } from '@/lib/countries';
import Link from 'next/link';
import { useCountry } from '@/components/country/country-provider';

interface Props {
  products: Product[];
  country: CountryCode;
  categories: ProductCategory[];
  activeCategory?: string;
  searchQuery?: string;
}

export function ProductCatalogClient({ products, country, categories, activeCategory, searchQuery }: Props) {
  const { setCountry } = useCountry();
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [quickViewOpen, setQuickViewOpen] = useState(false);
  const [search, setSearch] = useState(searchQuery || '');

  const handleQuickView = (product: Product) => {
    setQuickViewProduct(product);
    setQuickViewOpen(true);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (search.trim()) {
      window.location.href = `${window.location.pathname}?q=${encodeURIComponent(search)}`;
    } else {
      window.location.href = window.location.pathname;
    }
  };

  return (
    <div className="grid gap-8 lg:grid-cols-[220px_1fr]">
      {/* Sidebar filters */}
      <aside className="space-y-6">
        <div>
          <h3 className="mb-3 text-xs font-semibold uppercase tracking-wide text-slate-500">Buscar</h3>
          <form onSubmit={handleSearch} className="flex gap-2">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Producto..."
              className="h-9 w-full rounded-lg border border-slate-200 px-3 text-sm focus:border-blue-500 focus:outline-none"
            />
            <button
              type="submit"
              className="rounded-lg bg-blue-700 px-3 text-sm font-medium text-white hover:bg-blue-800"
            >
              Ir
            </button>
          </form>
        </div>

        <div>
          <h3 className="mb-3 text-xs font-semibold uppercase tracking-wide text-slate-500">Categorías</h3>
          <ul className="space-y-1">
            <li>
              <Link
                href="/productos"
                className={`block rounded-md px-3 py-1.5 text-sm hover:bg-slate-50 ${
                  !activeCategory ? 'font-medium text-blue-700' : 'text-slate-700'
                }`}
              >
                Todos
              </Link>
            </li>
            {categories.map((cat) => (
              <li key={cat.slug}>
                <Link
                  href={`/productos?categoria=${cat.slug}`}
                  className={`flex items-center gap-2 rounded-md px-3 py-1.5 text-sm hover:bg-slate-50 ${
                    activeCategory === cat.slug ? 'font-medium text-blue-700' : 'text-slate-700'
                  }`}
                >
                  <span>{cat.emoji}</span>
                  {cat.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </aside>

      {/* Products */}
      <div>
        <ProductGrid products={products} country={country} onQuickView={handleQuickView} />

        <ProductQuickView
          product={quickViewProduct}
          country={country}
          open={quickViewOpen}
          onOpenChange={setQuickViewOpen}
        />
      </div>
    </div>
  );
}
