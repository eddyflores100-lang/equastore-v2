<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Equastore v2 — Agent Guide

## Multi-country dropshipping store

This project is a multi-country e-commerce store for LATAM with:
- **5 countries**: EC, CO, MX, CL, PE — each with its own Dropi API token, currency, and payment methods
- **Dropi API**: multi-country client at `src/lib/dropi/client.ts`
- **dLocal**: payment gateway at `src/lib/dlocal/client.ts` (HMAC signed)
- **Geolocation middleware**: redirects `/` to `/[country]` based on Cloudflare cf-ipcountry header
- **Prisma + PostgreSQL**: schema with Product, Inventory (per-country), Order, Customer

## UI generation via 21st.dev MCP

This project is configured with the **21st MCP server** (https://21st.dev/api/mcp) for AI-powered UI generation.

### Available clients (config files in repo)
- `.mcp.json` — Claude Code / Claude Desktop
- `.cursor/mcp.json` — Cursor
- `.vscode/mcp.json` — VS Code (with GitHub Copilot or other MCP clients)

### Setup

1. Get a free API key at https://21st.dev/mcp
2. Set it in your environment:
   ```bash
   export API_KEY_21ST="your-key-here"
   ```
   Or for VS Code: the editor will prompt you the first time you start the server.

3. Restart your editor (Cursor / Claude Code / VS Code).

### How to use

Once the MCP is loaded, your agent (Claude Code, Cursor, etc.) can:

- **Search 10,000+ React/Tailwind components**: "search 21st for a checkout form component"
- **Generate new UI**: "use 21st to generate a product card with rating + price + discount badge"
- **Match project design**: 21st reads `.21st/design.json` (auto-generated) to match components to this project's color palette, fonts, and shadcn/ui primitives

### Project design context

The 21st CLI auto-generated `.21st/design.json` and `.21st/DESIGN.md` from:
- `src/app/globals.css` — design tokens (Tailwind CSS variables)
- `src/components/ui/` — installed shadcn/ui components (badge, button, card, dropdown-menu, input, label, select, separator, sheet, sonner, tabs, toast)
- This `AGENTS.md` file (design instructions)

When you ask 21st to generate a component, it will:
- Use the project's palette: navy blue `--primary: oklch(0.34 0.13 255)`, orange accent `--accent: oklch(0.72 0.19 55)`
- Match installed shadcn primitives (don't re-install what's already there)
- Use Tailwind v4 syntax (not v3)

### Refresh design context

If you add new shadcn components, change `globals.css`, or update the design system:

```bash
npx @21st-dev/cli@latest init --design-context --refresh
```

This regenerates `.21st/design.json` and `.21st/DESIGN.md` from current sources.

### Review UI

After generating components, you can ask 21st to review them:

```bash
npx @21st-dev/cli@latest review src/components/landing/hero.tsx --fix
```

This applies deterministic local rules (accessibility, contrast, responsive) and fixes issues automatically.

## Project conventions

### File structure
- `src/app/[country]/` — country-specific pages (EC, CO, MX, CL, PE)
- `src/app/api/` — server routes (orders, payments, webhooks)
- `src/lib/dropi/`, `src/lib/dlocal/`, `src/lib/btcpay/` — integration clients
- `src/components/ui/` — shadcn/ui primitives
- `src/components/landing/`, `product/`, `checkout/` — feature components

### TypeScript strictness

The project uses `tsconfig.json` with strict mode. Type errors fail the build.

### Country context

Use `useCountry()` from `src/components/country/country-provider.tsx` in client components to get the current country config:

```tsx
import { useCountry } from '@/components/country/country-provider';

function MyComponent() {
  const { country, config } = useCountry();
  return <div>País: {config.name} ({config.currencySymbol})</div>;
}
```

### Database access

Use Prisma client to access the database. Import from `@/lib/db` (TODO: create this file).

### Don't do these

- Don't install @base-ui/react directly — it's already a transitive dep of shadcn
- Don't use `cn` from a `cn` package — use `cn` from `@/lib/utils`
- Don't hardcode country codes — use `CountryCode` type from `@/lib/countries`
- Don't read Dropi tokens directly from env — use `getDropiClient()` which validates the token
- Don't use `asChild` on shadcn Button (the new version uses @base-ui/react, not Radix)
