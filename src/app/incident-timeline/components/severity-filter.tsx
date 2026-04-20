import { severityOptions } from "../data";
import {
  cn,
  getSeverityBadgeClasses,
  type SeverityFilter,
} from "../utils";

type SeverityFilterProps = {
  activeSeverity: SeverityFilter;
  counts: Record<SeverityFilter, number>;
  onChange: (severity: SeverityFilter) => void;
};

export function SeverityFilter({
  activeSeverity,
  counts,
  onChange,
}: SeverityFilterProps) {
  return (
    <section className="rounded-[1.75rem] border border-white/10 bg-white/5 p-5 shadow-xl shadow-black/10 backdrop-blur">
      <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.24em] text-slate-400">
            Severity filters
          </p>
          <h2 className="mt-2 text-2xl font-semibold text-white">
            Focus the review surface
          </h2>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-300">
            Narrow the incident list by severity while keeping counts visible
            for the rest of the mock review set.
          </p>
        </div>

        <div
          aria-label="Severity filters"
          className="flex flex-wrap gap-3"
          role="group"
        >
          {severityOptions.map((option) => {
            const isActive = activeSeverity === option;
            const isAllOption = option === "All";

            return (
              <button
                key={option}
                aria-pressed={isActive}
                className={cn(
                  "inline-flex items-center gap-3 rounded-full border px-4 py-2 text-sm font-medium transition hover:-translate-y-0.5 hover:border-cyan-300/40 hover:text-white",
                  isActive
                    ? "border-cyan-300/50 bg-cyan-300/15 text-white shadow-lg shadow-cyan-950/20"
                    : isAllOption
                      ? "border-white/10 bg-white/5 text-slate-200"
                      : getSeverityBadgeClasses(option)
                )}
                onClick={() => onChange(option)}
                type="button"
              >
                <span>{option}</span>
                <span className="rounded-full bg-black/20 px-2 py-0.5 text-xs text-inherit">
                  {counts[option]}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
