"use client";

import type { ExperimentStatus } from "../_lib/experiment-registry-data";

const filterOptions: { value: ExperimentStatus | "all"; label: string }[] = [
  { value: "all", label: "All" },
  { value: "active", label: "Active" },
  { value: "completed", label: "Completed" },
  { value: "paused", label: "Paused" },
  { value: "draft", label: "Draft" },
];

const activePill =
  "bg-slate-900 text-white shadow-sm";
const inactivePill =
  "bg-white/60 text-slate-600 hover:bg-white/80 border border-slate-200";

export function ExperimentFilterBar({
  active,
  onFilter,
  query,
  onSearch,
}: {
  active: ExperimentStatus | "all";
  onFilter: (status: ExperimentStatus | "all") => void;
  query: string;
  onSearch: (q: string) => void;
}) {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <div className="flex flex-wrap gap-2">
        {filterOptions.map((opt) => (
          <button
            key={opt.value}
            type="button"
            onClick={() => onFilter(opt.value)}
            className={`rounded-full px-4 py-1.5 text-xs font-semibold transition ${
              active === opt.value ? activePill : inactivePill
            }`}
          >
            {opt.label}
          </button>
        ))}
      </div>
      <div className="ml-auto w-full sm:w-64">
        <input
          type="search"
          placeholder="Search experiments…"
          value={query}
          onChange={(e) => onSearch(e.target.value)}
          className="w-full rounded-xl border border-slate-200 bg-white/70 px-4 py-2 text-sm text-slate-700 placeholder:text-slate-400 focus:border-indigo-300 focus:outline-none focus:ring-2 focus:ring-indigo-100"
        />
      </div>
    </div>
  );
}
