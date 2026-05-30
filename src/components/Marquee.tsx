"use client";

import ScrollVelocity from "./ScrollVelocity";

const PHRASES_A = "Sin contrato mínimo ✦ Factura electrónica ✦ Cobertura nacional ✦ Conductor certificado ✦ Disponibilidad 24/7 ✦ SLA puntualidad ✦";
const PHRASES_B = "Transfer aeropuerto ✦ Corporativo ✦ Operadores turísticos ✦ Eventos y bodas ✦ Por horas ✦ Rutas contratadas ✦";

export default function Marquee() {
  return (
    <section className="section-cv relative py-12 sm:py-16 lg:py-20 overflow-hidden">
      <div className="divider-leaf mb-10" />
      <ScrollVelocity
        texts={[PHRASES_A, PHRASES_B]}
        velocity={80}
        numCopies={4}
        damping={50}
        stiffness={400}
        className="font-display italic leading-none text-marfil/[0.08]"
        parallaxClassName="py-2"
      />
      <div className="divider-leaf mt-10" />
    </section>
  );
}
