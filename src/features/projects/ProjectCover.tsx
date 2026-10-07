import type { Project } from "@/types";

/** Generated cover art — replace with real screenshots by adding /public/images/projects/<slug>.png (see README). */
export function ProjectCover({ project, className = "" }: { project: Project; className?: string }) {
  const { hue, glyph } = project;
  return (
    <div
      role="img"
      aria-label={`${project.name} cover`}
      className={`relative grid aspect-[16/10] place-items-center overflow-hidden ${className}`}
      style={{ background: `linear-gradient(135deg, hsl(${hue} 55% 22%), hsl(${(hue + 40) % 360} 60% 10%))` }}
    >
      <div className="absolute inset-0 opacity-30" style={{ backgroundImage: "linear-gradient(rgba(255,255,255,.08) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.08) 1px,transparent 1px)", backgroundSize: "28px 28px" }} />
      <div className="absolute -right-10 -top-10 size-48 rounded-full blur-3xl" style={{ background: `hsl(${hue} 80% 55% / .35)` }} />
      <span className="relative font-mono text-5xl font-bold tracking-tight text-white/90 md:text-6xl">{glyph}</span>
      <span className="absolute bottom-3 left-4 font-mono text-[11px] uppercase tracking-widest text-white/60">{project.company}</span>
    </div>
  );
}
