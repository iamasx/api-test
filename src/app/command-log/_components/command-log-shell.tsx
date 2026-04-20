import { CommandEventDetail } from "./command-event-detail";
import { CommandEventList } from "./command-event-list";
import { CommandTagSummary } from "./command-tag-summary";
import type { CommandLogView } from "../_lib/command-log";

type CommandLogShellProps = {
  view: CommandLogView;
};

export function CommandLogShell({ view }: CommandLogShellProps) {
  return (
    <main className="mx-auto flex w-full max-w-7xl flex-1 flex-col gap-8 px-6 py-8 sm:px-10 lg:px-12">
      <section className="overflow-hidden rounded-[2rem] border border-slate-200/80 bg-[var(--surface)] shadow-[0_20px_90px_rgba(15,23,42,0.08)]">
        <div className="grid gap-8 px-6 py-8 sm:px-10 lg:grid-cols-[minmax(0,1.15fr)_minmax(280px,0.85fr)] lg:px-12 lg:py-10">
          <div className="space-y-5">
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-amber-700">
              Command log
            </p>
            <div className="space-y-3">
              <h1 className="max-w-4xl text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl">
                Chronological command events, grouped signals, and one focused
                detail panel.
              </h1>
              <p className="max-w-3xl text-lg leading-8 text-slate-600">
                The route stays self-contained with route-local mock data:
                newest-first event review, recurring tag summaries, and a
                selection model driven by the query string instead of client
                state.
              </p>
            </div>
          </div>

          <div className="rounded-[1.75rem] border border-slate-200/80 bg-[var(--surface-strong)] p-5">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-500">
              Shift snapshot
            </p>
            <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
              {view.summaryMetrics.map((metric) => (
                <div
                  key={metric.label}
                  className="rounded-[1.2rem] border border-slate-200 bg-white/80 p-4"
                >
                  <p className="text-xs uppercase tracking-[0.18em] text-slate-500">
                    {metric.label}
                  </p>
                  <p className="mt-2 text-2xl font-semibold tracking-tight text-slate-950">
                    {metric.value}
                  </p>
                  <p className="mt-2 text-sm leading-6 text-slate-600">
                    {metric.note}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <CommandTagSummary
        groups={view.tagSummary}
        totalEvents={view.events.length}
      />

      <div
        className="grid gap-8 xl:grid-cols-[minmax(0,1.1fr)_minmax(360px,0.9fr)]"
        data-testid="command-log-panels"
      >
        <CommandEventList
          events={view.events}
          selectedEventId={view.selectedEvent.id}
        />
        <CommandEventDetail
          event={view.selectedEvent}
          requestedEventId={view.requestedEventId}
          selectionFound={view.selectionFound}
        />
      </div>
    </main>
  );
}
