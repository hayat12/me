import { profile } from "@/data/profile";
import { Button } from "@/design-system/ui";
import { SectionHeading } from "./SectionHeading";

export function Contact() {
  return (
    <section id="contact" className="px-6 py-24 md:px-28">
      <SectionHeading tag="contact" title="Let's work together" lead={`${profile.availability} · ${profile.location}`} />
      <div className="flex flex-wrap items-center gap-6">
        <Button href="/appointment">Book a meeting</Button>
        <Button variant="outline" href={`mailto:${profile.email}`}>{profile.email}</Button>
        {profile.socials.map((s) => (
          <a key={s.label} href={s.href} target="_blank" rel="noreferrer" className="text-sm font-semibold text-fg-muted hover:text-brand">{s.label} ↗</a>
        ))}
      </div>
      <p className="mt-24 text-xs text-fg-subtle">© {new Date().getFullYear()} {profile.name}</p>
    </section>
  );
}
