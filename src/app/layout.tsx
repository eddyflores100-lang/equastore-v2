import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Toaster } from '@/components/ui/sonner';
import { CountryProvider } from '@/components/country/country-provider';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export const metadata: Metadata = {
  title: {
    default: 'Equastore — Tu cuerpo, tu meta, tu poder',
    template: '%s | Equastore',
  },
  description:
    'Suplementos deportivos y de wellness con envío a Ecuador, Colombia, México, Chile y Perú. Pago con tarjeta, transferencia, efectivo, COD y cripto.',
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  openGraph: {
    title: 'Equastore',
    description: 'Tu cuerpo, tu meta, tu poder',
    type: 'website',
    locale: 'es_EC',
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es" className={inter.variable}>
      <body className="font-sans antialiased min-h-screen bg-white text-slate-900">
        <CountryProvider>{children}</CountryProvider>
        <Toaster />
      </body>
    </html>
  );
}
