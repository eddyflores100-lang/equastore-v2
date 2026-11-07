import { notFound } from 'next/navigation';
import { SiteHeader } from '@/components/landing/site-header';
import { SiteFooter } from '@/components/landing/site-footer';
import { COUNTRY_CONFIGS, isCountryCode, type CountryCode } from '@/lib/countries';
import { MOCK_PRODUCTS, getDiscountPercent } from '@/lib/products/mock-data';
import { ProductCatalogClient } from '../productos/catalog-client';

export default async function OfertasPage({ params }: { params: Promise<{ country: string }> }) {
  const { country: rawCountry } = await params;
  const country = rawCountry.toUpperCase();
  if (!isCountryCode(country)) notFound();
  const countryCode = country as CountryCode;
  const onSale = MOCK_PRODUCTS.filter(p => {
    const price = p.prices[countryCode];
    return price?.originalAmount && price.originalAmount > price.amount;
  });
  return (
    <>
      <SiteHeader />
      <main className="mx-auto max-w-7xl px-4 py-10">
        <h1 className="text-3xl font-extrabold text-slate-900">Ofertas</h1>
        <p className="mt-2 text-sm text-slate-500">{onSale.length} productos en oferta</p>
        <div className="mt-6">
          <ProductCatalogClient products={onSale} country={countryCode} categories={[]} />
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
export async function generateStaticParams() {
  return Object.keys(COUNTRY_CONFIGS).map(c => ({ country: c.toLowerCase() }));
}
