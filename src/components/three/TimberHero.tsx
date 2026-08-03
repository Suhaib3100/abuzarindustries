"use client";

import dynamic from "next/dynamic";
import { Move3d, Boxes } from "lucide-react";

const TimberScene = dynamic(() => import("./TimberScene"), {
  ssr: false,
  loading: () => <Poster />,
});

function Poster() {
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(185,119,46,0.18),transparent_65%)]" />
      <div className="flex flex-col items-center gap-3 text-ink-soft/60">
        <span className="relative flex h-9 w-9">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-ochre/30" />
          <span className="relative inline-flex h-9 w-9 items-center justify-center rounded-full bg-ochre/15">
            <Boxes size={18} className="text-ochre" />
          </span>
        </span>
        <span className="font-mono text-[11px] uppercase tracking-widest">
          Loading&nbsp;3D&nbsp;stack…
        </span>
      </div>
    </div>
  );
}

export default function TimberHero() {
  return (
    <div className="relative h-[360px] w-full sm:h-[440px] lg:h-[560px]">
      {/* framed glass stage */}
      <div className="absolute inset-0 overflow-hidden rounded-[28px] border border-walnut/10 bg-gradient-to-br from-panel/80 via-paper/40 to-ochre-soft/30 shadow-[0_40px_90px_-40px_rgba(90,61,36,0.45)] backdrop-blur-[2px]">
        {/* soft inner vignette */}
        <div className="pointer-events-none absolute inset-0 rounded-[28px] shadow-[inset_0_1px_0_rgba(255,255,255,0.5)]" />
        <TimberScene />
      </div>

      {/* interactive badge */}
      <div className="pointer-events-none absolute left-4 top-4 z-10 inline-flex items-center gap-2 rounded-full border border-walnut/10 bg-paper/80 px-3 py-1.5 backdrop-blur-md">
        <Move3d size={13} className="text-ochre" />
        <span className="font-mono text-[10px] font-medium uppercase tracking-widest text-ink-soft">
          Drag to rotate
        </span>
      </div>

      {/* species caption */}
      <div className="pointer-events-none absolute bottom-4 left-1/2 z-10 flex -translate-x-1/2 items-center gap-3 rounded-full border border-walnut/10 bg-paper/80 px-4 py-1.5 backdrop-blur-md">
        {[
          { c: "#7A4B24", l: "Teak" },
          { c: "#C9A876", l: "White Teak" },
          { c: "#8C7A4A", l: "Neem" },
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
