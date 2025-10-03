import type { Metadata } from "next"
import { ProductCard } from "@/components/product-card"

export const metadata: Metadata = {
  title: "Products | Abuzar Industries",
  description: "Browse Teak wood, Neem wood planks, and custom cut sizes for construction.",
}

export default function Page() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-10 md:py-16">
      <h1 className="font-serif text-3xl font-semibold md:text-4xl">Products</h1>
      <p className="mt-3 max-w-2xl text-foreground/80">Explore our categories and message us for current pricing.</p>

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
    </section>
  )
}
