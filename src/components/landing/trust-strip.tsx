import { ShieldCheck, Truck, RefreshCcw } from 'lucide-react';

const ITEMS = [
  {
    icon: ShieldCheck,
    title: 'Calidad farmacéutica',
    desc: 'Certificación ISO en cada lote',
  },
  {
    icon: Truck,
    title: 'Envío exprés',
    desc: '24-72h en LATAM',
  },
  {
    icon: RefreshCcw,
    title: '30 días de garantía',
    desc: 'Devolución sin preguntas',
  },
];

export function TrustStrip() {
  return (
    <section className="border-b border-slate-100 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 divide-y divide-slate-100 sm:grid-cols-3 sm:divide-y-0 sm:divide-x">
          {ITEMS.map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.title} className="flex items-center gap-3 py-5 sm:justify-center sm:px-6">
                <Icon className="h-5 w-5 flex-shrink-0 text-amber-500" strokeWidth={1.5} />
                <div>
                  <div className="text-sm font-medium text-slate-900">{item.title}</div>
                  <div className="text-xs text-slate-500">{item.desc}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
