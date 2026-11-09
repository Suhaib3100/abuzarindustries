import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/business";

// Bump a page's date when its content really changes.
const PAGES: { path: string; lastModified: string; priority: number; images?: string[] }[] = [
  { path: "", lastModified: "2026-11-09", priority: 1 },
  { path: "/teak-wood", lastModified: "2026-11-09", priority: 0.9, images: ["/images/teak-product.jpg"] },
  { path: "/teak-wood-for-doors-and-frames", lastModified: "2026-11-09", priority: 0.9 },
  { path: "/teak-wood-price-per-cft", lastModified: "2026-11-09", priority: 0.9 },
  { path: "/products", lastModified: "2026-11-09", priority: 0.8 },
  { path: "/white-teak-wood", lastModified: "2026-11-09", priority: 0.7, images: ["/images/white-teak-product.jpg"] },
  { path: "/neem-wood", lastModified: "2026-11-09", priority: 0.7, images: ["/images/neem-product.jpg"] },
  { path: "/delivery", lastModified: "2026-11-09", priority: 0.7 },
  { path: "/calculator", lastModified: "2026-11-09", priority: 0.7 },
  { path: "/contact", lastModified: "2026-11-09", priority: 0.7 },
  { path: "/about", lastModified: "2026-11-09", priority: 0.6 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  return PAGES.map((p) => ({
    url: `${SITE_URL}${p.path}`,
    lastModified: p.lastModified,
    priority: p.priority,
    ...(p.images && { images: p.images.map((i) => `${SITE_URL}${i}`) }),
  }));
}
