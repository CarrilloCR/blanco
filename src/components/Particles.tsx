"use client";

import { useEffect, useRef } from "react";

interface ParticlesProps {
  density?: number;
  color?: string;
  speed?: number;
  interactive?: boolean;
  className?: string;
}

export default function Particles({
  density = 60,
  color = "#F4B942",
  speed = 0.4,
  interactive = true,
  className = "",
}: ParticlesProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf = 0;
    let width = canvas.offsetWidth;
    let height = canvas.offsetHeight;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const mouse = { x: -9999, y: -9999, active: false };

    type Particle = {
      x: number;
      y: number;
      vx: number;
      vy: number;
      r: number;
      a: number;
      phase: number;
    };

    let particles: Particle[] = [];

    function resize() {
      if (!canvas) return;
      width = canvas.offsetWidth;
      height = canvas.offsetHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx?.scale(dpr, dpr);
      seed();
    }

    function seed() {
      particles = Array.from({ length: density }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * speed,
        vy: (Math.random() - 0.5) * speed,
        r: Math.random() * 1.6 + 0.4,
        a: Math.random() * 0.5 + 0.2,
        phase: Math.random() * Math.PI * 2,
      }));
    }

    function tick(t: number) {
      if (!ctx) return;
      ctx.clearRect(0, 0, width, height);

      // Lines between close particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        for (let j = i + 1; j < particles.length; j++) {
          const q = particles[j];
          const dx = p.x - q.x;
          const dy = p.y - q.y;
          const d2 = dx * dx + dy * dy;
          if (d2 < 12000) {
            const a = (1 - d2 / 12000) * 0.18;
            ctx.strokeStyle = hexToRgba(color, a);
            ctx.lineWidth = 0.6;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(q.x, q.y);
            ctx.stroke();
          }
        }
      }

      // Particles
      for (const p of particles) {
        p.phase += 0.01;
        p.x += p.vx + Math.sin(p.phase) * 0.05;
        p.y += p.vy + Math.cos(p.phase) * 0.05;

        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        if (interactive && mouse.active) {
          const dx = p.x - mouse.x;
          const dy = p.y - mouse.y;
          const d2 = dx * dx + dy * dy;
          if (d2 < 14400) {
            const force = (1 - d2 / 14400) * 1.6;
            p.x += (dx / Math.sqrt(d2 + 0.01)) * force;
            p.y += (dy / Math.sqrt(d2 + 0.01)) * force;
          }
        }

        const pulse = 0.5 + 0.5 * Math.sin(p.phase * 2);
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r + pulse * 0.3, 0, Math.PI * 2);
        ctx.fillStyle = hexToRgba(color, p.a);
        ctx.fill();
      }

      raf = requestAnimationFrame(tick);
    }

    function onMove(e: MouseEvent) {
      const rect = canvas?.getBoundingClientRect();
      if (!rect) return;
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
      mouse.active = true;
    }
    function onLeave() {
      mouse.active = false;
      mouse.x = -9999;
      mouse.y = -9999;
    }

    resize();
    raf = requestAnimationFrame(tick);
    window.addEventListener("resize", resize);
    if (interactive) {
      window.addEventListener("mousemove", onMove);
      window.addEventListener("mouseleave", onLeave);
    }
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseleave", onLeave);
    };
  }, [density, color, speed, interactive]);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 w-full h-full ${className}`}
      aria-hidden
    />
  );
}

function hexToRgba(hex: string, alpha: number) {
  const h = hex.replace("#", "");
  const r = parseInt(h.substring(0, 2), 16);
  const g = parseInt(h.substring(2, 4), 16);
  const b = parseInt(h.substring(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}
