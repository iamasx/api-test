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
            onClick={() => {
              onCategoryChange(category);
              onTechChange(null);
            }}
            className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
              activeCategory === category && activeTech === null
                ? "bg-foreground text-background"
                : "bg-zinc-100 text-zinc-700 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700"
            }`}
          >
            {category}
          </button>
        ))}
      </div>
      <div className="flex flex-wrap gap-2">
        {allTechs.map((tech) => (
          <button
            key={tech}
            onClick={() => {
              onTechChange(activeTech === tech ? null : tech);
              onCategoryChange("All");
            }}
            className={`rounded-full px-3 py-1 text-xs font-medium transition-colors ${
              activeTech === tech
                ? "bg-blue-600 text-white"
                : "bg-blue-50 text-blue-700 hover:bg-blue-100 dark:bg-blue-900/30 dark:text-blue-300 dark:hover:bg-blue-900/50"
            }`}
          >
            {tech}
          </button>
        ))}
      </div>
    </div>
  );
}
