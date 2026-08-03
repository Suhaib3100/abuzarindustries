// Quotation maths + formatting — ported from the Abuzar Industries books app
// (Suhaib3100/abuzar-industries-playground · packages/core/src/lib/calc.ts) so the
// public calculator produces quotations the exact same way the office does.

/** Cubic feet for one line: (L ft × W in × T in × Pcs) ÷ 144. */
export const cft = (l: number, w: number, t: number, pcs: number) =>
  ((+l || 0) * (+w || 0) * (+t || 0) * (+pcs || 0)) / 144;

/** Indian number format, always two decimals (e.g. 1,23,456.00). */
export const inr = (n: number) =>
  (isFinite(n) ? n : 0).toLocaleString("en-IN", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

export const pad = (x: number | string, n = 2) => String(x).padStart(n, "0");

/** dd-mm-yy display date (matches the office documents). */
export const todayStr = (d = new Date()) =>
  pad(d.getDate()) + "-" + pad(d.getMonth() + 1) + "-" + String(d.getFullYear()).slice(2);

/** Indian financial-year label for a date, e.g. "2026-27" (FY starts in April). */
export function fyLabel(d = new Date()): string {
  const y = d.getFullYear();
  const start = d.getMonth() + 1 >= 4 ? y : y - 1;
  return start + "-" + pad((start + 1) % 100, 2);
}

const seqKey = () => "ai_quote_seq_" + fyLabel();

/** The NEXT per-FY quotation number ("2026-27-005") WITHOUT consuming it.
 *  Call commitQuotationNo when the quote is actually printed/sent, so
 *  abandoned visits don't burn numbers. */
export function peekQuotationNo(): string {
  let n = 1;
  try {
    n = (parseInt(localStorage.getItem(seqKey()) || "0", 10) || 0) + 1;
  } catch {
    n = 1;
  }
  return fyLabel() + "-" + pad(n, 3);
}

/** Persist a peeked number as used (monotonic — never moves backwards). */
export function commitQuotationNo(no: string): void {
  try {
    const fy = fyLabel();
    if (!no.startsWith(fy + "-")) return;
    const n = parseInt(no.slice(fy.length + 1), 10) || 0;
    const cur = parseInt(localStorage.getItem(seqKey()) || "0", 10) || 0;
    if (n > cur) localStorage.setItem(seqKey(), String(n));
  } catch {
    /* private mode — numbering just restarts next visit */
  }
}

// ---- amount in words (Indian numbering) ----

export function numWords(n: number): string {
  const a = ["", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine", "Ten", "Eleven", "Twelve", "Thirteen", "Fourteen", "Fifteen", "Sixteen", "Seventeen", "Eighteen", "Nineteen"];
  const b = ["", "", "Twenty", "Thirty", "Forty", "Fifty", "Sixty", "Seventy", "Eighty", "Ninety"];
  const two = (x: number): string => (x < 20 ? a[x] : b[Math.floor(x / 10)] + (x % 10 ? " " + a[x % 10] : ""));
  const three = (x: number): string =>
    x > 99 ? a[Math.floor(x / 100)] + " Hundred" + (x % 100 ? " " + two(x % 100) : "") : two(x);
  if (n === 0) return "Zero";
  let s = "";
  const cr = Math.floor(n / 10000000);
  n %= 10000000;
  const la = Math.floor(n / 100000);
  n %= 100000;
  const th = Math.floor(n / 1000);
  n %= 1000;
  if (cr) s += three(cr) + " Crore ";
  if (la) s += three(la) + " Lakh ";
  if (th) s += three(th) + " Thousand ";
  if (n) s += three(n);
  return s.trim();
}

export function rupeesInWords(amount: number): string {
  const rupees = Math.floor(amount);
  const paise = Math.round((amount - rupees) * 100);
  let out = "Rupees " + (rupees === 0 ? "Zero" : numWords(rupees));
  if (paise > 0) out += " and " + numWords(paise) + " Paise";
  return out + " only";
}
