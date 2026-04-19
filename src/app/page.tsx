import { AboutOverviewSection } from "@/components/AboutOverviewSection";
import { HeroSection } from "@/components/HeroSection";
import { ProjectsSection } from "@/components/ProjectsSection";
import { SkillsSection } from "@/components/SkillsSection";

export default function Home() {
  return (
    <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col gap-10 px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
      <HeroSection />
      <AboutOverviewSection />
      <SkillsSection />

      <section
        id="projects"
        aria-labelledby="projects-title"
        className="scroll-mt-24 rounded-[2rem] border border-black/8 bg-white/70 px-6 py-10 shadow-[0_24px_70px_rgba(31,26,23,0.06)] backdrop-blur md:px-8"
      >
        <ProjectsSection />
      </section>
    </main>
  );
}
