import { NextResponse } from "next/server";
import { appointments } from "@/lib/appointments-repo";
import { bookableTimes } from "@/lib/slots";
import { appointmentSchema } from "@/lib/validation";
import { notifyBooking } from "@/lib/notify";

export async function POST(req: Request) {
  const parsed = appointmentSchema.safeParse(await req.json().catch(() => null));
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid input", fields: parsed.error.flatten().fieldErrors }, { status: 400 });
  }
  const input = parsed.data;
  if (!bookableTimes(input.date).includes(input.time)) {
    return NextResponse.json({ error: "That time is not available. Please pick another slot." }, { status: 422 });
  }
  const created = await appointments.create(input);
  if (!created) return NextResponse.json({ error: "Sorry — that slot was just taken." }, { status: 409 });
  void notifyBooking(created);
  return NextResponse.json({ id: created.id, icsUrl: `/api/appointments/${created.id}/ics` }, { status: 201 });
}
