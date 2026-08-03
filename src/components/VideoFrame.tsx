"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Lightweight muted/autoplay/loop background video with a poster fallback.
 * Respects prefers-reduced-motion (pauses, poster stays visible).
 */
export default function VideoFrame({
  src,
  poster,
  className = "",
  tint = true,
  rate = 1,
}: {
  src: string;
  poster: string;
  className?: string;
  tint?: boolean;
  /** Playback speed multiplier (e.g. 0.5 = half speed). */
  rate?: number;
}) {
  const ref = useRef<HTMLVideoElement>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    v.playbackRate = rate;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      v.pause();
      return;
    }
    v.play().catch(() => {});
  }, [rate]);

  return (
    <div className={`relative overflow-hidden ${className}`}>
      <video
        ref={ref}
        className={`h-full w-full object-cover transition-opacity duration-700 ${ready ? "opacity-100" : "opacity-0"}`}
        src={src}
        poster={poster}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        onCanPlay={(e) => {
          e.currentTarget.playbackRate = rate;
          setReady(true);
        }}
      />
      {tint && (
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-walnut/25 via-transparent to-transparent" />
      )}
    </div>
  );
}
