import type { Metadata } from "next"
import { Hero } from "@/components/hero"
import { Highlights } from "@/components/highlights"
import { Button } from "@/components/ui/button"
import { ProductCard } from "@/components/product-card"
import { WhatsAppFloat } from "@/components/whatsapp-float"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { GalleryPreview } from "@/components/gallery-preview"
import { ContactSection } from "@/components/contact-section"
import { TeakWoodSchema, WhiteTeakWoodSchema, NeemWoodSchema } from "@/components/product-schema"

export const metadata: Metadata = {
  title: "Best Teak Wood Chitradurga | Premium Timber Supplier | Abuzar Industries",
  description: "Best teak wood supplier in Chitradurga. Premium teak, white teak & neem wood planks. Custom sizes, delivery across Karnataka. KSSIDC Industrial Area, DVG Road. Call 9845378626",
  keywords: [
    "best teak wood chitradurga",
    "teak wood near me",
    "timber near me",
    "wood industries chitradurga",
    "timber merchant chitradurga",
    "premium teak wood chitradurga",
    "white teak wood chitradurga",
    "neem wood planks chitradurga",
    "custom wood cutting chitradurga",
    "timber delivery karnataka",
    "wood price calculator chitradurga",
    "construction timber chitradurga",
    "furniture wood chitradurga",
    "kssidc industrial area chitradurga",
    "dvg road chitradurga timber"
  ],
  openGraph: {
    title: "Best Teak Wood Chitradurga | Abuzar Industries",
    description: "Premium teak wood supplier in Chitradurga. Custom sizes, quality timber, delivery across Karnataka. Trusted since 2012.",
    url: "https://abuzarindustries.in",
    type: "website",
    images: [
      {
        url: "https://abuzarindustries.in/images/abuzar-wood.jpg",
        width: 1200,
        height: 630,
        alt: "Best Teak Wood Chitradurga - Abuzar Industries",
      },
    ],
  },
  alternates: {
    canonical: "https://abuzarindustries.in",
  },
}

