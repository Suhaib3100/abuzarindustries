import type { Metadata } from "next";
import ProductsContent from "./ProductsContent";

export const metadata: Metadata = {
  title: "Best Teak Wood Products Chitradurga | Premium Timber | Abuzar Industries",
  description:
    "Best teak wood products in Chitradurga. Premium teak, white teak & neem wood planks. Custom sizes, construction timber, furniture wood. KSSIDC Industrial Area, DVG Road.",
  alternates: { canonical: "https://abuzarindustries.in/products" },
};

export default function ProductsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            {
              "@context": "https://schema.org",
              "@type": "Product",
              name: "Premium Teak Wood Planks",
              description:
                "High-grade imported teak wood — Ghana, Togo & Burma. Kiln-dried, ready for joinery, furniture and premium construction.",
              image: "https://abuzarindustries.in/images/teak-product.jpg",
              brand: { "@type": "Brand", name: "Abuzar Industries" },
              offers: {
                "@type": "Offer",
                price: "4000",
                priceCurrency: "INR",
                priceUnit: "per cubic foot",
                availability: "https://schema.org/InStock",
                seller: { "@type": "Organization", name: "Abuzar Industries" },
              },
            },
            {
              "@context": "https://schema.org",
              "@type": "Product",
              name: "White Teak Wood Planks",
              description:
                "Quality white teak wood for doors, windows, interior woodwork, and construction. Seasoned and graded.",
              image: "https://abuzarindustries.in/images/white-teak-product.jpg",
              brand: { "@type": "Brand", name: "Abuzar Industries" },
              offers: {
                "@type": "Offer",
                price: "2800",
                priceCurrency: "INR",
                priceUnit: "per cubic foot",
                availability: "https://schema.org/InStock",
                seller: { "@type": "Organization", name: "Abuzar Industries" },
              },
            },
            {
              "@context": "https://schema.org",
              "@type": "Product",
              name: "Neem Wood Planks",
              description:
                "Durable, pest-resistant neem wood. Perfect for outdoor furniture, construction, and agricultural use.",
              image: "https://abuzarindustries.in/images/neem-product.jpg",
              brand: { "@type": "Brand", name: "Abuzar Industries" },
              offers: {
                "@type": "Offer",
                price: "1000",
                priceCurrency: "INR",
                priceUnit: "per cubic foot",
                availability: "https://schema.org/InStock",
                seller: { "@type": "Organization", name: "Abuzar Industries" },
              },
            },
          ]),
        }}
      />
      <ProductsContent />
    </>
  );
}
