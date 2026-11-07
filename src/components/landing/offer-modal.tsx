'use client';

import { useEffect, useState } from 'react';
import { X, Gift } from 'lucide-react';

export function OfferModal() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const dismissed = document.cookie.includes('equastore_offer_dismissed=1');
    if (dismissed) return;
    const timer = setTimeout(() => setOpen(true), 8000);
    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setOpen(false);
    document.cookie = 'equastore_offer_dismissed=1; path=/; max-age=604800';
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm" onClick={handleClose} aria-hidden />
      <div className="relative w-full max-w-md overflow-hidden rounded-2xl bg-white shadow-2xl">
        <button
          type="button"
          onClick={handleClose}
          aria-label="Cerrar"
          className="absolute right-3 top-3 z-10 rounded-full p-1.5 text-slate-400 hover:bg-slate-100"
        >
          <X className="h-4 w-4" />
        </button>

        <div className="bg-gradient-to-br from-slate-950 to-slate-900 p-8 text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-amber-500/10">
            <Gift className="h-5 w-5 text-amber-400" />
          </div>
          <p className="text-xs font-medium uppercase tracking-wider text-amber-300">
            Solo para nuevos clientes
          </p>
          <h2 className="mt-2 text-3xl font-semibold text-white">10% off</h2>
          <p className="mt-1 text-sm text-slate-400">en tu primera compra</p>
        </div>

        <div className="p-6">
          <form className="flex flex-col gap-3">
            <input
              type="email"
              placeholder="tu@email.com"
              required
              className="h-11 w-full rounded-lg border border-slate-200 px-4 text-sm focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500/20"
            />
            <button
              type="submit"
              className="h-11 w-full rounded-lg bg-slate-900 text-sm font-medium text-white transition hover:bg-slate-800"
            >
              Quiero mi descuento
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
