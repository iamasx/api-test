import type { StatusBoardView } from "../_data/status-board-data";

const healthLabel = (summary: StatusBoardView["summary"]) => {
  if (summary.down > 0) return { text: "Degraded — Outage Detected", color: "text-rose-700 bg-rose-50 border-rose-200" };
  if (summary.degraded > 0) return { text: "Partially Degraded", color: "text-amber-700 bg-amber-50 border-amber-200" };
  if (summary.maintenance > 0) return { text: "Operational — Maintenance Active", color: "text-sky-700 bg-sky-50 border-sky-200" };
  return { text: "All Systems Operational", color: "text-emerald-700 bg-emerald-50 border-emerald-200" };
};

export function HealthSummary({ summary }: { summary: StatusBoardView["summary"] }) {
  const label = healthLabel(summary);

  return (
    <div className={`rounded-2xl border p-6 ${label.color}`}>
      <p className="text-xs font-semibold uppercase tracking-[0.24em] opacity-60">System Status</p>
      <p className="mt-2 text-2xl font-bold">{label.text}</p>
      <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-4">
        <div>
          <p className="text-xs font-medium opacity-60">Healthy</p>
          <p className="text-xl font-semibold">{summary.healthy}/{summary.total}</p>
        </div>
        <div>
          <p className="text-xs font-medium opacity-60">Degraded</p>
          <p className="text-xl font-semibold">{summary.degraded}</p>
        </div>
        <div>
          <p className="text-xs font-medium opacity-60">Down</p>
          <p className="text-xl font-semibold">{summary.down}</p>
        </div>
        <div>
          <p className="text-xs font-medium opacity-60">Avg Latency</p>
          <p className="text-xl font-semibold">{summary.avgLatency}ms</p>
        </div>
      </div>
    </div>
  );
}
