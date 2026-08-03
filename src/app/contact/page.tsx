import type { Metadata } from "next";
import ContactContent from "./ContactContent";

export const metadata: Metadata = {
  title: "Contact Us | Timber Supplier Chitradurga | Abuzar Industries",
  description:
    "Contact Abuzar Industries — KSSIDC Industrial Area, DVG Road, Chitradurga. Call +91 98453 78626 or WhatsApp for teak wood prices, custom sizes & delivery across Karnataka.",
  alternates: { canonical: "https://abuzarindustries.in/contact" },
};

export default function ContactPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: [
              {
                "@type": "Question",
                name: "Where can I buy teak wood in Chitradurga?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Abuzar Industries at KSSIDC Industrial Area, DVG Road, Chitradurga is the leading teak wood supplier in Chitradurga since 1995. We stock premium teak, white teak, and neem wood with custom cutting and delivery across Karnataka.",
                },
              },
              {
                "@type": "Question",
                name: "What is the price of teak wood in Chitradurga?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Teak wood starts from ₹4,000 per cubic foot at Abuzar Industries in Chitradurga. White teak from ₹2,800 and neem wood from ₹1,000 per cubic foot. Prices vary by grade and origin. Contact us for current rates.",
                },
              },
              {
                "@type": "Question",
                name: "Do you deliver timber across Karnataka?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Yes, Abuzar Industries delivers teak wood, white teak, and neem wood across Karnataka from our Chitradurga yard in the KSSIDC Industrial Area.",
                },
              },
            ],
          }),
        }}
      />
      <ContactContent />
    </>
  );
}
