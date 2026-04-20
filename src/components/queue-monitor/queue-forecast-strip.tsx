import type {
  ForecastPoint,
  ForecastWindowId,
} from "./queue-monitor-data";

type QueueForecastStripProps = {
  activeWindow: ForecastWindowId;
  points: ForecastPoint[];
  variant?: "compact" | "regular";
};

const toneClasses = {
  stable: "border-emerald-300/25 bg-emerald-300/10 text-emerald-50",
  watch: "border-amber-300/25 bg-amber-300/10 text-amber-50",
  critical: "border-rose-300/25 bg-rose-300/10 text-rose-50",
};

export function QueueForecastStrip({
  activeWindow,
  points,
  variant = "regular",
}: QueueForecastStripProps) {
  const isCompact = variant === "compact";

  return (
    <div
      className={`grid gap-2 ${isCompact ? "grid-cols-3" : "grid-cols-1 sm:grid-cols-3"}`}
    >
      {points.map((point) => {
        const isActive = point.windowId === activeWindow;

        return (
          <div
            className={`rounded-[1.25rem] border p-3 ${
              isActive
                ? "border-orange-200/45 bg-orange-200/10"
                : toneClasses[point.tone]
            }`}
            key={point.windowId}
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.22em] opacity-75">
                  {point.windowId}
                </p>
                <p
                  className={`mt-2 font-semibold text-white ${isCompact ? "text-lg" : "text-2xl"}`}
                >
                  {point.backlogCount}
                </p>
              </div>
              <span className="text-[11px] uppercase tracking-[0.18em] opacity-70">
                #{point.priorityRank}
              </span>
            </div>
            <p className={`mt-2 ${isCompact ? "text-xs" : "text-sm"} opacity-90`}>
              {point.statusLabel}
            </p>
            <p className={`mt-1 ${isCompact ? "text-[11px]" : "text-xs"} opacity-70`}>
              {point.breachCount} breach risk · {point.carryover} carryover
            </p>
          </div>
        );
      })}
    </div>
  );
}
