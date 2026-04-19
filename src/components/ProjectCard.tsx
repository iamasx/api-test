"use client";

import { Button } from "@/components/ui/Button";
import type { Project } from "@/types/project";

interface ProjectCardProps {
  readonly project: Project;
  readonly onTagClick: (tech: string) => void;
  readonly onOpenModal: (project: Project) => void;
}

export function ProjectCard({ project, onTagClick, onOpenModal }: ProjectCardProps) {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-[1.75rem] border border-line bg-surface/90 shadow-card transition duration-300 hover:-translate-y-1 hover:border-brand/25">
      <button
        type="button"
        onClick={() => onOpenModal(project)}
        className="relative flex h-48 items-end overflow-hidden bg-gradient-to-br from-brand-soft via-transparent to-accent-soft px-5 py-5 text-left"
      >
        <span className="absolute inset-0 bg-mesh-glow opacity-90" />
        <span className="absolute left-5 top-5 rounded-full border border-line bg-surface/85 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.22em] text-muted">
          {project.category}
        </span>
        <span className="relative max-w-[15rem] font-mono text-xs uppercase tracking-[0.24em] text-muted">
          {project.imageAlt}
        </span>
      </button>

      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <div className="mb-3">
          <h3 className="text-xl font-semibold tracking-tight text-text">{project.title}</h3>
        </div>

        <p className="mb-4 text-sm leading-7 text-muted">{project.description}</p>

        <p className="mb-4 font-mono text-[11px] uppercase tracking-[0.22em] text-brand">
          {project.stats}
        </p>

        <div className="mb-5 flex flex-wrap gap-2">
          {project.techStack.map((tech) => (
            <button
              key={tech}
              onClick={(e) => {
                e.stopPropagation();
                onTagClick(tech);
              }}
              type="button"
              className="rounded-full border border-line bg-canvas/70 px-3 py-1 text-xs font-medium text-muted transition duration-200 hover:border-brand/25 hover:bg-brand-soft/55 hover:text-brand-strong"
            >
              {tech}
            </button>
          ))}
        </div>

        <div className="mt-auto flex flex-wrap items-center gap-3">
          <Button className="flex-1 sm:flex-none" href={project.githubUrl} size="sm" variant="secondary">
            GitHub
          </Button>
          {project.liveUrl && (
            <Button className="flex-1 sm:flex-none" href={project.liveUrl} size="sm">
              Live Demo
            </Button>
          )}
          <button
            onClick={() => onOpenModal(project)}
            type="button"
            className="text-sm font-medium text-muted transition duration-200 hover:text-brand-strong"
          >
            Details
          </button>
        </div>
      </div>
    </article>
  );
}
