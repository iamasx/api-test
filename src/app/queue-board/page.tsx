import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Queue Board",
  description:
    "Workflow board route scaffold for queue items, summary counts, and escalation markers.",
};

export default function QueueBoardPage() {
  return (
    <main className="mx-auto flex w-full max-w-7xl flex-1 flex-col gap-8 px-6 py-10 sm:px-10 lg:px-12 lg:py-14">
      <section className="rounded-[2rem] border border-slate-200 bg-white px-6 py-8 shadow-[0_24px_80px_rgba(15,23,42,0.08)] sm:px-8 sm:py-10">
        <div className="max-w-3xl space-y-4">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-sky-700">
            Queue Board
          </p>
          <h1 className="text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl">
            Monitor workflow items across multiple queue stages.
          </h1>
          <p className="text-base leading-7 text-slate-600 sm:text-lg">
            This route scaffold reserves space for summary metrics, status
            columns, and escalation states that will be added in follow-up
            subtasks.
          </p>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-3" aria-label="Queue board placeholders">
        <div className="rounded-[1.5rem] border border-dashed border-slate-300 bg-slate-50 p-6">
          <h2 className="text-lg font-semibold text-slate-950">Summary metrics</h2>
          <p className="mt-2 text-sm leading-6 text-slate-600">
            Placeholder for open-item, escalation, and aging counts.
          </p>
        </div>
        <div className="rounded-[1.5rem] border border-dashed border-slate-300 bg-slate-50 p-6">
          <h2 className="text-lg font-semibold text-slate-950">Queue columns</h2>
          <p className="mt-2 text-sm leading-6 text-slate-600">
            Placeholder for grouped workflow stages and item cards.
          </p>
        </div>
        <div className="rounded-[1.5rem] border border-dashed border-slate-300 bg-slate-50 p-6">
          <h2 className="text-lg font-semibold text-slate-950">Escalation states</h2>
          <p className="mt-2 text-sm leading-6 text-slate-600">
            Placeholder for blocked, priority, and SLA-risk visual treatments.
          </p>
        </div>
      </section>
    </main>
  );
}
