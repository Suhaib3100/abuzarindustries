import type { MetadataRoute } from "next";

const BASE = "https://abuzarindustries.in";

const lastMod = "2026-07-13";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: BASE, lastModified: lastMod, changeFrequency: "monthly", priority: 1 },
    { url: `${BASE}/products`, lastModified: lastMod, changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE}/calculator`, lastModified: lastMod, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/about`, lastModified: lastMod, changeFrequency: "yearly", priority: 0.6 },
    { url: `${BASE}/contact`, lastModified: lastMod, changeFrequency: "yearly", priority: 0.7 },
  ];
}
