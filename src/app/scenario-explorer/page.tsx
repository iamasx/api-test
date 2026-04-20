import type { Metadata } from "next";
import Link from "next/link";

import { ComparisonBlock } from "@/components/scenario-explorer/comparison-block";
import { RecommendationPanel } from "@/components/scenario-explorer/recommendation-panel";
import { ScenarioSummaryCard } from "@/components/scenario-explorer/scenario-summary-card";
import { SectionHeading } from "@/components/scenario-explorer/section-heading";
import {
  alternativeScenarios,
  comparisonSections,
  overviewStats,
  rankedScenarios,
  recommendedScenario,
} from "@/data/scenario-explorer";

export const metadata: Metadata = {
  title: "Scenario Explorer",
  description:
    "Compare delivery scenarios with summaries, comparison blocks, and recommendation guidance.",
};

export default function ScenarioExplorerPage() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-[#f5efe3] font-sans text-slate-950">
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-[32rem] bg-[radial-gradient(circle_at_top_left,_rgba(194,65,12,0.18),_transparent_34%),radial-gradient(circle_at_top_right,_rgba(15,118,110,0.18),_transparent_28%),linear-gradient(180deg,_rgba(255,255,255,0.85),_rgba(245,239,227,0.18))]"
      />
      <div
        aria-hidden="true"
        className="absolute left-[-8rem] top-40 h-64 w-64 rounded-full bg-orange-200/50 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="absolute right-[-4rem] top-72 h-72 w-72 rounded-full bg-emerald-200/55 blur-3xl"
      />

      <main className="relative mx-auto flex w-full max-w-7xl flex-col gap-10 px-6 py-8 sm:px-8 lg:px-10 lg:py-10">
        <header className="overflow-hidden rounded-[40px] border border-black/8 bg-white/78 p-6 shadow-[0_30px_120px_-72px_rgba(15,23,42,0.7)] backdrop-blur sm:p-8 lg:p-10">
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1.45fr)_minmax(320px,0.85fr)]">
            <div>
              <Link
                href="/"
                className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/80 px-4 py-2 text-sm font-medium text-slate-600 transition hover:border-slate-300 hover:text-slate-950"
              >
                <span aria-hidden="true">/</span>
                Back to home
              </Link>
              <p className="mt-6 text-sm font-semibold uppercase tracking-[0.35em] text-slate-500">
                Route-level planning surface
              </p>
              <h1 className="mt-4 max-w-3xl text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl lg:text-6xl">
                Scenario Explorer
              </h1>
              <p className="mt-5 max-w-3xl text-base leading-8 text-slate-600 sm:text-lg">
                Compare launch paths side by side, pressure-test their tradeoffs,
                and keep a recommendation panel visible while the team evaluates
                the next delivery move.
              </p>
            </div>

            <div className="rounded-[32px] bg-slate-950 px-6 py-7 text-white shadow-[0_20px_80px_-40px_rgba(15,23,42,0.85)]">
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-white/65">
                Recommendation snapshot
              </p>
              <h2 className="mt-4 text-3xl font-semibold tracking-tight">
                {recommendedScenario.name}
              </h2>
              <p className="mt-4 text-sm leading-7 text-white/82 sm:text-base">
                {recommendedScenario.summary}
              </p>
              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                <div className="rounded-[22px] border border-white/10 bg-white/6 p-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.25em] text-white/60">
                    Delivery window
                  </p>
                  <p className="mt-2 text-lg font-semibold">
                    {recommendedScenario.deliveryWindow}
                  </p>
                </div>
                <div className="rounded-[22px] border border-white/10 bg-white/6 p-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.25em] text-white/60">
                    Weighted fit
                  </p>
                  <p className="mt-2 text-lg font-semibold">
                    {recommendedScenario.weightedScore}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {overviewStats.map((stat) => (
              <div
                key={stat.label}
                className="rounded-[28px] border border-slate-200/80 bg-white/72 p-5"
              >
                <p className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-500">
                  {stat.label}
                </p>
                <p className="mt-3 text-2xl font-semibold tracking-tight text-slate-950">
                  {stat.value}
                </p>
                <p className="mt-3 text-sm leading-6 text-slate-600">
                  {stat.detail}
                </p>
              </div>
            ))}
          </div>
        </header>

        <section aria-labelledby="scenario-set" className="space-y-6">
          <SectionHeading
            id="scenario-set"
            eyebrow="Scenario set"
            title="Three operating paths with visibly different tradeoffs"
            description="Each card compresses the delivery posture, score profile, and practical watchouts into a format that stays readable on mobile and dense enough for route-level comparison on desktop."
          />

          <div className="grid gap-6 xl:grid-cols-3">
            {rankedScenarios.map((scenario, index) => (
              <ScenarioSummaryCard
                key={scenario.id}
                scenario={scenario}
                rank={index}
              />
            ))}
          </div>
        </section>

        <section className="grid gap-8 lg:grid-cols-[minmax(0,1.45fr)_minmax(320px,0.85fr)] lg:items-start">
          <div className="space-y-6">
            <SectionHeading
              id="comparison-blocks"
              eyebrow="Comparison blocks"
              title="Decision signals organized into scannable blocks"
              description="The comparison sections keep the route focused on operational questions: how delivery unfolds, what traffic reveals, and which triggers justify a change in strategy."
            />

            {comparisonSections.map((section) => (
              <ComparisonBlock
                key={section.id}
                section={section}
                scenarios={rankedScenarios}
              />
            ))}
          </div>

          <RecommendationPanel
            recommendedScenario={recommendedScenario}
            alternativeScenarios={alternativeScenarios}
          />
        </section>
      </main>
    </div>
  );
}
