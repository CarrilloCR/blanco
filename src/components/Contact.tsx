"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { MessageCircle, Phone, Mail, MapPin, Send, Loader2 } from "lucide-react";
import { whatsappLink, PHONE_DISPLAY, PHONE_TEL, EMAIL } from "@/lib/utils";
import FloatingShapes from "./FloatingShapes";
import SplitText from "./SplitText";

const initialState = {
  name: "",
  email: "",
  phone: "",
  origin: "",
  destination: "",
  date: "",
  passengers: "",
  message: "",
};

export default function Contact() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [form, setForm] = useState(initialState);
  const [loading, setLoading] = useState(false);

  function set<K extends keyof typeof initialState>(key: K, value: string) {
    setForm((p) => ({ ...p, [key]: value }));
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (loading) return;
    if (!form.name.trim()) { toast.error("Por favor indique su nombre."); return; }
    if (!form.phone.trim() && !form.email.trim()) {
      toast.error("Necesitamos un teléfono o correo para contactarle.");
      return;
    }

    setLoading(true);
    try {
      const { data } = await axios.post("/api/contact", form, { timeout: 8000 });
      if (data?.ok) {
        toast.success(data.message ?? "Solicitud recibida. Le contactaremos pronto.");
        setForm(initialState);
      } else {
        toast.error(data?.error ?? "No pudimos enviar la solicitud.");
      }
    } catch (err: unknown) {
      const e = err as { response?: { data?: { error?: string } } };
      toast.error(e?.response?.data?.error ?? "Error de conexión. Use WhatsApp directamente.");
    } finally {
      setLoading(false);
    }
  }

  const channels = [
    {
      icon: MessageCircle,
      title: "WhatsApp",
      value: PHONE_DISPLAY,
      desc: "Respuesta inmediata · 7 a.m. – 10 p.m.",
      href: whatsappLink(),
      cta: "Abrir chat",
      accent: "selva",
    },
    {
      icon: Phone,
      title: "Teléfono",
      value: PHONE_DISPLAY,
      desc: "Llamadas y solicitudes de voz",
      href: whatsappLink(),
      cta: "Llamar ahora",
      accent: "sol",
    },
    {
      icon: Mail,
      title: "Correo",
      value: EMAIL,
      desc: "Cotizaciones y cuentas empresariales",
      href: `mailto:${EMAIL}`,
      cta: "Escribir correo",
      accent: "arena",
    },
  ];

  return (
    <section id="contacto" ref={ref} className="section-cv relative py-20 sm:py-24 lg:py-32 overflow-hidden">
      <FloatingShapes variant="contact" />
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[80vw] h-[80vw] rounded-full bg-selva/15 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="mb-10 sm:mb-14 max-w-3xl"
        >
          <div className="inline-flex items-center gap-2 text-xs font-mono tracking-[0.3em] text-arena mb-4">
            <span className="w-8 h-px bg-arena" />
            CONTACTO · 08
          </div>
          <h2 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-[0.98] tracking-tight">
            <SplitText text="Solicite su" tag="span" className="block" delay={40} duration={0.8} ease="power3.out" splitType="chars" from={{ opacity: 0, y: 40 }} to={{ opacity: 1, y: 0 }} />
            <SplitText text="próximo servicio." tag="span" className="block italic gradient-text" delay={40} duration={0.8} ease="power3.out" splitType="chars" from={{ opacity: 0, y: 40 }} to={{ opacity: 1, y: 0 }} />
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-12 gap-8">
          {/* Channels */}
          <div className="lg:col-span-5 space-y-4">
            {channels.map((c, i) => (
              <motion.a
                key={c.title}
                href={c.href}
                target={c.href.startsWith("http") ? "_blank" : undefined}
                rel="noreferrer"
                data-cursor="link"
                initial={{ opacity: 0, x: -20 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.1 + i * 0.1 }}
                whileHover={{ x: 4 }}
                className="group block glass rounded-2xl p-5 sm:p-6"
              >
                <div className="flex items-center gap-4">
                  <div
                    className={`w-12 h-12 rounded-xl grid place-items-center shrink-0 ${
                      c.accent === "selva" ? "bg-selva-500/15 text-selva-300"
                      : c.accent === "sol" ? "bg-sol/15 text-sol"
                      : "bg-arena/15 text-arena"
                    }`}
                  >
                    <c.icon className="w-5 h-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-baseline justify-between gap-2">
                      <h3 className="font-display text-lg text-marfil">{c.title}</h3>
                      <span className="text-[10px] font-mono text-marfil/40 group-hover:text-sol transition-colors">
                        {c.cta} →
                      </span>
                    </div>
                    <div className="text-sm text-marfil/80 font-mono mt-0.5 truncate">{c.value}</div>
                    <div className="text-xs text-marfil/40 mt-1">{c.desc}</div>
                  </div>
                </div>
              </motion.a>
            ))}

            <motion.div
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.45 }}
              className="glass rounded-2xl p-5 flex items-center gap-3 text-sm text-marfil/70"
            >
              <MapPin className="w-4 h-4 text-sol shrink-0" />
              <span>San José · Costa Rica · Cobertura nacional</span>
            </motion.div>
          </div>

          {/* Form */}
          <motion.form
            onSubmit={onSubmit}
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="lg:col-span-7 glass rounded-2xl sm:rounded-3xl p-5 sm:p-8 space-y-5"
          >
            <div className="grid sm:grid-cols-2 gap-4">
              <Field label="Nombre *"             value={form.name}        onChange={(v) => set("name", v)}        placeholder="Su nombre o empresa" />
              <Field label="Teléfono / WhatsApp"  value={form.phone}       onChange={(v) => set("phone", v)}       placeholder="+506 8356-6938" type="tel" />
              <Field label="Correo"               value={form.email}       onChange={(v) => set("email", v)}       placeholder="usted@empresa.com" type="email" />
              <Field label="Fecha del servicio"   value={form.date}        onChange={(v) => set("date", v)}        type="date" />
              <Field label="Origen"               value={form.origin}      onChange={(v) => set("origin", v)}      placeholder="Ej: Aeropuerto SJO" />
              <Field label="Destino"              value={form.destination} onChange={(v) => set("destination", v)} placeholder="Ej: Guanacaste" />
            </div>
            <Field
              label="Detalles del servicio"
              value={form.message}
              onChange={(v) => set("message", v)}
              placeholder="Cuéntenos: cantidad de pasajeros, tipo de servicio, equipaje especial, horario…"
              textarea
            />

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pt-2">
              <p className="text-xs text-marfil/40">
                * Requerido. Respondemos en menos de 30 minutos en horario hábil.
              </p>
              <button
                type="submit"
                disabled={loading}
                data-cursor="link"
                className="btn-primary shine disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <><Loader2 className="w-4 h-4 animate-spin" />Enviando...</>
                ) : (
                  <>Enviar solicitud<Send className="w-4 h-4" /></>
                )}
              </button>
            </div>
          </motion.form>
        </div>
      </div>
    </section>
  );
}

function Field({
  label, value, onChange, placeholder, type = "text", textarea,
}: {
  label: string; value: string; onChange: (v: string) => void;
  placeholder?: string; type?: string; textarea?: boolean;
}) {
  const base = "w-full bg-marfil/[0.04] border border-marfil/10 rounded-xl px-4 py-3 text-marfil placeholder-marfil/30 focus:outline-none focus:border-sol/50 focus:bg-marfil/[0.07] transition-all";
  return (
    <label className={textarea ? "block sm:col-span-2" : "block"}>
      <span className="block text-[10px] font-mono tracking-widest text-marfil/50 mb-1.5 uppercase">{label}</span>
      {textarea ? (
        <textarea value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} rows={4} className={`${base} resize-none`} />
      ) : (
        <input type={type} value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} className={base} />
      )}
    </label>
  );
}
