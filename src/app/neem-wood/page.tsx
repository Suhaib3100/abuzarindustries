import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import ContentPage, { Section, Table, Related } from "@/components/ContentPage";
import JsonLd from "@/components/JsonLd";
import { BUSINESS, PRICES, SITE_URL, rupees } from "@/lib/business";

export const metadata: Metadata = pageMetadata({
  title: "Neem Wood in Chitradurga",
  description: `Neem wood at about ${rupees(PRICES.neem)} per CFT for outdoor furniture, farm buildings and general construction. Cut to any size at Abuzar Industries, Chitradurga.`,
  path: "/neem-wood",
});

export default function NeemPage() {
  return (
    <ContentPage
      crumbs={[{ name: "Neem wood", path: "/neem-wood" }]}
      eyebrow="Value timber"
      title={<>Neem <span className="text-ochre">wood</span></>}
      intro={
        <p>
          Neem is a hard, strong local wood that insects tend to avoid. It is the lowest-cost wood we sell, used for
          outdoor furniture, farm buildings and general construction.
        </p>
      }
      whatsappText="Hi Abuzar Industries, I want the neem wood rate."
    >
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Product",
          name: "Neem wood",
          image: `${SITE_URL}/images/neem-product.jpg`,
          brand: { "@type": "Brand", name: BUSINESS.name },
          offers: {
            "@type": "Offer",
            url: `${SITE_URL}/neem-wood`,
            priceCurrency: "INR",
            availability: "https://schema.org/InStock",
            priceSpecification: {
              "@type": "UnitPriceSpecification",
              priceCurrency: "INR",
              price: PRICES.neem,
              unitCode: "FTQ",
              unitText: "cubic foot",
            },
            seller: { "@type": "Organization", name: BUSINESS.name },
          },
        }}
      />

      <Section title="Where neem works well">
        <Table
          caption="Common uses of neem wood"
          head={["Use", "Why neem"]}
          rows={[
            ["Outdoor furniture and benches", "Hard wood that insects tend to avoid"],
            ["Farm sheds and cattle sheds", "Strong and low cost"],
            ["General building work", "Beams, battens and supports where looks matter less"],
          ]}
        />
        <p>
          For doors and frames that show, most customers choose <a href="/teak-wood" className="text-ochre underline underline-offset-4">teak</a> or{" "}
          <a href="/white-teak-wood" className="text-ochre underline underline-offset-4">white teak</a>.
        </p>
      </Section>

      <Section title="Price and sizes">
        <p>
          About {rupees(PRICES.neem)} per CFT ({PRICES.asOf}). Cut to any size you need. Call for today&apos;s rate.
        </p>
      </Section>

      <Related
        links={[
          { href: "/teak-wood", label: "Teak wood" },
          { href: "/white-teak-wood", label: "White teak wood" },
          { href: "/teak-wood-price-per-cft", label: "Price per CFT" },
          { href: "/delivery", label: "Delivery" },
        ]}
      />
    </ContentPage>
  );
}
