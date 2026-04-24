import type { Metadata } from "next";
import Link from "next/link";

import { ComplianceNotes } from "./_components/compliance-notes";
import { PolicyCard } from "./_components/policy-card";
import styles from "./policy-board.module.css";
import {
  complianceNotes,
  policies,
  policyBoardOverview,
  reviewSummaries,
} from "./_data/policy-board-data";

export const metadata: Metadata = {
  title: "Policy Board",
  description:
    "Policy cards, compliance notes, and review summaries for organizational governance and audit readiness.",
};

export default function PolicyBoardPage() {
  return (
    <main className={`${styles.shell} px-6 py-12 text-slate-50 sm:px-10 lg:px-16`}>
      <div className="relative mx-auto flex w-full max-w-7xl flex-col gap-8">
        {/* Hero */}
        <header
          className={`${styles.heroPanel} overflow-hidden rounded-[2rem] border border-white/10 p-8 backdrop-blur sm:p-10`}
        >
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl space-y-4">
              <span className="inline-flex w-fit rounded-full border border-indigo-300/35 bg-indigo-300/12 px-4 py-1 text-sm font-medium uppercase tracking-[0.2em] text-indigo-100">
                {policyBoardOverview.eyebrow}
              </span>
              <h1 className="text-4xl font-semibold tracking-tight text-balance sm:text-5xl">
                {policyBoardOverview.title}
              </h1>
              <p className="max-w-2xl text-base leading-7 text-slate-300 sm:text-lg">
                {policyBoardOverview.description}
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:items-end">
              <div
                className={`${styles.floatingInfo} rounded-[1.4rem] border border-white/10 px-4 py-4 text-sm text-slate-200`}
              >
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400">
                  Review cycle
                </p>
                <p className="mt-2 text-lg font-semibold text-white">
                  {policyBoardOverview.reviewCycle}
                </p>
                <p className="mt-2 text-sm text-slate-300">
                  {policyBoardOverview.scope}
                </p>
              </div>

              <Link
                href="/"
                className="inline-flex items-center justify-center rounded-full border border-white/15 bg-slate-950/40 px-5 py-3 text-sm font-semibold text-slate-100 transition hover:border-indigo-300/45 hover:bg-slate-900"
              >
                Back to overview
              </Link>
            </div>
          </div>
        </header>

        {/* Review summary */}
        <section aria-label="Review summary" className="grid gap-4 md:grid-cols-3">
          {reviewSummaries.map((stat) => (
            <article
              key={stat.label}
              className={`${styles.statCard} rounded-[1.5rem] border border-white/10 px-5 py-5`}
            >
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-400">
                {stat.label}
              </p>
              <p className="mt-3 text-3xl font-semibold tracking-tight text-white">
                {stat.value}
              </p>
              <p className="mt-2 text-sm leading-6 text-slate-300">{stat.detail}</p>
            </article>
          ))}
        </section>

        {/* Policy cards */}
        <section className="space-y-5">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
            <div className="space-y-2">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-400">
                Governance
              </p>
              <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
                Active and reviewed policies
              </h2>
            </div>
            <p className="max-w-2xl text-sm leading-6 text-slate-300">
              Each card represents an organizational policy with its current status,
              ownership, and a brief summary of scope.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2" role="list" aria-label="Policy cards">
            {policies.map((policy) => (
              <PolicyCard key={policy.id} policy={policy} />
            ))}
          </div>
        </section>

        {/* Compliance notes */}
        <ComplianceNotes notes={complianceNotes} />
      </div>
    </main>
  );
}
