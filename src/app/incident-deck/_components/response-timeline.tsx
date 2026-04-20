import type { TimelineEvent } from "../_data/incident-deck-data";

type ResponseTimelineProps = {
  events: TimelineEvent[];
  incidentServiceById: Record<string, string>;
  windowLabel: string;
};

const toneClassNames = {
  critical: "border-rose-300/70 bg-rose-50/80",
  watch: "border-amber-300/70 bg-amber-50/80",
  steady: "border-emerald-300/70 bg-emerald-50/80",
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

      <div className="grid gap-4" role="list" aria-label="Response timeline">
        {events.map((event) => {
          const linkedServices = event.linkedIncidentIds
            .map((incidentId) => incidentServiceById[incidentId])
            .filter(Boolean);

          return (
            <article
              key={event.id}
              className={`rounded-[1.5rem] border p-5 shadow-[0_18px_48px_rgba(15,23,42,0.06)] ${toneClassNames[event.tone]}`}
              role="listitem"
            >
              <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                <div className="space-y-3">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="inline-flex rounded-full border border-slate-300 bg-white/90 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-slate-700">
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

                <div className="rounded-[1.2rem] border border-slate-200 bg-white/80 px-4 py-4 lg:max-w-xs">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">
                    Linked incidents
                  </p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {linkedServices.map((service) => (
                      <span
                        key={`${event.id}-${service}`}
                        className="inline-flex rounded-full border border-slate-300 bg-slate-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-slate-700"
                      >
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
