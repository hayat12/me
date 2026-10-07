import { promises as fs } from "node:fs";
import path from "node:path";
import { randomUUID } from "node:crypto";
import type { Appointment, AppointmentInput } from "./validation";

/**
 * Repository interface — swap FileRepository for Postgres/Supabase/etc.
 * without touching route handlers (see README → Scaling).
 */
export interface AppointmentRepository {
  bookedTimes(date: string): Promise<string[]>;
  get(id: string): Promise<Appointment | null>;
  /** Atomically creates the appointment; returns null if the slot is already taken. */
  create(input: AppointmentInput): Promise<Appointment | null>;
}

const FILE = path.join(process.cwd(), ".data", "appointments.json");
let queue: Promise<unknown> = Promise.resolve();
const locked = <T,>(fn: () => Promise<T>): Promise<T> => {
  const run = queue.then(fn, fn);
  queue = run.catch(() => undefined);
  return run;
};

async function read(): Promise<Appointment[]> {
  try { return JSON.parse(await fs.readFile(FILE, "utf8")); } catch { return []; }
}

export const fileRepository: AppointmentRepository = {
  async bookedTimes(date) {
    return (await read()).filter((a) => a.date === date).map((a) => a.time);
  },
  async get(id) {
    return (await read()).find((a) => a.id === id) ?? null;
  },
  create(input) {
    return locked(async () => {
      const all = await read();
      if (all.some((a) => a.date === input.date && a.time === input.time)) return null;
      const appt: Appointment = { ...input, id: randomUUID(), createdAt: new Date().toISOString() };
      await fs.mkdir(path.dirname(FILE), { recursive: true });
      await fs.writeFile(FILE, JSON.stringify([...all, appt], null, 2));
      return appt;
    });
  },
};

export const appointments: AppointmentRepository = fileRepository;
