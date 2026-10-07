"use client";
import { useEffect, useState, type FormEvent } from "react";
import { Button } from "@/design-system/ui";
import { cn } from "@/lib/cn";
import { TOPICS } from "@/lib/validation";

type Slot = { time: string; available: boolean };
const field = "w-full rounded-xl border border-white/10 bg-bg-sunken px-4 py-3 text-sm outline-none transition focus:border-brand";

export function BookingForm({ minDate }: { minDate: string }) {
  const [date, setDate] = useState("");
  const [slots, setSlots] = useState<Slot[]>([]);
  const [time, setTime] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [done, setDone] = useState<{ icsUrl: string } | null>(null);

  useEffect(() => {
    if (!date) return;
    setTime(""); setLoading(true);
    fetch(`/api/appointments/slots?date=${date}`)
      .then((r) => r.json()).then((d) => setSlots(d.slots))
      .catch(() => setError("Could not load times.")).finally(() => setLoading(false));
  }, [date]);

  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    const f = new FormData(e.currentTarget);
    const res = await fetch("/api/appointments", {
      method: "POST", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: f.get("name"), email: f.get("email"), topic: f.get("topic"), message: f.get("message"), date, time }),
    });
    const body = await res.json();
    if (!res.ok) {
      setError(body.error ?? "Something went wrong.");
      if (res.status === 409 || res.status === 422) setDate((d) => d + ""), setTime("");
      return;
    }
    setDone(body);
  }

  if (done)
    return (
      <div className="rounded-card border border-brand bg-brand-soft p-8 text-center shadow-glow" role="status">
        <p className="code-tag">&lt;confirmed/&gt;</p>
        <h2 className="mt-2 text-2xl font-bold">You&apos;re booked 🎉</h2>
        <p className="mt-2 text-fg-muted">{date} at {time} (Berlin time). I&apos;ll reach out by email to confirm.</p>
        <div className="mt-6 flex justify-center gap-4"><Button href={done.icsUrl}>Add to calendar</Button><Button variant="outline" href="/">Back home</Button></div>
      </div>
    );

  return (
    <form onSubmit={submit} className="space-y-6">
      <div>
        <label htmlFor="date" className="mb-2 block text-sm font-semibold">1 · Pick a date <span className="font-normal text-fg-subtle">(Mon–Fri)</span></label>
        <input id="date" type="date" required min={minDate} value={date} onChange={(e) => setDate(e.target.value)} className={field} />
      </div>

      {date && (
        <div>
          <p className="mb-2 text-sm font-semibold">2 · Pick a time <span className="font-normal text-fg-subtle">(30 min · Europe/Berlin)</span></p>
          {loading ? <p className="text-sm text-fg-muted">Loading…</p> : slots.length === 0 ? (
            <p className="text-sm text-fg-muted">No times on this day — try a weekday.</p>
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
      <Button type="submit" disabled={!date || !time}>Confirm booking</Button>
    </form>
  );
}
