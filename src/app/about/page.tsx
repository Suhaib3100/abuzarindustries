import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import AboutContent from "./AboutContent";

export const metadata: Metadata = pageMetadata({
  title: "About Us: Timber Merchants Since 1995",
  description:
    "Abuzar Industries, teak wood and timber supplier in Chitradurga since 1995. Founded by Athaulla Afroz, now run by his son Mohammed Afsar.",
  path: "/about",
});

export default function AboutPage() {
  return <AboutContent />;
}
