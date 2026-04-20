"use client";

import { startTransition, useEffect, useEffectEvent, useState } from "react";

import {
  getSignalStreamAnomalies,
  getSignalStreamById,
  heartbeatSeed,
  signalAnomalies,
  signalStreams,
  type ComparisonWindow,
} from "./mock-data";
import { AnomalyList } from "./anomaly-list";
import { ComparisonWorkbench } from "./comparison-workbench";
import { InspectorPanel } from "./inspector-panel";
import {
  buildComparisonDetail,
  buildComparisonSummary,
  buildInspectorPeerNotes,
  getWindowLabel,
} from "./signal-lab-model";
import { SignalLabHeader } from "./signal-lab-header";
import { StreamGrid } from "./stream-grid";

const heartbeatFormatter = new Intl.DateTimeFormat("en-US", {
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
});
const heartbeatStepMs = 5000;
const maxComparedStreams = 4;

function toggleId(items: string[], id: string) {
  return items.includes(id)
    ? items.filter((item) => item !== id)
    : [...items, id];
}

function toggleCompareId(items: string[], id: string) {
  if (items.includes(id)) {
    return items.filter((item) => item !== id);
  }

  if (items.length < maxComparedStreams) {
    return [...items, id];
  }

  return [...items.slice(1), id];
}

