"use client";

import { useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";
import { motion, useScroll, useSpring, useInView, animate } from "framer-motion";

const EASE = [0.22, 1, 0.36, 1] as const;

/* ── 1. Scroll progress bar ── */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 22, restDelta: 0.001 });
  return (
    <motion.div
      className="fixed top-0 left-0 right-0 z-[100] h-[3px] origin-left bg-gradient-to-r from-ochre via-[#C79A4B] to-ochre"
      style={{ scaleX }}
    />
  );
}

/* ── 2. Animated counter ── */
export function AnimatedCounter({
  from = 0,
  to,
  suffix = "",
  className,
}: {
  from?: number;
  to: number;
  suffix?: string;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const [display, setDisplay] = useState(from);

  useEffect(() => {
    if (!inView) return;
    const ctrl = animate(from, to, {
      duration: 1.8,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => setDisplay(Math.round(v)),
    });
    return () => ctrl.stop();
  }, [inView, from, to]);

  return (
    <span ref={ref} className={className}>
      {display}
      {suffix}
    </span>
  );
}

/* ── 3. Word-by-word heading ── */
export function WordReveal({ text, className }: { text: string; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-8% 0px" });
  const words = text.split(" ");
  return (
    <span ref={ref} className={className}>
      {words.map((w, i) => (
        <span key={i} className="inline-block overflow-hidden leading-[1.15]">
          <motion.span
            className="inline-block"
            initial={{ transform: "translateY(110%)", opacity: 0 }}
            animate={inView ? { transform: "translateY(0%)", opacity: 1 } : { transform: "translateY(110%)", opacity: 0 }}
            transition={{ duration: 0.45, delay: i * 0.03, ease: EASE }}
          >
            {w}
            {i < words.length - 1 ? " " : ""}
          </motion.span>
        </span>
      ))}
    </span>
  );
}

/* ── 4. Shine border button wrapper ── */
export function ShineWrap({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <motion.div
      className={`relative overflow-hidden ${className || ""}`}
      whileHover="hover"
      initial="idle"
    >
      {children}
      <motion.span
        className="pointer-events-none absolute inset-0"
        variants={{
          idle: { opacity: 0 },
          hover: { opacity: 1, transition: { duration: 0.4 } },
        }}
      >
        <span className="absolute inset-[-1px] rounded-[inherit] bg-gradient-to-r from-transparent via-[rgba(250,247,242,0.25)] to-transparent" />
        <motion.span
          className="absolute inset-[-1px] rounded-[inherit]"
          style={{ border: "1px solid rgba(199,154,75,0.5)" }}
          initial={{ opacity: 0, scale: 0.95 }}
          variants={{
            idle: { opacity: 0, scale: 0.95 },
            hover: { opacity: 1, scale: 1, transition: { duration: 0.35, ease: EASE } },
          }}
        />
      </motion.span>
    </motion.div>
  );
}
