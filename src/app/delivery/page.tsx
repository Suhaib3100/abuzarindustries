import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import ContentPage, { Section, Related } from "@/components/ContentPage";
import { BUSINESS, DELIVERY_TOWNS, HOURS } from "@/lib/business";

export const metadata: Metadata = pageMetadata({
  title: "Timber Delivery from Chitradurga",
  description: `Timber delivery from our Chitradurga yard to ${DELIVERY_TOWNS.join(", ")} and nearby towns, charged by distance.`,
  path: "/delivery",
});

export default function DeliveryPage() {
  return (
    <ContentPage
      crumbs={[{ name: "Delivery", path: "/delivery" }]}
      eyebrow="From our Chitradurga yard"
      title={<>Timber delivery <span className="text-ochre">to your site</span></>}
      intro={
        <p>
          We load your wood at our yard in the KSSIDC Industrial Area, Chitradurga and send it to your site.
          Delivery is charged by distance.
        </p>
      }
      whatsappText="Hi Abuzar Industries, I want a delivery quote for timber."
    >
      <Section title="Towns we deliver to">
        <ul className="flex flex-wrap gap-2">
          {DELIVERY_TOWNS.map((t) => (
            <li key={t} className="rounded-full border border-walnut/10 bg-paper px-4 py-2 text-sm font-semibold text-walnut">{t}</li>
          ))}
        </ul>
        <p>And other towns near Chitradurga. Ask us for any place not on this list.</p>
      </Section>

      <Section title="How it works">
        <ol className="list-decimal pl-5 space-y-2">
          <li><strong className="text-walnut">Pick your wood.</strong> Most customers come to the yard, check the wood and choose their pieces.</li>
          <li><strong className="text-walnut">We cut it to size.</strong> Frames, planks and battens are cut to your measurements.</li>
          <li><strong className="text-walnut">The truck leaves with you.</strong> We load it and send it to your site the same time you leave.</li>
        </ol>
        <p>
          Can&apos;t visit? Send your sizes on WhatsApp ({BUSINESS.phoneDisplay}) and we will quote the wood and the delivery.
        </p>
      </Section>

      <Section title="Yard timings">
        <ul className="space-y-1">
          {HOURS.map((h) => (
            <li key={h.label}><strong className="text-walnut">{h.label}:</strong> {h.time}</li>
          ))}
        </ul>
        <p>{BUSINESS.street}, {BUSINESS.city} {BUSINESS.postalCode}. {BUSINESS.landmark}.</p>
      </Section>

      <Related
        links={[
          { href: "/teak-wood", label: "Teak wood" },
          { href: "/teak-wood-price-per-cft", label: "Price per CFT" },
          { href: "/contact", label: "Contact and map" },
          { href: "/teak-wood-for-doors-and-frames", label: "Doors and frames" },
        ]}
      />
    </ContentPage>
  );
}
