import type { Metadata } from "next";
import ProductsContent from "./ProductsContent";
import JsonLd from "@/components/JsonLd";
import { BUSINESS, PRICES, SITE_URL, rupees } from "@/lib/business";

export const metadata: Metadata = {
  title: "Teak, White Teak and Neem Wood Prices",
  description: `Teak from ${rupees(PRICES.teakB)}/CFT (A grade about ${rupees(PRICES.teakA)}), white teak ${rupees(PRICES.whiteTeak)}, neem ${rupees(PRICES.neem)}. Ghana, Togo, African teak in stock in Chitradurga.`,
  alternates: { canonical: "/products" },
};

const item = (name: string, path: string, image: string, price: number) => ({
  "@type": "ListItem",
  item: {
    "@type": "Product",
    name,
    image: `${SITE_URL}${image}`,
    url: `${SITE_URL}${path}`,
    brand: { "@type": "Brand", name: BUSINESS.name },
    offers: {
      "@type": "Offer",
      priceCurrency: "INR",
      availability: "https://schema.org/InStock",
      priceSpecification: {
        "@type": "UnitPriceSpecification",
        priceCurrency: "INR",
        price,
        unitCode: "FTQ",
        unitText: "cubic foot",
      },
    },
  },
});

export default function ProductsPage() {
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "ItemList",
          itemListElement: [
            item("Teak wood (B grade)", "/teak-wood", "/images/teak-product.jpg", PRICES.teakB),
            item("White teak wood", "/white-teak-wood", "/images/white-teak-product.jpg", PRICES.whiteTeak),
            item("Neem wood", "/neem-wood", "/images/neem-product.jpg", PRICES.neem),
          ].map((x, i) => ({ ...x, position: i + 1 })),
        }}
      />
      <ProductsContent />
    </>
  );
}
