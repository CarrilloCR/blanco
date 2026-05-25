"use client";

import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useScroll,
} from "framer-motion";
import { useEffect, useRef } from "react";
import { ArrowDown, ArrowRight, CheckCircle2, Sparkles } from "lucide-react";
import Particles from "./Particles";
import { LogoMark } from "./LogoMark";
import { whatsappLink } from "@/lib/utils";
import FloatingShapes from "./FloatingShapes";
import Aurora from "./Aurora";
import SplitText from "./SplitText";
import GradientText from "./GradientText";
import BlurText from "./BlurText";
import ShinyText from "./ShinyText";
import CountUp from "./CountUp";
import StarBorder from "./StarBorder";

type Stat = { value: string; label: string; to?: number; suffix?: string; decimals?: number };
const STATS: Stat[] = [
  { value: "12+", label: "años de operación", to: 12, suffix: "+" },
  { value: "7/7", label: "provincias cubiertas" },
  { value: "99%", label: "puntualidad garantizada", to: 99, suffix: "%" },
  { value: "24/7", label: "disponibilidad" },
];

const SERVICIOS_MARQUEE = [
  "Transfer aeropuerto",
  "Corporativo",
  "Operadores turísticos",
  "Eventos y logística",
  "Rutas regulares",
  "Por horas",
  "Cobertura nacional",
];

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const headingY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const wheelY = useTransform(scrollYProgress, [0, 1], ["0%", "-40%"]);
  const wheelRotate = useTransform(scrollYProgress, [0, 1], [0, 180]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const sx = useSpring(mouseX, { stiffness: 60, damping: 18 });
  const sy = useSpring(mouseY, { stiffness: 60, damping: 18 });

  useEffect(() => {
    function handle(e: MouseEvent) {
      const x = (e.clientX / window.innerWidth - 0.5) * 2;
      const y = (e.clientY / window.innerHeight - 0.5) * 2;
      mouseX.set(x);
      mouseY.set(y);
    }
    window.addEventListener("mousemove", handle);
    return () => window.removeEventListener("mousemove", handle);
  }, [mouseX, mouseY]);

  const px1 = useTransform(sx, (v) => v * 18);
  const py1 = useTransform(sy, (v) => v * 18);
  const px2 = useTransform(sx, (v) => v * -28);
  const py2 = useTransform(sy, (v) => v * -28);

  return (
    <section
      ref={ref}
      id="inicio"
      className="relative min-h-screen w-full overflow-hidden flex items-center pt-24 sm:pt-28 pb-32 sm:pb-24"
    >
      {/* Ambient gradients */}
      <div className="absolute inset-0 bg-volcan/10">
        <motion.div
          style={{ x: px1, y: py1 }}
          className="absolute -top-40 -left-40 w-[60vw] h-[60vw] rounded-full blur-3xl opacity-40"
        >
          <div className="w-full h-full rounded-full bg-gradient-to-br from-selva via-selva/30 to-transparent" />
        </motion.div>
        <motion.div
          style={{ x: px2, y: py2 }}
          className="absolute -bottom-40 -right-40 w-[55vw] h-[55vw] rounded-full blur-3xl opacity-30"
        >
          <div className="w-full h-full rounded-full bg-gradient-to-br from-sol/60 via-arena/30 to-transparent" />
        </motion.div>
      </div>

      <div className="absolute inset-0 bg-grid bg-grid-fade opacity-50" />
      <div className="hidden sm:block">
        <Particles density={70} color="#F4B942" speed={0.25} />
      </div>
      <div className="sm:hidden">
        <Particles density={28} color="#F4B942" speed={0.2} />
      </div>
      <div className="absolute inset-0 noise-overlay pointer-events-none" />

      <motion.div
        style={{ opacity }}
        className="relative z-10 mx-auto max-w-7xl w-full px-4 sm:px-6 lg:px-8"
      >
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* LEFT — Text */}
          <motion.div style={{ y: headingY }} className="lg:col-span-7 space-y-7">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass text-xs font-mono tracking-widest"
            >
              <span className="relative flex w-2 h-2">
                <span className="absolute inset-0 rounded-full bg-sol animate-ping opacity-60" />
                <span className="relative rounded-full bg-sol w-2 h-2" />
              </span>
              <ShinyText text="TRANSPORTE PRIVADO · COSTA RICA · DESDE 2013" speed={5} color="rgb(var(--color-arena))" shineColor="rgb(var(--color-sol))" />
            </motion.div>

            <h1 className="font-display text-[clamp(2.6rem,7vw,5.6rem)] leading-[0.96] tracking-tight text-balance">
              <SplitText
                text="Su operación"
                tag="span"
                className="block text-marfil"
                delay={40}
                duration={0.8}
                ease="power3.out"
                splitType="chars"
                from={{ opacity: 0, y: 40 }}
                to={{ opacity: 1, y: 0 }}
              />
              <GradientText
                colors={["#F4B942", "#D4A574", "#F4B942"]}
                animationSpeed={6}
                className="block italic font-light"
              >
                en movimiento.
              </GradientText>
            </h1>

            <BlurText
              text="Ponemos nuestros microbuses y conductores a disposición de operadores turísticos, empresas y coordinadores de logística. Usted organiza el viaje, nosotros lo ejecutamos."
              animateBy="words"
              direction="bottom"
              delay={40}
              className="text-marfil/70 text-lg sm:text-xl max-w-xl leading-relaxed"
            />

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.65 }}
              className="flex flex-wrap items-center gap-3"
            >
              <StarBorder
                as="a"
                href={whatsappLink("Hola Trans Blanco, necesito cotizar transporte.")}
                target="_blank"
                rel="noreferrer"
                data-cursor="link"
                color="#F4B942"
                speed="6s"
                thickness={1}
                className="!inline-flex"
              >
                <span className="inline-flex items-center gap-2">
                  Solicitar cotización
                  <ArrowRight className="w-4 h-4" />
                </span>
              </StarBorder>
              <a href="#servicios" data-cursor="link" className="btn-ghost">
                <Sparkles className="w-4 h-4 text-sol" />
                Ver servicios
              </a>
            </motion.div>

            {/* Value props */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="flex flex-wrap gap-3"
            >
              {["Sin contrato mínimo", "Factura electrónica", "Cobertura nacional"].map((v) => (
                <div key={v} className="inline-flex items-center gap-1.5 text-xs text-marfil/60">
                  <CheckCircle2 className="w-3.5 h-3.5 text-selva-300" />
                  {v}
                </div>
              ))}
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.95 }}
              className="grid grid-cols-2 sm:grid-cols-4 gap-x-6 gap-y-4 pt-6 border-t border-marfil/10"
            >
              {STATS.map((s) => (
                <div key={s.label}>
                  <div className="font-display text-2xl text-sol">
                    {s.to != null ? (
                      <>
                        <CountUp to={s.to} duration={1.6} />
                        {s.suffix}
                      </>
                    ) : (
                      s.value
                    )}
                  </div>
                  <div className="text-xs text-marfil/50 mt-0.5 tracking-wide">{s.label}</div>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* RIGHT — Logo grande, solo desktop */}
          <motion.div
            style={{ y: wheelY }}
            className="hidden lg:flex lg:col-span-5 relative h-[700px] xl:h-[820px] items-center justify-center"
          >
            <motion.div
              style={{ x: px2, y: py2 }}
              className="absolute inset-0 flex items-center justify-center"
            >
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-sol/15 via-transparent to-selva/15 blur-3xl" />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/logo-tb.png"
                alt="Trans Blanco Costa Rica"
                style={{
                  width: "min(900px, 55vw)",
                  height: "auto",
                  objectFit: "contain",
                  display: "block",
                }}
                className="relative z-10 drop-shadow-[0_30px_60px_rgba(0,0,0,0.55)]"
              />
            </motion.div>
          </motion.div>
        </div>
      </motion.div>

      {/* Marquee bottom */}
      <div className="absolute bottom-6 sm:bottom-10 inset-x-0 z-10 fade-x">
        <div className="marquee-track">
          {[...SERVICIOS_MARQUEE, ...SERVICIOS_MARQUEE].map((d, i) => (
            <div
              key={`${d}-${i}`}
              className="flex items-center gap-4 sm:gap-6 px-4 sm:px-6 text-base sm:text-2xl font-display italic text-marfil/25 whitespace-nowrap"
            >
              <span>{d}</span>
              <span className="text-sol/35">✦</span>
            </div>
          ))}
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 1.2 }}
        className="absolute bottom-2 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-2 text-marfil/40 text-[10px] tracking-[0.4em]"
      >
        <span>SCROLL</span>
        <motion.div animate={{ y: [0, 6, 0] }} transition={{ duration: 1.6, repeat: Infinity }}>
          <ArrowDown className="w-3.5 h-3.5" />
        </motion.div>
      </motion.div>
    </section>
  );
}
