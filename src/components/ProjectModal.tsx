"use client";

import { useEffect, useEffectEvent, useRef } from "react";
import { Button } from "@/components/ui/Button";
import type { Project } from "@/types/project";

interface ProjectModalProps {
  readonly project: Project | null;
  readonly onClose: () => void;
}

export function ProjectModal({ project, onClose }: ProjectModalProps) {
  const overlayRef = useRef<HTMLDivElement>(null);

  const handleEscapeKey = useEffectEvent((event: KeyboardEvent) => {
    if (event.key === "Escape") onClose();
  });

  useEffect(() => {
    if (!project) return;

    const handleKeyDown = (event: KeyboardEvent) => handleEscapeKey(event);

    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [project]);

  if (!project) return null;

  return (
    <div
      ref={overlayRef}
      onClick={(event) => {
        if (event.target === overlayRef.current) onClose();
      }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-canvas/65 p-4 backdrop-blur-md animate-fade-up sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-label={`${project.title} project details`}
    >
      <div className="relative max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-[2rem] border border-line bg-surface/95 p-6 shadow-card sm:p-8 max-sm:max-h-full max-sm:rounded-none">
        <button
          aria-label="Close modal"
          className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full border border-line bg-surface/90 text-muted transition duration-200 hover:border-brand/25 hover:bg-brand-soft/55 hover:text-brand-strong"
          onClick={onClose}
          type="button"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path
              d="M4 4l8 8M12 4l-8 8"
              stroke="currentColor"
              strokeLinecap="round"
              strokeWidth="2"
            />
          </svg>
        </button>

        <div className="mb-4 flex flex-wrap items-center gap-3 pr-12">
          <h2 className="text-display font-semibold tracking-tight text-text">{project.title}</h2>
          <span className="rounded-full border border-line bg-brand-soft px-3 py-1 text-xs font-medium text-brand-strong">
            {project.category}
          </span>
        </div>

        <p className="mb-6 font-mono text-[11px] uppercase tracking-[0.22em] text-brand">
          {project.stats}
        </p>

        <p className="mb-8 leading-8 text-muted">{project.fullDescription}</p>

        <div className="mb-6">
          <h3 className="mb-3 font-mono text-xs font-medium uppercase tracking-[0.28em] text-brand">
            Features
          </h3>
          <ul className="space-y-3">
            {project.features.map((feature) => (
              <li key={feature} className="flex items-start gap-3 text-sm leading-7 text-muted">
                <span className="mt-2 h-2 w-2 flex-shrink-0 rounded-full bg-brand" />
                {feature}
              </li>
            ))}
          </ul>
        </div>

        <div className="mb-6">
          <h3 className="mb-3 font-mono text-xs font-medium uppercase tracking-[0.28em] text-brand">
            Tech Stack
          </h3>
          <div className="flex flex-wrap gap-2">
            {project.techStack.map((tech) => (
              <span
                key={tech}
                className="rounded-full border border-line bg-canvas/70 px-3 py-1 text-xs font-medium text-muted"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        <div className="mb-6">
          <h3 className="mb-3 font-mono text-xs font-medium uppercase tracking-[0.28em] text-brand">
            Challenges
          </h3>
          <p className="rounded-[1.5rem] border border-line bg-canvas/70 p-4 text-sm leading-7 text-muted">
            {project.challenges}
          </p>
        </div>

        <div className="flex flex-wrap gap-3 border-t border-line pt-6">
          <Button href={project.githubUrl}>View on GitHub</Button>
          {project.liveUrl ? <Button href={project.liveUrl} variant="secondary">Live Demo</Button> : null}
          <Button onClick={onClose} variant="ghost">
            Close
          </Button>
        </div>
      </div>
    </div>
  );
}
