"use client";
import { useEffect, useState } from "react";

/** A self-playing "clip": types the install commands into a terminal window. Replayable. */
export function TerminalClip({ lines }: { lines: string[] }) {
  const [run, setRun] = useState(0);
  const [n, setN] = useState(0);
  const text = lines.map((l) => `$ ${l}`).join("\n");

  useEffect(() => {
    setN(0);
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return setN(text.length);
    const id = setInterval(() => setN((v) => (v >= text.length ? (clearInterval(id), v) : v + 1)), 28);
    return () => clearInterval(id);
  }, [run, text]);

  const done = n >= text.length;
  return (
    <figure className="overflow-hidden rounded-xl border border-white/10 bg-black/60">
      <figcaption className="flex items-center gap-2 border-b border-white/10 px-4 py-2">
        <span className="size-3 rounded-full bg-red-400/80" /><span className="size-3 rounded-full bg-yellow-300/80" /><span className="size-3 rounded-full bg-brand" />
        <span className="ml-2 font-mono text-xs text-fg-subtle">terminal — quick start</span>
        <button onClick={() => setRun((r) => r + 1)} className="ml-auto font-mono text-xs text-brand hover:underline">↻ replay</button>
      </figcaption>
      <pre className="min-h-32 overflow-x-auto p-4 font-mono text-sm leading-relaxed text-brand-strong" aria-label={lines.join(" then ")}>
        {text.slice(0, n)}{!done && <span className="caret">▍</span>}
      </pre>
      <div className="flex items-center justify-between border-t border-white/10 px-4 py-2">
        <span className="font-mono text-xs text-fg-subtle">{done ? "✓ done" : "running…"}</span>
        <button onClick={() => navigator.clipboard?.writeText(lines.join("\n"))} className="font-mono text-xs text-fg-muted hover:text-brand">copy commands</button>
      </div>
    </figure>
  );
}
