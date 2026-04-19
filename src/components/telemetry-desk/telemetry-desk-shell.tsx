"use client";

import { useTransition, useState } from "react";

import { AlertSummaryRail } from "./alert-summary-rail";
import { MetricTileGrid } from "./metric-tile-grid";
import {
  getDefaultPanelModes,
  telemetryDeskSnapshots,
  type TelemetryWindowId,
  telemetryWindows,
} from "./mock-data";
import { TelemetryDeskHeader } from "./telemetry-desk-header";
import { TrendComparisonPanels } from "./trend-comparison-panels";

const initialWindow = telemetryWindows[1]?.id ?? telemetryWindows[0].id;
const initialSnapshot = telemetryDeskSnapshots[initialWindow];

export function TelemetryDeskShell() {
  const [selectedWindow, setSelectedWindow] = useState<TelemetryWindowId>(initialWindow);
  const [activeMetricId, setActiveMetricId] = useState<string | null>(initialSnapshot.metrics[0]?.id ?? null);
  const [panelModes, setPanelModes] = useState<Record<string, string>>(getDefaultPanelModes(initialSnapshot.comparisons));
  const [isPending, startTransition] = useTransition();

  const snapshot = telemetryDeskSnapshots[selectedWindow];
  const activeMetric = snapshot.metrics.find((metric) => metric.id === activeMetricId) ?? null;
  const visiblePanels = activeMetric ? snapshot.comparisons.filter((panel) => panel.metrics.includes(activeMetric.id)) : [];

  function handleSelectWindow(windowId: TelemetryWindowId) {
    if (windowId === selectedWindow) return;

    startTransition(() => {
      const nextSnapshot = telemetryDeskSnapshots[windowId];
      setSelectedWindow(windowId);
      setPanelModes(getDefaultPanelModes(nextSnapshot.comparisons));
      setActiveMetricId((current) =>
        current && nextSnapshot.metrics.some((metric) => metric.id === current) ? current : (nextSnapshot.metrics[0]?.id ?? null),
      );
    });
  }

  function handleToggleMetric(metricId: string) {
    startTransition(() => {
      setActiveMetricId((current) => (current === metricId ? null : metricId));
    });
  }

  function handleReset() {
    startTransition(() => {
      setActiveMetricId(snapshot.metrics[0]?.id ?? null);
      setPanelModes(getDefaultPanelModes(snapshot.comparisons));
    });
  }

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top_left,rgba(251,191,36,0.16),transparent_28%),radial-gradient(circle_at_bottom_right,rgba(45,212,191,0.12),transparent_34%),linear-gradient(180deg,#120b08_0%,#1f1710_48%,#091114_100%)] px-4 py-6 text-stone-100 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl space-y-6">
        <TelemetryDeskHeader
          deskState={snapshot.deskState}
          focusLabel={activeMetric?.label ?? null}
          handoff={snapshot.handoff}
          isPending={isPending}
          selectedWindow={selectedWindow}
          summary={snapshot.summary}
          onSelectWindow={handleSelectWindow}
        />

        <div className="grid gap-6 xl:grid-cols-[minmax(0,1.6fr)_minmax(320px,0.8fr)]">
          <div className="space-y-6">
            <MetricTileGrid activeMetricId={activeMetricId} metrics={snapshot.metrics} onToggleMetric={handleToggleMetric} />
            <TrendComparisonPanels
              activeMetric={activeMetric}
              panelModes={panelModes}
              panels={visiblePanels}
              onReset={handleReset}
              onSelectMode={(panelId, modeId) => setPanelModes((current) => ({ ...current, [panelId]: modeId }))}
            />
          </div>
          <AlertSummaryRail activeMetric={activeMetric} alerts={snapshot.alerts} />
        </div>
      </div>
    </main>
  );
}
