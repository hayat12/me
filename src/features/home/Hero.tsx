import { Button, CodeTag } from "@/design-system/ui";
import { profile } from "@/data/profile";
import { TypedHeading } from "./TypedHeading";

export function Hero() {
  return (
    <section id="home" className="flex min-h-screen flex-col justify-center px-6 pb-16 pt-32 md:px-28">
      <div className="max-w-4xl">
        <CodeTag>&lt;h1&gt;</CodeTag>
        <div className="my-3 pl-6 md:pl-12">
          <CodeTag>&lt;span&gt;</CodeTag>
          <div className="my-4 pl-6 md:pl-14">
            <TypedHeading lines={[`Hey I'm ${profile.name},`, profile.title]} />
          </div>
          <CodeTag>&lt;/span&gt;</CodeTag>
        </div>
        <CodeTag>&lt;/h1&gt;</CodeTag>

        <div className="mt-10">
          <CodeTag>&lt;p&gt;</CodeTag>
          <p className="max-w-2xl py-2 pl-6 text-base text-fg md:text-lg">
            {profile.tagline} Scroll down to see my work — or book a meeting and let&apos;s talk.
          </p>
          <CodeTag>&lt;/p&gt;</CodeTag>
        </div>
      </div>

      <div className="rise mt-16 flex flex-wrap gap-6" style={{ animationDelay: "1.2s" }}>
        <Button variant="outline" href="/appointment">Book a meeting</Button>
        <Button variant="solid" href="/#projects">My Works</Button>
      </div>

      <dl className="mt-20 flex gap-10 md:gap-16">
        {profile.stats.map((s) => (
          <div key={s.label}>
            <dt className="sr-only">{s.label}</dt>
            <dd className="font-mono text-3xl font-bold text-brand">{s.value}</dd>
            <p className="text-xs uppercase tracking-wide text-fg-subtle">{s.label}</p>
          </div>
        ))}
      </dl>
    </section>
  );
}
