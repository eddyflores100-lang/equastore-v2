import type { CountryCode } from '@/lib/countries';
import type { Product, ProductCategory } from '@/types/product';
import importedEcuadorProducts from './dropi-ec.json';
import { MOCK_CATEGORIES, MOCK_PRODUCTS } from './mock-data';

const ecuadorProducts: Product[] = importedEcuadorProducts;

export function getCatalogProducts(country: CountryCode): Product[] {
  return country === 'EC' ? [...MOCK_PRODUCTS, ...ecuadorProducts] : MOCK_PRODUCTS;
}

export function getCatalogCategories(country: CountryCode): ProductCategory[] {
  const products = getCatalogProducts(country);
  const categories = [...MOCK_CATEGORIES];
  const known = new Set(categories.map(({ slug }) => slug));
  for (const { category } of products) {
    if (known.has(category)) continue;
    known.add(category);
    categories.push({ slug: category, name: category.replace(/-/g, ' '), description: '', emoji: '', productCount: 0 });
  }
  return categories.map((category) => ({
    ...category,
    productCount: products.filter((product) => product.category === category.slug).length,
  }));
}
