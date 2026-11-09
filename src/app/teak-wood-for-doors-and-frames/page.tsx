import type { Metadata } from "next";
import ContentPage, { Section, Table, Related } from "@/components/ContentPage";
import { PRICES, rupees } from "@/lib/business";
import { FRAME_SIZES } from "@/lib/content";

export const metadata: Metadata = {
  title: "Teak Wood for Doors, Frames and Windows",
  description:
    'Which teak for the main door, inner doors, frames and windows, frame sizes (5"×3", 6"×4", 8"×4") and how much CFT one door frame needs.',
  alternates: { canonical: "/teak-wood-for-doors-and-frames" },
};

// Worked example: one door frame for a 7 ft × 3.5 ft opening, two 7 ft legs + a 4 ft top piece = 18 running feet.
const RUN_FT = 18;
const cft = (w: number, t: number) => (RUN_FT * w * t) / 144;
const example = [
  { size: '5" × 3"', v: cft(5, 3) },
  { size: '6" × 4"', v: cft(6, 4) },
];
const fmt = (n: number) => n.toFixed(2).replace(/\.?0+$/, "");

export default function DoorsFramesPage() {
  return (
    <ContentPage
      crumbs={[
        { name: "Teak wood", path: "/teak-wood" },
        { name: "Doors and frames", path: "/teak-wood-for-doors-and-frames" },
      ]}
      eyebrow="For house builders"
      title={<>Teak wood for doors, <span className="text-ochre">frames and windows</span></>}
      intro={
        <>
          <p>
            Most people building a house buy their wood from us as one package: door frames, doors and windows
            first, then furniture later. This page shows which wood to use where, the common frame sizes and how
            to work out the CFT.
          </p>
        </>
      }
      whatsappText="Hi Abuzar Industries, I need teak wood for doors and frames for my house."
    >
      <Section title="Which wood for which part">
        <Table
          caption="Wood choice by part of the house"
          head={["Part", "Usual choice", "Why"]}
          rows={[
            ["Main door and its frame", "A grade teak", "Faces sun and rain; straight grain and even colour look best"],
            ["Inner door frames", "A or B grade teak", "Strong and stable; knots are hidden by paint or polish"],
            ["Window frames and shutters", "Teak, or white teak to save cost", "Thin sections need dry, stable wood"],
            ["Inner doors on a budget", "White teak", `Lighter and cheaper (about ${rupees(PRICES.whiteTeak)}/CFT)`],
            ["Furniture (later)", "Teak", "Same wood as the doors, so the colour matches"],
          ]}
        />
      </Section>

      <Section title="Door frame sizes">
        <p>
          We cut frames in the common sections — {FRAME_SIZES.join(", ")} — and in any other size you ask for.
          The first number is the width that shows on the wall, the second is the thickness.
        </p>
        <ul className="list-disc pl-5 space-y-2">
          <li><strong className="text-walnut">5&quot; × 3&quot;:</strong> often used for inner doors and windows.</li>
          <li><strong className="text-walnut">6&quot; × 4&quot;:</strong> often used for main doors and thicker walls.</li>
          <li><strong className="text-walnut">8&quot; × 4&quot;:</strong> for large main doors and heavy shutters.</li>
        </ul>
        <p>Tell us your wall thickness and door size and we will suggest the section.</p>
      </Section>

      <Section title="How much teak does one door frame need?">
        <p>
          CFT = length (feet) × width (inches) × thickness (inches) ÷ 144. For a 7 ft × 3.5 ft door opening you need
          two 7 ft legs and a 4 ft top piece: {RUN_FT} running feet in total.
        </p>
        <Table
          caption="CFT and approximate cost of one door frame"
          head={["Frame section", "CFT for one frame", "A grade (approx.)", "B grade (approx.)"]}
          rows={example.map((e) => [
            e.size,
            `${fmt(e.v)} CFT`,
            rupees(Math.round(e.v * PRICES.teakA)),
            rupees(Math.round(e.v * PRICES.teakB)),
          ])}
        />
        <p className="text-xs text-ink-soft/60">
          Rough estimate at {PRICES.asOf} rates (A grade about {rupees(PRICES.teakA)}/CFT, B grade about {rupees(PRICES.teakB)}/CFT).
          Final billing follows the actual measured pieces.
        </p>
        <p>
          Add up your frames this way, or put all your sizes in our <a href="/calculator" className="text-ochre underline underline-offset-4">CFT calculator</a> and send them to us.
        </p>
      </Section>

      <Section title="Why dry wood matters for doors">
        <p>
          Wet wood shrinks as it dries, which opens gaps and bends shutters after fitting. Our teak is dried to about
          10% moisture before it leaves the yard, close to the level it settles at inside a house.
        </p>
      </Section>

      <Related
        links={[
          { href: "/teak-wood", label: "Teak wood types and grades" },
          { href: "/teak-wood-price-per-cft", label: "Teak wood price per CFT" },
          { href: "/white-teak-wood", label: "White teak for inner doors and windows" },
          { href: "/delivery", label: "Delivery to your site" },
        ]}
      />
    </ContentPage>
  );
}