export function SignalLabWorkspace() {
  const [selectedStreamId, setSelectedStreamId] = useState<string | null>(
    signalStreams[0]?.id ?? null,
  );
  const [comparedIds, setComparedIds] = useState<string[]>(
    signalStreams.slice(0, 2).map((stream) => stream.id),
  );
  const [comparisonView, setComparisonView] = useState<"summary" | "detail">(
    "summary",
  );
  const [comparisonWindow, setComparisonWindow] =
    useState<ComparisonWindow>("2h");
  const [dismissedIds, setDismissedIds] = useState<string[]>([]);
  const [acknowledgedIds, setAcknowledgedIds] = useState<string[]>([]);
  const [mutedIds, setMutedIds] = useState<string[]>([]);
  const [pausedIds, setPausedIds] = useState<string[]>([]);
  const [showDismissed, setShowDismissed] = useState(false);
  const [heartbeatTick, setHeartbeatTick] = useState(0);

  const tickHeartbeat = useEffectEvent(() => {
    setHeartbeatTick((value) => value + 1);
  });

  useEffect(() => {
    const timerId = window.setInterval(() => tickHeartbeat(), heartbeatStepMs);

    return () => window.clearInterval(timerId);
  }, []);

  const selectedStream = getSignalStreamById(selectedStreamId);
  const comparedStreams = comparedIds.flatMap((streamId) => {
    const stream = getSignalStreamById(streamId);

    return stream ? [stream] : [];
  });
  const openAnomalies = signalAnomalies.filter(
    (anomaly) => !dismissedIds.includes(anomaly.id),
  );
  const visibleAnomalies = signalAnomalies.filter(
    (anomaly) => showDismissed || !dismissedIds.includes(anomaly.id),
  );
  const selectedStreamAnomalies = selectedStream
    ? getSignalStreamAnomalies(selectedStream.id)
    : [];
  const comparedOpenAnomalies = openAnomalies.filter((anomaly) =>
    comparedIds.includes(anomaly.streamId),
  );
  const comparisonSummary = buildComparisonSummary(
    comparedIds,
    comparisonWindow,
  );
  const comparisonDetail = buildComparisonDetail(comparedIds, comparisonWindow);
  const inspectorPeerNotes = buildInspectorPeerNotes(
    selectedStreamId,
    comparedIds,
    comparisonWindow,
  );
  const heartbeat = heartbeatFormatter.format(
    new Date(new Date(heartbeatSeed).getTime() + heartbeatTick * heartbeatStepMs),
  );
  const activeStreams = signalStreams.length - pausedIds.length;
  const labState =
    comparedIds.length >= 3
      ? "Comparison sweep"
      : comparedIds.length >= 2
        ? "Pairwise compare"
        : openAnomalies.some((anomaly) => anomaly.severity === "high")
          ? "Critical watch"
          : pausedIds.length > 0
            ? "Partial hold"
            : "Nominal sweep";

  const handleInspectStream = (streamId: string) => {
    startTransition(() => {
      setSelectedStreamId((current) => (current === streamId ? null : streamId));
    });
  };

  const handleToggleCompare = (streamId: string) => {
    startTransition(() => {
      setComparedIds((items) => toggleCompareId(items, streamId));
      setSelectedStreamId(streamId);
    });
  };

  const handleClearSelection = () => {
    startTransition(() => {
      setSelectedStreamId(null);
    });
  };

  const handleClearComparison = () => {
    startTransition(() => {
      setComparedIds([]);
    });
  };

  const handleTogglePause = () => {
    if (!selectedStreamId) {
      return;
    }

    setPausedIds((items) => toggleId(items, selectedStreamId));
  };

  const handleToggleMute = () => {
    if (!selectedStreamId) {
      return;
    }

    setMutedIds((items) => toggleId(items, selectedStreamId));
  };

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(34,211,238,0.18),_transparent_35%),linear-gradient(135deg,_#020617_0%,_#111827_45%,_#020617_100%)] px-4 py-6 text-slate-100 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <SignalLabHeader
          activeStream={selectedStream?.name ?? null}
          activeStreams={activeStreams}
          comparedStreams={comparedStreams.length}
          comparisonView={comparisonView}
          comparisonWindowLabel={getWindowLabel(comparisonWindow)}
          heartbeat={heartbeat}
          labState={labState}
          mutedStreams={mutedIds.length}
          openAnomalies={openAnomalies.length}
          pausedStreams={pausedIds.length}
        />

        <div className="mt-6 grid gap-6 xl:grid-cols-[minmax(0,1.45fr)_minmax(340px,1fr)]">
          <div className="space-y-6">
            <StreamGrid
              comparedIds={comparedIds}
              mutedIds={mutedIds}
              onInspectStream={handleInspectStream}
              onToggleCompare={handleToggleCompare}
              pausedIds={pausedIds}
              selectedStreamId={selectedStreamId}
              streams={signalStreams}
            />

            <ComparisonWorkbench
              comparedStreams={comparedStreams}
              comparisonDetail={comparisonDetail}
              comparisonSummary={comparisonSummary}
              comparisonView={comparisonView}
              comparisonWindow={comparisonWindow}
              onChangeView={(view) =>
                startTransition(() => setComparisonView(view))
              }
              onChangeWindow={(window) =>
                startTransition(() => setComparisonWindow(window))
              }
              onClearComparison={handleClearComparison}
              openAnomalyCount={comparedOpenAnomalies.length}
            />

            <AnomalyList
              acknowledgedIds={acknowledgedIds}
              anomalies={visibleAnomalies}
              comparedIds={comparedIds}
              onInspectStream={(streamId) =>
                startTransition(() => setSelectedStreamId(streamId))
              }
              onPinStream={handleToggleCompare}
              onToggleAcknowledged={(anomalyId) =>
                setAcknowledgedIds((items) => toggleId(items, anomalyId))
              }
              onToggleDismissed={(anomalyId) =>
                setDismissedIds((items) => toggleId(items, anomalyId))
              }
              onToggleDismissedView={() =>
                startTransition(() => setShowDismissed((value) => !value))
              }
              showDismissed={showDismissed}
            />
          </div>

          <InspectorPanel
            anomalies={selectedStreamAnomalies}
            comparisonWindow={comparisonWindow}
            isCompared={selectedStream ? comparedIds.includes(selectedStream.id) : false}
            isMuted={selectedStream ? mutedIds.includes(selectedStream.id) : false}
            isPaused={selectedStream ? pausedIds.includes(selectedStream.id) : false}
            onClearSelection={handleClearSelection}
            onToggleCompare={() => {
              if (!selectedStreamId) {
                return;
              }

              handleToggleCompare(selectedStreamId);
            }}
            onToggleMute={handleToggleMute}
            onTogglePause={handleTogglePause}
            peerNotes={inspectorPeerNotes}
            stream={selectedStream}
          />
        </div>
      </div>
    </main>
  );
}
