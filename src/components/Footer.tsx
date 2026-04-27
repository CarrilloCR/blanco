"use client";

import { motion } from "framer-motion";
import { LogoMark } from "./LogoMark";
import {
  PHONE_DISPLAY,
  PHONE_TEL,
  EMAIL,
  whatsappLink,
  SECTIONS,
} from "@/lib/utils";
import { ArrowUpRight, Instagram, Facebook } from "lucide-react";

export default function Footer() {
  return (
    <footer className="relative pt-24 pb-10 overflow-hidden border-t border-marfil/5">
      <div className="absolute inset-0 pointer-events-none stripe-cr opacity-[0.025]" />
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-sol/40 to-transparent" />

      {/* Big wordmark above footer content */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mb-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <h3 className="font-display text-[clamp(3rem,12vw,11rem)] leading-[0.85] tracking-tight">
            <span className="text-marfil/10">Trans</span>{" "}
            <span className="italic gradient-text">Blanco</span>
          </h3>
          <p className="text-arena/60 text-sm font-mono tracking-[0.4em] mt-4">
            COSTA RICA · DESDE 2013
          </p>
        </motion.div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-12 gap-10 md:gap-8 pb-12 border-b border-marfil/10">
          {/* Brand */}
          <div className="md:col-span-5 space-y-5">
            <div className="flex items-center gap-3">
              <LogoMark size={56} />
              <div className="leading-none">
                <div className="font-display tracking-[0.35em] text-[10px] text-arena uppercase">
                  Trans
                </div>
                <div className="font-display text-3xl font-semibold tracking-tight text-marfil mt-0.5">
                  Blanco
                </div>
              </div>
            </div>
            <p className="text-marfil/60 text-sm leading-relaxed max-w-sm">
              Transporte privado terrestre en Costa Rica. Microbuses, traslados
              al aeropuerto, eventos y cuentas empresariales.
            </p>
            <div className="flex items-center gap-2">
              {[Instagram, Facebook].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  data-cursor="link"
                  className="w-10 h-10 rounded-full glass grid place-items-center text-marfil/70 hover:text-sol hover:border-sol/40 transition-all"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Nav */}
          <div className="md:col-span-3">
            <div className="text-[10px] font-mono tracking-widest text-marfil/40 mb-4">
              NAVEGACIÓN
            </div>
            <ul className="space-y-2.5">
              {SECTIONS.map((s) => (
                <li key={s.id}>
                  <a
                    href={`#${s.id}`}
                    data-cursor="link"
                    className="text-marfil/70 hover:text-sol text-sm transition-colors"
                  >
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="md:col-span-4">
            <div className="text-[10px] font-mono tracking-widest text-marfil/40 mb-4">
              CONTACTO
            </div>
            <ul className="space-y-3">
              <li>
                <a
                  href={whatsappLink()}
                  target="_blank"
                  rel="noreferrer"
                  data-cursor="link"
                  className="group flex items-center justify-between text-marfil/80 hover:text-sol text-sm transition-colors"
                >
                  <span>
                    WhatsApp · <span className="font-mono">{PHONE_DISPLAY}</span>
                  </span>
                  <ArrowUpRight className="w-4 h-4 opacity-50 group-hover:opacity-100" />
                </a>
              </li>
              <li>
                <a
                  href={`tel:${PHONE_TEL}`}
                  data-cursor="link"
                  className="group flex items-center justify-between text-marfil/80 hover:text-sol text-sm transition-colors"
                >
                  <span>
                    Teléfono · <span className="font-mono">{PHONE_DISPLAY}</span>
                  </span>
                  <ArrowUpRight className="w-4 h-4 opacity-50 group-hover:opacity-100" />
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${EMAIL}`}
                  data-cursor="link"
                  className="group flex items-center justify-between text-marfil/80 hover:text-sol text-sm transition-colors"
                >
                  <span className="font-mono">{EMAIL}</span>
                  <ArrowUpRight className="w-4 h-4 opacity-50 group-hover:opacity-100" />
                </a>
              </li>
              <li className="pt-2 text-marfil/50 text-sm">
                San Ramón, Alajuela · Costa Rica
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom strip */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-marfil/40 font-mono tracking-wide">
          <div>
            © {new Date().getFullYear()} Trans Blanco · Todos los derechos
            reservados
          </div>
          <div className="flex items-center gap-6">
            <span>Cédula jurídica 3-101-XXXXXX</span>
            <span className="hidden sm:inline">Pura vida 🇨🇷</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
