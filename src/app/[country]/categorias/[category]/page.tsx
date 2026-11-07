import { notFound } from 'next/navigation';
import { SiteHeader } from '@/components/landing/site-header';
import { SiteFooter } from '@/components/landing/site-footer';
import { COUNTRY_CONFIGS, isCountryCode, type CountryCode } from '@/lib/countries';
import { MOCK_PRODUCTS, MOCK_CATEGORIES, getProductsByCategory } from '@/lib/products/mock-data';
import { ProductCatalogClient } from '../../productos/catalog-client';

export default async function CategoryPage({ params }: { params: Promise<{ country: string; category: string }> }) {
  const { country: rawCountry, category } = await params;
  const country = rawCountry.toUpperCase();
  if (!isCountryCode(country)) notFound();
  const countryCode = country as CountryCode;
  const cat = MOCK_CATEGORIES.find(c => c.slug === category);
  if (!cat) notFound();
  const products = getProductsByCategory(category);
  return (
    <>
      <SiteHeader />
      <main className="mx-auto max-w-7xl px-4 py-10">
        <h1 className="text-3xl font-extrabold text-slate-900">{cat.name}</h1>
        <p className="mt-2 text-sm text-slate-500">{cat.description}</p>
        <div className="mt-6">
          <ProductCatalogClient products={products} country={countryCode} categories={MOCK_CATEGORIES} />
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
export async function generateStaticParams() {
  const countries = Object.keys(COUNTRY_CONFIGS);
  return countries.flatMap(c => MOCK_CATEGORIES.map(cat => ({ country: c.toLowerCase(), category: cat.slug })));
}
