"use client";

import type { Project } from "@/types/project";

interface ProjectCardProps {
  readonly project: Project;
  readonly onTagClick: (tech: string) => void;
  readonly onOpenModal: (project: Project) => void;
}

export function ProjectCard({ project, onTagClick, onOpenModal }: ProjectCardProps) {
  return (
    <div className="group flex flex-col overflow-hidden rounded-xl border border-zinc-200 bg-white transition-shadow hover:shadow-lg dark:border-zinc-800 dark:bg-zinc-900">
      <button
        type="button"
        onClick={() => onOpenModal(project)}
        className="flex h-48 items-center justify-center bg-gradient-to-br from-zinc-100 to-zinc-200 text-sm text-zinc-400 dark:from-zinc-800 dark:to-zinc-900 dark:text-zinc-600"
      >
        {project.imageAlt}
      </button>

      <div className="flex flex-1 flex-col p-5">
        <div className="mb-2 flex items-center justify-between">
          <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
            {project.title}
          </h3>
          <span className="rounded-full bg-zinc-100 px-2.5 py-0.5 text-xs font-medium text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400">
            {project.category}
          </span>
        </div>

        <p className="mb-3 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
          {project.description}
        </p>

        <p className="mb-4 text-xs text-zinc-500 dark:text-zinc-500">{project.stats}</p>

        <div className="mb-4 flex flex-wrap gap-1.5">
          {project.techStack.map((tech) => (
            <button
              key={tech}
              onClick={(e) => {
                e.stopPropagation();
                onTagClick(tech);
              }}
              className="rounded-full bg-blue-50 px-2.5 py-0.5 text-xs font-medium text-blue-700 transition-colors hover:bg-blue-100 dark:bg-blue-900/30 dark:text-blue-300 dark:hover:bg-blue-900/50"
            >
              {tech}
            </button>
          ))}
        </div>

        <div className="mt-auto flex gap-3">
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-medium text-zinc-700 underline-offset-4 hover:underline dark:text-zinc-300"
          >
            GitHub
          </a>
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium text-blue-600 underline-offset-4 hover:underline dark:text-blue-400"
            >
              Live Demo
            </a>
          )}
          <button
            onClick={() => onOpenModal(project)}
            className="ml-auto text-sm font-medium text-zinc-500 underline-offset-4 hover:underline dark:text-zinc-400"
          >
            Details
          </button>
        </div>
      </div>
    </div>
  );
}
