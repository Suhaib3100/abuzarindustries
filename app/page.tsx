import type { Metadata } from "next"
import { Hero } from "@/components/hero"
import { Highlights } from "@/components/highlights"
import { Button } from "@/components/ui/button"
import { ProductCard } from "@/components/product-card"
import { WhatsAppFloat } from "@/components/whatsapp-float"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { GalleryPreview } from "@/components/gallery-preview"
import { ContactSection } from "@/components/contact-section"

export const metadata: Metadata = {
  title: "Abuzar Industries | Timber Supplier in Chitradurga",
  description: "Premium Teak & Neem wood planks. Custom sizes and delivery across Karnataka.",
}

export default function Page() {
  return (
    <>
      <Hero />
      <Highlights />

      <section className="mx-auto max-w-6xl px-4 pb-12 md:pb-16">
        <div className="flex items-center justify-between">
          <h2 className="font-serif text-2xl font-semibold md:text-3xl">Featured Products</h2>
          <Button asChild variant="ghost">
            <a href="/products" className="text-foreground/80 hover:text-foreground">
              View all
            </a>
          </Button>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-3">
          <ProductCard
            title="Teak Wood Planks"
            imageQuery="teak%20wood%20planks%20stack"
            sizes={['2" x 6" x 6\'', '2" x 8" x 8\'', "Custom sizes"]}
            price="₹4000 per cubic feet"
          />
          <ProductCard
            title="White Teak Wood Planks"
            imageQuery="white%20teak%20wood%20planks%20stack"
            sizes={['1.5" x 6" x 6\'', '2" x 6" x 8\'', "Custom sizes"]}
            price="₹2800 per cubic feet"
          />
          <ProductCard
            title="Neem Wood Planks"
            imageQuery="neem%20wood%20planks%20stack"
            sizes={['1" x 4" x 6\'', '2" x 6" x 8\'', "Custom sizes"]}
            price="₹1500 per cubic feet"
          />
        </div>

        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <Button asChild className="bg-primary text-primary-foreground hover:opacity-90">
            <a href="/calculator">Try Price Calculator</a>
          </Button>
          <Button
            asChild
            variant="outline"
            className="border-accent text-accent hover:bg-accent hover:text-accent-foreground bg-transparent"
          >
            <a href="https://wa.me/919845378626" target="_blank" rel="noopener noreferrer">
              WhatsApp Us
            </a>
          </Button>
        </div>
      </section>

      <section id="calculator" className="mx-auto max-w-6xl px-4 py-12 md:py-16">
        <div className="text-center">
          <h2 className="font-serif text-2xl font-semibold md:text-3xl">Professional Timber Calculator</h2>
          <p className="mt-2 max-w-2xl mx-auto text-sm text-foreground/70">
            Get instant pricing for your timber requirements with our Excel-like calculator. 
            Calculate multiple items, generate professional quotes, and send directly via WhatsApp.
          </p>
          <div className="mt-8">
            <Button asChild size="lg" className="bg-gradient-to-r from-accent to-yellow-500 text-gray-900 hover:from-yellow-500 hover:to-accent font-semibold px-8 py-4 text-lg rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-200">
              <a href="/calculator">
                Open Professional Calculator
              </a>
            </Button>
          </div>
          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4 max-w-3xl mx-auto">
            <div className="text-center p-4">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-3">
                <span className="text-2xl">📊</span>
              </div>
              <h3 className="font-semibold text-sm">Excel-like Interface</h3>
              <p className="text-xs text-foreground/70 mt-1">Familiar spreadsheet experience</p>
            </div>
            <div className="text-center p-4">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-3">
                <span className="text-2xl">💰</span>
              </div>
              <h3 className="font-semibold text-sm">Instant Pricing</h3>
              <p className="text-xs text-foreground/70 mt-1">Real-time calculations</p>
            </div>
            <div className="text-center p-4">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-3">
                <span className="text-2xl">📱</span>
              </div>
              <h3 className="font-semibold text-sm">WhatsApp Quote</h3>
              <p className="text-xs text-foreground/70 mt-1">Send formatted quotes instantly</p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-12 md:py-16">
        <div className="rounded-lg border bg-card p-6 md:p-8">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="font-serif text-2xl font-semibold md:text-3xl">About Us</h2>
              <p className="mt-2 max-w-3xl text-foreground/80">
                Abuzar Industries, located in KSSIDC Industrial Area, DVG Road, Chitradurga, is a trusted supplier of
                teak, white teak, and neem wood. We provide planks in any custom size with guaranteed quality and timely
                delivery.
              </p>
            </div>
            <div className="inline-flex items-center rounded-full border px-4 py-2 text-sm">
              Trusted Supplier Since 2012
            </div>
          </div>
        </div>
      </section>

      <section id="gallery" className="mx-auto max-w-6xl px-4 py-12 md:py-16">
        <h2 className="font-serif text-2xl font-semibold md:text-3xl">Gallery</h2>
        <p className="mt-2 max-w-2xl text-foreground/80">Our Work. Our Quality. Your Trust.</p>
        <GalleryPreview />
        <div className="mt-6">
          <Button asChild variant="ghost">
            <a href="/gallery">View full gallery</a>
          </Button>
        </div>
      </section>

      <section className="w-full bg-primary py-6 text-primary-foreground">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-4 md:flex-row">
          <p className="text-center text-lg font-medium">Need Timber Pricing Today? Message Us Now.</p>
          <Button asChild className="bg-accent text-accent-foreground hover:opacity-90">
            <a
              href="https://wa.me/919845378626"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp Abuzar Industries"
            >
              WhatsApp
            </a>
          </Button>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-12 md:py-16">
        <h2 className="font-serif text-2xl font-semibold md:text-3xl">FAQ</h2>
        <Accordion type="single" collapsible className="mt-4">
          <AccordionItem value="delivery">
            <AccordionTrigger>Do you deliver outside Chitradurga?</AccordionTrigger>
            <AccordionContent>Yes, across Karnataka.</AccordionContent>
          </AccordionItem>
          <AccordionItem value="sizes">
            <AccordionTrigger>What sizes are available?</AccordionTrigger>
            <AccordionContent>Custom cut as per requirement (L × W × T).</AccordionContent>
          </AccordionItem>
          <AccordionItem value="order">
            <AccordionTrigger>How do I place an order?</AccordionTrigger>
            <AccordionContent>Call or WhatsApp us directly.</AccordionContent>
          </AccordionItem>
        </Accordion>
      </section>

      <section id="contact" className="mx-auto max-w-6xl px-4 py-12 md:py-16">
        <h2 className="font-serif text-2xl font-semibold md:text-3xl">Contact</h2>
        <ContactSection />
      </section>

      <WhatsAppFloat />
    </>
  )
}
