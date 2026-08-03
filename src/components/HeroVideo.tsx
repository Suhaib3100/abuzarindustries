"use client";

import { useEffect, useRef, useState } from "react";
import { Film } from "lucide-react";

export default function HeroVideo() {
  const ref = useRef<HTMLVideoElement>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      v.pause();
      return;
    }
    // some browsers need an explicit play() after mount
    v.play().catch(() => {});
  }, []);

  return (
    <div className="relative h-[240px] w-full sm:h-[360px] lg:h-[520px]">
      {/* framed glass stage */}
      <div className="absolute inset-0 overflow-hidden rounded-[28px] border border-walnut/10 bg-gradient-to-br from-panel/80 via-paper/40 to-ochre-soft/30 shadow-[0_40px_90px_-40px_rgba(90,61,36,0.45)]">
        <video
          ref={ref}
          className={`h-full w-full object-cover transition-opacity duration-700 ${ready ? "opacity-100" : "opacity-0"}`}
          src="/videos/timber-hero.mp4"
          poster="/timber-hero-poster.jpg"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          onCanPlay={() => setReady(true)}
        />
        {/* warm tint + inner highlight to blend the clip into the page */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-walnut/20 via-transparent to-paper/10" />
        <div className="pointer-events-none absolute inset-0 rounded-[28px] shadow-[inset_0_1px_0_rgba(255,255,255,0.5)]" />
      </div>

      {/* label */}
      <div className="pointer-events-none absolute left-4 top-4 z-10 inline-flex items-center gap-2 rounded-full border border-walnut/10 bg-paper/80 px-3 py-1.5 backdrop-blur-md">
        <Film size={13} className="text-ochre" />
        <span className="font-mono text-[10px] font-medium uppercase tracking-widest text-ink-soft">
          Our Timber
        </span>
      </div>

      {/* species caption */}
      <div className="pointer-events-none absolute bottom-4 left-1/2 z-10 flex -translate-x-1/2 items-center gap-3 rounded-full border border-walnut/10 bg-paper/80 px-4 py-1.5 backdrop-blur-md">
        {[
          { c: "#8a5a2e", l: "Teak" },
          { c: "#c7a878", l: "White Teak" },
          { c: "#9c854f", l: "Neem" },
        ].map((s) => (
          <span key={s.l} className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full" style={{ background: s.c }} />
            <span className="text-[11px] font-medium text-ink-soft">{s.l}</span>
          </span>
        ))}
      </div>
    </div>
  );
}
