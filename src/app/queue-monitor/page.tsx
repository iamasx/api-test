import type { Metadata } from "next";
import Link from "next/link";

import { EscalationDetail } from "./_components/escalation-detail";
import { QueueColumn } from "./_components/queue-column";
import type { QueueMonitorCardView } from "./_components/queue-card";
import {
  queueMonitorColumns,
  queueMonitorEscalationMarkers,
  queueMonitorFocusedItemId,
  queueMonitorItems,
  queueMonitorOwners,
  queueMonitorQueues,
} from "./_data/queue-monitor-data";

export const metadata: Metadata = {
  title: "Queue Monitor",
  description:
    "Queue monitoring route with backlog columns, queue summaries, and an escalation detail panel.",
};

const escalationSeverityRank = {
  steady: 0,
  watch: 1,
  priority: 2,
  "sla-risk": 3,
} as const;

function getRequiredById<T extends { id: string }>(
  items: T[],
  id: string,
  label: string,
) {
  const match = items.find((item) => item.id === id);

  if (!match) {
    throw new Error(`${label} not found for id: ${id}`);
  }

  return match;
}

export default function QueueMonitorPage() {
  const cardViews: QueueMonitorCardView[] = queueMonitorItems.map((item) => ({
    item,
    queue: getRequiredById(queueMonitorQueues, item.queueId, "Queue"),
    owner: getRequiredById(queueMonitorOwners, item.ownerId, "Queue owner"),
    escalation: getRequiredById(
      queueMonitorEscalationMarkers,
      item.escalationId,
      "Escalation marker",
    ),
    column: getRequiredById(queueMonitorColumns, item.columnId, "Queue column"),
  }));

  const totalItems = cardViews.length;
  const blockedItems = cardViews.filter((view) => view.item.blocked).length;
  const escalatedItems = cardViews.filter((view) => view.escalation.id !== "steady").length;
  const agingItems = cardViews.filter((view) => view.item.ageHours >= 8).length;
  const focusedView = cardViews.find(
    (view) => view.item.id === queueMonitorFocusedItemId,
  );

  if (!focusedView) {
    throw new Error(`Focused queue item not found for id: ${queueMonitorFocusedItemId}`);
  }
  const columnViews = queueMonitorColumns.map((column) => ({
    column,
    items: cardViews.filter((view) => view.column.id === column.id),
  }));
  const queueSummaries = queueMonitorQueues.map((queue) => {
    const items = cardViews.filter((view) => view.queue.id === queue.id);
    const blockedCount = items.filter((view) => view.item.blocked).length;
    const highestEscalation = items.reduce(
      (current, view) =>
        escalationSeverityRank[view.escalation.id] > escalationSeverityRank[current.id]
          ? view.escalation
          : current,
      queueMonitorEscalationMarkers[0],
    );

    return {
      queue,
      itemCount: items.length,
      blockedCount,
      highestEscalation,
    };
  });
  const summaryMetrics = [
    {
      label: "Open backlog",
      value: String(totalItems),
      detail: "All queue items currently visible across the monitor.",
    },
    {
      label: "Escalated now",
      value: String(escalatedItems),
      detail: "Items carrying watch, priority, or SLA risk markers.",
    },
    {
      label: "Blocked handoffs",
      value: String(blockedItems),
      detail: "Queue items waiting on a broker, approver, or partner reply.",
    },
    {
      label: "Aging 8h+",
      value: String(agingItems),
      detail: "Cases old enough to need explicit queue attention this shift.",
    },
  ];

  return (
    <main className="mx-auto flex w-full max-w-[98rem] flex-1 flex-col gap-8 px-6 py-10 sm:px-10 lg:px-12 lg:py-14">
      <section className="overflow-hidden rounded-[2.25rem] border border-[var(--line)] bg-[var(--surface)] shadow-[0_28px_90px_rgba(15,23,42,0.08)]">
        <div className="grid gap-8 px-6 py-8 sm:px-10 lg:grid-cols-[minmax(0,1.3fr)_minmax(18rem,0.85fr)] lg:px-12 lg:py-12">
          <div className="space-y-6">
            <div className="flex flex-wrap items-center gap-3">
              <p className="rounded-full bg-sky-100 px-3 py-1 text-sm font-semibold uppercase tracking-[0.28em] text-sky-700">
                Queue Monitor
              </p>
              <p className="rounded-full bg-white/85 px-3 py-1 text-xs font-semibold uppercase tracking-[0.22em] text-slate-500 shadow-[inset_0_0_0_1px_rgba(148,163,184,0.18)]">
                Backlog control route
              </p>
            </div>

            <div className="space-y-4">
              <p className="text-sm font-semibold uppercase tracking-[0.28em] text-sky-700">
                Shift overview
              </p>
              <h1 className="max-w-4xl text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl lg:text-6xl">
                Scan backlog columns, queue summaries, and the highest-risk escalation from one route.
              </h1>
              <p className="max-w-3xl text-base leading-8 text-slate-600 sm:text-lg">
                The queue monitor keeps backlog sections, queue-level summaries,
                and the focused escalation response in one place so an operator
                can move from volume scan to intervention without leaving the
                route.
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
                href="#queue-monitor-columns"
                className="inline-flex items-center justify-center rounded-full border border-slate-300 px-6 py-3 text-sm font-semibold text-slate-700 transition hover:border-slate-950 hover:text-slate-950"
              >
                Jump to backlog
              </a>
            </div>
          </div>

          <aside className="rounded-[1.85rem] border border-slate-200/80 bg-slate-950 p-6 text-white shadow-[0_24px_60px_rgba(15,23,42,0.16)]">
            <div className="space-y-5">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-sky-200/78">
                  Queue pulse
                </p>
                <p className="mt-3 text-3xl font-semibold tracking-tight">
                  {totalItems} visible items across {queueMonitorColumns.length} backlog columns
                </p>
              </div>

              <div className="grid gap-3">
                <div className="rounded-[1.25rem] bg-white/10 px-4 py-4">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/60">
                    Highest-risk queue
                  </p>
                  <p className="mt-2 text-lg font-semibold">{focusedView.queue.name}</p>
                  <p className="mt-2 text-sm leading-6 text-white/72">
                    {focusedView.item.dueWindow}
                  </p>
                </div>

                <div className="rounded-[1.25rem] bg-white/10 px-4 py-4">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/60">
                    Primary blocker
                  </p>
                  <p className="mt-2 text-sm leading-6 text-white/76">
                    {focusedView.item.blocker}
                  </p>
                </div>

                <div className="rounded-[1.25rem] border border-white/12 bg-white/6 px-4 py-4">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/60">
                    Response expectation
                  </p>
                  <p className="mt-2 text-sm leading-6 text-white/76">
                    {focusedView.escalation.responseExpectation}
                  </p>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </section>

      <section aria-labelledby="queue-monitor-summary" className="space-y-5">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
          <div className="space-y-2">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">
              Queue summary
            </p>
            <h2
              id="queue-monitor-summary"
              className="text-3xl font-semibold tracking-tight text-slate-950"
            >
              Workflow pressure at a glance
            </h2>
          </div>
          <p className="max-w-3xl text-sm leading-7 text-slate-600">
            The summary strip combines pure backlog counts with the operational
            signals that usually drive queue rebalancing during the shift.
          </p>
        </div>

        <div
          aria-label="Queue summary metrics"
          className="grid gap-4 md:grid-cols-2 xl:grid-cols-4"
          role="list"
        >
          {summaryMetrics.map((metric) => (
            <article
              key={metric.label}
              className="rounded-[1.5rem] border border-slate-200 bg-white/82 p-5 shadow-[0_18px_45px_rgba(15,23,42,0.05)]"
              role="listitem"
            >
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-500">
                {metric.label}
              </p>
              <p className="mt-3 text-4xl font-semibold tracking-tight text-slate-950">
                {metric.value}
              </p>
              <p className="mt-3 text-sm leading-7 text-slate-600">{metric.detail}</p>
            </article>
          ))}
        </div>
      </section>

      <section aria-labelledby="queue-monitor-queues" className="space-y-5">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
          <div className="space-y-2">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">
              Queue summaries
            </p>
            <h2
              id="queue-monitor-queues"
              className="text-3xl font-semibold tracking-tight text-slate-950"
            >
              Queue-by-queue workload
            </h2>
          </div>
          <p className="max-w-3xl text-sm leading-7 text-slate-600">
            Each queue summary keeps the current focus, backlog count, and
            highest escalation marker visible before you drop into the columns.
          </p>
        </div>

        <div aria-label="Queue summaries" className="grid gap-4 xl:grid-cols-4" role="list">
          {queueSummaries.map(({ queue, itemCount, blockedCount, highestEscalation }) => (
            <article
              key={queue.id}
              className="rounded-[1.5rem] border border-slate-200 bg-white/82 p-5 shadow-[0_18px_45px_rgba(15,23,42,0.05)]"
              role="listitem"
            >
              <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-slate-500">
                {queue.name}
              </p>
              <p className="mt-3 text-lg font-semibold tracking-tight text-slate-950">
                {queue.focus}
              </p>
              <dl className="mt-4 grid gap-3 text-sm text-slate-700">
                <div className="rounded-2xl bg-slate-50 px-3 py-3">
                  <dt className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-500">
                    Visible items
                  </dt>
                  <dd className="mt-2 font-medium text-slate-950">{itemCount}</dd>
                </div>
                <div className="rounded-2xl bg-slate-50 px-3 py-3">
                  <dt className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-500">
                    Blocked items
                  </dt>
                  <dd className="mt-2 font-medium text-slate-950">{blockedCount}</dd>
                </div>
                <div className="rounded-2xl bg-slate-50 px-3 py-3">
                  <dt className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-500">
                    Highest escalation
                  </dt>
                  <dd className="mt-2 font-medium text-slate-950">
                    {highestEscalation.label}
                  </dd>
                </div>
              </dl>
              <p className="mt-4 text-sm leading-7 text-slate-600">{queue.summaryWindow}</p>
            </article>
          ))}
        </div>
      </section>

      <section aria-labelledby="queue-monitor-workflow" className="space-y-5">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
          <div className="space-y-2">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">
              Backlog workflow
            </p>
            <h2
              id="queue-monitor-workflow"
              className="text-3xl font-semibold tracking-tight text-slate-950"
            >
              Backlog columns with a focused escalation lane
            </h2>
          </div>
          <p className="max-w-3xl text-sm leading-7 text-slate-600">
            The column grid keeps the whole queue visible while the detail panel
            stays pinned on the most urgent recovery path.
          </p>
        </div>

        <div className="grid gap-6 2xl:grid-cols-[minmax(0,1.6fr)_minmax(22rem,0.9fr)]">
          <div id="queue-monitor-columns" className="grid gap-5 xl:grid-cols-2">
            {columnViews.map(({ column, items }) => (
              <QueueColumn key={column.id} column={column} items={items} />
            ))}
          </div>

          <article
            className="self-start"
          >
            <EscalationDetail view={focusedView} />
          </article>
        </div>
      </section>
    </main>
  );
}
