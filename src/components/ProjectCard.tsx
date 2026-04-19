"use client";

import type { Project } from "@/types/project";

interface ProjectCardProps {
  readonly project: Project;
  readonly onTagClick: (tech: string) => void;
  readonly onOpenModal: (project: Project) => void;
}

const categoryStyles: Record<Project["category"], string> = {
  Frontend:
    "from-[rgba(15,118,110,0.16)] via-white to-[rgba(34,211,238,0.14)] text-[#0f766e]",
  Backend:
    "from-[rgba(249,115,22,0.18)] via-white to-[rgba(251,191,36,0.16)] text-[#c2410c]",
  "Full Stack":
    "from-[rgba(99,102,241,0.16)] via-white to-[rgba(14,165,233,0.16)] text-[#4338ca]",
  DevOps:
    "from-[rgba(20,32,51,0.12)] via-white to-[rgba(15,118,110,0.16)] text-[#142033]",
};

export function ProjectCard({ project, onTagClick, onOpenModal }: ProjectCardProps) {
  const monogram = project.title
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2);

  return (
    <article className="group flex h-full flex-col rounded-[1.5rem] border border-[rgba(20,32,51,0.08)] bg-white/88 p-4 shadow-[0_18px_50px_rgba(20,32,51,0.08)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_28px_70px_rgba(20,32,51,0.14)]">
      <button
        type="button"
        onClick={() => onOpenModal(project)}
        aria-haspopup="dialog"
        className={`relative flex h-52 flex-col items-start justify-between overflow-hidden rounded-[1.25rem] border border-white/70 bg-gradient-to-br p-5 text-left ${categoryStyles[project.category]}`}
      >
        <span className="rounded-full bg-white/75 px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-[var(--muted)]">
          {project.category}
        </span>
        <div>
          <p className="text-5xl font-semibold tracking-[-0.08em]">{monogram}</p>
          <p className="mt-3 max-w-xs text-sm leading-6 text-[rgba(20,32,51,0.72)]">
            {project.imageAlt}
          </p>
        </div>
        <div className="absolute -right-8 -top-10 h-28 w-28 rounded-full border border-white/80 bg-white/60 blur-[1px]" />
      </button>

      <div className="flex flex-1 flex-col px-1 pt-5">
        <div className="mb-2 flex items-start justify-between gap-3">
          <h3 className="text-xl font-semibold tracking-[-0.03em] text-[var(--ink)]">
            {project.title}
          </h3>
          <span className="rounded-full border border-[rgba(20,32,51,0.08)] bg-[rgba(20,32,51,0.04)] px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--muted)]">
            {project.category}
          </span>
        </div>

        <p className="mb-3 text-sm leading-7 text-[var(--muted)]">
          {project.description}
        </p>

        <p className="mb-4 text-xs font-semibold uppercase tracking-[0.22em] text-[var(--accent)]">
          {project.stats}
        </p>

        <div className="mb-4 flex flex-wrap gap-1.5">
          {project.techStack.map((tech) => (
            <button
              key={tech}
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onTagClick(tech);
              }}
              className="rounded-full border border-[rgba(15,118,110,0.14)] bg-[rgba(15,118,110,0.08)] px-2.5 py-1 text-xs font-medium text-[var(--accent)]"
            >
              {tech}
            </button>
          ))}
        </div>

        <div className="mt-auto flex items-center gap-3">
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-medium text-[var(--ink)] underline-offset-4 hover:underline"
          >
            GitHub
          </a>
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium text-[var(--accent)] underline-offset-4 hover:underline"
            >
              Live Demo
            </a>
          )}
          <button
            type="button"
            onClick={() => onOpenModal(project)}
            className="ml-auto rounded-full border border-[rgba(20,32,51,0.08)] bg-white px-3 py-1.5 text-sm font-medium text-[var(--ink)]"
          >
            Open case study
          </button>
        </div>
      </div>
    </article>
  );
}
