import { berlinToUtc, SLOT_MINUTES } from "./slots";
import type { Appointment } from "./validation";

const fmt = (ts: number) => new Date(ts).toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");
const esc = (s: string) => s.replace(/([,;\\])/g, "\\$1").replace(/\r?\n/g, "\\n");

export function buildIcs(a: Appointment): string {
  const start = berlinToUtc(a.date, a.time);
  const end = start + SLOT_MINUTES * 60_000;
  return [
    "BEGIN:VCALENDAR", "VERSION:2.0", "PRODID:-//Hayat Portfolio//Booking//EN", "CALSCALE:GREGORIAN", "BEGIN:VEVENT",
    `UID:${a.id}@hayat-portfolio`, `DTSTAMP:${fmt(Date.now())}`, `DTSTART:${fmt(start)}`, `DTEND:${fmt(end)}`,
    `SUMMARY:${esc(`Meeting with Hayatullah — ${a.topic}`)}`,
    `DESCRIPTION:${esc(`${a.message || "Intro call"}\nStatus: requested — awaiting confirmation by email.`)}`,
    "STATUS:TENTATIVE", "END:VEVENT", "END:VCALENDAR", "",
  ].join("\r\n");
}

export function downloadIcs(a: Appointment) {
  const url = URL.createObjectURL(new Blob([buildIcs(a)], { type: "text/calendar;charset=utf-8" }));
  const link = Object.assign(document.createElement("a"), { href: url, download: `meeting-${a.date}.ics` });
  document.body.appendChild(link);
  link.click();
  link.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}
