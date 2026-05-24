"use client";

import { useState, useEffect, useRef } from "react";

type Variant =
  | "volcano" | "beach" | "forest" | "sunset" | "river"
  | "caribbean" | "waterfall" | "coast" | "coffee"
  | "vehicle" | "default";

interface SmartImageProps {
  src?: string;
  alt: string;
  variant?: Variant;
  className?: string;
  caption?: string;
}

export default function SmartImage({
  src,
  alt,
  variant = "default",
  className = "",
  caption,
}: SmartImageProps) {
  const [failed, setFailed] = useState(!src);
  const [loaded, setLoaded] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (!src) { setFailed(true); return; }
    setFailed(false);
    // If image was cached, browser fires load before our handler is attached.
    // Check img.complete on mount/src-change to catch that case.
    const el = imgRef.current;
    if (el && el.complete && el.naturalWidth > 0) {
      setLoaded(true);
    } else {
      setLoaded(false);
    }
  }, [src]);

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {!loaded && !failed && (
        <div className="absolute inset-0 bg-gradient-to-br from-volcan-50 via-selva-800 to-volcan animate-pulse" />
      )}

      {!failed && src && (
        <img
          ref={imgRef}
          src={src}
          alt={alt}
          className="absolute inset-0 w-full h-full object-cover"
          onLoad={() => setLoaded(true)}
          onError={() => setFailed(true)}
          loading="lazy"
        />
      )}

      {failed && <Illustration variant={variant} caption={caption ?? alt} />}
    </div>
  );
}

function Illustration({ variant, caption }: { variant: Variant; caption: string }) {
  return (
    <div className="absolute inset-0">
      <svg
        viewBox="0 0 400 300"
        preserveAspectRatio="xMidYMid slice"
        className="absolute inset-0 w-full h-full"
        aria-hidden
      >
        <defs>
          <linearGradient id={`bg-${variant}`} x1="0" y1="0" x2="0" y2="1">
            {gradients[variant].map((stop, i) => (
              <stop key={i} offset={`${(i / (gradients[variant].length - 1)) * 100}%`} stopColor={stop} />
            ))}
          </linearGradient>
        </defs>
        <rect width="400" height="300" fill={`url(#bg-${variant})`} />
        {scenes[variant]}
      </svg>
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
      <div className="absolute bottom-3 left-4 text-white/90 text-sm font-semibold leading-tight font-serif">
        {caption}
      </div>
    </div>
  );
}

const gradients: Record<Variant, string[]> = {
  volcano:   ["#2D1810", "#4A2418", "#8B3A1B", "#D4631A", "#F4B942"],
  beach:     ["#0A1614", "#1B5E45", "#2D8A60", "#F4B942", "#F8F5EE"],
  forest:    ["#0A1614", "#0F3D2E", "#1B5E45", "#2D8A60", "#5BAE82"],
  sunset:    ["#1B0D0D", "#4A1B1B", "#B8854D", "#F4B942", "#F87171"],
  river:     ["#0A1614", "#103729", "#2D8A60", "#5BAE82", "#92C9AB"],
  caribbean: ["#051A2E", "#0E3D6E", "#1E6BA8", "#5BAEDC", "#F8F5EE"],
  waterfall: ["#0A1614", "#103729", "#2D8A60", "#92C9AB", "#F8F5EE"],
  coast:     ["#0A1614", "#103729", "#1B5E45", "#D4A574", "#F8F5EE"],
  coffee:    ["#1B0F08", "#3E2818", "#6B4A2A", "#A07845", "#D4A574"],
  vehicle:   ["#0A1614", "#152120", "#1A2826", "#94A3A0", "#F8F5EE"],
  default:   ["#0A1614", "#103729", "#1B5E45", "#D4A574", "#F4B942"],
};

