"use client";

import { motion } from "framer-motion";

// ── helpers ──────────────────────────────────────────────────────────────────
function rad(deg: number) { return (deg * Math.PI) / 180; }
function pt(cx: number, cy: number, r: number, deg: number) {
  // 0° = top (12 o'clock), clockwise
  const a = rad(deg - 90);
  return { x: cx + r * Math.cos(a), y: cy + r * Math.sin(a) };
}
function sectorPath(cx: number, cy: number, rIn: number, rOut: number, a1: number, a2: number) {
  const s = pt(cx, cy, rIn, a1);
  const e = pt(cx, cy, rOut, a1);
  const f = pt(cx, cy, rOut, a2);
  const g = pt(cx, cy, rIn, a2);
  const big = (a2 - a1) > 180 ? 1 : 0;
  return `M${s.x} ${s.y} L${e.x} ${e.y} A${rOut} ${rOut} 0 ${big} 1 ${f.x} ${f.y} L${g.x} ${g.y} A${rIn} ${rIn} 0 ${big} 0 ${s.x} ${s.y}Z`;
}

// ── carreta wheel constants ───────────────────────────────────────────────────
const N = 12;           // spokes
const STEP = 360 / N;   // 30°
const GAP = 2.5;        // degrees gap between sectors

// Alternating colors faithful to Sarchí carreta palette
const SECTOR_FILL = [
  "#DC2626", "#F4B942", "#1B5E45", "#F8F5EE",
  "#B8854D", "#F4B942", "#DC2626", "#2D8A60",
  "#F4B942", "#DC2626", "#1B5E45", "#D4A574",
];
// Slightly darker shade for inner decorative diamond
const SECTOR_DARK = [
  "#8B0000", "#B8860B", "#0F3D2E", "#C8C3B8",
  "#7A4A1B", "#B8860B", "#8B0000", "#0F3D2E",
  "#B8860B", "#8B0000", "#0F3D2E", "#A07845",
];

// ── LogoMark – pure wheel (used spinning in Hero, Navbar icon) ───────────────
export function LogoMark({
  size = 48,
  spin = false,
  className = "",
}: {
  size?: number;
  spin?: boolean;
  className?: string;
}) {
  const cx = 100, cy = 100;
  const rOut = 80, rIn = 20;

  return (
    <motion.svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 200 200"
      width={size}
      height={size}
      className={className}
      animate={spin ? { rotate: 360 } : undefined}
      transition={spin ? { duration: 24, repeat: Infinity, ease: "linear" } : undefined}
      aria-label="Trans Blanco logo — rueda de carreta"
    >
      <defs>
        <radialGradient id="hub-lg" cx="40%" cy="35%" r="65%">
          <stop offset="0%" stopColor="#1B5E45" />
          <stop offset="100%" stopColor="#0A1614" />
        </radialGradient>
        <radialGradient id="rim-lg" cx="50%" cy="50%" r="50%">
          <stop offset="85%" stopColor="transparent" />
          <stop offset="100%" stopColor="#F4B942" stopOpacity="0.4" />
        </radialGradient>
      </defs>

      {/* Shadow / depth rim */}
      <circle cx={cx} cy={cy} r={88} fill="none" stroke="#000" strokeOpacity="0.5" strokeWidth="9" />

      {/* Outer gold rim */}
      <circle cx={cx} cy={cy} r={88} fill="none" stroke="#F4B942" strokeWidth="3" />
      <circle cx={cx} cy={cy} r={84} fill="none" stroke="#0A1614" strokeWidth="2.5" />

      {/* Sectors */}
      {Array.from({ length: N }).map((_, i) => {
        const a1 = i * STEP + GAP;
        const a2 = (i + 1) * STEP - GAP;
        const mid = (a1 + a2) / 2;
        const dp = pt(cx, cy, (rIn + rOut) / 2, mid);
        return (
          <g key={i}>
            <path d={sectorPath(cx, cy, rIn + 1, rOut - 1, a1, a2)} fill={SECTOR_FILL[i]} />
            {/* Decorative leaf motif – rotated diamond */}
            <g transform={`translate(${dp.x},${dp.y}) rotate(${mid})`}>
              <polygon
                points="0,-6.5 4.5,0 0,6.5 -4.5,0"
                fill={SECTOR_DARK[i]}
                opacity="0.55"
              />
              <circle cx={0} cy={0} r={1.8} fill="#F8F5EE" opacity="0.6" />
            </g>
          </g>
        );
      })}

      {/* Spokes */}
      {Array.from({ length: N }).map((_, i) => {
        const a = i * STEP;
        const inner = pt(cx, cy, rIn + 1, a);
        const outer = pt(cx, cy, rOut - 1, a);
        return (
          <line
            key={i}
            x1={inner.x} y1={inner.y}
            x2={outer.x} y2={outer.y}
            stroke="#0A1614"
            strokeWidth="2.8"
          />
        );
      })}

      {/* Inner hub ring */}
      <circle cx={cx} cy={cy} r={rIn + 3} fill="none" stroke="#0A1614" strokeWidth="2.5" />
      <circle cx={cx} cy={cy} r={rIn + 1} fill="none" stroke="#F4B942" strokeWidth="1" />

      {/* Hub */}
      <circle cx={cx} cy={cy} r={19} fill="url(#hub-lg)" />
      <circle cx={cx} cy={cy} r={19} fill="none" stroke="#F4B942" strokeWidth="1.5" />

      {/* Center bolt */}
      <circle cx={cx} cy={cy} r={8} fill="#F4B942" />
      <circle cx={cx} cy={cy} r={4.5} fill="#0A1614" />
      <circle cx={cx} cy={cy} r={1.8} fill="#F4B942" />

      {/* Radial glow overlay */}
      <circle cx={cx} cy={cy} r={88} fill="url(#rim-lg)" />
    </motion.svg>
  );
}

