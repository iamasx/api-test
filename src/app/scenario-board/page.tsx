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
import styles from "./scenario-board.module.css";

export const metadata: Metadata = {
  title: "Scenario Board",
  description:
    "Planning route for comparing scenario cards, decision prompts, and outcome matrix trade-offs.",
};

export default function ScenarioBoardPage() {
  const recommendedScenario =
    scenarioBoardScenarios.find((scenario) => scenario.tone === "recommended") ??
    scenarioBoardScenarios[0];
  const totalCheckpoints = scenarioBoardScenarios.reduce(
    (sum, scenario) => sum + scenario.checkpoints.length,
    0,
  );

  return (
    <main
      className={`${styles.pageShell} relative min-h-screen overflow-hidden px-6 py-12 text-slate-50 sm:px-10 lg:px-14`}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute left-0 top-0 h-80 w-80 rounded-full bg-teal-300/10 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-0 right-0 h-96 w-96 rounded-full bg-amber-300/10 blur-3xl"
      />

      <div className="relative mx-auto flex max-w-7xl flex-col gap-8">
        <section
          className={`${styles.heroSurface} overflow-hidden rounded-[2.25rem] border border-white/10 px-8 py-8 shadow-[0_34px_120px_rgba(2,6,23,0.42)] sm:px-10 sm:py-10`}
        >
          <div className="grid gap-8 xl:grid-cols-[minmax(0,1.2fr)_minmax(320px,0.8fr)]">
            <div className="space-y-6">
              <div className="space-y-4">
                <p className="text-sm font-semibold uppercase tracking-[0.3em] text-teal-200/80">
                  {scenarioBoardSummary.eyebrow}
                </p>
                <h1 className="max-w-4xl text-4xl font-semibold tracking-tight text-balance text-white sm:text-5xl lg:text-6xl">
                  {scenarioBoardSummary.title}
                </h1>
                <p className="max-w-3xl text-base leading-8 text-slate-200 sm:text-lg">
                  {scenarioBoardSummary.description}
                </p>
              </div>

              <div className="flex flex-col gap-4 sm:flex-row">
                <a
                  href="#scenario-cards"
                  className="inline-flex items-center justify-center rounded-full bg-teal-300 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-teal-200"
                >
                  Review scenarios
                </a>
                <a
                  href="#outcome-matrix"
                  className="inline-flex items-center justify-center rounded-full border border-white/14 bg-white/6 px-6 py-3 text-sm font-semibold text-slate-50 transition hover:border-amber-300/40 hover:bg-white/10"
                >
                  Open outcome matrix
                </a>
                <Link
                  href="/"
                  className="inline-flex items-center justify-center rounded-full border border-white/14 bg-white/6 px-6 py-3 text-sm font-semibold text-slate-50 transition hover:border-white/30 hover:bg-white/10"
                >
                  Back to route index
                </Link>
              </div>
            </div>

            <aside className="rounded-[1.8rem] border border-white/10 bg-slate-950/28 p-6 backdrop-blur">
              <div className="space-y-5">
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-300">
                    Board pulse
                  </p>
                  <p className="mt-3 text-3xl font-semibold tracking-tight text-white">
                    {recommendedScenario.title} is the cleanest starting point.
                  </p>
                </div>

                <div className="grid gap-3 sm:grid-cols-3 xl:grid-cols-1">
                  {scenarioBoardSummary.stats.map((stat) => (
                    <div
                      key={stat.label}
                      className="rounded-[1.3rem] border border-white/10 bg-white/7 px-4 py-4"
                    >
                      <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-400">
                        {stat.label}
                      </p>
                      <p className="mt-2 text-2xl font-semibold text-white">
                        {stat.value}
                      </p>
                      <p className="mt-2 text-sm leading-6 text-slate-200">
                        {stat.detail}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="rounded-[1.3rem] border border-teal-300/18 bg-teal-300/10 px-4 py-4">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-teal-100/80">
                    Planning signal
                  </p>
                  <p className="mt-2 text-sm leading-6 text-slate-100">
                    The route currently tracks {totalCheckpoints} checkpoints
                    across all scenarios so the team can compare handoffs, not
                    just headlines.
                  </p>
                </div>
              </div>
            </aside>
          </div>
        </section>

        <section
          className="grid gap-6 xl:grid-cols-[minmax(0,1.08fr)_minmax(320px,0.92fr)]"
          data-testid="scenario-board-panels"
        >
          <div id="scenario-cards" className="space-y-5">
            <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
              <div className="space-y-2">
                <p className="text-xs font-semibold uppercase tracking-[0.26em] text-slate-300">
                  Scenario cards
                </p>
                <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
                  Weigh trade-offs across the board
                </h2>
              </div>
              <p className="max-w-3xl text-sm leading-7 text-slate-300">
                Each card captures the scenario summary, owners, checkpoints,
                and trade-offs that matter before the planning team commits.
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
