"use client";

import { useEffect, useRef } from "react";
import type { Project } from "@/types/project";

interface ProjectModalProps {
  readonly project: Project | null;
  readonly onClose: () => void;
}

export function ProjectModal({ project, onClose }: ProjectModalProps) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!project) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [onClose, project]);

  if (!project) {
    return null;
  }

  return (
    <div
      ref={overlayRef}
      onClick={(e) => {
        if (e.target === overlayRef.current) {
          onClose();
        }
      }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-[rgba(20,32,51,0.45)] p-4 backdrop-blur-md sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-label={`${project.title} project details`}
    >
      <div className="glass-panel relative max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-[2rem] border border-[rgba(255,255,255,0.6)] p-6 shadow-[0_32px_90px_rgba(20,32,51,0.28)] sm:p-8">
        <button
          ref={closeButtonRef}
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full border border-[rgba(20,32,51,0.08)] bg-white/90 text-[var(--muted)]"
          aria-label="Close modal"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path
              d="M4 4l8 8M12 4l-8 8"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </button>

        <div className="mb-4 flex items-center gap-3 pr-10">
          <h2 className="text-3xl font-semibold tracking-[-0.05em] text-[var(--ink)]">
            {project.title}
          </h2>
          <span className="rounded-full border border-[rgba(20,32,51,0.08)] bg-white/85 px-3 py-1 text-xs font-semibold uppercase tracking-[0.22em] text-[var(--muted)]">
            {project.category}
          </span>
        </div>

        <p className="mb-6 text-xs font-semibold uppercase tracking-[0.28em] text-[var(--accent)]">
          {project.stats}
        </p>

        <p className="mb-8 max-w-3xl text-base leading-8 text-[var(--muted)]">
          {project.fullDescription}
        </p>

        <div className="mb-8 grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
          <div>
            <h3 className="mb-3 text-sm font-semibold uppercase tracking-[0.28em] text-[var(--muted)]">
              Challenges
            </h3>
            <p className="text-sm leading-7 text-[var(--muted)]">{project.challenges}</p>
          </div>

          <div>
            <h3 className="mb-3 text-sm font-semibold uppercase tracking-[0.28em] text-[var(--muted)]">
              Tech Stack
            </h3>
            <div className="flex flex-wrap gap-2">
              {project.techStack.map((tech) => (
                <span
                  key={tech}
                  className="rounded-full border border-[rgba(15,118,110,0.14)] bg-[rgba(15,118,110,0.08)] px-3 py-1 text-xs font-medium text-[var(--accent)]"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="mb-8">
          <h3 className="mb-3 text-sm font-semibold uppercase tracking-[0.28em] text-[var(--muted)]">
            Features
          </h3>
          <ul className="grid gap-3 md:grid-cols-2">
            {project.features.map((feature) => (
              <li
                key={feature}
                className="flex items-start gap-3 rounded-[1.25rem] border border-[rgba(20,32,51,0.06)] bg-white/70 px-4 py-3 text-sm leading-7 text-[var(--muted)]"
              >
                <span className="mt-2 h-2 w-2 flex-shrink-0 rounded-full bg-[var(--accent)]" />
                {feature}
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-wrap gap-4 border-t border-[rgba(20,32,51,0.08)] pt-6">
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full bg-[var(--ink)] px-5 py-2.5 text-sm font-medium text-white"
          >
            View on GitHub
          </a>
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border border-[var(--border)] bg-white/75 px-5 py-2.5 text-sm font-medium text-[var(--ink)]"
            >
              Live Demo
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
