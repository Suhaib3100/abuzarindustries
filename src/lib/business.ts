// One place for business facts, so every page, the footer and the schema say the same thing.
// Confirmed by the owner on 2026-11-09. Change a fact here, not in the pages.

export const SITE_URL = "https://www.abuzarindustries.in";

export const BUSINESS = {
  name: "Abuzar Industries",
  phone: "+919845378626",
  phoneDisplay: "+91 98453 78626",
  whatsapp: "https://wa.me/919845378626",
  email: "abuzarindustries@gmail.com",
  street: "Plot No 14, KSSIDC Industrial Area, DVG Road",
  city: "Chitradurga",
  region: "Karnataka",
  postalCode: "577501",
  landmark: "Near Traffic Police Station, under 1 km from the KSRTC bus stand",
  geo: { lat: 14.2304243, lng: 76.3906535 },
  founded: 1995,
  founder: "Athaulla Afroz",
  owner: "Mohammed Afsar",
  customers: 5000,
};

export const ADDRESS_LINE = `${BUSINESS.street}, ${BUSINESS.city}, ${BUSINESS.region} ${BUSINESS.postalCode}`;

export const HOURS = [
  { label: "Monday – Saturday", short: "Mon–Sat", time: "9:30 AM – 7:00 PM", opens: "09:30", closes: "19:00",
    days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"] },
  { label: "Sunday", short: "Sun", time: "10:00 AM – 4:00 PM", opens: "10:00", closes: "16:00", days: ["Sunday"] },
];

export const HOURS_SHORT = HOURS.map((h) => `${h.short} ${h.time.replace(/:00/g, "").replace(/ /g, "")}`).join(" · ");

export const GOOGLE = {
  rating: 4.8,
  reviews: 56,
  mapsUrl: "https://maps.google.com/?cid=11136242296025670152",
  reviewsUrl:
    "https://www.google.com/maps/place/ABUZAR+INDUSTRIES/@14.2304243,76.3906535,17z/data=!4m8!3m7!1s0x3bba75de8a42ad97:0x9a8be15dab4a6208!8m2!3d14.2304243!4d76.3906535!9m1!1b1!16s%2Fg%2F11g3zdmpmp",
};

export const SAME_AS = [
  GOOGLE.mapsUrl,
  "https://www.justdial.com/Chitradurga/Abuzar-Industries-Traffic-Police-Station-Gumasthara-Colony/9999P8194-8194-190402213607-M5C5_BZDET",
  "https://www.indiamart.com/abuzar-industries/",
  "https://www.instagram.com/abuzarindustries/",
  "https://www.youtube.com/@ABUZAR-INDUSTRIES",
];

// Approximate yard rates per CFT. Prices move with quality, so pages always say "call for today's rate".
export const PRICES = {
  asOf: "November 2026",
  teakA: 4400,
  teakB: 3500,
  whiteTeak: 2900,
  neem: 1200,
};

export const rupees = (n: number) => `₹${n.toLocaleString("en-IN")}`;

// Towns we deliver to regularly (owner, 2026-11-09). Delivery is charged by distance.
export const DELIVERY_TOWNS = ["Hiriyur", "Davanagere", "Hosapete", "Hubballi", "Chikkamagaluru"];

// Years in business. Call it only in Server Components (src/app/page.tsx) and pass the number
// down: pages are prerendered at build time, so a value worked out in the browser would differ
// from the HTML once the calendar year changes and break hydration.
export const yearsInBusiness = (now = new Date()) => now.getFullYear() - BUSINESS.founded;
