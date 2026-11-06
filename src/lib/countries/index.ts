/**
 * Equastore v2 — Country configuration
 *
 * Each country has its own:
 * - Dropi API endpoint + token (from env)
 * - dLocal country code (for payments)
 * - Currency + flag + phone code
 * - Document type for checkout (cédula, RUT, DNI, etc.)
 * - COD availability + fee
 */

export const COUNTRY_CODE = {
  EC: 'EC',
  CO: 'CO',
  MX: 'MX',
  CL: 'CL',
  PE: 'PE',
} as const;

export type CountryCode = keyof typeof COUNTRY_CODE;

export interface CountryConfig {
  code: CountryCode;
  name: string;
  currency: string;
  currencySymbol: string;
  flag: string;
  phoneCode: string;
  // Dropi
  dropiApiUrl: string;
  dropiTokenEnv: string; // env var name where token is stored
  // dLocal
  dLocalCountryCode: string;
  // Checkout document
  documentLabel: string;
  documentPlaceholder: string;
  documentRegex: string;
  // Address labels (region/city)
  regionLabel: string;
  cityLabel: string;
  // COD
  codEnabled: boolean;
  codFee: number;
  // Default shipping cost in local currency (used if Dropi doesn't provide one)
  defaultShippingCost: number;
  // Free shipping threshold in local currency
  freeShippingThreshold: number;
}

export const COUNTRY_CONFIGS: Record<CountryCode, CountryConfig> = {
  EC: {
    code: 'EC',
    name: 'Ecuador',
    currency: 'USD',
    currencySymbol: '$',
    flag: '🇪🇨',
    phoneCode: '+593',
    dropiApiUrl: process.env.DROPI_EC_API_URL || 'https://api.dropi.ec/api/v1',
    dropiTokenEnv: 'DROPI_EC_TOKEN',
    dLocalCountryCode: 'EC',
    documentLabel: 'Cédula / RUC',
    documentPlaceholder: '1712345678',
    documentRegex: '^[0-9]{10,13}$',
    regionLabel: 'Provincia',
    cityLabel: 'Ciudad',
    codEnabled: true,
    codFee: 2.0,
    defaultShippingCost: 3.5,
    freeShippingThreshold: 25,
  },
  CO: {
    code: 'CO',
    name: 'Colombia',
    currency: 'COP',
    currencySymbol: '$',
    flag: '🇨🇴',
    phoneCode: '+57',
    dropiApiUrl: process.env.DROPI_CO_API_URL || 'https://api.dropi.co/api/v1',
    dropiTokenEnv: 'DROPI_CO_TOKEN',
    dLocalCountryCode: 'CO',
    documentLabel: 'Cédula / NIT',
    documentPlaceholder: '1234567890',
    documentRegex: '^[0-9]{8,15}$',
    regionLabel: 'Departamento',
    cityLabel: 'Ciudad',
    codEnabled: true,
    codFee: 5000,
    defaultShippingCost: 8000,
    freeShippingThreshold: 100000,
  },
  MX: {
    code: 'MX',
    name: 'México',
    currency: 'MXN',
    currencySymbol: '$',
    flag: '🇲🇽',
    phoneCode: '+52',
    dropiApiUrl: process.env.DROPI_MX_API_URL || 'https://api.dropi.mx/api/v1',
    dropiTokenEnv: 'DROPI_MX_TOKEN',
    dLocalCountryCode: 'MX',
    documentLabel: 'CURP / RFC',
    documentPlaceholder: 'ABCD123456EF',
    documentRegex: '^[A-Z0-9]{10,18}$',
    regionLabel: 'Estado',
    cityLabel: 'Ciudad',
    codEnabled: true,
    codFee: 50,
    defaultShippingCost: 99,
    freeShippingThreshold: 999,
  },
  CL: {
    code: 'CL',
    name: 'Chile',
    currency: 'CLP',
    currencySymbol: '$',
    flag: '🇨🇱',
    phoneCode: '+56',
    dropiApiUrl: process.env.DROPI_CL_API_URL || 'https://api.dropi.cl/api/v1',
    dropiTokenEnv: 'DROPI_CL_TOKEN',
    dLocalCountryCode: 'CL',
    documentLabel: 'RUT',
    documentPlaceholder: '12.345.678-9',
    documentRegex: '^[0-9]{7,8}-[0-9Kk]$',
    regionLabel: 'Región',
    cityLabel: 'Comuna',
    codEnabled: true,
    codFee: 1500,
    defaultShippingCost: 3000,
    freeShippingThreshold: 30000,
  },
  PE: {
    code: 'PE',
    name: 'Perú',
    currency: 'PEN',
    currencySymbol: 'S/',
    flag: '🇵🇪',
    phoneCode: '+51',
    dropiApiUrl: process.env.DROPI_PE_API_URL || 'https://api.dropi.pe/api/v1',
    dropiTokenEnv: 'DROPI_PE_TOKEN',
    dLocalCountryCode: 'PE',
    documentLabel: 'DNI / RUC',
    documentPlaceholder: '12345678',
    documentRegex: '^[0-9]{8,11}$',
    regionLabel: 'Departamento',
    cityLabel: 'Ciudad',
    codEnabled: true,
    codFee: 8,
    defaultShippingCost: 15,
    freeShippingThreshold: 120,
  },
};

export const COUNTRY_LIST: CountryConfig[] = Object.values(COUNTRY_CONFIGS);

export function getCountryConfig(code: string | null | undefined): CountryConfig {
  if (code && code in COUNTRY_CONFIGS) {
    return COUNTRY_CONFIGS[code as CountryCode];
  }
  return COUNTRY_CONFIGS.EC; // default fallback
}

export function isCountryCode(value: string): value is CountryCode {
  return value in COUNTRY_CONFIGS;
}
