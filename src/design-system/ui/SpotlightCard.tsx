"use client";
import type { ReactNode, MouseEvent } from "react";
import { cn } from "@/lib/cn";

/** Card with a cursor-following green spotlight. */
export function SpotlightCard({ children, className }: { children: ReactNode; className?: string }) {
  const move = (e: MouseEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
    e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
  };
  return (
    <div onMouseMove={move} className={cn("group relative overflow-hidden rounded-card border border-white/10 bg-bg-raised shadow-card transition duration-300 hover:border-brand/60", className)}>
      <div className="spotlight pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      <div className="relative">{children}</div>
    </div>
  );
}
