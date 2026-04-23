import type { StatusItem } from "../_data/status-board-data";

const uptimeColor = (uptime: number) => {
  if (uptime >= 99.9) return "bg-emerald-500";
  if (uptime >= 99.5) return "bg-amber-400";
  return "bg-rose-500";
};

export function UptimeBar({ items }: { items: StatusItem[] }) {
  const sorted = [...items].sort((a, b) => b.uptime - a.uptime);
  const overallUptime =
    sorted.length > 0 ? (sorted.reduce((acc, s) => acc + s.uptime, 0) / sorted.length).toFixed(2) : "0.00";

  return (
    <div className="rounded-2xl border border-slate-200 bg-white/80 p-6 shadow-sm">
      <div className="flex items-baseline justify-between">
        <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">Uptime Overview</h3>
        <p className="text-2xl font-bold text-slate-900">{overallUptime}%</p>
      </div>

      <div className="mt-5 space-y-3">
        {sorted.map((svc) => (
          <div key={svc.id} className="flex items-center gap-3">
            <span className="w-28 truncate text-xs font-medium text-slate-600">{svc.service}</span>
            <div className="relative h-2 flex-1 overflow-hidden rounded-full bg-slate-100">
              <div
                className={`absolute inset-y-0 left-0 rounded-full ${uptimeColor(svc.uptime)}`}
                style={{ width: `${Math.min(svc.uptime, 100)}%` }}
              />
            </div>
            <span className="w-14 text-right text-xs font-semibold text-slate-700">{svc.uptime}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}
