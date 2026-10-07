"use client";
import { useEffect, useState } from "react";

export function TypedHeading({ lines }: { lines: string[] }) {
  const full = lines.join("\n");
  const [n, setN] = useState(0);
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return setN(full.length);
    if (n >= full.length) return;
    const t = setTimeout(() => setN(n + 1), 38);
    return () => clearTimeout(t);
  }, [n, full]);
  const shown = full.slice(0, n).split("\n");
  return (
    <h1 className="text-4xl font-bold leading-tight text-fg md:text-6xl" aria-label={lines.join(" ")}>
      {shown.map((l, i) => (
        <span key={i} className="block" aria-hidden="true">
          {l}{i === shown.length - 1 && <span className="caret ml-1 inline-block h-[0.9em] w-[3px] translate-y-1 bg-brand" />}
        </span>
      ))}
    </h1>
  );
}
