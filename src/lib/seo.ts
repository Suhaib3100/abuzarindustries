import type { Metadata } from "next";
import { BUSINESS } from "./business";

// Link previews (WhatsApp, Facebook) and Google's title links read the Open Graph tags.
// Next.js replaces, rather than merges, the layout's openGraph when a page sets its own,
// so every page gets a full set from openGraph().
export function openGraph(title: string, description: string, path?: string): Metadata["openGraph"] {
  return {
    title,
    description,
    ...(path && { url: path }),
    siteName: BUSINESS.name,
    type: "website",
    locale: "en_IN",
    images: [{ url: "/images/logo-brand-og.png", width: 1200, height: 1200, alt: BUSINESS.name }],
  };
}

export const HOME_OG = {
  title: "Abuzar Industries: Teak Wood Supplier in Chitradurga, Karnataka",
  description:
    "Teak, white teak and neem wood since 1995. Cut to any size at our KSSIDC Industrial Area yard, Chitradurga.",
};

/** Title, description, canonical URL and a matching link preview for one page. */
export function pageMetadata({ title, description, path }: { title: string; description: string; path: string }): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: openGraph(`${title} | ${BUSINESS.name}`, description, path),
  };
}
