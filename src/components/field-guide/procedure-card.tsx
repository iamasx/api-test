import type { Procedure } from "@/components/field-guide/field-guide-data";

type ProcedureCardProps = {
  procedure: Procedure;
  completedCount: number;
  isSelected: boolean;
  onSelect: (procedureId: string) => void;
};

const statusClasses = {
  Ready: "bg-emerald-100 text-emerald-800",
  "In Review": "bg-amber-100 text-amber-800",
  Draft: "bg-slate-200 text-slate-700",
} as const;

export default function ProcedureCard({
  procedure,
  completedCount,
  isSelected,
  onSelect,
}: ProcedureCardProps) {
  return (
    <button
      aria-label={`Open procedure: ${procedure.title}`}
      className={`w-full rounded-[1.75rem] border p-5 text-left shadow-lg transition ${
        isSelected
          ? "border-sky-400 bg-sky-50 shadow-sky-100"
          : "border-slate-200/70 bg-white/90 shadow-slate-200/40 hover:-translate-y-0.5 hover:border-slate-300"
      }`}
      onClick={() => onSelect(procedure.id)}
      type="button"
    >
      <div className="flex flex-wrap items-center gap-2">
        <span className="rounded-full bg-slate-950 px-3 py-1 text-xs font-semibold text-slate-50">
          {procedure.team}
        </span>
        <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">
          {procedure.difficulty}
        </span>
        <span
          className={`rounded-full px-3 py-1 text-xs font-semibold ${statusClasses[procedure.status]}`}
        >
          {procedure.status}
        </span>
      </div>
      <h2 className="mt-4 text-2xl font-semibold tracking-tight text-slate-950">
        {procedure.title}
      </h2>
      <p className="mt-3 text-sm leading-6 text-slate-600">
        {procedure.summary}
      </p>
      <div className="mt-4 flex flex-wrap gap-2">
        {procedure.tags.map((tag) => (
          <span
            key={tag}
            className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600"
          >
            #{tag}
          </span>
        ))}
      </div>
      <div className="mt-5 flex flex-wrap items-center justify-between gap-3 text-sm text-slate-500">
        <span>{procedure.duration}</span>
        <span>
          {completedCount} of {procedure.checklist.length} steps complete
        </span>
      </div>
    </button>
  );
}
