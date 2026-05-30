"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Plane, Hotel, Users, MapPin, RouteIcon, Clock, ArrowUpRight } from "lucide-react";
import { whatsappLink } from "@/lib/utils";
import FloatingShapes from "./FloatingShapes";
import SectionFx from "./SectionFx";
import SplitText from "./SplitText";
import BlurText from "./BlurText";

const SERVICES = [
  {
    icon: Hotel,
    code: "01",
    title: "Recogida en hoteles",
    desc: "Pasamos por el hotel del pasajero a la hora acordada y lo llevamos al punto de inicio del tour. Ideal para operadores que necesitan concentrar grupos.",
    points: ["Pickup puntual", "Múltiples hoteles", "Conductor bilingüe", "Hasta 13 pax"],
    color: "sol",
  },
  {
    icon: MapPin,
    code: "02",
    title: "Punto de encuentro a destino",
    desc: "Define un punto de encuentro. Recogemos a su grupo y los trasladamos directo al lugar del tour, evento o actividad.",
    points: ["1 o varios puntos", "Ruta directa", "Coordinador en sitio", "Horario fijo"],
    color: "selva",
  },
  {
    icon: Plane,
    code: "03",
    title: "Traslados aeropuerto",
    desc: "Recogida en SJO o LIR y traslado al hotel, tour o destino que el operador indique. Cartel con nombre y conductor bilingüe.",
    points: ["SJO y LIR", "Cartel con nombre", "Conductor bilingüe", "Equipaje incluido"],
    color: "arena",
  },
  {
    icon: Users,
    code: "04",
    title: "Operadores turísticos",
    desc: "Ponemos el vehículo y el conductor para su operación. Usted diseña la experiencia, nosotros movemos a los pasajeros. Tarifas mayoristas.",
    points: ["Tarifas mayoristas", "Sin tour mínimo", "Cobertura nacional", "Disponibilidad 24/7"],
    color: "hibisco",
  },
  {
    icon: RouteIcon,
    code: "05",
    title: "Rutas contratadas",
    desc: "Acuerdos de servicio para traslados recurrentes: hotel-tour diario, ruta de empleados o transporte fijo de operación turística.",
    points: ["Tarifa mensual fija", "Horario acordado", "Prioridad de vehículos", "Reporte de ruta"],
    color: "selva",
  },
  {
    icon: Clock,
    code: "06",
    title: "Servicio por horas",
    desc: "Vehículo y conductor a disposición por bloques de tiempo. Útil cuando el tour tiene paradas múltiples o tiempos de espera largos.",
    points: ["Mínimo 4 horas", "Espera incluida", "Rutas flexibles", "Sin costo adicional"],
    color: "sol",
  },
];

const colorMap: Record<string, { bg: string; text: string; border: string; spot: `rgba(${number}, ${number}, ${number}, ${number})` }> = {
  sol:     { bg: "bg-sol/10",          text: "text-sol",         border: "border-sol/30",         spot: "rgba(244, 185, 66, 0.18)" },
  selva:   { bg: "bg-selva-500/10",    text: "text-selva-300",   border: "border-selva-500/30",   spot: "rgba(76, 175, 122, 0.18)" },
  arena:   { bg: "bg-arena/10",        text: "text-arena",       border: "border-arena/30",       spot: "rgba(212, 165, 116, 0.18)" },
  hibisco: { bg: "bg-hibisco/10",      text: "text-hibisco-400", border: "border-hibisco/30",     spot: "rgba(220, 90, 110, 0.18)" },
};

