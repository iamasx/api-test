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
    <div className="space-y-5">
      <div className="flex flex-wrap gap-2.5">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => {
              onCategoryChange(category);
              onTechChange(null);
            }}
            type="button"
            className={`rounded-full border px-4 py-2 text-sm font-medium transition duration-200 ${
              activeCategory === category && activeTech === null
                ? "border-brand bg-brand text-white shadow-glow"
                : "border-line bg-surface/80 text-muted hover:border-brand/30 hover:bg-brand-soft/70 hover:text-brand-strong"
            }`}
          >
            {category}
          </button>
        ))}
      </div>
      <div className="flex flex-wrap gap-2.5">
        {allTechs.map((tech) => (
          <button
            key={tech}
            onClick={() => {
              onTechChange(activeTech === tech ? null : tech);
              onCategoryChange("All");
            }}
            type="button"
            className={`rounded-full border px-3 py-1.5 text-xs font-medium transition duration-200 ${
              activeTech === tech
                ? "border-brand bg-brand-soft text-brand-strong"
                : "border-line bg-canvas/70 text-muted hover:border-brand/25 hover:bg-brand-soft/55 hover:text-brand-strong"
            }`}
          >
            {tech}
          </button>
        ))}
      </div>
    </div>
  );
}
