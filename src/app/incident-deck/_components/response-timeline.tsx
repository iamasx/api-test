import type { TimelineEvent } from "../_data/incident-deck-data";
import styles from "../incident-deck.module.css";

type ResponseTimelineProps = {
  events: TimelineEvent[];
  incidentServiceById: Record<string, string>;
  windowLabel: string;
};

const toneClassNames = {
  critical: styles.toneCritical,
  watch: styles.toneWatch,
  steady: styles.toneSteady,
};

export function ResponseTimeline({
  events,
  incidentServiceById,
  windowLabel,
}: ResponseTimelineProps) {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
        <div className="space-y-2">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">
            Response chronology
          </p>
          <h2
            id="incident-response-timeline"
            className="text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl"
          >
            Response timeline
          </h2>
        </div>
        <p className="max-w-3xl text-sm leading-7 text-slate-600">
          Time window: {windowLabel}. Each entry captures the last sequence of
          detection, mitigation, communication, and handoff decisions.
        </p>
      </div>

      <div className={styles.timelineList} role="list" aria-label="Response timeline">
        {events.map((event) => {
          const linkedServices = event.linkedIncidentIds
            .map((incidentId) => incidentServiceById[incidentId])
            .filter(Boolean);

          return (
            <article
              key={event.id}
              className={`${styles.timelineItem} ${toneClassNames[event.tone]}`}
              role="listitem"
            >
              <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                <div className="space-y-3">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className={styles.chip}>
                      {event.type}
                    </span>
                    <span className="text-sm font-medium text-slate-700">
                      {event.loggedAt}
                    </span>
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-xl font-semibold tracking-tight text-slate-950">
                      {event.title}
                    </h3>
                    <p className="text-sm font-medium text-slate-700">
                      {event.actor}
                    </p>
                    <p className="max-w-4xl text-sm leading-7 text-slate-700">
                      {event.detail}
                    </p>
                  </div>
                </div>

                <div className={`${styles.metaBlock} lg:max-w-xs`}>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">
                    Linked incidents
                  </p>
                  <div className={`${styles.chipRow} mt-3`}>
                    {linkedServices.map((service) => (
                      <span key={`${event.id}-${service}`} className={styles.chip}>
                        {service}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}
