"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Plane, Building2, Users, Calendar, RouteIcon, Clock, ArrowUpRight } from "lucide-react";
import { whatsappLink } from "@/lib/utils";
import FloatingShapes from "./FloatingShapes";

const SERVICES = [
  {
    icon: Plane,
    code: "01",
    title: "Transfers aeropuerto",
    desc: "Vuelo monitoreado en tiempo real. Nuestro conductor espera aunque haya retraso. Cartel, agua fría y Wi-Fi incluidos.",
    points: ["SJO y LIR", "Vuelo monitoreado", "Conductor bilingüe", "Hasta 13 pax"],
    color: "sol",
  },
  {
    icon: Building2,
    code: "02",
    title: "Corporativo y ejecutivo",
    desc: "Movilidad continua para equipos, ejecutivos y delegaciones con facturación electrónica y reporte de servicio.",
    points: ["Cuenta empresa", "Factura electrónica", "SLA puntualidad", "Reporte mensual"],
    color: "selva",
  },
  {
    icon: Users,
    code: "03",
    title: "Operadores turísticos",
    desc: "Ponemos el vehículo y el conductor. Usted diseña la experiencia. Tarifas mayoristas para operaciones regulares.",
    points: ["Tarifas mayoristas", "Sin tour mínimo", "Cobertura nacional", "Disponibilidad 24/7"],
    color: "arena",
  },
  {
    icon: Calendar,
    code: "04",
    title: "Eventos y bodas",
    desc: "Logística de invitados coordinada: punto de encuentro, horarios exactos y conductor designado por evento.",
    points: ["Coordinador incluido", "Multi-vehículo", "Decoración opcional", "Confirmación previa"],
    color: "hibisco",
  },
  {
    icon: RouteIcon,
    code: "05",
    title: "Rutas contratadas",
    desc: "Acuerdos de servicio para traslados recurrentes: hotel-aeropuerto, oficina-sucursal o rutas de empleados.",
    points: ["Tarifa mensual fija", "Horario acordado", "Prioridad de flota", "Reporte de ruta"],
    color: "selva",
  },
  {
    icon: Clock,
    code: "06",
    title: "Servicio por horas",
    desc: "Vehículo y conductor a su disposición por bloques de tiempo. Ideal para diligencias múltiples o esperas largas.",
    points: ["Mínimo 4 horas", "Espera incluida", "Rutas flexibles", "Sin costo adicional"],
    color: "sol",
  },
];

const colorMap: Record<string, { bg: string; text: string; border: string }> = {
  sol:     { bg: "bg-sol/10",          text: "text-sol",         border: "border-sol/30" },
  selva:   { bg: "bg-selva-500/10",    text: "text-selva-300",   border: "border-selva-500/30" },
  arena:   { bg: "bg-arena/10",        text: "text-arena",       border: "border-arena/30" },
  hibisco: { bg: "bg-hibisco/10",      text: "text-hibisco-400", border: "border-hibisco/30" },
};

export default function Services() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <section id="servicios" ref={ref} className="relative py-32 overflow-hidden">
      <FloatingShapes variant="services" />
      <div className="absolute top-1/2 -translate-y-1/2 inset-x-0 h-px bg-gradient-to-r from-transparent via-sol/20 to-transparent" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-16"
        >
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-mono tracking-[0.3em] text-arena mb-4">
              <span className="w-8 h-px bg-arena" />
              SERVICIOS · 03
            </div>
            <h2 className="font-display text-5xl sm:text-6xl lg:text-7xl leading-[0.98] tracking-tight max-w-3xl">
              Transporte
              <span className="italic gradient-text"> a la medida</span>
              <br />
              de su operación.
            </h2>
          </div>
          <p className="text-marfil/60 max-w-md leading-relaxed">
            No vendemos tours ni paquetes. Ofrecemos capacidad de transporte
            profesional para quienes organizan el traslado de personas.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {SERVICES.map((s, i) => {
            const c = colorMap[s.color];
            return (
              <motion.a
                key={s.code}
                href={whatsappLink(`Hola, quiero información sobre el servicio: ${s.title}.`)}
                target="_blank"
                rel="noreferrer"
                data-cursor="link"
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.1 + i * 0.06 }}
                onMouseEnter={() => setHovered(i)}
                onMouseLeave={() => setHovered(null)}
                whileHover={{ y: -6 }}
                className="group relative glass rounded-3xl p-7 overflow-hidden block"
              >
                <div
                  className={`absolute -top-1/2 -right-1/2 w-full h-full rounded-full blur-3xl transition-opacity duration-500 ${c.bg} ${
                    hovered === i ? "opacity-100" : "opacity-0"
                  }`}
                />
                <div className="relative">
                  <div className="flex items-start justify-between mb-5">
                    <div className={`w-12 h-12 rounded-xl grid place-items-center ${c.bg} ${c.text} border ${c.border}`}>
                      <s.icon className="w-5 h-5" />
                    </div>
                    <span className="font-mono text-xs text-marfil/30">/ {s.code}</span>
                  </div>
                  <h3 className="font-display text-2xl text-marfil mb-2">{s.title}</h3>
                  <p className="text-marfil/60 text-sm leading-relaxed mb-5">{s.desc}</p>
                  <ul className="space-y-1.5 mb-5">
                    {s.points.map((p) => (
                      <li key={p} className="text-xs text-marfil/50 font-mono flex items-center gap-2">
                        <span className={`w-1 h-1 rounded-full ${c.text} bg-current`} />
                        {p}
                      </li>
                    ))}
                  </ul>
                  <div className={`inline-flex items-center gap-1 text-sm font-medium ${c.text} group-hover:gap-2 transition-all`}>
                    Solicitar servicio
                    <ArrowUpRight className="w-4 h-4" />
                  </div>
                </div>
              </motion.a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
