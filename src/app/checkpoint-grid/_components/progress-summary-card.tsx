import type { CheckpointProgressSummary } from "../_data/checkpoint-grid-data";

type ProgressSummaryCardProps = {
  summary: CheckpointProgressSummary;
};

const toneClassNames = {
  steady:
    "border-emerald-100 bg-[linear-gradient(180deg,rgba(236,253,245,0.95),rgba(255,255,255,0.86))]",
  watch:
    "border-amber-100 bg-[linear-gradient(180deg,rgba(255,247,237,0.95),rgba(255,255,255,0.86))]",
  risk:
    "border-rose-100 bg-[linear-gradient(180deg,rgba(255,241,242,0.95),rgba(255,255,255,0.86))]",
};

const accentClassNames = {
  steady: "bg-emerald-500",
  watch: "bg-amber-500",
  risk: "bg-rose-500",
};

export function ProgressSummaryCard({ summary }: ProgressSummaryCardProps) {
  return (
    <article
      className={`relative overflow-hidden rounded-[1.75rem] border p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.55)] ${toneClassNames[summary.tone]}`}
      role="listitem"
    >
      <span
        aria-hidden
        className={`absolute inset-y-0 left-0 w-1.5 rounded-full ${accentClassNames[summary.tone]}`}
      />
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
