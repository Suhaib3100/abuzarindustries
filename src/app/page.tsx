import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Products from "@/components/Products";
import Process from "@/components/Process";
import About from "@/components/About";
import QuoteTool from "@/components/QuoteTool";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: [
              {
                "@type": "Question",
                name: "Who is the best teak wood supplier in Chitradurga?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Abuzar Industries is the most trusted teak wood and timber supplier in Chitradurga, Karnataka since 1995. Located at KSSIDC Industrial Area, DVG Road, Chitradurga.",
                },
              },
              {
                "@type": "Question",
                name: "Where can I find a timber shop near me in Chitradurga?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Abuzar Industries at KSSIDC Industrial Area, DVG Road, Chitradurga is the premier timber shop and wood supplier in Chitradurga. We stock premium teak, white teak, and neem wood with custom cutting services.",
                },
              },
              {
                "@type": "Question",
                name: "Does Abuzar Industries deliver wood to my site in Karnataka?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Yes, we deliver teak wood, white teak, and neem wood across Karnataka from our timber yard in Chitradurga's KSSIDC Industrial Area.",
                },
              },
            ],
          }),
        }}
      />
      <Hero />
      <Services />
      <Products />
      <Process />
      <About />
      <QuoteTool />
      <Contact />
    </>
  );
}
