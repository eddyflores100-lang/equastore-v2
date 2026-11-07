import { notFound } from 'next/navigation';
import { SiteHeader } from '@/components/landing/site-header';
import { SiteFooter } from '@/components/landing/site-footer';
import { COUNTRY_CONFIGS, isCountryCode } from '@/lib/countries';

export default async function CuentaPage({ params }: { params: Promise<{ country: string }> }) {
  const { country } = await params;
  if (!isCountryCode(country.toUpperCase())) notFound();
  return (
    <>
      <SiteHeader />
      <main className="mx-auto max-w-7xl px-4 py-20 text-center">
        <h1 className="text-3xl font-extrabold text-slate-900 capitalize">cuenta</h1>
        <p className="mt-4 text-slate-500">Próximamente</p>
      </main>
      <SiteFooter />
    </>
  );
}
export async function generateStaticParams() {
  return Object.keys(COUNTRY_CONFIGS).map(c => ({ country: c.toLowerCase() }));
}
