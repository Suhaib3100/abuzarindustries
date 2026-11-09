import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import ContentPage, { Section, Table, Related } from "@/components/ContentPage";
import { PRICES, rupees } from "@/lib/business";

export const metadata: Metadata = pageMetadata({
  title: `Teak Wood Price per CFT (${PRICES.asOf})`,
  description: `Chitradurga rates: teak A grade about ${rupees(PRICES.teakA)}/CFT, B grade ${rupees(PRICES.teakB)}, white teak ${rupees(PRICES.whiteTeak)}, neem ${rupees(PRICES.neem)}. How to work out CFT.`,
  path: "/teak-wood-price-per-cft",
});

export default function PricePage() {
  return (
    <ContentPage
      crumbs={[
        { name: "Teak wood", path: "/teak-wood" },
        { name: "Price per CFT", path: "/teak-wood-price-per-cft" },
      ]}
      eyebrow={`Rates for ${PRICES.asOf}`}
      title={<>Teak wood price <span className="text-ochre">per CFT</span></>}
      intro={
        <p>
          Approximate rates at our Chitradurga yard. Timber is priced by quality and size, so these are a guide:
          call or WhatsApp us with your sizes for the exact rate.
        </p>
      }
      whatsappText="Hi Abuzar Industries, please send today's rate per CFT."
    >
      <Section title={`Price list (${PRICES.asOf})`}>
        <Table
          caption="Approximate timber price per CFT"
          head={["Wood", "Approx. price per CFT", "Stock"]}
          rows={[
            ["Teak, A grade", rupees(PRICES.teakA), "Ghana, Togo, African teak in stock"],
            ["Teak, B grade", rupees(PRICES.teakB), "In stock"],
            ["Burma teak", "Call for rate", "On order"],
            ["White teak", rupees(PRICES.whiteTeak), "In stock"],
            ["Neem wood", rupees(PRICES.neem), "In stock"],
          ]}
        />
        <p className="text-xs text-ink-soft/60">
          Rates before delivery. Delivery is charged by distance. Final billing follows the measured pieces.
        </p>
      </Section>

      <Section title="What changes the price">
        <ul className="list-disc pl-5 space-y-2">
          <li><strong className="text-walnut">Grade:</strong> fewer knots and straighter grain cost more.</li>
          <li><strong className="text-walnut">Size:</strong> long and wide pieces are harder to get, so they cost more per CFT.</li>
          <li><strong className="text-walnut">Origin:</strong> Burma teak costs more than Ghana, Togo or African teak.</li>
          <li><strong className="text-walnut">Delivery:</strong> charged separately, by distance from Chitradurga.</li>
        </ul>
      </Section>

      <Section title="How to work out CFT">
        <p>
          CFT (cubic feet) = length in feet × width in inches × thickness in inches ÷ 144.
        </p>
        <p>
          Example: one piece 7 ft long, 6 inches wide and 4 inches thick is 7 × 6 × 4 ÷ 144 = 1.17 CFT.
          At A grade (about {rupees(PRICES.teakA)}/CFT) that is about {rupees(Math.round((7 * 6 * 4 / 144) * PRICES.teakA))}.
        </p>
        <p>
          For a full list of sizes use the <a href="/calculator" className="text-ochre underline underline-offset-4">CFT calculator</a>.
          It adds every row and lets you send the list to us.
        </p>
      </Section>

      <Related
        links={[
          { href: "/teak-wood", label: "Teak wood types and grades" },
          { href: "/teak-wood-for-doors-and-frames", label: "How much teak a door frame needs" },
          { href: "/neem-wood", label: "Neem wood" },
          { href: "/delivery", label: "Delivery charges and towns" },
        ]}
      />
    </ContentPage>
  );
}
