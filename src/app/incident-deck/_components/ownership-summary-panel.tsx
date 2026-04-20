import type {
  OwnershipCell,
  OwnershipSnapshot,
} from "../_data/incident-deck-data";
import styles from "../incident-deck.module.css";

type OwnershipSummaryPanelProps = {
  cells: OwnershipCell[];
  snapshot: OwnershipSnapshot;
  incidentServiceById: Record<string, string>;
};

const toneClassNames = {
  critical: styles.toneCritical,
  watch: styles.toneWatch,
  steady: styles.toneSteady,
};

export function OwnershipSummaryPanel({
  cells,
  snapshot,
  incidentServiceById,
}: OwnershipSummaryPanelProps) {
  return (
    <aside className={`${styles.stickyPanel} space-y-6`}>
      <div
        className={`${styles.darkPanel} rounded-[1.8rem] border border-slate-200 p-6 text-white`}
      >
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-400">
          Ownership posture
        </p>
        <h2
          id="incident-ownership-summary"
          className="mt-3 text-3xl font-semibold tracking-tight"
        >
          Ownership summary
        </h2>
        <p className="mt-3 text-sm leading-7 text-slate-300">
          The ownership rail tracks who currently holds mitigation, customer
          updates, and the next handoff across the response cells.
        </p>

        <div className={`${styles.summaryMetricGrid} mt-6`}>
          <div className="rounded-[1.3rem] border border-white/10 bg-white/8 px-4 py-4">
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400">
              Teams engaged
            </p>
            <p className="mt-2 text-3xl font-semibold">{snapshot.teamsEngaged}</p>
          </div>
          <div className="rounded-[1.3rem] border border-white/10 bg-white/8 px-4 py-4">
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400">
              Responders engaged
            </p>
            <p className="mt-2 text-3xl font-semibold">
              {snapshot.respondersEngaged}
            </p>
          </div>
          <div className="rounded-[1.3rem] border border-white/10 bg-white/8 px-4 py-4">
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400">
              Hot teams
            </p>
            <p className="mt-2 text-3xl font-semibold">{snapshot.hotTeams}</p>
          </div>
          <div className="rounded-[1.3rem] border border-white/10 bg-white/8 px-4 py-4">
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400">
              Stretched teams
            </p>
            <p className="mt-2 text-3xl font-semibold">
              {snapshot.stretchedTeams}
            </p>
          </div>
        </div>
      </div>

      <div className={styles.ownershipList} role="list" aria-label="Ownership summary">
        {cells.map((cell) => {
          const linkedServices = cell.activeIncidentIds
            .map((incidentId) => incidentServiceById[incidentId])
            .filter(Boolean);

          return (
            <article
              key={cell.id}
              className={`${styles.ownershipCard} ${toneClassNames[cell.tone]}`}
              role="listitem"
            >
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-500">
                    {cell.role}
                  </p>
                  <h3 className="mt-2 text-xl font-semibold tracking-tight text-slate-950">
                    {cell.team}
                  </h3>
                  <p className="mt-2 text-sm font-medium text-slate-700">
                    {cell.lead} · {cell.shift}
                  </p>
                </div>

                <span className={styles.chip}>
                  {cell.health}
                </span>
              </div>

              <div className={`${styles.metaGrid} mt-5`}>
                <div className={styles.metaBlock}>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">
                    Queue
                  </p>
                  <p className="mt-2 text-sm leading-6 text-slate-700">{cell.queue}</p>
                </div>
                <div className={styles.metaBlock}>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">
                    Responders
                  </p>
                  <p className="mt-2 text-sm leading-6 text-slate-700">
                    {cell.responders} active responders
                  </p>
                </div>
              </div>

              <div className="mt-5 space-y-4">
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">
                    Current focus
                  </p>
                  <p className="mt-2 text-sm leading-7 text-slate-700">
                    {cell.focus}
                  </p>
                </div>

                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">
                    Active incidents
                  </p>
                  <div className={`${styles.chipRow} mt-3`}>
                    {linkedServices.map((service) => (
                      <span key={`${cell.id}-${service}`} className={styles.chip}>
                        {service}
                      </span>
                    ))}
                  </div>
                </div>

                <div className={`${styles.darkNote} px-4 py-4 text-slate-50`}>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400">
                    Next handoff
                  </p>
                  <p className="mt-3 text-sm leading-7 text-slate-200">
                    {cell.nextHandoff}
                  </p>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </aside>
  );
}
