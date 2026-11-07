import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from '@/components/ui/sonner';
import { Suspense } from 'react';
import { CountryProvider } from '@/components/country/country-provider';

export const metadata: Metadata = {
  title: {
    default: 'Equastore — Suplementos deportivos de grado farmacéutico',
    template: '%s | Equastore',
  },
  description:
    'Suplementos deportivos y de wellness con envío a Ecuador, Colombia, México, Chile y Perú.',
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&family=Oswald:wght@500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-sans antialiased min-h-screen bg-white text-slate-900">
        <Suspense fallback={null}>
          <CountryProvider>{children}</CountryProvider>
        </Suspense>
        <Toaster />
      </body>
    </html>
  );
}
