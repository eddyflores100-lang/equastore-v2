import { notFound } from 'next/navigation';
import { LandingPage } from '@/components/landing/landing-page';
import { COUNTRY_CONFIGS, isCountryCode } from '@/lib/countries';

interface PageProps {
  params: Promise<{ country: string }>;
}

export async function generateStaticParams() {
  return Object.keys(COUNTRY_CONFIGS).map((code) => ({
    country: code.toLowerCase(),
  }));
}

export default async function CountryHomePage({ params }: PageProps) {
  const { country: rawCountry } = await params;
  const country = rawCountry.toUpperCase();

  if (!isCountryCode(country)) {
    notFound();
  }

  // The landing page uses the CountryProvider (client-side) for country context.
  // The middleware already set the cookie, so the provider will pick it up.
  return <LandingPage />;
}

export async function generateMetadata({ params }: PageProps) {
  const { country: rawCountry } = await params;
  const country = rawCountry.toUpperCase();
  if (!isCountryCode(country)) return {};
  const config = COUNTRY_CONFIGS[country as keyof typeof COUNTRY_CONFIGS];
  return {
    title: `Equastore — ${config.name}`,
    description: `Suplementos deportivos y wellness con envío a ${config.name}. Pago en ${config.currency}.`,
    alternates: {
      canonical: `/${country.toLowerCase()}`,
    },
  };
}
