import {
  fieldGuideChecklistTypeStyles,
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
  const accent = category?.accent ?? "from-slate-200/70 via-slate-100/80 to-transparent";

  return (
    <button
      type="button"
      aria-label={procedure.title}
      onClick={() => onSelect(procedure.id)}
      className={`w-full rounded-[1.9rem] border p-5 text-left transition ${
        selected
          ? "border-slate-950 bg-slate-950 text-white shadow-[0_28px_80px_-38px_rgba(15,23,42,0.9)]"
          : "border-slate-200/80 bg-white/85 text-slate-950 hover:border-slate-300 hover:bg-white"
      }`}
    >
      <div className={`rounded-[1.5rem] bg-gradient-to-br p-[1px] ${accent}`}>
        <div
          className={`rounded-[calc(1.5rem-1px)] px-4 py-4 ${
            selected ? "bg-slate-900/92" : "bg-white/86"
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
                selected
                  ? "border-white/15 bg-white/8 text-white"
                  : priorityStyle.badge
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
        </div>
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

      <div className="mt-5 flex flex-wrap items-center gap-2">
        <span
          className={`rounded-full px-3 py-1 text-xs font-semibold ${
            selected
              ? "bg-white/10 text-slate-100"
              : "bg-slate-900 text-white"
          }`}
        >
          {procedure.steps.length} steps
        </span>
        <span
          className={`rounded-full px-3 py-1 text-xs font-semibold ${
            selected
              ? "bg-white/10 text-slate-100"
              : "bg-teal-100 text-teal-900"
          }`}
        >
          {procedure.checklist.length} checklist items
        </span>
        {procedure.focusAreas.slice(0, 2).map((focusArea) => (
          <span
            key={focusArea}
            className={`rounded-full px-3 py-1 text-xs font-medium ${
              selected
                ? "bg-white/10 text-slate-100"
                : "bg-slate-100 text-slate-700"
            }`}
          >
            {focusArea}
          </span>
        ))}
      </div>

      <div
        className={`mt-5 rounded-[1.4rem] border px-4 py-4 ${
          selected
            ? "border-white/10 bg-white/7"
            : "border-black/6 bg-black/[0.03]"
        }`}
      >
        <div className="flex items-center justify-between gap-3">
          <p
            className={`text-xs font-semibold uppercase tracking-[0.2em] ${
              selected ? "text-slate-300" : "text-slate-500"
            }`}
          >
            Checklist Preview
          </p>
          <span
            className={`text-xs font-medium ${
              selected ? "text-slate-300" : "text-slate-500"
            }`}
          >
            {procedure.checklist.length} total
          </span>
        </div>
        <ul className="mt-3 space-y-3">
          {procedure.checklist.slice(0, 1).map((item) => (
            <li
              key={item.id}
              className={`rounded-[1.1rem] border px-3 py-3 ${
                selected
                  ? "border-white/8 bg-white/[0.04]"
                  : "border-slate-200 bg-white/75"
              }`}
            >
              <div className="flex flex-wrap items-start justify-between gap-3">
                <p className="text-sm font-medium leading-6">{item.label}</p>
                <span
                  className={`inline-flex rounded-full border px-2.5 py-1 text-[11px] font-semibold ${fieldGuideChecklistTypeStyles[item.type]}`}
                >
                  {item.type}
                </span>
              </div>
            </li>
          ))}
        </ul>
        {procedure.checklist.length > 1 ? (
          <p
            className={`mt-3 text-xs font-medium ${
              selected ? "text-slate-300" : "text-slate-500"
            }`}
          >
            +{procedure.checklist.length - 1} more checks in the detail panel
          </p>
        ) : null}
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {procedure.tags.slice(0, 2).map((tag) => (
          <span
            key={tag}
            className={`rounded-full px-3 py-1 text-xs font-medium ${
              selected ? "bg-white/10 text-slate-100" : "bg-slate-100 text-slate-700"
            }`}
          >
            {tag}
          </span>
        ))}
      </div>
    </button>
  );
}
