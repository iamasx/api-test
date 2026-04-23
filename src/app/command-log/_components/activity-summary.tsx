import type { CommandLogEvent, CommandEventSeverity } from "../_lib/command-log-data";
import { countBySeverity, formatFilterLabel } from "../_lib/filter-events";

type ActivitySummaryProps = {
  events: CommandLogEvent[];
  activeSeverity: CommandEventSeverity | null;
};

const severityBarColors: Record<CommandEventSeverity, string> = {
  Critical: "bg-rose-500",
  High: "bg-amber-400",
  Moderate: "bg-sky-400",
  Low: "bg-slate-300",
};

export function ActivitySummary({ events, activeSeverity }: ActivitySummaryProps) {
  const counts = countBySeverity(events);
  const total = events.length;
  const label = formatFilterLabel(activeSeverity, total);

  const severities: CommandEventSeverity[] = ["Critical", "High", "Moderate", "Low"];

  // Compute the category breakdown for filtered events
  const categoryMap = new Map<string, number>();
  for (const event of events) {
    categoryMap.set(event.category, (categoryMap.get(event.category) ?? 0) + 1);
  }
  const categories = [...categoryMap.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, 6);

  // Compute team breakdown
  const teamMap = new Map<string, number>();
  for (const event of events) {
    teamMap.set(event.team, (teamMap.get(event.team) ?? 0) + 1);
  }
  const teams = [...teamMap.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5);

  // Compute status breakdown
  const statusMap = new Map<string, number>();
  for (const event of events) {
    statusMap.set(event.status, (statusMap.get(event.status) ?? 0) + 1);
  }
  const statuses = [...statusMap.entries()].sort((a, b) => b[1] - a[1]);

  const statusColors: Record<string, string> = {
    Completed: "text-emerald-700 bg-emerald-50 border-emerald-200",
    Watching: "text-amber-700 bg-amber-50 border-amber-200",
    "Needs follow-up": "text-rose-700 bg-rose-50 border-rose-200",
    Blocked: "text-red-800 bg-red-50 border-red-200",
  };

  return (
    <section className="rounded-[2rem] border border-slate-200/80 bg-white/80 p-6 shadow-sm sm:p-8">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-400">
            Activity summary
          </p>
          <p className="mt-1 text-lg font-semibold text-slate-900">{label}</p>
        </div>

        {/* Severity distribution bar */}
        <div className="flex items-center gap-1.5">
          {severities.map((sev) => {
            const count = counts[sev];
            if (count === 0) return null;
            const width = Math.max(12, Math.round((count / total) * 120));

            return (
              <div
                key={sev}
                className={`${severityBarColors[sev]} h-3 rounded-full`}
                style={{ width: `${width}px` }}
                title={`${sev}: ${count}`}
              />
            );
          })}
        </div>
      </div>

      <div className="mt-6 grid gap-5 sm:grid-cols-3">
        {/* Categories column */}
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
            By category
          </p>
          <ul className="mt-3 space-y-2">
            {categories.map(([category, count]) => (
              <li key={category} className="flex items-center justify-between text-sm">
                <span className="text-slate-700">{category}</span>
                <span className="font-medium text-slate-500">{count}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Teams column */}
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
            By team
          </p>
          <ul className="mt-3 space-y-2">
            {teams.map(([team, count]) => (
              <li key={team} className="flex items-center justify-between text-sm">
                <span className="text-slate-700">{team}</span>
                <span className="font-medium text-slate-500">{count}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Status column */}
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
            By status
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            {statuses.map(([status, count]) => (
              <span
                key={status}
                className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium ${
                  statusColors[status] ?? "text-slate-600 bg-slate-50 border-slate-200"
                }`}
              >
                {status}
                <span className="font-bold">{count}</span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
