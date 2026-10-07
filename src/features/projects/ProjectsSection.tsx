import Link from "next/link";
import { projects } from "@/data/projects";
import { Chip, SpotlightCard } from "@/design-system/ui";
import { SectionHeading } from "@/features/home/SectionHeading";
import { ProjectCover } from "./ProjectCover";

export function ProjectsSection() {
  return (
    <section id="projects" className="px-6 py-24 md:px-28">
      <SectionHeading tag="projects" title="Featured projects" lead="Products I've built across recruiting-tech, logistics, e-commerce and education — open one for the full feature breakdown." />
      <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3 md:pr-20">
        {projects.map((p) => (
          <Link key={p.slug} href={`/projects/${p.slug}`} className="block">
            <SpotlightCard className="h-full">
              <ProjectCover project={p} />
              <div className="p-6">
                <p className="font-mono text-xs text-brand">{p.category}</p>
                <h3 className="mt-1 text-xl font-semibold">{p.name}</h3>
                <p className="mt-2 line-clamp-3 text-sm text-fg-muted">{p.summary}</p>
                <div className="mt-4 flex flex-wrap gap-2">{p.stack.slice(0, 4).map((s) => <Chip key={s}>{s}</Chip>)}</div>
              </div>
            </SpotlightCard>
          </Link>
        ))}
      </div>
    </section>
  );
}
