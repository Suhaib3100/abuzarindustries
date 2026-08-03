"use client";

import { Ruler, Scissors, Truck } from "lucide-react";
import VideoFrame from "./VideoFrame";
import { Reveal } from "./motion/Reveal";

const steps = [
  {
    icon: Ruler,
    n: "01",
    title: "You Send Sizes",
    desc: "Share your exact Length × Width × Thickness on WhatsApp or our calculator.",
  },
  {
    icon: Scissors,
    n: "02",
    title: "We Cut to Spec",
    desc: "Premium teak, white teak or neem — precision cut with zero waste.",
  },
  {
    icon: Truck,
    n: "03",
    title: "Delivered to Site",
    desc: "Reliable delivery from our Chitradurga yard across Karnataka.",
  },
];

export default function Process() {
  return (
    <section id="process" className="py-24 sm:py-32 relative overflow-hidden">
      {/* warm top-light */}
      <div className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-[80%] h-px bg-gradient-to-r from-transparent via-walnut/20 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-8 lg:gap-16 lg:grid-cols-2">
          {/* video */}
          <Reveal>
            <div className="relative aspect-video overflow-hidden rounded-3xl border border-walnut/10 shadow-lg">
              <VideoFrame src="/videos/saw-cutting.mp4" poster="/saw-cutting-poster.jpg" className="h-full w-full" />
              <div className="pointer-events-none absolute left-4 top-4 z-10 inline-flex items-center gap-2 rounded-full border border-white/20 bg-black/30 px-3 py-1.5 backdrop-blur-md">
                <Scissors size={13} className="text-ochre-soft" />
                <span className="font-mono text-[10px] font-medium uppercase tracking-widest text-paper">Precision Cutting</span>
              </div>
            </div>
          </Reveal>

          {/* steps */}
          <Reveal>
            <div className="flex items-center gap-3 mb-5">
              <span className="rule-gold" />
              <span className="eyebrow text-ochre">How We Work</span>
            </div>
            <h2 className="t-h2 text-walnut mb-10">
              From Log to<br />
              <span className="gold-text italic">Your Doorstep</span>
            </h2>

            <div className="space-y-7">
              {steps.map((s) => (
                <div key={s.title} className="flex items-start gap-5 group">
                  <div className="relative shrink-0 mt-0.5">
                    <div className="w-11 h-11 rounded-xl bg-ochre/10 grid place-items-center transition-colors duration-300 group-hover:bg-ochre/20">
                      <s.icon size={19} className="text-ochre" strokeWidth={1.75} />
                    </div>
                    <span className="absolute -top-2 -right-1.5 w-5 h-5 rounded-full bg-walnut text-paper text-[9px] font-bold grid place-items-center leading-none">
                      {s.n}
                    </span>
                  </div>
                  <div className="pt-1">
                    <h3 className="font-[family:var(--font-serif)] font-semibold text-lg text-walnut mb-1">{s.title}</h3>
                    <p className="text-sm text-ink-soft/80 leading-relaxed">{s.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
