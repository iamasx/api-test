"use client";

import type { FilterCategory } from "@/types/project";

const categories: readonly FilterCategory[] = [
  "All",
  "Frontend",
  "Backend",
  "Full Stack",
  "DevOps",
];

interface FilterBarProps {
  readonly activeCategory: FilterCategory;
  readonly activeTech: string | null;
  readonly allTechs: readonly string[];
  readonly onCategoryChange: (category: FilterCategory) => void;
  readonly onTechChange: (tech: string | null) => void;
}

export function FilterBar({
  activeCategory,
  activeTech,
  allTechs,
  onCategoryChange,
  onTechChange,
}: FilterBarProps) {
  return (
    <div className="mb-8 space-y-4">
      <div className="flex flex-wrap gap-2">
        {categories.map((category) => (
          <button
            key={category}
            type="button"
            onClick={() => {
              onCategoryChange(category);
              onTechChange(null);
            }}
            className={`rounded-full border px-4 py-2 text-sm font-medium ${
              activeCategory === category && activeTech === null
                ? "border-transparent bg-[var(--ink)] text-white"
                : "border-[rgba(20,32,51,0.08)] bg-white/80 text-[var(--muted)] hover:border-[rgba(20,32,51,0.18)] hover:text-[var(--ink)]"
            }`}
            aria-pressed={activeCategory === category && activeTech === null}
          >
            {category}
          </button>
        ))}
      </div>
      <div className="flex flex-wrap gap-2">
        {allTechs.map((tech) => (
          <button
            key={tech}
            type="button"
            onClick={() => {
              onTechChange(activeTech === tech ? null : tech);
              onCategoryChange("All");
            }}
            className={`rounded-full border px-3 py-1 text-xs font-medium ${
              activeTech === tech
                ? "border-transparent bg-[var(--accent)] text-white"
                : "border-[rgba(15,118,110,0.14)] bg-[rgba(15,118,110,0.08)] text-[var(--accent)] hover:bg-[rgba(15,118,110,0.14)]"
            }`}
            aria-pressed={activeTech === tech}
          >
            {tech}
          </button>
        ))}
      </div>
    </div>
  );
}
