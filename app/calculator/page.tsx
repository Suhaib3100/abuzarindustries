import type { Metadata } from "next"
import { PriceCalculator } from "@/components/price-calculator"

export const metadata: Metadata = {
  title: "Wood Price Calculator | Abuzar Industries",
  description: "Estimate timber cost by size and quantity. Prices may vary—contact for latest rates.",
}

export default function Page() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-10 md:py-16">
      <h1 className="font-serif text-3xl font-semibold md:text-4xl">Wood Price Calculator</h1>
      <p className="mt-3 max-w-2xl text-foreground/80">
        Select wood type and enter size in inches (Length × Width × Thickness) with quantity to estimate the cost.
      </p>

      <div className="mt-6">
        <PriceCalculator />
      </div>
    </section>
  )
}
