"use client";

import { useState } from "react";
import { IncidentDetailPanel } from "./components/incident-detail-panel";
import { IncidentListItem } from "./components/incident-list-item";
import { IncidentSummaryCard } from "./components/incident-summary-card";
import { SeverityFilter } from "./components/severity-filter";
import type { Incident } from "./data";
import {
  buildSummaryCards,
  filterIncidents,
  getLatestActivityLabel,
  getSeverityCounts,
  sortIncidents,
  type SeverityFilter as ActiveSeverity,
} from "./utils";

type IncidentTimelineReviewProps = {
  incidents: Incident[];
};

export function IncidentTimelineReview({
  incidents,
}: IncidentTimelineReviewProps) {
  const orderedIncidents = sortIncidents(incidents);
  const [activeSeverity, setActiveSeverity] =
    useState<ActiveSeverity>("All");
  const [selectedIncidentId, setSelectedIncidentId] = useState<string | null>(
    orderedIncidents[0]?.id ?? null
  );

  const filteredIncidents = filterIncidents(orderedIncidents, activeSeverity);

  const selectedIncident =
    filteredIncidents.find((incident) => incident.id === selectedIncidentId) ??
    filteredIncidents[0] ??
    null;
  const summaryCards = buildSummaryCards(filteredIncidents);
  const severityCounts = getSeverityCounts(orderedIncidents);
  const latestActivity = getLatestActivityLabel(orderedIncidents);

  return (
    <main className="relative min-h-screen overflow-hidden bg-slate-950 px-6 py-12 text-slate-50 sm:px-10 lg:px-14">
      <div className="absolute inset-0">
        <div className="absolute left-[-8rem] top-0 h-72 w-72 rounded-full bg-cyan-500/12 blur-3xl" />
        <div className="absolute right-[-6rem] top-28 h-80 w-80 rounded-full bg-amber-400/10 blur-3xl" />
        <div className="absolute bottom-[-8rem] left-1/3 h-96 w-96 rounded-full bg-emerald-400/8 blur-3xl" />
      </div>

      <div className="relative mx-auto flex max-w-7xl flex-col gap-8">
        <header className="rounded-[2rem] border border-white/10 bg-linear-to-br from-white/8 via-white/4 to-slate-950/80 p-8 shadow-2xl shadow-black/20 backdrop-blur">
          <div className="flex flex-col gap-6 xl:flex-row xl:items-end xl:justify-between">
            <div className="max-w-3xl">
              <p className="text-sm font-medium uppercase tracking-[0.28em] text-cyan-300">
                Review Workspace
              </p>
              <h1 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">
                Incident Timeline Review
              </h1>
              <p className="mt-4 text-base leading-7 text-slate-300 sm:text-lg">
                Compare incident summaries, apply severity filters, and inspect
                the detailed response timeline for the selected incident without
                leaving the route.
              </p>

              <div className="mt-5 flex flex-wrap gap-2">
                <span className="rounded-full border border-cyan-300/20 bg-cyan-300/10 px-3 py-1 text-xs font-medium uppercase tracking-[0.18em] text-cyan-100">
                  Active filter: {activeSeverity}
                </span>
                <span className="rounded-full border border-white/10 bg-black/15 px-3 py-1 text-xs font-medium uppercase tracking-[0.18em] text-slate-200">
                  Route-scoped mock review
                </span>
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-2 xl:w-[24rem]">
              <article className="rounded-[1.5rem] border border-white/10 bg-linear-to-br from-white/[0.06] via-white/[0.03] to-slate-950/90 p-4">
                <p className="text-xs font-medium uppercase tracking-[0.24em] text-slate-500">
                  Mock incidents
                </p>
                <p className="mt-3 text-2xl font-semibold text-white">
                  {orderedIncidents.length}
                </p>
              </article>
              <article className="rounded-[1.5rem] border border-white/10 bg-linear-to-br from-white/[0.06] via-white/[0.03] to-slate-950/90 p-4">
                <p className="text-xs font-medium uppercase tracking-[0.24em] text-slate-500">
                  Latest checkpoint
                </p>
                <p className="mt-3 text-base font-semibold text-white">
                  {latestActivity}
                </p>
              </article>
            </div>
          </div>
        </header>

        <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {summaryCards.map((card) => (
            <IncidentSummaryCard
              key={card.id}
              detail={card.detail}
              label={card.label}
              tone={card.tone}
              value={card.value}
            />
          ))}
        </section>

        <SeverityFilter
          activeSeverity={activeSeverity}
          counts={severityCounts}
          onChange={setActiveSeverity}
        />

        <section className="grid gap-6 xl:grid-cols-[minmax(0,0.9fr)_minmax(0,1.15fr)]">
          <div className="rounded-[2rem] border border-white/10 bg-linear-to-br from-white/7 via-white/4 to-slate-950/80 p-6 backdrop-blur">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="text-xs font-medium uppercase tracking-[0.24em] text-slate-500">
                  Incident queue
                </p>
                <h2 className="mt-2 text-2xl font-semibold text-white">
                  Visible incidents
                </h2>
                <p className="mt-2 text-sm leading-6 text-slate-300">
                  Choose an incident to inspect the detail panel and response
                  timeline on the right.
                </p>
              </div>
              <p className="text-sm text-slate-400">
                {filteredIncidents.length} incidents shown
              </p>
            </div>

            <div aria-label="Incident list" className="mt-6 space-y-4">
              {filteredIncidents.map((incident) => (
                <IncidentListItem
                  key={incident.id}
                  incident={incident}
                  onSelect={setSelectedIncidentId}
                  selected={incident.id === selectedIncident?.id}
                />
              ))}
            </div>
          </div>

          <IncidentDetailPanel incident={selectedIncident} />
        </section>
      </div>
    </main>
  );
}
