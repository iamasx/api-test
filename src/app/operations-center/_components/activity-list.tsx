import type { ActivityEntry, ActivityKind } from "../_data/dashboard-data";
import styles from "../operations-center.module.css";

const kindBadge: Record<ActivityKind, string> = {
  automated: "border-teal-200 bg-teal-50 text-teal-800",
  manual: "border-indigo-200 bg-indigo-50 text-indigo-800",
  resolved: "border-emerald-200 bg-emerald-50 text-emerald-800",
};

const kindLabel: Record<ActivityKind, string> = {
  automated: "Automated",
  manual: "Manual",
  resolved: "Resolved",
};

export function ActivityList({ items }: { items: ActivityEntry[] }) {
  return (
    <ol aria-label="Recent activity" className="space-y-3">
      {items.map((item) => (
        <li key={item.id}>
          <article className={`${styles.surfaceCard} space-y-3 p-5`}>
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span
                className={`rounded-full border px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-[0.18em] ${kindBadge[item.kind]}`}
              >
                {kindLabel[item.kind]}
              </span>
              <time className="text-xs text-slate-500">{item.timestamp}</time>
            </div>

            <h3 className="text-lg font-semibold tracking-tight text-slate-950">
              {item.title}
            </h3>
            <p className="text-sm leading-6 text-slate-600">{item.summary}</p>

            <p className="text-xs font-medium text-slate-500">
              {item.actor}
            </p>
          </article>
        </li>
      ))}
    </ol>
  );
}
