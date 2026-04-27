"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const PHRASES = [
  "Sin contrato mínimo",
  "Factura electrónica",
  "Cobertura nacional",
  "Conductor certificado",
  "Disponibilidad 24/7",
  "SLA puntualidad",
];

export default function Marquee() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const x1 = useTransform(scrollYProgress, [0, 1], ["0%", "-30%"]);
  const x2 = useTransform(scrollYProgress, [0, 1], ["-30%", "0%"]);

  return (
    <section ref={ref} className="relative py-20 overflow-hidden">
      <div className="divider-leaf mb-10" />
      <motion.div style={{ x: x1 }} className="flex gap-12 whitespace-nowrap mb-3">
        {[...PHRASES, ...PHRASES, ...PHRASES].map((p, i) => (
          <span key={i} className="font-display text-7xl sm:text-9xl leading-none italic text-marfil/[0.06]">
            {p} ✦
          </span>
        ))}
      </motion.div>
      <motion.div style={{ x: x2 }} className="flex gap-12 whitespace-nowrap">
        {[...PHRASES, ...PHRASES, ...PHRASES].reverse().map((p, i) => (
          <span key={i} className="font-display text-7xl sm:text-9xl leading-none text-sol/[0.08]">
            {p} ✦
          </span>
        ))}
      </motion.div>
      <div className="divider-leaf mt-10" />
    </section>
  );
}
