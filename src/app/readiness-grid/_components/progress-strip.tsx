import type { ProgressEntry } from "../_data/readiness-grid-data";
import styles from "../readiness-grid.module.css";

const fillColor = (pct: number): string => {
  if (pct === 100) return "bg-emerald-400";
  if (pct >= 60) return "bg-amber-400";
  if (pct > 0) return "bg-rose-400";
  return "bg-slate-500";
};

type ProgressStripProps = {
  entries: ProgressEntry[];
};

export function ProgressStrip({ entries }: ProgressStripProps) {
  return (
    <section aria-label="Progress strip" className="space-y-5">
      <div className="space-y-2">
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-400">
          Progress
        </p>
        <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
          Completion across workstreams
        </h2>
        <p className="max-w-2xl text-sm leading-6 text-slate-300">
          A compact progress strip showing check completion for each tracked
          workstream at a glance.
        </p>
      </div>

      <div
        className={`${styles.progressStrip} rounded-[1.5rem] border border-white/10 p-6`}
        role="list"
        aria-label="Progress entries"
      >
        <div className="space-y-5">
          {entries.map((entry) => {
            const pct = entry.total > 0 ? Math.round((entry.current / entry.total) * 100) : 0;
            return (
              <div key={entry.id} className="space-y-2" role="listitem">
                <div className="flex items-baseline justify-between gap-3">
                  <p className="text-sm font-semibold text-white">{entry.label}</p>
                  <p className="text-xs tabular-nums text-slate-400">
                    {entry.current}/{entry.total}
                  </p>
                </div>
                <div className={styles.progressBar}>
                  <div
                    className={`${styles.progressFill} ${fillColor(pct)} h-2`}
                    style={{ width: `${pct}%` }}
                    role="progressbar"
                    aria-valuenow={entry.current}
                    aria-valuemin={0}
                    aria-valuemax={entry.total}
                    aria-label={`${entry.label} progress`}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
