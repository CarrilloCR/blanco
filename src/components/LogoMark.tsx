"use client";

import { motion } from "framer-motion";

const LOGO_SRC = "/logo-tb.png";

export function LogoMark({
  size = 48,
  spin = false,
  className = "",
}: {
  size?: number;
  spin?: boolean;
  className?: string;
}) {
  const img = (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={LOGO_SRC}
      alt="Trans Blanco Costa Rica"
      width={size}
      height={size}
      style={{ width: "100%", height: "100%", objectFit: "contain", display: "block" }}
    />
  );

  if (spin) {
    return (
      <motion.div
        style={{ width: size, height: size }}
        className={className}
        animate={{ rotate: 360 }}
        transition={{ duration: 24, repeat: Infinity, ease: "linear" }}
        aria-label="Trans Blanco — logo"
      >
        {img}
      </motion.div>
    );
  }

  return (
    <div
      style={{ width: size, height: size }}
      className={className}
      aria-label="Trans Blanco — logo"
    >
      {img}
    </div>
  );
}

export function LogoWordmark({ className = "" }: { className?: string }) {
  return (
    <div
      className={className}
      style={{ width: 168, height: 48 }}
      aria-label="Trans Blanco Costa Rica"
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={LOGO_SRC}
        alt="Trans Blanco Costa Rica"
        style={{ width: "100%", height: "100%", objectFit: "contain", display: "block" }}
      />
    </div>
  );
}
