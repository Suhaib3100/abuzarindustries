"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const EASE = [0.22, 1, 0.36, 1] as const;

export default function Preloader() {
  const [done, setDone] = useState(false);

  useEffect(() => {
    // once per tab session; skip for reduced-motion
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce || sessionStorage.getItem("ai_intro")) {
      setDone(true);
      return;
    }
    document.body.style.overflow = "hidden";
    const t = setTimeout(() => {
      sessionStorage.setItem("ai_intro", "1");
      setDone(true);
    }, 2100);
    return () => {
      clearTimeout(t);
      document.body.style.overflow = "";
    };
  }, []);

  useEffect(() => {
    if (done) document.body.style.overflow = "";
  }, [done]);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className="fixed inset-0 z-[200] flex items-center justify-center bg-[#201509]"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.6, ease: EASE } }}
        >
          {/* warm radial glow */}
          <div className="absolute inset-0 bg-[radial-gradient(60%_50%_at_50%_45%,rgba(199,154,75,0.18),transparent_70%)]" />

          <div className="relative flex flex-col items-center gap-6">
            <motion.img
              src="/images/logo-brand-512.png"
              alt="Abuzar Industries"
              className="w-24 h-24 object-contain drop-shadow-[0_10px_30px_rgba(199,154,75,0.35)]"
              initial={{ opacity: 0, transform: "scale(0.82) translateY(8px)" }}
              animate={{ opacity: 1, transform: "scale(1) translateY(0px)" }}
              transition={{ duration: 0.9, ease: EASE }}
            />

            {/* wordmark reveal */}
            <div className="overflow-hidden">
              <motion.p
                className="font-[family:var(--font-serif)] text-2xl sm:text-3xl text-paper tracking-tight"
                initial={{ transform: "translateY(110%)" }}
                animate={{ transform: "translateY(0%)" }}
                transition={{ duration: 0.8, delay: 0.35, ease: EASE }}
              >
                Abuzar <span className="gold-text">Industries</span>
              </motion.p>
            </div>

            {/* gold progress line */}
            <motion.div
              className="h-px w-40 origin-left bg-gradient-to-r from-transparent via-[#C79A4B] to-transparent"
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{ scaleX: 1, opacity: 1 }}
              transition={{ duration: 1.0, delay: 0.5, ease: EASE }}
            />
            <motion.span
              className="eyebrow text-[#C79A4B]/70"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9, duration: 0.6 }}
            >
              Est. 1995 · Chitradurga
            </motion.span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
