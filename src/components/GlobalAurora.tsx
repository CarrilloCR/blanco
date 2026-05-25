"use client";

import Aurora from "./Aurora";

export default function GlobalAurora() {
  return (
    <div
      aria-hidden
      className="fixed inset-0 -z-10 pointer-events-none"
      style={{ opacity: 0.55 }}
    >
      <div className="absolute inset-0 dark-only">
        <Aurora colorStops={["#1B5E45", "#F4B942", "#0A1614"]} amplitude={0.8} blend={0.5} speed={0.6} />
      </div>
      <div className="absolute inset-0 tropical-only">
        <Aurora colorStops={["#16A34A", "#EAB308", "#FCFFFA"]} amplitude={0.8} blend={0.5} speed={0.6} />
      </div>
      <div className="absolute inset-0 noise-overlay" />
    </div>
  );
}
