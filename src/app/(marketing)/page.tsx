import { redirect } from 'next/navigation';
import { LandingPage } from '@/components/landing/landing-page';

/**
 * Root page — the geolocation middleware will redirect "/" to "/[country]/".
 * This page is rendered if middleware doesn't redirect (rare).
 */
export default function RootPage() {
  // Default to EC if no country path
  redirect('/ec');
}

// Also export the landing page for static render fallback
export { LandingPage };
