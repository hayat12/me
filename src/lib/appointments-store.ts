import type { Appointment, AppointmentInput } from "./validation";

/**
 * Client-side appointment store (localStorage).
 *
 * GitHub Pages is static, so there is no shared database: this store only knows about bookings made in
 * THIS browser (it prevents double-booking for the same visitor and powers "my booking" + the .ics file).
 * Delivery to Hayat happens in `deliverBooking` (form endpoint or pre-filled email).
 * To get true cross-visitor availability later, implement the same functions against a backend.
 */
const KEY = "portfolio.appointments.v2";
const EMPTY: Appointment[] = [];
let cache: { raw: string | null; value: Appointment[] } = { raw: null, value: EMPTY };
const listeners = new Set<() => void>();

function parse(raw: string | null): Appointment[] {
  if (!raw) return EMPTY;
  try {
    const v = JSON.parse(raw);
    return Array.isArray(v) ? v : EMPTY;
  } catch {
    return EMPTY;
  }
}

export const appointmentStore = {
  subscribe(cb: () => void) {
    listeners.add(cb);
    const onStorage = (e: StorageEvent) => e.key === KEY && cb();
    window.addEventListener("storage", onStorage);
    return () => { listeners.delete(cb); window.removeEventListener("storage", onStorage); };
  },
  getSnapshot(): Appointment[] {
    let raw: string | null = null;
    try { raw = localStorage.getItem(KEY); } catch { /* storage blocked */ }
    if (raw === cache.raw) return cache.value;
    cache = { raw, value: parse(raw) };
    return cache.value;
  },
  getServerSnapshot: () => EMPTY,
};

export function bookedTimes(date: string): string[] {
  return appointmentStore.getSnapshot().filter((a) => a.date === date).map((a) => a.time);
}

/** Returns null if the slot is already taken (in this browser). */
export function createAppointment(input: AppointmentInput): Appointment | null {
  const all = appointmentStore.getSnapshot();
  if (all.some((a) => a.date === input.date && a.time === input.time)) return null;
  const appt: Appointment = { ...input, id: crypto.randomUUID(), createdAt: new Date().toISOString() };
  try { localStorage.setItem(KEY, JSON.stringify([...all, appt])); } catch { /* still works, just not remembered */ }
  listeners.forEach((l) => l());
  return appt;
}
