import { cn, getSummaryToneClasses, type SummaryTone } from "../utils";

type IncidentSummaryCardProps = {
  label: string;
  value: string;
  detail: string;
  tone: SummaryTone;
};

export function IncidentSummaryCard({
  label,
  value,
  detail,
  tone,
}: IncidentSummaryCardProps) {
  return (
    <article
      className={cn(
        "relative h-full overflow-hidden rounded-[1.75rem] border p-5 shadow-lg shadow-black/10 backdrop-blur",
        getSummaryToneClasses(tone)
      )}
    >
      <div className="absolute -right-6 -top-6 h-20 w-20 rounded-full bg-white/8 blur-2xl" />
      <div className="relative">
        <div className="flex items-center justify-between gap-3">
          <p className="text-xs font-medium uppercase tracking-[0.24em] text-slate-300">
            {label}
          </p>
          <span className="rounded-full border border-white/10 bg-black/15 px-2.5 py-1 text-[0.65rem] font-medium uppercase tracking-[0.22em] text-slate-300">
            Mock data
          </span>
        </div>
        <p className="mt-5 text-3xl font-semibold text-white">{value}</p>
        <p className="mt-3 text-sm leading-6 text-slate-300">{detail}</p>
      </div>
    </article>
  );
}
