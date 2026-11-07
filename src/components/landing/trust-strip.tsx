import { ShieldCheck, Truck, Star, Award, Lock, RefreshCw } from 'lucide-react';

const TRUST_ITEMS = [
  {
    icon: Award,
    title: 'ISO Certified Lab',
    description: 'Calidad farmacéutica verificada',
  },
  {
    icon: Truck,
    title: 'Envío Express',
    description: '24-72h en LATAM · gratis sobre $25',
  },
  {
    icon: ShieldCheck,
    title: 'Pago Seguro',
    description: 'dLocal, transferencia, COD o cripto',
  },
  {
    icon: RefreshCw,
    title: 'Garantía 30 días',
    description: 'Devolución sin preguntas',
  },
  {
    icon: Lock,
    title: 'Datos Protegidos',
    description: 'SSL + PCI DSS Level 1',
  },
  {
    icon: Star,
    title: '4.9/5 · 10K+ clientes',
    description: 'Reseñas verificadas',
  },
];

export function TrustStrip() {
  return (
    <section className="border-y border-slate-100 bg-white py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-6">
          {TRUST_ITEMS.map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.title} className="flex flex-col items-center gap-2 text-center">
                <div className="rounded-full bg-blue-50 p-3 text-blue-700">
                  <Icon className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-slate-900">{item.title}</h3>
                  <p className="mt-0.5 text-xs text-slate-500">{item.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
