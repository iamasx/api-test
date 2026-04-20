import type { Metadata } from "next";
import Link from "next/link";
import { QueueColumn } from "./_components/queue-column";
import { QueueMetricCard } from "./_components/queue-metric-card";
import { getQueueBoardView } from "./_data/queue-board-data";

export const metadata: Metadata = {
  title: "Queue Board",
  description:
    "Workflow board route scaffold for queue items, summary counts, and escalation markers.",
};

export default function QueueBoardPage() {
  const queueBoardView = getQueueBoardView();

  return (
    <main className="mx-auto flex w-full max-w-[96rem] flex-1 flex-col gap-8 px-6 py-10 sm:px-10 lg:px-12 lg:py-14">
      <section className="overflow-hidden rounded-[2.25rem] border border-slate-200 bg-[linear-gradient(135deg,#f8fafc_0%,#ffffff_42%,#eff6ff_100%)] shadow-[0_30px_100px_rgba(15,23,42,0.1)]">
        <div className="grid gap-8 px-6 py-8 sm:px-8 sm:py-10 lg:grid-cols-[minmax(0,1.4fr)_minmax(20rem,0.9fr)] lg:px-10 lg:py-12">
          <div className="space-y-6">
            <div className="flex flex-wrap items-center gap-3">
              <p className="rounded-full bg-sky-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-sky-800">
                Queue Board
              </p>
              <p className="rounded-full bg-white px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-slate-500 shadow-[inset_0_0_0_1px_rgba(148,163,184,0.18)]">
                Mock workflow telemetry
              </p>
            </div>

            <div className="space-y-4">
              <h1 className="max-w-4xl text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl lg:text-6xl">
                Visualize workflow load, escalations, and next actions in one board.
              </h1>
              <p className="max-w-3xl text-base leading-8 text-slate-600 sm:text-lg">
                The queue board groups live mock work into operational stages so
                teams can scan active volume, blocked handoffs, and time-sensitive
                escalations without depending on any backend integration.
              </p>
            </div>

            <div className="flex flex-col gap-4 sm:flex-row">
              <Link
                href="/"
                className="inline-flex items-center justify-center rounded-full bg-slate-950 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
              >
                Back to overview
              </Link>
              <a
                href="#queue-columns"
                className="inline-flex items-center justify-center rounded-full border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-700 transition hover:border-slate-950 hover:text-slate-950"
              >
                Jump to board
              </a>
            </div>
          </div>

          <aside className="rounded-[1.75rem] border border-white/80 bg-slate-950 p-6 text-white shadow-[0_24px_60px_rgba(15,23,42,0.22)] sm:p-7">
            <div className="space-y-5">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-sky-200/80">
                  Shift overview
                </p>
                <p className="mt-3 text-3xl font-semibold tracking-tight">
                  {queueBoardView.totalItems} items across {queueBoardView.columns.length} active
                  stages
                </p>
              </div>

              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
                <div className="rounded-[1.25rem] bg-white/10 px-4 py-4">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/60">
                    Escalated now
                  </p>
                  <p className="mt-2 text-2xl font-semibold">
                    {queueBoardView.escalatedItems}
                  </p>
                  <p className="mt-2 text-sm leading-6 text-white/72">
                    Cards marked watch, priority, or SLA-risk.
                  </p>
                </div>
                <div className="rounded-[1.25rem] bg-white/10 px-4 py-4">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/60">
                    Blocked handoffs
                  </p>
                  <p className="mt-2 text-2xl font-semibold">
                    {queueBoardView.blockedItems}
                  </p>
                  <p className="mt-2 text-sm leading-6 text-white/72">
                    Waiting on legal, broker, or partner follow-through.
                  </p>
                </div>
              </div>

              <div className="rounded-[1.25rem] border border-white/12 bg-white/6 px-4 py-4">
                <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/60">
                  Board intent
                </p>
                <p className="mt-2 text-sm leading-6 text-white/76">
                  Summary metrics stay above the board while each stage tracks
                  volume, escalations, blockers, and item-level checkpoints.
                </p>
              </div>
            </div>
          </aside>
        </div>
      </section>

      <section aria-labelledby="queue-summary" className="space-y-5">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
          <div className="space-y-2">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">
              Summary metrics
            </p>
            <h2 id="queue-summary" className="text-3xl font-semibold tracking-tight text-slate-950">
              Queue health at a glance
            </h2>
          </div>
          <p className="max-w-3xl text-sm leading-7 text-slate-600">
            Counts are derived directly from the local queue dataset so the
            route can be tested and iterated in isolation.
          </p>
        </div>

        <div
          aria-label="Queue summary metrics"
          className="grid gap-4 md:grid-cols-2 xl:grid-cols-4"
          role="list"
        >
          {queueBoardView.metrics.map((metric) => (
            <QueueMetricCard key={metric.id} metric={metric} />
          ))}
        </div>
      </section>

      <section id="queue-columns" aria-labelledby="queue-board-columns" className="space-y-5">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
          <div className="space-y-2">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">
              Status columns
            </p>
            <h2
              id="queue-board-columns"
              className="text-3xl font-semibold tracking-tight text-slate-950"
            >
              Workflow board
            </h2>
          </div>
          <p className="max-w-3xl text-sm leading-7 text-slate-600">
            Every column exposes the current load plus a focused breakdown of
            escalated and blocked work before you drill into the cards.
          </p>
        </div>

        <div
          className="grid gap-5 xl:grid-cols-5"
          data-testid="queue-board-columns"
        >
          {queueBoardView.columns.map((column) => (
            <QueueColumn key={column.id} column={column} />
          ))}
        </div>
      </section>
    </main>
  );
}
