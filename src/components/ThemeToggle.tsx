"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const PALETTE_DARK = {
  label: "Oscuro",
  swatches: ["#0A1614", "#1B5E45", "#F4B942", "#DC2626", "#F8F5EE"],
};
const PALETTE_TROPICAL = {
  label: "Tropical",
  swatches: ["#FCFFFA", "#16A34A", "#EAB308", "#B91C1C", "#0A1614"],
};

export default function ThemeToggle() {
  const [tropical, setTropical] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle("theme-tropical", tropical);
  }, [tropical]);

  const current = tropical ? PALETTE_TROPICAL : PALETTE_DARK;
  const other = tropical ? PALETTE_DARK : PALETTE_TROPICAL;

  return (
    <div className="fixed bottom-24 right-5 z-50 flex flex-col items-end gap-2">
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="glass-strong rounded-2xl p-4 min-w-[180px] shadow-xl"
          >
            <p className="text-[10px] font-mono tracking-widest text-marfil/40 mb-3">
              PALETA DE COLOR
            </p>

            {/* Current */}
            <div className="flex items-center gap-2 mb-2">
              <div className="flex -space-x-1">
                {current.swatches.map((c) => (
                  <div key={c} className="w-5 h-5 rounded-full border border-marfil/20" style={{ background: c }} />
                ))}
              </div>
              <span className="text-xs text-marfil font-medium">{current.label}</span>
              <span className="ml-auto text-[10px] text-sol font-mono">ACTIVO</span>
            </div>

            {/* Switch */}
            <button
              onClick={() => { setTropical((t) => !t); setOpen(false); }}
              className="w-full flex items-center gap-2 px-3 py-2 rounded-xl hover:bg-marfil/5 transition-colors mt-1 border border-marfil/10"
            >
              <div className="flex -space-x-1">
                {other.swatches.map((c) => (
                  <div key={c} className="w-5 h-5 rounded-full border border-marfil/20" style={{ background: c }} />
                ))}
              </div>
              <span className="text-xs text-marfil/80">{other.label}</span>
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toggle button */}
      <motion.button
        onClick={() => setOpen((v) => !v)}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.94 }}
        data-cursor="link"
        className="w-12 h-12 rounded-full glass-strong shadow-lg flex items-center justify-center relative overflow-hidden"
        aria-label="Cambiar paleta de colores"
        title="Cambiar tema"
      >
        <motion.div
          key={tropical ? "tropical" : "dark"}
          initial={{ scale: 0, rotate: -90 }}
          animate={{ scale: 1, rotate: 0 }}
          exit={{ scale: 0, rotate: 90 }}
          transition={{ duration: 0.3, type: "spring", stiffness: 260 }}
          className="text-xl leading-none select-none"
        >
          {tropical ? "🌿" : "🌺"}
        </motion.div>
      </motion.button>
    </div>
  );
}