export default function Page() {
  return (
    <>
      <TeakWoodSchema />
      <WhiteTeakWoodSchema />
      <NeemWoodSchema />
      <Hero />
      <Highlights />

      <section className="mx-auto max-w-6xl px-4 pb-12 md:pb-16">
        <div className="flex items-center justify-between">
          <h2 className="font-serif text-2xl font-semibold md:text-3xl">Best Teak Wood Products in Chitradurga</h2>
          <Button asChild variant="ghost">
            <a href="/products" className="text-foreground/80 hover:text-foreground">
              View all timber products
            </a>
          </Button>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-3">
          <ProductCard
            title="Premium Teak Wood Planks - Best in Chitradurga"
            imageQuery="teak%20wood%20planks%20stack"
            sizes={['2" x 6" x 6\'', '2" x 8" x 8\'', "Custom sizes available"]}
            price="₹4000 per cubic feet"
          />
          <ProductCard
            title="White Teak Wood Planks - Chitradurga Supplier"
            imageQuery="white%20teak%20wood%20planks%20stack"
            sizes={['1.5" x 6" x 6\'', '2" x 6" x 8\'', "Custom sizes available"]}
            price="₹2800 per cubic feet"
          />
          <ProductCard
            title="Neem Wood Planks - Timber Near Me"
            imageQuery="neem%20wood%20planks%20stack"
            sizes={['1" x 4" x 6\'', '2" x 6" x 8\'', "Custom sizes available"]}
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
          <Button asChild variant="ghost" className="text-foreground/80 hover:text-foreground">
            <a href="/products">View All Products</a>
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
              <p className="text-xs text-foreground/70 mt-1">Familiar spreadsheet experience for <a href="/products" className="text-primary hover:underline">timber calculations</a></p>
            </div>
            <div className="text-center p-4">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-3">
                <span className="text-2xl">💰</span>
              </div>
              <h3 className="font-semibold text-sm">Instant Pricing</h3>
              <p className="text-xs text-foreground/70 mt-1">Real-time calculations for <a href="/products" className="text-primary hover:underline">teak wood prices</a></p>
            </div>
            <div className="text-center p-4">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-3">
                <span className="text-2xl">📱</span>
              </div>
              <h3 className="font-semibold text-sm">WhatsApp Quote</h3>
              <p className="text-xs text-foreground/70 mt-1">Send formatted quotes to <a href="/contact" className="text-primary hover:underline">contact us</a> instantly</p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-12 md:py-16">
        <div className="rounded-lg border bg-card p-6 md:p-8">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="font-serif text-2xl font-semibold md:text-3xl">Best Teak Wood Supplier in Chitradurga - Abuzar Industries</h2>
              <p className="mt-2 max-w-3xl text-foreground/80">
                Abuzar Industries is the leading timber merchant in Chitradurga, located in KSSIDC Industrial Area, DVG Road. 
                We are the best teak wood supplier in Chitradurga, specializing in premium teak, white teak, and neem wood planks. 
                Our wood industries in Chitradurga provide custom-sized timber with guaranteed quality and timely delivery across Karnataka. 
                When you search for "teak wood near me" or "timber near me", we are your trusted local timber supplier. 
                Learn more about our <a href="/products" className="text-primary hover:underline font-medium">premium timber products</a> and 
                <a href="/contact" className="text-primary hover:underline font-medium"> get a quote</a> for your construction needs.
              </p>
            </div>
            <div className="inline-flex items-center rounded-full border px-4 py-2 text-sm">
              Best Timber Supplier Since 2012
            </div>
          </div>
        </div>
      </section>

      <section id="gallery" className="mx-auto max-w-6xl px-4 py-12 md:py-16">
        <h2 className="font-serif text-2xl font-semibold md:text-3xl">Timber Gallery - Best Teak Wood Chitradurga</h2>
        <p className="mt-2 max-w-2xl text-foreground/80">Our Premium Timber Work. Quality Teak Wood. Your Trusted Supplier in Chitradurga.</p>
        <GalleryPreview />
        <div className="mt-6 flex flex-col sm:flex-row gap-3">
          <Button asChild variant="ghost">
            <a href="/gallery">View full timber gallery</a>
          </Button>
          <Button asChild variant="outline">
            <a href="/products">See our timber products</a>
          </Button>
        </div>
      </section>

      <section className="w-full bg-primary py-6 text-primary-foreground">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-4 md:flex-row">
          <p className="text-center text-lg font-medium">Need Best Teak Wood Pricing in Chitradurga? Message Us Now.</p>
          <Button asChild className="bg-accent text-accent-foreground hover:opacity-90">
            <a
              href="https://wa.me/919845378626"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp Best Teak Wood Supplier Chitradurga"
            >
              WhatsApp for Timber Quote
            </a>
          </Button>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-12 md:py-16">
        <h2 className="font-serif text-2xl font-semibold md:text-3xl">Frequently Asked Questions - Best Teak Wood Chitradurga</h2>
        <Accordion type="single" collapsible className="mt-4">
          <AccordionItem value="delivery">
            <AccordionTrigger>Do you deliver timber outside Chitradurga?</AccordionTrigger>
            <AccordionContent>Yes, we deliver premium teak wood and timber across Karnataka. We are the best timber supplier in Chitradurga with statewide delivery. <a href="/contact" className="text-primary hover:underline">Contact us</a> for delivery details.</AccordionContent>
          </AccordionItem>
          <AccordionItem value="sizes">
            <AccordionTrigger>What timber sizes are available in Chitradurga?</AccordionTrigger>
            <AccordionContent>We provide custom cut teak wood, white teak, and neem wood planks as per your requirement (Length × Width × Thickness). Best timber near me with custom sizing. View our <a href="/products" className="text-primary hover:underline">timber products</a> for available sizes.</AccordionContent>
          </AccordionItem>
          <AccordionItem value="order">
            <AccordionTrigger>How do I order best teak wood in Chitradurga?</AccordionTrigger>
            <AccordionContent>Call us at 9845378626 or WhatsApp us directly. We are the leading wood industries in Chitradurga with easy ordering process. You can also <a href="/contact" className="text-primary hover:underline">contact us online</a> for quotes.</AccordionContent>
          </AccordionItem>
          <AccordionItem value="quality">
            <AccordionTrigger>Why choose Abuzar Industries for teak wood in Chitradurga?</AccordionTrigger>
            <AccordionContent>We are the best teak wood supplier in Chitradurga with premium quality timber, custom sizes, and trusted delivery since 2012. Located in KSSIDC Industrial Area, DVG Road. <a href="/about" className="text-primary hover:underline">Learn more about us</a> and our quality standards.</AccordionContent>
          </AccordionItem>
        </Accordion>
      </section>

      <section id="contact" className="mx-auto max-w-6xl px-4 py-12 md:py-16">
        <h2 className="font-serif text-2xl font-semibold md:text-3xl">Contact Best Teak Wood Supplier in Chitradurga</h2>
        <ContactSection />
      </section>

      <WhatsAppFloat />
    </>
  )
}
