'use client';

import Link from 'next/link';
import { Truck, ShieldCheck, CreditCard, Award } from 'lucide-react';
import { useCountry } from '@/components/country/country-provider';

const SHIP_INFO = [
  { icon: Truck, title: 'ENVÍOS A LATAM', desc: 'Ecuador · Colombia · México · Chile · Perú' },
  { icon: Award, title: 'CALIDAD ISO', desc: 'Certificación en cada lote' },
  { icon: ShieldCheck, title: 'ENVÍO GRATIS +$25', desc: 'En productos Signature' },
  { icon: CreditCard, title: 'PAGOS SEGUROS', desc: 'Tarjeta · Transferencia · COD · Cripto' },
];

export function SiteFooter() {
  const { country } = useCountry();
  const base = `/${country.toLowerCase()}`;

  return (
    <footer style={{ background: '#14181F', color: '#cbd5e1' }}>
      {/* Shipping bar */}
      <div style={{ borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-4 sm:divide-x" style={{ borderColor: 'rgba(255,255,255,0.08)' }}>
            {SHIP_INFO.map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.title} className="flex items-center gap-3 p-4">
                  <Icon className="h-6 w-6" style={{ color: '#1F5AF6', flexShrink: 0 }} />
                  <div>
                    <div style={{ fontSize: '12px', fontWeight: 700, color: '#fff' }}>{item.title}</div>
                    <div style={{ fontSize: '11px', color: '#94a3b8' }}>{item.desc}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Newsletter */}
      <div style={{ borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="grid gap-4 lg:grid-cols-2 lg:items-center">
            <div>
              <h2 style={{ fontSize: '1.125rem', fontWeight: 700, color: '#fff' }}>Suscribite y recibí ofertas exclusivas</h2>
              <p style={{ fontSize: '12px', color: '#94a3b8' }}>Descuentos, sorteos y promociones únicas.</p>
            </div>
            <form className="flex gap-2">
              <input type="email" placeholder="tu@email.com" style={{ height: '40px', flex: 1, borderRadius: '8px', border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(255,255,255,0.03)', padding: '0 12px', fontSize: '14px', color: '#fff' }} />
              <button type="submit" style={{ height: '40px', borderRadius: '8px', padding: '0 24px', fontSize: '14px', fontWeight: 700, color: '#fff', background: 'linear-gradient(135deg, #1F5AF6, #1A4DD6)', boxShadow: '0 4px 12px rgba(31,90,246,0.35)' }}>Unirse</button>
            </form>
          </div>
        </div>
      </div>

      {/* Links */}
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-5">
          <div className="col-span-2 md:col-span-1">
            <Link href={base} className="flex items-center gap-2">
              <span style={{ fontSize: '20px', fontWeight: 800, fontStyle: 'italic', color: '#1F5AF6', textShadow: '0 0 20px rgba(31,90,246,0.5)' }}>EQ</span>
              <span style={{ fontWeight: 700, color: '#fff' }}>EQUASTORE</span>
            </Link>
            <p style={{ marginTop: '12px', fontSize: '12px', color: '#64748b' }}>El destino fitness #1 de LATAM desde 2019.</p>
          </div>
          <FooterCol base={base} title="Tienda" links={[['Todos los productos','/productos'],['Proteína','/categorias/proteina'],['Pre-entreno','/categorias/pre-entreno'],['Creatina','/categorias/creatina'],['Ofertas','/ofertas']]} />
          <FooterCol base={base} title="Soporte" links={[['Centro de ayuda','/ayuda'],['Envíos','/envios'],['Devoluciones','/devoluciones'],['WhatsApp','/whatsapp']]} />
          <FooterCol base={base} title="Empresa" links={[['Sobre nosotros','/sobre'],['Blog','/blog'],['Comunidad','/comunidad'],['App UNBROKEN','/app']]} />
          <FooterCol base={base} title="Legal" links={[['Privacidad','/privacidad'],['Términos','/terminos'],['Cookies','/cookies']]} />
        </div>

        <div style={{ marginTop: '32px', paddingTop: '16px', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
          <p style={{ fontSize: '10px', lineHeight: 1.6, color: '#475569' }}>*These statements have not been evaluated by the Food and Drug Administration. This product is not intended to diagnose, treat, cure, or prevent any disease.</p>
        </div>
        <div style={{ marginTop: '16px', paddingTop: '16px', borderTop: '1px solid rgba(255,255,255,0.08)', display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '8px' }}>
          <p style={{ fontSize: '11px', color: '#475569' }}>© 2019-2026 Equastore · AliceLabs LLC. Todos los derechos reservados.</p>
          <div style={{ display: 'flex', gap: '6px', fontSize: '10px', color: '#475569' }}>
            <span>Pagos:</span>
            {['VISA','MC','AMEX','PSE','OXXO','SPEI','BTC'].map(m => <span key={m} style={{ borderRadius: '4px', border: '1px solid rgba(255,255,255,0.1)', padding: '2px 6px' }}>{m}</span>)}
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ base, title, links }: { base: string; title: string; links: [string, string][] }) {
  return (
    <div>
      <h3 style={{ fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', color: '#fff' }}>{title}</h3>
      <ul style={{ marginTop: '12px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {links.map(([label, href]) => (
          <li key={label}>
            <Link href={`${base}${href}`} style={{ fontSize: '12px', color: '#94a3b8' }} className="hover:text-[#1F5AF6]">{label}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
