import type { CommandTagSummaryItem } from "../_lib/command-log";
import styles from "../command-log.module.css";

type CommandTagSummaryProps = {
  groups: CommandTagSummaryItem[];
  totalEvents: number;
};

export function CommandTagSummary({
  groups,
  totalEvents,
}: CommandTagSummaryProps) {
  return (
    <section
      aria-labelledby="command-tag-summary-title"
      className={`${styles.tagSection} rounded-[2rem] border border-slate-200/70 bg-[var(--surface)] p-5 shadow-[0_18px_65px_rgba(15,23,42,0.08)] sm:p-6`}
    >
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div className="space-y-2">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-500">
            Tag grouping
          </p>
          <h2
            id="command-tag-summary-title"
            className="text-3xl font-semibold tracking-tight text-slate-950"
          >
            Repeated patterns across {totalEvents} events
          </h2>
        </div>
        <p className="max-w-xl text-sm leading-6 text-slate-600">
          Tags cluster operational themes so reviewers can spot recurring
          rollout, mitigation, and escalation patterns quickly.
        </p>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {groups.map((group) => (
          <article
            key={group.tag}
            className={`${styles.tagCard} rounded-[1.5rem] border border-slate-200 bg-white/78 p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.8)]`}
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">
                  Tag
                </p>
                <h3 className="mt-2 text-xl font-semibold tracking-tight text-slate-950">
                  #{group.tag}
                </h3>
              </div>
              <span className="inline-flex rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-slate-700">
                {group.eventCount} events
              </span>
            </div>

            <div className="mt-4 space-y-3 text-sm text-slate-600">
              <p>
                <span className="font-semibold text-slate-950">Latest event:</span>{" "}
                {group.latestEventTitle}
              </p>
              <p>{group.latestEventLabel}</p>
              <p>
                <span className="font-semibold text-slate-950">Severity mix:</span>{" "}
                {group.severities.join(", ")}
              </p>
              <p>
                <span className="font-semibold text-slate-950">Categories:</span>{" "}
                {group.categories.join(", ")}
              </p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
