"use client";

import { Shield, Users, Leaf, TrendingUp } from "lucide-react";
import VideoFrame from "./VideoFrame";
import { Reveal, Stagger, StaggerItem } from "./motion/Reveal";
import { AnimatedCounter } from "./motion/Patterns";

const stats = [
  { icon: Shield, to: 30, suffix: "+", label: "Years" },
  { icon: Users, to: 1000, suffix: "+", label: "Clients" },
  { icon: Leaf, to: 50000, suffix: "+", label: "CFT Delivered" },
  { icon: TrendingUp, to: 99, suffix: "%", label: "On-Time" },
];

const values = [
  "Premium imported timber only",
  "Custom dimension cutting",
  "Delivery across Karnataka",
  "Fair and transparent pricing",
];

export default function About() {
  return (
    <section id="about" className="py-24 sm:py-32 relative">
      <div className="pointer-events-none absolute top-0 right-0 w-[30rem] h-[30rem] bg-walnut/4 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-14 items-center">
          {/* Left */}
          <Reveal>
            <div className="relative">
              <div className="relative aspect-[4/3] overflow-hidden rounded-3xl border border-walnut/10 shadow-lg">
                <VideoFrame src="/videos/timber-yard.mp4" poster="/timber-yard-poster.jpg" className="h-full w-full" />
                <div className="pointer-events-none absolute inset-x-0 bottom-0 p-6 bg-gradient-to-t from-walnut/60 via-walnut/20 to-transparent">
                  <span className="font-[family:var(--font-serif)] font-semibold text-2xl text-paper drop-shadow">Since 1995</span>
                  <p className="text-sm text-paper/80 mt-0.5 drop-shadow">Three generations of timber expertise</p>
                </div>
              </div>

              {/* Owner portrait cards */}
              <div className="mt-5 grid grid-cols-2 gap-4">
                {[
                  { initials: "AA", name: "Athaulla Afroz", role: "Founder", img: "/images/afroz.jpg" },
                  { initials: "MA", name: "Mohammed Afsar", role: "Owner", img: "/images/afsar.jpg" },
                ].map((o) => (
                  <div key={o.name} className="card-premium p-4 rounded-xl flex items-center gap-4">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={o.img} alt={o.name} className="w-12 h-12 rounded-full object-cover ring-2 ring-ochre/15" />
                    <div>
                      <div className="font-[family:var(--font-serif)] font-semibold text-sm text-walnut">{o.name}</div>
                      <div className="eyebrow text-[0.6rem] text-ink-soft/60 mt-0.5">{o.role}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>

          {/* Right — copy */}
          <Reveal>
            <div className="flex items-center gap-3 mb-5">
              <span className="rule-gold" />
              <span className="eyebrow text-ochre">About</span>
            </div>
            <h2 className="t-h2 text-walnut mb-6">
              Leading Merchant
              <br />
              <span className="gold-text italic">in Chitradurga</span>
            </h2>
            <div className="space-y-4 text-ink-soft/85 text-sm sm:text-base leading-relaxed">
              <p>
                Founded in 1995 by <strong className="text-walnut">Athaulla Afroz</strong>,
                Abuzar Industries grew from humble beginnings into the leading timber
                supplier in the region — built on quality and trust.
              </p>
              <p>
                Today his son <strong className="text-walnut">Mohammed Afsar</strong> leads,
                blending three decades of craft with modern yard management to serve
                builders, carpenters and craftsmen across Karnataka.
              </p>
              <p>
                Based at KSSIDC Industrial Area, DVG Road, Chitradurga, we maintain
                large stockyards of premium imported timber and cut every plank to
                your spec — zero waste, no compromise.
              </p>
            </div>

            <Stagger className="grid grid-cols-2 gap-3 mt-7">
              {values.map((v) => (
                <StaggerItem key={v}>
                  <div className="flex items-center gap-2.5 text-sm text-ink-soft">
                    <span className="w-[3px] h-[3px] rounded-full bg-ochre shrink-0" />
                    {v}
                  </div>
                </StaggerItem>
              ))}
            </Stagger>
          </Reveal>
        </div>

        {/* Stats */}
        <Stagger className="mt-12 sm:mt-20 grid grid-cols-2 sm:grid-cols-4 gap-px rounded-2xl overflow-hidden bg-walnut/10 border border-walnut/10">
          {stats.map((s) => (
            <StaggerItem key={s.label} className="h-full">
              <div className="h-full bg-paper py-5 sm:py-8 px-3 text-center transition-colors duration-300 hover:bg-panel/50">
                <s.icon size={20} className="text-ochre mx-auto mb-3" strokeWidth={1.75} />
                <div className="font-[family:var(--font-serif)] font-semibold text-3xl text-walnut"><AnimatedCounter from={0} to={s.to} suffix={s.suffix} /></div>
                <div className="eyebrow text-[0.6rem] text-ink-soft/60 mt-1">{s.label}</div>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
