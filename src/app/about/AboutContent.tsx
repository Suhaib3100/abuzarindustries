"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Calendar, Award, Users, TrendingUp, ArrowRight } from "lucide-react";

const values = [
  {
    icon: Award,
    title: "Quality Excellence",
    desc: "Three decades of commitment to providing the highest quality timber products.",
  },
  {
    icon: Users,
    title: "Customer Trust",
    desc: "Building lasting relationships through reliable service and honest business practices.",
  },
  {
    icon: TrendingUp,
    title: "Innovation",
    desc: "Embracing modern technology while maintaining traditional values of craftsmanship.",
  },
];

export default function AboutContent() {
  return (
    <div className="pt-24 pb-16">
      {/* Header */}
      <section className="py-16 sm:py-20 bg-pattern relative">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <motion.div
            initial={{ opacity: 0, transform: "translateY(20px) scale(0.97)" }}
            animate={{ opacity: 1, transform: "translateY(0px) scale(1)" }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-ochre/10 border border-ochre/20 text-ochre text-xs font-semibold tracking-wider uppercase mb-6">
              <Calendar size={13} />
              Established 1995
            </span>
            <h1 className="font-[family:var(--font-display)] font-bold text-5xl sm:text-6xl md:text-7xl leading-[0.95] tracking-tight text-walnut">
              About
              <br />
              <span className="text-ochre">Abuzar Industries</span>
            </h1>
            <p className="mt-6 max-w-2xl mx-auto text-base sm:text-lg text-ink-soft/80 leading-relaxed">
              Three decades of excellence in timber supply — from humble
              beginnings to industry leadership in Chitradurga.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Leadership */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, transform: "translateY(20px) scale(0.97)" }}
            whileInView={{ opacity: 1, transform: "translateY(0px) scale(1)" }}
            viewport={{ once: true, margin: "-60px" }}
            className="bg-paper border border-walnut/5 rounded-3xl shadow-lg shadow-walnut/5 p-8 lg:p-12"
          >
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto_1fr] gap-10 lg:gap-8 items-center">
              {/* Founder */}
              <div className="text-center">
                <div className="w-56 h-72 sm:w-64 sm:h-80 relative overflow-hidden rounded-2xl mx-auto mb-6 shadow-xl border-4 border-paper ring-1 ring-walnut/10">
                  <Image
                    src="/images/afroz.jpg"
                    alt="Athaulla Afroz — Founder of Abuzar Industries"
                    fill
                    className="object-cover object-top"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                </div>
                <h3 className="font-[family:var(--font-display)] font-bold text-2xl text-walnut mb-1">
                  Athaulla Afroz
                </h3>
                <p className="text-ochre font-semibold text-sm mb-4 uppercase tracking-wider">
                  Chairman & Founder (1995)
                </p>
                <p className="text-sm text-ink-soft/80 leading-relaxed max-w-sm mx-auto">
                  Founded Abuzar Industries in 1995 after facing numerous
                  struggles and challenges. With determination and vision, he
                  built the company from the ground up, establishing a
                  reputation for quality timber supply in the construction
                  industry.
                </p>
                <div className="inline-flex items-center gap-2 mt-5 px-4 py-2 bg-walnut text-paper rounded-full text-xs font-semibold">
                  <Calendar size={13} />
                  Started in 1995
                </div>
              </div>

              {/* Transition arrow */}
              <div className="hidden lg:flex flex-col items-center gap-2">
                <div className="w-14 h-14 rounded-full bg-gradient-to-r from-walnut to-ochre flex items-center justify-center shadow-lg">
                  <ArrowRight size={22} className="text-paper" />
                </div>
                <span className="text-xs font-semibold text-ochre uppercase tracking-wider">
                  Legacy
                </span>
              </div>

              {/* Current owner */}
              <div className="text-center">
                <div className="w-56 h-72 sm:w-64 sm:h-80 relative overflow-hidden rounded-2xl mx-auto mb-6 shadow-xl border-4 border-paper ring-1 ring-walnut/10">
                  <Image
                    src="/images/afsar.jpg"
                    alt="Mohammed Afsar — Current Owner of Abuzar Industries"
                    fill
                    className="object-cover object-top"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                </div>
                <h3 className="font-[family:var(--font-display)] font-bold text-2xl text-walnut mb-1">
                  Mohammed Afsar
                </h3>
                <p className="text-ochre font-semibold text-sm mb-4 uppercase tracking-wider">
                  Current Owner & Leader
                </p>
                <p className="text-sm text-ink-soft/80 leading-relaxed max-w-sm mx-auto">
                  Son of Athaulla Afroz, now leading Abuzar Industries with
                  modern approaches and continued excellence. Under his
                  leadership, the company has expanded its reach and maintained
                  the highest standards of timber quality and customer service.
                </p>
                <div className="inline-flex items-center gap-2 mt-5 px-4 py-2 bg-gradient-to-r from-walnut to-ochre text-paper rounded-full text-xs font-semibold">
                  <TrendingUp size={13} />
                  Leading Now
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 bg-panel/50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, transform: "translateY(20px) scale(0.97)" }}
            whileInView={{ opacity: 1, transform: "translateY(0px) scale(1)" }}
            viewport={{ once: true, margin: "-60px" }}
            className="text-center mb-12"
          >
            <h2 className="font-[family:var(--font-display)] font-bold text-4xl text-walnut">
              Our <span className="text-ochre">Values</span>
            </h2>
            <p className="mt-3 text-ink-soft/70 text-sm sm:text-base">
              Principles that guide us since 1995
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {values.map((v, i) => (
              <motion.div
                key={v.title}
                initial={{ opacity: 0, transform: "translateY(20px)" }}
                whileInView={{ opacity: 1, transform: "translateY(0px)" }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ delay: i * 0.1 }}
                className="p-8 rounded-2xl bg-paper border border-walnut/5 text-center hover:border-ochre/20 hover:shadow-lg hover:shadow-ochre/5 transition-[border-color,box-shadow]"
              >
                <div className="w-14 h-14 rounded-2xl bg-ochre/10 flex items-center justify-center mx-auto mb-4">
                  <v.icon size={24} className="text-ochre" />
                </div>
                <h3 className="font-[family:var(--font-display)] font-bold text-xl text-walnut mb-2">
                  {v.title}
                </h3>
                <p className="text-sm text-ink-soft/80 leading-relaxed">
                  {v.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, transform: "translateY(20px) scale(0.97)" }}
            whileInView={{ opacity: 1, transform: "translateY(0px) scale(1)" }}
            viewport={{ once: true, margin: "-40px" }}
            className="rounded-3xl bg-gradient-to-r from-walnut to-walnut-2 p-10 sm:p-14 text-center relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-pattern opacity-10" />
            <div className="relative z-10">
              <h2 className="font-[family:var(--font-display)] font-bold text-3xl sm:text-4xl text-paper mb-4">
                Experience Three Decades of Excellence
              </h2>
              <p className="text-paper/80 text-sm sm:text-base max-w-2xl mx-auto mb-8">
                From Athaulla Afroz&apos;s vision to Mohammed Afsar&apos;s
                leadership — we continue to serve with the same commitment to
                quality.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <a
                  href="/calculator"
                  className="px-8 py-3.5 rounded-xl bg-paper text-walnut font-semibold text-sm hover:bg-ochre-soft transition-[background,transform] pressable"
                >
                  Get Quote
                </a>
                <a
                  href="/contact"
                  className="px-8 py-3.5 rounded-xl border border-paper/30 text-paper font-semibold text-sm hover:bg-paper/10 transition-[background,transform] pressable"
                >
                  Contact Us
                </a>
                <a
                  href="/products"
                  className="px-8 py-3.5 rounded-xl border border-paper/30 text-paper font-semibold text-sm hover:bg-paper/10 transition-[background,transform] pressable"
                >
                  View Products
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
