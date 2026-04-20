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
        "rounded-[1.75rem] border p-5 shadow-lg shadow-black/10 backdrop-blur",
        getSummaryToneClasses(tone)
      )}
    >
      <p className="text-xs font-medium uppercase tracking-[0.24em] text-slate-300">
        {label}
      </p>
      <p className="mt-4 text-3xl font-semibold text-white">{value}</p>
      <p className="mt-3 text-sm leading-6 text-slate-300">{detail}</p>
    </article>
  );
}
