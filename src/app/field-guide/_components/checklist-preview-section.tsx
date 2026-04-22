"use client";

import {
  fieldGuideChecklistTypeStyles,
  type FieldGuideProcedure,
  type ProcedureChecklistItem,
} from "../_lib/field-guide-data";

type ChecklistPreviewSectionProps = {
  procedures: FieldGuideProcedure[];
};

type AggregatedChecklistEntry = {
  procedureTitle: string;
  procedureCode: string;
  item: ProcedureChecklistItem;
};

function aggregateChecklists(
  procedures: FieldGuideProcedure[],
): AggregatedChecklistEntry[] {
  return procedures.flatMap((procedure) =>
    procedure.checklist.map((item) => ({
      procedureTitle: procedure.title,
      procedureCode: procedure.code,
      item,
    })),
  );
}

const typeOrder: ProcedureChecklistItem["type"][] = [
  "Required",
  "Verify on site",
  "Recommended",
];

function groupByType(entries: AggregatedChecklistEntry[]) {
  return typeOrder
    .map((type) => ({
      type,
      entries: entries.filter((entry) => entry.item.type === type),
    }))
    .filter((group) => group.entries.length > 0);
}

export function ChecklistPreviewSection({
  procedures,
}: ChecklistPreviewSectionProps) {
  const allEntries = aggregateChecklists(procedures);
  const grouped = groupByType(allEntries);

  const typeCounts = typeOrder.reduce(
    (counts, type) => {
      counts[type] = allEntries.filter((e) => e.item.type === type).length;
      return counts;
    },
    {} as Record<ProcedureChecklistItem["type"], number>,
  );

  return (
    <section
      aria-label="Checklist preview"
      className="rounded-[2rem] border border-slate-200/80 bg-white/82 p-6 shadow-[0_18px_70px_-42px_rgba(15,23,42,0.45)]"
    >
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-500">
            Checklist Preview
          </p>
          <h2 className="mt-2 text-2xl font-semibold tracking-tight text-slate-950">
            Action checks across all procedures
          </h2>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">
            A consolidated view of every checklist item grouped by check type.
            Required items appear first so critical actions stay visible.
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          {typeOrder.map((type) => (
            <span
              key={type}
              className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-semibold ${fieldGuideChecklistTypeStyles[type]}`}
            >
              <span>{typeCounts[type]}</span>
              <span>{type}</span>
            </span>
          ))}
        </div>
      </div>

      <div className="mt-6 grid gap-5">
        {grouped.map((group) => (
          <div key={group.type}>
            <div className="flex items-center gap-3">
              <h3
                className={`inline-flex rounded-full border px-3 py-1 text-xs font-semibold ${fieldGuideChecklistTypeStyles[group.type]}`}
              >
                {group.type}
              </h3>
              <span className="text-xs font-medium text-slate-500">
                {group.entries.length} check
                {group.entries.length === 1 ? "" : "s"}
              </span>
            </div>

            <ul className="mt-3 grid gap-3 md:grid-cols-2">
              {group.entries.map((entry) => (
                <li
                  key={entry.item.id}
                  className="rounded-[1.4rem] border border-slate-200/80 bg-white/78 px-4 py-4 shadow-[0_8px_30px_-18px_rgba(15,23,42,0.2)]"
                >
                  <p className="text-sm font-semibold leading-6 text-slate-950">
                    {entry.item.label}
                  </p>
                  <p className="mt-2 text-sm leading-6 text-slate-600">
                    {entry.item.detail}
                  </p>
                  <p className="mt-3 text-xs font-medium text-slate-500">
                    {entry.procedureCode} — {entry.procedureTitle}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="mt-6 rounded-[1.5rem] border border-slate-200/60 bg-slate-50/70 px-5 py-4">
        <p className="text-sm leading-6 text-slate-600">
          <span className="font-semibold text-slate-950">
            {allEntries.length} total checks
          </span>{" "}
          across {procedures.length} procedure
          {procedures.length === 1 ? "" : "s"}. Use the filter controls above to
          narrow procedures and this preview will update to reflect the active
          set.
        </p>
      </div>
    </section>
  );
}
