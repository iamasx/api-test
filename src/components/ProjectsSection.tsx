"use client";

import dynamic from "next/dynamic";
import { useMemo, useState } from "react";
import type { FilterCategory, Project } from "@/types/project";
import { projects } from "@/data/projects";
import { FilterBar } from "@/components/FilterBar";
import { ProjectCard } from "@/components/ProjectCard";

const ProjectModal = dynamic(
  () => import("@/components/ProjectModal").then((module) => module.ProjectModal),
  {
    loading: () => null,
  },
);

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
    <div className="glass-panel soft-grid overflow-hidden rounded-[2rem] border border-[var(--border)] px-6 py-8 shadow-[var(--shadow)] md:px-8">
      <div className="mb-8 max-w-2xl">
        <p className="text-xs font-semibold uppercase tracking-[0.32em] text-[var(--accent)]">
          Projects
        </p>
        <h2 className="mt-3 text-3xl font-semibold tracking-[-0.05em] text-[var(--ink)] sm:text-4xl">
          Selected systems and interfaces
        </h2>
        <p className="mt-4 text-base leading-8 text-[var(--muted)]">
          A cross-section of product engineering work spanning collaborative tools,
          backend platforms, and UI-heavy applications.
        </p>
      </div>

      <FilterBar
        activeCategory={activeCategory}
        activeTech={activeTech}
        allTechs={allTechs}
        onCategoryChange={setActiveCategory}
        onTechChange={setActiveTech}
      />

      <div className="grid grid-cols-1 gap-5 transition-all duration-300 md:grid-cols-2 xl:grid-cols-3">
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
        <p className="py-12 text-center text-[var(--muted)]">
          No projects match the selected filter.
        </p>
      )}

      <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
    </div>
  );
}
