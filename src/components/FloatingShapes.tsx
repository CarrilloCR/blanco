"use client";

import { motion } from "framer-motion";
import { useId } from "react";

type Shape = {
  type: "circle" | "triangle" | "diamond" | "hexagon" | "ring";
  x: string;
  y: string;
  size: number;
  color: string;
  opacity: number;
  duration: number;
  delay: number;
  rotate?: number;
};

const PRESETS: Record<string, Shape[]> = {
  about: [
    { type: "ring",     x: "8%",  y: "15%", size: 120, color: "#F4B942", opacity: 0.07, duration: 8,  delay: 0,   rotate: 0 },
    { type: "triangle", x: "88%", y: "20%", size: 60,  color: "#1B5E45", opacity: 0.10, duration: 10, delay: 1.5, rotate: 15 },
    { type: "diamond",  x: "15%", y: "75%", size: 45,  color: "#DC2626", opacity: 0.08, duration: 12, delay: 2,   rotate: 0 },
    { type: "hexagon",  x: "80%", y: "70%", size: 90,  color: "#D4A574", opacity: 0.06, duration: 9,  delay: 0.5, rotate: 30 },
    { type: "ring",     x: "50%", y: "90%", size: 70,  color: "#F4B942", opacity: 0.05, duration: 11, delay: 3,   rotate: 0 },
  ],
  services: [
    { type: "hexagon",  x: "5%",  y: "30%", size: 100, color: "#1B5E45", opacity: 0.07, duration: 13, delay: 0,   rotate: 20 },
    { type: "ring",     x: "92%", y: "50%", size: 140, color: "#F4B942", opacity: 0.05, duration: 10, delay: 1,   rotate: 0 },
    { type: "diamond",  x: "75%", y: "10%", size: 50,  color: "#DC2626", opacity: 0.08, duration: 8,  delay: 2,   rotate: 45 },
    { type: "triangle", x: "20%", y: "85%", size: 70,  color: "#D4A574", opacity: 0.07, duration: 11, delay: 0.8, rotate: 0 },
    { type: "circle",   x: "45%", y: "10%", size: 35,  color: "#F4B942", opacity: 0.09, duration: 7,  delay: 1.5, rotate: 0 },
  ],
  fleet: [
    { type: "ring",     x: "3%",  y: "60%", size: 180, color: "#1B5E45", opacity: 0.06, duration: 14, delay: 0,   rotate: 0 },
    { type: "diamond",  x: "90%", y: "20%", size: 55,  color: "#F4B942", opacity: 0.09, duration: 9,  delay: 1.2, rotate: 45 },
    { type: "hexagon",  x: "60%", y: "85%", size: 80,  color: "#DC2626", opacity: 0.07, duration: 11, delay: 2.5, rotate: 15 },
    { type: "triangle", x: "12%", y: "15%", size: 50,  color: "#D4A574", opacity: 0.08, duration: 8,  delay: 0,   rotate: 30 },
  ],
  gallery: [
    { type: "circle",   x: "5%",  y: "50%", size: 200, color: "#F4B942", opacity: 0.04, duration: 16, delay: 0,   rotate: 0 },
    { type: "diamond",  x: "85%", y: "40%", size: 60,  color: "#1B5E45", opacity: 0.08, duration: 10, delay: 1,   rotate: 45 },
    { type: "ring",     x: "50%", y: "5%",  size: 90,  color: "#DC2626", opacity: 0.06, duration: 12, delay: 2,   rotate: 0 },
    { type: "triangle", x: "90%", y: "80%", size: 65,  color: "#D4A574", opacity: 0.07, duration: 9,  delay: 0.5, rotate: 60 },
  ],
  contact: [
    { type: "hexagon",  x: "2%",  y: "20%", size: 110, color: "#F4B942", opacity: 0.07, duration: 11, delay: 0,   rotate: 0 },
    { type: "ring",     x: "90%", y: "60%", size: 160, color: "#1B5E45", opacity: 0.05, duration: 14, delay: 1.5, rotate: 0 },
    { type: "triangle", x: "40%", y: "90%", size: 55,  color: "#DC2626", opacity: 0.07, duration: 8,  delay: 0.5, rotate: 180 },
    { type: "diamond",  x: "75%", y: "15%", size: 42,  color: "#D4A574", opacity: 0.09, duration: 10, delay: 2,   rotate: 30 },
  ],
};

function ShapeSVG({ shape }: { shape: Shape }) {
  const s = shape.size;
  switch (shape.type) {
    case "circle":
      return (
        <svg width={s} height={s} viewBox={`0 0 ${s} ${s}`}>
          <circle cx={s / 2} cy={s / 2} r={s / 2} fill={shape.color} />
        </svg>
      );
    case "ring":
      return (
        <svg width={s} height={s} viewBox={`0 0 ${s} ${s}`}>
          <circle cx={s / 2} cy={s / 2} r={s / 2 - 4} fill="none" stroke={shape.color} strokeWidth={s * 0.06} />
        </svg>
      );
    case "triangle": {
      const h = (Math.sqrt(3) / 2) * s;
      return (
        <svg width={s} height={h} viewBox={`0 0 ${s} ${h}`}>
          <polygon points={`${s / 2},0 ${s},${h} 0,${h}`} fill="none" stroke={shape.color} strokeWidth={s * 0.05} />
        </svg>
      );
    }
    case "diamond":
      return (
        <svg width={s} height={s} viewBox={`0 0 ${s} ${s}`}>
          <polygon points={`${s / 2},0 ${s},${s / 2} ${s / 2},${s} 0,${s / 2}`} fill="none" stroke={shape.color} strokeWidth={s * 0.06} />
        </svg>
      );
    case "hexagon": {
      const r = s / 2;
      const pts = Array.from({ length: 6 })
        .map((_, i) => {
          const angle = (i * 60 - 30) * (Math.PI / 180);
          return `${r + r * Math.cos(angle)},${r + r * Math.sin(angle)}`;
        })
        .join(" ");
      return (
        <svg width={s} height={s} viewBox={`0 0 ${s} ${s}`}>
          <polygon points={pts} fill="none" stroke={shape.color} strokeWidth={s * 0.05} />
        </svg>
      );
    }
  }
}

export default function FloatingShapes({ variant }: { variant: keyof typeof PRESETS }) {
  const shapes = PRESETS[variant] ?? [];

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden>
      {shapes.map((shape, i) => (
        <motion.div
          key={i}
          className="absolute"
          style={{
            left: shape.x,
            top: shape.y,
            opacity: shape.opacity,
            rotate: shape.rotate ?? 0,
          }}
          animate={{
            y: [0, -20, 0],
            rotate: [shape.rotate ?? 0, (shape.rotate ?? 0) + 12, shape.rotate ?? 0],
          }}
          transition={{
            duration: shape.duration,
            delay: shape.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <ShapeSVG shape={shape} />
        </motion.div>
      ))}
    </div>
  );
}
