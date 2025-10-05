import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import { Playfair_Display } from "next/font/google"
import "./globals.css"
import { FloatingHeader } from "@/components/ui/floating-header"
import { SiteFooter } from "@/components/site-footer"
import { VideoPopup } from "@/components/video-popup"
import { SuhaibTracker } from "@/components/suhaib-tracker"
import { BreadcrumbSchema } from "@/components/breadcrumb-schema"
import { Suspense } from "react"

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
})

export const metadata: Metadata = {
  title: "Best Teak Wood Chitradurga | Abuzar Industries - Timber Merchant",
  description:
    "Best teak wood supplier in Chitradurga. Premium teak, white teak & neem wood planks. Custom sizes, delivery across Karnataka. KSSIDC Industrial Area, DVG Road, Chitradurga. Call 9845378626",
  keywords: [
    "best teak wood chitradurga",
    "teak wood near me",
    "timber near me",
    "wood industries chitradurga",
    "timber merchant chitradurga",
    "teak wood supplier karnataka",
    "neem wood planks chitradurga",
    "white teak wood chitradurga",
    "timber supplier chitradurga",
    "wood planks chitradurga",
    "construction timber chitradurga",
    "furniture wood chitradurga",
    "abuzar industries",
    "kssidc industrial area chitradurga",
    "dvg road chitradurga timber",
    "custom wood cutting chitradurga",
    "timber delivery karnataka",
    "wood price calculator chitradurga",
    "premium timber chitradurga",
    "quality wood supplier chitradurga"
  ],
  openGraph: {
    title: "Best Teak Wood Chitradurga | Abuzar Industries",
    description:
      "Premium teak wood supplier in Chitradurga. Custom sizes, quality timber, delivery across Karnataka. Trusted since 2012.",
    type: "website",
    url: "https://abuzarindustries.in",
    siteName: "Abuzar Industries",
    locale: "en_IN",
    images: [
      {
        url: "https://abuzarindustries.in/images/abuzar-wood.jpg",
        width: 1200,
        height: 630,
        alt: "Abuzar Industries - Best Teak Wood Chitradurga",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Best Teak Wood Chitradurga | Abuzar Industries",
    description: "Premium teak wood supplier in Chitradurga. Custom sizes, quality timber, delivery across Karnataka.",
    images: ["https://abuzarindustries.in/images/abuzar-wood.jpg"],
  },
  alternates: {
    canonical: "https://abuzarindustries.in",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-verification-code",
    yandex: "your-yandex-verification-code",
    yahoo: "your-yahoo-verification-code",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              "name": "Abuzar Industries",
              "description": "Best teak wood supplier in Chitradurga. Premium teak, white teak & neem wood planks. Custom sizes, delivery across Karnataka.",
              "url": "https://abuzarindustries.in",
              "telephone": "+91-9845378626",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "KSSIDC Industrial Area, DVG Road",
                "addressLocality": "Chitradurga",
                "addressRegion": "Karnataka",
                "postalCode": "577501",
                "addressCountry": "IN"
              },
              "geo": {
                "@type": "GeoCoordinates",
                "latitude": "14.2264",
                "longitude": "76.4008"
              },
              "openingHours": "Mo-Sa 08:00-18:00",
              "priceRange": "₹1500-₹4000",
              "paymentAccepted": "Cash, Bank Transfer, UPI",
              "currenciesAccepted": "INR",
              "areaServed": {
                "@type": "State",
                "name": "Karnataka"
              },
              "hasOfferCatalog": {
                "@type": "OfferCatalog",
                "name": "Timber Products",
                "itemListElement": [
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Product",
                      "name": "Teak Wood Planks",
                      "description": "Premium teak wood planks in custom sizes"
                    }
                  },
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Product",
                      "name": "White Teak Wood Planks",
                      "description": "High-quality white teak wood planks"
                    }
                  },
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Product",
                      "name": "Neem Wood Planks",
                      "description": "Durable neem wood planks for construction"
                    }
                  }
                ]
              },
              "sameAs": [
                "https://wa.me/919845378626"
              ],
              "image": "https://abuzarindustries.in/images/abuzar-wood.jpg",
              "logo": "https://abuzarindustries.in/images/abuzar-logo.svg",
              "foundingDate": "2012",
              "slogan": "Quality Timber for Every Construction Need"
            })
          }}
        />
      </head>
      <body className={`antialiased font-sans ${GeistSans.variable} ${GeistMono.variable} ${playfair.variable}`}>
        <Suspense fallback={null}>
          <BreadcrumbSchema />
          <SuhaibTracker />
          <FloatingHeader />
          <main>{children}</main>
          <SiteFooter />
          <VideoPopup />
          <Analytics />
        </Suspense>
      </body>
    </html>
  )
}
