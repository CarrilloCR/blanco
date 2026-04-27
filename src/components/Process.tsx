"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const STEPS = [
  {
    n: "01",
    title: "Cuéntenos su viaje",
    body: "Por WhatsApp, llamada o formulario. Origen, destino, fecha y cantidad de viajeros.",
  },
  {
    n: "02",
    title: "Cotizamos al instante",
    body: "Le enviamos una tarifa fija, sin sorpresas, con el vehículo asignado.",
  },
  {
    n: "03",
    title: "Confirmamos la reserva",
    body: "Reciba los datos del conductor, placa del vehículo y horario exacto de recogida.",
  },
  {
    n: "04",
    title: "Disfrute el viaje",
    body: "Lo recogemos a la hora pactada. Solo relájese, nosotros nos encargamos.",
  },
];

export default function Process() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="relative py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="mb-16 max-w-3xl"
        >
          <div className="inline-flex items-center gap-2 text-xs font-mono tracking-[0.3em] text-arena mb-4">
            <span className="w-8 h-px bg-arena" />
            CÓMO FUNCIONA
          </div>
          <h2 className="font-display text-5xl sm:text-6xl leading-[0.98] tracking-tight">
            Reservar es
            <span className="italic gradient-text"> simple.</span>
          </h2>
        </motion.div>

        <div className="relative">
          {/* Connecting line */}
          <div className="hidden lg:block absolute top-12 left-12 right-12 h-px bg-gradient-to-r from-transparent via-sol/30 to-transparent" />

          <div className="grid lg:grid-cols-4 gap-6 lg:gap-4">
            {STEPS.map((s, i) => (
              <motion.div
                key={s.n}
                initial={{ opacity: 0, y: 24 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.1 + i * 0.12 }}
                className="relative"
              >
                <div className="relative z-10 w-24 h-24 mx-auto rounded-full glass-strong grid place-items-center mb-5">
                  <span className="font-display text-3xl gradient-text">
                    {s.n}
                  </span>
                </div>
                <h3 className="font-display text-xl text-marfil text-center mb-2">
                  {s.title}
                </h3>
                <p className="text-marfil/60 text-sm text-center leading-relaxed max-w-[240px] mx-auto">
                  {s.body}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
