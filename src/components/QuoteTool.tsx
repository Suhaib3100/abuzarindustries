"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Trash2, Send, Calculator, RotateCcw } from "lucide-react";
import VideoFrame from "./VideoFrame";

interface Row {
  id: number;
  l: string;
  w: string;
  t: string;
  pcs: string;
}

const calcCft = (l: number, w: number, t: number, pcs: number) =>
  ((l * w * t * pcs) / 144).toFixed(2);

const COMMON_WOODS = ["Teak Wood", "White Teak", "Neem Wood"];

const PHONE = "919845378626";

export default function QuoteTool() {
  const [rows, setRows] = useState<Row[]>([
    { id: 1, l: "", w: "", t: "", pcs: "1" },
  ]);
  const [woodType, setWoodType] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [sent, setSent] = useState(false);
  const [nextId, setNextId] = useState(2);

  const addRow = () => {
    setRows((r) => [...r, { id: nextId, l: "", w: "", t: "", pcs: "1" }]);
    setNextId((n) => n + 1);
  };

  const delRow = (id: number) => {
    if (rows.length <= 1)
      return setRows([{ id: Date.now(), l: "", w: "", t: "", pcs: "1" }]);
    setRows((r) => r.filter((x) => x.id !== id));
  };

  const updateRow = (id: number, key: "l" | "w" | "t" | "pcs", v: string) => {
    const clean = v.replace(/[^0-9.]/g, "").replace(/(\..*)\./g, "$1");
    setRows((r) => r.map((x) => (x.id === id ? { ...x, [key]: clean } : x)));
  };

  const totalCft = rows.reduce((s, r) => {
    const l = parseFloat(r.l) || 0;
    const w = parseFloat(r.w) || 0;
    const t = parseFloat(r.t) || 0;
    const p = parseInt(r.pcs) || 0;
    return s + l * w * t * p / 144;
  }, 0);

  const estimate = Math.round(totalCft * 2600);

  const buildMessage = useCallback(() => {
    let msg = `*Timber Quotation Request*\n`;
    if (name) msg += `Name: ${name}\n`;
    if (phone) msg += `Phone: ${phone}\n`;
    if (woodType) msg += `Wood: ${woodType}\n`;
    msg += `\n*Dimensions (L×W×T × Pcs):*\n`;
    rows.forEach((r, i) => {
      if (r.l || r.w || r.t) {
        msg += `${i + 1}. ${r.l || "?"}ft × ${r.w || "?"}in × ${r.t || "?"}in × ${parseInt(r.pcs) || 1}pcs`;
        const l = parseFloat(r.l) || 0;
        const w = parseFloat(r.w) || 0;
        const t = parseFloat(r.t) || 0;
        const p = parseInt(r.pcs) || 0;
        if (l && w && t && p) msg += ` = ${calcCft(l, w, t, p)} CFT`;
        msg += "\n";
      }
    });
    msg += `\nTotal: ${totalCft.toFixed(2)} CFT`;
    if (totalCft > 0 && woodType)
      msg += ` | Est. ₹${estimate.toLocaleString("en-IN")}`;
    msg += `\n\nPlease share your best price. Thank you! 🙏`;
    return encodeURIComponent(msg);
  }, [rows, woodType, name, phone, totalCft, estimate]);

  const sendWhatsApp = () => {
    const url = `https://wa.me/${PHONE}?text=${buildMessage()}`;
    window.open(url, "_blank");
    setSent(true);
  };

  return (
    <section id="quote" className="py-24 sm:py-32 bg-panel/50 relative overflow-hidden">
      {/* ambient grain-macro backdrop */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.12]">
        <VideoFrame
          src="/videos/grain-macro.mp4"
          poster="/grain-macro-poster.jpg"
          className="h-full w-full"
          tint={false}
        />
        <div className="absolute inset-0 bg-panel/60" />
      </div>

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          className="text-center max-w-2xl mx-auto mb-12"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-ochre/10 border border-ochre/20 text-ochre text-xs font-semibold tracking-wider uppercase mb-4">
            Get a Quote
          </span>
          <h2 className="font-[family:var(--font-display)] font-bold text-4xl sm:text-5xl text-walnut leading-[1.1]">
            Instant Timber
            <br />
            <span className="text-ochre">Quotation</span>
          </h2>
          <p className="mt-4 text-ink-soft/80 text-sm sm:text-base leading-relaxed">
            Enter your dimensions below and send us the details on WhatsApp.
            We&apos;ll reply with a price within minutes.
          </p>
        </motion.div>

        {/* Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          className="bg-paper border border-walnut/5 rounded-2xl p-6 sm:p-8 shadow-lg shadow-walnut/5"
        >
          {/* Customer info */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
            <div>
              <label className="block text-xs font-semibold tracking-wider uppercase text-ink-soft/60 mb-1.5">
                Your Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Rajesh"
                className="w-full px-3.5 py-2.5 text-sm rounded-xl bg-panel border border-walnut/10 focus:border-ochre/40 focus:ring-2 focus:ring-ochre/10 outline-none transition-[border-color,box-shadow] text-ink placeholder:text-ink-soft/30"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold tracking-wider uppercase text-ink-soft/60 mb-1.5">
                Phone (optional)
              </label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+91 98765 43210"
                className="w-full px-3.5 py-2.5 text-sm rounded-xl bg-panel border border-walnut/10 focus:border-ochre/40 focus:ring-2 focus:ring-ochre/10 outline-none transition-[border-color,box-shadow] text-ink placeholder:text-ink-soft/30"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold tracking-wider uppercase text-ink-soft/60 mb-1.5">
                Wood Type
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={woodType}
                  onChange={(e) => setWoodType(e.target.value)}
                  placeholder="e.g. Ghana Teak"
                  list="woods"
                  className="w-full px-3.5 py-2.5 text-sm rounded-xl bg-panel border border-walnut/10 focus:border-ochre/40 focus:ring-2 focus:ring-ochre/10 outline-none transition-[border-color,box-shadow] text-ink placeholder:text-ink-soft/30"
                />
                <datalist id="woods">
                  {COMMON_WOODS.map((w) => (
                    <option key={w} value={w} />
                  ))}
                </datalist>
              </div>
            </div>
          </div>

          {/* Table header */}
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold tracking-wider uppercase text-ink-soft/60">
              Dimensions (L × W × T × Qty)
            </span>
            <div className="flex gap-2">
              <button
                onClick={addRow}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-walnut text-paper text-xs font-semibold hover:bg-walnut-2 transition-colors"
              >
                <Plus size={13} />
                Add Line
              </button>
              <button
                onClick={() => {
                  setRows([{ id: Date.now(), l: "", w: "", t: "", pcs: "1" }]);
                  setWoodType("");
                  setName("");
                  setPhone("");
                  setSent(false);
                }}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-walnut/10 text-ink-soft text-xs font-semibold hover:bg-panel transition-colors"
              >
                <RotateCcw size={13} />
                Reset
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-xs text-ink-soft/60 font-semibold tracking-wider uppercase">
                  <th className="text-left pb-2 pr-2">#</th>
                  <th className="text-left pb-2 pr-2">Length (ft)</th>
                  <th className="text-left pb-2 pr-2">Width (in)</th>
                  <th className="text-left pb-2 pr-2">Thickness (in)</th>
                  <th className="text-left pb-2 pr-2">Pcs</th>
                  <th className="text-right pb-2 pr-2">CFT</th>
                  <th className="w-8 pb-2" />
                </tr>
              </thead>
              <tbody>
                <AnimatePresence>
                {rows.map((r) => {
                  const l = parseFloat(r.l) || 0;
                  const w = parseFloat(r.w) || 0;
                  const t = parseFloat(r.t) || 0;
                  const p = parseInt(r.pcs) || 0;
                  const cft = l && w && t && p ? calcCft(l, w, t, p) : "—";
                  return (
                    <motion.tr
                      key={r.id}
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0, transition: { duration: 0.2 } }}
                      transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                      className="border-t border-walnut/5 overflow-hidden"
                    >
                      <td className="py-2 pr-2 text-ink-soft/40 font-mono text-xs">
                        {r.id}
                      </td>
                      <td className="py-2 pr-2">
                        <input
                          type="text"
                          inputMode="decimal"
                          value={r.l}
                          onChange={(e) => updateRow(r.id, "l", e.target.value)}
                          className="w-16 px-2 py-1.5 rounded-lg bg-panel border border-walnut/5 focus:border-ochre/40 focus:ring-2 focus:ring-ochre/10 outline-none transition-[border-color,box-shadow] text-ink font-mono text-sm"
                        />
                      </td>
                      <td className="py-2 pr-2">
                        <input
                          type="text"
                          inputMode="decimal"
                          value={r.w}
                          onChange={(e) => updateRow(r.id, "w", e.target.value)}
                          className="w-16 px-2 py-1.5 rounded-lg bg-panel border border-walnut/5 focus:border-ochre/40 focus:ring-2 focus:ring-ochre/10 outline-none transition-[border-color,box-shadow] text-ink font-mono text-sm"
                        />
                      </td>
                      <td className="py-2 pr-2">
                        <input
                          type="text"
                          inputMode="decimal"
                          value={r.t}
                          onChange={(e) => updateRow(r.id, "t", e.target.value)}
                          className="w-16 px-2 py-1.5 rounded-lg bg-panel border border-walnut/5 focus:border-ochre/40 focus:ring-2 focus:ring-ochre/10 outline-none transition-[border-color,box-shadow] text-ink font-mono text-sm"
                        />
                      </td>
                      <td className="py-2 pr-2">
                        <input
                          type="text"
                          inputMode="numeric"
                          value={r.pcs}
                          onChange={(e) =>
                            updateRow(r.id, "pcs", e.target.value)
                          }
                          className="w-14 px-2 py-1.5 rounded-lg bg-panel border border-walnut/5 focus:border-ochre/40 focus:ring-2 focus:ring-ochre/10 outline-none transition-[border-color,box-shadow] text-ink font-mono text-sm"
                        />
                      </td>
                      <td className="py-2 pr-2 text-right font-mono text-sm text-ink-soft">
                        {cft}
                      </td>
                      <td className="py-2 text-right">
                        <button
                          onClick={() => delRow(r.id)}
                          className="p-1.5 rounded-lg text-ink-soft/30 hover:text-danger hover:bg-danger/5 transition-colors"
                          aria-label="Remove row"
                        >
                          <Trash2 size={14} />
                        </button>
                      </td>
                    </motion.tr>
                  );
                })}
                </AnimatePresence>
              </tbody>
            </table>
          </div>

          {/* Totals */}
          <div className="mt-6 pt-4 border-t border-walnut/5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-6">
              <div>
                <span className="text-xs text-ink-soft/60 font-semibold tracking-wider uppercase">
                  Total CFT
                </span>
                <motion.div
                  key={totalCft}
                  initial={{ scale: 1 }}
                  animate={{ scale: [1, 1.06, 1] }}
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  className="font-[family:var(--font-display)] font-bold text-2xl text-walnut"
                >
                  {totalCft.toFixed(2)}
                </motion.div>
              </div>
              {totalCft > 0 && (
                <div>
                  <span className="text-xs text-ink-soft/60 font-semibold tracking-wider uppercase">
                    Est. Price*
                  </span>
                  <motion.div
                    key={`price-${estimate}`}
                    initial={{ scale: 1 }}
                    animate={{ scale: [1, 1.04, 1] }}
                    transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                    className="font-[family:var(--font-display)] font-bold text-2xl text-ochre"
                  >
                    ₹{estimate.toLocaleString("en-IN")}
                  </motion.div>
                  <span className="text-[10px] text-ink-soft/40">
                    * ₹2,600/CFT estimate. Final price depends on wood type.
                  </span>
                </div>
              )}
            </div>

            <button
              onClick={sendWhatsApp}
              disabled={!rows.some((r) => r.l && r.w && r.t)}
              className="flex items-center gap-2.5 px-6 py-3.5 rounded-xl bg-green text-paper text-sm font-semibold hover:bg-green/90 transition-[background,transform] pressable disabled:opacity-30 disabled:cursor-not-allowed disabled:active:scale-100 shadow-lg shadow-green/20"
            >
              <Send size={16} />
              Send on WhatsApp
            </button>
          </div>

          {/* Success message */}
          <AnimatePresence>
            {sent && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-4 p-4 rounded-xl bg-green/5 border border-green/10 text-green text-sm"
              >
                ✅ Quotation sent! We&apos;ll get back to you on WhatsApp
                shortly.
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
