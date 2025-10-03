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
import { Suspense } from "react"

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
})

export const metadata: Metadata = {
  title: "Abuzar Industries | Quality Timber in Chitradurga",
  description:
    "Timber supplier specializing in Teak & Neem wood planks. Custom sizes, delivery across Karnataka. Located in KSSIDC Industrial Area, DVG Road, Chitradurga.",
  keywords: [
    "Timber in Chitradurga",
    "Teak wood supplier Karnataka",
    "Neem wood planks Chitradurga",
    "Abuzar Industries",
  ],
  openGraph: {
    title: "Abuzar Industries",
    description:
      "Quality Timber for Every Construction Need. Specialists in Teak & Neem wood planks — any size available.",
    type: "website",
  },
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`antialiased font-sans ${GeistSans.variable} ${GeistMono.variable} ${playfair.variable}`}>
        <Suspense fallback={null}>
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
