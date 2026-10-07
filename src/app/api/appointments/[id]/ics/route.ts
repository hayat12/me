import { appointments } from "@/lib/appointments-repo";
import { buildIcs } from "@/lib/ics";

export async function GET(_: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const appt = await appointments.get(id);
  if (!appt) return new Response("Not found", { status: 404 });
  return new Response(buildIcs(appt), {
    headers: { "Content-Type": "text/calendar; charset=utf-8", "Content-Disposition": 'attachment; filename="meeting.ics"' },
  });
}
