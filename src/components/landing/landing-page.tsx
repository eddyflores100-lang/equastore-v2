'use client';

import { SiteHeader } from './site-header';
import { Hero } from './hero';
import { FeaturedProducts } from './featured-products';
import { SiteFooter } from './site-footer';

export function LandingPage() {
  return (
    <>
      <SiteHeader />
      <main>
        <Hero />
        <FeaturedProducts />
      </main>
      <SiteFooter />
    </>
  );
}
