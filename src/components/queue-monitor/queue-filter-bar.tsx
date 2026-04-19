import type { AgeFilter, QueueScope } from "./queue-monitor-data";

type QueueFilterBarProps = {
  ageCounts: Record<AgeFilter, number>; ageFilter: AgeFilter; queueCounts: Record<QueueScope, number>;
  queueScope: QueueScope; onAgeFilterChange: (filter: AgeFilter) => void; onQueueScopeChange: (scope: QueueScope) => void;
};

const queueLabels: Record<QueueScope, string> = { all: "All queues", watch: "Attention only", stable: "Stable only" };
const ageLabels: Record<AgeFilter, string> = { all: "All ages", aging: "Aging + breach", breach: "Breach only" };

function FilterGroup<T extends string>({
  active,
  counts,
  label,
  labels,
  onChange,
  values,
}: {
  active: T; counts: Record<T, number>; label: string; labels: Record<T, string>; onChange: (value: T) => void; values: T[];
}) {
  return (
    <div>
      <p className="text-xs font-semibold uppercase tracking-[0.26em] text-slate-400">{label}</p>
      <div className="mt-3 flex flex-wrap gap-3">
        {values.map((value) => (
          <button
            aria-pressed={value === active}
            className={`rounded-full px-4 py-2 text-sm font-medium transition ${
              value === active ? "bg-orange-200 text-slate-950" : "border border-white/12 bg-white/5 text-slate-200 hover:border-orange-200/35 hover:bg-white/10"
            }`}
            key={value}
            onClick={() => onChange(value)}
            type="button"
          >
            {labels[value]} <span className="text-xs opacity-70">({counts[value]})</span>
          </button>
        ))}
      </div>
    </div>
  );
}

export function QueueFilterBar({
  ageCounts,
  ageFilter,
  queueCounts,
  queueScope,
  onAgeFilterChange,
  onQueueScopeChange,
}: QueueFilterBarProps) {
  return (
    <section className="rounded-[1.75rem] border border-white/10 bg-slate-950/72 p-4 shadow-[0_18px_60px_rgba(15,23,42,0.32)] backdrop-blur">
      <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
        <FilterGroup active={queueScope} counts={queueCounts} label="Queue scope" labels={queueLabels} onChange={onQueueScopeChange} values={["all", "watch", "stable"]} />
        <FilterGroup active={ageFilter} counts={ageCounts} label="Aging filter" labels={ageLabels} onChange={onAgeFilterChange} values={["all", "aging", "breach"]} />
      </div>
    </section>
  );
}
