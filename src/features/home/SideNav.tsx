"use client";
import { useEffect, useState } from "react";
import { cn } from "@/lib/cn";

// Section order matches the vertical pill in the design: chat / grid / info / contact.
const items = [
  { id: "home", label: "Home", d: "M3 11l9-8 9 8v10a1 1 0 0 1-1 1h-5v-7H9v7H4a1 1 0 0 1-1-1z" },
  { id: "projects", label: "Projects", d: "M3 3h8v8H3zM13 3h8v8h-8zM3 13h8v8H3zM13 13h8v8h-8z" },
  { id: "about", label: "About", d: "M12 8h.01M11 12h1v5h1M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20z" },
  { id: "contact", label: "Contact", d: "M4 4h16v16H4zM12 11a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5zM7 18c1-3 9-3 10 0" },
];

/** Vertical pill navigation from the design; scroll-synced via IntersectionObserver. */
export function SideNav() {
  const [active, setActive] = useState("home");
  useEffect(() => {
    const io = new IntersectionObserver(
      (es) => es.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: "-45% 0px -45% 0px" },
    );
    items.forEach((i) => { const el = document.getElementById(i.id); if (el) io.observe(el); });
    return () => io.disconnect();
  }, []);
  return (
    <nav aria-label="Sections" className="fixed right-6 top-1/2 z-40 hidden -translate-y-1/2 flex-col items-center gap-6 rounded-pill border border-brand/60 px-2 py-10 md:flex">
      {items.map((i) => (
        <a key={i.id} href={`#${i.id}`} aria-label={i.label} aria-current={active === i.id} title={i.label}
          className={cn("grid size-10 place-items-center rounded-full border transition duration-300",
            active === i.id ? "border-brand bg-brand text-bg-sunken shadow-glow" : "border-brand/70 text-brand hover:bg-brand-soft")}>
          <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d={i.d} /></svg>
        </a>
      ))}
    </nav>
  );
}
