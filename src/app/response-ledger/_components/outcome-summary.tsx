import type { OutcomeSummary } from "../_data/response-ledger-data";

type OutcomeSummaryCardProps = {
  outcome: OutcomeSummary;
};

const resultStyles: Record<OutcomeSummary["result"], string> = {
  success: "border-emerald-200 bg-emerald-50 text-emerald-700",
  partial: "border-amber-200 bg-amber-50 text-amber-700",
  failed: "border-rose-200 bg-rose-50 text-rose-700",
  pending: "border-slate-200 bg-slate-50 text-slate-600",
};

export function OutcomeSummaryCard({ outcome }: OutcomeSummaryCardProps) {
  return (
    <div className={`rounded-2xl border px-5 py-4 ${resultStyles[outcome.result]}`}>
      <div className="flex items-center gap-2">
        <span className="text-sm font-semibold">{outcome.label}</span>
        <span className="rounded-full border border-current/20 px-2 py-0.5 text-[0.625rem] font-semibold uppercase tracking-wide">
          {outcome.result}
        </span>
      </div>
      <p className="mt-1.5 text-sm leading-snug opacity-80">{outcome.detail}</p>
    </div>
  );
}
