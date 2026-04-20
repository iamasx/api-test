import type { Metadata } from "next";
import Link from "next/link";

import { BriefingScenarioCard } from "./_components/briefing-scenario-card";
import { DecisionSupportPanel } from "./_components/decision-support-panel";
import { ReadinessHighlightSection } from "./_components/readiness-highlight-section";
import {
  briefingNotes,
  decisionPrompts,
  missionBriefingOverview,
  missionBriefingScenarios,
  readinessHighlights,
} from "./_data/mission-briefing-data";

export const metadata: Metadata = {
  title: "Mission Briefing",
  description:
    "Standalone planning route for briefing scenario cards, readiness highlights, and decision support notes.",
};

export default function MissionBriefingPage() {
  const recommendedScenario =
    missionBriefingScenarios.find(
      (scenario) =>
        scenario.id === missionBriefingOverview.commandNote.recommendedScenarioId,
    ) ?? missionBriefingScenarios[0];
  const riskHighlights = readinessHighlights.filter(
    (highlight) => highlight.tone === "risk",
  ).length;
  const watchHighlights = readinessHighlights.filter(
    (highlight) => highlight.tone === "watch",
  ).length;
  const readyHighlights = readinessHighlights.filter(
    (highlight) => highlight.tone === "ready",
  ).length;

  return (
    <main className="relative min-h-screen overflow-hidden bg-[radial-gradient(circle_at_top_left,rgba(251,191,36,0.18),transparent_30%),radial-gradient(circle_at_bottom_right,rgba(34,211,238,0.18),transparent_28%),linear-gradient(180deg,#090d17_0%,#0f1726_48%,#111c2e_100%)] px-6 py-12 text-slate-50 sm:px-10 lg:px-16">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-72 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.12),transparent_52%)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute left-0 top-24 h-72 w-72 rounded-full bg-amber-300/10 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-0 right-0 h-80 w-80 rounded-full bg-cyan-300/10 blur-3xl"
      />

      <div className="relative mx-auto flex w-full max-w-7xl flex-col gap-8">
        <header className="overflow-hidden rounded-[2.2rem] border border-white/10 bg-[linear-gradient(135deg,rgba(255,248,235,0.1),rgba(15,23,42,0.18))] p-8 shadow-[0_32px_120px_rgba(2,6,23,0.42)] backdrop-blur sm:p-10">
          <div className="grid gap-8 xl:grid-cols-[minmax(0,1.18fr)_minmax(320px,0.82fr)]">
            <div className="space-y-5">
              <p className="text-sm font-semibold uppercase tracking-[0.32em] text-amber-100/78">
                {missionBriefingOverview.eyebrow}
              </p>
              <h1 className="max-w-4xl text-4xl font-semibold tracking-tight text-balance text-white sm:text-5xl lg:text-6xl">
                {missionBriefingOverview.title}
              </h1>
              <p className="max-w-3xl text-base leading-8 text-slate-200 sm:text-lg">
                {missionBriefingOverview.description}
              </p>

              <div className="flex flex-col gap-3 sm:flex-row">
                <a
                  href="#mission-briefing-scenarios"
                  className="inline-flex items-center justify-center rounded-full bg-amber-300 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-amber-200"
                >
                  {missionBriefingOverview.primaryAction}
                </a>
                <a
                  href="#decision-support"
                  className="inline-flex items-center justify-center rounded-full border border-white/14 bg-white/8 px-5 py-3 text-sm font-semibold text-slate-100 transition hover:border-cyan-300/35 hover:bg-white/12"
                >
                  {missionBriefingOverview.secondaryAction}
                </a>
                <Link
                  href="/"
                  className="inline-flex items-center justify-center rounded-full border border-white/14 bg-slate-950/30 px-5 py-3 text-sm font-semibold text-slate-100 transition hover:border-white/30 hover:bg-slate-900/60"
                >
                  Back to route index
                </Link>
              </div>
            </div>

            <aside className="rounded-[1.8rem] border border-white/10 bg-[linear-gradient(180deg,rgba(10,15,28,0.72),rgba(8,12,24,0.94))] p-6 shadow-[0_22px_70px_rgba(2,6,23,0.28)]">
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-400">
                Briefing pulse
              </p>
              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                <div className="rounded-[1.4rem] border border-emerald-300/16 bg-emerald-300/10 px-4 py-4">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-emerald-100/75">
                    Strong readiness
                  </p>
                  <p className="mt-2 text-3xl font-semibold text-white">
                    {readyHighlights}
                  </p>
                  <p className="mt-2 text-sm leading-6 text-slate-200">
                    Crew and dock logistics can support the two primary branches
                    without extra mitigation.
                  </p>
                </div>
                <div className="rounded-[1.4rem] border border-amber-300/16 bg-amber-300/10 px-4 py-4">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-amber-100/75">
                    Moderate readiness
                  </p>
                  <p className="mt-2 text-3xl font-semibold text-white">
                    {watchHighlights}
                  </p>
                  <p className="mt-2 text-sm leading-6 text-slate-200">
                    Relay and weather remain usable, but both need one more
                    clean review cycle before the commit call.
                  </p>
                </div>
                <div className="rounded-[1.4rem] border border-rose-300/16 bg-rose-300/10 px-4 py-4">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-rose-100/75">
                    Weak readiness
                  </p>
                  <p className="mt-2 text-3xl font-semibold text-white">
                    {riskHighlights}
                  </p>
                  <p className="mt-2 text-sm leading-6 text-slate-200">
                    Recovery lane approval remains the cleanest reason to change
                    the launch recommendation.
                  </p>
                </div>
                <div className="rounded-[1.4rem] border border-cyan-300/16 bg-cyan-300/10 px-4 py-4 sm:col-span-2">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-cyan-100/75">
                    Command note
                  </p>
                  <p className="mt-2 text-lg font-semibold text-white">
                    {missionBriefingOverview.commandNote.decisionWindow}
                  </p>
                  <p className="mt-2 text-sm leading-6 text-slate-200">
                    {missionBriefingOverview.commandNote.summary}
                  </p>
                </div>
              </div>
            </aside>
          </div>
        </header>

        <section className="rounded-[2rem] border border-white/10 bg-[linear-gradient(180deg,rgba(10,15,28,0.76),rgba(7,12,24,0.92))] p-6 shadow-[0_28px_80px_rgba(3,7,18,0.26)]">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
            <div className="space-y-2">
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-400">
                Briefing baseline
              </p>
              <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
                Frame the review around timing, ownership, and branch quality
              </h2>
            </div>
            <p className="max-w-2xl text-sm leading-7 text-slate-300">
              The route keeps every branch decision anchored to a concrete
              window, a named owner, and a visible operational risk.
            </p>
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {missionBriefingOverview.stats.map((stat) => (
              <article
                key={stat.label}
                className="rounded-[1.5rem] border border-white/8 bg-[linear-gradient(180deg,rgba(255,255,255,0.08),rgba(15,23,42,0.18))] px-4 py-4"
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
        </section>

        <section
          className="grid gap-6 xl:grid-cols-[minmax(0,1.16fr)_minmax(340px,0.84fr)] xl:items-start"
          id="mission-briefing-scenarios"
        >
          <div className="space-y-5">
            <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
              <div className="space-y-2">
                <p className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-400">
                  Scenario cards
                </p>
                <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
                  Review the operational branches before the commit call
                </h2>
              </div>
              <p className="max-w-2xl text-sm leading-7 text-slate-300">
                Each scenario card shows the commander, support lead, asset mix,
                friction points, and the operational decision the briefing
                recommends.
              </p>
            </div>

            <div
              aria-label="Mission briefing scenarios"
              className="grid gap-5"
              role="list"
            >
              {missionBriefingScenarios.map((scenario) => (
                <BriefingScenarioCard key={scenario.id} scenario={scenario} />
              ))}
            </div>
          </div>

          <DecisionSupportPanel
            decisionWindow={missionBriefingOverview.commandNote.decisionWindow}
            notes={briefingNotes}
            prompts={decisionPrompts}
            recommendedScenario={recommendedScenario}
            summary={missionBriefingOverview.commandNote.summary}
            title={missionBriefingOverview.commandNote.title}
          />
        </section>

        <ReadinessHighlightSection
          highlights={readinessHighlights}
          stats={missionBriefingOverview.stats}
        />
      </div>
    </main>
  );
}
