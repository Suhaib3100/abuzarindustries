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
    <header className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-200/50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between py-4">
          <Link href="/" className="flex items-center gap-3" aria-label="Abuzar Industries Home">
            <div className="flex items-center gap-3 group">
              <div className="w-12 h-12 bg-gradient-to-br from-primary via-primary/90 to-accent rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-105">
                <span className="text-white font-bold text-xl">A</span>
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-xl text-gray-900 tracking-tight group-hover:text-primary transition-colors duration-200">
                  ABUZAR INDUSTRIES
                </span>
                <span className="text-xs text-gray-500 -mt-1 font-medium">Timber Specialists</span>
              </div>
            </div>
          </Link>

          <nav className="hidden items-center gap-6 lg:flex">
            {NAV.map((item) => (
              <Link 
                key={item.href} 
                href={item.href} 
                className="text-sm font-semibold text-gray-700 hover:text-primary transition-all duration-200 relative group px-3 py-2 rounded-lg hover:bg-gray-50"
              >
                {item.label}
                <span className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-primary to-accent transition-all duration-200 group-hover:w-3/4"></span>
              </Link>
            ))}
            <Button asChild className="bg-gradient-to-r from-accent to-yellow-500 text-gray-900 hover:from-yellow-500 hover:to-accent transition-all duration-200 font-bold px-6 py-2.5 rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
              <a href="tel:+919845378626" aria-label="Call Abuzar Industries now">
                Check Prices
              </a>
            </Button>
          </nav>

          <button
            aria-label="Toggle navigation"
            className="lg:hidden rounded-xl border-2 border-gray-200 p-3 hover:bg-gray-50 hover:border-primary transition-all duration-200 group"
            onClick={() => setOpen((v) => !v)}
          >
            <span className="block h-0.5 w-6 bg-gray-600 mb-1 group-hover:bg-primary transition-colors duration-200" />
            <span className="block h-0.5 w-6 bg-gray-600 mb-1 group-hover:bg-primary transition-colors duration-200" />
            <span className="block h-0.5 w-6 bg-gray-600 group-hover:bg-primary transition-colors duration-200" />
          </button>
        </div>

        {open && (
          <div className="lg:hidden bg-white/95 backdrop-blur-md border-t border-gray-200/50 shadow-xl">
            <nav className="flex flex-col gap-2 py-6 px-4">
              {NAV.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="rounded-xl px-4 py-3 text-gray-700 hover:bg-gradient-to-r hover:from-primary/10 hover:to-accent/10 hover:text-primary transition-all duration-200 font-semibold border border-transparent hover:border-primary/20"
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              <a
                href="tel:+919845378626"
                className="rounded-xl bg-gradient-to-r from-accent to-yellow-500 px-4 py-3 text-center text-sm font-bold text-gray-900 mt-4 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200"
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
