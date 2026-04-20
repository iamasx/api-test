import type { ReadinessSummary } from "../_data/checkpoint-board-data";

type ReadinessSummaryCardProps = {
  summary: ReadinessSummary;
};

const toneClassNames = {
  steady: "border-emerald-200 bg-emerald-50/70",
  watch: "border-amber-200 bg-amber-50/80",
  risk: "border-rose-200 bg-rose-50/80",
};

export function ReadinessSummaryCard({ summary }: ReadinessSummaryCardProps) {
  return (
    <article
      className={`rounded-[1.5rem] border px-5 py-5 shadow-[0_18px_40px_rgba(15,23,42,0.05)] ${toneClassNames[summary.tone]}`}
      role="listitem"
    >
      <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-500">
        {summary.label}
      </p>
      <p className="mt-3 text-3xl font-semibold tracking-tight text-slate-950">
        {summary.value}
      </p>
      <p className="mt-3 text-sm leading-6 text-slate-600">{summary.detail}</p>
      <p className="mt-4 text-sm font-medium leading-6 text-slate-800">
        {summary.support}
      </p>
    </article>
  );
}
