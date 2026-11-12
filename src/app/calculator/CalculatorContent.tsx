"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Printer, Send, X } from "lucide-react";
import {
  cft as cftCalc,
  inr,
  todayStr,
  peekQuotationNo,
  commitQuotationNo,
  rupeesInWords,
} from "@/lib/quote";
import { PRICES } from "@/lib/business";
import LeadLock from "@/components/LeadLock";
import { phoneDisplay, type LeadSection } from "@/lib/lead";
import { useLeadSync } from "@/lib/useLeadSync";

const PHONE = "919845378626";

interface Row {
  id: number;
  l: string;
  w: string;
  t: string;
  pcs: string;
}

interface Section {
  id: number;
  wood: string;
  rate: string;
  rows: Row[];
}

/** Editable columns (the left "CFT" column is always computed from L×W×T×Pcs). */
const COLS: { key: keyof Row; label: string; sub: string }[] = [
  { key: "l", label: "L", sub: "ft" },
  { key: "w", label: "W", sub: "inch" },
  { key: "t", label: "T", sub: "inch" },
  { key: "pcs", label: "Pcs", sub: "qty" },
];

// Starting rate per CFT for each wood: the published prices in src/lib/business.ts
// (teak at the A grade rate). The rate stays editable on every section.
const WOOD_RATES: Record<string, number> = {
  "Teak Wood": PRICES.teakA,
  "White Teak": PRICES.whiteTeak,
  "Neem Wood": PRICES.neem,
};
const WOOD_CYCLE = ["Teak Wood", "White Teak", "Neem Wood"];

/** One line's CFT: (L ft × W in × T in × Pcs) ÷ 144. */
function rowMeasure(r: Row): number {
  return cftCalc(+r.l || 0, +r.w || 0, +r.t || 0, +r.pcs || 0);
}

