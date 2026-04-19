"use client";

import { useMemo, useState } from "react";
import type { FilterCategory, Project } from "@/types/project";
import { projects } from "@/data/projects";
import { FilterBar } from "@/components/FilterBar";
import { ProjectCard } from "@/components/ProjectCard";
import { ProjectModal } from "@/components/ProjectModal";

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

  return (
    <section className="w-full">
      <div className="mb-8 text-center">
        <h2
          id="projects-title"
          className="mb-2 text-3xl font-bold tracking-tight text-[var(--foreground)]"
        >
          Projects
        </h2>
        <p className="text-[var(--muted)]">
          A selection of projects I&apos;ve built and contributed to
        </p>
      </div>

      <FilterBar
        activeCategory={activeCategory}
        activeTech={activeTech}
        allTechs={allTechs}
        onCategoryChange={setActiveCategory}
        onTechChange={setActiveTech}
      />

      <div className="grid grid-cols-1 gap-6 transition-all duration-300 sm:grid-cols-2 lg:grid-cols-3">
        {filteredProjects.map((project) => (
          <ProjectCard
            key={project.id}
            project={project}
            onTagClick={handleTagClick}
            onOpenModal={setSelectedProject}
          />
        ))}
      </div>

      {filteredProjects.length === 0 && (
        <p className="py-12 text-center text-zinc-500 dark:text-zinc-400">
          No projects match the selected filter.
        </p>
      )}

      <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
    </section>
  );
}