export default function Services() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [active, setActive] = useState<number>(0);

  return (
    <section id="servicios" ref={ref} className="section-cv relative py-20 sm:py-24 lg:py-32 overflow-hidden">
      <SectionFx variant="servicios" opacity={0.2} />
      <FloatingShapes variant="services" />
      <div className="absolute top-1/2 -translate-y-1/2 inset-x-0 h-px bg-gradient-to-r from-transparent via-sol/20 to-transparent" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-10 sm:mb-14 lg:mb-16"
        >
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-mono tracking-[0.3em] text-arena mb-4">
              <span className="w-8 h-px bg-arena" />
              SERVICIOS · 03
            </div>
            <h2 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-[0.98] tracking-tight max-w-3xl">
              <SplitText
                text="Transporte"
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
                text="a la medida"
                tag="span"
                className="block italic gradient-text"
                delay={40}
                duration={0.8}
                ease="power3.out"
                splitType="chars"
                from={{ opacity: 0, y: 40 }}
                to={{ opacity: 1, y: 0 }}
              />
              <SplitText
                text="de su operación."
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
          </div>
          <BlurText
            text="No organizamos tours, eventos ni bodas. Somos el transporte profesional para operadores turísticos, empresas y personas que diseñan esas experiencias en Costa Rica y necesitan mover pasajeros entre puntos de recogida y destino."
            animateBy="words"
            direction="bottom"
            delay={35}
            className="text-marfil/60 max-w-md leading-relaxed"
          />
        </motion.div>

        <div className="grid lg:grid-cols-12 gap-8 sm:gap-10 lg:gap-16 items-start">
          {/* Left: service list */}
          <div className="lg:col-span-6 space-y-2">
            {SERVICES.map((s, i) => {
              const c = colorMap[s.color];
              const isActive = active === i;
              return (
                <motion.button
                  key={s.code}
                  type="button"
                  onMouseEnter={() => setActive(i)}
                  onFocus={() => setActive(i)}
                  onClick={() => setActive(i)}
                  data-cursor="link"
                  initial={{ opacity: 0, x: -24 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.1 + i * 0.07 }}
                  className={`group w-full text-left rounded-2xl px-4 sm:px-5 py-4 border transition-all duration-300 flex items-start gap-3 sm:gap-4 ${
                    isActive
                      ? `${c.bg} ${c.border} -translate-y-0.5`
                      : "bg-marfil/[0.02] border-marfil/10 hover:border-marfil/25"
                  }`}
                >
                  <div className={`shrink-0 w-10 h-10 sm:w-11 sm:h-11 rounded-xl grid place-items-center ${c.bg} ${c.text} border ${c.border}`}>
                    <s.icon className="w-5 h-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5 flex-wrap">
                      <span className="font-mono text-[10px] text-marfil/30">/ {s.code}</span>
                      <h3 className="font-display text-lg sm:text-xl text-marfil">{s.title}</h3>
                    </div>
                    <p className="text-marfil/55 text-xs sm:text-sm leading-snug line-clamp-2">{s.desc}</p>
                  </div>
                  <ArrowUpRight
                    className={`w-4 h-4 shrink-0 mt-1 transition-all ${
                      isActive ? `${c.text} translate-x-0.5 -translate-y-0.5` : "text-marfil/30"
                    }`}
                  />
                </motion.button>
              );
            })}
          </div>

          {/* Right: controlled stacked cards — CardSwap aesthetic */}
          <div className="lg:col-span-6 relative h-[520px] hidden lg:block [perspective:900px] [transform-style:preserve-3d] lg:sticky lg:top-32">
            {SERVICES.map((s, i) => {
              const c = colorMap[s.color];
              const n = SERVICES.length;
              const offset = (i - active + n) % n;
              const isFront = offset === 0;
              const visible = offset <= 3;
              return (
                <motion.div
                  key={s.code}
                  animate={{
                    x: offset * 38,
                    y: offset * 26,
                    z: offset * -80,
                    skewY: 5,
                    opacity: visible ? 1 - offset * 0.18 : 0,
                  }}
                  transition={{ type: "spring", stiffness: 160, damping: 18, mass: 0.9 }}
                  style={{
                    zIndex: n - offset,
                    pointerEvents: isFront ? "auto" : "none",
                    transformStyle: "preserve-3d",
                    backfaceVisibility: "hidden",
                    willChange: "transform",
                    transformOrigin: "top left",
                  }}
                  className="absolute inset-0"
                >
                  <div
                    className={`relative w-full h-full rounded-3xl border ${
                      isFront ? "border-marfil/20 shadow-2xl shadow-black/40" : "border-marfil/10"
                    } bg-volcan/95 backdrop-blur-xl overflow-hidden p-8 flex flex-col`}
                  >
                    <div className={`absolute -top-24 -right-24 w-64 h-64 rounded-full blur-3xl ${c.bg}`} />
                    <div className="relative flex items-start justify-between mb-6">
                      <div className={`w-14 h-14 rounded-2xl grid place-items-center ${c.bg} ${c.text} border ${c.border}`}>
                        <s.icon className="w-6 h-6" />
                      </div>
                      <span className="font-mono text-xs text-marfil/40">SERVICIO / {s.code}</span>
                    </div>
                    <h3 className="relative font-display text-3xl text-marfil mb-3">{s.title}</h3>
                    <p className="relative text-marfil/70 text-sm leading-relaxed mb-6">{s.desc}</p>
                    <ul className="relative grid grid-cols-2 gap-x-4 gap-y-2 mb-auto">
                      {s.points.map((p) => (
                        <li key={p} className="text-xs text-marfil/60 font-mono flex items-center gap-2">
                          <span className={`w-1.5 h-1.5 rounded-full ${c.text} bg-current`} />
                          {p}
                        </li>
                      ))}
                    </ul>
                    <a
                      href={whatsappLink(`Hola, quiero información sobre el servicio: ${s.title}.`)}
                      target="_blank"
                      rel="noreferrer"
                      data-cursor="link"
                      tabIndex={isFront ? 0 : -1}
                      className={`relative mt-6 inline-flex items-center gap-2 self-start px-4 py-2 rounded-full text-sm font-medium ${c.bg} ${c.text} border ${c.border} hover:gap-3 transition-all`}
                    >
                      Solicitar por WhatsApp
                      <ArrowUpRight className="w-4 h-4" />
                    </a>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
