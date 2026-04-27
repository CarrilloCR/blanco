"use client";

import { motion } from "framer-motion";
import { useEffect } from "react";
import { RefreshCw, Home, AlertTriangle } from "lucide-react";
import Link from "next/link";
import { LogoMark } from "@/components/LogoMark";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("[Trans Blanco · runtime error]", error);
  }, [error]);

  return (
    <main className="relative min-h-screen overflow-hidden grid place-items-center px-4">
      <div className="absolute inset-0 bg-grid bg-grid-fade opacity-30" />
      <div className="absolute inset-0 noise-overlay pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 max-w-xl w-full text-center glass rounded-3xl p-8 sm:p-12"
      >
        <div className="mx-auto mb-6 w-16 h-16 rounded-2xl bg-hibisco/15 grid place-items-center text-hibisco-400 border border-hibisco/30">
          <AlertTriangle className="w-7 h-7" />
        </div>

        <div className="font-mono text-xs tracking-[0.4em] text-hibisco-400 mb-3">
          ERROR INESPERADO
        </div>
        <h1 className="font-display text-4xl sm:text-5xl leading-tight text-marfil mb-4">
          Algo se nos
          <span className="italic"> atravesó.</span>
        </h1>
        <p className="text-marfil/70 leading-relaxed mb-2">
          Tuvimos un inconveniente cargando esta sección. Ya nuestro equipo lo
          sabe.
        </p>
        {error?.digest && (
          <p className="text-xs text-marfil/30 font-mono mb-8">
            ref: {error.digest}
          </p>
        )}

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-6">
          <button
            onClick={reset}
            data-cursor="link"
            className="btn-primary shine"
          >
            <RefreshCw className="w-4 h-4" />
            Reintentar
          </button>
          <Link href="/" data-cursor="link" className="btn-ghost">
            <Home className="w-4 h-4" />
            Ir al inicio
          </Link>
        </div>

        <div className="mt-10">
          <LogoMark size={36} className="mx-auto opacity-40" />
        </div>
      </motion.div>
    </main>
  );
}
