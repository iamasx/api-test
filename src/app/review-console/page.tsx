import type { Metadata } from "next";
import Link from "next/link";

import { DecisionNotesPanel } from "./_components/decision-notes-panel";
import { ReviewItemCard } from "./_components/review-item-card";
import { getReviewConsoleView } from "./_data/review-console-data";

export const metadata: Metadata = {
  title: "Review Console",
  description:
    "Review items, decision notes, and a compact status summary strip on a dedicated route.",
};

const toneClassNames = {
  steady: "border-l-teal-700 bg-teal-50/70",
  watch: "border-l-amber-600 bg-amber-50/70",
  risk: "border-l-rose-700 bg-rose-50/70",
};

export default function ReviewConsolePage() {
  const view = getReviewConsoleView();

  return (
    <main
      className="min-h-screen"
      style={{
        background:
          "radial-gradient(circle at top left, rgba(15,118,110,0.16), transparent 28%), radial-gradient(circle at top right, rgba(251,191,36,0.14), transparent 24%), linear-gradient(180deg, #f7f2e8 0%, #f4efe5 45%, #edf0f5 100%)",
      }}
    >
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-8 px-6 py-10 sm:px-10 lg:px-12 lg:py-14">
        <section className="rounded-[2rem] border border-slate-200/80 bg-white/85 p-8 shadow-[0_24px_90px_rgba(15,23,42,0.08)] backdrop-blur sm:p-10">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-500">
              {view.overview.eyebrow}
            </p>
            <Link
              href="/"
              className="rounded-full border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition-colors hover:border-slate-950 hover:text-slate-950"
            >
              Back to overview
            </Link>
          </div>

          <div className="mt-8 space-y-5">
            <h1 className="max-w-4xl text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl lg:text-6xl">
              {view.overview.title}
            </h1>
            <p className="max-w-3xl text-base leading-8 text-slate-600 sm:text-lg">
              {view.overview.description}
            </p>
            <div className="flex flex-col gap-3 sm:flex-row">
              {view.overview.actions.map((action) => (
                <a
                  key={action.href}
                  href={action.href}
                  className="inline-flex items-center justify-center rounded-full border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-800 transition hover:border-slate-950 hover:text-slate-950"
                >
                  {action.label}
                </a>
              ))}
            </div>
          </div>
        </section>

        <section aria-labelledby="review-summary-strip" className="space-y-4">
          <div className="space-y-2">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">
              Status summary
            </p>
            <h2
              id="review-summary-strip"
              className="text-3xl font-semibold tracking-tight text-slate-950"
            >
              Compact status strip
            </h2>
          </div>
          <div
            className="grid gap-4 md:grid-cols-2 xl:grid-cols-4"
            role="list"
            aria-label="Review console status summary"
          >
            {view.summaryStrip.map((metric) => (
              <article
                key={metric.id}
                className={`rounded-[1.35rem] border border-slate-200/80 border-l-4 p-4 shadow-[0_12px_35px_rgba(15,23,42,0.05)] ${toneClassNames[metric.tone]}`}
                role="listitem"
              >
                <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-500">
                  {metric.label}
                </p>
                <p className="mt-3 text-3xl font-semibold tracking-tight text-slate-950">
                  {metric.value}
                </p>
                <p className="mt-2 text-sm leading-6 text-slate-600">{metric.detail}</p>
              </article>
            ))}
          </div>
        </section>

        <div className="grid gap-6 xl:grid-cols-[minmax(0,1.34fr)_minmax(22rem,0.82fr)]">
          <section id="review-items" aria-labelledby="review-items-heading" className="space-y-5">
            <div className="space-y-2">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">
                Review items
              </p>
              <h2
                id="review-items-heading"
                className="text-3xl font-semibold tracking-tight text-slate-950"
              >
                Active review items with decision metadata
              </h2>
            </div>

            <div className="grid gap-4 lg:grid-cols-2" role="list" aria-label="Review items">
              {view.reviewItems.map((item) => (
                <ReviewItemCard key={item.id} item={item} />
              ))}
            </div>
          </section>

          <DecisionNotesPanel sections={view.decisionNoteSections} />
        </div>
      </div>
    </main>
  );
}
