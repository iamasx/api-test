"use client";

import { useMemo, useState } from "react";
import { FilterBar } from "@/components/FilterBar";
import { ProjectCard } from "@/components/ProjectCard";
import { ProjectModal } from "@/components/ProjectModal";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { projects } from "@/data/projects";
import type { FilterCategory, Project } from "@/types/project";

export function ProjectsSection() {
  const [activeCategory, setActiveCategory] = useState<FilterCategory>("All");
  const [activeTech, setActiveTech] = useState<string | null>(null);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const allTechs = useMemo(() => {
    const techSet = new Set<string>();
    for (const project of projects) {
      for (const tech of project.techStack) {
        techSet.add(tech);
      }
    }
    return Array.from(techSet).sort();
  }, []);

  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      if (activeTech) {
        return project.techStack.includes(activeTech);
      }
      if (activeCategory === "All") return true;
      return project.category === activeCategory;
    });
  }, [activeCategory, activeTech]);

  const handleTagClick = (tech: string) => {
    setActiveTech(activeTech === tech ? null : tech);
    setActiveCategory("All");
  };

  const activeLabel = activeTech ?? activeCategory;

  return (
    <section className="scroll-mt-24 py-14 sm:py-20" id="projects">
      <Container className="space-y-8">
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_18rem] lg:items-end">
          <SectionHeading
            description="A selection of products, tools, and platform work spanning frontend systems, backend services, and open-source experiments."
            eyebrow="Selected Work"
            title="Projects shaped by performance, developer experience, and durable product thinking."
          />

          <div className="rounded-[1.75rem] border border-line bg-surface/85 p-5 shadow-card">
            <p className="font-mono text-xs uppercase tracking-[0.28em] text-brand">Active view</p>
            <p className="mt-3 text-3xl font-semibold tracking-tight text-text">
              {filteredProjects.length}
            </p>
            <p className="mt-2 text-sm leading-7 text-muted">
              {activeLabel === "All"
                ? "Showing the full portfolio selection."
                : `Filtered for ${activeLabel}.`}
            </p>
          </div>
        </div>

        <FilterBar
          activeCategory={activeCategory}
          activeTech={activeTech}
          allTechs={allTechs}
          onCategoryChange={setActiveCategory}
          onTechChange={setActiveTech}
        />

        <div className="grid grid-cols-1 gap-6 transition-all duration-300 sm:grid-cols-2 xl:grid-cols-3">
          {filteredProjects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onTagClick={handleTagClick}
              onOpenModal={setSelectedProject}
            />
          ))}
        </div>

        {filteredProjects.length === 0 ? (
          <div className="rounded-[1.75rem] border border-dashed border-line bg-surface/70 px-6 py-12 text-center text-sm text-muted">
            No projects match the selected filter.
          </div>
        ) : null}

        <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
      </Container>
    </section>
  );
}
