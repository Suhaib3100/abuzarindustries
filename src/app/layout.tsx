import type { Metadata } from "next";
import { Saira_Condensed, Inter, Spline_Sans_Mono, Fraunces } from "next/font/google";
import "./globals.css";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Preloader from "@/components/Preloader";
import { ScrollProgress } from "@/components/motion/Patterns";

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

export const metadata: Metadata = {
  metadataBase: new URL("https://abuzarindustries.in"),
  title: "Best Teak Wood Supplier in Chitradurga, Karnataka | Abuzar Industries",
  description:
    "Looking for teak wood in Chitradurga? Abuzar Industries is the most trusted timber supplier in Chitradurga, Karnataka since 1995. Premium teak, white teak & neem wood planks — custom cut sizes, instant WhatsApp quotes, free delivery across Karnataka. Visit our KSSIDC Industrial Area yard.",
  keywords: [
    "teak wood Chitradurga",
    "timber supplier Chitradurga",
    "teak wood planks",
    "white teak",
    "neem wood",
    "custom cut timber",
    "wood supplier Karnataka",
    "Abuzar Industries",
    "timber near me",
    "wood shop Chitradurga",
    "teak wood price Chitradurga",
    "construction wood Karnataka",
    "timber yard Chitradurga",
    "teak wood supplier Karnataka",
    "KSSIDC Industrial Area Chitradurga",
  ],
  alternates: { canonical: "https://abuzarindustries.in" },
  openGraph: {
    title: "Abuzar Industries — Best Teak Wood Supplier in Chitradurga",
    description:
      "Premium teak, white teak & neem wood since 1995. Custom cut sizes and delivery across Karnataka.",
    url: "https://abuzarindustries.in",
    siteName: "Abuzar Industries",
    type: "website",
    locale: "en_IN",
    images: [{ url: "/images/logo-brand-og.png", width: 1200, height: 1200, alt: "Abuzar Industries" }],
  },
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Store",
              name: "Abuzar Industries",
              url: "https://abuzarindustries.in",
              telephone: "+919845378626",
              email: "abuzarindustries@gmail.com",
              description:
                "Premium teak, white teak and neem wood supplier in Chitradurga since 1995. Custom cut sizes and delivery across Karnataka.",
              image: "https://abuzarindustries.in/images/logo-brand-og.png",
              address: {
                "@type": "PostalAddress",
                streetAddress: "KSSIDC Industrial Area, DVG Road",
                addressLocality: "Chitradurga",
                addressRegion: "Karnataka",
                postalCode: "577501",
                addressCountry: "IN",
              },
              geo: {
                "@type": "GeoCoordinates",
                latitude: 14.22648,
                longitude: 76.38635,
              },
              openingHoursSpecification: [
                { "@type": "OpeningHoursSpecification", dayOfWeek: "Monday", opens: "09:00", closes: "19:00" },
                { "@type": "OpeningHoursSpecification", dayOfWeek: "Tuesday", opens: "09:00", closes: "19:00" },
                { "@type": "OpeningHoursSpecification", dayOfWeek: "Wednesday", opens: "09:00", closes: "19:00" },
                { "@type": "OpeningHoursSpecification", dayOfWeek: "Thursday", opens: "09:00", closes: "19:00" },
                { "@type": "OpeningHoursSpecification", dayOfWeek: "Friday", opens: "09:00", closes: "19:00" },
                { "@type": "OpeningHoursSpecification", dayOfWeek: "Saturday", opens: "09:00", closes: "19:00" },
              ],
              areaServed: [
                { "@type": "State", name: "Karnataka" },
                { "@type": "City", name: "Chitradurga" },
              ],
              foundingDate: "1995",
              founder: { "@type": "Person", name: "Athaulla Afroz" },
              priceRange: "₹₹",
              sameAs: [
                "https://wa.me/919845378626",
              ],
            }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "Abuzar Industries",
              url: "https://abuzarindustries.in",
              description:
                "Timber and wood supplier in Chitradurga, Karnataka — premium teak, white teak, and neem wood.",
            }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "BreadcrumbList",
              itemListElement: [
                { "@type": "ListItem", position: 1, name: "Home", item: "https://abuzarindustries.in" },
                { "@type": "ListItem", position: 2, name: "Products", item: "https://abuzarindustries.in/products" },
                { "@type": "ListItem", position: 3, name: "Calculator", item: "https://abuzarindustries.in/calculator" },
                { "@type": "ListItem", position: 4, name: "About", item: "https://abuzarindustries.in/about" },
                { "@type": "ListItem", position: 5, name: "Contact", item: "https://abuzarindustries.in/contact" },
              ],
            }),
          }}
        />
        <ScrollProgress />
        <Preloader />
        <Nav />
        <main id="main-content" className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
