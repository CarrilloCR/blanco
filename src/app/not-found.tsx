"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, MapPin } from "lucide-react";
import { LogoMark } from "@/components/LogoMark";
import Particles from "@/components/Particles";

export default function NotFound() {
  return (
    <main className="relative min-h-screen overflow-hidden grid place-items-center px-4">
      <div className="absolute inset-0 bg-grid bg-grid-fade opacity-50" />
      <Particles density={50} color="#F4B942" speed={0.2} />
      <div className="absolute inset-0 noise-overlay pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 max-w-2xl mx-auto text-center"
      >
        <div className="mx-auto mb-8 w-32 h-32 sm:w-40 sm:h-40">
          <LogoMark size={160} className="w-full h-full" />
        </div>

        <div className="font-mono text-xs tracking-[0.4em] text-arena mb-3">
          ERROR · 404 · RUTA NO ENCONTRADA
        </div>
        <h1 className="font-display text-7xl sm:text-9xl leading-none tracking-tight text-marfil mb-6">
          Pura
          <span className="italic gradient-text"> vacío.</span>
        </h1>
        <p className="text-marfil/70 text-lg max-w-md mx-auto leading-relaxed mb-10">
          Esta ruta no existe en nuestro mapa. Puede que el destino haya
          cambiado de nombre, o que tomara una desviación equivocada.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/"
            data-cursor="link"
            className="btn-primary shine"
          >
            <ArrowLeft className="w-4 h-4" />
            Volver al inicio
          </Link>
          <Link
            href="/#rutas"
            data-cursor="link"
            className="btn-ghost"
          >
            <MapPin className="w-4 h-4 text-sol" />
            Ver mapa de rutas
          </Link>
        </div>
      </motion.div>
    </main>
  );
}
