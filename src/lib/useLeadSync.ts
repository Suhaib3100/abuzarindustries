"use client";

import { useCallback, useEffect, useMemo, useRef, useState, useSyncExternalStore } from "react";
import {
  beaconLead,
  CONTACT_KEY,
  forgetSession,
  newLeadId,
  parseContact,
  parseSession,
  postLead,
  readStorage,
  rememberContact,
  rememberSession,
  sessionKey,
  type LeadContact,
  type LeadPage,
  type LeadPayload,
  type LeadSection,
} from "./lead";

const subscribeStorage = (cb: () => void) => {
  window.addEventListener("storage", cb);
  return () => window.removeEventListener("storage", cb);
};

/** A storage value as a stable string (null on the server and during hydration). */
function useStorageRaw(kind: "local" | "session", key: string): string | null {
  return useSyncExternalStore(
    subscribeStorage,
    () => readStorage(kind, key),
    () => null,
  );
}

const DEBOUNCE_MS = 1200;
const signature = (c: LeadContact, sections: LeadSection[]) => JSON.stringify([c.name, c.phone, sections]);

/**
 * Locks a quote tool until the visitor gives a name and mobile number, then streams
 * what they type to Cut Size: "start" on unlock, "update" about a second after each
 * change, a last update by beacon if the page is hidden or closed, and "send" when
 * they press Send. `sections` should be memoised by the caller.
 */
export function useLeadSync(page: LeadPage, sections: LeadSection[]) {
  const restored = useParsedSession(useStorageRaw("session", sessionKey(page)));
  const prefill = useParsedContact(useStorageRaw("local", CONTACT_KEY));

  // undefined = nothing decided in this render tree yet (use the tab's saved lead);
  // null = locked on purpose ("Change" pressed); object = unlocked with these details.
  const [entered, setEntered] = useState<LeadContact | null | undefined>(undefined);
  const contact = useMemo<LeadContact | null>(
    () => (entered === undefined ? (restored ? { name: restored.name, phone: restored.phone } : null) : entered),
    [entered, restored],
  );

  const leadIdRef = useRef("");
  const hpRef = useRef("");
  const sectionsRef = useRef(sections);
  const lastSentRef = useRef("");
  const pendingRef = useRef<{ payload: LeadPayload; sig: string } | null>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  useEffect(() => {
    sectionsRef.current = sections;
  }, [sections]);

  const leadIdFor = useCallback(() => {
    if (!leadIdRef.current) leadIdRef.current = restored?.leadId || newLeadId();
    return leadIdRef.current;
  }, [restored]);

  // Live updates while they type.
  useEffect(() => {
    if (!contact) return;
    const sig = signature(contact, sections);
    if (sig === lastSentRef.current) {
      pendingRef.current = null;
      return;
    }
    const payload: LeadPayload = { ...contact, leadId: leadIdFor(), page, event: "update", sections, hp: hpRef.current };
    pendingRef.current = { payload, sig };
    timerRef.current = setTimeout(async () => {
      const r = await postLead(payload);
      if (r.ok) {
        lastSentRef.current = sig;
        if (pendingRef.current?.sig === sig) pendingRef.current = null;
      }
    }, DEBOUNCE_MS);
    return () => clearTimeout(timerRef.current);
  }, [contact, sections, page, leadIdFor]);

  // Leaving the page: send whatever has not gone yet.
  useEffect(() => {
    const flush = () => {
      const p = pendingRef.current;
      if (!p || p.sig === lastSentRef.current) return;
      if (beaconLead(p.payload)) {
        lastSentRef.current = p.sig;
        pendingRef.current = null;
      }
    };
    const onVis = () => {
      if (document.visibilityState === "hidden") flush();
    };
    document.addEventListener("visibilitychange", onVis);
    window.addEventListener("pagehide", flush);
    return () => {
      document.removeEventListener("visibilitychange", onVis);
      window.removeEventListener("pagehide", flush);
    };
  }, []);

  const unlock = useCallback(
    (c: LeadContact, hp = "") => {
      hpRef.current = hp;
      const leadId = leadIdFor(); // "Change" keeps the same lead, so a corrected number updates it
      rememberContact(c);
      rememberSession(page, { ...c, leadId });
      setEntered(c);
      const s = sectionsRef.current;
      const sig = signature(c, s);
      lastSentRef.current = sig;
      void postLead({ ...c, leadId, page, event: "start", sections: s, hp }).then((r) => {
        if (!r.ok && lastSentRef.current === sig) lastSentRef.current = ""; // retry with the next change
      });
    },
    [page, leadIdFor],
  );

  const relock = useCallback(() => {
    forgetSession(page);
    setEntered(null);
  }, [page]);

  const send = useCallback(async () => {
    if (!contact) return { ok: false, error: "Enter your name and mobile number first." };
    clearTimeout(timerRef.current);
    const s = sectionsRef.current;
    const r = await postLead({ ...contact, leadId: leadIdFor(), page, event: "send", sections: s, hp: hpRef.current });
    if (r.ok) {
      lastSentRef.current = signature(contact, s);
      pendingRef.current = null;
    }
    return r;
  }, [contact, page, leadIdFor]);

  return { contact, prefill, unlock, relock, send };
}

// Parsed values keep the same identity for the same stored string.
function useParsedSession(raw: string | null) {
  return useMemo(() => parseSession(raw), [raw]);
}
function useParsedContact(raw: string | null) {
  return useMemo(() => parseContact(raw), [raw]);
}
