import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProject, projects } from "@/data/projects";
import { Button, Chip } from "@/design-system/ui";
import { ProjectCover } from "@/features/projects/ProjectCover";

type Params = { params: Promise<{ slug: string }> };

export const generateStaticParams = () => projects.map((p) => ({ slug: p.slug }));

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const p = getProject((await params).slug);
  return p ? { title: p.name, description: p.summary } : {};
}

export default async function ProjectPage({ params }: Params) {
  const p = getProject((await params).slug);
  if (!p) notFound();
  return (
    <article className="mx-auto max-w-4xl px-6 pb-24 pt-32">
      <Link href="/#projects" className="font-mono text-sm text-fg-muted hover:text-brand">← all projects</Link>
      <ProjectCover project={p} className="mt-6 rounded-card" />
      <p className="code-tag mt-8">&lt;{p.category.toLowerCase()}&gt;</p>
      <h1 className="mt-1 text-4xl font-bold">{p.name}</h1>
      <p className="mt-1 text-sm text-fg-subtle">{p.company} · {p.role} · {p.period}</p>
      <p className="mt-6 text-lg text-fg-muted">{p.summary}</p>
      <h2 className="mt-10 font-mono text-sm text-brand">Key features</h2>
      <ul className="mt-3 grid gap-3 md:grid-cols-2">
        {p.features.map((f) => <li key={f} className="rounded-xl border border-white/10 bg-bg-raised p-4 text-sm">{f}</li>)}
      </ul>
      <div className="mt-8 flex flex-wrap gap-2">{p.stack.map((s) => <Chip key={s} active>{s}</Chip>)}</div>
      <div className="mt-10 flex flex-wrap gap-4">
        {p.links.map((l) => <Button key={l.href} variant="outline" href={l.href}>{l.label} ↗</Button>)}
        <Button href="/appointment">Book a meeting</Button>
      </div>
    </article>
  );
}
