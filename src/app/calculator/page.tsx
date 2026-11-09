import type { Metadata } from "next";
import CalculatorContent from "./CalculatorContent";

export const metadata: Metadata = {
  title: "Timber CFT Calculator: Teak, White Teak and Neem",
  description:
    "Work out timber CFT (length ft × width in × thickness in ÷ 144) for many pieces, see an estimated price and send the list to us.",
  alternates: { canonical: "/calculator" },
};

export default function CalculatorPage() {
  return <CalculatorContent />;
}
