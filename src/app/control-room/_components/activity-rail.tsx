import type {
  ActivityTone,
  OperatorActivityEntry,
} from "../_data/control-room-data";
import styles from "../control-room.module.css";

const toneClasses: Record<ActivityTone, string> = {
  operator: "border-slate-200 bg-slate-100 text-slate-800",
  automation: "border-sky-200 bg-sky-50 text-sky-800",
  resolved: "border-emerald-200 bg-emerald-50 text-emerald-800",
};

const nodeClasses: Record<ActivityTone, string> = {
  operator: styles.activityNodeOperator,
  automation: styles.activityNodeAutomation,
  resolved: styles.activityNodeResolved,
};

export function ActivityRail({
  entries,
}: {
  entries: OperatorActivityEntry[];
}) {
  if (entries.length === 0) {
    return (
      <div className="rounded-[1.75rem] border border-dashed border-slate-300 bg-white/70 px-5 py-6">
        <p className="text-sm font-medium text-slate-800">
          No operator activity has been logged yet.
        </p>
        <p className="mt-2 text-sm leading-6 text-slate-600">
          Keep the rail mounted so fresh activity can appear without shifting
          the rest of the dashboard.
        </p>
      </div>
    );
  }

  return (
    <ol aria-label="Operator activity rail" className={styles.activityRail}>
      {entries.map((entry) => (
        <li
          key={entry.id}
          className={`${styles.activityNode} ${nodeClasses[entry.tone]}`}
        >
          <article className={`${styles.surfaceCard} p-5`}>
            <div className="flex flex-wrap items-center justify-between gap-3">
              <span
                className={`inline-flex rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] ${toneClasses[entry.tone]}`}
              >
                {entry.role}
              </span>
              <time className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                {entry.timestamp}
              </time>
            </div>

            <div className="mt-4 space-y-2">
              <h3 className="text-lg font-semibold tracking-tight text-slate-950">
                {entry.title}
              </h3>
              <p className="text-sm leading-6 text-slate-600">
                {entry.summary}
              </p>
            </div>

            <div className="mt-4 border-t border-slate-200/80 pt-4 text-sm text-slate-700">
              <p>
                <span className="font-semibold text-slate-950">Operator:</span>{" "}
                {entry.operator}
              </p>
              <p className="mt-2">
                <span className="font-semibold text-slate-950">Handoff:</span>{" "}
                {entry.handoff}
              </p>
            </div>
          </article>
        </li>
      ))}
    </ol>
  );
}
