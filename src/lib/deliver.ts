import type { Appointment } from "./validation";

export const CONTACT_EMAIL = process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "rahnamoonhayatullah@gmail.com";
const ENDPOINT = process.env.NEXT_PUBLIC_BOOKING_ENDPOINT ?? "";

export const summaryText = (a: Appointment) =>
  [`Meeting request — ${a.topic}`, `When: ${a.date} ${a.time} (Europe/Berlin), 30 min`, `Name: ${a.name}`, `Email: ${a.email}`, a.message ? `\n${a.message}` : ""].join("\n");

export const mailtoUrl = (a: Appointment) =>
  `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(`Meeting request: ${a.date} ${a.time} — ${a.name}`)}&body=${encodeURIComponent(summaryText(a))}`;

/**
 * Sends the request to the configured form endpoint (Formspree etc.).
 * Returns "sent" on success, otherwise "email" meaning the visitor must send the pre-filled email.
 */
export async function deliverBooking(a: Appointment): Promise<"sent" | "email"> {
  if (!ENDPOINT) return "email";
  try {
    const res = await fetch(ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({ ...a, _subject: `Meeting request — ${a.name}`, message_summary: summaryText(a) }),
    });
    return res.ok ? "sent" : "email";
  } catch {
    return "email";
  }
}
