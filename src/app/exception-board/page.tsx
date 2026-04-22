import type { Metadata } from "next";
import Link from "next/link";

import { ExceptionCard } from "./_components/exception-card";
import { FollowUpPanel } from "./_components/follow-up-panel";
import { SummaryCounts } from "./_components/summary-counts";
import { getExceptionBoardView } from "./_data/exception-board-data";
import styles from "./exception-board.module.css";

export const metadata: Metadata = {
  title: "Exception Board",
  description:
    "Exception board route for grouped exception cases, resolution hints, and follow-up tracking.",
};

export default function ExceptionBoardPage() {
  const view = getExceptionBoardView();

  const hintMap = new Map(view.resolutionHints.map((h) => [h.id, h]));

  return (
    <main className={styles.shell}>
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-8 px-6 py-10 sm:px-10 lg:px-12 lg:py-14">
        {/* Hero */}
        <section
          className={`${styles.surfaceCard} ${styles.heroPanel} rounded-[2rem] p-8 sm:p-10`}
        >
          <div className="flex flex-wrap items-center justify-between gap-4">
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-slate-500">
              {view.hero.eyebrow}
            </p>
            <Link
              href="/"
              className="rounded-full border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 transition hover:border-slate-950 hover:text-slate-950"
            >
              Back to overview
            </Link>
          </div>

          <div className="mt-8 grid gap-8 xl:grid-cols-[minmax(0,1.25fr)_minmax(260px,0.75fr)] xl:items-start">
            <div className="space-y-4">
              <h1 className="max-w-4xl text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl lg:text-6xl">
                {view.hero.title}
              </h1>
              <p className="max-w-3xl text-base leading-8 text-slate-600 sm:text-lg">
                {view.hero.description}
              </p>
            </div>

            <FollowUpPanel followUps={view.followUps} />
          </div>
        </section>

        {/* Summary counts */}
        <SummaryCounts counts={view.summaryCounts} />

        {/* Exception groups */}
        {view.groups.map((group) => (
          <section
            key={group.status}
            aria-labelledby={`group-${group.status}`}
            className="space-y-5"
          >
            <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
              <div className="space-y-2">
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">
                  {group.label} exceptions
                </p>
                <h2
                  id={`group-${group.status}`}
                  className="text-3xl font-semibold tracking-tight text-slate-950"
                >
                  {group.label} ({group.cases.length})
                </h2>
              </div>
            </div>

            <div
              aria-label={`${group.label} exceptions`}
              className={styles.exceptionGrid}
              role="list"
            >
              {group.cases.map((exc) => (
                <ExceptionCard
                  key={exc.id}
                  exception={exc}
                  hint={hintMap.get(exc.resolutionHintId)}
                />
              ))}
            </div>
          </section>
        ))}
      </div>
    </main>
  );
}
