import { Star, ArrowUpRight } from "lucide-react";
import { GOOGLE } from "@/lib/business";
import { REVIEWS } from "@/lib/content";

// Filled stars cover `value` out of 5 (4.8 fills 96% of the row); faint stars show the rest.
function Stars({ value = 5, size = 14 }: { value?: number; size?: number }) {
  const row = (cls: string) => (
    <span className={`flex gap-0.5 ${cls}`}>
      {Array.from({ length: 5 }, (_, i) => (
        <Star key={i} size={size} fill="currentColor" strokeWidth={0} className="shrink-0" aria-hidden />
      ))}
    </span>
  );
  return (
    <span role="img" aria-label={`${value} out of 5 stars`} className="relative inline-flex">
      {row("text-ochre/25")}
      <span className="absolute inset-y-0 left-0 overflow-hidden" style={{ width: `${(value / 5) * 100}%` }}>
        {row("text-ochre")}
      </span>
    </span>
  );
}

// Real Google reviews (see src/lib/content.ts). No review schema on purpose:
// Google ignores self-posted review markup for local businesses.
export default function GoogleReviews() {
  return (
    <section id="reviews" className="py-16 sm:py-24 bg-panel/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-10">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="rule-gold" />
              <span className="eyebrow text-ochre">Google reviews</span>
            </div>
            <h2 className="t-h2 text-walnut">What our customers say</h2>
          </div>
          <a
            href={GOOGLE.reviewsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 self-start sm:self-auto rounded-2xl border border-walnut/10 bg-paper px-5 py-3 hover:border-ochre/30 transition-colors"
          >
            <span className="font-[family:var(--font-serif)] font-semibold text-3xl text-walnut">{GOOGLE.rating}</span>
            <span>
              <Stars value={GOOGLE.rating} />
              <span className="mt-1 flex items-center gap-1 text-xs text-ink-soft/70">
                {GOOGLE.reviews} reviews on Google <ArrowUpRight size={12} />
              </span>
            </span>
          </a>
        </div>

        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {REVIEWS.map((r) => (
            <li key={r.name} className="card-premium rounded-2xl p-6 flex flex-col">
              <Stars />
              <blockquote className="mt-4 flex-1 text-sm sm:text-[15px] leading-relaxed text-ink-soft/90">
                “{r.text}”
              </blockquote>
              <div className="mt-5 text-sm">
                <span className="font-semibold text-walnut">{r.name}</span>
                <span className="text-ink-soft/55"> · {r.meta} · Google</span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
