import type { Metadata } from "next";
import Link from "next/link";

import styles from "./watchtower.module.css";
import {
  watchtowerAlerts,
  watchtowerHealthSummaries,
  watchtowerOperatorNotes,
  watchtowerOverview,
} from "./_data/watchtower-data";

export const metadata: Metadata = {
  title: "Watchtower",
  description:
    "Alert digest cards, service health summaries, and a compact operator notes rail for the next shift handoff.",
};

const alertToneClasses = {
  critical: styles.alertCritical,
  elevated: styles.alertElevated,
  watch: styles.alertWatch,
};

const alertToneLabels = {
  critical: "Critical",
  elevated: "Elevated",
  watch: "Watch",
};

const healthToneClasses = {
  stable: styles.healthStable,
  watch: styles.healthWatch,
  risk: styles.healthRisk,
};

const healthToneLabels = {
  stable: "Stable",
  watch: "Watch",
  risk: "Risk",
};

const noteStatusClasses = {
  queued: styles.noteQueued,
  tracking: styles.noteTracking,
  closed: styles.noteClosed,
};

const noteStatusLabels = {
  queued: "Queued",
  tracking: "Tracking",
  closed: "Closed",
};

export default function WatchtowerPage() {
  const criticalAlerts = watchtowerAlerts.filter(
    (alert) => alert.severity === "critical",
  ).length;
  const watchSummaries = watchtowerHealthSummaries.filter(
    (summary) => summary.tone !== "stable",
  ).length;
  const activeNotes = watchtowerOperatorNotes.filter((note) => note.status !== "closed").length;

  return (
    <main className={`${styles.shell} px-6 py-12 text-slate-50 sm:px-10 lg:px-16`}>
      <div className="relative mx-auto flex w-full max-w-7xl flex-col gap-6">
        <header
          className={`${styles.hero} rounded-[2rem] border border-white/10 p-8 backdrop-blur sm:p-10`}
        >
          <div className="grid gap-6 xl:grid-cols-[minmax(0,1.2fr)_minmax(280px,0.8fr)]">
            <div className="space-y-5">
              <p className="text-sm font-semibold uppercase tracking-[0.28em] text-amber-100/80">
                {watchtowerOverview.eyebrow}
              </p>
              <h1 className="max-w-4xl text-4xl font-semibold tracking-tight text-balance text-white sm:text-5xl lg:text-6xl">
                {watchtowerOverview.title}
              </h1>
              <p className="max-w-3xl text-base leading-8 text-slate-200 sm:text-lg">
                {watchtowerOverview.description}
              </p>

              <div className="flex flex-col gap-3 sm:flex-row">
                <a
                  href="#watchtower-digest"
                  className="inline-flex items-center justify-center rounded-full bg-amber-300 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-amber-200"
                >
                  Jump to alert digest
                </a>
                <a
                  href="#watchtower-health"
                  className="inline-flex items-center justify-center rounded-full border border-white/14 bg-white/8 px-5 py-3 text-sm font-semibold text-slate-100 transition hover:border-cyan-300/35 hover:bg-white/12"
                >
                  Review health summaries
                </a>
                <Link
                  href="/"
                  className="inline-flex items-center justify-center rounded-full border border-white/14 bg-slate-950/30 px-5 py-3 text-sm font-semibold text-slate-100 transition hover:border-white/28 hover:bg-slate-900/60"
                >
                  Back to route index
                </Link>
              </div>
            </div>
            <aside className={`${styles.panel} rounded-[1.6rem] border border-white/10 p-6`}>
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-400">
                Handoff pulse
              </p>
              <p className="mt-3 text-lg font-semibold text-white">
                {watchtowerOverview.digestWindow}
              </p>
              <p className="mt-3 text-sm leading-7 text-slate-200">
                {watchtowerOverview.focusNote}
              </p>
              <p className="mt-4 text-sm font-medium text-cyan-100">
                {watchtowerOverview.shiftLead}
              </p>
              <div className="mt-5 grid gap-3 sm:grid-cols-3">
                {[
                  { label: "Critical digests", value: String(criticalAlerts) },
                  { label: "Watch summaries", value: String(watchSummaries) },
                  { label: "Active notes", value: String(activeNotes) },
                ].map((stat) => (
                  <div key={stat.label} className="rounded-[1.2rem] border border-white/10 bg-white/6 px-4 py-4">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400">{stat.label}</p>
                    <p className="mt-2 text-2xl font-semibold tracking-tight text-white">{stat.value}</p>
                  </div>
                ))}
              </div>
            </aside>
          </div>
        </header>

        <div className={styles.contentGrid}>
          <div className={styles.stack}>
            <section
              aria-label="Watchtower alert digest"
              className={`${styles.panel} rounded-[1.9rem] border border-white/10 p-6`}
              id="watchtower-digest"
            >
              <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
                <div className="space-y-2">
                  <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-400">
                    Alert digest cards
                  </p>
                  <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
                    Alert digest cards built for the next operator handoff
                  </h2>
                </div>
                <p className="max-w-2xl text-sm leading-7 text-slate-300">
                  Each card compresses service scope, digest context, affected
                  systems, and the next operator decision into one scan-ready
                  block.
                </p>
              </div>
              <div aria-label="Watchtower alert digest cards" className={`${styles.list} mt-6`} role="list">
                {watchtowerAlerts.map((alert) => (
                  <article
                    key={alert.title}
                    className={`${styles.alertCard} ${alertToneClasses[alert.severity]} rounded-[1.6rem] border px-5 py-5`}
                    role="listitem"
                  >
                    <div className="flex flex-wrap gap-2">
                      <span className={`${styles.pill} rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-white`}>
                        {alertToneLabels[alert.severity]}
                      </span>
                      <span className="rounded-full border border-white/10 bg-white/4 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-300">
                        {alert.service}
                      </span>
                    </div>
                    <h3 className="mt-3 text-2xl font-semibold tracking-tight text-white">{alert.title}</h3>
                    <p className="mt-2 text-sm text-slate-300">{alert.scope} · {alert.owner}</p>
                    <p className="mt-4 max-w-4xl text-sm leading-7 text-slate-200">{alert.digest}</p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {alert.affectedSystems.map((system) => (
                        <span key={system} className={`${styles.pill} rounded-full px-3 py-1 text-xs text-slate-200`}>
                          {system}
                        </span>
                      ))}
                    </div>
                    <p className="mt-4 text-sm leading-7 text-cyan-100">{alert.nextStep}</p>
                  </article>
                ))}
              </div>
            </section>

            <section
              aria-label="Watchtower health summaries"
              className={`${styles.panel} rounded-[1.9rem] border border-white/10 p-6`}
              id="watchtower-health"
            >
              <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
                <div className="space-y-2">
                  <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-400">
                    Health summaries
                  </p>
                  <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
                    Short health summaries for the systems that shape the handoff
                  </h2>
                </div>
                <p className="max-w-2xl text-sm leading-7 text-slate-300">
                  These summaries stay short on purpose: one signal, one owner,
                  one recommendation, and no hidden secondary state.
                </p>
              </div>

              <div className={`${styles.healthGrid} mt-6`}>
                {watchtowerHealthSummaries.map((summary) => (
                  <article
                    key={summary.title}
                    className={`${styles.healthCard} ${healthToneClasses[summary.tone]} rounded-[1.5rem] border px-5 py-5`}
                  >
                    <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400">{healthToneLabels[summary.tone]}</p>
                    <h3 className="mt-3 text-xl font-semibold text-white">{summary.title}</h3>
                    <p className="mt-2 text-sm font-medium text-cyan-100">{summary.signal}</p>
                    <p className="mt-3 text-sm leading-7 text-slate-200">{summary.summary}</p>
                    <div className="mt-5 rounded-[1.2rem] border border-white/10 bg-white/5 px-4 py-4">
                      <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400">Owner</p>
                      <p className="mt-2 text-sm text-slate-100">{summary.owner}</p>
                      <p className="mt-3 text-sm leading-7 text-slate-200">{summary.recommendation}</p>
                    </div>
                  </article>
                ))}
              </div>
            </section>
          </div>

          <aside
            aria-label="Operator notes rail"
            className={`${styles.rail} rounded-[1.9rem] border border-white/10 p-5`}
          >
            <div className={styles.stickyRail}>
              <section className="rounded-[1.5rem] border border-white/10 bg-white/5 p-5">
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-400">
                  Operator notes rail
                </p>
                <h2 className="mt-3 text-2xl font-semibold tracking-tight text-white">
                  Compact notes that survive the handoff
                </h2>
                <p className="mt-3 text-sm leading-7 text-slate-300">
                  Notes stay compact so the incoming operator can scan intent,
                  ownership, and follow-up without reopening the full incident
                  trail.
                </p>
              </section>

              <div aria-label="Watchtower operator note entries" className={styles.list} role="list">
                {watchtowerOperatorNotes.map((note) => (
                  <article
                    key={`${note.author}-${note.time}`}
                    className={`${styles.noteCard} ${noteStatusClasses[note.status]} rounded-[1.4rem] border px-4 py-4`}
                    role="listitem"
                  >
                    <div className="flex flex-wrap gap-2">
                      <span className={`${styles.pill} rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-white`}>
                        {noteStatusLabels[note.status]}
                      </span>
                      <span className="text-xs font-medium uppercase tracking-[0.14em] text-slate-400">{note.channel}</span>
                    </div>
                    <p className="mt-3 text-sm font-semibold text-white">{note.author}</p>
                    <p className="mt-1 text-xs uppercase tracking-[0.14em] text-slate-400">{note.time}</p>
                    <p className="mt-3 text-sm leading-7 text-slate-200">{note.note}</p>
                    <p className="mt-3 text-sm leading-7 text-cyan-100">{note.followUp}</p>
                  </article>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}
