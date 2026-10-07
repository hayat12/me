import Link from "next/link";

const links = [
  { href: "/#home", label: "Home" },
  { href: "/#projects", label: "Projects" },
  { href: "/#about", label: "About" },
  { href: "/#contact", label: "Contact" },
];

export function Header() {
  return (
    <header className="fixed inset-x-0 top-0 z-40 flex h-20 items-center justify-between bg-gradient-to-b from-bg to-transparent px-6 md:px-12">
      <Link href="/" className="font-mono text-2xl font-bold tracking-tight" aria-label="Hayat — home">
        <span className="text-fg-subtle">hr</span><span className="text-brand">&amp;</span><span className="text-accent">/&gt;</span>
      </Link>
      <nav aria-label="Primary" className="hidden gap-10 text-sm font-bold uppercase md:flex">
        {links.map((l) => (
          <Link key={l.href} href={l.href} className="transition hover:text-brand">{l.label}</Link>
        ))}
      </nav>
    </header>
  );
}
