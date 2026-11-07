'use client';

import { SiteHeader } from './site-header';
import { Hero } from './hero';
import { ShopByGoal } from './shop-by-goal';
import { FeaturedProducts } from './featured-products';
import { Categories } from './categories';
import { SiteFooter } from './site-footer';

export function LandingPage() {
  return (
    <>
      <SiteHeader />
      <main>
        <Hero />
        <ShopByGoal />
        <FeaturedProducts />
        <Categories />
      </main>
      <SiteFooter />
    </>
  );
}
