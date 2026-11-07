'use client';

import { useEffect, useState } from 'react';
import { X, Gift } from 'lucide-react';

export function OfferModal() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    // Show after 5 seconds if not previously dismissed
    const dismissed = document.cookie.includes('equastore_offer_dismissed=1');
    if (dismissed) return;

    const timer = setTimeout(() => setOpen(true), 5000);
    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setOpen(false);
    // Set cookie to not show again for 7 days
    document.cookie = 'equastore_offer_dismissed=1; path=/; max-age=604800';
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-slate-900/80 backdrop-blur-sm"
        onClick={handleClose}
        aria-hidden
      />
      <div className="relative w-full max-w-md overflow-hidden rounded-2xl bg-white shadow-2xl">
        <button
          type="button"
          onClick={handleClose}
          aria-label="Cerrar"
          className="absolute right-4 top-4 rounded-full p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-700"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="bg-gradient-to-br from-orange-500 to-red-500 p-8 text-center text-white">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-white/20">
            <Gift className="h-7 w-7" />
          </div>
          <h2 className="text-2xl font-bold">¡Bienvenido a Equastore!</h2>
          <p className="mt-2 text-sm text-orange-50">
            Recibí 10% de descuento en tu primera compra
          </p>
        </div>

        <div className="p-6">
          <form className="flex flex-col gap-3">
            <input
              type="email"
              placeholder="tu@email.com"
              required
              className="h-11 w-full rounded-lg border border-slate-200 px-4 text-sm focus:border-blue-500 focus:outline-none"
            />
            <button
              type="submit"
              className="h-11 w-full rounded-lg bg-blue-700 text-sm font-medium text-white hover:bg-blue-800"
            >
              Quiero mi 10% off
            </button>
          </form>
          <button
            type="button"
            onClick={handleClose}
            className="mt-3 w-full text-center text-xs text-slate-400 hover:text-slate-600"
          >
            No, gracias
          </button>
        </div>
      </div>
    </div>
  );
}
