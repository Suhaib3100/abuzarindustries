import { ADDRESS_LINE, BUSINESS, DELIVERY_TOWNS, GOOGLE, HOURS, PRICES, SAME_AS, SITE_URL, rupees } from "./business";
import { FAQ_CONTACT, FAQ_HOME, FRAME_SIZES, PRICE_LIST, REVIEWS, TEAK_GRADES, TEAK_TYPES, TEAK_WEIGHT } from "./content";
import { SITE_PAGES, type SitePage } from "./pages";

// robots.txt, llms.txt and llms-full.txt, built from the same data as the pages (business.ts,
// content.ts, pages.ts) so what crawlers and AI assistants read always matches the site.

const pageUrl = (path: string) => (path === "/" ? `${SITE_URL}/` : `${SITE_URL}${path}`);
const pageLink = (p: SitePage) => `- [${p.name}](${pageUrl(p.path)}): ${p.summary}`;
const hours = HOURS.map((h) => `${h.label} ${h.time}`).join("; ");
const towns = DELIVERY_TOWNS.join(", ");

const TITLE = `# ${BUSINESS.name}`;
const SUMMARY =
  `> Teak wood and timber supplier in ${BUSINESS.city}, ${BUSINESS.region}, India, since ${BUSINESS.founded}. ` +
  "Ghana, Togo and African teak in stock and Burma teak on order, plus white teak and neem wood, cut to any size at the yard.";
const ABOUT =
  `${BUSINESS.name} is a family timber yard in ${BUSINESS.city}, founded in ${BUSINESS.founded} by ${BUSINESS.founder} ` +
  `and now run by his son ${BUSINESS.owner}. Most customers visit the yard, pick their pieces and have them cut to size.`;

const KEY_FACTS = [
  `- Address: ${ADDRESS_LINE}, India (${BUSINESS.landmark})`,
  `- Phone and WhatsApp: ${BUSINESS.phoneDisplay}`,
  `- Email: ${BUSINESS.email}`,
  `- Open: ${hours}`,
  `- Approximate prices per CFT (${PRICES.asOf}): teak A grade ${rupees(PRICES.teakA)}, teak B grade ${rupees(PRICES.teakB)}, ` +
    `white teak ${rupees(PRICES.whiteTeak)}, neem ${rupees(PRICES.neem)}; Burma teak on order. Call for today's rate.`,
  "- Teak is dried to about 10% moisture. All wood is cut to the size you need.",
  `- Delivery is charged by distance; regular deliveries to ${towns} and other nearby towns.`,
  `- Google rating ${GOOGLE.rating} from ${GOOGLE.reviews} reviews: ${GOOGLE.mapsUrl}`,
  `- ${BUSINESS.customers.toLocaleString("en-IN")}+ customers since ${BUSINESS.founded}.`,
].join("\n");

const lines = (...parts: (string | false)[]) => parts.filter((p) => p !== false).join("\n") + "\n";

/** llms.txt (llmstxt.org format): a short summary and an annotated list of pages. */
export function llmsTxt(): string {
  return lines(
    TITLE,
    "",
    SUMMARY,
    "",
    ABOUT,
    "",
    KEY_FACTS,
    "",
    "## Pages",
    "",
    ...SITE_PAGES.filter((p) => !p.optional).map(pageLink),
    "",
    "## Optional",
    "",
    ...SITE_PAGES.filter((p) => p.optional).map(pageLink),
    `- [Full details for AI assistants](${SITE_URL}/llms-full.txt): every fact, the price list, teak details, all FAQ answers and customer reviews in one file.`,
    `- [Google Business Profile](${GOOGLE.mapsUrl}): map, photos and reviews.`,
  );
}

const faqs = [...FAQ_HOME, ...FAQ_CONTACT].filter((qa, i, all) => all.findIndex((x) => x.q === qa.q) === i);
const exampleCft = (7 * 6 * 4) / 144;

