import { NextResponse } from "next/server";
import { appointments } from "@/lib/appointments-repo";
import { allSlotTimes, bookableTimes } from "@/lib/slots";

export async function GET(req: Request) {
  const date = new URL(req.url).searchParams.get("date") ?? "";
  const open = bookableTimes(date);
  const booked = new Set(await appointments.bookedTimes(date));
  const slots = allSlotTimes().map((time) => ({ time, available: open.includes(time) && !booked.has(time) }));
  return NextResponse.json({ date, slots: open.length ? slots : [] });
}
