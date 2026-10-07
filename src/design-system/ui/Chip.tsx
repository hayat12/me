import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
export const Chip = ({ children, active, className }: { children: ReactNode; active?: boolean; className?: string }) => (
  <span className={cn("inline-flex items-center rounded-pill border px-3 py-1 text-xs font-medium",
    active ? "border-brand bg-brand-soft text-brand" : "border-white/10 text-fg-muted", className)}>{children}</span>
);
