import type { Metadata } from "next";
import CalculatorContent from "./CalculatorContent";

export const metadata: Metadata = {
  title: "Timber Price Calculator | Instant Quotes | Abuzar Industries Chitradurga",
  description:
    "Calculate timber costs instantly with our professional calculator. Teak, white teak & neem wood in Chitradurga, Karnataka. Get accurate CFT calculations and send quotes via WhatsApp from KSSIDC Industrial Area yard.",
  alternates: { canonical: "https://abuzarindustries.in/calculator" },
};

export default function CalculatorPage() {
  return <CalculatorContent />;
}
