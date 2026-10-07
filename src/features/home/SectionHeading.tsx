import { CodeTag } from "@/design-system/ui";
export const SectionHeading = ({ tag, title, lead }: { tag: string; title: string; lead?: string }) => (
  <header className="mb-12">
    <CodeTag>&lt;{tag}&gt;</CodeTag>
    <h2 className="mt-2 text-3xl font-bold md:text-4xl">{title}</h2>
    {lead && <p className="mt-3 max-w-2xl text-fg-muted">{lead}</p>}
  </header>
);
