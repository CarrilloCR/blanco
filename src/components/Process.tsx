"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { MessageSquare, FileText, Truck, CheckCircle2, ArrowRight } from "lucide-react";
import SplitText from "./SplitText";
import SpotlightCard from "./SpotlightCard";
import SectionFx from "./SectionFx";

const STEPS = [
  {
    n: "01",
    icon: MessageSquare,
    title: "Envíenos su operación",
    body: "Por WhatsApp o correo: puntos de recogida, destino, fecha, cantidad de pasajeros y vehículos requeridos.",
    spot: "rgba(244, 185, 66, 0.22)" as const,
    accent: "text-sol",
    bg: "bg-sol/10",
    border: "border-sol/30",
  },
  {
    n: "02",
    icon: FileText,
    title: "Cotización mayorista",
    body: "Tarifa fija por unidad o por bloque de servicios. Condiciones para operadores recurrentes y cuentas empresa.",
    spot: "rgba(76, 175, 122, 0.22)" as const,
    accent: "text-selva-300",
    bg: "bg-selva-500/10",
    border: "border-selva-500/30",
  },
  {
    n: "03",
    icon: Truck,
    title: "Confirmación de vehículos",
    body: "Asignamos vehículos y conductores. Recibe placas, datos de cada chofer y horarios exactos por punto.",
    spot: "rgba(212, 165, 116, 0.22)" as const,
    accent: "text-arena",
    bg: "bg-arena/10",
    border: "border-arena/30",
  },
  {
    n: "04",
    icon: CheckCircle2,
    title: "Operación coordinada",
    body: "Conductor en contacto con su coordinador. Reporte de recogida y entrega de cada grupo al cierre del servicio.",
    spot: "rgba(220, 90, 110, 0.22)" as const,
    accent: "text-hibisco-400",
    bg: "bg-hibisco/10",
    border: "border-hibisco/30",
  },
];

export default function Process() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="section-cv relative py-20 sm:py-24 lg:py-32 overflow-hidden">
      <SectionFx variant="process" opacity={0.2} />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="mb-12 sm:mb-16 max-w-3xl"
        >
          <div className="inline-flex items-center gap-2 text-xs font-mono tracking-[0.3em] text-arena mb-4">
            <span className="w-8 h-px bg-arena" />
            CÓMO OPERAMOS · PARA EMPRESAS Y ORGANIZADORES
          </div>
          <h2 className="font-display text-4xl sm:text-5xl md:text-6xl leading-[0.98] tracking-tight">
            <SplitText text="Coordinar" tag="span" className="block" delay={40} duration={0.8} ease="power3.out" splitType="chars" from={{ opacity: 0, y: 40 }} to={{ opacity: 1, y: 0 }} />
            <SplitText text="su operación." tag="span" className="block italic gradient-text" delay={40} duration={0.8} ease="power3.out" splitType="chars" from={{ opacity: 0, y: 40 }} to={{ opacity: 1, y: 0 }} />
          </h2>
          <p className="mt-5 text-marfil/70 max-w-2xl leading-relaxed">
            Trans Blanco trabaja con operadores turísticos, DMC, agencias, hoteles y empresas que necesitan mover personas con horarios fijos y reporte claro. Así integramos su operación en cuatro pasos.
          </p>
        </motion.div>

        {/* Timeline: 4 always-visible steps with connector */}
        <div className="relative">
          {/* Horizontal connector (lg+) */}
          <div className="hidden lg:block absolute top-7 left-[12.5%] right-[12.5%] h-px pointer-events-none">
            <motion.div
              initial={{ scaleX: 0 }}
              animate={inView ? { scaleX: 1 } : {}}
              transition={{ duration: 1.4, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
              style={{ originX: 0 }}
              className="h-full bg-gradient-to-r from-sol/60 via-selva-400/60 to-hibisco/60"
            />
          </div>
          {/* Vertical connector (mobile/tablet) */}
          <div className="lg:hidden absolute top-0 bottom-0 left-7 w-px pointer-events-none">
            <motion.div
              initial={{ scaleY: 0 }}
              animate={inView ? { scaleY: 1 } : {}}
              transition={{ duration: 1.4, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
              style={{ originY: 0 }}
              className="w-full h-full bg-gradient-to-b from-sol/60 via-selva-400/60 to-hibisco/60"
            />
          </div>

          <div className="grid lg:grid-cols-4 gap-6 lg:gap-5">
            {STEPS.map((s, i) => (
              <motion.div
                key={s.n}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.2 + i * 0.12, ease: [0.22, 1, 0.36, 1] }}
                className="relative flex lg:block items-start gap-5"
              >
                {/* Step number node */}
                <motion.div
                  initial={{ scale: 0 }}
                  animate={inView ? { scale: 1 } : {}}
                  transition={{ type: "spring", stiffness: 220, damping: 18, delay: 0.35 + i * 0.12 }}
                  className={`shrink-0 relative z-10 w-14 h-14 rounded-full grid place-items-center font-display text-lg ${s.bg} ${s.accent} border-2 ${s.border} backdrop-blur-sm bg-volcan/60`}
                >
                  {s.n}
                  {/* pulsing ring */}
                  <span className={`absolute inset-0 rounded-full border ${s.border} animate-ping opacity-30`} />
                </motion.div>

                <div className="flex-1 lg:mt-5">
                  <SpotlightCard
                    spotlightColor={s.spot}
                    className="group !p-0 !bg-marfil/[0.025] !border-marfil/10 hover:!border-marfil/25 transition-colors h-full"
                  >
                    <div className="p-6">
                      <div className="flex items-center gap-2 mb-3">
                        <div className={`w-9 h-9 rounded-lg grid place-items-center ${s.bg} ${s.accent} border ${s.border}`}>
                          <s.icon className="w-4 h-4" />
                        </div>
                        {i < STEPS.length - 1 && (
                          <ArrowRight className="hidden lg:block w-4 h-4 text-marfil/30 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
                        )}
                      </div>
                      <h3 className="font-display text-xl text-marfil mb-2 leading-tight">
                        {s.title}
                      </h3>
                      <p className="text-marfil/65 text-sm leading-relaxed">
                        {s.body}
                      </p>
                    </div>
                  </SpotlightCard>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
