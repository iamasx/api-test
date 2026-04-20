import type { Metadata } from "next";
import Link from "next/link";

import { DecisionPromptList } from "./_components/decision-prompt-list";
import { OutcomeMatrix } from "./_components/outcome-matrix";
import { ScenarioCard } from "./_components/scenario-card";
import {
  scenarioBoardScenarios,
  scenarioBoardSummary,
  scenarioDecisionPrompts,
  scenarioOutcomeMatrix,
} from "./_data/scenario-board-data";

export const metadata: Metadata = {
  title: "Scenario Board",
  description:
    "Planning route for comparing scenario cards, decision prompts, and outcome matrix trade-offs.",
};

export default function ScenarioBoardPage() {
  const totalCheckpoints = scenarioBoardScenarios.reduce(
    (sum, scenario) => sum + scenario.checkpoints.length,
    0,
  );

  return (
    <main className="mx-auto flex w-full max-w-7xl flex-1 flex-col gap-8 px-6 py-10 sm:px-10 lg:px-12 lg:py-12">
      <section className="rounded-[2rem] border border-[var(--line)] bg-[var(--surface)] px-6 py-8 shadow-[0_20px_90px_rgba(15,23,42,0.08)] sm:px-10 sm:py-10">
        <div className="grid gap-8 xl:grid-cols-[minmax(0,1.2fr)_minmax(320px,0.8fr)]">
          <div className="space-y-6">
            <div className="space-y-4">
              <p className="text-sm font-semibold uppercase tracking-[0.28em] text-teal-700">
                {scenarioBoardSummary.eyebrow}
              </p>
              <h1 className="max-w-4xl text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl lg:text-6xl">
                {scenarioBoardSummary.title}
              </h1>
              <p className="max-w-3xl text-base leading-8 text-slate-600 sm:text-lg">
                {scenarioBoardSummary.description}
              </p>
            </div>

            <div className="flex flex-col gap-4 sm:flex-row">
              <a
                href="#scenario-cards"
                className="inline-flex items-center justify-center rounded-full bg-slate-950 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
              >
                Review scenarios
              </a>
              <a
                href="#outcome-matrix"
                className="inline-flex items-center justify-center rounded-full border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-700 transition hover:border-slate-950 hover:text-slate-950"
              >
                Open outcome matrix
              </a>
              <Link
                href="/"
                className="inline-flex items-center justify-center rounded-full border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-700 transition hover:border-slate-950 hover:text-slate-950"
              >
                Back to route index
              </Link>
            </div>
          </div>

          <div className="rounded-[1.75rem] border border-slate-200 bg-white px-6 py-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.8)]">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-500">
              Planning pulse
            </p>
            <div className="mt-5 grid gap-3 sm:grid-cols-3 xl:grid-cols-1">
              {scenarioBoardSummary.stats.map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-[1.25rem] border border-slate-200 bg-slate-50 px-4 py-4"
                >
                  <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-500">
                    {stat.label}
                  </p>
                  <p className="mt-2 text-2xl font-semibold tracking-tight text-slate-950">
                    {stat.value}
                  </p>
                  <p className="mt-2 text-sm leading-6 text-slate-600">
                    {stat.detail}
                  </p>
                </div>
              ))}
            </div>
            <div className="mt-5 rounded-[1.25rem] border border-slate-200 bg-slate-50 px-4 py-4">
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-500">
                Current board coverage
              </p>
              <p className="mt-2 text-sm leading-6 text-slate-700">
                The route currently tracks {totalCheckpoints} checkpoints across
                the scenario set so the planning review can compare more than a
                one-line recommendation.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section
        className="grid gap-6 xl:grid-cols-[minmax(0,1.08fr)_minmax(320px,0.92fr)]"
        data-testid="scenario-board-panels"
      >
        <div id="scenario-cards" className="space-y-5">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
            <div className="space-y-2">
              <p className="text-xs font-semibold uppercase tracking-[0.26em] text-slate-500">
                Scenario cards
              </p>
              <h2 className="text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">
                Weigh trade-offs across the board
              </h2>
            </div>
            <p className="max-w-3xl text-sm leading-7 text-slate-600">
              Each card captures the scenario summary, owners, checkpoints, and
              trade-offs that matter before the planning team commits.
            </p>
          </div>

          <div aria-label="Scenario options" className="grid gap-5" role="list">
            {scenarioBoardScenarios.map((scenario) => (
              <ScenarioCard key={scenario.id} scenario={scenario} />
            ))}
          </div>
        </div>

        <DecisionPromptList
          notes={scenarioBoardSummary.boardNotes}
          prompts={scenarioDecisionPrompts}
        />
      </section>

      <div id="outcome-matrix">
        <OutcomeMatrix
          description={scenarioOutcomeMatrix.description}
          footer={scenarioOutcomeMatrix.footer}
          rows={scenarioOutcomeMatrix.rows}
          scenarios={scenarioBoardScenarios}
          title={scenarioOutcomeMatrix.title}
        />
      </div>
    </main>
  );
}
