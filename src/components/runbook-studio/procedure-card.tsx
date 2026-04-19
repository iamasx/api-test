import type { Procedure } from "./runbook-studio-data";

const validationClasses = {
  ready: "border-emerald-200 bg-emerald-50 text-emerald-900",
  watch: "border-amber-200 bg-amber-50 text-amber-900",
  blocked: "border-rose-200 bg-rose-50 text-rose-900",
} as const;

type ProcedureCardProps = {
  procedure: Procedure;
  completedCount: number;
  isSelected: boolean;
  onSelect: (procedureId: string) => void;
};

export default function ProcedureCard({
  procedure,
  completedCount,
  isSelected,
  onSelect,
}: ProcedureCardProps) {
  return (
    <button
      className={`rounded-[1.75rem] border p-5 text-left transition ${isSelected ? "border-slate-950 bg-slate-950 text-white shadow-[0_20px_70px_rgba(15,23,42,0.2)]" : "border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50"}`}
      onClick={() => onSelect(procedure.id)}
      type="button"
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className={`text-xs font-semibold uppercase tracking-[0.3em] ${isSelected ? "text-slate-300" : "text-slate-500"}`}>{procedure.section}</p>
          <h2 className="mt-2 text-xl font-semibold">{procedure.title}</h2>
        </div>
        <span className={`rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] ${isSelected ? "border-white/15 bg-white/10 text-white" : validationClasses[procedure.validation.tone]}`}>
          {procedure.validation.label}
        </span>
      </div>
      <p className={`mt-3 text-sm leading-6 ${isSelected ? "text-slate-200" : "text-slate-600"}`}>{procedure.summary}</p>
      <div className="mt-5 grid gap-3 sm:grid-cols-3">
        <div>
          <p className={`text-xs uppercase tracking-[0.24em] ${isSelected ? "text-slate-400" : "text-slate-500"}`}>Owner</p>
          <p className="mt-1 text-sm font-medium">{procedure.owner}</p>
        </div>
        <div>
          <p className={`text-xs uppercase tracking-[0.24em] ${isSelected ? "text-slate-400" : "text-slate-500"}`}>Duration</p>
          <p className="mt-1 text-sm font-medium">{procedure.duration}</p>
        </div>
        <div>
          <p className={`text-xs uppercase tracking-[0.24em] ${isSelected ? "text-slate-400" : "text-slate-500"}`}>Checklist</p>
          <p className="mt-1 text-sm font-medium">{completedCount}/{procedure.steps.length} done</p>
        </div>
      </div>
      <p className={`mt-4 text-sm ${isSelected ? "text-slate-300" : "text-slate-600"}`}>{procedure.validation.note}</p>
      <div className="mt-4 flex flex-wrap gap-2">
        {procedure.markers.map((marker) => (
          <span className={`rounded-full px-3 py-1 text-xs ${isSelected ? "bg-white/10 text-slate-100" : "bg-slate-100 text-slate-600"}`} key={marker}>
            {marker}
          </span>
        ))}
      </div>
    </button>
  );
}
