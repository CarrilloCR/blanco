"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { MapPin, ArrowUpRight, ExternalLink } from "lucide-react";
import { whatsappLink } from "@/lib/utils";

type Province = {
  id: string;
  name: string;
  color: string;
  blurb: string;
  mapEmbed: string;     // Google Maps embed URL
  mapsRoute: string;    // Multi-waypoint Google Maps URL (opens in new tab)
  destinations: string[];
};

// Google Maps embed — centered on each province (no API key required)
// mapsRoute — multi-waypoint directions URL for "Ver en Google Maps" button
const PROVINCES: Province[] = [
  {
    id: "guanacaste",
    name: "Guanacaste",
    color: "#F4B942",
    blurb: "Sol, sabanas y las playas más visitadas del Pacífico Norte. La provincia del verano eterno.",
    mapEmbed: "https://maps.google.com/maps?q=Guanacaste,+Costa+Rica&z=9&output=embed",
    mapsRoute: "https://www.google.com/maps/dir/Tamarindo,+Guanacaste,+Costa+Rica/Liberia,+Guanacaste,+Costa+Rica/Playas+del+Coco,+Guanacaste,+Costa+Rica/Sámara,+Guanacaste,+Costa+Rica/Nosara,+Guanacaste,+Costa+Rica/Rincón+de+la+Vieja,+Guanacaste,+Costa+Rica",
    destinations: ["Tamarindo", "Liberia", "Playas del Coco", "Sámara", "Nosara", "Rincón de la Vieja"],
  },
  {
    id: "alajuela",
    name: "Alajuela",
    color: "#1B5E45",
    blurb: "Volcanes activos, cataratas color celeste y café de altura. Puerta del valle central.",
    mapEmbed: "https://maps.google.com/maps?q=Alajuela,+Costa+Rica&z=9&output=embed",
    mapsRoute: "https://www.google.com/maps/dir/Aeropuerto+Juan+Santamaría,+Alajuela,+Costa+Rica/La+Fortuna,+Alajuela,+Costa+Rica/San+Carlos,+Alajuela,+Costa+Rica/Sarchí,+Alajuela,+Costa+Rica/Zarcero,+Alajuela,+Costa+Rica",
    destinations: ["Aeropuerto SJO", "La Fortuna · Arenal", "San Carlos", "Sarchí", "Zarcero", "Bajos del Toro"],
  },
  {
    id: "heredia",
    name: "Heredia",
    color: "#2D8A60",
    blurb: "Ciudad de las flores, café orgánico y selva primaria del Braulio Carrillo.",
    mapEmbed: "https://maps.google.com/maps?q=Heredia,+Costa+Rica&z=10&output=embed",
    mapsRoute: "https://www.google.com/maps/dir/Heredia,+Costa+Rica/Sarapiquí,+Heredia,+Costa+Rica/Barva,+Heredia,+Costa+Rica/Braulio+Carrillo,+Heredia,+Costa+Rica",
    destinations: ["Heredia centro", "Sarapiquí", "Barva", "Braulio Carrillo"],
  },
  {
    id: "san-jose",
    name: "San José",
    color: "#DC2626",
    blurb: "Capital, cultura y nodo donde nacen y terminan todas las rutas del país.",
    mapEmbed: "https://maps.google.com/maps?q=San+José,+Costa+Rica&z=11&output=embed",
    mapsRoute: "https://www.google.com/maps/dir/San+José,+Costa+Rica/Escazú,+San+José,+Costa+Rica/Santa+Ana,+San+José,+Costa+Rica/Aeropuerto+SJO,+Alajuela,+Costa+Rica/Cerro+de+la+Muerte,+Costa+Rica",
    destinations: ["San José centro", "Escazú", "Santa Ana", "Aeropuerto SJO", "Cerro de la Muerte"],
  },
  {
    id: "cartago",
    name: "Cartago",
    color: "#B8854D",
    blurb: "Cuna del país, el Volcán Irazú y los valles cafetaleros de Orosi y Turrialba.",
    mapEmbed: "https://maps.google.com/maps?q=Cartago,+Costa+Rica&z=10&output=embed",
    mapsRoute: "https://www.google.com/maps/dir/Cartago,+Costa+Rica/Volcán+Irazú,+Cartago,+Costa+Rica/Turrialba,+Cartago,+Costa+Rica/Orosi,+Cartago,+Costa+Rica/Cachí,+Cartago,+Costa+Rica",
    destinations: ["Cartago centro", "Volcán Irazú", "Turrialba", "Orosi", "Cachí"],
  },
  {
    id: "limon",
    name: "Limón",
    color: "#0F3D2E",
    blurb: "Caribe ticoflame: reggae, cacao, parques nacionales y selva infinita.",
    mapEmbed: "https://maps.google.com/maps?q=Limón,+Costa+Rica&z=9&output=embed",
    mapsRoute: "https://www.google.com/maps/dir/Puerto+Limón,+Limón,+Costa+Rica/Puerto+Viejo,+Limón,+Costa+Rica/Cahuita,+Limón,+Costa+Rica/Tortuguero,+Limón,+Costa+Rica/Manzanillo,+Limón,+Costa+Rica",
    destinations: ["Puerto Limón", "Puerto Viejo", "Cahuita", "Tortuguero", "Manzanillo"],
  },
  {
    id: "puntarenas",
    name: "Puntarenas",
    color: "#D4A574",
    blurb: "Todo el Pacífico Sur: Manuel Antonio, Monteverde, la Osa y Bahía Drake.",
    mapEmbed: "https://maps.google.com/maps?q=Puntarenas,+Costa+Rica&z=8&output=embed",
    mapsRoute: "https://www.google.com/maps/dir/Manuel+Antonio,+Puntarenas,+Costa+Rica/Quepos,+Puntarenas,+Costa+Rica/Jacó,+Puntarenas,+Costa+Rica/Monteverde,+Puntarenas,+Costa+Rica/Uvita,+Puntarenas,+Costa+Rica/Bahía+Drake,+Puntarenas,+Costa+Rica",
    destinations: ["Manuel Antonio", "Quepos", "Jacó", "Monteverde", "Santa Teresa · Mal País", "Uvita", "Bahía Drake"],
  },
];

