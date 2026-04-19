"use client";
import { startTransition, useDeferredValue, useState } from "react";
import {
  alertToneFilters,
  comparisonDefaults,
  reportingWindows,
  telemetryDeskData,
  type AlertTone,
  type ReportingWindowId,
} from "@/app/telemetry-desk/mock-data";
import { AlertSummaryList } from "./alert-summary-list";
import { MetricTileGrid } from "./metric-tile-grid";
import { TelemetryDeskHeader } from "./telemetry-desk-header";
import { TrendComparisonPanels } from "./trend-comparison-panels";

function buildBaselineSelection(windowId: ReportingWindowId) {
  return Object.fromEntries(
    telemetryDeskData[windowId].panels.map((panel) => [panel.id, panel.defaultBaselineId]),
  );
}
const initialWindowId: ReportingWindowId = "6h";

export function TelemetryDeskShell() {
  const [windowId, setWindowId] = useState<ReportingWindowId>(initialWindowId);
  const [focusedMetricId, setFocusedMetricId] = useState<string | null>(
    comparisonDefaults[initialWindowId].focusMetricId,
  );
  const [hiddenPanelIds, setHiddenPanelIds] = useState<string[]>(
    comparisonDefaults[initialWindowId].hiddenPanelIds,
  );
  const [alertTone, setAlertTone] = useState<AlertTone | "all">("all");
  const [baselineByPanel, setBaselineByPanel] = useState<Record<string, string>>(
    () => buildBaselineSelection(initialWindowId),
  );
  const snapshot = telemetryDeskData[windowId];
  const focusedMetric = snapshot.metrics.find((metric) => metric.id === focusedMetricId) ?? null;
  const deferredMetricId = useDeferredValue(focusedMetricId);
  const visiblePanels = snapshot.panels.filter(
    (panel) =>
      !hiddenPanelIds.includes(panel.id) &&
      (!deferredMetricId || panel.metricIds.includes(deferredMetricId)),
  );
  const visibleAlerts = snapshot.alerts.filter(
    (alert) =>
      (alertTone === "all" || alert.severity === alertTone) &&
      (!deferredMetricId || alert.metricIds.includes(deferredMetricId)),
  );
  const activeMetricCount = snapshot.metrics.filter((metric) => metric.state === "active").length;

  function resetDesk(nextWindowId: ReportingWindowId = windowId) {
    const defaults = comparisonDefaults[nextWindowId];
    startTransition(() => {
      setFocusedMetricId(defaults.focusMetricId);
      setHiddenPanelIds(defaults.hiddenPanelIds);
      setAlertTone("all");
      setBaselineByPanel(buildBaselineSelection(nextWindowId));
    });
  }

  function handleWindowChange(nextWindowId: ReportingWindowId) {
    startTransition(() => setWindowId(nextWindowId));
    resetDesk(nextWindowId);
  }
  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top_left,rgba(56,189,248,0.18),transparent_30%),radial-gradient(circle_at_bottom_right,rgba(251,191,36,0.14),transparent_28%),linear-gradient(160deg,#07111b_0%,#0f172a_48%,#111827_100%)] px-4 py-6 text-slate-100 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl space-y-6">
        <TelemetryDeskHeader
          activeMetricCount={activeMetricCount}
          alertCount={visibleAlerts.length}
          focusedMetricLabel={focusedMetric?.label ?? null}
          onReset={() => resetDesk()}
          onWindowChange={handleWindowChange}
          panelCount={visiblePanels.length}
          periodLabel={snapshot.periodLabel}
          windowId={windowId}
          windows={reportingWindows}
        />
        <div className="grid gap-6 xl:grid-cols-[minmax(0,1.75fr)_minmax(320px,0.95fr)]">
          <div className="space-y-6">
            <MetricTileGrid
              focusedMetricId={focusedMetricId}
              metrics={snapshot.metrics}
              onToggleMetric={(metricId) =>
                startTransition(() =>
                  setFocusedMetricId((current) => (current === metricId ? null : metricId)),
                )
              }
            />
            <TrendComparisonPanels
              baselineByPanel={baselineByPanel}
              focusedMetricLabel={focusedMetric?.label ?? null}
              hiddenCount={hiddenPanelIds.length}
              onBaselineChange={(panelId, baselineId) =>
                startTransition(() =>
                  setBaselineByPanel((current) => ({ ...current, [panelId]: baselineId })),
                )
              }
              onHidePanel={(panelId) =>
                startTransition(() =>
                  setHiddenPanelIds((current) => [...current, panelId]),
                )
              }
              onReset={() => resetDesk()}
              panels={visiblePanels}
              totalPanels={snapshot.panels.length}
            />
          </div>
          <AlertSummaryList
            alerts={visibleAlerts}
            filter={alertTone}
            focusedMetricLabel={focusedMetric?.label ?? null}
            onFilterChange={(nextTone) => startTransition(() => setAlertTone(nextTone))}
            toneFilters={alertToneFilters}
          />
        </div>
      </div>
    </main>
  );
}
