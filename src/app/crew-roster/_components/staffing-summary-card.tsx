import type { StaffingSummary } from "../_data/crew-roster-data";
import styles from "../crew-roster.module.css";

const toneClasses = {
  stable: "border-emerald-200 bg-emerald-50/80 text-emerald-950",
  watch: "border-amber-200 bg-amber-50/80 text-amber-950",
  thin: "border-rose-200 bg-rose-50/80 text-rose-950",
} satisfies Record<StaffingSummary["tone"], string>;

export function StaffingSummaryCard({ summary }: { summary: StaffingSummary }) {
  return (
    <article
      role="listitem"
      className={`flex h-full flex-col gap-4 rounded-[1.5rem] border p-5 shadow-[0_18px_40px_rgba(15,23,42,0.06)] ${styles.summaryCard} ${toneClasses[summary.tone]}`}
    >
      <div className="space-y-2">
        <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-current/65">
          {summary.label}
        </p>
        <p className="text-4xl font-semibold tracking-tight">{summary.value}</p>
      </div>

      <p className="text-sm leading-6 text-current/75">{summary.detail}</p>
    </article>
  );
}
