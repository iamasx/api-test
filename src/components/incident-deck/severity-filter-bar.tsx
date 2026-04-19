import type {
  IncidentSeverityFilter,
  SeverityLevel,
} from "@/app/incident-deck/mock-data";

type SeverityCount = SeverityLevel & { count: number };

type SeverityFilterBarProps = {
  activeSeverity: IncidentSeverityFilter;
  totalCount: number;
  visibleCount: number;
  options: SeverityCount[];
  onSelect: (severity: IncidentSeverityFilter) => void;
};

export function SeverityFilterBar({
  activeSeverity,
  totalCount,
  visibleCount,
  options,
  onSelect,
}: SeverityFilterBarProps) {
  return (
    <section className="rounded-[1.75rem] border border-white/10 bg-slate-900/55 p-4 shadow-xl shadow-slate-950/20 backdrop-blur">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.28em] text-slate-400">
            Severity lanes
          </p>
          <p className="mt-2 text-sm text-slate-300">
            Showing {visibleCount} of {totalCount} active incidents in the deck.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            className={`rounded-full px-4 py-2 text-sm font-medium transition ${
              activeSeverity === "all"
                ? "bg-white text-slate-950"
                : "border border-white/10 bg-white/5 text-slate-200 hover:bg-white/10"
            }`}
            onClick={() => onSelect("all")}
            type="button"
          >
            All active
          </button>
          {options.map((option) => (
            <button
              className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                activeSeverity === option.id
                  ? option.surfaceClass
                  : "border border-white/10 bg-white/5 text-slate-200 hover:bg-white/10"
              }`}
              key={option.id}
              onClick={() => onSelect(option.id)}
              type="button"
            >
              {option.label} · {option.count}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
