import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/business";
import { SITE_PAGES } from "@/lib/pages";

// Built from the page list in src/lib/pages.ts (llms.txt uses the same list). No image entries:
// the product pages don't show those photos, and the white teak one is really a teak photo.
export default function sitemap(): MetadataRoute.Sitemap {
  return SITE_PAGES.map((p) => ({
    url: `${SITE_URL}${p.path === "/" ? "" : p.path}`,
    lastModified: p.lastModified,
    priority: p.priority,
  }));
}
