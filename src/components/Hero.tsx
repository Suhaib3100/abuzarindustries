"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Shield, Truck, BadgeCheck } from "lucide-react";
import HeroVideo from "./HeroVideo";
import { WordReveal, ShineWrap } from "./motion/Patterns";

const EASE = [0.22, 1, 0.36, 1] as const;
const fadeUp = {
  hidden: { opacity: 0, transform: "translateY(28px)" },
  visible: (i = 0) => ({
    opacity: 1,
    transform: "translateY(0px)",
    transition: { duration: 0.85, delay: 0.15 + i * 0.11, ease: EASE },
  }),
};

const stamps = [
  { icon: Shield, label: "Trusted Since 1995" },
  { icon: Truck, label: "Across Karnataka" },
  { icon: BadgeCheck, label: "Custom Cut Sizes" },
];

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const videoY = useTransform(scrollYProgress, [0, 1], [0, 90]);
  const copyY = useTransform(scrollYProgress, [0, 1], [0, 40]);
  const fade = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section
      ref={ref}
      id="hero"
      className="relative min-h-[100dvh] flex items-center overflow-hidden grain-overlay"
    >
      {/* warm depth field */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[18%] -left-40 w-[32rem] h-[32rem] rounded-full bg-ochre/10 blur-[120px]" />
        <div className="absolute bottom-[10%] -right-40 w-[34rem] h-[34rem] rounded-full bg-walnut/12 blur-[130px]" />
        <div className="absolute inset-0 bg-[radial-gradient(rgba(90,61,36,0.05)_0.6px,transparent_0.6px)] [background-size:26px_26px] opacity-60" />
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12 sm:pt-20 sm:pb-16 lg:py-28">
        <div className="grid items-center gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-10">
          {/* ---------- Left: copy ---------- */}
          <motion.div style={{ y: copyY, opacity: fade }} className="text-center lg:text-left">
            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={0}
              className="inline-flex items-center gap-3 mb-7"
            >
              <span className="rule-gold hidden sm:block" />
              <span className="eyebrow text-ochre">Chitradurga&apos;s Timber House</span>
            </motion.div>

            <h1 className="t-display text-walnut">
              <WordReveal text="Premium Timber," />
              <br />
              <span className="gold-text italic font-[500]">
                <WordReveal text="Cut Your Way" />
              </span>
            </h1>

            <motion.p
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={2}
              className="mt-7 max-w-lg mx-auto lg:mx-0 text-base sm:text-[17px] text-ink-soft/85 leading-relaxed"
            >
              Imported teak, white teak and neem — seasoned, graded and cut to
              your exact specification. Three generations of timber craft since
              1995.
            </motion.p>

            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={3}
              className="mt-10 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4"
            >
              <ShineWrap className="rounded-full">
                <a
                  href="/calculator"
                  className="relative z-10 inline-flex items-center gap-2 px-10 py-4.5 rounded-full bg-walnut text-paper text-sm font-semibold tracking-wide transition-[background] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:bg-walnut-2 pressable shadow-[0_20px_50px_-20px_rgba(90,61,36,0.7)]"
                >
                  Build a Quotation
                  <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                </a>
              </ShineWrap>
              <ShineWrap className="rounded-full">
                <a
                  href="https://wa.me/919845378626?text=Hi%20Abuzar%20Industries%2C%20I%20want%20to%20check%20timber%20prices%20and%20availability"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative z-10 inline-flex items-center px-6 py-3 rounded-full border border-walnut/15 text-ink-soft/50 text-xs font-semibold tracking-wide transition-[border-color,color,background,transform] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:border-walnut hover:text-walnut hover:bg-panel/60 pressable"
                >
                  WhatsApp Us
                </a>
              </ShineWrap>
            </motion.div>

            {/* trust bar */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={4}
              className="mt-14 flex flex-wrap items-center justify-center lg:justify-start gap-x-8 gap-y-4"
            >
              {stamps.map((s, i) => (
                <div key={s.label} className="flex items-center gap-6">
                  {i > 0 && <span className="hidden sm:block h-8 w-px bg-walnut/12" />}
                  <span className="flex items-center gap-2.5 text-ink-soft/70">
                    <s.icon size={16} className="text-ochre" strokeWidth={1.75} />
                    <span className="text-xs font-medium tracking-wide uppercase">{s.label}</span>
                  </span>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* ---------- Right: cinematic timber video ---------- */}
          <motion.div
            style={{ y: videoY }}
            initial={{ opacity: 0, transform: "scale(0.95)" }}
            animate={{ opacity: 1, transform: "scale(1)" }}
            transition={{ duration: 1, delay: 0.35, ease: EASE }}
          >
            <HeroVideo />
          </motion.div>
        </div>
      </div>

      {/* scroll cue */}
      <motion.a
        href="#services"
        aria-label="Scroll to explore"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 0.8 }}
        style={{ opacity: fade }}
        className="absolute bottom-7 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-ink-soft/45 hover:text-ochre transition-colors"
      >
        <span className="eyebrow text-[0.6rem]">Scroll</span>
        <span className="relative h-9 w-[22px] rounded-full border border-current">
          <motion.span
            className="absolute left-1/2 top-1.5 -translate-x-1/2 h-1.5 w-1.5 rounded-full bg-current"
            animate={{ y: [0, 12, 0], opacity: [1, 0.3, 1] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          />
        </span>
      </motion.a>
    </section>
  );
}
