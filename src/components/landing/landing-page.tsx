'use client';

import { SiteHeader } from './site-header';
import { Hero } from './hero';
import { TrustStrip } from './trust-strip';
import { Categories } from './categories';
import { FeaturedProducts } from './featured-products';
import { SiteFooter } from './site-footer';
import { OfferModal } from './offer-modal';

export function LandingPage() {
  return (
    <>
      <SiteHeader />
      <main>
        <Hero />
        <TrustStrip />
        <Categories />
        <FeaturedProducts />
      </main>
      <SiteFooter />
      <OfferModal />
    </>
  );
}
