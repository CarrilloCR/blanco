import dynamic from "next/dynamic";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Services from "@/components/Services";
import GlobalAurora from "@/components/GlobalAurora";
import WhatsAppButton from "@/components/WhatsAppButton";
import ThemeToggle from "@/components/ThemeToggle";

// Below-fold — split bundles, hydrate on demand
const Fleet = dynamic(() => import("@/components/Fleet"));
const CostaRicaMap = dynamic(() => import("@/components/CostaRicaMap"));
const Gallery = dynamic(() => import("@/components/Gallery"));
const Process = dynamic(() => import("@/components/Process"));
const Testimonials = dynamic(() => import("@/components/Testimonials"));
const Contact = dynamic(() => import("@/components/Contact"));
const Footer = dynamic(() => import("@/components/Footer"));
const Marquee = dynamic(() => import("@/components/Marquee"));

export default function Home() {
  return (
    <>
      <GlobalAurora />
      <Navbar />
      <main className="relative overflow-hidden">
        <Hero />
        <About />
        <Services />
        <Marquee />
        <Fleet />
        <CostaRicaMap />
        <Process />
        <Gallery />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
      <WhatsAppButton />
      <ThemeToggle />
    </>
  );
}
