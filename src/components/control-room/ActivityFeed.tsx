import type { ActivityFilter, ActivityItem } from "./control-room-data";

const categoryStyles = {
  Deployments: "bg-emerald-400/15 text-emerald-100",
  Incidents: "bg-rose-400/15 text-rose-100",
  Jobs: "bg-amber-400/15 text-amber-100",
  Notes: "bg-slate-400/15 text-slate-100",
};

type ActivityFeedProps = {
  activities: ActivityItem[];
  expandedIds: string[];
  filter: ActivityFilter;
  filters: ActivityFilter[];
  onFilterChange: (nextFilter: ActivityFilter) => void;
  onToggle: (activityId: string) => void;
};

export function ActivityFeed({
  activities,
  expandedIds,
  filter,
  filters,
  onFilterChange,
  onToggle,
}: Readonly<ActivityFeedProps>) {
  return (
    <section className="rounded-3xl border border-white/10 bg-slate-900/65 shadow-[0_22px_80px_rgba(2,6,23,0.34)] backdrop-blur">
      <div className="border-b border-white/8 px-6 py-6">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-slate-400">
              Activity Feed
            </p>
            <h2 className="mt-2 text-2xl font-semibold text-white">
              Operator events and rehearsal traffic
            </h2>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-300">
              Filter the mock feed by lane, then expand any entry to inspect more context for the
              current drill.
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            {filters.map((entry) => {
              const isActive = entry === filter;

              return (
                <button
                  key={entry}
                  type="button"
                  onClick={() => onFilterChange(entry)}
                  aria-pressed={isActive}
                  className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                    isActive
                      ? "bg-cyan-300 text-slate-950"
                      : "border border-white/10 bg-white/5 text-slate-200 hover:bg-white/10"
                  }`}
                >
                  {entry}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {activities.length === 0 ? (
        <div className="px-6 py-10">
          <div className="rounded-2xl border border-dashed border-white/12 bg-slate-950/45 px-5 py-8 text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.26em] text-slate-500">
              Nothing queued
            </p>
            <h3 className="mt-3 text-xl font-semibold text-white">
              No {filter.toLowerCase()} activity in this rehearsal window
            </h3>
            <p className="mt-3 text-sm leading-6 text-slate-300">
              This view is backed by local mock events only. Switch back to another filter or hit
              refresh to rotate the fake timeline.
            </p>
          </div>
        </div>
      ) : (
        <ul className="divide-y divide-white/8">
          {activities.map((activity) => {
            const isExpanded = expandedIds.includes(activity.id);

            return (
              <li key={activity.id} className="px-6 py-5">
                <button
                  type="button"
                  onClick={() => onToggle(activity.id)}
                  aria-expanded={isExpanded}
                  className="flex w-full flex-col gap-4 text-left"
                >
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <span
                          className={`rounded-full px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] ${categoryStyles[activity.category]}`}
                        >
                          {activity.category}
                        </span>
                        <span className="text-xs uppercase tracking-[0.2em] text-slate-500">
                          {activity.service}
                        </span>
                      </div>
                      <h3 className="mt-3 text-lg font-semibold text-white">{activity.title}</h3>
                      <p className="mt-2 text-sm text-slate-300">{activity.status}</p>
                    </div>

                    <div className="shrink-0 text-right">
                      <p className="text-sm font-medium text-slate-200">{activity.happenedAtLabel}</p>
                      <p className="mt-2 text-xs uppercase tracking-[0.2em] text-slate-500">
                        {isExpanded ? "Hide detail" : "Show detail"}
                      </p>
                    </div>
                  </div>
                </button>

                {isExpanded ? (
                  <div className="mt-4 rounded-2xl border border-white/8 bg-slate-950/50 p-4">
                    <p className="text-sm leading-6 text-slate-200">{activity.detail}</p>
                    <dl className="mt-4 flex flex-wrap gap-x-6 gap-y-3 text-sm text-slate-300">
                      <div>
                        <dt className="text-xs uppercase tracking-[0.22em] text-slate-500">
                          Actor
                        </dt>
                        <dd className="mt-1">{activity.actor}</dd>
                      </div>
                      <div>
                        <dt className="text-xs uppercase tracking-[0.22em] text-slate-500">
                          Service
                        </dt>
                        <dd className="mt-1">{activity.service}</dd>
                      </div>
                      <div>
                        <dt className="text-xs uppercase tracking-[0.22em] text-slate-500">
                          Status
                        </dt>
                        <dd className="mt-1">{activity.status}</dd>
                      </div>
                    </dl>
                  </div>
                ) : null}
              </li>
            );
          })}
        </ul>
      )}
    </section>
  );
}
