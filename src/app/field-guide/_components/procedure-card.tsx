import {
  fieldGuidePriorityStyles,
  getFieldGuideCategoryById,
  type FieldGuideProcedure,
} from "../_lib/field-guide-data";

type ProcedureCardProps = {
  procedure: FieldGuideProcedure;
  selected: boolean;
  onSelect: (procedureId: string) => void;
};

export function ProcedureCard({
  procedure,
  selected,
  onSelect,
}: ProcedureCardProps) {
  const category = getFieldGuideCategoryById(procedure.categoryId);
  const priorityStyle = fieldGuidePriorityStyles[procedure.priority];

  return (
    <button
      type="button"
      onClick={() => onSelect(procedure.id)}
      className={`w-full rounded-[1.9rem] border p-5 text-left transition ${
        selected
          ? "border-slate-950 bg-slate-950 text-white shadow-[0_28px_80px_-38px_rgba(15,23,42,0.9)]"
          : "border-slate-200/80 bg-white/85 text-slate-950 hover:border-slate-300 hover:bg-white"
      }`}
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <p
            className={`text-xs font-semibold uppercase tracking-[0.26em] ${
              selected ? "text-teal-200" : "text-slate-500"
            }`}
          >
            {category?.name ?? "Field Procedure"}
          </p>
          <h3 className="mt-2 text-xl font-semibold tracking-tight">
            {procedure.title}
          </h3>
          <p
            className={`mt-2 text-sm ${
              selected ? "text-slate-300" : "text-slate-500"
            }`}
          >
            {procedure.code} • {procedure.estimatedWindow}
          </p>
        </div>

        <span
          className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-semibold ${
            selected ? "border-white/15 bg-white/8 text-white" : priorityStyle.badge
          }`}
        >
          <span
            className={`h-2 w-2 rounded-full ${
              selected ? "bg-white" : priorityStyle.dot
            }`}
          />
          {procedure.priority}
        </span>
      </div>

      <p
        className={`mt-4 text-sm leading-7 ${
          selected ? "text-slate-200" : "text-slate-600"
        }`}
      >
        {procedure.summary}
      </p>

      <dl className="mt-5 grid gap-3 sm:grid-cols-2">
        <div
          className={`rounded-[1.4rem] border px-4 py-4 ${
            selected ? "border-white/10 bg-white/7" : "border-black/6 bg-black/[0.03]"
          }`}
        >
          <dt
            className={`text-xs font-semibold uppercase tracking-[0.2em] ${
              selected ? "text-slate-300" : "text-slate-500"
            }`}
          >
            Crew
          </dt>
          <dd className="mt-2 text-sm font-medium">{procedure.crew}</dd>
        </div>
        <div
          className={`rounded-[1.4rem] border px-4 py-4 ${
            selected ? "border-white/10 bg-white/7" : "border-black/6 bg-black/[0.03]"
          }`}
        >
          <dt
            className={`text-xs font-semibold uppercase tracking-[0.2em] ${
              selected ? "text-slate-300" : "text-slate-500"
            }`}
          >
            Scene Type
          </dt>
          <dd className="mt-2 text-sm font-medium">{procedure.sceneType}</dd>
        </div>
      </dl>

      <div className="mt-5 flex flex-wrap gap-2">
        {procedure.tags.map((tag) => (
          <span
            key={tag}
            className={`rounded-full px-3 py-1 text-xs font-medium ${
              selected
                ? "bg-white/10 text-slate-100"
                : "bg-slate-100 text-slate-700"
            }`}
          >
            {tag}
          </span>
        ))}
      </div>
    </button>
  );
}
