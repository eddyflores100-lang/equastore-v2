/**
 * Equastore v2 — dLocal payment gateway client
 *
 * dLocal provides a single API for accepting payments across 40+ emerging markets.
 * In LATAM, dLocal handles cards (Visa/MC/Amex), bank transfers (PSE CO, SPEI MX),
 * cash (OXXO MX, PagoEfectivo PE), and wallets (Nequi, Daviplata, Yape).
 *
 * Docs: https://docs.dlocal.com/docs/full-api
 *
 * Auth: HMAC SHA-256 over `X-Login` + `X-Date` + `X-Trans-Key`-signed payload.
 * See: https://docs.dlocal.com/reference/authentication
 */

import { CountryCode, getCountryConfig } from '@/lib/countries';
import crypto from 'crypto';

export interface DLocalPaymentRequest {
  amount: number;
  currency: string;
  country: string; // ISO 2-letter code (e.g. "EC", "CO")
  payment_method_id: string; // e.g. "CARD", "PSE", "OXXO", "SPEI"
  payment_method_flow?: 'DIRECT' | 'REDIRECT';
  payer: {
    name: string;
    email?: string;
    document: string;
    phone?: string;
  };
  card?: {
    holder_name: string;
    number: string;
    cvv: string;
    expiration_month: string;
    expiration_year: string;
    capture?: boolean;
  };
  order_id: string;
  description: string;
  notification_url: string; // webhook for status updates
  callback_url?: string; // redirect after 3DS
}

export interface DLocalPaymentResponse {
  id: string;
  amount: number;
  currency: string;
  country: string;
  payment_method_id: string;
  status: 'AUTHORIZED' | 'VERIFIED' | 'PENDING' | 'REJECTED' | 'EXPIRED' | 'CANCELLED';
  status_code: string;
  status_detail: string;
  order_id: string;
  created_date: string;
  redirect_url?: string; // for REDIRECT flow (PSE, OXXO)
  card?: {
    holder_name: string;
    last4: string;
    bin: string;
    brand: string;
  };
}

export interface DLocalRefundRequest {
  payment_id: string;
  amount: number;
  currency: string;
  description: string;
}

class DLocalClient {
  private xLogin: string;
  private xTransKey: string;
  private xSecret: string;
  private apiBase: string;
  private sandbox: boolean;

  constructor() {
    this.xLogin = process.env.DLOCAL_X_LOGIN || '';
    this.xTransKey = process.env.DLOCAL_X_TRANS_KEY || '';
    this.xSecret = process.env.DLOCAL_X_SECRET || '';
    this.sandbox = process.env.DLOCAL_SANDBOX === 'true';
    this.apiBase =
      process.env.DLOCAL_API_BASE ||
      (this.sandbox ? 'https://sandbox.dlocal.com' : 'https://api.dlocal.com');

    if (!this.xLogin || this.xLogin.startsWith('replace-with-')) {
      console.warn('[dLocal] DLOCAL_X_LOGIN not configured. Payments will fail in production.');
    }
  }

  /**
   * Generate HMAC signature for dLocal API auth.
   * Format: HMAC-SHA-256 of `X-Login + X-Date + X-Trans-Key + payload` using xSecret.
   */
  private sign(date: string, body: string): string {
    const dataToSign = `${this.xLogin}${date}${this.xTransKey}${body}`;
    return crypto.createHmac('sha256', this.xSecret).update(dataToSign).digest('hex');
  }

  private async request<T>(
    method: 'GET' | 'POST' | 'PUT' | 'DELETE',
    path: string,
    payload?: unknown
  ): Promise<T> {
    const body = payload ? JSON.stringify(payload) : '';
    const date = new Date().toISOString();
    const signature = this.sign(date, body);

    const url = `${this.apiBase}${path}`;
    const response = await fetch(url, {
      method,
      headers: {
        'X-Login': this.xLogin,
        'X-Trans-Key': this.xTransKey,
        'X-Date': date,
        'X-Version': '2.1',
        'X-Signature': signature,
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: method === 'GET' ? undefined : body,
    });

    const text = await response.text();
    if (!response.ok) {
      throw new Error(
        `dLocal ${method} ${path} failed: ${response.status} ${text.slice(0, 500)}`
      );
    }

    try {
      return JSON.parse(text) as T;
    } catch {
      // Some dLocal endpoints return empty 204 responses
      return {} as T;
    }
  }

  // --- Payments ---

  async createPayment(payment: DLocalPaymentRequest): Promise<DLocalPaymentResponse> {
    return this.request<DLocalPaymentResponse>('POST', '/payments', payment);
  }

  async getPayment(paymentId: string): Promise<DLocalPaymentResponse> {
    return this.request<DLocalPaymentResponse>('GET', `/payments/${paymentId}`);
  }

  async capturePayment(paymentId: string, amount: number, currency: string): Promise<DLocalPaymentResponse> {
    return this.request<DLocalPaymentResponse>('POST', `/payments/${paymentId}/capture`, {
      amount,
      currency,
    });
  }

  async refundPayment(refund: DLocalRefundRequest): Promise<{ id: string; status: string }> {
    return this.request('POST', `/payments/${refund.payment_id}/refunds`, {
      amount: refund.amount,
      currency: refund.currency,
      description: refund.description,
    });
  }

  // --- Payment methods per country ---

  async listPaymentMethods(country: string): Promise<
    {
      id: string;
      name: string;
      type: 'CARD' | 'BANK_TRANSFER' | 'TICKET' | 'WALLET' | 'CRYPTO';
      flow: 'DIRECT' | 'REDIRECT';
      countries: string[];
    }[]
  > {
    return this.request('GET', '/payment-methods');
  }

  /**
   * Get the list of payment methods available for a given Equastore country.
   * Filters the full dLocal list by country code.
   */
  async getCountryPaymentMethods(country: CountryCode) {
    const config = getCountryConfig(country);
    const all = await this.listPaymentMethods(config.dLocalCountryCode);
    return all.filter((m) => m.countries.includes(config.dLocalCountryCode));
  }
}

// Singleton client
let _client: DLocalClient | null = null;
export function getDLocalClient(): DLocalClient {
  if (!_client) _client = new DLocalClient();
  return _client;
}
