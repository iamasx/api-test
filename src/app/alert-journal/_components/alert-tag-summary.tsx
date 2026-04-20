import type { AlertJournalTagSummaryItem } from "../_lib/alert-journal";
import styles from "../alert-journal.module.css";

type AlertTagSummaryProps = {
  groups: AlertJournalTagSummaryItem[];
  totalAlerts: number;
};

export function AlertTagSummary({
  groups,
  totalAlerts,
}: AlertTagSummaryProps) {
  return (
    <section aria-labelledby="alert-tag-summary" className="space-y-5">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
        <div className="space-y-2">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">
            Repeated patterns
          </p>
          <h2
            id="alert-tag-summary"
            className="text-3xl font-semibold tracking-tight text-slate-950"
          >
            Tag summary across {totalAlerts} alerts
          </h2>
        </div>
        <p className="max-w-3xl text-sm leading-7 text-slate-600">
          Each rollup highlights the latest alert that carried the tag plus the
          mix of services, severities, and resolution states behind the count.
        </p>
      </div>

      <div
        aria-label="Recurring alert tags"
        className={`${styles.tagGrid} grid gap-4 md:grid-cols-2 xl:grid-cols-3`}
        role="list"
      >
        {groups.map((group) => (
          <article
            key={group.tag}
            className={`${styles.tagCard} rounded-[1.6rem] border border-slate-200/80 p-5 shadow-[0_16px_50px_rgba(15,23,42,0.05)]`}
            role="listitem"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-amber-700">
                  #{group.tag}
                </p>
                <p className="mt-3 text-3xl font-semibold tracking-tight text-slate-950">
                  {group.alertCount}
                </p>
                <p className="mt-1 text-sm leading-6 text-slate-500">
                  alerts carried this tag
                </p>
              </div>

              <div className="rounded-[1.2rem] border border-slate-200 bg-slate-50 px-4 py-3 text-right">
                <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-500">
                  Latest seen
                </p>
                <p className="mt-2 text-sm font-semibold text-slate-900">
                  {group.latestAlertLabel}
                </p>
              </div>
            </div>

            <p className="mt-4 text-sm leading-6 text-slate-700">
              {group.latestAlertTitle}
            </p>

            <dl className="mt-5 grid gap-4 sm:grid-cols-3">
              <div>
                <dt className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">
                  Services
                </dt>
                <dd className="mt-2 text-sm leading-6 text-slate-700">
                  {group.services.join(" · ")}
                </dd>
              </div>
              <div>
                <dt className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">
                  Severities
                </dt>
                <dd className="mt-2 text-sm leading-6 text-slate-700">
                  {group.severities.join(" · ")}
                </dd>
              </div>
              <div>
                <dt className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">
                  Resolution
                </dt>
                <dd className="mt-2 text-sm leading-6 text-slate-700">
                  {group.statuses.join(" · ")}
                </dd>
              </div>
            </dl>
          </article>
        ))}
      </div>
    </section>
  );
}
