import type {
  CoverageCell,
  CoverageLane,
  CoverageSegmentView,
} from "../_data/shift-planner-data";
import styles from "../shift-planner.module.css";

type CoverageMatrixSectionProps = {
  segment: CoverageSegmentView;
};

const cellToneClassNames = {
  staffed: styles.coverageStaffed,
  thin: styles.coverageThin,
  missing: styles.coverageMissing,
  flex: styles.coverageFlex,
};

const summaryToneClassNames = {
  steady: styles.segmentMetricToneSteady,
  watch: styles.segmentMetricToneWatch,
  risk: styles.segmentMetricToneRisk,
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
      className={`${styles.segmentCard} rounded-[1.8rem] p-6`}
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
            className={`${styles.segmentMetric} ${summaryToneClassNames[summary.tone]} rounded-[1.35rem] px-4 py-4`}
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
          className={`${styles.matrixTable} min-w-[1020px] w-full`}
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
                  className={`${styles.laneCell} px-4 py-4 text-left`}
                  scope="row"
                >
                  <div className="space-y-2">
                    <p className="text-base font-semibold tracking-tight text-slate-950">
                      {lane.label}
                    </p>
                    <p className="text-sm text-slate-600">{lane.lead}</p>
                  </div>
                </th>

                <td className={`${styles.focusCell} px-4 py-4`}>
                  <div className="space-y-2 text-sm text-slate-600">
                    <p className="font-medium text-slate-900">{lane.focus}</p>
                    <p>{lane.queueDepth}</p>
                  </div>
                </td>

                {segment.columns.map((column) => {
                  const cell = getCell(lane, column.id);
                  const isFirstColumn = column.id === segment.columns[0]?.id;
                  const isLastColumn =
                    column.id === segment.columns[segment.columns.length - 1]?.id;

                  return (
                    <td
                      key={`${lane.id}-${column.id}`}
                      className={`${styles.coverageCellWrap} ${isFirstColumn ? styles.coverageCellWrapFirst : ""} ${isLastColumn ? styles.coverageCellWrapLast : ""} px-3 py-4`}
                    >
                      <div
                        className={`${styles.coverageCell} ${cellToneClassNames[cell.tone]}`}
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

                <td className={`${styles.noteCell} px-4 py-4`}>
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
