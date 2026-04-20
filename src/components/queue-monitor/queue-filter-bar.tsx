import type {
  AgeFilter,
  ForecastWindow,
  ForecastWindowId,
  InsightMode,
  PriorityFilter,
  QueueScope,
  ViewMode,
} from "./queue-monitor-data";

type QueueFilterBarProps = {
  ageCounts: Record<AgeFilter, number>;
  ageFilter: AgeFilter;
  forecastWindow: ForecastWindowId;
  forecastWindows: ForecastWindow[];
  insightMode: InsightMode;
  onAgeFilterChange: (filter: AgeFilter) => void;
  onForecastWindowChange: (windowId: ForecastWindowId) => void;
  onInsightModeChange: (mode: InsightMode) => void;
  onPriorityFilterChange: (filter: PriorityFilter) => void;
  onQueueScopeChange: (scope: QueueScope) => void;
  onViewModeChange: (mode: ViewMode) => void;
  priorityCounts: Record<PriorityFilter, number>;
  priorityFilter: PriorityFilter;
  queueCounts: Record<QueueScope, number>;
  queueScope: QueueScope;
  viewMode: ViewMode;
};

const viewLabels: Record<ViewMode, string> = {
  live: "Live board",
  forecast: "Forecast board",
};

const insightLabels: Record<InsightMode, string> = {
  operations: "Operations view",
  priority: "Priority explanation",
};

const queueLabels: Record<QueueScope, string> = {
  all: "All queues",
  watch: "Attention only",
  stable: "Stable only",
};

const ageLabels: Record<AgeFilter, string> = {
  all: "All ages",
  aging: "Aging + breach",
  breach: "Breach only",
};

const priorityLabels: Record<PriorityFilter, string> = {
  all: "All priorities",
  expedite: "Expedite + critical",
  critical: "Critical only",
};

function FilterGroup<T extends string>({
  active,
  counts,
  label,
  labels,
  onChange,
  values,
}: {
  active: T;
  counts: Record<T, number>;
  label: string;
  labels: Record<T, string>;
  onChange: (value: T) => void;
  values: T[];
}) {
  return (
    <div>
      <p className="text-xs font-semibold uppercase tracking-[0.26em] text-slate-400">
        {label}
      </p>
      <div className="mt-3 flex flex-wrap gap-3">
        {values.map((value) => (
          <button
            aria-pressed={value === active}
            className={`rounded-full px-4 py-2 text-sm font-medium transition ${
              value === active
                ? "bg-orange-200 text-slate-950"
                : "border border-white/12 bg-white/5 text-slate-200 hover:border-orange-200/35 hover:bg-white/10"
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
  forecastWindow,
  forecastWindows,
  insightMode,
  onAgeFilterChange,
  onForecastWindowChange,
  onInsightModeChange,
  onPriorityFilterChange,
  onQueueScopeChange,
  onViewModeChange,
  priorityCounts,
  priorityFilter,
  queueCounts,
  queueScope,
  viewMode,
}: QueueFilterBarProps) {
  const viewCounts = { live: 1, forecast: 1 } satisfies Record<ViewMode, number>;
  const insightCounts = {
    operations: 1,
    priority: 1,
  } satisfies Record<InsightMode, number>;
  const forecastCounts = Object.fromEntries(
    forecastWindows.map((window) => [window.id, 1]),
  ) as Record<ForecastWindowId, number>;
  const forecastLabels = Object.fromEntries(
    forecastWindows.map((window) => [window.id, window.label]),
  ) as Record<ForecastWindowId, string>;

  return (
    <section className="rounded-[1.75rem] border border-white/10 bg-slate-950/72 p-4 shadow-[0_18px_60px_rgba(15,23,42,0.32)] backdrop-blur">
      <div className="flex flex-col gap-5">
        <div className="grid gap-5 xl:grid-cols-3">
          <FilterGroup
            active={viewMode}
            counts={viewCounts}
            label="Board mode"
            labels={viewLabels}
            onChange={onViewModeChange}
            values={["live", "forecast"]}
          />
          <FilterGroup
            active={insightMode}
            counts={insightCounts}
            label="Detail emphasis"
            labels={insightLabels}
            onChange={onInsightModeChange}
            values={["operations", "priority"]}
          />
          <FilterGroup
            active={forecastWindow}
            counts={forecastCounts}
            label="Forecast horizon"
            labels={forecastLabels}
            onChange={onForecastWindowChange}
            values={["30m", "60m", "90m"]}
          />
        </div>
        <div className="h-px bg-white/10" />
        <div className="grid gap-5 xl:grid-cols-3">
          <FilterGroup
            active={queueScope}
            counts={queueCounts}
            label="Queue scope"
            labels={queueLabels}
            onChange={onQueueScopeChange}
            values={["all", "watch", "stable"]}
          />
          <FilterGroup
            active={ageFilter}
            counts={ageCounts}
            label="Age filter"
            labels={ageLabels}
            onChange={onAgeFilterChange}
            values={["all", "aging", "breach"]}
          />
          <FilterGroup
            active={priorityFilter}
            counts={priorityCounts}
            label="Priority filter"
            labels={priorityLabels}
            onChange={onPriorityFilterChange}
            values={["all", "expedite", "critical"]}
          />
        </div>
        <p className="text-sm leading-6 text-slate-300">
          Forecast board and the active horizon re-evaluate queue scope, age,
          and priority filters against projected state, while priority
          explanation mode shifts the board toward why each queue is moving.
        </p>
      </div>
    </section>
  );
}