const scenes: Record<Variant, React.ReactNode> = {
  volcano: (
    <g>
      <polygon points="0,300 120,140 200,200 280,160 400,300" fill="#1B0D0D" opacity="0.85" />
      <polygon points="60,300 180,160 260,210 340,180 400,300" fill="#0A0808" opacity="0.6" />
      <circle cx="160" cy="150" r="18" fill="#F4B942" opacity="0.4" />
      <path d="M 155 140 Q 160 110 165 140 Q 170 100 175 140" stroke="#F4B942" strokeWidth="1.5" fill="none" opacity="0.6" />
      <circle cx="320" cy="60" r="22" fill="#F8F5EE" opacity="0.7" />
    </g>
  ),
  beach: (
    <g>
      <ellipse cx="200" cy="280" rx="280" ry="40" fill="#F4B942" opacity="0.4" />
      <path d="M 0 230 Q 100 215 200 225 T 400 230 L 400 270 L 0 270 Z" fill="#1B5E45" opacity="0.4" />
      <path d="M 0 250 Q 100 240 200 248 T 400 252 L 400 280 L 0 280 Z" fill="#2D8A60" opacity="0.5" />
      <circle cx="320" cy="80" r="22" fill="#F4B942" opacity="0.9" />
      <g stroke="#0A1614" strokeWidth="2" fill="none" opacity="0.7">
        <path d="M 80 270 Q 78 220 80 180" />
        <path d="M 80 180 Q 60 170 50 180 M 80 180 Q 100 170 110 180 M 80 180 Q 70 175 65 165 M 80 180 Q 90 175 95 165" />
      </g>
    </g>
  ),
  forest: (
    <g>
      <g opacity="0.7">
        {Array.from({ length: 14 }).map((_, i) => (
          <polygon key={i} points={`${20 + i * 30},300 ${30 + i * 30},${180 + (i % 3) * 20} ${40 + i * 30},300`} fill={i % 2 ? "#0F3D2E" : "#1B5E45"} />
        ))}
      </g>
      <g opacity="0.5">
        {Array.from({ length: 10 }).map((_, i) => (
          <polygon key={i} points={`${i * 45},300 ${15 + i * 45},${230 + (i % 2) * 15} ${30 + i * 45},300`} fill="#2D8A60" />
        ))}
      </g>
      <ellipse cx="80" cy="80" rx="80" ry="20" fill="#F8F5EE" opacity="0.2" />
    </g>
  ),
  sunset: (
    <g>
      <circle cx="200" cy="200" r="60" fill="#F4B942" opacity="0.9" />
      <circle cx="200" cy="200" r="80" fill="#F4B942" opacity="0.3" />
      <rect x="0" y="220" width="400" height="80" fill="#1B0D0D" opacity="0.6" />
      {Array.from({ length: 5 }).map((_, i) => (
        <line key={i} x1="0" y1={250 + i * 12} x2="400" y2={250 + i * 12} stroke="#F4B942" strokeWidth="1" opacity={0.4 - i * 0.07} />
      ))}
    </g>
  ),
  river: (
    <g>
      <path d="M 0 180 Q 100 170 200 180 T 400 180 L 400 220 Q 300 230 200 220 T 0 220 Z" fill="#5BAE82" opacity="0.5" />
      <path d="M 0 200 Q 150 195 200 200 T 400 200" stroke="#92C9AB" strokeWidth="2" fill="none" opacity="0.6" />
      {Array.from({ length: 8 }).map((_, i) => (
        <ellipse key={i} cx={50 + i * 50} cy={235 + (i % 2) * 8} rx="14" ry="3" fill="#1B5E45" opacity="0.6" />
      ))}
    </g>
  ),
  caribbean: (
    <g>
      <path d="M 0 200 Q 100 195 200 200 T 400 205 L 400 240 L 0 240 Z" fill="#5BAEDC" opacity="0.4" />
      <path d="M 0 220 Q 150 215 200 220 T 400 220 L 400 260 L 0 260 Z" fill="#1E6BA8" opacity="0.6" />
      <ellipse cx="200" cy="280" rx="280" ry="20" fill="#F8F5EE" opacity="0.6" />
      <circle cx="320" cy="80" r="18" fill="#F8F5EE" opacity="0.9" />
    </g>
  ),
  waterfall: (
    <g>
      <rect x="160" y="0" width="80" height="220" fill="#F8F5EE" opacity="0.4" />
      <rect x="170" y="0" width="60" height="220" fill="#92C9AB" opacity="0.5" />
      {Array.from({ length: 8 }).map((_, i) => (
        <line key={i} x1={170 + i * 8} y1="0" x2={170 + i * 8} y2="220" stroke="#F8F5EE" strokeWidth="1.5" opacity="0.7" />
      ))}
      <ellipse cx="200" cy="225" rx="80" ry="20" fill="#F8F5EE" opacity="0.5" />
    </g>
  ),
  coast: (
    <g>
      <path d="M 0 220 Q 80 200 160 215 Q 240 225 320 200 T 400 215 L 400 270 L 0 270 Z" fill="#1B5E45" opacity="0.6" />
      <path d="M 0 245 Q 80 235 160 245 Q 240 250 320 240 T 400 245 L 400 280 L 0 280 Z" fill="#D4A574" opacity="0.8" />
      <circle cx="80" cy="80" r="22" fill="#F4B942" opacity="0.8" />
    </g>
  ),
  coffee: (
    <g>
      {Array.from({ length: 6 }).map((_, row) =>
        Array.from({ length: 10 }).map((_, col) => (
          <circle key={`${row}-${col}`} cx={20 + col * 40 + (row % 2) * 20} cy={170 + row * 20} r="6" fill="#1B5E45" opacity={0.4 + row * 0.1} />
        ))
      )}
    </g>
  ),
  vehicle: (
    <g>
      {/* Sky gradient */}
      <rect x="0" y="0" width="400" height="200" fill="#102030" opacity="0.6" />
      {/* Road */}
      <rect x="0" y="200" width="400" height="100" fill="#1a1a1a" />
      <rect x="180" y="210" width="40" height="15" fill="#F4B942" opacity="0.5" rx="2" />
      {/* Van body */}
      <rect x="80" y="120" width="240" height="90" rx="10" fill="#F8F5EE" />
      {/* Van roof */}
      <rect x="95" y="90" width="210" height="35" rx="8" fill="#F8F5EE" />
      {/* Windows */}
      <rect x="105" y="125" width="55" height="40" rx="4" fill="#5BAEDC" opacity="0.5" />
      <rect x="168" y="125" width="55" height="40" rx="4" fill="#5BAEDC" opacity="0.5" />
      <rect x="231" y="125" width="55" height="40" rx="4" fill="#5BAEDC" opacity="0.5" />
      {/* Windshield */}
      <rect x="105" y="95" width="180" height="28" rx="4" fill="#5BAEDC" opacity="0.6" />
      {/* Gold stripe */}
      <rect x="80" y="165" width="240" height="10" fill="#F4B942" />
      {/* Wheels */}
      <circle cx="140" cy="215" r="22" fill="#333" />
      <circle cx="140" cy="215" r="13" fill="#D4A574" />
      <circle cx="260" cy="215" r="22" fill="#333" />
      <circle cx="260" cy="215" r="13" fill="#D4A574" />
    </g>
  ),
  default: (
    <g>
      <circle cx="200" cy="150" r="50" fill="#F4B942" opacity="0.4" />
      <circle cx="200" cy="150" r="80" fill="#F4B942" opacity="0.15" />
    </g>
  ),
};
