'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Environment, ContactShadows, RoundedBox } from '@react-three/drei';
import { useRef, Suspense } from 'react';
import type { Mesh } from 'three';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Flame, Star } from 'lucide-react';
import { useCountry } from '@/components/country/country-provider';

// 3D Scene: floating supplement container
function SupplementContainer() {
  const ref = useRef<Mesh>(null);

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = state.clock.elapsedTime * 0.3;
      ref.current.position.y = Math.sin(state.clock.elapsedTime) * 0.1;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.8}>
      {/* Main container body */}
      <RoundedBox ref={ref} args={[1.2, 1.8, 1.2]} radius={0.15} smoothness={4}>
        <meshStandardMaterial
          color="#1F5AF6"
          metalness={0.7}
          roughness={0.2}
          emissive="#1F5AF6"
          emissiveIntensity={0.15}
        />
      </RoundedBox>

      {/* Cap */}
      <mesh position={[0, 1.1, 0]}>
        <cylinderGeometry args={[0.45, 0.45, 0.3, 32]} />
        <meshStandardMaterial color="#FFB800" metalness={0.8} roughness={0.15} />
      </mesh>

      {/* Label area */}
      <mesh position={[0, -0.1, 0.61]}>
        <planeGeometry args={[0.9, 1.2]} />
        <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={0.1} />
      </mesh>
    </Float>
  );
}

function Scene3D() {
  return (
    <>
      <ambientLight intensity={0.4} />
      <spotLight position={[5, 5, 5]} angle={0.3} penumbra={1} intensity={2} color="#1F5AF6" />
      <spotLight position={[-5, 3, -5]} angle={0.4} penumbra={1} intensity={1.5} color="#FFB800" />
      <pointLight position={[0, -3, 2]} intensity={1} color="#3B82F6" />

      <Suspense fallback={null}>
        <SupplementContainer />
        <Environment preset="city" />
      </Suspense>

      <ContactShadows
        position={[0, -1.3, 0]}
        opacity={0.4}
        scale={5}
        blur={2}
        far={4}
        color="#000000"
      />
    </>
  );
}

