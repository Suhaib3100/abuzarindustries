import { Plus } from "lucide-react";
import JsonLd from "./JsonLd";
import type { QA } from "@/lib/content";

// Visible FAQ; the FAQPage schema is built from the same list so the two always match.
export default function Faq({ items, title = "Questions buyers ask" }: { items: QA[]; title?: string }) {
  return (
    <section id="faq" className="py-16 sm:py-24">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: items.map((i) => ({
            "@type": "Question",
            name: i.q,
            acceptedAnswer: { "@type": "Answer", text: i.a },
          })),
        }}
      />
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <div className="flex items-center gap-3 mb-4">
          <span className="rule-gold" />
          <span className="eyebrow text-ochre">FAQ</span>
        </div>
        <h2 className="t-h2 text-walnut mb-8">{title}</h2>
        <div className="divide-y divide-walnut/10 border-y border-walnut/10">
          {items.map((i) => (
            <details key={i.q} className="group py-4">
              <summary className="flex cursor-pointer list-none items-start justify-between gap-4 font-[family:var(--font-serif)] font-semibold text-base sm:text-lg text-walnut [&::-webkit-details-marker]:hidden">
                {i.q}
                <Plus size={18} className="mt-1 shrink-0 text-ochre transition-transform duration-300 group-open:rotate-45" aria-hidden />
              </summary>
              <p className="mt-3 text-sm sm:text-base leading-relaxed text-ink-soft/85">{i.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
