import type { Metadata } from "next";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Products from "@/components/Products";
import Process from "@/components/Process";
import About from "@/components/About";
import GoogleReviews from "@/components/GoogleReviews";
import QuoteTool from "@/components/QuoteTool";
import Faq from "@/components/Faq";
import Contact from "@/components/Contact";
import { FAQ_HOME } from "@/lib/content";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

export default function Home() {
  return (
    <>
      <Hero />
      <Services />
      <Products />
      <Process />
      <About />
      <GoogleReviews />
      <QuoteTool />
      <Faq items={FAQ_HOME} />
      <Contact />
    </>
  );
}
