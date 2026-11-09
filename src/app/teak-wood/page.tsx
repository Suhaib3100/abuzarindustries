import type { Metadata } from "next";
import ContentPage, { Section, Table, Related } from "@/components/ContentPage";
import JsonLd from "@/components/JsonLd";
import { BUSINESS, PRICES, SITE_URL, rupees } from "@/lib/business";
import { FRAME_SIZES, TEAK_WEIGHT } from "@/lib/content";

export const metadata: Metadata = {
  title: "Teak Wood in Chitradurga: Ghana, Togo, Burma",
  description: `Ghana, Togo and African teak in stock, Burma teak on order. A grade about ${rupees(PRICES.teakA)}/CFT, B grade about ${rupees(PRICES.teakB)}/CFT. About 10% moisture, cut to any size.`,
  alternates: { canonical: "/teak-wood" },
};

const types = [
  {
    name: "Ghana teak",
    stock: "In stock",
    text: "Teak imported from Ghana in West Africa. Golden-brown wood with a clear grain, a popular choice for doors, frames and windows.",
  },
  {
    name: "Togo teak",
    stock: "In stock",
    text: "Teak imported from Togo, next to Ghana. Similar look and use as Ghana teak; we keep both so you can match colour and size.",
  },
  {
    name: "African teak",
    stock: "In stock",
    text: "Teak imported from other African countries. Good for frames and general woodwork where the budget matters.",
  },
  {
    name: "Burma teak",
    stock: "On order",
    text: "Teak from Myanmar, long known as the benchmark for main doors. We do not keep it in the yard; tell us your sizes and we arrange it.",
  },
];

export default function TeakWoodPage() {
  return (
    <ContentPage
      crumbs={[{ name: "Teak wood", path: "/teak-wood" }]}
      eyebrow="Teak wood supplier · Chitradurga, Karnataka"
      title={<>Teak wood: Ghana, Togo, African <span className="text-ochre">&amp; Burma teak</span></>}
      intro={
        <>
          <p>
            We have sold teak from our yard in the KSSIDC Industrial Area, Chitradurga since {BUSINESS.founded}.
            Ghana, Togo and African teak are in stock. Burma teak comes on order. Every piece is dried to about
            10% moisture and cut to the size you need.
          </p>
        </>
      }
      whatsappText="Hi Abuzar Industries, I want today's teak wood rate."
    >
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Product",
          name: "Teak wood (Ghana, Togo, African teak)",
          description:
            "Seasoned teak wood at about 10% moisture, A and B grade, cut to any size at Abuzar Industries, Chitradurga.",
          image: `${SITE_URL}/images/teak-product.jpg`,
          brand: { "@type": "Brand", name: BUSINESS.name },
          offers: {
            "@type": "Offer",
            url: `${SITE_URL}/teak-wood`,
            priceCurrency: "INR",
            availability: "https://schema.org/InStock",
            priceSpecification: {
              "@type": "UnitPriceSpecification",
              priceCurrency: "INR",
              minPrice: PRICES.teakB,
              maxPrice: PRICES.teakA,
              unitCode: "FTQ",
              unitText: "cubic foot",
            },
            seller: { "@type": "Organization", name: BUSINESS.name },
          },
        }}
      />

      <Section title="Teak we sell">
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {types.map((t) => (
            <li key={t.name} className="card-premium rounded-2xl p-6">
              <div className="flex items-center justify-between gap-3">
                <h3 className="font-[family:var(--font-serif)] font-semibold text-xl text-walnut">{t.name}</h3>
                <span
                  className={`rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider ${
                    t.stock === "In stock" ? "bg-green/10 text-green" : "bg-ochre/10 text-ochre"
                  }`}
                >
                  {t.stock}
                </span>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-ink-soft/85">{t.text}</p>
            </li>
          ))}
        </ul>
      </Section>

      <Section title="Grades and price per CFT">
        <p>
          Teak is priced by quality, not only by country. These are our approximate yard rates for {PRICES.asOf}.
          Call us for the exact rate for your sizes.
        </p>
        <Table
          caption="Teak wood grades and price per CFT"
          head={["Grade", "Approx. price", "What it looks like", "Best for"]}
          rows={[
            ["A grade", `${rupees(PRICES.teakA)} / CFT`, "Straighter grain, fewer knots, even colour", "Main door, visible frames, furniture"],
            ["B grade", `${rupees(PRICES.teakB)} / CFT`, "Some knots and colour change", "Inner frames, windows, hidden work"],
            ["Burma teak", "On order, call", "Rich golden-brown, oily feel", "Premium main doors"],
          ]}
        />
      </Section>

      <Section title="Teak wood details">
        <Table
          caption="Teak wood specifications"
          head={["Detail", "Our teak"]}
          rows={[
            ["Moisture", "About 10% (dried, ready to use)"],
            ["Weight", `${TEAK_WEIGHT.kgPerCft} per CFT (${TEAK_WEIGHT.kgPerM3} at about 12% moisture)`],
            ["Door frame sections", `${FRAME_SIZES.join(", ")} and any other size`],
            ["Planks and battens", "Cut to any length, width and thickness the market uses"],
            ["Sold by", "CFT (cubic feet): length in feet × width in inches × thickness in inches ÷ 144"],
          ]}
        />
        <p className="text-xs text-ink-soft/60">Weight range: {TEAK_WEIGHT.source}.</p>
      </Section>

      <Section title="How to check good teak">
        <ul className="list-disc pl-5 space-y-2">
          <li><strong className="text-walnut">Colour:</strong> golden to dark brown heartwood. Pale white edges are sapwood and should be little or none on doors.</li>
          <li><strong className="text-walnut">Feel:</strong> teak has natural oil, so a planed face feels slightly waxy.</li>
          <li><strong className="text-walnut">Grain and knots:</strong> straight grain and few knots for doors and visible frames.</li>
          <li><strong className="text-walnut">Dryness:</strong> ask for the moisture. Around 10–12% means the wood will shrink and bend less after fitting.</li>
          <li><strong className="text-walnut">Weight:</strong> dry teak is about 17–21 kg per CFT. Much heavier usually means wet wood.</li>
        </ul>
        <p>The best check is your own eyes: come to the yard and pick your pieces.</p>
      </Section>

      <Related
        links={[
          { href: "/teak-wood-for-doors-and-frames", label: "Teak for doors, frames and windows" },
          { href: "/teak-wood-price-per-cft", label: "Teak wood price per CFT" },
          { href: "/white-teak-wood", label: "White teak wood" },
          { href: "/delivery", label: "Delivery from Chitradurga" },
        ]}
      />
    </ContentPage>
  );
}
