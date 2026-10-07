"use client";
import { useState } from "react";
import { technologies } from "@/data/technologies";
import type { Technology } from "@/types";
import { Chip, Drawer } from "@/design-system/ui";
import { SectionHeading } from "@/features/home/SectionHeading";
import { TerminalClip } from "./TerminalClip";

const categories = [...new Set(technologies.map((t) => t.category))];

export function TechSection() {
  const [sel, setSel] = useState<Technology | null>(null);
  return (
    <section id="skills" className="px-6 py-24 md:px-28">
      <SectionHeading tag="stack" title="Technical expertise" lead="Click any technology for a quick intro, how to set it up, and a replayable terminal clip." />
      <div className="space-y-10 md:pr-20">
        {categories.map((c) => (
          <div key={c}>
            <h3 className="mb-4 font-mono text-sm text-fg-subtle">{c}</h3>
            <div className="flex flex-wrap gap-3">
              {technologies.filter((t) => t.category === c).map((t) => (
                <button key={t.id} onClick={() => setSel(t)}
                  className="group flex items-center gap-3 rounded-pill border border-white/10 bg-bg-raised py-2 pl-2 pr-5 text-sm font-semibold transition duration-300 hover:border-brand hover:shadow-glow">
                  <span className="grid size-9 place-items-center rounded-full bg-brand-soft font-mono text-xs text-brand transition group-hover:bg-brand group-hover:text-bg-sunken">{t.name.slice(0, 2)}</span>
                  {t.name}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      <Drawer open={!!sel} onClose={() => setSel(null)} title={sel?.name ?? ""}>
        {sel && (
          <div className="space-y-6">
            <div>
              <p className="code-tag">&lt;{sel.category.toLowerCase()}&gt;</p>
              <h3 className="mt-1 text-3xl font-bold">{sel.name}</h3>
              <p className="mt-3 text-fg-muted">{sel.short}</p>
              <p className="mt-3 text-sm text-fg"><span className="text-brand">In my work: </span>{sel.why}</p>
              <div className="mt-3 flex flex-wrap gap-2">{sel.usedAt.map((u) => <Chip key={u} active>{u}</Chip>)}</div>
            </div>
            <div>
              <h4 className="mb-2 font-mono text-sm text-fg-subtle">Setup / install</h4>
              <TerminalClip key={sel.id} lines={sel.install} />
            </div>
            <div className="flex flex-wrap gap-4 text-sm font-semibold">
              <a href={sel.docs} target="_blank" rel="noreferrer" className="text-brand hover:underline">Official docs ↗</a>
              <a href={sel.video} target="_blank" rel="noreferrer" className="text-accent hover:underline">Watch tutorials ↗</a>
            </div>
          </div>
        )}
      </Drawer>
    </section>
  );
}
