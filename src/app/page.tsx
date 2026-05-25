import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Services from "@/components/Services";
import Fleet from "@/components/Fleet";
import CostaRicaMap from "@/components/CostaRicaMap";
import Gallery from "@/components/Gallery";
import Process from "@/components/Process";
import Testimonials from "@/components/Testimonials";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import Marquee from "@/components/Marquee";
import ThemeToggle from "@/components/ThemeToggle";
import GlobalAurora from "@/components/GlobalAurora";

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
