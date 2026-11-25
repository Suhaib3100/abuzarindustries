"use client";

import { useEffect, useRef, useState } from "react";
import { useIsMobile } from "@/lib/useIsMobile";

export default function VideoFrame({
  src,
  poster,
  className = "",
  tint = true,
  rate = 1,
  playOnMobile = false,
}: {
  src: string;
  poster: string;
  className?: string;
  tint?: boolean;
  rate?: number;
  /** Set when the visitor asked for the clip (e.g. tapped play); otherwise phones only get the poster. */
  playOnMobile?: boolean;
}) {
  const ref = useRef<HTMLVideoElement>(null);
  const [ready, setReady] = useState(false);
  const [near, setNear] = useState(false);
  const isMobile = useIsMobile() && !playOnMobile;

  useEffect(() => {
    const v = ref.current;
    if (!v || isMobile) return;
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
  }, [isMobile]);

  useEffect(() => {
    const v = ref.current;
    if (!v || !near || isMobile) return;
    v.playbackRate = rate;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      v.pause();
      return;
    }
    v.play().catch(() => {});
  }, [rate, near, isMobile]);

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={poster} alt="" aria-hidden loading="lazy" className="absolute inset-0 h-full w-full object-cover" />
      {!isMobile && (
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
      )}
      {tint && (
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-walnut/25 via-transparent to-transparent" />
      )}
    </div>
  );
}
