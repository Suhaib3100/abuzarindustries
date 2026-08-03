"use client";

import Image from "next/image";
import { Trees, Ruler, Building2, Truck, ClipboardList, Leaf, Move3d } from "lucide-react";
import { Reveal, Stagger, StaggerItem } from "./motion/Reveal";
import DeliveryMap from "./DeliveryMap";

const services = [
  {
    icon: Trees,
    n: "01",
    title: "Premium Teak Wood",
    desc: "Ghana, Togo & Burma teak from ₹4,000/cu.ft. Kiln-dried, ready for joinery and fine furniture.",
    img: "/images/teak-product.jpg",
  },
  {
    icon: Leaf,
    n: "02",
    title: "White Teak Wood",
    desc: "Quality white teak from ₹2,800/cu.ft. Ideal for doors, windows and interior woodwork.",
    img: "/images/white-teak-product.jpg",
  },
  {
    icon: Building2,
    n: "03",
    title: "Neem Wood",
    desc: "Durable, pest-resistant neem from ₹1,000/cu.ft. Naturally repels termites — perfect for outdoor furniture and farm construction.",
    img: "/images/neem-product.jpg",
  },
  {
    icon: Ruler,
    n: "04",
    title: "Custom Dimension Cutting",
    desc: "Cut to exact Length × Width × Thickness. No waste, just fit — every plank to your spec.",
    img: "/images/custom-dimension-cutting.jpg",
  },
  {
    icon: Truck,
    n: "05",
    title: "Delivery Across Karnataka",
    desc: "From our KSSIDC yard in Chitradurga straight to your site — reliable, on time, and fully loaded.",
    img: null,
    isMap: true,
  },
  {
    icon: ClipboardList,
    n: "06",
    title: "Instant WhatsApp Quoting",
    desc: "Use our calculator or message dimensions on WhatsApp — a professional quote within minutes.",
    img: "/images/instant-whatsapp-quote.png",
  },
];

export default function Services() {
  return (
    <section id="services" className="py-16 sm:py-24 relative bg-panel/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* header */}
        <Reveal className="max-w-2xl mb-10 sm:mb-14">
          <div className="flex items-center gap-3 mb-4">
            <span className="rule-gold" />
            <span className="eyebrow text-ochre">What We Offer</span>
          </div>
          <h2 className="t-h2 text-walnut">
            Build with the <span className="gold-text italic">best</span> wood in Karnataka
          </h2>
          <p className="mt-4 text-ink-soft/80 text-sm sm:text-base leading-relaxed max-w-xl">
            Premium teak, white teak and neem — custom cut, graded and delivered from our Chitradurga yard. One call gets you a quote and a load date.
          </p>
        </Reveal>

        {/* grid */}
        <Stagger className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {services.map((s) => (
            <StaggerItem key={s.title} className="h-full">
              <div className="group relative h-full rounded-2xl overflow-hidden border border-walnut/10 transition-[transform,box-shadow] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:shadow-lg hover:shadow-walnut/15 hover:-translate-y-1 bg-gradient-to-br from-[rgba(252,249,243,0.95)] to-[rgba(246,239,227,0.95)]">
                {/* background image for wood types */}
                {s.isMap ? (
                  <div className="absolute inset-0">
                    <DeliveryMap />
                  </div>
                ) : null}
                {s.img ? (
                  <div className="absolute inset-0">
                    <Image
                      src={s.img}
                      alt={`${s.title} — Abuzar Industries, Chitradurga`}
                      fill
                      className="object-cover transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105"
                      sizes="(max-width:640px) 100vw, (max-width:1024px) 50vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-paper via-paper/80 to-paper/30" />
                  </div>
                ) : null}

                {/* logo watermark */}
                <div className="pointer-events-none absolute -right-6 -top-6 opacity-[0.04] transition-opacity duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:opacity-[0.08]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="/images/logo-brand-512.png" alt="" className="w-28 h-28 object-contain" />
                </div>

                {/* content */}
                  <div className="relative z-10 p-5 sm:p-6 flex flex-col h-full">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-9 h-9 rounded-lg bg-walnut grid place-items-center shrink-0 transition-colors duration-300">
                      <s.icon size={16} className="text-paper" strokeWidth={1.75} />
                    </div>
                    <span className="font-mono text-[11px] font-semibold text-ochre/60">{s.n}</span>
                  </div>

                  <h3 className="font-[family:var(--font-serif)] font-semibold text-[17px] text-walnut mb-1.5">
                    {s.title}
                  </h3>
                  <p className="text-sm text-ink-soft/80 leading-relaxed flex-1">{s.desc}</p>

                  {/* subtle decorative line on hover */}
                  <div className="mt-4 h-px w-0 bg-gradient-to-r from-ochre to-transparent transition-[width] duration-400 group-hover:w-full" />
                </div>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
