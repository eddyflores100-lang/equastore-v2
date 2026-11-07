'use client';

import { SiteHeader } from './site-header';
import { Hero } from './hero';
import { FeaturedProducts } from './featured-products';
import { Categories } from './categories';
import { Testimonials } from './testimonials';
import { SiteFooter } from './site-footer';

export function LandingPage() {
  return (
    <div className="min-h-screen bg-black">
      <SiteHeader />
      <main>
        <Hero />
        <FeaturedProducts />
        <Categories />
        <Testimonials />
      </main>
      <SiteFooter />
    </div>
  );
}
