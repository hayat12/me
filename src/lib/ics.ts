import { berlinToUtc, SLOT_MINUTES } from "./slots";
import type { Appointment } from "./validation";

const fmt = (ts: number) => new Date(ts).toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");
const esc = (s: string) => s.replace(/([,;\\])/g, "\\$1").replace(/\n/g, "\\n");

export function buildIcs(a: Appointment): string {
  const start = berlinToUtc(a.date, a.time);
  const end = start + SLOT_MINUTES * 60_000;
  return [
    "BEGIN:VCALENDAR", "VERSION:2.0", "PRODID:-//Hayat Portfolio//Booking//EN", "BEGIN:VEVENT",
    `UID:${a.id}@hayat-portfolio`, `DTSTAMP:${fmt(Date.now())}`, `DTSTART:${fmt(start)}`, `DTEND:${fmt(end)}`,
    `SUMMARY:${esc(`Meeting with Hayatullah — ${a.topic}`)}`,
    `DESCRIPTION:${esc(a.message || "Intro call")}`, "END:VEVENT", "END:VCALENDAR",
  ].join("\r\n");
}