export default function CalculatorContent() {
  const idRef = useRef(10);
  const nextId = () => ++idRef.current;
  const newRow = (): Row => ({ id: nextId(), l: "", w: "", t: "", pcs: "" });

  const [sections, setSections] = useState<Section[]>([
    // Literal first row: newRow() reads idRef, which must not happen during render. nextId() starts at 11.
    { id: 1, wood: "Teak Wood", rate: String(WOOD_RATES["Teak Wood"]), rows: [{ id: 1, l: "", w: "", t: "", pcs: "" }] },
  ]);
  const [quoteNo, setQuoteNo] = useState("");
  const [date, setDate] = useState("");
  const [sending, setSending] = useState(false);
  const [sendMsg, setSendMsg] = useState("");
  const [gstOn, setGstOn] = useState(false);
  const [gstPct, setGstPct] = useState("18");
  const [pendingFocus, setPendingFocus] = useState<string | null>(null);

  // numbering + date are client-only (avoid hydration mismatch)
  useEffect(() => {
    setQuoteNo(peekQuotationNo());
    setDate(todayStr());
  }, []);

  useEffect(() => {
    if (!pendingFocus) return;
    document.getElementById(pendingFocus)?.focus();
    setPendingFocus(null);
  }, [pendingFocus, sections]);

  // ---- sanitisers ----
  const num = (v: string) => v.replace(/[^0-9.]/g, "").replace(/(\..*)\./g, "$1");
  const int = (v: string) => v.replace(/[^0-9]/g, "");

  // ---- row / section mutations ----
  const cellId = (si: number, ri: number, ci: number) => `q-${si}-${ri}-${ci}`;

  const addRow = (si: number) =>
    setSections((prev) => prev.map((s, i) => (i === si ? { ...s, rows: [...s.rows, newRow()] } : s)));

  const setCell = (si: number, ri: number, key: keyof Row, raw: string) => {
    const val = key === "pcs" ? int(raw) : num(raw);
    const sec = sections[si];
    const lastKey = COLS[COLS.length - 1].key;
    setSections((prev) =>
      prev.map((s, i) =>
        i !== si ? s : { ...s, rows: s.rows.map((r, j) => (j === ri ? { ...r, [key]: val } : r)) },
      ),
    );
    // auto-append a fresh row when the last column of the last row gets filled
    if (key === lastKey && val !== "" && ri === sec.rows.length - 1) addRow(si);
  };

  const delRow = (si: number, ri: number) =>
    setSections((prev) =>
      prev.map((s, i) =>
        i !== si ? s : { ...s, rows: s.rows.length > 1 ? s.rows.filter((_, j) => j !== ri) : [newRow()] },
      ),
    );

  const setSec = (si: number, patch: Partial<Section>) =>
    setSections((prev) => prev.map((s, i) => (i === si ? { ...s, ...patch } : s)));

  const delSection = (si: number) =>
    setSections((prev) => (prev.length > 1 ? prev.filter((_, i) => i !== si) : prev));

  const addWood = () => {
    const used = sections.map((s) => s.wood);
    const wood = WOOD_CYCLE.find((w) => !used.includes(w)) ?? "Teak Wood";
    setSections((prev) => [
      ...prev,
      { id: nextId(), wood, rate: String(WOOD_RATES[wood] ?? WOOD_RATES["Teak Wood"]), rows: [newRow()] },
    ]);
  };

  // ---- arrow-key grid navigation ----
  const onCellKey = (e: React.KeyboardEvent<HTMLInputElement>, si: number, ri: number, ci: number) => {
    const el = e.currentTarget;
    const sec = sections[si];
    const nCols = COLS.length;
    const nRows = sec.rows.length;
    const atStart = el.selectionStart === 0 && el.selectionEnd === 0;
    const atEnd = el.selectionStart === el.value.length && el.selectionEnd === el.value.length;
    const go = (r: number, c: number) => {
      e.preventDefault();
      document.getElementById(cellId(si, r, c))?.focus();
    };
    switch (e.key) {
      case "ArrowRight":
        if (atEnd) {
          if (ci < nCols - 1) go(ri, ci + 1);
          else if (ri < nRows - 1) go(ri + 1, 0);
        }
        break;
      case "ArrowLeft":
        if (atStart) {
          if (ci > 0) go(ri, ci - 1);
          else if (ri > 0) go(ri - 1, nCols - 1);
        }
        break;
      case "ArrowUp":
        if (ri > 0) go(ri - 1, ci);
        break;
      case "Enter":
      case "ArrowDown":
        if (ri < nRows - 1) go(ri + 1, ci);
        else {
          addRow(si);
          e.preventDefault();
          setPendingFocus(cellId(si, ri + 1, ci));
        }
        break;
    }
  };

  // ---- totals ----
  const sectionMeasure = (s: Section) => s.rows.reduce((a, r) => a + rowMeasure(r), 0);
  const sectionPcs = (s: Section) => s.rows.reduce((a, r) => a + (+r.pcs || 0), 0);
  const sectionPrice = (s: Section) => Math.round(sectionMeasure(s) * (+s.rate || 0) * 100) / 100;

  const subtotal = Math.round(sections.reduce((a, s) => a + sectionPrice(s), 0) * 100) / 100;
  const gstAmt = gstOn ? Math.round(subtotal * (+gstPct || 0)) / 100 : 0;
  const grand = Math.round((subtotal + gstAmt) * 100) / 100;
  const hasData = sections.some((s) => sectionMeasure(s) > 0);

  // What the visitor has typed, as sent live to the yard's Cut Size app.
  const leadSections = useMemo<LeadSection[]>(
    () =>
      sections.map((s) => ({
        wood: s.wood.trim(),
        rate: +s.rate || 0,
        rows: s.rows.map((r) => ({ l: +r.l || 0, w: +r.w || 0, t: +r.t || 0, pcs: +r.pcs || 0 })),
      })),
    [sections],
  );
  const lead = useLeadSync("calculator", leadSections);
  const customer = lead.contact?.name ?? "";
  const phone = lead.contact?.phone ?? "";
  const unlocked = !!lead.contact;

  // ---- actions ----
  const doPrint = () => {
    commitQuotationNo(quoteNo);
    window.print();
  };

  const buildWhatsAppMsg = () => {
    let m = `*QUOTATION — Abuzar Industries*\n`;
    m += `Date: ${date}\n`;
    if (customer) m += `Party: ${customer}\n`;
    if (phone) m += `Phone: +91 ${phoneDisplay(phone)}\n`;
    sections.forEach((s) => {
      if (sectionMeasure(s) <= 0) return;
      m += `\n*${s.wood}* @ ₹${s.rate}/cft\n`;
      s.rows.forEach((r, i) => {
        const meas = rowMeasure(r);
        if (meas <= 0) return;
        m += `${i + 1}. ${r.l}ft×${r.w}"×${r.t}"×${r.pcs}pc = ${meas.toFixed(2)} cft\n`;
      });
      m += `   Total: ${sectionMeasure(s).toFixed(2)} cft → ₹${inr(sectionPrice(s))}\n`;
    });
    m += `\nSub-total: ₹${inr(subtotal)}`;
    if (gstOn) m += `\nGST ${gstPct}%: ₹${inr(gstAmt)}`;
    m += `\n*Grand Total: ₹${inr(grand)}*`;
    m += `\n${rupeesInWords(grand)}`;
    return m;
  };

  const sendWhatsApp = () => {
    window.open(`https://wa.me/${PHONE}?text=${encodeURIComponent(buildWhatsAppMsg())}`, "_blank");
  };

  /** Mark the live lead as sent in Cut Size (Website Leads), and ping WhatsApp. */
  const sendToUs = async () => {
    if (sending) return;
    setSendMsg("");
    if (!unlocked) {
      setSendMsg("Enter your name and mobile number first.");
      return;
    }
    if (!hasData) {
      setSendMsg("Enter at least one full L × W × T line.");
      return;
    }
    setSending(true);
    // Open WhatsApp in the click itself (pop-up blockers), then save to the yard.
    window.open(`https://wa.me/${PHONE}?text=${encodeURIComponent(buildWhatsAppMsg())}`, "_blank");
    const r = await lead.send();
    setSending(false);
    setSendMsg(
      r.ok
        ? "Sent ✓ We will call or WhatsApp you soon."
        : "Could not save on our side. WhatsApp has opened with your sizes: please press send there.",
    );
  };

  return (
    <div className="pt-24 pb-16 bg-pattern min-h-dvh">
      {/* action bar */}
      <div className="no-print sticky top-16 z-30 border-b border-walnut/10 bg-paper/90 backdrop-blur-md">
        <div className="max-w-[900px] mx-auto px-4 py-3 flex items-center justify-between gap-3">
          <div>
            <h1 className="font-[family:var(--font-display)] font-bold text-lg text-walnut leading-none">
              Timber CFT Calculator
            </h1>
            <p className="text-[11px] text-ink-soft/60 mt-0.5">
              CFT = L(ft) × W(in) × T(in) ÷ 144 · estimate
            </p>
          </div>
          <div className="flex flex-col items-end gap-1">
            <div className="flex items-center gap-2">
              <button
                onClick={sendToUs}
                disabled={!unlocked || !hasData || sending}
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-walnut text-paper text-xs font-semibold hover:bg-walnut-2 transition-colors disabled:opacity-30"
              >
                <Send size={14} /> {sending ? "Sending…" : "Send to us"}
              </button>
              <button
                onClick={sendWhatsApp}
                disabled={!unlocked || !hasData}
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-green text-paper text-xs font-semibold hover:bg-green/90 transition-colors disabled:opacity-30"
              >
                WhatsApp
              </button>
              <button
                onClick={doPrint}
                disabled={!unlocked || !hasData}
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg border border-walnut/25 text-walnut text-xs font-semibold hover:bg-walnut/5 transition-colors disabled:opacity-30"
              >
                <Printer size={14} /> Print
              </button>
            </div>
            {sendMsg ? (
              <p className="text-[11px] text-ink-soft/80 max-w-[280px] text-right">{sendMsg}</p>
            ) : null}
          </div>
        </div>
      </div>

      {/* the sheet */}
      <div className="max-w-[900px] mx-auto px-4 pt-6">
        {unlocked && (
          <div className="no-print mb-3 flex flex-wrap items-center justify-between gap-2 rounded-xl border border-walnut/10 bg-paper/80 px-3.5 py-2 text-sm">
            <span className="text-ink-soft">
              Quote for <b className="text-walnut">{customer}</b>
              <span className="font-mono"> · +91 {phoneDisplay(phone)}</span>
            </span>
            <button type="button" onClick={lead.relock} className="text-xs font-semibold text-ochre hover:underline underline-offset-2">
              Change
            </button>
          </div>
        )}
        <LeadLock locked={!unlocked} prefill={lead.prefill} onUnlock={lead.unlock}>
        <div id="qprint" className="qsheet">
          {/* diagonal watermark */}
          <div className="qwatermark-wrap">
            <div>
              {Array.from({ length: 40 }).map((_, i) => (
                <span key={i}>ABUZAR INDUSTRIES</span>
              ))}
            </div>
          </div>
          {/* computer-generated stamp */}
          <div className="q-stamp">COMPUTER GENERATED</div>

          {/* masthead — Cut Size simple-quote layout */}
          <div className="qh-card">
            <div className="qh-sq-head">
              <div className="qh-side qh-no">
                <span className="qh-lab">Quotation No.</span>
                <input className="qh-input" value={quoteNo} onChange={(e) => setQuoteNo(e.target.value)} />
              </div>
              <h2 className="qh-title">Wood Quotation</h2>
              <div className="qh-side qh-date">
                <span className="qh-lab">Date</span>
                <input className="qh-input" value={date} onChange={(e) => setDate(e.target.value)} />
              </div>
            </div>
            <div className="qh-cust">
              <div className="qh-cell">
                <span className="qh-lab">Customer</span>
                <input className="qh-input" value={customer} placeholder="Party name" readOnly aria-label="Customer" />
              </div>
              <div className="qh-cell">
                <span className="qh-lab">Phone</span>
                <input className="qh-input" value={phone ? "+91 " + phoneDisplay(phone) : ""} placeholder="Mobile" readOnly aria-label="Phone" />
              </div>
            </div>
          </div>

          {/* wood sections */}
          <div className="qsec-grid">
            {sections.map((sec, si) => (
              <div className="qsec" key={sec.id}>
                <div className="qsec-head">
                  <span className="q-grain no-print" aria-hidden>
                    <i /><i /><i />
                  </span>
                  <input
                    className="qsec-name"
                    value={sec.wood}
                    onChange={(e) => setSec(si, { wood: e.target.value })}
                  />
                  <span className="qsec-pcs">
                    Total Pcs<b>{sectionPcs(sec)}</b>
                  </span>
                  {sections.length > 1 && (
                    <span className="qsec-x no-print" onClick={() => delSection(si)} role="button">
                      <X size={14} />
                    </span>
                  )}
                </div>

                <div className="q-thead">
                  <span>#</span>
                  <span>CFT</span>
                  {COLS.map((c) => (
                    <span key={c.key}>
                      {c.label}
                      <small className="q-unit">{c.sub}</small>
                    </span>
                  ))}
                  <span className="no-print" />
                </div>
                {sec.rows.map((r, ri) => (
                  <div className="q-row" key={r.id}>
                    <span className="q-idx">{ri + 1}</span>
                    <span className="q-cft">{rowMeasure(r).toFixed(2)}</span>
                    {COLS.map((c, ci) => (
                      <input
                        key={c.key}
                        id={cellId(si, ri, ci)}
                        className="q-in"
                        inputMode="decimal"
                        value={r[c.key] as string}
                        onChange={(e) => setCell(si, ri, c.key, e.target.value)}
                        onKeyDown={(e) => onCellKey(e, si, ri, ci)}
                      />
                    ))}
                    <span className="q-rowx no-print" onClick={() => delRow(si, ri)} role="button">
                      <X size={13} />
                    </span>
                  </div>
                ))}

                <div className="qsec-foot">
                  <button type="button" className="q-addline no-print" onClick={() => addRow(si)}>
                    + Line
                  </button>
                  <div className="qf-oneline">
                    <div className="qf-sc">
                      <span className="qf-lab">Total CFT</span>
                      <span className="qf-val">{sectionMeasure(sec).toFixed(2)}</span>
                    </div>
                    <div className="qf-sc">
                      <span className="qf-lab">Rate ₹/cft</span>
                      <input
                        className="q-rate"
                        inputMode="decimal"
                        value={sec.rate}
                        onChange={(e) => setSec(si, { rate: num(e.target.value) })}
                      />
                    </div>
                    <div className="qf-sc qf-amt">
                      <span className="qf-lab">Total Price</span>
                      <span className="qf-val">₹ {inr(sectionPrice(sec))}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <button type="button" className="q-addwood no-print" onClick={addWood}>
            + Add Wood Type
          </button>

          {/* totals */}
          <div className="q-totals">
            <div className="qt-row">
              <span className="qt-lab">Sub-total</span>
              <span className="qt-val">{inr(subtotal)}</span>
            </div>
            <div className="qt-row">
              <span className="qt-lab">
                <button
                  type="button"
                  className={`q-gst-toggle ${gstOn ? "on" : ""}`}
                  onClick={() => setGstOn((v) => !v)}
                >
                  {gstOn ? "%" : "off"}
                </button>
                GST
                <input
                  className="qt-gstin"
                  inputMode="decimal"
                  value={gstPct}
                  disabled={!gstOn}
                  onChange={(e) => setGstPct(num(e.target.value))}
                />
                %
              </span>
              <span className="qt-val">{gstOn ? inr(gstAmt) : "—"}</span>
            </div>
            <div className="qt-grand">
              <span className="qt-lab">Grand Total</span>
              <span className="qt-val">₹ {inr(grand)}</span>
            </div>
          </div>

          <p className="q-words">
            Amount in words: <b>{rupeesInWords(grand)}</b>
          </p>
          <p className="q-disclaimer">
            This is a computer-generated quotation from abuzarindustries.in. Prices are indicative and subject to change based on current market rates and availability. A final invoice will be issued upon order confirmation.
          </p>
        </div>
        </LeadLock>
      </div>
    </div>
  );
}
