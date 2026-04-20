import Link from "next/link";

import type { AlertJournalView } from "../_lib/alert-journal";
import { AlertDayGroup } from "./alert-day-group";
import { AlertTagSummary } from "./alert-tag-summary";
import { ResolutionSummary } from "./resolution-summary";

type AlertJournalShellProps = {
  view: AlertJournalView;
};

export function AlertJournalShell({ view }: AlertJournalShellProps) {
  return (
    <main className="mx-auto flex w-full max-w-7xl flex-1 flex-col gap-8 px-6 py-8 sm:px-10 lg:px-12 lg:py-12">
      <section className="overflow-hidden rounded-[2.1rem] border border-slate-200/80 bg-[var(--surface)] shadow-[0_26px_100px_rgba(15,23,42,0.08)]">
        <div className="grid gap-8 px-6 py-8 sm:px-10 lg:grid-cols-[minmax(0,1.18fr)_minmax(300px,0.82fr)] lg:px-12 lg:py-11">
          <div className="space-y-6">
            <div className="flex flex-wrap items-center gap-3">
              <p className="rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-amber-800">
                Alert Journal
              </p>
              <p className="rounded-full bg-white px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-slate-500 shadow-[inset_0_0_0_1px_rgba(148,163,184,0.18)]">
                Route-local mock history
              </p>
            </div>

            <div className="space-y-4">
              <h1 className="max-w-4xl text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl lg:text-6xl">
                Daily alert groups, repeated tags, and one focused resolution panel.
              </h1>
              <p className="max-w-3xl text-base leading-8 text-slate-600 sm:text-lg">
                The journal compresses several days of alert history into one
                route: grouped incident notes on the left, repeated tag
                patterns in the middle, and a query-driven resolution detail
                panel that keeps the current focus visible.
              </p>
            </div>

            <div className="flex flex-col gap-4 sm:flex-row">
              <Link
                href="/"
                className="inline-flex items-center justify-center rounded-full bg-slate-950 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
              >
                Back to route index
              </Link>
              <a
                href="#alert-journal-history"
                className="inline-flex items-center justify-center rounded-full border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-700 transition hover:border-slate-950 hover:text-slate-950"
              >
                Jump to journal
              </a>
            </div>
          </div>

          <aside className="rounded-[1.85rem] border border-slate-200/80 bg-[linear-gradient(180deg,#0f172a_0%,#172033_100%)] p-6 text-white shadow-[0_26px_70px_rgba(15,23,42,0.2)]">
            <div className="space-y-5">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-amber-200/76">
                  Current focus
                </p>
                <h2 className="mt-3 text-3xl font-semibold tracking-tight">
                  {view.selectedAlert.title}
                </h2>
                <p className="mt-3 text-sm leading-7 text-white/72">
                  {view.selectedAlert.resolution.summary}
                </p>
              </div>

              <div className="grid gap-3">
                <div className="rounded-[1.35rem] border border-white/12 bg-white/8 px-4 py-4">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/54">
                    Resolution owner
                  </p>
                  <p className="mt-2 text-xl font-semibold">
                    {view.selectedAlert.resolution.owner}
                  </p>
                  <p className="mt-2 text-sm leading-6 text-white/60">
                    {view.selectedAlert.resolution.updatedLabel}
                  </p>
                </div>
                <div className="rounded-[1.35rem] border border-white/12 bg-white/8 px-4 py-4">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/54">
                    Active tags
                  </p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {view.selectedAlert.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-white/82"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="rounded-[1.35rem] border border-amber-300/24 bg-amber-300/10 px-4 py-4">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-amber-100/74">
                    Next step
                  </p>
                  <p className="mt-2 text-sm leading-6 text-amber-50">
                    {view.selectedAlert.resolution.nextStep}
                  </p>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </section>

      <section aria-labelledby="alert-journal-summary" className="space-y-5">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
          <div className="space-y-2">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">
              Summary metrics
            </p>
            <h2
              id="alert-journal-summary"
              className="text-3xl font-semibold tracking-tight text-slate-950"
            >
              Alert journal at a glance
            </h2>
          </div>
          <p className="max-w-3xl text-sm leading-7 text-slate-600">
            The counters below are derived from the same route-local journal
            data that feeds the grouped alerts and the selected resolution
            detail panel.
          </p>
        </div>

        <div aria-label="Alert journal summary metrics" className="grid gap-4 md:grid-cols-2 xl:grid-cols-4" role="list">
          {view.summaryMetrics.map((metric) => (
            <article
              key={metric.label}
              className="rounded-[1.55rem] border border-slate-200/80 bg-white/88 p-5 shadow-[0_16px_50px_rgba(15,23,42,0.05)]"
              role="listitem"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                {metric.label}
              </p>
              <p className="mt-3 text-3xl font-semibold tracking-tight text-slate-950">
                {metric.value}
              </p>
              <p className="mt-3 text-sm leading-6 text-slate-600">
                {metric.note}
              </p>
            </article>
          ))}
        </div>
      </section>

      <AlertTagSummary groups={view.tagSummary} totalAlerts={view.alerts.length} />

      <div
        className="grid gap-8 xl:grid-cols-[minmax(0,1.08fr)_minmax(360px,0.92fr)] xl:items-start"
        data-testid="alert-journal-panels"
      >
        <section
          id="alert-journal-history"
          aria-labelledby="alert-journal-history-heading"
          className="space-y-6"
        >
          <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
            <div className="space-y-2">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">
                Daily groups
              </p>
              <h2
                id="alert-journal-history-heading"
                className="text-3xl font-semibold tracking-tight text-slate-950"
              >
                Alert history grouped by day
              </h2>
            </div>
            <p className="max-w-3xl text-sm leading-7 text-slate-600">
              Select any alert card to keep its resolution detail pinned in the
              rail while the rest of the journal stays visible.
            </p>
          </div>

          {view.dayGroups.map((group) => (
            <AlertDayGroup
              key={group.day.id}
              day={group.day}
              alerts={group.alerts}
              selectedAlertId={view.selectedAlert.id}
            />
          ))}
        </section>

        <ResolutionSummary
          alert={view.selectedAlert}
          requestedAlertId={view.requestedAlertId}
          selectionFound={view.selectionFound}
        />
      </div>
    </main>
  );
}
