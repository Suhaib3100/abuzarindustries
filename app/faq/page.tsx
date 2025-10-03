import type { Metadata } from "next"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export const metadata: Metadata = {
  title: "FAQ | Abuzar Industries",
  description:
    "Answers about delivery, sizing, and order placement. Delivery across Karnataka, custom sizes, and simple ordering.",
}

export default function Page() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-10 md:py-16">
      <h1 className="font-serif text-3xl font-semibold md:text-4xl">Frequently Asked Questions</h1>

      <Accordion type="single" collapsible className="mt-6">
        <AccordionItem value="delivery">
          <AccordionTrigger>Do you deliver outside Chitradurga?</AccordionTrigger>
          <AccordionContent>Yes, we deliver across Karnataka.</AccordionContent>
        </AccordionItem>

        <AccordionItem value="sizes">
          <AccordionTrigger>What sizes are available?</AccordionTrigger>
          <AccordionContent>
            We provide custom cutting as per your requirements. Provide L × W × T, and we will cut to size.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="order">
          <AccordionTrigger>How do I place an order?</AccordionTrigger>
          <AccordionContent>Call or WhatsApp us directly for quick assistance and confirmation.</AccordionContent>
        </AccordionItem>
      </Accordion>
    </section>
  )
}
