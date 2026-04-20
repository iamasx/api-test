import type { Metadata } from "next";
import Link from "next/link";

import { IncidentCard } from "./_components/incident-card";
import { OwnershipSummaryPanel } from "./_components/ownership-summary-panel";
import { ResponseTimeline } from "./_components/response-timeline";
import {
  activeIncidents,
  getIncidentDeckMetrics,
  getOwnershipSnapshot,
  getTimelineWindowLabel,
  incidentDeckOverview,
  ownershipCells,
  responseTimeline,
} from "./_data/incident-deck-data";
import styles from "./incident-deck.module.css";

export const metadata: Metadata = {
  title: "Incident Deck",
  description:
    "Active incidents, response timing, and ownership posture staged on a dedicated operational route.",
};

export default function IncidentDeckPage() {
  const metrics = getIncidentDeckMetrics();
  const ownershipSnapshot = getOwnershipSnapshot();
  const timelineWindowLabel = getTimelineWindowLabel();
  const incidentServiceById = activeIncidents.reduce<Record<string, string>>(
    (lookup, incident) => {
      lookup[incident.id] = incident.service;
      return lookup;
    },
    {},
  );

  const metricToneClassNames = {
    critical: styles.toneCritical,
    watch: styles.toneWatch,
    steady: styles.toneSteady,
  };

  return (
    <main className={styles.shell}>
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-8 px-6 py-12 sm:px-10 lg:px-12 lg:py-14">
        <section
          className={`${styles.surfaceCard} ${styles.heroPanel} rounded-[2.2rem] p-8 sm:p-10 lg:p-12`}
        >
          <div className="flex flex-wrap items-center justify-between gap-4">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-500">
              {incidentDeckOverview.eyebrow}
            </p>
            <Link
              href="/"
              className="rounded-full border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 transition-colors hover:border-slate-950 hover:text-slate-950"
            >
              Back to overview
            </Link>
          </div>

          <div className="mt-8 grid gap-8 xl:grid-cols-[minmax(0,1.25fr)_minmax(19rem,0.75fr)]">
            <div className="space-y-6">
              <div className="space-y-4">
                <h1 className="max-w-5xl text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl lg:text-6xl">
                  {incidentDeckOverview.title}
                </h1>
                <p className="max-w-3xl text-base leading-8 text-slate-600 sm:text-lg">
                  {incidentDeckOverview.description}
                </p>
              </div>

              <div className="flex flex-col gap-4 sm:flex-row">
                {incidentDeckOverview.actions.map((action) => (
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

            <aside
              className={`${styles.darkPanel} rounded-[1.8rem] border border-slate-200 p-6 text-white`}
            >
              <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-slate-400">
                Active window
              </p>
              <p className="mt-3 text-2xl font-semibold tracking-tight">
                {incidentDeckOverview.activeWindow}
              </p>
              <p className="mt-4 text-sm leading-7 text-slate-300">
                {incidentDeckOverview.routeNote}
              </p>
              <div className="mt-6 rounded-[1.2rem] border border-white/10 bg-white/8 px-4 py-4">
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400">
                  Timeline coverage
                </p>
                <p className="mt-2 text-sm font-medium text-slate-100">
                  {timelineWindowLabel}
                </p>
              </div>
            </aside>
          </div>
        </section>

        <section aria-label="Incident deck metrics">
          <div className={styles.metricsGrid} role="list">
            {metrics.map((metric) => (
              <article
                key={metric.id}
                className={`${styles.metricCard} ${metricToneClassNames[metric.tone]}`}
                role="listitem"
              >
                <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-500">
                  {metric.label}
                </p>
                <p className="mt-3 text-4xl font-semibold tracking-tight text-slate-950">
                  {metric.value}
                </p>
                <p className="mt-3 text-sm leading-7 text-slate-700">
                  {metric.detail}
                </p>
              </article>
            ))}
          </div>
        </section>

        <div className={styles.twoColumnLayout}>
          <section
            id="active-incident-cards"
            aria-labelledby="active-incident-cards-heading"
            className="space-y-6"
          >
            <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
              <div className="space-y-2">
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">
                  Current response load
                </p>
                <h2
                  id="active-incident-cards-heading"
                  className="text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl"
                >
                  Active incident cards
                </h2>
              </div>
              <p className="max-w-3xl text-sm leading-7 text-slate-600">
                Each card exposes the current blast radius, mitigation path,
                workstreams, and the next committed update window.
              </p>
            </div>

            <div className={styles.incidentGrid} role="list" aria-label="Active incidents">
              {activeIncidents.map((incident) => (
                <IncidentCard key={incident.id} incident={incident} />
              ))}
            </div>
          </section>

          <OwnershipSummaryPanel
            cells={ownershipCells}
            snapshot={ownershipSnapshot}
            incidentServiceById={incidentServiceById}
          />
        </div>

        <section className={`${styles.timelineFrame} rounded-[2rem] p-6 sm:p-8`}>
          <ResponseTimeline
            events={responseTimeline}
            incidentServiceById={incidentServiceById}
            windowLabel={timelineWindowLabel}
          />
        </section>
      </div>
    </main>
  );
}
