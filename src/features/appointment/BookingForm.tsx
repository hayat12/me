"use client";
import { useMemo, useState, useSyncExternalStore, type FormEvent } from "react";
import { Button } from "@/design-system/ui";
import { appointmentStore, createAppointment } from "@/lib/appointments-store";
import { deliverBooking, mailtoUrl } from "@/lib/deliver";
import { downloadIcs } from "@/lib/ics";
import { berlinToUtc, bookableTimes, HORIZON_DAYS, todayBerlin } from "@/lib/slots";
import { cn } from "@/lib/cn";
import { appointmentSchema, TOPICS, type Appointment } from "@/lib/validation";

const field = "w-full rounded-xl border border-white/10 bg-bg-sunken px-4 py-3 text-sm outline-none transition focus:border-brand";
const noop = () => () => {};
const localTime = (date: string, time: string) =>
  new Intl.DateTimeFormat(undefined, { hour: "2-digit", minute: "2-digit", timeZoneName: "short" }).format(new Date(berlinToUtc(date, time)));
const addDays = (key: string, n: number) => new Date(Date.parse(`${key}T00:00:00Z`) + n * 86400_000).toISOString().slice(0, 10);

export function BookingForm() {
  // The page is pre-rendered at build time, so anything date-dependent must wait for the browser.
  const mounted = useSyncExternalStore(noop, () => true, () => false);
  const booked = useSyncExternalStore(appointmentStore.subscribe, appointmentStore.getSnapshot, appointmentStore.getServerSnapshot);

  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState<{ appt: Appointment; delivery: "sent" | "email" } | null>(null);

  const slots = useMemo(() => {
    if (!date) return [];
    const taken = new Set(booked.filter((a) => a.date === date).map((a) => a.time));
    const free = bookableTimes(date);
    return free.map((t) => ({ time: t, available: !taken.has(t) }));
  }, [date, booked]);

  if (!mounted) return <div className="h-96 animate-pulse rounded-card bg-bg-raised" aria-hidden="true" />;
  const minDate = todayBerlin();
  const maxDate = addDays(minDate, HORIZON_DAYS);

  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    const f = new FormData(e.currentTarget);
    const parsed = appointmentSchema.safeParse({ name: f.get("name"), email: f.get("email"), topic: f.get("topic"), message: f.get("message"), date, time });
    if (!parsed.success) return setError(parsed.error.issues[0]?.message ?? "Please check the form.");
    setBusy(true);
    const appt = createAppointment(parsed.data);
    if (!appt) { setBusy(false); setTime(""); return setError("That time was just taken — please pick another."); }
    const delivery = await deliverBooking(appt);
    setBusy(false);
    setDone({ appt, delivery });
    if (delivery === "email") window.location.href = mailtoUrl(appt); // no form endpoint configured → open a pre-filled email
  }

  if (done) {
    const { appt, delivery } = done;
    return (
      <div className="rounded-card border border-brand bg-brand-soft p-8 text-center shadow-glow" role="status">
        <p className="code-tag">&lt;{delivery === "sent" ? "request-sent" : "one-more-step"}/&gt;</p>
        <h2 className="mt-2 text-2xl font-bold">{delivery === "sent" ? "Request sent 🎉" : "Almost there — send the email"}</h2>
        <p className="mt-2 text-fg-muted">
          {appt.date} at {appt.time} Berlin time <span className="text-fg-subtle">({localTime(appt.date, appt.time)} for you)</span>.
          {delivery === "sent" ? " I'll confirm by email." : " Your mail app should have opened with the request pre-filled — hit send and I'll confirm."}
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-4">
          {delivery === "email" && <Button href={mailtoUrl(appt)}>Open email again</Button>}
          <Button variant={delivery === "email" ? "outline" : "solid"} onClick={() => downloadIcs(appt)}>Add to calendar</Button>
          <Button variant="outline" href="/">Back home</Button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="space-y-6" noValidate>
      <div>
        <label htmlFor="date" className="mb-2 block text-sm font-semibold">1 · Pick a date <span className="font-normal text-fg-subtle">(Mon–Fri)</span></label>
        <input id="date" type="date" required min={minDate} max={maxDate} value={date} onChange={(e) => { setDate(e.target.value); setTime(""); }} className={field} />
      </div>

      {date && (
        <div>
          <p className="mb-2 text-sm font-semibold">2 · Pick a time <span className="font-normal text-fg-subtle">(30 min · Europe/Berlin — your local time shown on selection)</span></p>
          {slots.length === 0 ? (
            <p className="text-sm text-fg-muted">No times on this day — try another weekday.</p>
          ) : (
            <div className="grid grid-cols-3 gap-2 sm:grid-cols-4" role="radiogroup" aria-label="Available times">
              {slots.map((s) => (
                <button type="button" key={s.time} role="radio" aria-checked={time === s.time} disabled={!s.available} onClick={() => setTime(s.time)}
                  className={cn("rounded-pill border px-3 py-2 font-mono text-sm transition",
                    time === s.time ? "border-brand bg-brand text-bg-sunken" : "border-white/10 hover:border-brand",
                    !s.available && "cursor-not-allowed line-through opacity-30 hover:border-white/10")}>
                  {s.time}
                </button>
              ))}
            </div>
          )}
          {time && <p className="mt-2 font-mono text-xs text-fg-subtle">= {localTime(date, time)} in your timezone</p>}
        </div>
      )}

      <div className="grid gap-4 md:grid-cols-2">
        <div><label htmlFor="name" className="mb-2 block text-sm font-semibold">Name</label><input id="name" name="name" required minLength={2} className={field} autoComplete="name" /></div>
        <div><label htmlFor="email" className="mb-2 block text-sm font-semibold">Email</label><input id="email" name="email" type="email" required className={field} autoComplete="email" /></div>
      </div>
      <div><label htmlFor="topic" className="mb-2 block text-sm font-semibold">Topic</label>
        <select id="topic" name="topic" className={field} defaultValue={TOPICS[0]}>{TOPICS.map((t) => <option key={t}>{t}</option>)}</select></div>
      <div><label htmlFor="message" className="mb-2 block text-sm font-semibold">Message <span className="font-normal text-fg-subtle">(optional)</span></label><textarea id="message" name="message" rows={4} maxLength={1000} className={field} /></div>

      {error && <p role="alert" className="text-sm text-danger">{error}</p>}
      <Button type="submit" disabled={!date || !time || busy}>{busy ? "Sending…" : "Request this time"}</Button>
      <p className="text-xs text-fg-subtle">Times are requests — I confirm each one by email. Availability shown is Mon–Fri 10:00–18:00 Berlin.</p>
    </form>
  );
}
