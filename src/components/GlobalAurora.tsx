"use client";

import { useEffect, useState } from "react";
import Aurora from "./Aurora";

export default function GlobalAurora() {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    // Disable on small screens & reduced-motion to keep mobile smooth
    const small = window.matchMedia("(max-width: 640px)").matches;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setEnabled(!small && !reduce);
  }, []);

  if (!enabled) {
    return (
      <div
        aria-hidden
        className="fixed inset-0 -z-10 pointer-events-none"
      >
        {/* Static mobile gradient — no WebGL */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(244,185,66,0.10),transparent_55%),radial-gradient(ellipse_at_bottom_left,rgba(27,94,69,0.18),transparent_60%)]" />
        <div className="absolute inset-0 noise-overlay" />
      </div>
    );
  }

  return (
    <div
      aria-hidden
      className="fixed inset-0 -z-10 pointer-events-none"
      style={{ opacity: 0.5 }}
    >
      <div className="absolute inset-0 dark-only">
        <Aurora colorStops={["#1B5E45", "#F4B942", "#0A1614"]} amplitude={0.7} blend={0.5} speed={0.5} />
      </div>
      <div className="absolute inset-0 tropical-only">
        <Aurora colorStops={["#16A34A", "#EAB308", "#FCFFFA"]} amplitude={0.7} blend={0.5} speed={0.5} />
      </div>
      <div className="absolute inset-0 noise-overlay" />
    </div>
  );
}
