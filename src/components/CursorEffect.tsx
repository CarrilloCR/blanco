"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CursorEffect() {
  const [enabled, setEnabled] = useState(false);
  const [hovering, setHovering] = useState<"default" | "link" | "text">("default");

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  const springConfig = { damping: 22, stiffness: 280, mass: 0.4 };
  const x = useSpring(mouseX, springConfig);
  const y = useSpring(mouseY, springConfig);

  const trailRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Only enable on devices with fine pointer (mouse)
    if (window.matchMedia("(pointer: fine)").matches) {
      setEnabled(true);
      document.documentElement.classList.add("has-custom-cursor");
    }

    function move(e: MouseEvent) {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    }

    function over(e: MouseEvent) {
      const target = e.target as HTMLElement;
      if (!target?.closest) return;
      if (target.closest("a, button, [role=button], [data-cursor=link]")) {
        setHovering("link");
      } else if (target.closest("h1, h2, h3, p, [data-cursor=text]")) {
        setHovering("text");
      } else {
        setHovering("default");
      }
    }

    window.addEventListener("mousemove", move);
    window.addEventListener("mouseover", over);
    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", over);
      document.documentElement.classList.remove("has-custom-cursor");
    };
  }, [mouseX, mouseY]);

  if (!enabled) return null;

  const size = hovering === "link" ? 56 : hovering === "text" ? 4 : 14;

  return (
    <>
      {/* Outer ring */}
      <motion.div
        ref={trailRef}
        aria-hidden
        className="pointer-events-none fixed top-0 left-0 z-[9999] mix-blend-difference"
        style={{
          x,
          y,
          translateX: "-50%",
          translateY: "-50%",
        }}
      >
        <motion.div
          animate={{
            width: size,
            height: size,
            borderColor:
              hovering === "link" ? "rgba(244,185,66,0.9)" : "rgba(248,245,238,0.7)",
          }}
          transition={{ duration: 0.18 }}
          className="rounded-full border"
        />
      </motion.div>

      {/* Inner dot */}
      <motion.div
        aria-hidden
        className="pointer-events-none fixed top-0 left-0 z-[9999]"
        style={{
          x: mouseX,
          y: mouseY,
          translateX: "-50%",
          translateY: "-50%",
        }}
      >
        <div
          className="w-1.5 h-1.5 rounded-full"
          style={{
            background: hovering === "link" ? "#F4B942" : "#F8F5EE",
          }}
        />
      </motion.div>
    </>
  );
}
