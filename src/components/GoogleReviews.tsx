import { Star, ArrowUpRight } from "lucide-react";
import { GOOGLE } from "@/lib/business";
import { REVIEWS } from "@/lib/content";

function Stars({ size = 14 }: { size?: number }) {
  return (
    <span className="flex gap-0.5 text-ochre" aria-label="5 out of 5 stars">
      {Array.from({ length: 5 }, (_, i) => (
        <Star key={i} size={size} fill="currentColor" strokeWidth={0} aria-hidden />
      ))}
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
              <Stars />
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
