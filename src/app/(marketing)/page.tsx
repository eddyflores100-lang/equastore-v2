import { LandingPage } from '@/components/landing/landing-page';

/**
 * Root page — the landing page renders directly.
 * Country is detected client-side via CountryProvider (cookie or selector).
 *
 * For multi-country routing, /ec, /co, /mx, /cl, /pe paths also exist
 * but the root / shows the same landing with country from user's preference.
 */
export default function RootPage() {
  return <LandingPage />;
}

export const metadata = {
  title: 'Equastore — Tu cuerpo, tu meta, tu poder',
  description:
    'Suplementos deportivos y de wellness con envío a Ecuador, Colombia, México, Chile y Perú. Pago con tarjeta, transferencia, efectivo, COD y cripto.',
};
