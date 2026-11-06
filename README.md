# Equastore v2

Multi-country dropshipping store for LATAM, powered by Dropi + dLocal + COD + crypto.

Built with Next.js 16 + TypeScript + Tailwind + shadcn/ui + Prisma.

## 🌎 Multi-country

- 🇪🇨 Ecuador (dropi.ec, USD)
- 🇨🇴 Colombia (dropi.co, COP)
- 🇲🇽 México (dropi.mx, MXN)
- 🇨🇱 Chile (dropi.cl, CLP)
- 🇵🇪 Peru (dropi.pe, PEN)

## 💳 Payment methods (via dLocal)

- Cards: Visa, Mastercard, Amex, Diners, local cards
- Bank transfers: PSE (CO), SPEI (MX)
- Cash: OXXO (MX), PagoEfectivo (PE), Baloto (CO)
- Wallets: Nequi, Daviplata (CO), Yape (PE), Mercado Pago
- **COD (Cash on Delivery)** per country
- **Crypto** (USDT/Lightning via BTCPay Server self-hosted)

## 🏗️ Architecture

```
                    [ Cliente visita equastore.com ]
                                  │
                    [ Cloudflare Edge: cf-ipcountry header ]
                                  │
                    [ Next.js 16 middleware: geolocate ]
                                  │
        ┌─────────────────────────┼─────────────────────────┐
        ▼                         ▼                         ▼
   [ /ec — Ecuador ]        [ /co — Colombia ]        [ /mx, /cl, /pe ]
   Dropi.ec API             Dropi.co API              Dropi.{cl,pe,mx}
   Currency: USD            Currency: COP             ...
   dLocal EC methods        dLocal CO (PSE, Nequi)    dLocal country-specific
                                  │
                                  ▼
                    [ Prisma + PostgreSQL (catalog cache) ]
                    [ Dropi webhook → revalidate cache ]
                                  │
                                  ▼
                    [ Checkout propio (form dinámico) ]
                    [ dLocal Smart Fields para card ]
                    [ COD option per country ]
                    [ Cripto (BTCPay Server) ]
                                  │
                                  ▼
                    [ POST /api/orders → Dropi createOrder ]
                    [ POST /api/payments → dLocal createPayment ]
                    [ Webhook n8n → Google Sheets + WhatsApp ]
```

## 🚀 Quickstart

### 1. Install dependencies
```bash
npm install
```

### 2. Set up env vars
```bash
cp .env.example .env.local
# Fill in DATABASE_URL, DROPI_*_TOKEN, DLOCAL_*, BTCPAY_*, etc.
```

### 3. Set up database
```bash
npm run db:generate
npm run db:push  # or npm run db:migrate
npm run db:seed  # optional
```

### 4. Run dev server
```bash
npm run dev
```

Visit http://localhost:3000 — middleware will redirect `/` to `/ec` (default country).

## 📦 Stack

- **Framework**: Next.js 16 (App Router, Turbopack, partial prefetching)
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS 4 + shadcn/ui
- **Database**: PostgreSQL + Prisma 6
- **Payments**: dLocal (cards + APMs), BTCPay Server (crypto), COD
- **Dropshipping**: Dropi (multi-country tokens)
- **Geolocation**: Cloudflare cf-ipcountry header
- **Auth**: NextAuth v5 (hybrid guest/login)

## 📁 Project structure

```
src/
  app/
    (marketing)/          # landing route group
    [country]/            # dynamic country path: /ec, /co, /mx, /cl, /pe
      productos/
      producto/[slug]/
      checkout/
    api/
      orders/             # POST /api/orders → Dropi createOrder
      payments/           # POST /api/payments → dLocal createPayment
      webhooks/
        dropi/            # Dropi catalog + order status webhooks
        dlocal/           # dLocal payment status webhooks
        btcpay/           # BTCPay Server crypto webhooks
  lib/
    dropi/                # multi-country Dropi API client
    dlocal/               # dLocal payment client (HMAC signed)
    btcpay/               # BTCPay Server client
    geo/                   # geolocation utilities
    auth/                  # NextAuth config
    countries/             # country configs (5 LATAM countries)
  components/
    landing/              # hero, header, footer, trust badges
    product/              # ProductCard, ProductGrid, QuickView
    checkout/             # CheckoutForm, CODForm, UpsellModal
    country/              # CountryProvider, CountrySwitcher
    payment/              # dLocal Smart Fields, BTCPay button, COD selector
    ui/                   # shadcn/ui components
  types/                  # shared TypeScript types
  config/                 # app config
prisma/
  schema.prisma           # multi-country schema (Product, Inventory, Order, etc.)
  seed.ts                 # seed script
```

## 🛡️ Security

- **No raw card data** — dLocal Smart Fields handles card tokenization in their iframe
- **HMAC signed** dLocal requests (X-Signature header)
- **Per-country tokens** — Dropi credentials isolated per country
- **Webhook signature verification** for Dropi + dLocal + BTCPay

## 📈 Conversion features (Shopify-style)

- **Upsell**: 1-click post-purchase upsell in confirmation page
- **Downsell**: if upsell rejected, offer cheaper alternative
- **COD risk scoring**: AI-powered risk analysis before confirming COD orders
- **Abandoned cart**: capture partial data as user types (even if they don't finish)
- **Trust badges**: ISO certified, 30-day guarantee, free shipping threshold
- **Multi-language**: ES (default), FR (planned)

## 🌍 License

MIT © AliceLabs LLC
