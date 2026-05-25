"use client";

import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";
import { MapPin, Mountain, Sparkles, X } from "lucide-react";
import FloatingShapes from "./FloatingShapes";
import DomeGallery from "./DomeGallery";
import SplitText from "./SplitText";
import BlurText from "./BlurText";

type Variant =
  | "volcano" | "beach" | "forest" | "sunset" | "river"
  | "caribbean" | "waterfall" | "coast" | "coffee";

type Photo = {
  src: string;
  alt: string;
  caption: string;
  tag: string;
  variant: Variant;
  info: {
    region: string;
    elevation?: string;
    type: string;
    description: string;
    highlights: string[];
    driveTime: string;
  };
};

const PHOTOS: Photo[] = [
  {
    src: "/images/gallery/arenal.jpg", alt: "Volcán Arenal · La Fortuna", caption: "Volcán Arenal · La Fortuna",
    tag: "ALAJUELA", variant: "volcano",
    info: {
      region: "La Fortuna, San Carlos",
      elevation: "1 670 m s.n.m.",
      type: "Volcán activo · Parque Nacional",
      description: "Cono volcánico perfecto rodeado por bosque tropical, aguas termales y la laguna Arenal. Punto turístico más visitado del país.",
      highlights: ["Aguas termales Tabacón", "Catarata La Fortuna", "Puentes colgantes", "Laguna Arenal"],
      driveTime: "≈ 2h 45min desde SJO",
    },
  },
  {
    src: "/images/gallery/manuel-antonio.jpeg", alt: "Manuel Antonio", caption: "Manuel Antonio",
    tag: "PUNTARENAS", variant: "beach",
    info: {
      region: "Quepos, Pacífico Central",
      type: "Parque Nacional · Playa",
      description: "Selva tropical bordeando playas de arena blanca con monos cariblanco, perezosos e iguanas a la vista.",
      highlights: ["Playa Espadilla Sur", "Punta Catedral", "Fauna nativa", "Senderos cortos"],
      driveTime: "≈ 2h 45min desde SJO",
    },
  },
  {
    src: "/images/gallery/monteverde.jpg", alt: "Bosque Nuboso · Monteverde", caption: "Bosque Nuboso · Monteverde",
    tag: "PUNTARENAS", variant: "forest",
    info: {
      region: "Monteverde, Tilarán",
      elevation: "1 440 m s.n.m.",
      type: "Reserva biológica · Bosque nuboso",
      description: "Bosque siempre húmedo entre las nubes, con biodiversidad única, puentes colgantes y avistamiento del quetzal.",
      highlights: ["Reserva Santa Elena", "Puentes en el dosel", "Quetzal resplandeciente", "Café de altura"],
      driveTime: "≈ 3h 30min desde SJO",
    },
  },
  {
    src: "/images/gallery/tamarindo.jpg", alt: "Atardecer · Tamarindo", caption: "Atardecer · Tamarindo",
    tag: "GUANACASTE", variant: "sunset",
    info: {
      region: "Santa Cruz, Pacífico Norte",
      type: "Playa · Pueblo surfista",
      description: "La playa más popular del Pacífico Norte. Olas constantes, atardeceres dorados y vida nocturna activa.",
      highlights: ["Surf todo el año", "Atardeceres", "Restaurantes a pie de playa", "Estuario Las Baulas"],
      driveTime: "≈ 4h 30min desde SJO · 1h 20min desde LIR",
    },
  },
  {
    src: "/images/gallery/tortuguero.jpg", alt: "Canales de Tortuguero", caption: "Canales de Tortuguero",
    tag: "LIMÓN", variant: "river",
    info: {
      region: "Tortuguero, Caribe Norte",
      type: "Parque Nacional · Canales",
      description: "Red de canales navegables a través de selva primaria. Desove de tortuga verde entre julio y octubre.",
      highlights: ["Desove de tortugas", "Tours en lancha", "Caimanes y manatíes", "Bosque inundado"],
      driveTime: "≈ 4h en bus + 1h 30min en lancha",
    },
  },
  {
    src: "/images/gallery/puerto-viejo.jpg", alt: "Costa Caribeña · Puerto Viejo", caption: "Costa Caribeña · Puerto Viejo",
    tag: "LIMÓN", variant: "caribbean",
    info: {
      region: "Talamanca, Caribe Sur",
      type: "Costa · Cultura afrocaribeña",
      description: "Pueblo de cultura afrocaribeña con playas turquesa, reggae, cocina criolla y arrecifes de coral.",
      highlights: ["Playa Cocles", "Manzanillo", "Cocina caribeña", "Cacao orgánico"],
      driveTime: "≈ 4h 30min desde SJO",
    },
  },
  {
    src: "/images/gallery/rio-celeste.jpg", alt: "Río Celeste", caption: "Río Celeste",
    tag: "ALAJUELA", variant: "waterfall",
    info: {
      region: "Parque Nacional Volcán Tenorio",
      type: "Catarata · Fenómeno óptico",
      description: "Río de color celeste por reacción óptica de minerales volcánicos. Catarata de 30m y aguas termales naturales.",
      highlights: ["Catarata celeste", "Mirador del volcán", "Aguas termales", "Borbollones"],
      driveTime: "≈ 3h 15min desde SJO",
    },
  },
  {
    src: "/images/gallery/nicoya.jpg", alt: "Península de Nicoya", caption: "Península de Nicoya",
    tag: "GUANACASTE", variant: "coast",
    info: {
      region: "Península de Nicoya",
      type: "Zona Azul · Playas remotas",
      description: "Una de las cinco Zonas Azules del mundo: longevidad excepcional. Playas vírgenes y pueblos costeros tranquilos.",
      highlights: ["Sámara", "Nosara", "Mal País", "Santa Teresa"],
      driveTime: "≈ 4h–5h desde SJO",
    },
  },
  {
    src: "/images/gallery/tarrazu.jpg", alt: "Cafetales · Tarrazú", caption: "Cafetales · Tarrazú",
    tag: "SAN JOSÉ", variant: "coffee",
    info: {
      region: "Los Santos, zona cafetalera",
      elevation: "1 200–1 900 m s.n.m.",
      type: "Cafetales · Tours de café",
      description: "Una de las mejores zonas cafetaleras del mundo. Café SHB de altura, tours en fincas y catación profesional.",
      highlights: ["Beneficios de café", "Catación", "San Marcos de Tarrazú", "Cerro de la Muerte"],
      driveTime: "≈ 1h 30min desde SJO",
    },
  },
  {
    src: "/images/gallery/irazu.jpg", alt: "Volcán Irazú", caption: "Volcán Irazú",
    tag: "CARTAGO", variant: "volcano",
    info: {
      region: "Parque Nacional Volcán Irazú",
      elevation: "3 432 m s.n.m.",
      type: "Volcán · Cráter activo",
      description: "Volcán más alto de Costa Rica. En días claros se ven ambos océanos. Cráter principal con laguna verde.",
      highlights: ["Cráter principal", "Vista a dos océanos", "Mirador Diego de la Haya", "Páramo de altura"],
      driveTime: "≈ 1h 30min desde SJO",
    },
  },
  {
    src: "/images/gallery/drake-bay.jpg", alt: "Bahía Drake · Osa", caption: "Bahía Drake · Osa",
    tag: "PUNTARENAS", variant: "beach",
    info: {
      region: "Península de Osa, Pacífico Sur",
      type: "Bahía remota · Biodiversidad extrema",
      description: "Puerta de entrada al Parque Nacional Corcovado, donde se concentra el 2.5% de la biodiversidad mundial.",
      highlights: ["Corcovado", "Isla del Caño", "Avistamiento de ballenas", "Selva primaria"],
      driveTime: "≈ 6h desde SJO o vuelo a Drake",
    },
  },
  {
    src: "/images/gallery/sarapiqui.jpg", alt: "Selva de Sarapiquí · Braulio Carrillo", caption: "Selva de Sarapiquí",
    tag: "HEREDIA", variant: "forest",
    info: {
      region: "Sarapiquí, llanuras del Norte",
      type: "Río · Selva tropical",
      description: "Selva primaria adyacente al Parque Braulio Carrillo. Rafting en el río Sarapiquí y estaciones biológicas.",
      highlights: ["Rafting clase III–IV", "La Selva OTS", "Tirimbina", "Tour de cacao"],
      driveTime: "≈ 1h 30min desde SJO",
    },
  },
];

