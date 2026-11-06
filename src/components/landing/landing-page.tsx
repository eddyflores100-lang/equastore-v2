import { SiteHeader } from './site-header';
import { Hero } from './hero';

export function LandingPage() {
  return (
    <>
      <SiteHeader />
      <main>
        <Hero />
        {/* TODO: FeaturedProducts, Categories, TrustSection, Footer */}
      </main>
    </>
  );
}
