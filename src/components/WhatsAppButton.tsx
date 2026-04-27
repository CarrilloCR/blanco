"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { whatsappLink } from "@/lib/utils";

export default function WhatsAppButton() {
  const [visible, setVisible] = useState(false);
  const [labelOpen, setLabelOpen] = useState(false);

  useEffect(() => {
    function onScroll() {
      setVisible(window.scrollY > 400);
    }
    window.addEventListener("scroll", onScroll);
    onScroll();

    const t = setTimeout(() => setLabelOpen(true), 1500);
    const t2 = setTimeout(() => setLabelOpen(false), 6000);
    return () => {
      window.removeEventListener("scroll", onScroll);
      clearTimeout(t);
      clearTimeout(t2);
    };
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.6, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.6, y: 30 }}
          transition={{ type: "spring", stiffness: 280, damping: 22 }}
          className="fixed bottom-5 right-5 z-50 flex items-center gap-3"
        >
          <AnimatePresence>
            {labelOpen && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="hidden sm:block glass-strong px-4 py-2.5 rounded-full text-sm whitespace-nowrap"
              >
                ¿Cotizamos su viaje?
              </motion.div>
            )}
          </AnimatePresence>

          <a
            href={whatsappLink("Hola Trans Blanco, vengo desde su sitio web.")}
            target="_blank"
            rel="noreferrer"
            data-cursor="link"
            aria-label="Contactar por WhatsApp"
            className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-[#25D366] grid place-items-center shadow-2xl shadow-[#25D366]/30 hover:scale-110 transition-transform"
          >
            <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-30" />
            <svg
              viewBox="0 0 24 24"
              className="relative w-7 h-7 sm:w-8 sm:h-8 fill-white"
              aria-hidden
            >
              <path d="M19.05 4.91A9.816 9.816 0 0 0 12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38a9.91 9.91 0 0 0 4.74 1.21c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01zm-7.01 15.24c-1.48 0-2.93-.4-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.264 8.264 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.24-8.24 2.2 0 4.27.86 5.82 2.42a8.183 8.183 0 0 1 2.41 5.83c.02 4.54-3.68 8.23-8.22 8.23zm4.52-6.16c-.25-.12-1.47-.72-1.69-.81-.23-.08-.39-.12-.56.12-.17.25-.64.81-.78.97-.14.17-.29.19-.54.06-.25-.12-1.05-.39-1.99-1.23-.74-.66-1.23-1.47-1.38-1.72-.14-.25-.02-.38.11-.51.11-.11.25-.29.37-.43.12-.14.17-.25.25-.41.08-.17.04-.31-.02-.43-.06-.12-.56-1.34-.76-1.84-.2-.48-.41-.42-.56-.43h-.48c-.17 0-.43.06-.66.31-.22.25-.86.85-.86 2.07 0 1.22.89 2.4 1.01 2.56.12.17 1.75 2.67 4.23 3.74.59.26 1.05.41 1.41.52.59.19 1.13.16 1.56.1.48-.07 1.47-.6 1.67-1.18.21-.58.21-1.07.14-1.18-.06-.11-.22-.16-.47-.28z" />
            </svg>
          </a>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
