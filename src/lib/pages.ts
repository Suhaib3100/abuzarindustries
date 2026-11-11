import { BUSINESS } from "./business";
import { FRAME_SIZES } from "./content";

// Every public page in one list. The sitemap and llms.txt are built from it, so a new page only
// needs adding here. Bump lastModified when a page's content really changes.
export type SitePage = {
  path: string;
  name: string; // link text in llms.txt
  summary: string; // one line telling AI readers what the page answers
  lastModified: string;
  priority: number;
  optional?: boolean; // listed under "Optional" in llms.txt
};

export const SITE_PAGES: SitePage[] = [
  {
    path: "/",
    name: "Home",
    summary: "Overview of the yard: wood in stock, services, Google reviews, FAQ and contact.",
    lastModified: "2026-11-09",
    priority: 1,
  },
  {
    path: "/teak-wood",
    name: "Teak wood",
    summary:
      "Ghana, Togo and African teak in stock, Burma teak on order; A and B grade prices; moisture, weight per CFT, door-frame sizes; how to check good teak.",
    lastModified: "2026-11-09",
    priority: 0.9,
  },
  {
    path: "/teak-wood-for-doors-and-frames",
    name: "Teak wood for doors, frames and windows",
    summary: `Which wood to use for the main door, inner doors, frames and windows; frame sections ${FRAME_SIZES.join(", ")}; CFT and cost of one door frame.`,
    lastModified: "2026-11-09",
    priority: 0.9,
  },
  {
    path: "/teak-wood-price-per-cft",
    name: "Teak wood price per CFT",
    summary:
      "Approximate price per CFT for teak (A and B grade), Burma teak, white teak and neem; what changes the price; how to work out CFT.",
    lastModified: "2026-11-09",
    priority: 0.9,
  },
  {
    path: "/products",
    name: "All products",
    summary: "Teak, white teak and neem wood with common sizes and approximate prices.",
    lastModified: "2026-11-09",
    priority: 0.8,
  },
  {
    path: "/white-teak-wood",
    name: "White teak wood",
    summary: "White teak price, where it is used and how it compares with teak.",
    lastModified: "2026-11-09",
    priority: 0.7,
  },
  {
    path: "/neem-wood",
    name: "Neem wood",
    summary: "Neem wood price and uses.",
    lastModified: "2026-11-09",
    priority: 0.7,
  },
  {
    path: "/delivery",
    name: "Delivery",
    summary: "Towns we deliver to, how delivery works and is charged, and yard timings.",
    lastModified: "2026-11-09",
    priority: 0.7,
  },
  {
    path: "/calculator",
    name: "Timber CFT calculator",
    summary: "Enter sizes to get the CFT and an estimated price, then send the list to the yard.",
    lastModified: "2026-11-09",
    priority: 0.7,
  },
  {
    path: "/contact",
    name: "Contact and location",
    summary: "Address, map, phone, WhatsApp, email, opening hours and questions about visiting the yard.",
    lastModified: "2026-11-09",
    priority: 0.7,
  },
  {
    path: "/about",
    name: "About us",
    summary: `History since ${BUSINESS.founded}: founded by ${BUSINESS.founder}, now run by his son ${BUSINESS.owner}.`,
    lastModified: "2026-11-09",
    priority: 0.6,
    optional: true,
  },
];
