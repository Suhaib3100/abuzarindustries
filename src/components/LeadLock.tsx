"use client";

import { useState } from "react";
import { Lock, ArrowRight } from "lucide-react";
import { cleanIndianMobile, cleanLeadName, type LeadContact } from "@/lib/lead";

/**
 * Covers a quote tool until the visitor enters a real name and a 10-digit mobile number.
 * The tool underneath stays visible (blurred) so people can see what they are unlocking,
 * but it cannot be focused or typed into (`inert`).
 */
export default function LeadLock({
  locked,
  prefill,
  onUnlock,
  cta = "Unlock calculator",
  children,
}: {
  locked: boolean;
  prefill: LeadContact | null;
  onUnlock: (c: LeadContact, hp: string) => void;
  cta?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={"relative" + (locked ? " min-h-[440px]" : "")}>
      <div
        inert={locked}
        aria-hidden={locked || undefined}
        className={locked ? "pointer-events-none select-none blur-[3px] opacity-50" : undefined}
      >
        {children}
      </div>
      {locked && (
        <div className="no-print absolute inset-0 z-20 flex items-start justify-center px-3 pt-6 sm:pt-10">
          {/* remount when a remembered name/number loads, so it prefills */}
          <LeadForm key={prefill ? prefill.phone : "blank"} prefill={prefill} onUnlock={onUnlock} cta={cta} />
        </div>
      )}
    </div>
  );
}

function LeadForm({
  prefill,
  onUnlock,
  cta,
}: {
  prefill: LeadContact | null;
  onUnlock: (c: LeadContact, hp: string) => void;
  cta: string;
}) {
  const [name, setName] = useState(prefill?.name ?? "");
  const [phone, setPhone] = useState(prefill?.phone ?? "");
  const [hp, setHp] = useState(""); // honeypot
  const [errs, setErrs] = useState<{ name?: string; phone?: string }>({});

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const n = cleanLeadName(name);
    const p = cleanIndianMobile(phone);
    const next = {
      name: n ? undefined : "Please enter your name (at least 2 letters).",
      phone: p ? undefined : "Please enter a valid 10-digit mobile number.",
    };
    setErrs(next);
    if (n && p) onUnlock({ name: n, phone: p }, hp);
  };

  const field =
    "w-full px-3.5 py-3 text-base rounded-xl bg-panel border outline-none transition-[border-color,box-shadow] text-ink placeholder:text-ink-soft/40 focus:border-ochre/50 focus:ring-2 focus:ring-ochre/15";

  return (
    <form
      onSubmit={submit}
      noValidate
      className="w-full max-w-md rounded-2xl border border-walnut/10 bg-paper p-5 sm:p-7 shadow-xl shadow-walnut/15"
      aria-labelledby="lead-lock-title"
    >
      <div className="flex items-center gap-3 mb-1">
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-ochre/12 text-ochre">
          <Lock size={17} aria-hidden />
        </span>
        <h3 id="lead-lock-title" className="font-[family:var(--font-display)] font-bold text-xl text-walnut leading-tight">
          Your name and number first
        </h3>
      </div>
      <p className="text-sm text-ink-soft/80 mb-5 leading-relaxed">
        Enter them once to use the calculator. Our team calls or WhatsApps you with today&apos;s rate.
      </p>

      {/* honeypot: hidden from people, bots fill it */}
      <input
        type="text"
        name="company"
        value={hp}
        onChange={(e) => setHp(e.target.value)}
        tabIndex={-1}
        autoComplete="off"
        aria-hidden
        className="absolute opacity-0 pointer-events-none h-0 w-0"
      />

      <label htmlFor="lead-name" className="block text-xs font-semibold tracking-wider uppercase text-ink-soft/70 mb-1.5">
        Your name
      </label>
      <input
        id="lead-name"
        type="text"
        autoComplete="name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="e.g. Rajesh Kumar"
        aria-invalid={!!errs.name}
        aria-describedby={errs.name ? "lead-name-err" : undefined}
        className={field + (errs.name ? " border-danger/50" : " border-walnut/10")}
      />
      {errs.name && (
        <p id="lead-name-err" className="mt-1.5 text-xs text-danger">
          {errs.name}
        </p>
      )}

      <label htmlFor="lead-phone" className="block text-xs font-semibold tracking-wider uppercase text-ink-soft/70 mt-4 mb-1.5">
        Mobile number
      </label>
      <div className="flex items-stretch gap-2">
        <span className="flex items-center rounded-xl border border-walnut/10 bg-panel px-3 text-base text-ink-soft font-mono">
          +91
        </span>
        <input
          id="lead-phone"
          type="tel"
          inputMode="numeric"
          autoComplete="tel-national"
          value={phone}
          onChange={(e) => setPhone(e.target.value.replace(/[^\d+\s-]/g, "").slice(0, 16))}
          placeholder="10-digit mobile"
          aria-invalid={!!errs.phone}
          aria-describedby={errs.phone ? "lead-phone-err" : undefined}
          className={field + " font-mono" + (errs.phone ? " border-danger/50" : " border-walnut/10")}
        />
      </div>
      {errs.phone && (
        <p id="lead-phone-err" className="mt-1.5 text-xs text-danger">
          {errs.phone}
        </p>
      )}

      <button
        type="submit"
        className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-green px-5 py-3.5 text-sm font-semibold text-paper shadow-lg shadow-green/20 transition-colors hover:bg-green/90"
      >
        {cta}
        <ArrowRight size={16} aria-hidden />
      </button>

      <p className="mt-4 text-[11.5px] leading-relaxed text-ink-soft/70">
        We save your name, number and the sizes you type, even if you don&apos;t press Send, so we can call you
        back with a price. We use them only for your enquiry and don&apos;t share them.
      </p>
    </form>
  );
}
