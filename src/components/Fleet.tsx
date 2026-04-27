"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Users, Snowflake, Wifi, ShieldCheck, Music2, Luggage } from "lucide-react";
import SmartImage from "./SmartImage";
import FloatingShapes from "./FloatingShapes";

type Vehicle = {
  name: string;
  model: string;
  capacity: string;
  image: string;
  features: { icon: React.ElementType; label: string }[];
  spec: { label: string; value: string }[];
};

const FLEET: Vehicle[] = [
  {
    name: "Hyundai H1",
    model: "Microbús Premium",
    capacity: "Hasta 9 pasajeros",
    image: "https://picsum.photos/seed/microbus-h1/1400/900",
    features: [
      { icon: Snowflake, label: "Aire acondicionado" },
      { icon: Wifi,      label: "Wi-Fi 4G" },
      { icon: Luggage,   label: "Maletero XL" },
      { icon: Music2,    label: "Audio premium" },
    ],
    spec: [
      { label: "Año",        value: "2023" },
      { label: "Combustible", value: "Diésel" },
      { label: "Asientos",   value: "1+8" },
    ],
  },
  {
    name: "Toyota Hiace",
    model: "Microbús Estándar",
    capacity: "Hasta 13 pasajeros",
    image: "https://picsum.photos/seed/hiace-van/1400/900",
    features: [
      { icon: Snowflake,   label: "Aire acondicionado" },
      { icon: ShieldCheck, label: "Cinturones 3 puntos" },
      { icon: Luggage,     label: "Compartimento equipaje" },
      { icon: Users,       label: "Asientos reclinables" },
    ],
    spec: [
      { label: "Año",        value: "2022" },
      { label: "Combustible", value: "Diésel" },
      { label: "Asientos",   value: "1+12" },
    ],
  },
  {
    name: "Mercedes Sprinter",
    model: "Van Ejecutiva",
    capacity: "Hasta 19 pasajeros",
    image: "https://picsum.photos/seed/sprinter-executive/1400/900",
    features: [
      { icon: Snowflake,   label: "Climatización dual" },
      { icon: Wifi,        label: "Wi-Fi" },
      { icon: ShieldCheck, label: "Pantallas individuales" },
      { icon: Luggage,     label: "Cabina de equipaje" },
    ],
    spec: [
      { label: "Año",        value: "2024" },
      { label: "Combustible", value: "Diésel Euro 6" },
      { label: "Asientos",   value: "1+18" },
    ],
  },
];

export default function Fleet() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [active, setActive] = useState(0);
  const v = FLEET[active];

  return (
    <section id="flota" ref={ref} className="relative py-32 overflow-hidden">
      <FloatingShapes variant="fleet" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="mb-14"
        >
          <div className="inline-flex items-center gap-2 text-xs font-mono tracking-[0.3em] text-arena mb-4">
            <span className="w-8 h-px bg-arena" />
            FLOTA · 04
          </div>
          <h2 className="font-display text-5xl sm:text-6xl lg:text-7xl leading-[0.98] tracking-tight max-w-3xl">
            Vehículos preparados
            <span className="italic block gradient-emerald"> para operar.</span>
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Vehicle list */}
          <div className="lg:col-span-4 space-y-3">
            {FLEET.map((f, i) => (
              <motion.button
                key={f.name}
                onClick={() => setActive(i)}
                data-cursor="link"
                initial={{ opacity: 0, x: -20 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.1 + i * 0.08 }}
                className={`w-full text-left rounded-2xl p-5 transition-all duration-300 border ${
                  active === i
                    ? "bg-marfil/[0.06] border-sol/40"
                    : "bg-marfil/[0.02] border-marfil/5 hover:border-marfil/20"
                }`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-mono text-xs text-marfil/40 mb-1">/ 0{i + 1}</div>
                    <div className="font-display text-xl text-marfil">{f.name}</div>
                    <div className="text-xs text-marfil/50 mt-0.5">{f.model}</div>
                  </div>
                  <div className={`w-2 h-10 rounded-full transition-all ${active === i ? "bg-sol" : "bg-marfil/10"}`} />
                </div>
              </motion.button>
            ))}

            <motion.div
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="glass rounded-2xl p-4 text-sm text-marfil/60"
            >
              <div className="text-[10px] font-mono tracking-widest text-sol mb-2">FLOTA AMPLIABLE</div>
              Coordinamos vehículos adicionales con socios certificados para grupos grandes o eventos.
            </motion.div>
          </div>

          {/* Vehicle detail */}
          <motion.div
            key={v.name}
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-8 relative glass rounded-3xl overflow-hidden"
          >
            <div className="relative aspect-[16/10] overflow-hidden bg-gradient-to-br from-volcan to-selva-800">
              <SmartImage
                src={v.image}
                alt={v.name}
                variant="vehicle"
                caption={v.name}
                className="absolute inset-0 w-full h-full"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-volcan via-volcan/20 to-transparent" />
              <div className="absolute top-4 left-4 px-3 py-1.5 rounded-full glass-strong text-xs font-mono tracking-widest text-sol">
                {v.capacity}
              </div>
            </div>

            <div className="p-6 sm:p-8 space-y-6">
              <div>
                <h3 className="font-display text-3xl text-marfil">{v.name}</h3>
                <p className="text-marfil/50 mt-1">{v.model}</p>
              </div>
              <div className="grid grid-cols-3 gap-4 pb-6 border-b border-marfil/10">
                {v.spec.map((s) => (
                  <div key={s.label}>
                    <div className="text-[10px] font-mono tracking-widest text-marfil/40">{s.label.toUpperCase()}</div>
                    <div className="font-display text-lg text-marfil mt-1">{s.value}</div>
                  </div>
                ))}
              </div>
              <div>
                <div className="text-[10px] font-mono tracking-widest text-marfil/40 mb-3">EQUIPAMIENTO</div>
                <div className="grid grid-cols-2 gap-2.5">
                  {v.features.map((f) => (
                    <div key={f.label} className="flex items-center gap-3 text-sm text-marfil/80">
                      <div className="w-8 h-8 rounded-lg bg-sol/10 grid place-items-center text-sol shrink-0">
                        <f.icon className="w-4 h-4" />
                      </div>
                      {f.label}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
