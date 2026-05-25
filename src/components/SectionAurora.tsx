"use client";

import Aurora from "./Aurora";

type Variant = "selva" | "sol" | "hibisco" | "mixed" | "ocean";

const PALETTES: Record<Variant, { dark: string[]; tropical: string[] }> = {
  selva: {
    dark: ["#0A1614", "#1B5E45", "#0A1614"],
    tropical: ["#E8F4EE", "#16A34A", "#FCFFFA"],
  },
  sol: {
    dark: ["#0A1614", "#F4B942", "#1B5E45"],
    tropical: ["#FCFFFA", "#EAB308", "#E8F4EE"],
  },
  hibisco: {
    dark: ["#0A1614", "#DC2626", "#1B5E45"],
    tropical: ["#FCFFFA", "#FCA5A5", "#EAB308"],
  },
  mixed: {
    dark: ["#1B5E45", "#F4B942", "#0A1614"],
    tropical: ["#16A34A", "#EAB308", "#E8F4EE"],
  },
  ocean: {
    dark: ["#0A1614", "#1B5E45", "#5BAE82"],
    tropical: ["#E8F4EE", "#16A34A", "#FCFFFA"],
  },
};

interface Props {
  variant?: Variant;
  amplitude?: number;
  blend?: number;
  speed?: number;
  opacity?: number;
  className?: string;
}

export default function SectionAurora({
  variant = "mixed",
  amplitude = 0.7,
  blend = 0.5,
  speed = 0.5,
  opacity = 0.35,
  className = "",
}: Props) {
  const p = PALETTES[variant];
  return (
    <>
      <div
        className={`absolute inset-0 pointer-events-none -z-10 ${className}`}
        style={{ opacity }}
      >
        <div className="hidden theme-tropical:hidden">
          <Aurora colorStops={p.dark} amplitude={amplitude} blend={blend} speed={speed} />
        </div>
        {/* default dark */}
        <div className="absolute inset-0 dark-only">
          <Aurora colorStops={p.dark} amplitude={amplitude} blend={blend} speed={speed} />
        </div>
        {/* tropical */}
        <div className="absolute inset-0 tropical-only">
          <Aurora colorStops={p.tropical} amplitude={amplitude} blend={blend} speed={speed} />
        </div>
      </div>
      <div className="absolute inset-0 noise-overlay pointer-events-none -z-10" />
    </>
  );
}
