import type React from "react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Contact | Abuzar Industries",
  description: "Contact Abuzar Industries – Address: KSSIDC Industrial Area, DVG Road, Chitradurga. Phone: 9845378626.",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return <>{children}</>
}
