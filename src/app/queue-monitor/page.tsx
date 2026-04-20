import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Queue Monitor",
  description:
    "Initial route shell for monitoring queue backlog columns, summaries, and escalation details.",
};

const shellSections = [
  {
    title: "Queue summary",
    description:
      "Summary tiles will surface backlog totals, aging items, and the highest-risk escalations.",
  },
  {
    title: "Backlog columns",
    description:
      "Column sections will break the queue into operational stages with focused card content.",
  },
  {
    title: "Escalation detail panel",
    description:
      "A dedicated panel will keep the most urgent queue item visible with owner and recovery context.",
  },
];

export default function QueueMonitorPage() {
  return (
    <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col gap-8 px-6 py-12 sm:px-10 lg:px-12">
      <section className="overflow-hidden rounded-[2rem] border border-[var(--line)] bg-[var(--surface)] shadow-[0_24px_90px_rgba(15,23,42,0.08)]">
        <div className="grid gap-8 px-6 py-10 sm:px-10 lg:grid-cols-[minmax(0,1.2fr)_minmax(18rem,0.8fr)] lg:px-12 lg:py-14">
          <div className="space-y-6">
            <div className="space-y-3">
              <p className="text-sm font-semibold uppercase tracking-[0.28em] text-sky-700">
                Queue Monitor
              </p>
              <h1 className="max-w-3xl text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl">
                Minimal route shell for backlog monitoring and escalation follow-up.
              </h1>
              <p className="max-w-2xl text-lg leading-8 text-slate-600">
                This first pass only establishes the route structure. Queue data,
                cards, backlog columns, and detail behavior will be layered in
                through the remaining subtasks.
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
                href="#queue-monitor-shell"
                className="inline-flex items-center justify-center rounded-full border border-slate-300 px-6 py-3 text-sm font-semibold text-slate-700 transition hover:border-slate-950 hover:text-slate-950"
              >
                View scaffold
              </a>
            </div>
          </div>

          <aside className="rounded-[1.75rem] border border-slate-200/80 bg-white/80 p-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.75)]">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-500">
              Subtask 1 scope
            </p>
            <ul className="mt-5 space-y-4">
              <li className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4 text-sm leading-6 text-slate-600">
                Route folder and metadata are in place under `src/app/queue-monitor`.
              </li>
              <li className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4 text-sm leading-6 text-slate-600">
                The page already reserves dedicated sections for summaries,
                backlog columns, and escalations.
              </li>
              <li className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4 text-sm leading-6 text-slate-600">
                Data, components, styling, and tests are intentionally deferred
                to the next subtasks.
              </li>
            </ul>
          </aside>
        </div>
      </section>

      <section
        id="queue-monitor-shell"
        aria-labelledby="queue-monitor-shell-heading"
        className="grid gap-5 lg:grid-cols-3"
      >
        {shellSections.map((section) => (
          <article
            key={section.title}
            className="rounded-[1.5rem] border border-slate-200 bg-white/78 p-5 shadow-[0_18px_50px_rgba(15,23,42,0.05)]"
          >
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">
              Planned section
            </p>
            <h2
              id={
                section.title === "Queue summary"
                  ? "queue-monitor-shell-heading"
                  : undefined
              }
              className="mt-3 text-2xl font-semibold tracking-tight text-slate-950"
            >
              {section.title}
            </h2>
            <p className="mt-3 text-sm leading-7 text-slate-600">
              {section.description}
            </p>
          </article>
        ))}
      </section>
    </main>
  );
}
