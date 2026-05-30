"use client";

import { useEffect, useRef, useState } from "react";
import Aurora from "./Aurora";

type Variant = "nosotros" | "servicios" | "vehiculos" | "process" | "gallery" | "voces" | "contact";

/**
 * Cohesive brand palette across sections. Only tone & motion vary per variant —
 * colors stay within selva/sol/volcan/marfil so transitions feel clean.
 */
const PRESETS: Record<Variant, { dark: string[]; light: string[]; amplitude: number; speed: number }> = {
  nosotros:  { dark: ["#0A1614", "#1B5E45", "#0A1614"], light: ["#FCFFFA", "#22C55E", "#FCFFFA"], amplitude: 0.6, speed: 0.35 },
  servicios: { dark: ["#0A1614", "#F4B942", "#0A1614"], light: ["#FCFFFA", "#EAB308", "#FCFFFA"], amplitude: 0.55, speed: 0.35 },
  vehiculos: { dark: ["#0A1614", "#1B5E45", "#0A1614"], light: ["#FCFFFA", "#16A34A", "#FCFFFA"], amplitude: 0.6, speed: 0.4 },
  process:   { dark: ["#0A1614", "#F4B942", "#0A1614"], light: ["#FCFFFA", "#EAB308", "#FCFFFA"], amplitude: 0.55, speed: 0.35 },
  gallery:   { dark: ["#0A1614", "#1B5E45", "#0A1614"], light: ["#FCFFFA", "#22C55E", "#FCFFFA"], amplitude: 0.6, speed: 0.4 },
  voces:     { dark: ["#0A1614", "#F4B942", "#0A1614"], light: ["#FCFFFA", "#EAB308", "#FCFFFA"], amplitude: 0.55, speed: 0.35 },
  contact:   { dark: ["#0A1614", "#1B5E45", "#0A1614"], light: ["#FCFFFA", "#16A34A", "#FCFFFA"], amplitude: 0.6, speed: 0.4 },
};

export default function SectionFx({
  variant,
  opacity = 0.22,
}: {
  variant: Variant;
  opacity?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [tropical, setTropical] = useState(false);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    // Skip WebGL on mobile, reduced-motion, and low-power devices
    const small = window.matchMedia("(max-width: 768px)").matches;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const lowCpu = (navigator.hardwareConcurrency ?? 4) <= 4 && small;
    setEnabled(!small && !reduce && !lowCpu);

    setTropical(document.documentElement.classList.contains("theme-tropical"));
    const obs = new MutationObserver(() => {
      setTropical(document.documentElement.classList.contains("theme-tropical"));
    });
    obs.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (!ref.current || !enabled) return;
    const io = new IntersectionObserver(
      ([e]) => setVisible(e.isIntersecting),
      { rootMargin: "200px" }
    );
    io.observe(ref.current);
    return () => io.disconnect();
  }, [enabled]);

  const p = PRESETS[variant];

  return (
    <div
      ref={ref}
      aria-hidden
      className="absolute inset-0 pointer-events-none overflow-hidden"
      style={{ opacity }}
    >
      {enabled && visible && (
        <Aurora
          colorStops={tropical ? p.light : p.dark}
          amplitude={p.amplitude}
          blend={0.5}
          speed={p.speed}
        />
      )}
      {/* strong top+bottom fade for clean section borders */}
      <div className="absolute inset-0 bg-gradient-to-b from-volcan via-transparent to-volcan dark-only" />
      <div className="absolute inset-0 bg-gradient-to-b from-volcan via-transparent to-volcan tropical-only" />
    </div>
  );
}
