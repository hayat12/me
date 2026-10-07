import { profile } from "@/data/profile";
import { experience } from "@/data/experience";
import { Chip } from "@/design-system/ui";
import { SectionHeading } from "./SectionHeading";

export function About() {
  return (
    <section id="about" className="px-6 py-24 md:px-28">
      <SectionHeading tag="about" title="Passionate developer, problem solver" lead={profile.summary} />
      <ol className="relative max-w-3xl border-l border-brand/40 pl-8">
        {experience.map((e) => (
          <li key={e.company} className="relative mb-12">
            <span className="absolute -left-[41px] top-1.5 size-4 rounded-full border-2 border-brand bg-bg" />
            <p className="font-mono text-xs text-brand">{e.period} · {e.location}</p>
            <h3 className="mt-1 text-xl font-semibold">{e.role} <span className="text-fg-muted">· {e.company}</span></h3>
            <p className="mt-2 text-sm text-fg-muted">{e.about}</p>
            <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-fg">
              {e.bullets.map((b) => <li key={b}>{b}</li>)}
            </ul>
            <div className="mt-4 flex flex-wrap gap-2">{e.stack.map((s) => <Chip key={s}>{s}</Chip>)}</div>
          </li>
        ))}
      </ol>
      <div className="mt-8 grid gap-8 text-sm text-fg-muted md:grid-cols-3">
        <div><p className="code-tag mb-2">&lt;education&gt;</p>{profile.education.degree}<br />{profile.education.school}<br />{profile.education.years}</div>
        <div><p className="code-tag mb-2">&lt;languages&gt;</p>{profile.languages.map((l) => <div key={l.name}>{l.name} — {l.level}</div>)}</div>
        <div><p className="code-tag mb-2">&lt;courses&gt;</p>{profile.courses.map((c) => <div key={c}>{c}</div>)}</div>
      </div>
    </section>
  );
}
