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
  // Don't download the clip until it is near the screen (~2.5 MB each).
  const [near, setNear] = useState(false);

  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setNear(true);
          io.disconnect();
        }
      },
      { rootMargin: "300px" },
    );
    io.observe(v);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    const v = ref.current;
    if (!v || !near) return;
    v.playbackRate = rate;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      v.pause();
      return;
    }
    v.play().catch(() => {});
  }, [rate, near]);

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {/* Poster stays visible underneath until the clip can play (the video is hidden until then). */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={poster} alt="" aria-hidden loading="lazy" className="absolute inset-0 h-full w-full object-cover" />
      <video
        ref={ref}
        className={`relative h-full w-full object-cover transition-opacity duration-700 ${ready ? "opacity-100" : "opacity-0"}`}
        src={near ? src : undefined}
        poster={poster}
        autoPlay
        muted
        loop
        playsInline
        preload="none"
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
