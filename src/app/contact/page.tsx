import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import ContactContent from "./ContactContent";
import Faq from "@/components/Faq";
import { FAQ_CONTACT } from "@/lib/content";
import { BUSINESS, HOURS_SHORT } from "@/lib/business";

export const metadata: Metadata = pageMetadata({
  title: "Contact and Location, Chitradurga Yard",
  description: `${BUSINESS.street}, ${BUSINESS.city} ${BUSINESS.postalCode}, near Traffic Police Station. Open ${HOURS_SHORT}. Call ${BUSINESS.phoneDisplay}.`,
  path: "/contact",
});

export default function ContactPage() {
  return (
    <>
      <ContactContent />
      <Faq items={FAQ_CONTACT} title="Visiting the yard" />
    </>
  );
}
