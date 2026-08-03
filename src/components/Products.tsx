"use client";

import { useState } from "react";
import Image from "next/image";
import dynamic from "next/dynamic";
import { Ruler, Building2, Truck, BadgeIndianRupee, Box, ImageIcon, ArrowUpRight } from "lucide-react";
import { Reveal, Stagger, StaggerItem } from "./motion/Reveal";
import VideoFrame from "./VideoFrame";

const PlankViewer = dynamic(() => import("@/components/three/PlankViewer"), {
  ssr: false,
  loading: () => (
    <div className="flex h-full w-full items-center justify-center bg-panel/40">
      <span className="relative flex h-7 w-7">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-ochre/30" />
        <span className="relative inline-flex h-7 w-7 items-center justify-center rounded-full bg-ochre/15">
          <Box size={14} className="text-ochre" />
        </span>
      </span>
    </div>
  ),
});

const PHONE = "919845378626";

const products = [
  {
    name: "Premium Teak Wood",
    image: "/images/teak-product.jpg",
    video: "/videos/plank-teak.mp4",
    poster: "/plank-teak-poster.jpg",
    specs: "Ghana · Togo · Burma",
    price: "₹4,000",
    dims: { l: 96, w: 8, t: 2 },
    species: "Teak Wood",
    desc: "Imported, kiln-dried teak — the benchmark for doors, joinery and fine furniture.",
    tag: "Best Seller",
  },
  {
    name: "White Teak Wood",
    image: "/images/white-teak-product.jpg",
    video: "/videos/plank-white-teak.mp4",
    poster: "/plank-white-teak-poster.jpg",
    specs: "Doors · Windows · Frames",
    price: "₹2,800",
    dims: { l: 96, w: 6, t: 2 },
    species: "White Teak",
    desc: "Pale, workable and clean-grained — a value choice for interior woodwork.",
    tag: "Popular",
  },
  {
    name: "Neem Wood",
    image: "/images/neem-product.jpg",
    video: null as string | null,
    poster: null as string | null,
    specs: "Outdoor · Durable",
    price: "₹1,000",
    dims: { l: 72, w: 6, t: 2 },
    species: "Neem Wood",
    desc: "Naturally pest-resistant timber, ideal for outdoor furniture and general build.",
    tag: "Value",
  },
];

const features = [
  { icon: Ruler, title: "Graded & Seasoned", desc: "Only the finest graded timber, carefully selected and dried." },
  { icon: Building2, title: "Custom Cut Sizes", desc: "Cut to your exact Length × Width × Thickness." },
  { icon: Truck, title: "Karnataka Delivery", desc: "Reliable delivery from our Chitradurga yard to site." },
  { icon: BadgeIndianRupee, title: "Fair, Clear Pricing", desc: "Competitive rates with bulk discounts for regulars." },
];

export default function Products() {
  const [view3d, setView3d] = useState<string | null>(null);

  return (
    <section id="products" className="py-16 sm:py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* header */}
        <Reveal className="max-w-2xl mb-10 sm:mb-14">
          <div className="flex items-center gap-3 mb-4">
            <span className="rule-gold" />
            <span className="eyebrow text-ochre">The Timber</span>
          </div>
          <h2 className="t-h2 text-walnut">
            Three species, <span className="gold-text italic">one standard</span>
          </h2>
          <p className="mt-4 text-ink-soft/80 text-sm sm:text-base leading-relaxed max-w-xl">
            The finest teak, white teak and neem wood in Chitradurga — seasoned at our KSSIDC yard and delivered across Karnataka.
          </p>
        </Reveal>

        {/* product cards */}
        <Stagger className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-12 sm:mb-16">
          {products.map((p) => (
            <StaggerItem key={p.name}>
              <div className="card-premium group block h-full rounded-2xl overflow-hidden">
                {/* image / video area */}
                <div className="relative aspect-[4/3] overflow-hidden bg-gradient-to-br from-panel/60 to-ochre-soft/20">
                  {view3d === p.name ? (
                    p.video ? (
                      <VideoFrame src={p.video} poster={p.poster ?? p.image} className="h-full w-full" tint={false} />
                    ) : (
                      <PlankViewer length={p.dims.l} width={p.dims.w} thickness={p.dims.t} species={p.species} autoRotate />
                    )
                  ) : (
                    <Image
                      src={p.image}
                      alt={p.name}
                      fill
                      sizes="(max-width:640px) 100vw, (max-width:1024px) 50vw, 33vw"
                      className="object-cover transition-transform duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.06]"
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-walnut/55 via-transparent to-transparent" />
                  <span className="absolute top-3 left-3 rounded-full bg-paper/85 backdrop-blur-sm px-2.5 py-1 text-[10px] font-bold tracking-widest uppercase text-ochre">
                    {p.tag}
                  </span>
                  <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between text-paper">
                    <div>
                      <span className="block text-[10px] uppercase tracking-widest text-paper/70">From</span>
                      <span className="font-[family:var(--font-serif)] font-semibold text-2xl leading-none">
                        {p.price}
                        <span className="text-xs font-normal text-paper/70"> /cu.ft</span>
                      </span>
                    </div>
                    <button
                      onClick={() => setView3d((cur) => (cur === p.name ? null : p.name))}
                      className="z-10 h-8 w-8 grid place-items-center rounded-full bg-paper/90 text-walnut transition-transform duration-300 hover:scale-110"
                      aria-label={view3d === p.name ? "Show photo" : "View in 3D"}
                    >
                      {view3d === p.name ? <ImageIcon size={14} /> : <Box size={14} />}
                    </button>
                  </div>
                </div>
                {/* body */}
                <a
                  href={`https://wa.me/${PHONE}?text=${encodeURIComponent(`Hi, I'm interested in ${p.name}. Please share pricing and availability.`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block p-5 sm:p-6"
                >
                  <div className="eyebrow text-ink-soft/45 mb-1.5">{p.specs}</div>
                  <h3 className="font-[family:var(--font-serif)] font-semibold text-lg sm:text-xl text-walnut mb-1.5">
                    {p.name}
                  </h3>
                  <p className="text-sm text-ink-soft/75 leading-relaxed">{p.desc}</p>
                </a>
              </div>
            </StaggerItem>
          ))}
        </Stagger>

        {/* feature strip */}
        <Stagger className="grid grid-cols-2 sm:grid-cols-4 gap-px rounded-2xl overflow-hidden bg-walnut/10 border border-walnut/10">
          {features.map((f) => (
            <StaggerItem key={f.title} className="h-full">
              <div className="h-full bg-paper p-4 sm:p-6 transition-colors duration-300 hover:bg-panel/60">
                <f.icon size={18} className="text-ochre mb-2.5" strokeWidth={1.75} />
                <div className="font-[family:var(--font-serif)] font-semibold text-sm sm:text-[15px] text-walnut mb-1">
                  {f.title}
                </div>
                <div className="text-xs text-ink-soft/70 leading-relaxed">{f.desc}</div>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
