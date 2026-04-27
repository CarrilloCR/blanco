"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Truck, ShieldCheck, Clock, BarChart3 } from "lucide-react";
import { LogoMark } from "./LogoMark";
import FloatingShapes from "./FloatingShapes";

const PILLARS = [
  {
    icon: Truck,
    title: "Flota siempre disponible",
    body: "Unidades modernas con mantenimiento preventivo. Nunca cancelamos una asignación por falla mecánica.",
  },
  {
    icon: ShieldCheck,
    title: "Conductores certificados",
    body: "Licencia A3 vigente, revisión técnica al día y capacitación continua en atención al cliente.",
  },
  {
    icon: Clock,
    title: "Cumplimiento de horarios",
    body: "99.4% de puntualidad real en ruta. Sabemos que su operación depende de que lleguemos a tiempo.",
  },
  {
    icon: BarChart3,
    title: "Reporte y transparencia",
    body: "Comunicación directa con el coordinador, confirmación de llegada y seguimiento de cada unidad.",
  },
];

export default function About() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="nosotros" ref={ref} className="relative py-32 overflow-hidden">
      <FloatingShapes variant="about" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-20 items-start">
          {/* Left – heading */}
          <div className="lg:col-span-5 lg:sticky lg:top-32">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7 }}
              className="space-y-6"
            >
              <div className="inline-flex items-center gap-2 text-xs font-mono tracking-[0.3em] text-arena">
                <span className="w-8 h-px bg-arena" />
                NOSOTROS · 02
              </div>
              <h2 className="font-display text-5xl sm:text-6xl lg:text-7xl leading-[0.98] tracking-tight">
                El transporte
                <span className="block italic gradient-emerald">que coordina</span>
                <span className="block">con usted.</span>
              </h2>
              <p className="text-marfil/70 text-lg leading-relaxed max-w-md">
                Trans Blanco no vende viajes ni tours. Somos el aliado operativo
                de quienes organizan traslados: agencias, empresas, event
                planners y coordinadores de logística.
              </p>

              <div className="flex items-center gap-3 pt-2">
                <LogoMark size={48} spin />
                <div className="text-marfil/40 text-xs font-mono tracking-widest">
                  TRANS BLANCO · TRANSPORTE PRIVADO C.R.
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right – content */}
          <div className="lg:col-span-7 space-y-10">
            {/* Mission card */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.15 }}
              className="relative glass rounded-3xl p-8 sm:p-10 overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-40 h-40 -mt-20 -mr-20 rounded-full bg-sol/20 blur-2xl" />
              <div className="text-xs font-mono tracking-widest text-sol mb-3">MISIÓN</div>
              <p className="font-display text-2xl sm:text-3xl leading-snug text-marfil text-balance">
                Proveer transporte confiable y profesional para quienes
                coordinan traslados. Nuestro trabajo es hacer que el suyo
                funcione sin fallas.
              </p>
            </motion.div>

            {/* Vision card */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.25 }}
              className="relative glass rounded-3xl p-8 sm:p-10 overflow-hidden border-l-4 border-selva-500"
            >
              <div className="text-xs font-mono tracking-widest text-selva-300 mb-3">VISIÓN</div>
              <p className="font-display text-xl sm:text-2xl leading-snug text-marfil/90">
                Ser el proveedor de transporte privado más confiable de Costa
                Rica: el que las empresas y operadores llaman primero porque
                nunca falla.
              </p>
            </motion.div>

            {/* Pillars grid */}
            <div className="grid sm:grid-cols-2 gap-4">
              {PILLARS.map((p, i) => (
                <motion.div
                  key={p.title}
                  initial={{ opacity: 0, y: 24 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.35 + i * 0.08 }}
                  whileHover={{ y: -4 }}
                  className="group glass rounded-2xl p-6 hover:border-sol/30 transition-colors duration-300"
                >
                  <div className="w-11 h-11 rounded-xl bg-sol/10 grid place-items-center text-sol mb-4 group-hover:bg-sol/20 transition-colors">
                    <p.icon className="w-5 h-5" />
                  </div>
                  <h3 className="font-display text-lg text-marfil mb-1.5">{p.title}</h3>
                  <p className="text-marfil/60 text-sm leading-relaxed">{p.body}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
