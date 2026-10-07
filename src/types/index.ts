export type Project = {
  slug: string;
  name: string;
  company: string;
  category: string;
  period: string;
  summary: string;
  features: string[];
  stack: string[];
  role: string;
  glyph: string;
  hue: number; // drives the generated cover art
  links: { label: string; href: string }[];
};

export type Experience = {
  company: string;
  role: string;
  period: string;
  location: string;
  about: string;
  bullets: string[];
  stack: string[];
};

export type Technology = {
  id: string;
  name: string;
  category: "Frontend" | "Mobile" | "State" | "Backend & Tools" | "AI & Testing";
  short: string;
  why: string;
  install: string[];
  docs: string;
  video: string;
  usedAt: string[];
};
