"use client";
import { useEffect, type ReactNode } from "react";

export function Drawer({ open, onClose, title, children }: { open: boolean; onClose: () => void; title: string; children: ReactNode }) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => { document.removeEventListener("keydown", onKey); document.body.style.overflow = ""; };
  }, [open, onClose]);
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50" role="dialog" aria-modal="true" aria-label={title}>
      <button aria-label="Close" onClick={onClose} className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
      <aside className="rise absolute right-0 top-0 h-full w-full max-w-lg overflow-y-auto border-l border-brand/40 bg-bg-sunken p-8 shadow-glow">
        <button onClick={onClose} className="mb-6 font-mono text-sm text-fg-muted hover:text-brand">&lt;/close&gt; esc</button>
        {children}
      </aside>
    </div>
  );
}