export default function CostaRicaMap() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [active, setActive] = useState<string>("san-jose");
  const current = PROVINCES.find((p) => p.id === active)!;

  return (
    <section id="rutas" ref={ref} className="relative py-32 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 right-0 w-[40vw] h-[40vw] rounded-full bg-sol/10 blur-3xl opacity-50" />
        <div className="absolute bottom-0 left-0 w-[30vw] h-[30vw] rounded-full bg-selva/10 blur-3xl opacity-40" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="mb-14 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6"
        >
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-mono tracking-[0.3em] text-arena mb-4">
              <span className="w-8 h-px bg-arena" />
              RUTAS · 05
            </div>
            <h2 className="font-display text-5xl sm:text-6xl lg:text-7xl leading-[0.98] tracking-tight max-w-3xl">
              7 provincias.
              <span className="italic block gradient-text">Un solo país.</span>
              Todas las rutas.
            </h2>
          </div>
          <p className="text-marfil/60 max-w-md leading-relaxed">
            Seleccione una provincia para ver los destinos donde operamos.
            Abra Google Maps con la ruta completa de cada zona.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          {/* Province selector pills – mobile/tablet: top row */}
          <div className="lg:col-span-12 flex flex-wrap gap-2 lg:hidden">
            {PROVINCES.map((p) => (
              <button
                key={p.id}
                onClick={() => setActive(p.id)}
                data-cursor="link"
                className={`px-3 py-1.5 rounded-full text-xs transition-all border ${
                  active === p.id
                    ? "bg-sol text-volcan border-sol"
                    : "bg-marfil/5 text-marfil/60 border-marfil/10 hover:border-marfil/30"
                }`}
              >
                {p.name}
              </button>
            ))}
          </div>

          {/* Google Maps iframe */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-7 relative glass rounded-3xl overflow-hidden"
          >
            <div className="relative aspect-[4/3]">
              <iframe
                key={current.id}
                src={current.mapEmbed}
                title={`Mapa de ${current.name}, Costa Rica`}
                className="absolute inset-0 w-full h-full border-0 rounded-3xl"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
              {/* Province badge overlay */}
              <div
                className="absolute top-4 left-4 px-3 py-1.5 rounded-full text-xs font-mono tracking-widest font-semibold text-white shadow-lg"
                style={{ background: current.color }}
              >
                {current.name.toUpperCase()}
              </div>
            </div>
          </motion.div>

          {/* Province detail sidebar */}
          <motion.div
            key={current.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-5 space-y-5"
          >
            <div className="glass rounded-3xl p-7 space-y-5">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full" style={{ background: current.color }} />
                <span className="text-xs font-mono tracking-[0.3em] text-arena">
                  PROVINCIA · {String(PROVINCES.findIndex((p) => p.id === current.id) + 1).padStart(2, "0")}
                </span>
              </div>
              <h3 className="font-display text-4xl text-marfil">{current.name}</h3>
              <p className="text-marfil/60 leading-relaxed">{current.blurb}</p>

              <div className="pt-4 border-t border-marfil/10">
                <div className="text-[10px] font-mono tracking-widest text-marfil/40 mb-3">
                  DESTINOS CUBIERTOS
                </div>
                <div className="flex flex-wrap gap-2">
                  {current.destinations.map((d) => (
                    <span
                      key={d}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs bg-marfil/5 border border-marfil/10 text-marfil/80"
                    >
                      <MapPin className="w-3 h-3 text-sol" />
                      {d}
                    </span>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-1">
                <a
                  href={whatsappLink(`Hola, necesito transporte en ${current.name}.`)}
                  target="_blank"
                  rel="noreferrer"
                  data-cursor="link"
                  className="btn-primary shine !py-3 text-sm"
                >
                  Cotizar
                  <ArrowUpRight className="w-4 h-4" />
                </a>
                <a
                  href={current.mapsRoute}
                  target="_blank"
                  rel="noreferrer"
                  data-cursor="link"
                  className="inline-flex items-center justify-center gap-2 px-4 py-3 rounded-full text-sm border border-marfil/20 text-marfil/90 hover:bg-marfil/5 transition-colors"
                >
                  Ver en Maps
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Province pills – desktop */}
            <div className="hidden lg:flex flex-wrap gap-2">
              {PROVINCES.map((p) => (
                <button
                  key={p.id}
                  onClick={() => setActive(p.id)}
                  data-cursor="link"
                  className={`px-3 py-1.5 rounded-full text-xs transition-all border ${
                    active === p.id
                      ? "bg-sol text-volcan border-sol"
                      : "bg-marfil/5 text-marfil/60 border-marfil/10 hover:border-marfil/30"
                  }`}
                >
                  {p.name}
                </button>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
