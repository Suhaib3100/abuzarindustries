import type { Metadata } from "next";
import { Saira_Condensed, Inter, Spline_Sans_Mono, Fraunces } from "next/font/google";
import "./globals.css";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Preloader from "@/components/Preloader";
import { ScrollProgress } from "@/components/motion/Patterns";
import JsonLd from "@/components/JsonLd";
import { BUSINESS, GOOGLE, HOURS, SAME_AS, SITE_URL } from "@/lib/business";

const display = Saira_Condensed({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

// editorial serif for premium headings (variable font, full weight range)
const serif = Fraunces({
  variable: "--font-serif",
  subsets: ["latin"],
  style: ["normal", "italic"],
  display: "swap",
});

const sans = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const mono = Spline_Sans_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
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
    "Ghana, Togo and African teak (Burma on order), white teak and neem in Chitradurga since 1995. Dried to about 10% moisture and cut to any size.",
  openGraph: {
    title: "Abuzar Industries: Teak Wood Supplier in Chitradurga, Karnataka",
    description:
      "Teak, white teak and neem wood since 1995. Cut to any size at our KSSIDC Industrial Area yard, Chitradurga.",
    siteName: "Abuzar Industries",
    type: "website",
    locale: "en_IN",
    images: [{ url: "/images/logo-brand-og.png", width: 1200, height: 1200, alt: "Abuzar Industries" }],
  },
  twitter: { card: "summary" },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${display.variable} ${serif.variable} ${sans.variable} ${mono.variable} scroll-smooth`}
    >
      <head>
        {/* Skip link — first focusable element for keyboard users */}
        <style>{`
          .skip-link { position: fixed; top: -999px; left: 8px; z-index: 10000; padding: 12px 24px; background: #5A3D24; color: #FAF6EF; border-radius: 0 0 8px 8px; font-weight: 600; font-size: 14px; text-decoration: none; }
          .skip-link:focus { top: 0; }
        `}</style>
      </head>
      <body className="min-h-dvh flex flex-col antialiased">
        <a href="#main-content" className="skip-link">Skip to main content</a>
        <JsonLd data={BUSINESS_LD} />
        <JsonLd data={WEBSITE_LD} />
        <ScrollProgress />
        <Preloader />
        <Nav />
        <main id="main-content" className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
