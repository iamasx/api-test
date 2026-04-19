"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import { skillItems } from "@/data/profile";

export function SkillsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const node = sectionRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.25,
      },
    );

    observer.observe(node);

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <section
      id="skills"
      ref={sectionRef}
      aria-labelledby="skills-title"
      className="scroll-mt-24 rounded-[2rem] border border-black/8 bg-white/70 px-6 py-10 shadow-[0_24px_70px_rgba(31,26,23,0.06)] backdrop-blur md:px-8"
    >
      <div className="mb-8 max-w-3xl">
        <p className="text-sm font-medium uppercase tracking-[0.3em] text-[var(--accent)]">
          Skills
        </p>
        <h2
          id="skills-title"
          className="mt-4 text-3xl font-semibold tracking-tight text-[var(--foreground)] sm:text-4xl"
        >
          A categorized stack with clear depth in each layer.
        </h2>
        <p className="mt-4 text-base leading-8 text-[var(--muted)]">
          I work across the full delivery surface, from interaction details in the UI to deployment
          pipelines and backend performance. The bars animate only once the section enters view.
        </p>
      </div>

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        {skillItems.map((skill, index) => (
          <article
            key={skill.category}
            className="rounded-[1.75rem] border border-black/8 bg-[var(--surface-strong)] p-6"
            style={
              {
                "--skill-accent": skill.accent,
                "--skill-accent-soft": skill.accentSoft,
              } as CSSProperties
            }
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs uppercase tracking-[0.28em] text-[var(--muted)]">
                  {skill.category}
                </p>
                <p className="mt-3 text-lg font-semibold text-[var(--foreground)]">
                  {skill.description}
                </p>
              </div>
              <span className="rounded-full px-3 py-1 text-sm font-semibold text-[var(--foreground)] skill-pill">
                {skill.proficiency}%
              </span>
            </div>

            <div className="mt-6">
              <div className="skill-bar">
                <span
                  className={`skill-bar-fill ${isVisible ? "is-visible" : ""}`}
                  style={
                    {
                      width: `${skill.proficiency}%`,
                      animationDelay: `${index * 120}ms`,
                      background: `linear-gradient(90deg, ${skill.accent}, ${skill.accent})`,
                    } as CSSProperties
                  }
                />
              </div>
            </div>

            <ul className="mt-6 flex flex-wrap gap-2">
              {skill.technologies.map((technology) => (
                <li
                  key={technology}
                  className="rounded-full px-3 py-1 text-xs font-medium text-[var(--foreground)] skill-chip"
                >
                  {technology}
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </section>
  );
}
