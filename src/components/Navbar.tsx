"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import Link from "next/link";
import { Menu, X, Phone } from "lucide-react";
import { LogoWordmark } from "./LogoMark";
import { SECTIONS, whatsappLink, PHONE_DISPLAY, PHONE_TEL } from "@/lib/utils";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const { scrollY } = useScroll();
  const [active, setActive] = useState<string>("inicio");

  useMotionValueEvent(scrollY, "change", (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    setScrolled(y > 50);
    if (y > 200 && y > prev) setHidden(true);
    else setHidden(false);
  });

  useEffect(() => {
    const sections = SECTIONS.map((s) => document.getElementById(s.id)).filter(Boolean);
    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-40% 0px -55% 0px", threshold: 0 }
    );
    sections.forEach((s) => s && observer.observe(s));
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <motion.nav
        animate={{
          y: hidden ? -120 : 0,
        }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
          scrolled ? "py-2" : "py-4"
        }`}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div
            className={`flex items-center justify-between rounded-2xl px-4 sm:px-6 py-3 transition-all duration-500 ${
              scrolled ? "glass-strong" : "bg-transparent"
            }`}
          >
            <Link href="/" className="shrink-0" data-cursor="link">
              <LogoWordmark />
            </Link>

            <div className="hidden lg:flex items-center gap-1">
              {SECTIONS.map((s) => (
                <a
                  key={s.id}
                  href={`#${s.id}`}
                  data-cursor="link"
                  className="relative px-4 py-2 text-sm text-marfil/80 hover:text-marfil transition-colors"
                >
                  {active === s.id && (
                    <motion.span
                      layoutId="nav-active"
                      className="absolute inset-0 rounded-full bg-marfil/[0.08] border border-sol/30"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{s.label}</span>
                </a>
              ))}
            </div>

            <div className="flex items-center gap-3">
              <a
                href={`tel:${PHONE_TEL}`}
                data-cursor="link"
                className="hidden md:inline-flex items-center gap-2 text-sm text-marfil/80 hover:text-sol transition-colors"
              >
                <Phone className="w-4 h-4" />
                <span className="font-mono">{PHONE_DISPLAY}</span>
              </a>
              <a
                href={whatsappLink("Hola Trans Blanco, necesito cotizar un servicio de transporte.")}
                target="_blank"
                rel="noreferrer"
                data-cursor="link"
                className="hidden sm:inline-flex btn-primary shine !py-2.5 !px-5 text-sm"
              >
                Solicitar servicio
              </a>
              <button
                aria-label="Menu"
                onClick={() => setOpen((v) => !v)}
                data-cursor="link"
                className="lg:hidden grid place-items-center w-10 h-10 rounded-full glass"
              >
                {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>
      </motion.nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 lg:hidden bg-volcan/95 backdrop-blur-xl pt-24 px-6"
          >
            <motion.ul
              initial="hidden"
              animate="visible"
              variants={{
                visible: { transition: { staggerChildren: 0.05 } },
              }}
              className="flex flex-col gap-1"
            >
              {SECTIONS.map((s) => (
                <motion.li
                  key={s.id}
                  variants={{
                    hidden: { opacity: 0, y: 16 },
                    visible: { opacity: 1, y: 0 },
                  }}
                >
                  <a
                    href={`#${s.id}`}
                    onClick={() => setOpen(false)}
                    className="block py-4 px-4 text-2xl font-display border-b border-marfil/5"
                  >
                    {s.label}
                  </a>
                </motion.li>
              ))}
            </motion.ul>
            <div className="mt-8 flex flex-col gap-3">
              <a
                href={whatsappLink("Hola Trans Blanco, necesito cotizar un servicio de transporte.")}
                target="_blank"
                rel="noreferrer"
                className="btn-primary"
              >
                Solicitar servicio
              </a>
              <a href={`tel:${PHONE_TEL}`} className="btn-ghost">
                <Phone className="w-4 h-4" />
                {PHONE_DISPLAY}
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
