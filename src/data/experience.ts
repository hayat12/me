import type { Experience } from "@/types";

export const experience: Experience[] = [
  {
    company: "Staffery GmbH",
    role: "Senior Software Developer",
    period: "Jun 2026 – Present",
    location: "Berlin, DE",
    about:
      "Berlin recruiting-tech company building AI-driven products for job ads, social recruiting campaigns and candidate scheduling (Jobtimizer+, Autopilot, Meet2Hire).",
    bullets: [
      "Designed and built the customer User Portal and the Staffery branding website with Next.js in an Nx monorepo.",
      "Integrated Claude MCP to automate Figma and monorepo development workflows.",
      "Built core features for Jobtimizer, Staffery's AI-powered job-ad optimisation platform.",
    ],
    stack: ["Next.js", "TypeScript", "Zustand", "Nx", "Tailwind CSS", "Claude MCP"],
  },
  {
    company: "NRICH",
    role: "Frontend Developer",
    period: "Oct 2025 – Dec 2025",
    location: "Remote",
    about: "All-in-one after-school program platform for sports, clubs and classes.",
    bullets: [
      "Built scheduling, enrolment and payment flows for program owners and parents.",
      "Implemented booking and roster management with real-time updates.",
    ],
    stack: ["Angular", "NgRx", "RxJS", "SignalR"],
  },
  {
    company: "Freight Mark Express (FMX)",
    role: "Senior Frontend Developer",
    period: "Aug 2020 – Jan 2026",
    location: "Shah Alam, MY",
    about:
      "Malaysian integrated logistics and express-delivery provider (founded 2009) with offices across Malaysia, Singapore, Thailand, Vietnam and Indonesia.",
    bullets: [
      "Built and maintained enterprise web and mobile apps for shipping, warehouse and e-commerce with Angular, React, Flutter, TypeScript and PHP.",
      "Designed scalable architecture on REST APIs; improved performance via state management, change detection and component design.",
      "Introduced unit and E2E testing (Jasmine, Karma, Cypress) and regular code reviews — fewer bugs, calmer releases.",
      "Mentored junior developers.",
    ],
    stack: ["Angular", "React", "Flutter", "NgRx", "RxJS", "PHP", "MySQL", "Cypress"],
  },
  {
    company: "Oceanlead Sdn Bhd",
    role: "Frontend Developer",
    period: "Jun 2018 – Aug 2020",
    location: "Malaysia",
    about: "Web and mobile product work in an Agile team.",
    bullets: [
      "Built responsive Angular applications and React Native mobile solutions.",
      "Integrated REST APIs with backend developers; improved frontend performance.",
    ],
    stack: ["Angular", "React Native", "JavaScript", "REST"],
  },
  {
    company: "NizTheWiz Sdn Bhd",
    role: "Full-Stack Developer",
    period: "Jun 2017 – Jun 2018",
    location: "Malaysia",
    about: "Door-to-door delivery platform.",
    bullets: [
      "Built full-stack apps with PHP, JavaScript, MySQL and jQuery.",
      "Shipped Ionic mobile apps backed by REST APIs and core-PHP backends.",
    ],
    stack: ["PHP", "MySQL", "jQuery", "Ionic"],
  },
];
