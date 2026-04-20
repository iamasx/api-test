"use client";

import { useEffect, useState } from "react";
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

  useEffect(() => {
    if (filteredIncidents.length === 0) {
      setSelectedIncidentId(null);
      return;
    }

    if (
      !filteredIncidents.some((incident) => incident.id === selectedIncidentId)
    ) {
      setSelectedIncidentId(filteredIncidents[0]?.id ?? null);
    }
  }, [filteredIncidents, selectedIncidentId]);

  const selectedIncident =
    filteredIncidents.find((incident) => incident.id === selectedIncidentId) ??
    filteredIncidents[0] ??
    null;
  const summaryCards = buildSummaryCards(filteredIncidents);
  const severityCounts = getSeverityCounts(orderedIncidents);
  const latestActivity = getLatestActivityLabel(orderedIncidents);

  return (
    <main className="min-h-screen bg-slate-950 px-6 py-12 text-slate-50 sm:px-10 lg:px-14">
      <div className="mx-auto flex max-w-7xl flex-col gap-8">
        <header className="rounded-[2rem] border border-white/10 bg-white/5 p-8 shadow-2xl shadow-black/20 backdrop-blur">
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
            </div>

            <div className="grid gap-3 sm:grid-cols-2 xl:w-[24rem]">
              <article className="rounded-[1.5rem] border border-white/10 bg-slate-900/80 p-4">
                <p className="text-xs font-medium uppercase tracking-[0.24em] text-slate-500">
                  Mock incidents
                </p>
                <p className="mt-3 text-2xl font-semibold text-white">
                  {orderedIncidents.length}
                </p>
              </article>
              <article className="rounded-[1.5rem] border border-white/10 bg-slate-900/80 p-4">
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
          <div className="rounded-[2rem] border border-white/10 bg-white/5 p-6 backdrop-blur">
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
