import type { Metadata, Viewport } from "next";
import { Inter, Fraunces, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import SmoothScroll from "@/components/SmoothScroll";
import CursorEffect from "@/components/CursorEffect";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
  axes: ["opsz", "SOFT"],
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://transblanco.cr"),
  title: {
    default: "Trans Blanco · Transporte premium en Costa Rica",
    template: "%s · Trans Blanco",
  },
  description:
    "Transporte privado puerta a puerta en Costa Rica. Microbuses cómodos, conductores certificados y rutas a todo el país. Pura vida, puntualidad pura.",
  keywords: [
    "transporte Costa Rica",
    "microbus Costa Rica",
    "transporte privado",
    "shuttle Costa Rica",
    "transfer aeropuerto SJO",
    "Trans Blanco",
  ],
  openGraph: {
    title: "Trans Blanco · Transporte premium en Costa Rica",
    description:
      "Microbuses cómodos, conductores certificados y rutas a todo el país.",
    type: "website",
    locale: "es_CR",
  },
  icons: {
    icon: "/favicon.svg",
    apple: "/favicon.svg",
  },
};

export const viewport: Viewport = {
  themeColor: "#0A1614",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className={`${inter.variable} ${fraunces.variable} ${jetbrains.variable}`}>
      <body className="font-sans bg-volcan text-marfil antialiased">
        <SmoothScroll>
          <CursorEffect />
          {children}
        </SmoothScroll>
        <Toaster
          position="bottom-right"
          toastOptions={{
            style: {
              background: "rgba(10,22,20,0.92)",
              color: "#F8F5EE",
              border: "1px solid rgba(244,185,66,0.3)",
              backdropFilter: "blur(12px)",
              fontFamily: "var(--font-inter)",
            },
            success: { iconTheme: { primary: "#F4B942", secondary: "#0A1614" } },
            error: { iconTheme: { primary: "#DC2626", secondary: "#F8F5EE" } },
          }}
        />
      </body>
    </html>
  );
}
