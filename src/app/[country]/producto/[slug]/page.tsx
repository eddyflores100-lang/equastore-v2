import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Star, ShoppingCart, Shield, Truck, CheckCircle2, ChevronRight, Minus, Plus } from 'lucide-react';
import { SiteHeader } from '@/components/landing/site-header';
import { SiteFooter } from '@/components/landing/site-footer';
import { COUNTRY_CONFIGS, isCountryCode, type CountryCode } from '@/lib/countries';
import { MOCK_PRODUCTS, getProductBySlug, getProductPrice, getDiscountPercent, getProductsByCategory } from '@/lib/products/mock-data';
import { ProductCard } from '@/components/product/product-card';
import { ProductDetailClient } from './detail-client';

interface PageProps {
  params: Promise<{ country: string; slug: string }>;
}

export async function generateStaticParams() {
  const countries = Object.keys(COUNTRY_CONFIGS);
  return countries.flatMap((country) =>
    MOCK_PRODUCTS.map((product) => ({
      country: country.toLowerCase(),
      slug: product.slug,
    }))
  );
}

export default async function ProductDetailPage({ params }: PageProps) {
  const { country: rawCountry, slug } = await params;
  const country = rawCountry.toUpperCase();
  if (!isCountryCode(country)) notFound();
  const countryCode = country as CountryCode;

  const product = getProductBySlug(slug);
  if (!product) notFound();

  const related = getProductsByCategory(product.category)
    .filter((p) => p.id !== product.id)
    .slice(0, 4);

  const price = getProductPrice(product, countryCode);
  const discount = getDiscountPercent(price);
  const symbol = currencySymbol(price.currency);
  const config = COUNTRY_CONFIGS[countryCode];

  return (
    <>
      <SiteHeader />
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="mb-6 flex items-center gap-1 text-sm text-slate-500">
          <Link href="/" className="hover:text-blue-700">Inicio</Link>
          <ChevronRight className="h-3 w-3" />
          <Link href="/productos" className="hover:text-blue-700">Productos</Link>
          <ChevronRight className="h-3 w-3" />
          <Link href={`/productos?categoria=${product.category}`} className="hover:text-blue-700 capitalize">
            {product.category}
          </Link>
          <ChevronRight className="h-3 w-3" />
          <span className="truncate text-slate-900">{product.title}</span>
        </nav>

        <div className="grid gap-8 lg:grid-cols-2">
          {/* Image */}
          <div className="relative aspect-square overflow-hidden rounded-2xl bg-slate-50">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={product.images[0]} alt={product.title} className="h-full w-full object-cover" />
            {discount > 0 && (
              <span className="absolute left-4 top-4 rounded-full bg-orange-500 px-3 py-1 text-sm font-semibold text-white">
                -{discount}%
              </span>
            )}
          </div>

          {/* Details */}
          <ProductDetailClient
            product={product}
            country={countryCode}
            price={price}
            symbol={symbol}
            config={config}
          />
        </div>

        {/* Specifications */}
        {product.specifications && product.specifications.length > 0 && (
          <section className="mt-12">
            <h2 className="mb-4 text-xl font-bold text-slate-900">Especificaciones</h2>
            <div className="rounded-xl border border-slate-200 bg-white p-6">
              <ul className="grid gap-3 sm:grid-cols-2">
                {product.specifications.map((spec) => (
                  <li key={spec} className="flex items-start gap-2 text-sm">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-emerald-600" />
                    <span className="text-slate-700">{spec}</span>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        )}

        {/* Related */}
        {related.length > 0 && (
          <section className="mt-16">
            <h2 className="mb-6 text-xl font-bold text-slate-900">También te puede gustar</h2>
            <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4">
              {related.map((p) => (
                <ProductCard key={p.id} product={p} country={countryCode} />
              ))}
            </div>
          </section>
        )}
      </main>
      <SiteFooter />
    </>
  );
}

function currencySymbol(currency: string): string {
  const symbols: Record<string, string> = {
    USD: '$', COP: '$', MXN: '$', CLP: '$', PEN: 'S/',
  };
  return symbols[currency] || '$';
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) return {};
  return {
    title: product.title,
    description: product.description.slice(0, 160),
  };
}
