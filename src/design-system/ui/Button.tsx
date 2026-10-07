import Link from "next/link";
import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/cn";

type Props = { variant?: "solid" | "outline" | "ghost"; href?: string; children: ReactNode; className?: string } & ButtonHTMLAttributes<HTMLButtonElement>;

const base =
  "inline-flex items-center justify-center gap-2 rounded-pill px-8 h-12 text-sm font-semibold transition duration-300 ease-out disabled:opacity-50 disabled:pointer-events-none";
const variants = {
  solid: "bg-brand text-bg-sunken hover:bg-brand-strong hover:shadow-glow",
  outline: "border border-brand text-fg hover:bg-brand-soft hover:shadow-glow",
  ghost: "text-fg-muted hover:text-brand",
};

export function Button({ variant = "solid", href, className, children, ...rest }: Props) {
  const cls = cn(base, variants[variant], className);
  if (href) return <Link href={href} className={cls}>{children}</Link>;
  return <button className={cls} {...rest}>{children}</button>;
}
