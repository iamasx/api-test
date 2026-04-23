import type { StatusItem } from "../_data/status-board-data";

const statusColors: Record<StatusItem["status"], { bg: string; text: string; dot: string }> = {
  healthy: { bg: "bg-emerald-50", text: "text-emerald-700", dot: "bg-emerald-500" },
  degraded: { bg: "bg-amber-50", text: "text-amber-700", dot: "bg-amber-500" },
  down: { bg: "bg-rose-50", text: "text-rose-700", dot: "bg-rose-500" },
  maintenance: { bg: "bg-slate-100", text: "text-slate-600", dot: "bg-slate-400" },
};

export function ServiceCard({ item }: { item: StatusItem }) {
  const colors = statusColors[item.status];

  return (
    <div className="rounded-2xl border border-slate-200 bg-white/80 p-5 shadow-sm transition hover:shadow-md">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <h3 className="truncate text-base font-semibold text-slate-900">{item.service}</h3>
          <p className="mt-0.5 text-xs text-slate-500">{item.owner}</p>
        </div>
        <span
          className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ${colors.bg} ${colors.text}`}
        >
          <span className={`h-1.5 w-1.5 rounded-full ${colors.dot}`} />
          {item.status}
        </span>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-3">
        <div className="rounded-lg bg-slate-50/80 px-3 py-2">
          <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-400">Latency</p>
          <p className="mt-0.5 text-lg font-semibold text-slate-800">
            {item.latency > 0 ? `${item.latency}ms` : "—"}
          </p>
        </div>
        <div className="rounded-lg bg-slate-50/80 px-3 py-2">
          <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-400">Uptime</p>
          <p className="mt-0.5 text-lg font-semibold text-slate-800">{item.uptime}%</p>
        </div>
      </div>

      <p className="mt-3 text-[11px] text-slate-400">
        Last checked {new Date(item.lastChecked).toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" })}
      </p>
    </div>
  );
}
