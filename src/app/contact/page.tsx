import type { Metadata } from "next";
import ContactContent from "./ContactContent";
import Faq from "@/components/Faq";
import { FAQ_CONTACT } from "@/lib/content";
import { HOURS_SHORT } from "@/lib/business";

export const metadata: Metadata = {
  title: "Contact and Location, Chitradurga Yard",
  description: `Plot No 14, KSSIDC Industrial Area, DVG Road, Chitradurga 577501, near Traffic Police Station. Open ${HOURS_SHORT}. Call +91 98453 78626.`,
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <>
      <ContactContent />
      <Faq items={FAQ_CONTACT} title="Visiting the yard" />
    </>
  );
}
