"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Truck, ShieldCheck, Clock, BarChart3 } from "lucide-react";
import FloatingShapes from "./FloatingShapes";
import ScrollReveal from "./ScrollReveal";
import SplitText from "./SplitText";
import BlurText from "./BlurText";

const PILLARS = [
  {
    icon: Truck,
    title: "Flota siempre disponible",
    body: "Unidades modernas con mantenimiento preventivo. Nunca cancelamos una asignación por falla mecánica.",
  },
  {
    icon: ShieldCheck,
    title: "Conductores certificados",
    body: "Revisión técnica al día y capacitación continua en atención al cliente.",
  },
  {
    icon: Clock,
    title: "Cumplimiento de horarios",
    body: "99.9% de puntualidad real en ruta. Sabemos que su operación depende de que lleguemos a tiempo.",
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
                <SplitText
                  text="El transporte"
                  tag="span"
                  className="block"
                  delay={40}
                  duration={0.8}
                  ease="power3.out"
                  splitType="chars"
                  from={{ opacity: 0, y: 40 }}
                  to={{ opacity: 1, y: 0 }}
                />
                <SplitText
                  text="que coordina"
                  tag="span"
                  className="block italic gradient-emerald"
                  delay={40}
                  duration={0.8}
                  ease="power3.out"
                  splitType="chars"
                  from={{ opacity: 0, y: 40 }}
                  to={{ opacity: 1, y: 0 }}
                />
                <SplitText
                  text="con usted."
                  tag="span"
                  className="block"
                  delay={40}
                  duration={0.8}
                  ease="power3.out"
                  splitType="chars"
                  from={{ opacity: 0, y: 40 }}
                  to={{ opacity: 1, y: 0 }}
                />
              </h2>
              <BlurText
                text="Trans Blanco no vende viajes ni tours. Somos el aliado operativo de quienes organizan traslados: agencias, empresas, event planners y coordinadores de logística."
                animateBy="words"
                direction="bottom"
                delay={40}
                className="text-marfil/70 text-lg leading-relaxed max-w-md"
              />

              <div className="pt-2 text-marfil/40 text-xs font-mono tracking-widest">
                TRANS BLANCO · TRANSPORTE PRIVADO C.R.
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
              <ScrollReveal
                baseOpacity={0.1}
                enableBlur
                blurStrength={6}
                textClassName="font-display text-2xl sm:text-3xl leading-snug text-marfil text-balance"
              >
                Proveer transporte confiable y profesional para quienes coordinan traslados. Nuestro trabajo es hacer que el suyo funcione sin fallas.
              </ScrollReveal>
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
            <div className="grid sm:grid-cols-2 gap-4 [perspective:1200px]">
              {PILLARS.map((p, i) => (
                <motion.div
                  key={p.title}
                  initial={{ opacity: 0, y: 32, rotateX: -8 }}
                  animate={inView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
                  transition={{ duration: 0.7, delay: 0.35 + i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                  whileHover={{ y: -8, rotateX: 4, rotateY: -3, scale: 1.02 }}
                  style={{ transformStyle: "preserve-3d" }}
                  className="group relative glass rounded-2xl p-6 overflow-hidden transition-colors duration-500 hover:border-sol/40 cursor-default"
                >
                  {/* Animated gradient sheen on hover */}
                  <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <div className="absolute -top-1/2 -right-1/2 w-full h-full rounded-full bg-sol/15 blur-3xl" />
                  </div>
                  {/* Corner accent */}
                  <div className="pointer-events-none absolute top-0 right-0 w-20 h-20 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <div className="absolute top-3 right-3 w-2 h-2 rounded-full bg-sol animate-pulse" />
                  </div>
                  {/* Icon with rotate + scale */}
                  <motion.div
                    whileHover={{ rotate: -8, scale: 1.1 }}
                    transition={{ type: "spring", stiffness: 300, damping: 18 }}
                    className="relative w-11 h-11 rounded-xl bg-sol/10 grid place-items-center text-sol mb-4 group-hover:bg-sol/25 group-hover:shadow-[0_0_24px_-4px_rgb(244_185_66_/_0.55)] transition-all duration-300 border border-sol/15 group-hover:border-sol/40"
                  >
                    <p.icon className="w-5 h-5" />
                  </motion.div>
                  <h3 className="relative font-display text-lg text-marfil mb-1.5 group-hover:text-sol transition-colors">
                    {p.title}
                  </h3>
                  <p className="relative text-marfil/60 text-sm leading-relaxed">{p.body}</p>
                  {/* Bottom shine line */}
                  <div className="pointer-events-none absolute bottom-0 left-6 right-6 h-px bg-gradient-to-r from-transparent via-sol/60 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
