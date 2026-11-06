/**
 * Equastore v2 — Geolocation middleware
 *
 * Detects the visitor's country from Cloudflare's cf-ipcountry header
 * (or geo header from Vercel) and sets a cookie. If the user is visiting
 * the root URL "/", redirects to "/[country]/" based on detected country.
 *
 * Falls back to EC (Ecuador) when no header is present (dev mode).
 */

import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { COUNTRY_CONFIGS, isCountryCode, type CountryCode } from '@/lib/countries';

const COOKIE_NAME = 'equastore_country';
const COUNTRY_PATH_REGEX = /^\/(ec|co|mx|cl|pe)(\/|$)/i;

export function middleware(request: NextRequest) {
  const { pathname, search } = request.nextUrl;

  // Skip static assets, API routes, and Next internals
  if (
    pathname.startsWith('/_next/') ||
    pathname.startsWith('/api/') ||
    pathname.startsWith('/favicon') ||
    pathname.includes('.')
  ) {
    return NextResponse.next();
  }

  // Detect country from Cloudflare / Vercel headers
  const cfCountry = request.headers.get('cf-ipcountry');
  const vercelCountry = request.headers.get('x-vercel-ip-country');
  const detectedRaw = (cfCountry || vercelCountry || process.env.GEO_FALLBACK_COUNTRY || 'EC').toUpperCase();
  const detected: CountryCode = isCountryCode(detectedRaw) ? detectedRaw : 'EC';

  // Read the user's preferred country from cookie (manual override via country switcher)
  const cookieCountry = request.cookies.get(COOKIE_NAME)?.value;
  const cookieCountryUpper = cookieCountry?.toUpperCase();
  const preferred: CountryCode =
    cookieCountryUpper && isCountryCode(cookieCountryUpper) ? cookieCountryUpper : detected;

  // If user is on the root path, redirect to their preferred country
  if (pathname === '/' || pathname === '') {
    const url = request.nextUrl.clone();
    url.pathname = `/${preferred.toLowerCase()}`;
    return NextResponse.redirect(url);
  }

  // If user is on a country path that doesn't match their preferred country,
  // and they came from an external referrer (not via internal nav),
  // we leave them alone — they explicitly navigated there.
  // The cookie is only updated by the explicit country switcher.

  // Set the country cookie if not already set, or if changed
  const response = NextResponse.next();
  if (!cookieCountry || cookieCountryUpper !== preferred) {
    response.cookies.set(COOKIE_NAME, preferred, {
      path: '/',
      maxAge: 60 * 60 * 24 * 365, // 1 year
      sameSite: 'lax',
      httpOnly: false, // readable by client for flag display
    });
  }

  // Pass detected country to downstream via header (server components can read)
  response.headers.set('x-equastore-country', preferred);
  response.headers.set('x-equastore-detected-country', detected);

  return response;
}

export const config = {
  matcher: [
    // Match all paths except static assets, API routes, and Next internals
    '/((?!_next/static|_next/image|favicon.ico|api/|.*\\..*).*)',
  ],
};

// Export the country list + cookie name for client-side use
export { COUNTRY_CONFIGS, COOKIE_NAME };
