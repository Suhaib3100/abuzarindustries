"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Phone } from "lucide-react";

const links = [
  { href: "/", label: "Home" },
  { href: "/products", label: "Products" },
  { href: "/calculator", label: "Calculator" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function Nav() {
  const [open, setOpen] = useState(false);
  const [solid, setSolid] = useState(false);

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.nav
      initial={{ transform: "translateY(-80px)", opacity: 0 }}
      animate={{ transform: "translateY(0px)", opacity: 1 }}
      transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-[background,opacity,box-shadow] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
        solid
          ? "glass-panel border-b border-walnut/8 shadow-[0_10px_30px_-24px_rgba(36,27,18,0.5)]"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`flex items-center justify-between transition-[height,padding] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${solid ? "h-16" : "h-20"}`}>
          {/* Brand */}
          <a href="/" className="flex items-center gap-2.5 group">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/logo-brand-512.png"
              alt="Abuzar Industries"
              className="w-10 h-10 object-contain transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:rotate-[-4deg] group-hover:scale-105"
            />
            <span className="font-[family:var(--font-serif)] font-semibold text-xl tracking-tight text-walnut">
              Abuzar <span className="gold-text">Industries</span>
            </span>
          </a>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-8">
            <div className="flex items-center gap-7">
              {links.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  className="link-underline text-sm font-medium text-ink-soft hover:text-walnut transition-colors duration-300"
                >
                  {l.label}
                </a>
              ))}
            </div>
            <a
              href="tel:+919845378626"
              className="sheen flex items-center gap-2 px-5 py-2.5 rounded-full bg-walnut text-paper text-sm font-semibold hover:bg-walnut-2 transition-colors duration-300"
            >
              <Phone size={14} strokeWidth={2} />
              <span>Call Now</span>
            </a>
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden p-2 rounded-lg text-walnut hover:bg-panel transition-colors"
            aria-label="Toggle menu"
            aria-expanded={open}
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="md:hidden border-t border-walnut/10 bg-paper/98 backdrop-blur-xl overflow-hidden"
          >
            <div className="px-4 py-4 space-y-1">
              {links.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="block px-4 py-3 rounded-xl text-sm font-medium text-ink-soft hover:text-walnut hover:bg-panel transition-colors"
                >
                  {l.label}
                </a>
              ))}
              <a
                href="tel:+919845378626"
                onClick={() => setOpen(false)}
                className="flex items-center gap-2 mt-3 px-4 py-3 rounded-xl bg-walnut text-paper text-sm font-semibold hover:bg-walnut-2 transition-colors"
              >
                <Phone size={16} />
                <span>Call Now</span>
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
