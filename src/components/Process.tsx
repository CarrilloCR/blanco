"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Stepper, { Step } from "./Stepper";

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
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
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

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="glass rounded-3xl p-2 sm:p-4"
        >
          <Stepper
            initialStep={1}
            backButtonText="Anterior"
            nextButtonText="Siguiente"
            stepCircleContainerClassName="!bg-transparent !border-0"
            contentClassName="!px-6 sm:!px-10 !py-10"
          >
            {STEPS.map((s) => (
              <Step key={s.n}>
                <div className="text-center space-y-5">
                  <div className="w-20 h-20 mx-auto rounded-full glass-strong grid place-items-center">
                    <span className="font-display text-2xl gradient-text">{s.n}</span>
                  </div>
                  <h3 className="font-display text-3xl text-marfil">{s.title}</h3>
                  <p className="text-marfil/60 leading-relaxed max-w-md mx-auto">
                    {s.body}
                  </p>
                </div>
              </Step>
            ))}
          </Stepper>
        </motion.div>
      </div>
    </section>
  );
}
