"use client";

import { startTransition, useState } from "react";
import {
  incidentResponders,
  incidents,
  incidentSeverities,
  incidentTimeline,
  type IncidentSeverity,
  type IncidentSeverityFilter,
  type ResponderRecord,
  type SeverityLevel,
} from "@/app/incident-deck/mock-data";
import { IncidentDeckHeader } from "./incident-deck-header";
import { IncidentStack } from "./incident-stack";
import { ResponderPanel } from "./responder-panel";
import { ResponseTimeline } from "./response-timeline";
import { SeverityFilterBar } from "./severity-filter-bar";

export function IncidentDeckShell() {
  const [selectedSeverity, setSelectedSeverity] =
    useState<IncidentSeverityFilter>("all");
  const [selectedIncidentId, setSelectedIncidentId] = useState<string | null>(
    incidents[0]?.id ?? null,
  );
  const [selectedResponderId, setSelectedResponderId] = useState<string | null>(
    null,
  );

  const visibleIncidents = incidents.filter(
    (incident) =>
      selectedSeverity === "all" || incident.severity === selectedSeverity,
  );
  const activeIncidentId =
    selectedIncidentId &&
    visibleIncidents.some((incident) => incident.id === selectedIncidentId)
      ? selectedIncidentId
      : (visibleIncidents[0]?.id ?? null);
  const activeIncident =
    incidents.find((incident) => incident.id === activeIncidentId) ?? null;
  const activeResponders = activeIncident
    ? activeIncident.responderIds.flatMap((responderId) => {
        const responder = incidentResponders.find(
          (candidate) => candidate.id === responderId,
        );

        return responder ? [responder] : [];
      })
    : [];
  const selectedResponder =
    activeResponders.find((responder) => responder.id === selectedResponderId) ??
    null;
  const timelineEntries = incidentTimeline.filter((entry) => {
    if (entry.incidentId !== activeIncident?.id) return false;
    if (!selectedResponderId) return true;
    return entry.responderIds.includes(selectedResponderId);
  });
  const severitySummary = incidentSeverities
    .map((severity) => ({
      ...severity,
      count: incidents.filter((incident) => incident.severity === severity.id)
        .length,
    }))
    .filter((severity) => severity.count > 0);
  const severityLookup = Object.fromEntries(
    incidentSeverities.map((severity) => [severity.id, severity]),
  ) as Record<IncidentSeverity, SeverityLevel>;
  const respondersById = Object.fromEntries(
    incidentResponders.map((responder) => [responder.id, responder]),
  ) as Record<string, ResponderRecord>;

  function handleSeverityChange(nextSeverity: IncidentSeverityFilter) {
    startTransition(() => {
      setSelectedSeverity(nextSeverity);
      setSelectedResponderId(null);
    });
  }

  function handleSelectIncident(incidentId: string) {
    startTransition(() => {
      setSelectedIncidentId(incidentId);
      setSelectedResponderId(null);
    });
  }

  function handleFocusResponder(incidentId: string, responderId: string) {
    startTransition(() => {
      setSelectedIncidentId(incidentId);
      setSelectedResponderId((current) =>
        activeIncidentId === incidentId && current === responderId
          ? null
          : responderId,
      );
    });
  }

  function handleSelectResponder(responderId: string) {
    startTransition(() => {
      setSelectedResponderId((current) =>
        current === responderId ? null : responderId,
      );
    });
  }

  function resetFilters() {
    startTransition(() => {
      setSelectedSeverity("all");
      setSelectedIncidentId(incidents[0]?.id ?? null);
      setSelectedResponderId(null);
    });
  }

  function clearResponderFocus() {
    startTransition(() => {
      setSelectedResponderId(null);
    });
  }

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top_left,rgba(56,189,248,0.18),transparent_33%),radial-gradient(circle_at_top_right,rgba(249,115,22,0.14),transparent_28%),linear-gradient(180deg,#081121_0%,#10192f_45%,#182133_100%)] px-4 py-6 text-slate-100 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl space-y-6">
        <IncidentDeckHeader
          selectedSeverity={selectedSeverity}
          severitySummary={severitySummary}
          totalCount={incidents.length}
          visibleCount={visibleIncidents.length}
        />

        <SeverityFilterBar
          activeSeverity={selectedSeverity}
          options={severitySummary}
          totalCount={incidents.length}
          visibleCount={visibleIncidents.length}
          onSelect={handleSeverityChange}
        />

        <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_minmax(0,1.25fr)]">
          <IncidentStack
            activeIncidentId={activeIncidentId}
            incidents={visibleIncidents}
            respondersById={respondersById}
            selectedResponderId={selectedResponderId}
            severityLookup={severityLookup}
            onFocusResponder={handleFocusResponder}
            onResetFilters={resetFilters}
            onSelectIncident={handleSelectIncident}
          />

          <div className="grid gap-6 lg:grid-cols-[minmax(0,1.15fr)_minmax(18rem,0.85fr)]">
            <ResponseTimeline
              entries={timelineEntries}
              hasResponderFocus={selectedResponderId !== null}
              incident={activeIncident}
              respondersById={respondersById}
              selectedResponder={selectedResponder}
              onClearResponder={clearResponderFocus}
              onSelectResponder={handleSelectResponder}
            />
            <ResponderPanel
              incident={activeIncident}
              responders={activeResponders}
              selectedResponder={selectedResponder}
              onClearResponder={clearResponderFocus}
              onSelectResponder={handleSelectResponder}
            />
          </div>
        </div>
      </div>
    </main>
  );
}
