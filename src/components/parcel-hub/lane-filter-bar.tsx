export type LaneFilter = "all" | "watch" | "steady";

type LaneFilterBarProps = {
  activeFilter: LaneFilter;
  counts: Record<LaneFilter, number>;
  onChange: (filter: LaneFilter) => void;
};

const filterLabels: Record<LaneFilter, string> = {
  all: "All lanes",
  watch: "Delay watch",
  steady: "Clear lanes",
};

export function LaneFilterBar({
  activeFilter,
  counts,
  onChange,
}: LaneFilterBarProps) {
  return (
    <div className="rounded-[1.75rem] border border-white/10 bg-slate-950/70 p-4 shadow-[0_18px_60px_rgba(15,23,42,0.32)] backdrop-blur">
      <div className="flex flex-wrap gap-3">
        {(["all", "watch", "steady"] as LaneFilter[]).map((filter) => (
          <button
            className={`rounded-full px-4 py-2 text-sm font-medium transition ${
              filter === activeFilter
                ? "bg-amber-300 text-slate-950"
                : "border border-white/12 bg-white/5 text-slate-200 hover:border-amber-200/40 hover:bg-white/10"
            }`}
            key={filter}
            onClick={() => onChange(filter)}
            type="button"
          >
            {filterLabels[filter]} <span className="text-xs opacity-70">({counts[filter]})</span>
          </button>
        ))}
      </div>
    </div>
  );
}
