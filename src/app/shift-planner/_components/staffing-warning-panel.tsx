import type {
  CoverageSegment,
  OpenShiftWarning,
} from "../_data/shift-planner-data";
import styles from "../shift-planner.module.css";

type StaffingWarningPanelProps = {
  warnings: OpenShiftWarning[];
  segments: Pick<CoverageSegment, "id" | "label">[];
};

const severityClassNames = {
  watch: styles.toneWatch,
  critical: styles.toneCritical,
};

const warningCardToneClassNames = {
  watch: styles.warningWatch,
  critical: styles.warningCritical,
};

function getSegmentLabelMap(segments: Pick<CoverageSegment, "id" | "label">[]) {
  return Object.fromEntries(segments.map((segment) => [segment.id, segment.label]));
}

export function StaffingWarningPanel({
  warnings,
  segments,
}: StaffingWarningPanelProps) {
  const segmentLabelMap = getSegmentLabelMap(segments);
  const criticalWarnings = warnings.filter(
    (warning) => warning.severity === "critical",
  ).length;
  const seatGapTotal = warnings.reduce(
    (total, warning) => total + warning.seatGap,
    0,
  );

  return (
    <aside
      aria-labelledby="shift-planner-warnings"
      className={`${styles.panelCard} rounded-[1.8rem] p-6`}
    >
      <div className="space-y-6">
        <div className="space-y-3">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">
            Staffing warnings
          </p>
          <h2
            id="shift-planner-warnings"
            className="text-3xl font-semibold tracking-tight text-slate-950"
          >
            Open shift warnings
          </h2>
          <p className="text-sm leading-6 text-slate-600">
            Keep the seat gaps with the highest operational cost visible while
            staffing moves are still changing from segment to segment.
          </p>
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          <div className={`${styles.warningStat} rounded-[1.3rem] px-4 py-4`}>
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">
              Active warnings
            </p>
            <p className="mt-2 text-3xl font-semibold tracking-tight text-slate-950">
              {warnings.length}
            </p>
          </div>
          <div className={`${styles.warningStat} rounded-[1.3rem] px-4 py-4`}>
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">
              Critical warnings
            </p>
            <p className="mt-2 text-3xl font-semibold tracking-tight text-slate-950">
              {criticalWarnings}
            </p>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              {seatGapTotal} total uncovered seats are represented across the current warning set.
            </p>
          </div>
        </div>

        <div className="space-y-4" role="list" aria-label="Open shift warnings">
          {warnings.map((warning) => (
            <article
              key={warning.id}
              className={`${styles.warningCard} ${warningCardToneClassNames[warning.severity]} rounded-[1.45rem] p-5`}
              role="listitem"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="space-y-2">
                  <h3 className="text-xl font-semibold tracking-tight text-slate-950">
                    {warning.title}
                  </h3>
                  <p className="text-sm text-slate-600">
                    {warning.owner} · {warning.window}
                  </p>
                </div>

                <span
                  className={`${styles.toneBadge} ${severityClassNames[warning.severity]}`}
                >
                  {warning.severity}
                </span>
              </div>

              <p className="mt-4 text-sm leading-6 text-slate-600">
                {warning.summary}
              </p>

              <div className="mt-4 flex flex-wrap gap-2">
                {warning.affectedSegments.map((segmentId) => (
                  <span
                    key={`${warning.id}-${segmentId}`}
                    className={`${styles.segmentPill} rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-600`}
                  >
                    {segmentLabelMap[segmentId]}
                  </span>
                ))}
              </div>

              <div className={`${styles.infoBlock} mt-4 rounded-[1.2rem] px-4 py-4`}>
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">
                  Recommended move
                </p>
                <p className="mt-2 text-sm leading-6 text-slate-700">
                  {warning.action}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </aside>
  );
}
