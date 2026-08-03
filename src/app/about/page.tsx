import type { Metadata } from "next";
import AboutContent from "./AboutContent";

export const metadata: Metadata = {
  title: "About Us | Best Teak Wood Supplier Chitradurga | Abuzar Industries",
  description:
    "Learn about Abuzar Industries, the leading teak wood and timber supplier in Chitradurga since 1995. Founded by Athaulla Afroz, now led by Mohammed Afsar.",
  alternates: { canonical: "https://abuzarindustries.in/about" },
};

export default function AboutPage() {
  return <AboutContent />;
}
