import type { Metadata } from "next"
import { ProductCard } from "@/components/product-card"
import { TeakWoodSchema, WhiteTeakWoodSchema, NeemWoodSchema } from "@/components/product-schema"

export const metadata: Metadata = {
  title: "Best Teak Wood Products Chitradurga | Premium Timber | Abuzar Industries",
  description: "Best teak wood products in Chitradurga. Premium teak, white teak & neem wood planks. Custom sizes, construction timber, furniture wood. KSSIDC Industrial Area, DVG Road, Chitradurga.",
  keywords: [
    "best teak wood products chitradurga",
    "teak wood planks chitradurga",
    "white teak wood chitradurga",
    "neem wood planks chitradurga",
    "construction timber chitradurga",
    "furniture wood chitradurga",
    "custom wood cutting chitradurga",
    "timber products chitradurga",
    "wood planks chitradurga",
    "premium timber chitradurga",
    "abuzar industries products",
    "kssidc industrial area timber"
  ],
  openGraph: {
    title: "Best Teak Wood Products Chitradurga | Abuzar Industries",
    description: "Premium teak wood products in Chitradurga. Custom sizes, quality timber, delivery across Karnataka.",
    url: "https://abuzarindustries.in/products",
    type: "website",
  },
  alternates: {
    canonical: "https://abuzarindustries.in/products",
  },
}

export default function Page() {
  return (
    <>
      <TeakWoodSchema />
      <WhiteTeakWoodSchema />
      <NeemWoodSchema />
      <section className="mx-auto max-w-6xl px-4 py-10 md:py-16">
      <h1 className="font-serif text-3xl font-semibold md:text-4xl">Best Teak Wood Products in Chitradurga</h1>
      <p className="mt-3 max-w-2xl text-foreground/80">Explore our premium timber categories - best teak wood, white teak, and neem wood planks. Custom sizes available. Message us for current pricing.</p>

      <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-3">
        <ProductCard
          title="Teak Wood Planks"
          imageQuery="teak%20wood%20planks%20stack"
          sizes={['2" x 6" x 6’', '2" x 8" x 8’', "Custom sizes"]}
        />
        <ProductCard
          title="Neem Wood Planks"
          imageQuery="neem%20wood%20planks%20stack"
          sizes={['1" x 4" x 6’', '2" x 6" x 8’', "Custom sizes"]}
        />
        <ProductCard
          title="Custom Sizes for Construction"
          imageQuery="sawmill%20cutting%20timber"
          sizes={["Per requirement", "L × W × T", "On-time delivery"]}
        />
      </div>
      
      <div className="mt-8 rounded-lg border bg-card p-6">
        <h2 className="font-serif text-2xl font-semibold">Why Choose Our Timber Products in Chitradurga?</h2>
        <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
          <div>
            <h3 className="font-semibold text-lg">Best Quality Teak Wood</h3>
            <p className="text-foreground/80">We provide the finest teak wood in Chitradurga with premium quality and durability.</p>
          </div>
          <div>
            <h3 className="font-semibold text-lg">Custom Sizing Available</h3>
            <p className="text-foreground/80">Get timber cut to your exact specifications - any size, any dimension.</p>
          </div>
          <div>
            <h3 className="font-semibold text-lg">Timely Delivery</h3>
            <p className="text-foreground/80">Fast delivery across Karnataka from our KSSIDC Industrial Area location.</p>
          </div>
          <div>
            <h3 className="font-semibold text-lg">Competitive Pricing</h3>
            <p className="text-foreground/80">Best timber prices in Chitradurga with transparent pricing and no hidden costs.</p>
          </div>
        </div>
      </div>
      </section>
    </>
  )
}
