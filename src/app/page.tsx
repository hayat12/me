import { Hero } from "@/features/home/Hero";
import { ProjectsSection } from "@/features/projects/ProjectsSection";
import { TechSection } from "@/features/technologies/TechSection";
import { About } from "@/features/home/About";
import { Contact } from "@/features/home/Contact";

export default function Home() {
  return (
    <>
      <Hero />
      <ProjectsSection />
      <TechSection />
      <About />
      <Contact />
    </>
  );
}
