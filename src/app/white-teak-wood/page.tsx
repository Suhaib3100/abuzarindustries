import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import ContentPage, { Section, Table, Related } from "@/components/ContentPage";
import JsonLd from "@/components/JsonLd";
import { BUSINESS, PRICES, SITE_URL, rupees } from "@/lib/business";

export const metadata: Metadata = pageMetadata({
  title: "White Teak Wood in Chitradurga",
  description: `White teak at about ${rupees(PRICES.whiteTeak)} per CFT for inner doors, windows and interior woodwork. Cut to any size at Abuzar Industries, Chitradurga.`,
  path: "/white-teak-wood",
});

export default function WhiteTeakPage() {
  return (
    <ContentPage
      crumbs={[{ name: "White teak wood", path: "/white-teak-wood" }]}
      eyebrow="Lower-cost timber"
      title={<>White teak <span className="text-ochre">wood</span></>}
      intro={
        <p>
          White teak is a pale, light wood that is easy to work. It costs less than teak, so many house builders use
          it for inner doors, windows and interior work, and keep teak for the main door.
        </p>
      }
      whatsappText="Hi Abuzar Industries, I want the white teak rate."
    >
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Product",
          name: "White teak wood",
          image: `${SITE_URL}/images/white-teak-product.jpg`,
          brand: { "@type": "Brand", name: BUSINESS.name },
          offers: {
            "@type": "Offer",
            url: `${SITE_URL}/white-teak-wood`,
            priceCurrency: "INR",
            availability: "https://schema.org/InStock",
            priceSpecification: {
              "@type": "UnitPriceSpecification",
              priceCurrency: "INR",
              price: PRICES.whiteTeak,
              unitCode: "FTQ",
              unitText: "cubic foot",
            },
            seller: { "@type": "Organization", name: BUSINESS.name },
          },
        }}
      />

      <Section title="White teak or teak?">
        <Table
          caption="White teak compared with teak"
          head={["", "White teak", "Teak"]}
          rows={[
            ["Approx. price", `${rupees(PRICES.whiteTeak)} / CFT`, `${rupees(PRICES.teakB)}–${rupees(PRICES.teakA)} / CFT`],
            ["Colour", "Pale cream", "Golden to dark brown"],
            ["Weight", "Lighter", "About 17–21 kg per CFT"],
            ["Good for", "Inner doors, windows, interior work", "Main door, frames, furniture"],
          ]}
        />
      </Section>

      <Section title="Sizes">
        <p>
          We cut white teak to any length, width and thickness: planks, battens, door and window frames. Send your
          sizes or use the <a href="/calculator" className="text-ochre underline underline-offset-4">CFT calculator</a>.
        </p>
      </Section>

      <Related
        links={[
          { href: "/teak-wood", label: "Teak wood types and grades" },
          { href: "/teak-wood-for-doors-and-frames", label: "Which wood for which door" },
          { href: "/neem-wood", label: "Neem wood" },
          { href: "/teak-wood-price-per-cft", label: "Price per CFT" },
        ]}
      />
    </ContentPage>
  );
}