export default function Gallery() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [selected, setSelected] = useState<Photo | null>(null);

  return (
    <section id="galeria" ref={ref} className="relative py-32 overflow-hidden">
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
              <SplitText text="Destinos que" tag="span" className="block" delay={40} duration={0.8} ease="power3.out" splitType="chars" from={{ opacity: 0, y: 40 }} to={{ opacity: 1, y: 0 }} />
              <SplitText text="conectamos." tag="span" className="block italic gradient-text" delay={40} duration={0.8} ease="power3.out" splitType="chars" from={{ opacity: 0, y: 40 }} to={{ opacity: 1, y: 0 }} />
            </h2>
          </div>
          <BlurText
            text="Cúpula interactiva con los lugares a donde llevamos pasajeros. Arrastre para explorar. Toque cualquier imagen: zoom + información del lugar."
            animateBy="words"
            direction="bottom"
            delay={35}
            className="text-marfil/60 max-w-md"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="relative w-full h-[80vh] min-h-[600px] rounded-3xl overflow-hidden glass"
        >
          <motion.div
            animate={{ x: selected ? -210 : 0 }}
            transition={{ type: "spring", stiffness: 180, damping: 24 }}
            className="absolute inset-0"
          >
          <DomeGallery
            images={PHOTOS.map((p) => ({ src: p.src, alt: p.alt }))}
            fit={0.55}
            grayscale={false}
            dragSensitivity={18}
            maxVerticalRotationDeg={10}
            segments={36}
            overlayBlurColor="#0A1614"
            imageBorderRadius="18px"
            openedImageBorderRadius="22px"
            openedImageWidth="520px"
            openedImageHeight="400px"
            onItemClick={(item) => {
              const match = PHOTOS.find((p) => p.alt === item.alt || p.src === item.src);
              if (match) setSelected(match);
            }}
            onItemClose={() => setSelected(null)}
          />
          </motion.div>

          {/* Info panel overlay — appears when image opened */}
          <AnimatePresence>
            {selected && (
              <motion.div
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 40 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="pointer-events-auto absolute z-50 glass-strong rounded-2xl p-6 overflow-y-auto md:top-4 md:right-4 md:bottom-4 md:w-[380px] top-auto bottom-4 right-4 left-4 max-h-[55%] md:max-h-none md:left-auto"
              >
                <button
                  onClick={() => setSelected(null)}
                  aria-label="Cerrar info"
                  className="absolute top-3 right-3 w-9 h-9 rounded-full bg-marfil/10 hover:bg-marfil/20 grid place-items-center text-marfil transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>

                <div className="space-y-5 pr-2">
                  <div>
                    <div className="text-[10px] font-mono tracking-[0.3em] text-sol mb-2">
                      {selected.tag} · {selected.info.type.toUpperCase()}
                    </div>
                    <h3 className="font-display text-2xl text-marfil leading-tight">
                      {selected.caption}
                    </h3>
                  </div>

                  <div className="space-y-2 pb-4 border-b border-marfil/10">
                    <div className="flex items-start gap-2 text-sm text-marfil/80">
                      <MapPin className="w-4 h-4 text-sol shrink-0 mt-0.5" />
                      <span>{selected.info.region}</span>
                    </div>
                    {selected.info.elevation && (
                      <div className="flex items-start gap-2 text-sm text-marfil/80">
                        <Mountain className="w-4 h-4 text-sol shrink-0 mt-0.5" />
                        <span>{selected.info.elevation}</span>
                      </div>
                    )}
                    <div className="text-xs text-marfil/50 pt-1 font-mono">
                      {selected.info.driveTime}
                    </div>
                  </div>

                  <p className="text-marfil/75 text-sm leading-relaxed">
                    {selected.info.description}
                  </p>

                  <div>
                    <div className="text-[10px] font-mono tracking-[0.3em] text-marfil/40 mb-3 inline-flex items-center gap-2">
                      <Sparkles className="w-3 h-3 text-sol" />
                      DESTACADOS
                    </div>
                    <ul className="space-y-1.5">
                      {selected.info.highlights.map((h) => (
                        <li key={h} className="text-sm text-marfil/70 flex items-center gap-2">
                          <span className="w-1 h-1 rounded-full bg-sol" />
                          {h}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
