'use client';

import { SiteHeader } from './site-header';
import { Hero } from './hero';
import { FeaturedProducts } from './featured-products';
import { Categories } from './categories';
import { PromoBanner } from './promo-banner';
import { Testimonials } from './testimonials';
import { Newsletter } from './newsletter';
import { SiteFooter } from './site-footer';

export function LandingPage() {
  return (
    <div className="min-h-screen bg-black">
      <SiteHeader />
      <main>
        <Hero />
        <PromoBanner />
        <Categories />
        <FeaturedProducts />
        <Testimonials />
        <Newsletter />
      </main>
      <SiteFooter />
    </div>
  );
}
