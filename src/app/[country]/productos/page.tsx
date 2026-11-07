import { notFound } from 'next/navigation';
import { SiteHeader } from '@/components/landing/site-header';
import { SiteFooter } from '@/components/landing/site-footer';
import { COUNTRY_CONFIGS, isCountryCode, type CountryCode } from '@/lib/countries';
import { MOCK_PRODUCTS, MOCK_CATEGORIES, getProductsByCategory } from '@/lib/products/mock-data';
import { ProductCatalogClient } from './catalog-client';

interface PageProps {
  params: Promise<{ country: string }>;
}

export async function generateStaticParams() {
  return Object.keys(COUNTRY_CONFIGS).map((code) => ({
    country: code.toLowerCase(),
  }));
}

export default async function ProductosPage({ params }: PageProps) {
  const { country: rawCountry } = await params;
  const country = rawCountry.toUpperCase();
  if (!isCountryCode(country)) notFound();
  const countryCode = country as CountryCode;

  return (
    <>
      <SiteHeader />
      <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900">Todos los productos</h1>
          <p className="mt-2 text-sm text-slate-500">
            {MOCK_PRODUCTS.length} productos · {COUNTRY_CONFIGS[countryCode].flag} {COUNTRY_CONFIGS[countryCode].name}
          </p>
        </div>

        <ProductCatalogClient
          products={MOCK_PRODUCTS}
          country={countryCode}
          categories={MOCK_CATEGORIES}
        />
      </main>
      <SiteFooter />
    </>
  );
}

export async function generateMetadata({ params }: PageProps) {
  const { country: rawCountry } = await params;
  const country = rawCountry.toUpperCase();
  if (!isCountryCode(country)) return {};
  const config = COUNTRY_CONFIGS[country as keyof typeof COUNTRY_CONFIGS];
  return {
    title: `Productos · ${config.name}`,
    description: `Catálogo de suplementos deportivos y wellness con envío a ${config.name}.`,
  };
}
