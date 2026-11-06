'use client';

import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import { COUNTRY_CONFIGS, type CountryCode, type CountryConfig } from '@/lib/countries';

interface CountryContextValue {
  country: CountryCode;
  config: CountryConfig;
  setCountry: (code: CountryCode) => void;
}

const CountryContext = createContext<CountryContextValue | null>(null);

const COOKIE_NAME = 'equastore_country';

export function CountryProvider({ children }: { children: ReactNode }) {
  const [country, setCountryState] = useState<CountryCode>('EC');

  // Read country from cookie on mount
  useEffect(() => {
    const match = document.cookie.match(
      new RegExp(`(?:^|; )${COOKIE_NAME}=([^;]+)`)
    );
    if (match) {
      const code = match[1].toUpperCase();
      if (code in COUNTRY_CONFIGS) {
        setCountryState(code as CountryCode);
        return;
      }
    }
    // Fallback: extract from URL path
    const pathParts = window.location.pathname.split('/');
    const pathCountry = pathParts[1]?.toUpperCase();
    if (pathCountry && pathCountry in COUNTRY_CONFIGS) {
      setCountryState(pathCountry as CountryCode);
    }
  }, []);

  const setCountry = (code: CountryCode) => {
    setCountryState(code);
    // Update cookie
    document.cookie = `${COOKIE_NAME}=${code}; path=/; max-age=${60 * 60 * 24 * 365}; samesite=lax`;
    // Navigate to new country path
    const pathParts = window.location.pathname.split('/');
    const rest = pathParts.slice(2).join('/');
    const newPath = `/${code.toLowerCase()}${rest ? '/' + rest : ''}`;
    if (window.location.pathname !== newPath) {
      window.location.href = newPath + window.location.search + window.location.hash;
    }
  };

  const value: CountryContextValue = {
    country,
    config: COUNTRY_CONFIGS[country],
    setCountry,
  };

  return <CountryContext.Provider value={value}>{children}</CountryContext.Provider>;
}

export function useCountry() {
  const ctx = useContext(CountryContext);
  if (!ctx) {
    throw new Error('useCountry must be used within CountryProvider');
  }
  return ctx;
}
