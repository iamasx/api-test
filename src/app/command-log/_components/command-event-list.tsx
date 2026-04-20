import Link from "next/link";

import type {
  CommandEventCategory,
  CommandEventSeverity,
  CommandEventStatus,
  CommandLogEvent,
} from "../_lib/command-log-data";
import styles from "../command-log.module.css";

const severityClasses: Record<CommandEventSeverity, string> = {
  Critical: styles.severityCritical,
  High: styles.severityHigh,
  Moderate: styles.severityModerate,
  Low: styles.severityLow,
};

const categoryClasses: Record<CommandEventCategory, string> = {
  Deploy: "bg-white/10 text-white",
  Mitigation: "bg-cyan-500/12 text-cyan-100",
  Investigation: "bg-indigo-500/12 text-indigo-100",
  Escalation: "bg-rose-500/12 text-rose-100",
  Automation: "bg-emerald-500/12 text-emerald-100",
  Handoff: "bg-amber-500/12 text-amber-100",
};

const statusClasses: Record<CommandEventStatus, string> = {
  Completed: styles.statusCompleted,
  Watching: styles.statusWatching,
  "Needs follow-up": styles.statusNeedsFollowUp,
  Blocked: styles.statusBlocked,
};

type CommandEventListProps = {
  events: CommandLogEvent[];
  selectedEventId: string;
};

export function CommandEventList({
  events,
  selectedEventId,
}: CommandEventListProps) {
  return (
    <section
      aria-labelledby="command-event-list-title"
      className={`${styles.eventSection} rounded-[2rem] border border-white/10 bg-slate-950/88 p-5 shadow-[0_24px_90px_rgba(15,23,42,0.2)] sm:p-6`}
    >
      <div className="space-y-3">
        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-cyan-200/75">
          Chronological feed
        </p>
        <div className="space-y-2">
          <h2
            id="command-event-list-title"
            className="text-3xl font-semibold tracking-tight text-white"
          >
            Review command activity in order
          </h2>
          <p className="max-w-2xl text-base leading-7 text-slate-300">
            Each event links into the detail panel so the route stays focused on
            a single selected command record at a time.
          </p>
        </div>
      </div>

      <ol aria-label="Chronological events" className={`${styles.feedList} space-y-4`}>
        {events.map((event) => {
          const isSelected = event.id === selectedEventId;

          return (
            <li key={event.id} className={styles.feedItem}>
              <Link
                aria-current={isSelected ? "page" : undefined}
                aria-label={`${isSelected ? "Viewing detail for" : "View detail for"} ${event.title}`}
                href={`/command-log?event=${event.id}`}
                className={`${styles.eventCard} ${
                  isSelected ? styles.eventCardSelected : ""
                } block rounded-[1.6rem] border p-5 transition hover:-translate-y-0.5 hover:border-cyan-300/40 hover:bg-slate-900/90 ${
                  isSelected
                    ? "border-cyan-300/45 bg-slate-900 text-white shadow-[0_18px_60px_rgba(8,145,178,0.18)]"
                    : "border-white/10 bg-slate-900/65 text-slate-100"
                }`}
              >
                <article className="space-y-4">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div className="flex flex-wrap gap-2">
                      <span
                        className={`${styles.badge} inline-flex rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] ${severityClasses[event.severity]}`}
                      >
                        {event.severity}
                      </span>
                      <span
                        className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] ${categoryClasses[event.category]}`}
                      >
                        {event.category}
                      </span>
                      <span
                        className={`${styles.badge} ${statusClasses[event.status]} inline-flex rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em]`}
                      >
                        {event.status}
                      </span>
                    </div>
                    <time
                      dateTime={event.occurredAt}
                      className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400"
                    >
                      {event.occurredLabel}
                    </time>
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-xl font-semibold tracking-tight text-white">
                      {event.title}
                    </h3>
                    <p className="text-sm leading-6 text-slate-300">
                      {event.summary}
                    </p>
                  </div>

                  <div className="grid gap-3 text-sm text-slate-300 sm:grid-cols-2">
                    <p>
                      <span className="font-semibold text-white">Actor:</span>{" "}
                      {event.actor}
                    </p>
                    <p>
                      <span className="font-semibold text-white">Scope:</span>{" "}
                      {event.environment}
                    </p>
                    <p className="sm:col-span-2">
                      <span className="font-semibold text-white">Command:</span>{" "}
                      <code className="rounded bg-white/8 px-2 py-1 text-[13px] text-cyan-100">
                        {event.command}
                      </code>
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {event.tags.map((tag) => (
                      <span
                        key={`${event.id}-${tag}`}
                        className={`${styles.tagPill} inline-flex rounded-full border px-3 py-1 text-xs font-medium`}
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </article>
              </Link>
            </li>
          );
        })}
      </ol>
    </section>
  );
}
