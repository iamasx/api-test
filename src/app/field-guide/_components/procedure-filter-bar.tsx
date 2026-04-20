import type { ChangeEvent } from "react";

import type {
  FieldGuideCategoryOption,
  FieldGuideFocusAreaOption,
  FieldGuidePriorityOption,
  ProcedurePriority,
} from "../_lib/field-guide-data";

type ProcedureFilterBarProps = {
  options: FieldGuideCategoryOption[];
  priorityOptions: FieldGuidePriorityOption[];
  focusAreaOptions: FieldGuideFocusAreaOption[];
  activeCategoryId: string;
  activePriority: ProcedurePriority | "all";
  activeFocusArea: string;
  searchValue: string;
  resultCount: number;
  canReset: boolean;
  onCategoryChange: (categoryId: string) => void;
  onPriorityChange: (priority: ProcedurePriority | "all") => void;
  onFocusAreaChange: (focusArea: string) => void;
  onSearchChange: (value: string) => void;
  onReset: () => void;
};

export function ProcedureFilterBar({
  options,
  priorityOptions,
  focusAreaOptions,
  activeCategoryId,
  activePriority,
  activeFocusArea,
  searchValue,
  resultCount,
  canReset,
  onCategoryChange,
  onPriorityChange,
  onFocusAreaChange,
  onSearchChange,
  onReset,
}: ProcedureFilterBarProps) {
  function handleSearchChange(event: ChangeEvent<HTMLInputElement>) {
    onSearchChange(event.target.value);
  }

  return (
    <section className="rounded-[2rem] border border-slate-200/80 bg-white/82 p-5 shadow-[0_18px_70px_-42px_rgba(15,23,42,0.45)] backdrop-blur">
      <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-500">
            Search and Filter
          </p>
          <h2 className="mt-2 text-2xl font-semibold tracking-tight text-slate-950">
            Narrow the active field procedures
          </h2>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">
            Search by procedure title, code, tag, signal, or tool, then pivot by
            category without losing your current working context.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <div className="rounded-[1.4rem] border border-teal-200 bg-teal-50 px-4 py-3 text-sm font-medium text-teal-900">
            {resultCount} procedure{resultCount === 1 ? "" : "s"} visible
          </div>
          {canReset ? (
            <button
              type="button"
              onClick={onReset}
              className="rounded-[1.2rem] border border-slate-300 bg-white px-4 py-3 text-sm font-semibold text-slate-700 transition hover:border-slate-950 hover:text-slate-950"
            >
              Reset filters
            </button>
          ) : null}
        </div>
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.35fr)]">
        <label className="block">
          <span className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">
            Search procedures
          </span>
          <input
            type="search"
            value={searchValue}
            onChange={handleSearchChange}
            placeholder="Search by title, code, tag, signal, or tool"
            className="mt-3 w-full rounded-[1.25rem] border border-slate-200 bg-slate-50/85 px-4 py-3 text-sm text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-teal-500 focus:bg-white"
          />
        </label>

        <nav aria-label="Field guide categories">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">
            Procedure categories
          </p>
          <div className="mt-3 grid gap-3 md:grid-cols-2 xl:grid-cols-3">
            {options.map((option) => {
              const isActive = option.id === activeCategoryId;

              return (
                <button
                  key={option.id}
                  type="button"
                  aria-pressed={isActive}
                  onClick={() => onCategoryChange(option.id)}
                  className={`rounded-[1.35rem] border px-4 py-4 text-left transition ${
                    isActive
                      ? "border-slate-950 bg-slate-950 text-white shadow-lg shadow-slate-950/12"
                      : "border-slate-200 bg-slate-50/70 text-slate-950 hover:border-slate-300 hover:bg-white"
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="text-sm font-semibold">{option.name}</div>
                      <div
                        className={`mt-1 text-xs leading-5 ${
                          isActive ? "text-slate-300" : "text-slate-500"
                        }`}
                      >
                        {option.description}
                      </div>
                    </div>
                    <span
                      className={`inline-flex min-w-9 justify-center rounded-full px-2.5 py-1 text-xs font-semibold ${
                        isActive ? "bg-white/12 text-white" : "bg-slate-900 text-white"
                      }`}
                    >
                      {option.count}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </nav>
      </div>

      <div className="mt-4 grid gap-4 xl:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
        <nav aria-label="Procedure priorities">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">
            Priority bands
          </p>
          <div className="mt-3 grid gap-3 sm:grid-cols-2">
            {priorityOptions.map((option) => {
              const isActive = option.id === activePriority;

              return (
                <button
                  key={option.id}
                  type="button"
                  aria-pressed={isActive}
                  onClick={() => onPriorityChange(option.id)}
                  className={`rounded-[1.2rem] border px-4 py-4 text-left transition ${
                    isActive
                      ? "border-teal-600 bg-teal-600 text-white shadow-lg shadow-teal-950/12"
                      : "border-slate-200 bg-slate-50/70 text-slate-950 hover:border-slate-300 hover:bg-white"
                  }`}
                >
                  <div className="flex items-center justify-between gap-3">
                    <span className="text-sm font-semibold">{option.name}</span>
                    <span
                      className={`inline-flex min-w-9 justify-center rounded-full px-2.5 py-1 text-xs font-semibold ${
                        isActive
                          ? "bg-white/12 text-white"
                          : "bg-slate-900 text-white"
                      }`}
                    >
                      {option.count}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </nav>

        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">
            Focus areas
          </p>
          <div className="mt-3 flex flex-wrap gap-3" aria-label="Field guide focus areas">
            {focusAreaOptions.map((option) => {
              const isActive = option.id === activeFocusArea;

              return (
                <button
                  key={option.id}
                  type="button"
                  aria-pressed={isActive}
                  onClick={() => onFocusAreaChange(option.id)}
                  className={`inline-flex items-center gap-2 rounded-full border px-4 py-2.5 text-sm font-medium transition ${
                    isActive
                      ? "border-slate-950 bg-slate-950 text-white"
                      : "border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:text-slate-950"
                  }`}
                >
                  <span>{option.name}</span>
                  <span
                    className={`rounded-full px-2 py-0.5 text-xs font-semibold ${
                      isActive
                        ? "bg-white/12 text-white"
                        : "bg-slate-100 text-slate-700"
                    }`}
                  >
                    {option.count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
