import type { SignalEntry } from "../_data/priority-lab-data";
import styles from "../priority-lab.module.css";

const strengthLabels: Record<SignalEntry["strength"], string> = {
  strong: "Strong",
  moderate: "Moderate",
  weak: "Weak",
};

const strengthBadgeStyles: Record<SignalEntry["strength"], string> = {
  strong: "border-emerald-300/20 bg-emerald-300/10 text-emerald-50",
  moderate: "border-amber-300/20 bg-amber-300/10 text-amber-50",
  weak: "border-slate-300/20 bg-slate-300/10 text-slate-200",
};

type SignalSummaryProps = {
  signals: SignalEntry[];
};

export function SignalSummary({ signals }: SignalSummaryProps) {
  return (
    <section aria-label="Signal summary" className="space-y-5">
      <div className="space-y-2">
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-400">
          Ranking inputs
        </p>
        <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
          Signal summary
        </h2>
        <p className="max-w-2xl text-sm leading-6 text-slate-300">
          Key signals feeding into the priority model. Strength reflects how
          directly each signal influences the current ranking order.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3" role="list" aria-label="Signal entries">
        {signals.map((signal) => (
          <article
            key={signal.id}
            className={`${styles.signalCard} rounded-[1.5rem] border border-white/10 p-5`}
            role="listitem"
          >
            <div className="flex flex-wrap items-start justify-between gap-3">
              <h3 className="text-sm font-semibold text-white">{signal.label}</h3>
              <span
                className={`${styles.statusBadge} inline-flex rounded-full border px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] ${strengthBadgeStyles[signal.strength]}`}
              >
                {strengthLabels[signal.strength]}
              </span>
            </div>
            <p className="mt-3 text-2xl font-semibold tracking-tight text-white">
              {signal.value}
            </p>
            <p className="mt-2 text-sm leading-6 text-slate-300">{signal.detail}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
