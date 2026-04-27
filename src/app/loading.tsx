"use client";

import { motion } from "framer-motion";
import { LogoMark } from "@/components/LogoMark";

export default function Loading() {
  return (
    <div className="fixed inset-0 z-[200] grid place-items-center bg-volcan">
      <div className="text-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        >
          <LogoMark size={80} />
        </motion.div>
        <div className="mt-5 font-mono text-[10px] tracking-[0.4em] text-arena/70">
          CARGANDO · TRANS BLANCO
        </div>
      </div>
    </div>
  );
}
