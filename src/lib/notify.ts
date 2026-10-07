import type { Appointment } from "./validation";

/** Fire-and-forget webhook so new bookings reach Slack/Discord/Make/Zapier. */
export async function notifyBooking(a: Appointment) {
  const url = process.env.NOTIFY_WEBHOOK_URL;
  if (!url) return;
  try {
    await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        text: `New meeting: ${a.name} <${a.email}> — ${a.date} ${a.time} (Berlin) — ${a.topic}\n${a.message}`,
        appointment: a,
      }),
    });
  } catch (e) {
    console.error("notifyBooking failed", e);
  }
}
