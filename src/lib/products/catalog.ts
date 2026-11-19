import { COUNTRY_CONFIGS, type CountryCode } from '@/lib/countries';
import { MOCK_PRODUCTS } from './mock-data';
import imported from './dropi-ecuador.json';
import type { Product } from '@/types/product';

export const DROPI_ECUADOR = COUNTRY_CONFIGS.EC.code;
export function getCatalog(country: CountryCode): Product[] {
  return country === DROPI_ECUADOR ? [...MOCK_PRODUCTS, ...(imported as Product[])] : MOCK_PRODUCTS;
}

export function getCatalogProduct(country: CountryCode, slug: string) {
  return getCatalog(country).find((product) => product.slug === slug);
}
