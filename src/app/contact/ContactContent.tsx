"use client";

import { motion } from "framer-motion";
import { MapPin, Phone, Mail, Clock, Send, MessageCircle } from "lucide-react";

const PHONE = "919845378626";

const cards = [
  {
    icon: Phone,
    label: "Call Us",
    value: "+91 98453 78626",
    href: "tel:+919845378626",
  },
  {
    icon: MessageCircle,
    label: "WhatsApp",
    value: "Quick replies within minutes",
    href: `https://wa.me/${PHONE}?text=${encodeURIComponent("Hi Abuzar Industries, I want to enquire about timber.")}`,
  },
  {
    icon: MapPin,
    label: "Visit Our Yard",
    value: "KSSIDC Industrial Area, DVG Road,\nChitradurga, Karnataka",
    href: "https://maps.google.com/?q=KSSIDC+Industrial+Area+DVG+Road+Chitradurga",
  },
  {
    icon: Clock,
    label: "Working Hours",
    value: "Monday – Saturday\n9:00 AM – 7:00 PM",
    href: null,
  },
];

export default function ContactContent() {
  return (
    <div className="pt-24 pb-16">
      {/* Header */}
      <section className="py-12 sm:py-16 bg-pattern">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <motion.div
            initial={{ opacity: 0, transform: "translateY(20px) scale(0.97)" }}
            animate={{ opacity: 1, transform: "translateY(0px) scale(1)" }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block px-4 py-1.5 rounded-full bg-ochre/10 border border-ochre/20 text-ochre text-xs font-semibold tracking-wider uppercase mb-6">
              Contact
            </span>
            <h1 className="font-[family:var(--font-display)] font-bold text-5xl sm:text-6xl leading-[0.95] tracking-tight text-walnut">
              Get in
              <br />
              <span className="text-ochre">Touch</span>
            </h1>
            <p className="mt-5 max-w-xl mx-auto text-base text-ink-soft/80 leading-relaxed">
              Call us, visit our timber yard in Chitradurga, or send a message —
              we reply within minutes on WhatsApp.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-6">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {/* Contact cards */}
            <motion.div
              initial={{ opacity: 0, transform: "translateX(-20px) scale(0.97)" }}
              animate={{ opacity: 1, transform: "translateX(0px) scale(1)" }}
              transition={{ delay: 0.15 }}
              className="space-y-4"
            >
              {cards.map((c) => (
                <div
                  key={c.label}
                  className="flex items-start gap-4 p-5 rounded-xl bg-paper border border-walnut/5 hover:border-ochre/20 transition-colors"
                >
                  <div className="w-10 h-10 rounded-xl bg-ochre/10 flex items-center justify-center shrink-0">
                    <c.icon size={18} className="text-ochre" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-xs font-semibold tracking-wider uppercase text-ink-soft/60 mb-0.5">
                      {c.label}
                    </div>
                    {c.href ? (
                      <a
                        href={c.href}
                        target={c.href.startsWith("http") ? "_blank" : undefined}
                        rel={
                          c.href.startsWith("http")
                            ? "noopener noreferrer"
                            : undefined
                        }
                        className="font-semibold text-walnut hover:text-ochre transition-colors whitespace-pre-line"
                      >
                        {c.value}
                      </a>
                    ) : (
                      <div className="text-sm text-ink/80 whitespace-pre-line">
                        {c.value}
                      </div>
                    )}
                  </div>
                </div>
              ))}

              {/* Map */}
              <div className="rounded-xl overflow-hidden border border-walnut/5 aspect-[16/9]">
                <iframe
                  title="Abuzar Industries — KSSIDC Industrial Area, DVG Road, Chitradurga"
                  src="https://www.google.com/maps?q=KSSIDC+Industrial+Area,+DVG+Road,+Chitradurga,+Karnataka&output=embed"
                  className="w-full h-full border-0"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  allowFullScreen
                />
              </div>
            </motion.div>

            {/* Contact form */}
            <motion.form
              initial={{ opacity: 0, transform: "translateX(20px) scale(0.97)" }}
              animate={{ opacity: 1, transform: "translateX(0px) scale(1)" }}
              transition={{ delay: 0.25 }}
              onSubmit={(e) => {
                e.preventDefault();
                const fd = new FormData(e.currentTarget);
                const name = fd.get("name");
                const phone = fd.get("phone");
                const msg = fd.get("message");
                let text = `Hi, I'm ${name}.`;
                if (phone) text += ` (${phone})`;
                text += ` ${msg}`;
                window.open(
                  `https://wa.me/${PHONE}?text=${encodeURIComponent(text)}`,
                  "_blank",
                  "noopener,noreferrer",
                );
              }}
              className="p-6 sm:p-8 rounded-2xl bg-paper border border-walnut/5 shadow-lg shadow-walnut/5 h-fit"
            >
              <h2 className="font-[family:var(--font-display)] font-bold text-xl text-walnut mb-6">
                Send a Message
              </h2>
              <div className="space-y-4">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-xs font-semibold tracking-wider uppercase text-ink-soft/60 mb-1.5"
                  >
                    Your Name
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    placeholder="e.g. Rajesh"
                    className="w-full px-3.5 py-2.5 text-sm rounded-xl bg-panel border border-walnut/10 focus:border-ochre/40 focus:ring-2 focus:ring-ochre/10 outline-none transition-[border-color,box-shadow] text-ink placeholder:text-ink-soft/30"
                  />
                </div>
                <div>
                  <label
                    htmlFor="phone"
                    className="block text-xs font-semibold tracking-wider uppercase text-ink-soft/60 mb-1.5"
                  >
                    Phone (optional)
                  </label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    placeholder="+91 98765 43210"
                    className="w-full px-3.5 py-2.5 text-sm rounded-xl bg-panel border border-walnut/10 focus:border-ochre/40 focus:ring-2 focus:ring-ochre/10 outline-none transition-[border-color,box-shadow] text-ink placeholder:text-ink-soft/30"
                  />
                </div>
                <div>
                  <label
                    htmlFor="message"
                    className="block text-xs font-semibold tracking-wider uppercase text-ink-soft/60 mb-1.5"
                  >
                    Your Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={5}
                    placeholder="Tell us about your wood requirement..."
                    className="w-full px-3.5 py-2.5 text-sm rounded-xl bg-panel border border-walnut/10 focus:border-ochre/40 focus:ring-2 focus:ring-ochre/10 outline-none transition-[border-color,box-shadow] text-ink placeholder:text-ink-soft/30 resize-none"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl bg-green text-paper text-sm font-semibold hover:bg-green/90 transition-[background,transform] pressable"
                >
                  <Send size={16} />
                  Send via WhatsApp
                </button>
              </div>
            </motion.form>
          </div>
        </div>
      </section>
    </div>
  );
}
