import type { Metadata } from "next";
import { BookingForm } from "@/features/appointment/BookingForm";

export const metadata: Metadata = { title: "Book a meeting" };

export default function AppointmentPage() {
  return (
    <section className="mx-auto max-w-2xl px-6 pb-24 pt-36">
      <p className="code-tag">&lt;appointment&gt;</p>
      <h1 className="mt-2 text-4xl font-bold">Book a meeting</h1>
      <p className="mb-10 mt-3 text-fg-muted">Pick a slot for a 30-minute intro call. You&apos;ll get a calendar file right after requesting.</p>
      <BookingForm />
    </section>
  );
}
