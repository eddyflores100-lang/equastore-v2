import { Star, Quote } from 'lucide-react';

const TESTIMONIALS = [
  {
    name: 'Carlos M.',
    role: 'Crossfitter · Quito',
    rating: 5,
    text: 'Pedí Gladiator Pump un lunes, llegó el miércoles. Calidad brutal, sin azúcares agregados. Lo que más valoro es que el certificado ISO viene en el empaque.',
    product: 'Gladiator Pump',
  },
  {
    name: 'Valeria R.',
    role: 'Yoga teacher · Bogotá',
    rating: 5,
    text: 'El Glicinato de Magnesio cambió mi sueño. Antes usaba otro importado de USA que tardaba semanas en llegar. Con Equastore lo tengo en 48h y más barato.',
    product: 'Glicinato de Magnesio',
  },
  {
    name: 'Mateo L.',
    role: 'Powerlifter · CDMX',
    rating: 5,
    text: 'La creatina es 99.9% pura — lo verifiqué con el lab de confianza de mi gym. Y pagué con SPEI sin comisión. Equastore se ganó cliente recurrente.',
    product: 'Creatina Monohidratada',
  },
];

export function Testimonials() {
  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <div className="inline-flex items-center gap-1 text-amber-500">
            {[1, 2, 3, 4, 5].map((s) => (
              <Star key={s} className="h-4 w-4 fill-amber-400 text-amber-400" />
            ))}
          </div>
          <h2 className="mt-3 text-3xl font-semibold text-slate-900 sm:text-4xl">
            4.9 de 5 · más de 10.000 reseñas
          </h2>
          <p className="mt-3 text-sm text-slate-500">
            Clientes reales que ya entrenan y viven mejor con Equastore.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {TESTIMONIALS.map((t) => (
            <figure
              key={t.name}
              className="relative flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-6"
            >
              <Quote className="absolute right-5 top-5 h-6 w-6 text-slate-200" />
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star key={s} className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <blockquote className="flex-1 text-sm leading-relaxed text-slate-700">
                "{t.text}"
              </blockquote>
              <figcaption className="flex items-center gap-3 border-t border-slate-100 pt-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-amber-400 to-orange-500 text-sm font-semibold text-slate-950">
                  {t.name.charAt(0)}
                </div>
                <div>
                  <div className="text-sm font-medium text-slate-900">{t.name}</div>
                  <div className="text-xs text-slate-500">{t.role}</div>
                </div>
              </figcaption>
              <div className="text-[10px] uppercase tracking-wider text-amber-600">
                Compró: {t.product}
              </div>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
