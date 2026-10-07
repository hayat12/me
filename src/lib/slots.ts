/** Meeting slots are 30 min, Mon–Fri, 10:00–18:00 Europe/Berlin. */
export const TIME_ZONE = "Europe/Berlin";
export const SLOT_MINUTES = 30;
export const LEAD_HOURS = 2;
const START_HOUR = 10;
const END_HOUR = 18;

const pad = (n: number) => String(n).padStart(2, "0");

function parts(ts: number) {
  const f = new Intl.DateTimeFormat("en-CA", {
    timeZone: TIME_ZONE, hourCycle: "h23",
    year: "numeric", month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit",
  }).formatToParts(new Date(ts));
  const g = (t: string) => Number(f.find((p) => p.type === t)!.value);
  return { y: g("year"), m: g("month"), d: g("day"), h: g("hour"), mi: g("minute") };
}

/** Convert a Berlin wall-clock date/time to a UTC timestamp. */
export function berlinToUtc(date: string, time: string): number {
  const [y, m, d] = date.split("-").map(Number);
  const [h, mi] = time.split(":").map(Number);
  const guess = Date.UTC(y, m - 1, d, h, mi);
  const p = parts(guess);
  const offset = Date.UTC(p.y, p.m - 1, p.d, p.h, p.mi) - guess;
  return guess - offset;
}

export function allSlotTimes(): string[] {
  const out: string[] = [];
  for (let m = START_HOUR * 60; m < END_HOUR * 60; m += SLOT_MINUTES) out.push(`${pad(Math.floor(m / 60))}:${pad(m % 60)}`);
  return out;
}

export function isWeekday(date: string): boolean {
  const [y, m, d] = date.split("-").map(Number);
  const day = new Date(Date.UTC(y, m - 1, d)).getUTCDay();
  return day !== 0 && day !== 6;
}

/** Slots that can still be booked on a given date (weekday, in the future with lead time). */
export function bookableTimes(date: string, now = Date.now()): string[] {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date) || !isWeekday(date)) return [];
  const min = now + LEAD_HOURS * 3600_000;
  const max = now + 90 * 86400_000;
  return allSlotTimes().filter((t) => {
    const ts = berlinToUtc(date, t);
    return ts >= min && ts <= max;
  });
}

export function todayBerlin(now = Date.now()): string {
  const p = parts(now);
  return `${p.y}-${pad(p.m)}-${pad(p.d)}`;
}
