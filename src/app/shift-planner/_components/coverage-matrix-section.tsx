import type {
  CoverageCell,
  CoverageLane,
  CoverageSegmentView,
} from "../_data/shift-planner-data";

type CoverageMatrixSectionProps = {
  segment: CoverageSegmentView;
};

const cellToneClassNames = {
  staffed: "border-emerald-200 bg-emerald-50/70 text-emerald-950",
  thin: "border-amber-200 bg-amber-50/80 text-amber-950",
  missing: "border-rose-200 bg-rose-50/80 text-rose-950",
  flex: "border-sky-200 bg-sky-50/80 text-sky-950",
};

const summaryToneClassNames = {
  steady: "border-emerald-200 bg-emerald-50/70 text-emerald-900",
  watch: "border-amber-200 bg-amber-50/80 text-amber-900",
  risk: "border-rose-200 bg-rose-50/80 text-rose-900",
};

function getCell(lane: CoverageLane, roleId: string) {
  const cell = lane.cells.find((item) => item.roleId === roleId);

  if (!cell) {
    throw new Error(`Missing coverage cell for role ${roleId} in lane ${lane.id}`);
  }

  return cell;
}

function formatCoverageValue(cell: CoverageCell) {
  return `${cell.assigned}/${cell.required}`;
}

export function CoverageMatrixSection({
  segment,
}: CoverageMatrixSectionProps) {
  const headingId = `${segment.id}-heading`;

  return (
    <article
      aria-labelledby={headingId}
      className="rounded-[1.8rem] border border-slate-200 bg-white/85 p-6 shadow-[0_24px_80px_rgba(15,23,42,0.08)]"
      role="listitem"
    >
      <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
        <div className="space-y-3">
          <div className="flex flex-wrap items-center gap-3">
            <p className="rounded-full border border-slate-300 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-600">
              {segment.window}
            </p>
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-500">
              {segment.supervisor}
            </p>
          </div>
          <div className="space-y-2">
            <h3
              id={headingId}
              className="text-2xl font-semibold tracking-tight text-slate-950"
            >
              {segment.label}
            </h3>
            <p className="max-w-3xl text-sm leading-7 text-slate-600">
              {segment.summary}
            </p>
          </div>
        </div>
      </div>

      <div className="mt-6 grid gap-3 sm:grid-cols-3">
        {segment.summaries.map((summary) => (
          <div
            key={summary.id}
            className={`rounded-[1.35rem] border px-4 py-4 ${summaryToneClassNames[summary.tone]}`}
          >
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em]">
              {summary.label}
            </p>
            <p className="mt-2 text-3xl font-semibold tracking-tight">
              {summary.value}
            </p>
            <p className="mt-2 text-sm leading-6 opacity-80">
              {summary.detail}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-6 overflow-x-auto">
        <table
          aria-label={segment.label}
          className="min-w-[1020px] w-full border-separate border-spacing-y-3"
        >
          <thead>
            <tr className="text-left align-bottom text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">
              <th className="px-3 pb-2">Lane</th>
              <th className="px-3 pb-2">Focus</th>
              {segment.columns.map((column) => (
                <th key={column.id} className="min-w-[10rem] px-3 pb-2">
                  <div className="space-y-1">
                    <span>{column.label}</span>
                    <p className="text-[10px] font-medium normal-case tracking-normal text-slate-400">
                      {column.detail}
                    </p>
                  </div>
                </th>
              ))}
              <th className="min-w-[15rem] px-3 pb-2">Coverage note</th>
            </tr>
          </thead>

          <tbody>
            {segment.lanes.map((lane) => (
              <tr key={lane.id} className="align-top">
                <th
                  className="rounded-l-[1.4rem] border border-r-0 border-slate-200 bg-slate-50/80 px-4 py-4 text-left"
                  scope="row"
                >
                  <div className="space-y-2">
                    <p className="text-base font-semibold tracking-tight text-slate-950">
                      {lane.label}
                    </p>
                    <p className="text-sm text-slate-600">{lane.lead}</p>
                  </div>
                </th>

                <td className="border border-l-0 border-r-0 border-slate-200 bg-slate-50/80 px-4 py-4">
                  <div className="space-y-2 text-sm text-slate-600">
                    <p className="font-medium text-slate-900">{lane.focus}</p>
                    <p>{lane.queueDepth}</p>
                  </div>
                </td>

                {segment.columns.map((column) => {
                  const cell = getCell(lane, column.id);

                  return (
                    <td
                      key={`${lane.id}-${column.id}`}
                      className="border border-l-0 border-r-0 border-slate-200 bg-slate-50/80 px-3 py-4"
                    >
                      <div
                        className={`rounded-[1.25rem] border px-3 py-3 ${cellToneClassNames[cell.tone]}`}
                      >
                        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] opacity-80">
                          {formatCoverageValue(cell)}
                        </p>
                        <p className="mt-2 text-sm font-semibold leading-5">
                          {cell.assignees}
                        </p>
                        <p className="mt-2 text-sm leading-6 opacity-80">
                          {cell.detail}
                        </p>
                      </div>
                    </td>
                  );
                })}

                <td className="rounded-r-[1.4rem] border border-l-0 border-slate-200 bg-slate-50/80 px-4 py-4">
                  <p className="text-sm leading-6 text-slate-600">{lane.note}</p>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </article>
  );
}
