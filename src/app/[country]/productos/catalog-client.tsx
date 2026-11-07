'use client';

import { useState, useMemo } from 'react';
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
}

export function ProductCatalogClient({ products, country, categories, activeCategory }: Props) {
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [quickViewOpen, setQuickViewOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(activeCategory || null);

  const handleQuickView = (product: Product) => {
    setQuickViewProduct(product);
    setQuickViewOpen(true);
  };

  const filteredProducts = useMemo(() => {
    let result = products;
    if (selectedCategory) {
      result = result.filter((p) => p.category === selectedCategory);
    }
    if (search.trim()) {
      const lower = search.toLowerCase();
      result = result.filter(
        (p) =>
          p.title.toLowerCase().includes(lower) ||
          p.description.toLowerCase().includes(lower) ||
          (p.brand || '').toLowerCase().includes(lower)
      );
    }
    return result;
  }, [products, selectedCategory, search]);

  return (
    <div className="grid gap-8 lg:grid-cols-[220px_1fr]">
      {/* Sidebar filters */}
      <aside className="space-y-6">
        <div>
          <h3 className="mb-3 text-xs font-semibold uppercase tracking-wide text-slate-500">Buscar</h3>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Producto..."
            className="h-9 w-full rounded-lg border border-slate-200 px-3 text-sm focus:border-blue-500 focus:outline-none"
          />
        </div>

        <div>
          <h3 className="mb-3 text-xs font-semibold uppercase tracking-wide text-slate-500">Categorías</h3>
          <ul className="space-y-1">
            <li>
              <button
                type="button"
                onClick={() => setSelectedCategory(null)}
                className={`flex w-full items-center gap-2 rounded-md px-3 py-1.5 text-sm hover:bg-slate-50 ${
                  !selectedCategory ? 'font-medium text-blue-700' : 'text-slate-700'
                }`}
              >
                Todos
              </button>
            </li>
            {categories.map((cat) => (
              <li key={cat.slug}>
                <button
                  type="button"
                  onClick={() => setSelectedCategory(cat.slug)}
                  className={`flex w-full items-center gap-2 rounded-md px-3 py-1.5 text-sm hover:bg-slate-50 ${
                    selectedCategory === cat.slug ? 'font-medium text-blue-700' : 'text-slate-700'
                  }`}
                >
                  <span>{cat.emoji}</span>
                  {cat.name}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </aside>

      {/* Products */}
      <div>
        <ProductGrid products={filteredProducts} country={country} onQuickView={handleQuickView} />

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
