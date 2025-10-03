"use client"

export function WhatsAppFloat() {
  return (
    <a
      href="https://wa.me/919845378626"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed bottom-4 right-4 z-50 inline-flex items-center justify-center rounded-full bg-accent p-4 text-accent-foreground shadow md:hidden"
    >
      <span className="sr-only">WhatsApp</span>
      {/* Simple plus/check icon substitute */}
      <span aria-hidden="true" className="text-lg font-bold">
        WA
      </span>
    </a>
  )
}