/** llms-full.txt: everything an assistant needs to answer questions about the yard, in one file. */
export function llmsFullTxt(): string {
  return lines(
    `${TITLE}: full details`,
    "",
    SUMMARY,
    "",
    ABOUT,
    "",
    `Prices are approximate; the yard confirms the exact rate on the phone or WhatsApp. Short version of this file: ${SITE_URL}/llms.txt`,
    "",
    "## Contact and visiting",
    "",
    `- Address: ${ADDRESS_LINE}, India`,
    `- Landmark: ${BUSINESS.landmark}`,
    `- Map: ${GOOGLE.mapsUrl} (coordinates ${BUSINESS.geo.lat}, ${BUSINESS.geo.lng})`,
    `- Phone and WhatsApp: ${BUSINESS.phoneDisplay} (${BUSINESS.whatsapp})`,
    `- Email: ${BUSINESS.email}`,
    `- Opening hours: ${hours}`,
    `- To get a price: call or WhatsApp your sizes, or enter them in the CFT calculator (${SITE_URL}/calculator) and press "Send to us".`,
    "",
    "## Wood and prices",
    "",
    `Approximate yard rates per CFT, ${PRICES.asOf}. Rates depend on quality and size and are before delivery; final billing follows the measured pieces.`,
    "",
    "| Wood | Approx. price per CFT | Stock |",
    "| --- | --- | --- |",
    ...PRICE_LIST.map((r) => `| ${r.wood} | ${r.price === null ? "Call for rate" : rupees(r.price)} | ${r.stock} |`),
    "",
    `CFT (cubic feet) = length in feet × width in inches × thickness in inches ÷ 144. Example: 7 ft × 6 in × 4 in = ${exampleCft.toFixed(2)} CFT, ` +
      `about ${rupees(Math.round(exampleCft * PRICES.teakA))} at the A grade teak rate.`,
    "",
    "## Teak",
    "",
    "### Types",
    "",
    ...TEAK_TYPES.map((t) => `- ${t.name} (${t.stock.toLowerCase()}): ${t.text}`),
    "",
    "### Grades",
    "",
    ...TEAK_GRADES.map(
      (g) => `- ${g.grade} (${g.price === null ? "on order, call for rate" : `about ${rupees(g.price)} per CFT`}): ${g.looks}. Best for: ${g.bestFor.toLowerCase()}.`,
    ),
    "",
    "### Details",
    "",
    "- Moisture: about 10% (dried, ready to use).",
    `- Weight: ${TEAK_WEIGHT.kgPerCft} per CFT (${TEAK_WEIGHT.kgPerM3} at about 12% moisture; source: ${TEAK_WEIGHT.source}).`,
    `- Door-frame sections: ${FRAME_SIZES.join(", ")} and any other size.`,
    "",
    "## Delivery",
    "",
    "- Charged by distance from the Chitradurga yard.",
    `- Regular deliveries to ${towns}, and other towns near Chitradurga. Ask for any place not on this list.`,
    "",
    "## Questions and answers",
    "",
    ...faqs.flatMap((qa) => [`### ${qa.q}`, "", qa.a, ""]),
    "## What customers say",
    "",
    `Google rating ${GOOGLE.rating} from ${GOOGLE.reviews} reviews: ${GOOGLE.reviewsUrl}`,
    "",
    "Selected 5-star Google reviews (shortened with …):",
    "",
    ...REVIEWS.map((r) => `- "${r.text}" (${r.name}, Google review)`),
    "",
    "## Pages",
    "",
    ...SITE_PAGES.map(pageLink),
    "",
    "## Listings",
    "",
    ...SAME_AS.map((u) => `- ${new URL(u).hostname.replace(/^www\./, "")}: ${u}`),
  );
}

// Named here only so the robots.txt comment is explicit (tokens as documented by each operator,
// checked 2026-11-09). The single "User-agent: *" group is what lets them in: a named group would
// replace the * group for that bot, Content-Signal line included.
const AI_CRAWLERS = [
  "OpenAI: GPTBot, OAI-SearchBot, ChatGPT-User",
  "Anthropic: ClaudeBot, Claude-SearchBot, Claude-User",
  "Perplexity: PerplexityBot, Perplexity-User",
  "Google: Googlebot (Search, AI Overviews, AI Mode), Google-Extended (Gemini)",
  "Microsoft: bingbot (Bing, Copilot)",
  "Apple: Applebot, Applebot-Extended",
  "Meta: meta-externalagent, meta-webindexer",
  "Amazon: Amazonbot, Amzn-SearchBot",
  "DuckDuckGo: DuckAssistBot",
  "Mistral: MistralAI-User, MistralAI-Index",
  "Common Crawl: CCBot",
];

/** robots.txt: everything is open; points crawlers at the sitemap and AI readers at llms.txt. */
export function robotsTxt(): string {
  return lines(
    `# robots.txt for ${SITE_URL}`,
    `# ${BUSINESS.name}: teak wood and timber supplier in ${BUSINESS.city}, ${BUSINESS.region}, India.`,
    "#",
    "# Every page is open to search engines and AI assistants; there are no private pages. That",
    "# includes these AI crawlers and tokens:",
    ...AI_CRAWLERS.map((l) => `#   ${l}`),
    "#",
    "# Content-Signal (contentsignals.org): search = search results, ai-input = answers that quote or",
    "# summarise these pages, ai-train = training AI models. All three are allowed.",
    "#",
    `# Summary for AI assistants: ${SITE_URL}/llms.txt`,
    `# Full details (prices, hours, FAQ): ${SITE_URL}/llms-full.txt`,
    "",
    "User-agent: *",
    "Content-Signal: search=yes, ai-input=yes, ai-train=yes",
    "Allow: /",
    "",
    "# AI training preference (IETF AIPREF token, backed by Google, Microsoft, Anthropic and OpenAI).",
    "# The * group above does not cover it, so training is allowed here explicitly.",
    "User-agent: __usage_ai-training",
    "Allow: /",
    "",
    `Sitemap: ${SITE_URL}/sitemap.xml`,
  );
}