export function Hero() {
  const { country } = useCountry();
  const base = `/${country.toLowerCase()}`;

  return (
    <section className="relative overflow-hidden bg-[#0a0f1c]">
      <div className="relative h-[600px] overflow-hidden">
        {/* Background gradient layers */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a0f1c] via-[#0a0f1c]/70 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0f1c] via-transparent to-[#0a0f1c]/40" />

        {/* Glow orbs */}
        <div className="pointer-events-none absolute left-1/4 top-1/4 h-72 w-72 rounded-full bg-[#1F5AF6]/20 blur-[120px]" />
        <div className="pointer-events-none absolute right-1/4 bottom-1/4 h-56 w-56 rounded-full bg-[#3B82F6]/15 blur-[100px]" />

        {/* Content + 3D Canvas */}
        <div className="relative mx-auto flex h-full max-w-7xl items-center px-4 sm:px-6 lg:px-8">
          <div className="grid w-full grid-cols-1 gap-8 lg:grid-cols-2 lg:items-center">
            {/* Left: Text content with Framer Motion animations */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              className="max-w-lg text-white"
            >
              {/* Badge */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.6 }}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  borderRadius: '8px',
                  padding: '6px 12px',
                  fontSize: '12px',
                  fontWeight: 700,
                  background: 'linear-gradient(135deg, #DC2626, #B91C1C)',
                  boxShadow: '0 4px 20px rgba(220,38,38,0.5)',
                  marginBottom: '16px',
                }}
              >
                <Flame className="h-3 w-3" />
                BLACK FRIDAY EARLY SALE
              </motion.div>

              {/* Headline */}
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.7 }}
                style={{
                  fontSize: '3.5rem',
                  fontWeight: 800,
                  lineHeight: 0.95,
                  textShadow: '0 4px 30px rgba(0,0,0,0.6)',
                }}
              >
                B2G1 FREE
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.6 }}
                style={{
                  marginTop: '12px',
                  fontSize: '1.25rem',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  color: '#1F5AF6',
                  textShadow: '0 2px 20px rgba(31,90,246,0.6)',
                }}
              >
                Hasta 40% OFF en Signature
              </motion.p>

              {/* CTA */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.6 }}
              >
                <Link
                  href={`${base}/ofertas`}
                  style={{
                    display: 'inline-flex',
                    height: '48px',
                    alignItems: 'center',
                    borderRadius: '8px',
                    padding: '0 32px',
                    fontSize: '14px',
                    fontWeight: 700,
                    color: '#fff',
                    background: 'linear-gradient(135deg, #1F5AF6, #1A4DD6)',
                    boxShadow: '0 8px 30px rgba(31,90,246,0.5)',
                    marginTop: '24px',
                    textDecoration: 'none',
                  }}
                >
                  COMPRAR AHORA
                </Link>
              </motion.div>

              {/* Trust */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7, duration: 0.5 }}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '12px',
                  borderRadius: '999px',
                  padding: '8px 16px',
                  fontSize: '12px',
                  fontWeight: 500,
                  color: 'rgba(255,255,255,0.9)',
                  background: 'rgba(255,255,255,0.05)',
                  backdropFilter: 'blur(12px)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  marginTop: '24px',
                }}
              >
                <span className="flex items-center gap-1">
                  <Star className="h-3.5 w-3.5" style={{ fill: '#FFB800', color: '#FFB800' }} />
                  4.9/5 · 10K+
                </span>
                <span style={{ color: 'rgba(255,255,255,0.3)' }}>|</span>
                <span>Envío +$25</span>
                <span style={{ color: 'rgba(255,255,255,0.3)' }}>|</span>
                <span>ISO</span>
              </motion.div>
            </motion.div>

            {/* Right: 3D Canvas */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, duration: 1, ease: 'easeOut' }}
              className="relative h-[400px] lg:h-[500px]"
            >
              <Canvas
                camera={{ position: [0, 0, 5], fov: 45 }}
                style={{ background: 'transparent' }}
                dpr={[1, 2]}
              >
                <Scene3D />
              </Canvas>

              {/* Glow behind canvas */}
              <div
                className="pointer-events-none absolute inset-0"
                style={{
                  background: 'radial-gradient(circle at center, rgba(31,90,246,0.15), transparent 60%)',
                  zIndex: -1,
                }}
              />
            </motion.div>
          </div>
        </div>
      </div>

      {/* Promo strip */}
      <div style={{ background: '#14181F', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
        <div className="mx-auto grid max-w-7xl grid-cols-1 sm:grid-cols-3">
          <Link href={`${base}/categorias/peptidos`} className="group flex items-center justify-center gap-2 border-b py-2.5 text-xs font-semibold hover:bg-white/5 sm:border-b-0 sm:border-r sm:last:border-r-0" style={{ borderColor: 'rgba(255,255,255,0.08)' }}>
            <span style={{ borderRadius: '4px', padding: '2px 6px', fontSize: '10px', fontWeight: 700, color: '#000', background: 'linear-gradient(135deg, #FFB800, #E5A700)', boxShadow: '0 2px 8px rgba(255,184,0,0.4)' }}>NEW</span>
            <span className="text-white">Bodybuilding Peptides</span>
            <span className="text-[#1F5AF6] group-hover:text-[#3B82F6]">→</span>
          </Link>
          <Link href={`${base}/rewards`} className="group flex items-center justify-center gap-2 border-b py-2.5 text-xs font-semibold hover:bg-white/5 sm:border-b-0 sm:border-r sm:last:border-r-0" style={{ borderColor: 'rgba(255,255,255,0.08)' }}>
            <span style={{ borderRadius: '4px', padding: '2px 6px', fontSize: '10px', fontWeight: 700, color: '#fff', background: 'linear-gradient(135deg, #1F5AF6, #1A4DD6)', boxShadow: '0 2px 8px rgba(31,90,246,0.4)' }}>5X</span>
            <span className="text-white">Gana 5 puntos por $1</span>
            <span className="text-[#1F5AF6] group-hover:text-[#3B82F6]">→</span>
          </Link>
          <Link href={`${base}/quiz`} className="group flex items-center justify-center gap-2 py-2.5 text-xs font-semibold hover:bg-white/5">
            <span style={{ borderRadius: '4px', padding: '2px 6px', fontSize: '10px', fontWeight: 700, color: '#000', background: 'linear-gradient(135deg, #17C3A3, #0EA271)', boxShadow: '0 2px 8px rgba(23,195,163,0.4)' }}>QUIZ</span>
            <span className="text-white">Encontrá tu stack</span>
            <span className="text-[#1F5AF6] group-hover:text-[#3B82F6]">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
