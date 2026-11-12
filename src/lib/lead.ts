// Website leads: the quote tools are locked until the visitor gives a real name and a
// 10-digit Indian mobile. After that, what they type is sent live to the yard's
// Cut Size app (Website Leads), whether or not they press "Send to us".
// The visitor is told this on the lock screen (see LeadLock).

export type LeadPage = "home" | "calculator";

export interface LeadContact {
  name: string;
  /** 10 digits, no country code */
  phone: string;
}

export interface LeadSection {
  wood: string;
  rate: number;
  rows: { l: number; w: number; t: number; pcs: number }[];
}

/**
 * Live capture (what visitors type, even without Send) needs Cut Size's /api/website-lead.
 * It is OFF until NEXT_PUBLIC_LEAD_API_URL is set to that endpoint on the live Cut Size app.
 */
export const LEAD_API = process.env.NEXT_PUBLIC_LEAD_API_URL || "";
export const LIVE_LEADS = LEAD_API !== "";

/** Live Cut Size → Website Quotations ("Send to us" while live capture is off). */
export const QUOTE_API =
  process.env.NEXT_PUBLIC_QUOTE_API_URL || "https://safa-unofficial.vercel.app/api/quotation-from-site";

// The same rules the Cut Size endpoint applies (packages/core/src/lib/website-leads.ts there).

/** A real-looking name: 2–60 characters with at least two letters, no links, not just digits. */
export function cleanLeadName(raw: string): string | null {
  const s = raw.replace(/\s+/g, " ").trim();
  if (s.length < 2 || s.length > 60) return null;
  if ((s.match(/\p{L}/gu) || []).length < 2) return null;
  if (/https?:|www\.|[<>{}@]/i.test(s)) return null;
  return s;
}

/** Indian mobile → "9XXXXXXXXX", or null. Accepts +91 / 91 / 0 prefixes, spaces and dashes. */
export function cleanIndianMobile(raw: string): string | null {
  let d = raw.replace(/[\s\-().]/g, "");
  if (d.startsWith("+")) d = d.slice(1);
  if (!/^\d+$/.test(d)) return null;
  if (d.length === 12 && d.startsWith("91")) d = d.slice(2);
  else if (d.length === 11 && d.startsWith("0")) d = d.slice(1);
  if (!/^[6-9]\d{9}$/.test(d)) return null;
  if (/^(\d)\1{9}$/.test(d)) return null;
  if (d === "9876543210") return null;
  return d;
}

export const phoneDisplay = (p: string) => (p.length === 10 ? `${p.slice(0, 5)} ${p.slice(5)}` : p);

export function newLeadId(): string {
  try {
    if (typeof crypto !== "undefined" && "randomUUID" in crypto) return crypto.randomUUID();
  } catch {
    /* fall through */
  }
  return "l" + Date.now().toString(36) + Math.random().toString(36).slice(2, 12);
}

// ---- per-visitor memory (convenience only; the page works without storage) ----
// localStorage: name + phone from an earlier visit, to prefill the lock screen.
// sessionStorage: this tab's open lead per page, so a reload continues the same lead.

export const CONTACT_KEY = "abz-lead-contact";
export const sessionKey = (page: LeadPage) => "abz-lead-session:" + page;

export type LeadSession = LeadContact & { leadId: string };

export function parseContact(raw: string | null): LeadContact | null {
  try {
    const v = JSON.parse(raw || "null");
    const name = cleanLeadName(String(v?.name ?? ""));
    const phone = cleanIndianMobile(String(v?.phone ?? ""));
    return name && phone ? { name, phone } : null;
  } catch {
    return null;
  }
}

export function parseSession(raw: string | null): LeadSession | null {
  const c = parseContact(raw);
  if (!c) return null;
  try {
    const leadId = String(JSON.parse(raw || "null")?.leadId ?? "");
    return /^[A-Za-z0-9-]{8,64}$/.test(leadId) ? { ...c, leadId } : null;
  } catch {
    return null;
  }
}

/** Read one storage key without throwing (private mode, blocked storage, server). */
export function readStorage(kind: "local" | "session", key: string): string | null {
  try {
    if (typeof window === "undefined") return null;
    return (kind === "local" ? localStorage : sessionStorage).getItem(key);
  } catch {
    return null;
  }
}

function writeStorage(kind: "local" | "session", key: string, value: string | null) {
  try {
    const s = kind === "local" ? localStorage : sessionStorage;
    if (value === null) s.removeItem(key);
    else s.setItem(key, value);
  } catch {
    /* storage blocked: fine */
  }
}

export const rememberContact = (c: LeadContact) => writeStorage("local", CONTACT_KEY, JSON.stringify(c));
export const rememberSession = (page: LeadPage, s: LeadSession) =>
  writeStorage("session", sessionKey(page), JSON.stringify(s));
export const forgetSession = (page: LeadPage) => writeStorage("session", sessionKey(page), null);

// ---- sending ----

export interface LeadPayload extends LeadContact {
  leadId: string;
  event: "start" | "update" | "send";
  page: LeadPage;
  sections: LeadSection[];
  hp?: string;
}

/** text/plain keeps this a "simple" cross-origin request (no preflight); the endpoint parses JSON. */
const TEXT = "text/plain;charset=UTF-8";

export async function postLead(p: LeadPayload): Promise<{ ok: boolean; error?: string }> {
  if (!LIVE_LEADS) return { ok: false, error: "Live capture is off" };
  try {
    const res = await fetch(LEAD_API, {
      method: "POST",
      headers: { "Content-Type": TEXT },
      body: JSON.stringify(p),
      keepalive: true,
    });
    if (res.ok) return { ok: true };
    const body = (await res.json().catch(() => null)) as { error?: string } | null;
    return { ok: false, error: body?.error || "Could not send" };
  } catch {
    return { ok: false, error: "No connection" };
  }
}

/** Last-chance send when the page is being closed or hidden. */
export function beaconLead(p: LeadPayload): boolean {
  if (!LIVE_LEADS) return false;
  try {
    if (typeof navigator === "undefined" || !navigator.sendBeacon) return false;
    return navigator.sendBeacon(LEAD_API, new Blob([JSON.stringify(p)], { type: TEXT }));
  } catch {
    return false;
  }
}

/** "Send to us" into the live Cut Size → Website Quotations (the format it already accepts). */
export async function sendQuote(c: LeadContact, sections: LeadSection[], hp = ""): Promise<{ ok: boolean; error?: string }> {
  const secs = sections
    .map((s) => ({
      woodType: s.wood.trim() || "Wood",
      rate: s.rate || 0,
      rows: s.rows.filter((r) => r.l > 0 && r.w > 0 && r.t > 0).map((r) => ({ ...r, pcs: Math.max(1, r.pcs || 1) })),
    }))
    .filter((s) => s.rows.length);
  if (!secs.length) return { ok: false, error: "Enter at least one full L × W × T line." };
  try {
    const res = await fetch(QUOTE_API, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: c.name, phone: "+91 " + phoneDisplay(c.phone), sections: secs, website: hp }),
    });
    if (res.ok) return { ok: true };
    const body = (await res.json().catch(() => null)) as { error?: string } | null;
    return { ok: false, error: body?.error || "Could not send" };
  } catch {
    return { ok: false, error: "No connection" };
  }
}
