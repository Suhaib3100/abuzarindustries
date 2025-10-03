import type React from "react"
function IconBox({ children }: { children: React.ReactNode }) {
  return (
    <div className="mb-2 inline-flex h-9 w-9 items-center justify-center rounded-full bg-accent text-accent-foreground">
      {children}
    </div>
  )
}

function Item({
  title,
  desc,
  icon,
}: {
  title: string
  desc: string
  icon: React.ReactNode
}) {
  return (
    <div className="rounded-lg border bg-card p-5 shadow-sm">
      <IconBox>{icon}</IconBox>
      <h3 className="font-serif text-lg font-semibold">{title}</h3>
      <p className="mt-1 text-sm text-foreground/70">{desc}</p>
    </div>
  )
}

export function Highlights() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-10 md:py-16">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
        <Item
          title="Premium Timber Quality"
          desc="Consistent, carefully sourced, and ready for construction."
          icon={
            // log icon
            <svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <rect x="3" y="9" width="18" height="6" rx="2" />
              <circle cx="8" cy="12" r="1.2" fill="currentColor" />
              <circle cx="12" cy="12" r="1.2" fill="currentColor" />
              <circle cx="16" cy="12" r="1.2" fill="currentColor" />
            </svg>
          }
        />
        <Item
          title="Custom Cut Sizes"
          desc="Cut to exact Length × Width × Thickness as required."
          icon={
            // ruler icon
            <svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <rect x="3" y="7" width="18" height="10" rx="2" />
              <rect x="6" y="9" width="1.2" height="6" rx="0.3" />
              <rect x="9" y="9" width="1.2" height="6" rx="0.3" />
              <rect x="12" y="9" width="1.2" height="6" rx="0.3" />
              <rect x="15" y="9" width="1.2" height="6" rx="0.3" />
            </svg>
          }
        />
        <Item
          title="Delivery Across Karnataka"
          desc="Reliable delivery from Chitradurga to statewide locations."
          icon={
            // truck icon
            <svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <rect x="2" y="9" width="11" height="6" rx="1" />
              <path d="M13 10h4l3 3v2h-7z" />
              <circle cx="7" cy="17" r="1.5" />
              <circle cx="17" cy="17" r="1.5" />
            </svg>
          }
        />
        <Item
          title="Affordable Pricing"
          desc="Fair rates with clear estimates for every order."
          icon={
            // rupee symbol as path (simple)
            <svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M7 6h10v2H7v2h6a4 4 0 0 1-3.46 2H7v2l6 4h-3l-3-2v-2h2.54A6 6 0 0 0 15 10H7z" />
            </svg>
          }
        />
      </div>
    </section>
  )
}
