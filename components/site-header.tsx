"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { useState } from "react"

const NAV = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About Us" },
  { href: "/products", label: "Products" },
  { href: "/calculator", label: "Calculator" },
  { href: "/gallery", label: "Gallery" },
  { href: "/contact", label: "Contact" },
  { href: "/faq", label: "FAQ" },
]

export function SiteHeader() {
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur-md shadow-sm border-b border-gray-100">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between py-4">
          <Link href="/" className="flex items-center gap-3" aria-label="Abuzar Industries Home">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">A</span>
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-xl text-gray-900 tracking-tight">
                  ABUZAR INDUSTRIES
                </span>
                <span className="text-xs text-gray-500 -mt-1">Timber Specialists</span>
              </div>
            </div>
          </Link>

          <nav className="hidden items-center gap-8 lg:flex">
            {NAV.map((item) => (
              <Link 
                key={item.href} 
                href={item.href} 
                className="text-sm font-medium text-gray-700 hover:text-primary transition-colors duration-200 relative group"
              >
                {item.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-200 group-hover:w-full"></span>
              </Link>
            ))}
            <Button asChild className="bg-gradient-to-r from-accent to-yellow-500 text-gray-900 hover:from-yellow-500 hover:to-accent transition-all duration-200 font-semibold px-6 py-2 rounded-lg shadow-md hover:shadow-lg">
              <a href="tel:+919845378626" aria-label="Call Abuzar Industries now">
                Check Prices
              </a>
            </Button>
          </nav>

          <button
            aria-label="Toggle navigation"
            className="lg:hidden rounded-lg border border-gray-200 p-2 hover:bg-gray-50 transition-colors"
            onClick={() => setOpen((v) => !v)}
          >
            <span className="block h-0.5 w-6 bg-gray-600 mb-1" />
            <span className="block h-0.5 w-6 bg-gray-600 mb-1" />
            <span className="block h-0.5 w-6 bg-gray-600" />
          </button>
        </div>

        {open && (
          <div className="lg:hidden bg-white border-t border-gray-100 shadow-lg">
            <nav className="flex flex-col gap-1 py-4 px-4">
              {NAV.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="rounded-lg px-4 py-3 text-gray-700 hover:bg-gray-50 hover:text-primary transition-colors font-medium"
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              <a
                href="tel:+919845378626"
                className="rounded-lg bg-gradient-to-r from-accent to-yellow-500 px-4 py-3 text-center text-sm font-semibold text-gray-900 mt-2"
                onClick={() => setOpen(false)}
              >
                Check Prices
              </a>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
