import type { Metadata } from "next";

import { RegionalHealthGroup } from "./_components/regional-health-group";
import { ResponseChecklistSidebar } from "./_components/response-checklist-sidebar";
import { StatusSummaryBanner } from "./_components/status-summary-banner";
import {
  regionalHealthGroups,
  responseChecklist,
  responseSidebarNotes,
  statusBoardSummary,
} from "./_data/status-board-data";

export const metadata: Metadata = {
  title: "Status Board",
  description:
    "A regional service health route for monitoring service posture and response readiness.",
};

export default function StatusBoardPage() {
  const impactedRegions = regionalHealthGroups.filter(
    (group) => group.warningCount > 0 || group.degradedCount > 0,
  ).length;
  const degradedRegions = regionalHealthGroups.filter(
    (group) => group.degradedCount > 0,
  ).length;

  return (
    <main className="mx-auto flex w-full max-w-7xl flex-1 flex-col gap-8 px-5 py-8 sm:px-8 lg:px-10 lg:py-12">
      <section className="overflow-hidden rounded-[2.5rem] border border-slate-200/70 bg-slate-950 px-6 py-8 text-white shadow-[0_36px_110px_-48px_rgba(15,23,42,0.9)] sm:px-8 lg:px-10 lg:py-10">
        <div className="grid gap-8 xl:grid-cols-[minmax(0,1.45fr)_minmax(300px,0.85fr)]">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.32em] text-emerald-300">
              {statusBoardSummary.eyebrow}
            </p>
            <h1 className="mt-4 max-w-4xl text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">
              {statusBoardSummary.title}
            </h1>
            <p className="mt-5 max-w-3xl text-base leading-8 text-slate-300 sm:text-lg">
              {statusBoardSummary.description}
            </p>

            <div className="mt-6 flex flex-wrap gap-3 text-sm text-slate-300">
              <span className="rounded-full border border-white/10 bg-white/8 px-3 py-1.5">
                {statusBoardSummary.generatedAt}
              </span>
              <span className="rounded-full border border-white/10 bg-white/8 px-3 py-1.5">
                {impactedRegions} impacted regions under active review
              </span>
              <span className="rounded-full border border-white/10 bg-white/8 px-3 py-1.5">
                {degradedRegions} degraded region needs direct intervention
              </span>
            </div>
          </div>

          <aside className="rounded-[2rem] border border-white/10 bg-white/8 p-5">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-400">
              Response posture
            </p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-white">
              Focus on export recovery, support failover, and backlog pressure.
            </h2>
            <p className="mt-4 text-sm leading-7 text-slate-300">
              The route is designed to let an operator scan summary counts, move
              region by region, and finish with a clear checklist for the next
              handoff.
            </p>

            <div className="mt-6 grid gap-3 sm:grid-cols-3 xl:grid-cols-1">
              <div className="rounded-[1.25rem] bg-white/8 px-4 py-4">
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400">
                  Regions tracked
                </p>
                <p className="mt-2 text-2xl font-semibold text-white">
                  {regionalHealthGroups.length}
                </p>
              </div>
              <div className="rounded-[1.25rem] bg-white/8 px-4 py-4">
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400">
                  Checklist items
                </p>
                <p className="mt-2 text-2xl font-semibold text-white">
                  {responseChecklist.length}
                </p>
              </div>
              <div className="rounded-[1.25rem] bg-white/8 px-4 py-4">
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400">
                  Summary cards
                </p>
                <p className="mt-2 text-2xl font-semibold text-white">
                  {statusBoardSummary.stats.length}
                </p>
              </div>
            </div>
          </aside>
        </div>

        <div
          aria-label="Status board summary"
          className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4"
          role="list"
        >
          {statusBoardSummary.stats.map((stat) => (
            <StatusSummaryBanner key={stat.label} stat={stat} />
          ))}
        </div>
      </section>

      <div
        className="grid gap-8 xl:grid-cols-[minmax(0,1.32fr)_minmax(320px,0.78fr)] xl:items-start"
        data-testid="status-board-layout"
      >
        <section aria-labelledby="status-board-regions" className="space-y-6">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">
                Regional coverage
              </p>
              <h2
                id="status-board-regions"
                className="mt-2 text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl"
              >
                Service health grouped by region
              </h2>
            </div>
            <p className="max-w-2xl text-sm leading-7 text-slate-600">
              Each region includes its own health summary, grouped service cards,
              and operator-friendly counts for warnings and degraded systems.
            </p>
          </div>

          {regionalHealthGroups.map((group) => (
            <RegionalHealthGroup key={group.id} group={group} />
          ))}
        </section>

        <ResponseChecklistSidebar
          items={responseChecklist}
          notes={responseSidebarNotes}
        />
      </div>
    </main>
  );
}
