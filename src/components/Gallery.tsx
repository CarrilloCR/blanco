"use client";

import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";
import { X, ZoomIn } from "lucide-react";
import FloatingShapes from "./FloatingShapes";

type Variant =
  | "volcano" | "beach" | "forest" | "sunset" | "river"
  | "caribbean" | "waterfall" | "coast" | "coffee";

type Photo = {
  src: string;
  alt: string;
  caption: string;
  tag: string;
  variant: Variant;
  ratio: "square" | "tall" | "wide";
};

// Fotos reales · Wikimedia Commons (CC-BY) descargadas a /public/images/gallery
const PHOTOS: Photo[] = [
  { src: "/images/gallery/arenal.jpg",        alt: "Volcán Arenal",          caption: "Volcán Arenal · La Fortuna",    tag: "ALAJUELA",    variant: "volcano",   ratio: "tall" },
  { src: "/images/gallery/manuel-antonio.jpeg", alt: "Playa Manuel Antonio", caption: "Manuel Antonio",                tag: "PUNTARENAS",  variant: "beach",     ratio: "square" },
  { src: "/images/gallery/monteverde.jpg",    alt: "Bosque Nuboso",          caption: "Bosque Nuboso · Monteverde",    tag: "PUNTARENAS",  variant: "forest",    ratio: "wide" },
  { src: "/images/gallery/tamarindo.jpg",     alt: "Playa Tamarindo",        caption: "Atardecer · Tamarindo",         tag: "GUANACASTE",  variant: "sunset",    ratio: "square" },
  { src: "/images/gallery/tortuguero.jpg",    alt: "Canales de Tortuguero",  caption: "Canales de Tortuguero",         tag: "LIMÓN",       variant: "river",     ratio: "tall" },
  { src: "/images/gallery/puerto-viejo.jpg",  alt: "Costa Caribeña",         caption: "Costa Caribeña · Puerto Viejo", tag: "LIMÓN",       variant: "caribbean", ratio: "wide" },
  { src: "/images/gallery/rio-celeste.jpg",   alt: "Río Celeste",            caption: "Río Celeste",                   tag: "ALAJUELA",    variant: "waterfall", ratio: "tall" },
  { src: "/images/gallery/nicoya.jpg",        alt: "Península de Nicoya",    caption: "Península de Nicoya",           tag: "GUANACASTE",  variant: "coast",     ratio: "square" },
  { src: "/images/gallery/tarrazu.jpg",       alt: "Cafetales de Tarrazú",   caption: "Cafetales · Tarrazú",           tag: "SAN JOSÉ",    variant: "coffee",    ratio: "square" },
  { src: "/images/gallery/irazu.jpg",         alt: "Volcán Irazú",           caption: "Volcán Irazú",                  tag: "CARTAGO",     variant: "volcano",   ratio: "wide" },
  { src: "/images/gallery/drake-bay.jpg",     alt: "Bahía Drake · Osa",      caption: "Bahía Drake · Osa",             tag: "PUNTARENAS",  variant: "beach",     ratio: "tall" },
  { src: "/images/gallery/sarapiqui.jpg",     alt: "Selva de Sarapiquí",     caption: "Selva de Sarapiquí · Braulio Carrillo", tag: "HEREDIA", variant: "forest", ratio: "square" },
];

const ratioClass: Record<Photo["ratio"], string> = {
  square: "aspect-square",
  tall:   "aspect-[3/4]",
  wide:   "aspect-[4/3]",
};

export default function Gallery() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [open, setOpen] = useState<Photo | null>(null);

  return (
    <section id="galeria" ref={ref} className="relative py-32">
      <FloatingShapes variant="gallery" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="mb-14 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6"
        >
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-mono tracking-[0.3em] text-arena mb-4">
              <span className="w-8 h-px bg-arena" />
              GALERÍA · 06
            </div>
            <h2 className="font-display text-5xl sm:text-6xl lg:text-7xl leading-[0.98] tracking-tight">
              Destinos que
              <span className="italic gradient-text"> conectamos.</span>
            </h2>
          </div>
          <p className="text-marfil/60 max-w-md">
            Una muestra de los lugares a los que llevamos pasajeros cada semana,
            a lo largo y ancho del país. Toque cualquier imagen para ampliarla.
          </p>
        </motion.div>

        {/* Masonry via CSS columns */}
        <div className="columns-2 md:columns-3 lg:columns-4 gap-3 lg:gap-4 [column-fill:_balance]">
          {PHOTOS.map((p, i) => (
            <motion.button
              key={p.caption}
              onClick={() => setOpen(p)}
              data-cursor="link"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.04 * i }}
              className={`group relative w-full block mb-3 lg:mb-4 break-inside-avoid overflow-hidden rounded-2xl bg-volcan-50 ${ratioClass[p.ratio]}`}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={p.src}
                alt={p.alt}
                loading="lazy"
                decoding="async"
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-volcan via-volcan/30 to-transparent opacity-80 group-hover:opacity-60 transition-opacity duration-500" />
              <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full glass-strong text-[10px] font-mono tracking-widest text-sol">
                {p.tag}
              </div>
              <div className="absolute bottom-3 left-4 right-4 flex items-end justify-between">
                <div className="font-display text-marfil text-sm sm:text-base lg:text-lg leading-tight pr-2 text-left">
                  {p.caption}
                </div>
                <div className="w-8 h-8 sm:w-9 sm:h-9 shrink-0 rounded-full glass-strong grid place-items-center text-sol opacity-0 group-hover:opacity-100 transition-opacity">
                  <ZoomIn className="w-4 h-4" />
                </div>
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(null)}
            className="fixed inset-0 z-[100] bg-volcan/95 backdrop-blur-md grid place-items-center p-4 sm:p-8"
          >
            <button
              onClick={() => setOpen(null)}
              data-cursor="link"
              className="absolute top-6 right-6 w-11 h-11 rounded-full glass grid place-items-center text-marfil"
              aria-label="Cerrar"
            >
              <X className="w-5 h-5" />
            </button>
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", stiffness: 240, damping: 24 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-5xl w-full"
            >
              <div className="relative aspect-[16/10] rounded-2xl overflow-hidden bg-volcan-50">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={open.src}
                  alt={open.alt}
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </div>
              <div className="mt-4 flex items-end justify-between gap-4">
                <div>
                  <div className="text-xs font-mono tracking-widest text-sol mb-1">{open.tag}</div>
                  <div className="font-display text-2xl text-marfil">{open.caption}</div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
