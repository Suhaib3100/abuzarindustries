"use client";

import { MapPin, Phone, Mail, Clock, Send, ArrowUpRight } from "lucide-react";
import { Reveal, Stagger, StaggerItem } from "./motion/Reveal";

const PHONE = "+919845378626";

const contacts = [
  { icon: Phone, label: "Call Us", value: "+91 98453 78626", href: "tel:+919845378626" },
  { icon: Mail, label: "Email", value: "abuzarindustries@gmail.com", href: "mailto:abuzarindustries@gmail.com" },
  { icon: MapPin, label: "Our Yard", value: "KSSIDC Industrial Area, DVG Road, Chitradurga · Mon–Sat 9AM–7PM", href: "https://maps.google.com/?q=14.2264826,76.3863472" },
  { icon: Clock, label: "WhatsApp", value: "Quick replies within minutes", href: `https://wa.me/919845378626` },
];

export default function Contact() {
  return (
    <section id="contact" className="py-24 sm:py-32 relative">
      <div className="pointer-events-none absolute bottom-0 left-0 w-[26rem] h-[26rem] bg-ochre/6 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* header */}
        <Reveal className="max-w-2xl mx-auto text-center mb-14">
          <div className="flex items-center justify-center gap-3 mb-5">
            <span className="rule-gold" />
            <span className="eyebrow text-ochre">Contact</span>
            <span className="rule-gold" />
          </div>
          <h2 className="t-h2 text-walnut">
            Everything starts <span className="gold-text italic">with a call</span>
          </h2>
          <p className="mt-5 text-ink-soft/80 text-base leading-relaxed max-w-md mx-auto">
            Visit our yard, call or send a message — we reply within minutes.
          </p>
        </Reveal>

        <div className="grid lg:grid-cols-2 gap-10 items-start">
          {/* Cards */}
          <Stagger className="space-y-4">
            {contacts.map((c) => (
              <StaggerItem key={c.label}>
                {c.href ? (
                  <a
                    href={c.href}
                    target={c.href.startsWith("http") ? "_blank" : undefined}
                    rel="noopener noreferrer"
                    className="card-premium group flex items-center gap-4 p-5 rounded-xl"
                  >
                    <div className="w-11 h-11 rounded-xl bg-ochre/10 grid place-items-center shrink-0 transition-colors duration-300 group-hover:bg-ochre/20">
                      <c.icon size={19} className="text-ochre" strokeWidth={1.75} />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="eyebrow text-[0.6rem] text-ink-soft/50 mb-0.5">{c.label}</div>
                      <div className="font-[family:var(--font-serif)] font-semibold text-[15px] text-walnut group-hover:text-ochre transition-colors duration-300">
                        {c.value}
                      </div>
                    </div>
                    <ArrowUpRight size={15} className="text-ink-soft/30 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" strokeWidth={1.75} />
                  </a>
                ) : (
                  <div className="card-premium flex items-center gap-4 p-5 rounded-xl">
                    <div className="w-11 h-11 rounded-xl bg-ochre/10 grid place-items-center shrink-0">
                      <c.icon size={19} className="text-ochre" strokeWidth={1.75} />
                    </div>
                    <div>
                      <div className="eyebrow text-[0.6rem] text-ink-soft/50 mb-0.5">{c.label}</div>
                      <div className="text-sm text-ink/80 whitespace-pre-line">{c.value}</div>
                    </div>
                  </div>
                )}
              </StaggerItem>
            ))}
          </Stagger>

          {/* Form */}
          <Reveal>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const fd = new FormData(e.currentTarget);
                const name = fd.get("name");
                const msg = fd.get("message");
                window.open(`https://wa.me/919845378626?text=${encodeURIComponent(`Hi, I'm ${name}. ${msg}`)}`, "_blank");
              }}
              className="card-premium p-7 sm:p-8 rounded-2xl"
            >
              <div className="flex items-center gap-3 mb-7">
                <div className="h-px flex-1 bg-walnut/10" />
                <span className="eyebrow text-ink-soft/45">Message</span>
                <div className="h-px flex-1 bg-walnut/10" />
              </div>

              <div className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-xs font-semibold tracking-wider uppercase text-ink-soft/50 mb-1.5">
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
                  <label htmlFor="message" className="block text-xs font-semibold tracking-wider uppercase text-ink-soft/50 mb-1.5">
                    Your Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={4}
                    placeholder="Tell us about your wood requirement…"
                    className="w-full px-3.5 py-2.5 text-sm rounded-xl bg-panel border border-walnut/10 focus:border-ochre/40 focus:ring-2 focus:ring-ochre/10 outline-none transition-[border-color,box-shadow] text-ink placeholder:text-ink-soft/30 resize-none"
                  />
                </div>
                <button
                  type="submit"
                  className="sheen group w-full inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-full bg-walnut text-paper text-sm font-semibold transition-[background,transform] duration-300 hover:bg-walnut-2 pressable"
                >
                  <Send size={15} />
                  Send via WhatsApp
                </button>
              </div>
            </form>
          </Reveal>
        </div>

        {/* Map */}
        <Reveal className="mt-14 max-w-5xl mx-auto px-4 sm:px-6">
          <div className="rounded-2xl overflow-hidden border border-walnut/10 shadow-md">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1940!2d76.3906535!3d14.2304243!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bba75de8a42ad97%3A0x9a8be15dab4a6208!2sABUZAR%20INDUSTRIES!5e0!3m2!1sen!2sin!4v1"
              width="100%"
              height="280"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Abuzar Industries — KSSIDC Industrial Area, Chitradurga"
            />
          </div>
          <p className="mt-2 text-xs text-center text-ink-soft/40">
            KSSIDC Industrial Area, DVG Road, Chitradurga, Karnataka 577501
          </p>
        </Reveal>
      </div>
    </section>
  );
}
