"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Quote, Star } from "lucide-react";
import SplitText from "./SplitText";
import SectionFx from "./SectionFx";

const TESTIMONIALS = [
  {
    name: "María José Calderón",
    role: "Viajera frecuente · San José",
    body: "Llevo dos años usando Trans Blanco para los traslados al aeropuerto. Nunca un atraso, nunca una sorpresa. Los recomiendo con los ojos cerrados.",
    rating: 5,
  },
  {
    name: "Carlos Vargas",
    role: "Hotel · Manuel Antonio",
    body: "Cuando un huésped llega después de un vuelo de 8 horas, lo último que quiere es esperar. Trans Blanco siempre está, siempre puntual.",
    rating: 5,
  },
  {
    name: "Sofía Méndez",
    role: "Bodas · Guanacaste",
    body: "Coordinaron 14 invitados desde Liberia hasta el hotel sin un solo problema. Profesionalismo de principio a fin.",
    rating: 5,
  },
  {
    name: "Daniel Rojas",
    role: "Empresa · Heredia",
    body: "Tenemos cuenta empresarial con ellos. Facturación impecable y los conductores se sienten parte del equipo.",
    rating: 5,
  },
];

export default function Testimonials() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="section-cv relative py-20 sm:py-24 lg:py-32 overflow-hidden">
      <SectionFx variant="voces" opacity={0.2} />
      <div className="absolute inset-0 bg-grid bg-grid-fade opacity-30" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-14"
        >
          <div className="inline-flex items-center gap-2 text-xs font-mono tracking-[0.3em] text-arena mb-4">
            <span className="w-8 h-px bg-arena" />
            VOCES · 07
            <span className="w-8 h-px bg-arena" />
          </div>
          <h2 className="font-display text-4xl sm:text-5xl md:text-6xl leading-[0.98] tracking-tight">
            <SplitText text="Lo que dicen" tag="span" className="block" delay={40} duration={0.8} ease="power3.out" splitType="chars" from={{ opacity: 0, y: 40 }} to={{ opacity: 1, y: 0 }} />
            <SplitText text="los que viajan." tag="span" className="block italic gradient-emerald" delay={40} duration={0.8} ease="power3.out" splitType="chars" from={{ opacity: 0, y: 40 }} to={{ opacity: 1, y: 0 }} />
          </h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 gap-5">
          {TESTIMONIALS.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 + i * 0.1 }}
              whileHover={{ y: -4 }}
              className="group glass rounded-2xl sm:rounded-3xl p-5 sm:p-7 relative overflow-hidden"
            >
              <Quote className="absolute -top-2 -right-2 w-24 h-24 text-sol/5 rotate-180" />
              <div className="flex gap-1 mb-4">
                {Array.from({ length: t.rating }).map((_, k) => (
                  <Star key={k} className="w-4 h-4 fill-sol text-sol" />
                ))}
              </div>
              <p className="font-display text-lg sm:text-xl leading-snug text-marfil/90 mb-6">
                {t.body}
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-sol to-arena grid place-items-center font-display text-volcan font-bold">
                  {t.name.charAt(0)}
                </div>
                <div>
                  <div className="text-marfil text-sm font-medium">
                    {t.name}
                  </div>
                  <div className="text-marfil/50 text-xs">{t.role}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