// ── LogoWordmark – wheel + "TRANSPORTES BLANCO" arc (Navbar, Footer) ────────
export function LogoWordmark({ className = "" }: { className?: string }) {
  const cx = 108, cy = 108;
  const rWheel = 72, rIn = 18;
  const rArc = 84; // text follows this radius arc

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 216 216"
      height={48}
      width={48}
      className={className}
      aria-label="Transportes Blanco"
    >
      <defs>
        {/* Arc path – upper semicircle: left edge → top → right edge */}
        <path
          id="arc-text-path"
          d={`M ${cx - rArc},${cy} A ${rArc},${rArc} 0 0 1 ${cx + rArc},${cy}`}
        />
        <radialGradient id="hub-wm" cx="40%" cy="35%" r="65%">
          <stop offset="0%" stopColor="#1B5E45" />
          <stop offset="100%" stopColor="#0A1614" />
        </radialGradient>
      </defs>

      {/* Shadow rim */}
      <circle cx={cx} cy={cy} r={rWheel + 8} fill="none" stroke="#000" strokeOpacity="0.4" strokeWidth="8" />

      {/* Gold outer rim */}
      <circle cx={cx} cy={cy} r={rWheel + 8} fill="none" stroke="#F4B942" strokeWidth="2.5" />
      <circle cx={cx} cy={cy} r={rWheel + 5} fill="none" stroke="#0A1614" strokeWidth="2" />

      {/* Sectors */}
      {Array.from({ length: N }).map((_, i) => {
        const a1 = i * STEP + GAP;
        const a2 = (i + 1) * STEP - GAP;
        const mid = (a1 + a2) / 2;
        const dp = pt(cx, cy, (rIn + rWheel) / 2, mid);
        return (
          <g key={i}>
            <path d={sectorPath(cx, cy, rIn + 1, rWheel - 1, a1, a2)} fill={SECTOR_FILL[i]} />
            <g transform={`translate(${dp.x},${dp.y}) rotate(${mid})`}>
              <polygon points="0,-5.5 3.8,0 0,5.5 -3.8,0" fill={SECTOR_DARK[i]} opacity="0.55" />
              <circle cx={0} cy={0} r={1.5} fill="#F8F5EE" opacity="0.6" />
            </g>
          </g>
        );
      })}

      {/* Spokes */}
      {Array.from({ length: N }).map((_, i) => {
        const a = i * STEP;
        const inner = pt(cx, cy, rIn + 1, a);
        const outer = pt(cx, cy, rWheel - 1, a);
        return (
          <line key={i} x1={inner.x} y1={inner.y} x2={outer.x} y2={outer.y} stroke="#0A1614" strokeWidth="2.4" />
        );
      })}

      {/* Hub ring */}
      <circle cx={cx} cy={cy} r={rIn + 3} fill="none" stroke="#0A1614" strokeWidth="2" />
      <circle cx={cx} cy={cy} r={rIn + 1} fill="none" stroke="#F4B942" strokeWidth="0.8" />

      {/* Hub */}
      <circle cx={cx} cy={cy} r={17} fill="url(#hub-wm)" />
      <circle cx={cx} cy={cy} r={17} fill="none" stroke="#F4B942" strokeWidth="1.2" />
      <circle cx={cx} cy={cy} r={7} fill="#F4B942" />
      <circle cx={cx} cy={cy} r={4} fill="#0A1614" />
      <circle cx={cx} cy={cy} r={1.6} fill="#F4B942" />

      {/* Arc text – "TRANSPORTES BLANCO" following the upper rim */}
      <text
        fontSize="8.5"
        fontFamily="Georgia, serif"
        letterSpacing="3.2"
        fill="#F4B942"
        fontWeight="600"
      >
        <textPath href="#arc-text-path" startOffset="50%" textAnchor="middle">
          TRANSPORTES BLANCO
        </textPath>
      </text>
    </svg>
  );
}
