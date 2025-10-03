import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "About Us | Abuzar Industries",
  description:
    "Located at KSSIDC Industrial Area, DVG Road, Chitradurga. Trusted timber supplier specializing in Teak & Neem wood.",
}

export default function Page() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-10 md:py-16">
      <h1 className="font-serif text-3xl font-semibold md:text-4xl">About Abuzar Industries</h1>
      <p className="mt-4 max-w-3xl text-foreground/80 md:text-lg">
        Abuzar Industries supplies high-quality timber with a focus on Teak and Neem wood planks, cut to precise sizes
        for construction needs. We emphasize trust, consistency, and timely delivery.
      </p>

      <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-3">
        <div className="rounded-lg border bg-card p-5">
          <h3 className="font-serif text-lg font-semibold">Consistent Timber Quality</h3>
          <p className="mt-2 text-sm text-foreground/70">
            Rigorous selection and handling standards ensure long-lasting performance.
          </p>
        </div>
        <div className="rounded-lg border bg-card p-5">
          <h3 className="font-serif text-lg font-semibold">Custom Sizing</h3>
          <p className="mt-2 text-sm text-foreground/70">
            Tailored Length × Width × Thickness for any structural requirement.
          </p>
        </div>
        <div className="rounded-lg border bg-card p-5">
          <h3 className="font-serif text-lg font-semibold">Affordable Pricing</h3>
          <p className="mt-2 text-sm text-foreground/70">Fair rates and transparent estimates with our calculator.</p>
        </div>
      </div>

      <div className="mt-10 rounded-lg border bg-secondary p-5 text-secondary-foreground">
        <p className="text-sm">Location</p>
        <p className="font-serif text-xl font-semibold">KSSIDC Industrial Area, DVG Road, Chitradurga</p>
      </div>
    </section>
  )
}
