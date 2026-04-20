import type { CommandLogEvent } from "../_lib/command-log-data";
import styles from "../command-log.module.css";

const severityClasses = {
  Critical: styles.severityCritical,
  High: styles.severityHigh,
  Moderate: styles.severityModerate,
  Low: styles.severityLow,
};

const statusClasses = {
  Completed: styles.statusCompleted,
  Watching: styles.statusWatching,
  "Needs follow-up": styles.statusNeedsFollowUp,
  Blocked: styles.statusBlocked,
};

type CommandEventDetailProps = {
  event: CommandLogEvent;
  requestedEventId?: string;
  selectionFound: boolean;
};

export function CommandEventDetail({
  event,
  requestedEventId,
  selectionFound,
}: CommandEventDetailProps) {
  return (
    <aside className="xl:sticky xl:top-8 xl:self-start">
      <section
        aria-label="Event detail"
        className={`${styles.detailPanel} rounded-[2rem] border border-white/10 bg-slate-950 p-5 text-slate-100 shadow-[0_24px_90px_rgba(15,23,42,0.18)] sm:p-6`}
      >
        <div className="space-y-5">
          <div className="space-y-3">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-amber-200/80">
              Detail panel
            </p>
            <div className="space-y-3">
              <h2 className="text-3xl font-semibold tracking-tight text-white">
                {event.title}
              </h2>
              <p className="text-base leading-7 text-slate-300">
                {event.detail}
              </p>
            </div>
          </div>

          {!selectionFound && requestedEventId ? (
            <p
              role="status"
              className="rounded-[1.25rem] border border-amber-300/40 bg-amber-300/10 px-4 py-3 text-sm leading-6 text-amber-100"
            >
              Event ID{" "}
              <span className="font-semibold text-amber-50">
                {requestedEventId}
              </span>{" "}
              was not found. Showing the latest command entry instead.
            </p>
          ) : null}

          <div
            className={`${styles.detailSection} rounded-[1.5rem] border border-white/10 bg-white/6 p-4`}
          >
            <div className="flex flex-wrap gap-2">
              <span
                className={`${styles.badge} ${severityClasses[event.severity]} inline-flex rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em]`}
              >
                {event.severity}
              </span>
              <span className="inline-flex rounded-full border border-white/10 bg-white/8 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-slate-100">
                {event.category}
              </span>
              <span
                className={`${styles.badge} ${statusClasses[event.status]} inline-flex rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em]`}
              >
                {event.status}
              </span>
            </div>

            <dl className="mt-4 grid gap-3 sm:grid-cols-2">
              <div
                className={`${styles.detailInnerCard} rounded-[1rem] border border-white/10 bg-slate-900/80 p-4`}
              >
                <dt className="text-xs uppercase tracking-[0.18em] text-slate-400">
                  Timestamp
                </dt>
                <dd className="mt-2 text-sm font-medium text-white">
                  {event.occurredLabel}
                </dd>
              </div>
              <div
                className={`${styles.detailInnerCard} rounded-[1rem] border border-white/10 bg-slate-900/80 p-4`}
              >
                <dt className="text-xs uppercase tracking-[0.18em] text-slate-400">
                  Team
                </dt>
                <dd className="mt-2 text-sm font-medium text-white">
                  {event.team}
                </dd>
              </div>
              <div
                className={`${styles.detailInnerCard} rounded-[1rem] border border-white/10 bg-slate-900/80 p-4`}
              >
                <dt className="text-xs uppercase tracking-[0.18em] text-slate-400">
                  Actor
                </dt>
                <dd className="mt-2 text-sm font-medium text-white">
                  {event.actor}
                </dd>
              </div>
              <div
                className={`${styles.detailInnerCard} rounded-[1rem] border border-white/10 bg-slate-900/80 p-4`}
              >
                <dt className="text-xs uppercase tracking-[0.18em] text-slate-400">
                  Environment
                </dt>
                <dd className="mt-2 text-sm font-medium text-white">
                  {event.environment}
                </dd>
              </div>
            </dl>
          </div>

          <section
            className={`${styles.detailSection} rounded-[1.5rem] border border-white/10 bg-white/6 p-4`}
          >
            <h3 className="text-xl font-semibold text-white">Command context</h3>
            <p className="mt-3 text-sm leading-6 text-slate-300">
              {event.summary}
            </p>
            <div
              className={`${styles.detailInnerCard} mt-4 rounded-[1rem] border border-white/10 bg-slate-900/80 p-4`}
            >
              <p className="text-xs uppercase tracking-[0.18em] text-slate-400">
                Executed command
              </p>
              <code className="mt-3 block whitespace-pre-wrap text-sm leading-6 text-cyan-100">
                {event.command}
              </code>
            </div>
          </section>

          <section
            className={`${styles.detailSection} rounded-[1.5rem] border border-white/10 bg-white/6 p-4`}
          >
            <h3 className="text-xl font-semibold text-white">Related services</h3>
            <div className="mt-4 flex flex-wrap gap-2">
              {event.relatedServices.map((service) => (
                <span
                  key={`${event.id}-${service}`}
                  className={`${styles.servicePill} inline-flex rounded-full border px-3 py-1 text-sm font-medium text-slate-100`}
                >
                  {service}
                </span>
              ))}
            </div>
          </section>

          <section
            className={`${styles.detailSection} rounded-[1.5rem] border border-white/10 bg-white/6 p-4`}
          >
            <h3 className="text-xl font-semibold text-white">Operator notes</h3>
            <ul className={`${styles.notesList} mt-4 space-y-3`}>
              {event.notes.map((note) => (
                <li
                  key={`${event.id}-${note}`}
                  className={`${styles.noteCard} rounded-[1rem] border border-white/10 bg-slate-900/80 px-4 py-3 text-sm leading-6 text-slate-200`}
                >
                  {note}
                </li>
              ))}
            </ul>
          </section>

          <section
            className={`${styles.detailSection} rounded-[1.5rem] border border-white/10 bg-white/6 p-4`}
          >
            <h3 className="text-xl font-semibold text-white">Next action</h3>
            <p className="mt-3 text-sm leading-6 text-slate-200">
              {event.nextAction}
            </p>
          </section>
        </div>
      </section>
    </aside>
  );
}
