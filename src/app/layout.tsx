import type { Metadata } from "next";
import { Inter, Fraunces } from "next/font/google";
import "./globals.css";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { ScrollProgress } from "@/components/motion/Patterns";
import JsonLd from "@/components/JsonLd";
import { BUSINESS, GOOGLE, HOURS, SAME_AS, SITE_URL } from "@/lib/business";
import { HOME_OG, openGraph } from "@/lib/seo";

const serif = Fraunces({
  variable: "--font-serif",
  subsets: ["latin"],
  display: "swap",
});

const sans = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});


const BUSINESS_LD = {
  "@context": "https://schema.org",
  "@type": "Store",
  "@id": `${SITE_URL}/#business`,
  name: BUSINESS.name,
  url: SITE_URL,
  telephone: BUSINESS.phone,
  email: BUSINESS.email,
  description:
    "Teak wood (Ghana, Togo, African; Burma on order), white teak and neem wood supplier in Chitradurga since 1995. Cut to any size; delivery charged by distance.",
  image: `${SITE_URL}/images/logo-brand-og.png`,
  logo: `${SITE_URL}/images/logo-brand-512.png`,
  address: {
    "@type": "PostalAddress",
    streetAddress: BUSINESS.street,
    addressLocality: BUSINESS.city,
    addressRegion: BUSINESS.region,
    postalCode: BUSINESS.postalCode,
    addressCountry: "IN",
  },
  geo: { "@type": "GeoCoordinates", latitude: BUSINESS.geo.lat, longitude: BUSINESS.geo.lng },
  hasMap: GOOGLE.mapsUrl,
  openingHoursSpecification: HOURS.map((h) => ({
    "@type": "OpeningHoursSpecification",
    dayOfWeek: h.days,
    opens: h.opens,
    closes: h.closes,
  })),
  areaServed: [
    { "@type": "City", name: "Chitradurga" },
    { "@type": "State", name: "Karnataka" },
  ],
  foundingDate: String(BUSINESS.founded),
  founder: { "@type": "Person", name: BUSINESS.founder },
  priceRange: "₹₹",
  sameAs: SAME_AS,
};

const WEBSITE_LD = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: BUSINESS.name,
  url: SITE_URL,
  publisher: { "@id": `${SITE_URL}/#business` },
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Teak Wood Supplier in Chitradurga, Karnataka | Abuzar Industries",
    template: "%s | Abuzar Industries",
  },
  description:
    "Ghana, Togo and African teak (Burma on order), white teak and neem in Chitradurga since 1995. Teak dried to about 10% moisture; all wood cut to any size.",
  // Fallback for routes without their own (e.g. 404). Pages set theirs with pageMetadata().
  openGraph: openGraph(HOME_OG.title, HOME_OG.description),
  twitter: { card: "summary" },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${serif.variable} ${sans.variable} scroll-smooth`}
    >
      <head>
        {/* Skip link — first focusable element for keyboard users */}
        <style>{`
          .skip-link { position: fixed; top: -999px; left: 8px; z-index: 10000; padding: 12px 24px; background: #5A3D24; color: #FAF6EF; border-radius: 0 0 8px 8px; font-weight: 600; font-size: 14px; text-decoration: none; }
          .skip-link:focus { top: 0; }
        `}</style>
        {/* llms.txt v2 discovery: the plain-text summary of the site for AI assistants */}
        <link rel="describedby" href="/llms.txt" type="text/plain" />
      </head>
      <body className="min-h-dvh flex flex-col antialiased">
        <a href="#main-content" className="skip-link">Skip to main content</a>
        <JsonLd data={BUSINESS_LD} />
        <JsonLd data={WEBSITE_LD} />
        <ScrollProgress />
        <Nav />
        <main id="main-content" className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
