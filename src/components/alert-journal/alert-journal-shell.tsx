"use client";

import { startTransition, useState } from "react";
import { severityOptions, type AlertJournalDay, type AlertSeverity, type ResolutionState } from "@/app/alert-journal/alert-journal-data";
import { AlertDayGroups } from "./alert-day-groups";
import { AlertDetailRail } from "./alert-detail-rail";
import { AlertJournalHeader } from "./alert-journal-header";
import { SeverityFilterBar } from "./severity-filter-bar";

type AlertJournalShellProps = { initialDays: AlertJournalDay[] };

const allSeverityValues = severityOptions.map((option) => option.value);

export function AlertJournalShell({ initialDays }: AlertJournalShellProps) {
  const [activeSeverities, setActiveSeverities] = useState<AlertSeverity[]>(allSeverityValues);
  const [expandedDayIds, setExpandedDayIds] = useState<string[]>(initialDays.map((day) => day.id));
  const [selectedDayId, setSelectedDayId] = useState<string | null>(initialDays[0]?.id ?? null);
  const [selectedAlertId, setSelectedAlertId] = useState<string | null>(initialDays[0]?.alerts[0]?.id ?? null);
  const [resolutionById, setResolutionById] = useState<Record<string, ResolutionState>>(() => Object.fromEntries(initialDays.flatMap((day) => day.alerts.map((alert) => [alert.id, alert.initialResolution]))));
  const allAlerts = initialDays.flatMap((day) => day.alerts);
  const visibleDays = initialDays.map((day) => ({ ...day, visibleAlerts: day.alerts.filter((alert) => activeSeverities.includes(alert.severity)) }));
  const selectedDay = selectedDayId ? initialDays.find((day) => day.id === selectedDayId) ?? null : null;
  const selectedDayView = selectedDayId ? visibleDays.find((day) => day.id === selectedDayId) ?? null : null;
  const selectedAlert = selectedAlertId ? allAlerts.find((alert) => alert.id === selectedAlertId) ?? null : null;
  const selectedAlertDayLabel = initialDays.find((day) => day.alerts.some((entry) => entry.id === selectedAlertId))?.dateLabel ?? null;
  const selectedAlertVisible = selectedAlertId ? visibleDays.some((day) => day.visibleAlerts.some((alert) => alert.id === selectedAlertId)) : false;
  const totalVisibleAlerts = visibleDays.reduce((count, day) => count + day.visibleAlerts.length, 0);
  const openCount = allAlerts.filter((alert) => resolutionById[alert.id] === "open").length;
  const monitoringCount = allAlerts.filter((alert) => resolutionById[alert.id] === "monitoring").length;
  const resolvedCount = allAlerts.filter((alert) => resolutionById[alert.id] === "resolved").length;

  function toggleSeverity(severity: AlertSeverity) {
    startTransition(() => setActiveSeverities((current) => current.includes(severity) ? current.filter((value) => value !== severity) : [...current, severity]));
  }

  function restoreSeverityFilters() { startTransition(() => setActiveSeverities(allSeverityValues)); }

  function toggleDay(dayId: string) {
    startTransition(() => setExpandedDayIds((current) => current.includes(dayId) ? current.filter((value) => value !== dayId) : [...current, dayId]));
  }

  function selectDay(dayId: string) {
    const nextDayId = selectedDayId === dayId ? null : dayId;
    const nextDay = initialDays.find((day) => day.id === nextDayId);
    startTransition(() => {
      setSelectedDayId(nextDayId);
      setSelectedAlertId(nextDay?.alerts.find((alert) => activeSeverities.includes(alert.severity))?.id ?? null);
      setExpandedDayIds((current) => (nextDayId && !current.includes(nextDayId) ? [...current, nextDayId] : current));
    });
  }

  function selectAlert(dayId: string, alertId: string) {
    startTransition(() => {
      setSelectedDayId(dayId);
      setSelectedAlertId(alertId);
      setExpandedDayIds((current) => (current.includes(dayId) ? current : [...current, dayId]));
    });
  }

  function updateResolution(alertId: string, resolution: ResolutionState) { startTransition(() => setResolutionById((current) => ({ ...current, [alertId]: resolution }))); }

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top_left,rgba(244,114,182,0.18),transparent_28%),radial-gradient(circle_at_right,rgba(59,130,246,0.16),transparent_24%),linear-gradient(180deg,#0f172a_0%,#111827_55%,#050816_100%)] px-4 py-6 text-slate-100 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl space-y-6">
        <AlertJournalHeader
          days={initialDays}
          monitoringCount={monitoringCount}
          openCount={openCount}
          resolvedCount={resolvedCount}
          selectedDay={selectedDay}
          selectedDayId={selectedDayId}
          selectedDayVisibleCount={selectedDayView?.visibleAlerts.length ?? 0}
          totalAlerts={allAlerts.length}
          onSelectDay={selectDay}
        />
        <div className="grid gap-6 xl:grid-cols-[minmax(0,1.65fr)_minmax(320px,0.95fr)]">
          <div className="space-y-6">
            <SeverityFilterBar activeSeverities={activeSeverities} totalAlerts={allAlerts.length} totalVisibleAlerts={totalVisibleAlerts} onRestoreAll={restoreSeverityFilters} onToggleSeverity={toggleSeverity} />
            <AlertDayGroups days={visibleDays} expandedDayIds={expandedDayIds} resolutionById={resolutionById} selectedAlertId={selectedAlertId} selectedDayId={selectedDayId} onRestoreFilters={restoreSeverityFilters} onSelectAlert={selectAlert} onSelectDay={selectDay} onToggleDay={toggleDay} />
          </div>
          <AlertDetailRail alert={selectedAlert} dayLabel={selectedAlertDayLabel} isVisibleInCurrentFilters={selectedAlertVisible} resolution={selectedAlert ? resolutionById[selectedAlert.id] : null} onUpdateResolution={updateResolution} />
        </div>
      </div>
    </main>
  );
}
