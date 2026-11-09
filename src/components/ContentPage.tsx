import type { ReactNode } from "react";
import { ChevronRight, MessageCircle, Phone, Calculator } from "lucide-react";
import JsonLd from "./JsonLd";
import { BUSINESS, SITE_URL } from "@/lib/business";

type Crumb = { name: string; path: string };

// Shared shell for the guide/product pages: breadcrumb, header, body, contact block.
export default function ContentPage({
  crumbs,
  eyebrow,
  title,
  intro,
  children,
  whatsappText,
}: {
  crumbs: Crumb[];
  eyebrow: string;
  title: ReactNode;
  intro: ReactNode;
  children: ReactNode;
  whatsappText: string;
}) {
  const trail = [{ name: "Home", path: "/" }, ...crumbs];
  return (
    <div className="pt-24 pb-8">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: trail.map((c, i) => ({
            "@type": "ListItem",
            position: i + 1,
            name: c.name,
            item: `${SITE_URL}${c.path === "/" ? "" : c.path}`,
          })),
        }}
      />

      <nav aria-label="Breadcrumb" className="max-w-5xl mx-auto px-4 sm:px-6 pt-6">
        <ol className="flex flex-wrap items-center gap-1 text-xs text-ink-soft/60">
          {trail.map((c, i) => (
            <li key={c.path} className="flex items-center gap-1">
              {i > 0 && <ChevronRight size={12} aria-hidden />}
              {i < trail.length - 1 ? (
                // globals.css gives links a 44px minimum height and width on phones. inline-flex centres
                // the text in that height (it sat ~14px above the chevrons); min-w-0! drops the width so
                // "Home" has no gap after it (! is needed: that rule is unlayered, so it beats utilities).
                <a href={c.path} className="inline-flex items-center min-w-0! hover:text-ochre transition-colors">{c.name}</a>
              ) : (
                <span aria-current="page" className="text-ink-soft">{c.name}</span>
              )}
            </li>
          ))}
        </ol>
      </nav>

      <header className="max-w-5xl mx-auto px-4 sm:px-6 pt-8 pb-10 sm:pb-14">
        <span className="inline-block px-4 py-1.5 rounded-full bg-ochre/10 border border-ochre/20 text-ochre text-xs font-semibold tracking-wider uppercase mb-6">
          {eyebrow}
        </span>
        <h1 className="font-[family:var(--font-display)] font-bold text-4xl sm:text-5xl md:text-6xl leading-[0.98] tracking-tight text-walnut">
          {title}
        </h1>
        <div className="mt-6 max-w-3xl text-base sm:text-lg text-ink-soft/85 leading-relaxed space-y-4">{intro}</div>
      </header>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 space-y-14 sm:space-y-20">{children}</div>

      <section className="max-w-5xl mx-auto px-4 sm:px-6 mt-16 sm:mt-24">
        <div className="rounded-3xl bg-walnut text-paper p-8 sm:p-12">
          <h2 className="font-[family:var(--font-serif)] font-semibold text-2xl sm:text-3xl">Get today&apos;s rate</h2>
          <p className="mt-3 max-w-2xl text-paper/75 text-sm sm:text-base leading-relaxed">
            Send your sizes on WhatsApp or call us. Or visit the yard at {BUSINESS.street}, {BUSINESS.city} and pick your wood.
          </p>
          <div className="mt-7 flex flex-col sm:flex-row gap-3">
            <a
              href={`${BUSINESS.whatsapp}?text=${encodeURIComponent(whatsappText)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-green text-paper text-sm font-semibold hover:bg-green/90 transition-colors pressable"
            >
              <MessageCircle size={16} aria-hidden /> WhatsApp us
            </a>
            <a
              href={`tel:${BUSINESS.phone}`}
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-paper text-walnut text-sm font-semibold hover:bg-paper/90 transition-colors pressable"
            >
              <Phone size={16} aria-hidden /> {BUSINESS.phoneDisplay}
            </a>
            <a
              href="/calculator"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl border border-paper/25 text-paper text-sm font-semibold hover:border-paper/50 transition-colors pressable"
            >
              <Calculator size={16} aria-hidden /> CFT calculator
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

// Small building blocks so the pages stay readable.
export function Section({ title, children, id }: { title: string; children: ReactNode; id?: string }) {
  return (
    <section id={id}>
      <h2 className="font-[family:var(--font-serif)] font-semibold text-2xl sm:text-3xl text-walnut mb-5">{title}</h2>
      <div className="space-y-4 text-sm sm:text-base leading-relaxed text-ink-soft/85">{children}</div>
    </section>
  );
}

export function Table({ head, rows, caption }: { head: string[]; rows: ReactNode[][]; caption?: string }) {
  return (
    <div className="overflow-x-auto rounded-2xl border border-walnut/10 bg-paper">
      <table className="w-full text-left text-sm">
        {caption && <caption className="sr-only">{caption}</caption>}
        <thead className="bg-panel/70 text-walnut">
          <tr>
            {head.map((h) => (
              <th key={h} scope="col" className="px-4 py-3 font-semibold whitespace-nowrap">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-walnut/8">
          {rows.map((r, i) => (
            <tr key={i}>
              {r.map((c, j) =>
                j === 0 ? (
                  <th key={j} scope="row" className="px-4 py-3 font-semibold text-walnut whitespace-nowrap">{c}</th>
                ) : (
                  <td key={j} className="px-4 py-3 text-ink-soft/85">{c}</td>
                ),
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function Related({ links }: { links: { href: string; label: string }[] }) {
  return (
    <nav aria-label="Related pages">
      <h2 className="eyebrow text-ink-soft/60 mb-4">Read next</h2>
      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {links.map((l) => (
          <li key={l.href}>
            <a href={l.href} className="card-premium flex items-center justify-between rounded-xl px-5 py-4 text-sm font-semibold text-walnut hover:text-ochre transition-colors">
              {l.label}
              <ChevronRight size={16} aria-hidden />
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
