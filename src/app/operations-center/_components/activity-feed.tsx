import type { ActivityItem, ActivityTone } from "../_data/dashboard-data";
import styles from "../operations-center.module.css";

const activityToneClasses: Record<ActivityTone, string> = {
  automated: "border-teal-200 bg-teal-50 text-teal-800",
  coordinated: "border-indigo-200 bg-indigo-50 text-indigo-800",
  resolved: "border-emerald-200 bg-emerald-50 text-emerald-800",
};

export function ActivityFeed({ items }: { items: ActivityItem[] }) {
  return (
    <ol aria-label="Recent activity" className={styles.activityFeed}>
      {items.map((item) => (
        <li key={item.id} className={styles.activityNode}>
          <article className={`${styles.surfaceCard} p-5`}>
            <div className="flex flex-wrap items-center justify-between gap-3">
              <span
                className={`inline-flex rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] ${activityToneClasses[item.tone]}`}
              >
                {item.channel}
              </span>
              <time className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                {item.timestamp}
              </time>
            </div>

            <div className="mt-4 space-y-2">
              <h3 className="text-lg font-semibold tracking-tight text-slate-950">
                {item.title}
              </h3>
              <p className="text-sm leading-6 text-slate-600">{item.summary}</p>
            </div>

            <div className="mt-4 flex flex-col gap-2 border-t border-slate-200/80 pt-4 text-sm text-slate-700">
              <p>
                <span className="font-semibold text-slate-950">Actor:</span>{" "}
                {item.actor}
              </p>
              <p>
                <span className="font-semibold text-slate-950">Outcome:</span>{" "}
                {item.outcome}
              </p>
            </div>
          </article>
        </li>
      ))}
    </ol>
  );
}
