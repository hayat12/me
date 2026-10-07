import { z } from "zod";

export const TOPICS = ["Job opportunity", "Freelance project", "Technical consultation", "Just say hi"] as const;

export const appointmentSchema = z.object({
  name: z.string().trim().min(2, "Please enter your name").max(80),
  email: z.string().trim().email("Enter a valid email").max(120),
  topic: z.enum(TOPICS),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Pick a date"),
  time: z.string().regex(/^\d{2}:\d{2}$/, "Pick a time"),
  message: z.string().trim().max(1000).optional().default(""),
});

export type AppointmentInput = z.infer<typeof appointmentSchema>;
export type Appointment = AppointmentInput & { id: string; createdAt: string };
