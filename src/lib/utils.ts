import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const WHATSAPP_NUMBER = "50688887777";
export const PHONE_DISPLAY = "+506 8888-7777";
export const PHONE_TEL = "+50688887777";
export const EMAIL = "reservas@transblanco.cr";

export function whatsappLink(message?: string) {
  const text = message
    ? `?text=${encodeURIComponent(message)}`
    : "";
  return `https://wa.me/${WHATSAPP_NUMBER}${text}`;
}

export const SECTIONS = [
  { id: "inicio", label: "Inicio" },
  { id: "nosotros", label: "Nosotros" },
  { id: "servicios", label: "Servicios" },
  { id: "flota", label: "Flota" },
  { id: "rutas", label: "Rutas" },
  { id: "galeria", label: "Galería" },
  { id: "contacto", label: "Contacto" },
] as const;
