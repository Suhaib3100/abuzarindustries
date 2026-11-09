import { BUSINESS, DELIVERY_TOWNS, HOURS, PRICES, rupees } from "./business";

// Real Google reviews, copied word for word (trimmed with …) on 2026-11-09.
// All 5 stars. Picked from reviewers with more than one review or Local Guide status.
export const REVIEWS = [
  {
    name: "Suhail",
    meta: "3 reviews",
    text: "I recently purchased teak wood doors and windows from this shop, and I’m extremely satisfied with the quality and craftsmanship. … The owner is very friendly, honest, and knowledgeable — he helped me choose exactly what I needed.",
  },
  {
    name: "Vaseem A.",
    meta: "Local Guide",
    text: "The ready-to-use sizes I purchased are of exceptional quality, with perfect finishing and durability. … The delivery was prompt, ensuring the wood arrived in pristine condition.",
  },
  {
    name: "Tabrez S.",
    meta: "4 reviews",
    text: "Abuzar industries is the best stop solution for wood purchase for ur building house, furniture and any wood related items … Fine quality imported teak wood suppliers in chitradurga.",
  },
  {
    name: "Faizan A.",
    meta: "5 reviews",
    text: "Trust worthy, very helpful in selecting the teak wood.. best price in the city.",
  },
  {
    name: "Irfan I.",
    meta: "2 reviews",
    text: "Well maintained stocks & good appearance & attended nicely & good pricing compare to others & excellent quality of Teakwood.",
  },
  {
    name: "Salman S.",
    meta: "Local Guide",
    text: "Excellent quality timber wood! The wood is strong, well-finished, and has a beautiful natural grain. … Great service and good value for money.",
  },
];

// Published references for teak density at about 12% moisture: PROSEA and the World Agroforestry tree database.
export const TEAK_WEIGHT = {
  kgPerM3: "610–750 kg/m³",
  kgPerCft: "about 17–21 kg",
  source: "PROSEA / World Agroforestry tree database",
};

export const FRAME_SIZES = ['5" × 3"', '6" × 4"', '8" × 4"'];

const hoursText = HOURS.map((h) => `${h.label} ${h.time}`).join(", ");
const towns = DELIVERY_TOWNS.join(", ");

export type QA = { q: string; a: string };

export const FAQ_HOME: QA[] = [
  {
    q: "Which teak wood do you have in stock?",
    a: "Ghana teak, Togo teak and African teak are in stock at our Chitradurga yard. Burma teak is available on order. We also stock white teak and neem wood.",
  },
  {
    q: "What is the price of teak wood per CFT?",
    a: `As of ${PRICES.asOf}: A grade teak is about ${rupees(PRICES.teakA)} per CFT and B grade about ${rupees(PRICES.teakB)} per CFT. White teak is about ${rupees(PRICES.whiteTeak)} and neem about ${rupees(PRICES.neem)} per CFT. The rate depends on quality and size, so call us for today's price.`,
  },
  {
    q: "Is your teak wood dried? What is the moisture?",
    a: "Yes. Our teak is properly dried and is at about 10% moisture, so it is ready for doors, frames, windows and furniture.",
  },
  {
    q: "How much does teak wood weigh?",
    a: `Good seasoned teak weighs ${TEAK_WEIGHT.kgPerM3} at about 12% moisture, which is ${TEAK_WEIGHT.kgPerCft} per CFT. Older, denser wood sits at the top of that range.`,
  },
  {
    q: "Which wood is best for the main door and door frames?",
    a: `Most house builders take teak for the main door and all door frames. We cut frames in the common sections (${FRAME_SIZES.join(", ")}) and any other size you need. White teak is a lower-cost choice for inner doors and windows.`,
  },
  {
    q: "Can I come and choose the wood myself?",
    a: "Yes. Most customers visit the yard, check the wood and pick their pieces. We cut it to size and load it, and the truck leaves with you.",
  },
  {
    q: "Do you deliver outside Chitradurga?",
    a: `Yes. Delivery is charged by distance. We deliver regularly to ${towns} and other towns nearby.`,
  },
  {
    q: "What are your shop timings?",
    a: `We are open all seven days: ${hoursText}.`,
  },
];

export const FAQ_CONTACT: QA[] = [
  {
    q: "Where is Abuzar Industries?",
    a: `${BUSINESS.street}, ${BUSINESS.city}, ${BUSINESS.region} ${BUSINESS.postalCode}. ${BUSINESS.landmark}.`,
  },
  {
    q: "What are your shop timings?",
    a: `We are open all seven days: ${hoursText}.`,
  },
  {
    q: "How do I get a price?",
    a: `Call or WhatsApp ${BUSINESS.phoneDisplay} with your sizes, or use the CFT calculator on this site and press "Send to us". We reply with a price.`,
  },
];
