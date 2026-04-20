import type { Metadata } from "next";
import Link from "next/link";

import { ReadinessSummary } from "./_components/readiness-summary";
import { ScenarioCard } from "./_components/scenario-card";
import { StagedChecklist } from "./_components/staged-checklist";
import {
  missionPlannerSummary,
  missionScenarios,
  missionStages,
  readinessSignals,
} from "./_data/mission-planner-data";

export const metadata: Metadata = {
  title: "Mission Planner",
  description:
    "Planning route for comparing mission scenarios, reviewing readiness highlights, and following a staged checklist.",
};

export default function MissionPlannerPage() {
  const activeStage =
    missionStages.find((stage) => stage.status === "active") ?? missionStages[0];
  const blockedSignals = readinessSignals.filter(
    (signal) => signal.tone === "blocked",
  ).length;
  const watchSignals = readinessSignals.filter(
    (signal) => signal.tone === "watch",
  ).length;

  return (
    <main className="relative min-h-screen overflow-hidden bg-[radial-gradient(circle_at_top_right,rgba(59,130,246,0.18),transparent_26%),radial-gradient(circle_at_bottom_left,rgba(245,158,11,0.22),transparent_28%),linear-gradient(180deg,#0f172a_0%,#111827_52%,#172033_100%)] px-6 py-12 text-slate-50 sm:px-10 lg:px-14">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-72 bg-[radial-gradient(circle_at_top,rgba(125,211,252,0.16),transparent_46%)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-0 left-0 h-80 w-80 rounded-full bg-amber-300/10 blur-3xl"
      />
      <div className="relative mx-auto flex max-w-6xl flex-col gap-8">
        <header className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-[linear-gradient(135deg,rgba(255,255,255,0.08),rgba(15,23,42,0.12))] p-8 shadow-[0_32px_120px_rgba(2,6,23,0.45)] backdrop-blur sm:p-10">
          <div
            aria-hidden
            className="absolute -right-12 top-8 h-36 w-36 rounded-full border border-sky-200/12 bg-sky-300/10 blur-2xl"
          />
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl space-y-4">
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-sky-200/78">
                {missionPlannerSummary.eyebrow}
              </p>
              <h1 className="text-4xl font-semibold tracking-tight text-balance sm:text-5xl">
                {missionPlannerSummary.title}
              </h1>
              <p className="max-w-2xl text-base leading-7 text-slate-300 sm:text-lg">
                {missionPlannerSummary.description}
              </p>

              <div className="flex flex-col gap-3 sm:flex-row">
                <a
                  href="#mission-scenarios"
                  className="inline-flex items-center justify-center rounded-full bg-sky-300 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-sky-200"
                >
                  Review scenarios
                </a>
                <a
                  href="#mission-stage-checklist"
                  className="inline-flex items-center justify-center rounded-full border border-white/14 bg-white/6 px-5 py-3 text-sm font-semibold text-slate-100 transition hover:border-amber-300/40 hover:bg-white/10"
                >
                  Open staged checklist
                </a>
              </div>
            </div>

            <Link
              href="/"
              className="inline-flex items-center justify-center rounded-full border border-white/14 bg-white/8 px-5 py-3 text-sm font-semibold text-slate-100 transition hover:border-sky-300/40 hover:bg-white/12"
            >
              Back to route index
            </Link>
          </div>
        </header>

        <section className="grid gap-6 xl:grid-cols-[minmax(0,1.18fr)_minmax(320px,0.82fr)]">
          <div className="rounded-[1.9rem] border border-white/10 bg-[linear-gradient(180deg,rgba(15,23,42,0.68),rgba(9,15,28,0.9))] p-6 shadow-[0_28px_80px_rgba(2,6,23,0.28)]">
            <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
              <div className="space-y-2">
                <p className="text-xs font-semibold uppercase tracking-[0.26em] text-slate-300">
                  Planning baseline
                </p>
                <h2 className="text-3xl font-semibold tracking-tight text-white">
                  Live mission snapshot
                </h2>
              </div>
              <p className="max-w-xl text-sm leading-6 text-slate-300">
                The planner keeps scenario selection, launch posture, and
                operational sequencing in one place so handoffs stay explicit.
              </p>
            </div>

            <div className="mt-6 grid gap-4 md:grid-cols-3">
              {missionPlannerSummary.stats.map((stat) => (
                <article
                  key={stat.label}
                  className="rounded-[1.5rem] border border-white/8 bg-[linear-gradient(180deg,rgba(255,255,255,0.08),rgba(15,23,42,0.22))] px-5 py-5"
                >
                  <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-400">
                    {stat.label}
                  </p>
                  <p className="mt-3 text-3xl font-semibold tracking-tight text-white">
                    {stat.value}
                  </p>
                  <p className="mt-2 text-sm leading-6 text-slate-300">
                    {stat.detail}
                  </p>
                </article>
              ))}
            </div>
          </div>

          <aside className="rounded-[1.9rem] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.08),rgba(15,23,42,0.2))] p-6 shadow-[0_28px_80px_rgba(2,6,23,0.28)] backdrop-blur">
            <div className="space-y-5">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.26em] text-slate-300">
                  Decision board
                </p>
                <h2 className="mt-3 text-3xl font-semibold tracking-tight text-white">
                  Keep Stage 2 moving
                </h2>
              </div>

              <div className="grid gap-3">
                <div className="rounded-[1.5rem] border border-sky-300/18 bg-sky-300/10 px-4 py-4">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-sky-100/72">
                    Active stage
                  </p>
                  <p className="mt-2 text-lg font-semibold text-white">
                    {activeStage.name}
                  </p>
                  <p className="mt-2 text-sm leading-6 text-slate-200">
                    {activeStage.focus}
                  </p>
                </div>
                <div className="rounded-[1.5rem] border border-amber-300/18 bg-amber-300/10 px-4 py-4">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-amber-100/72">
                    Watch items
                  </p>
                  <p className="mt-2 text-3xl font-semibold text-white">
                    {watchSignals}
                  </p>
                  <p className="mt-2 text-sm leading-6 text-slate-200">
                    Weather and relay timing still need active monitoring before
                    the full launch window closes.
                  </p>
                </div>
                <div className="rounded-[1.5rem] border border-rose-300/18 bg-rose-300/10 px-4 py-4">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-rose-100/72">
                    Blockers
                  </p>
                  <p className="mt-2 text-3xl font-semibold text-white">
                    {blockedSignals}
                  </p>
                  <p className="mt-2 text-sm leading-6 text-slate-200">
                    Clear the inland relay certificate check to unlock every
                    alternate route option.
                  </p>
                </div>
              </div>
            </div>
          </aside>
        </section>

        <section
          id="mission-scenarios"
          className="grid gap-6 xl:grid-cols-[minmax(0,1.15fr)_minmax(320px,0.85fr)] xl:items-start"
        >
          <div className="space-y-5">
            <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
              <div className="space-y-2">
                <p className="text-xs font-semibold uppercase tracking-[0.26em] text-slate-300">
                  Scenario cards
                </p>
                <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
                  Choose the path that best protects the launch window
                </h2>
              </div>
              <p className="max-w-xl text-sm leading-6 text-slate-300">
                Each card frames the launch plan around timing, ownership, and
                checkpoints so the operator can compare routes quickly.
              </p>
            </div>

            <div
              aria-label="Mission scenarios"
              className="grid gap-5"
              role="list"
            >
              {missionScenarios.map((scenario) => (
                <ScenarioCard key={scenario.id} scenario={scenario} />
              ))}
            </div>
          </div>

          <ReadinessSummary
            signals={readinessSignals}
            stats={missionPlannerSummary.stats}
          />
        </section>

        <StagedChecklist stages={missionStages} />
      </div>
    </main>
  );
}
