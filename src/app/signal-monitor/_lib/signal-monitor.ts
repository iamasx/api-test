import {
  signalAnomalies,
  signalStreams,
  type SignalAnomaly,
  type SignalStat,
  type SignalStream,
} from "./signal-monitor-data";

export type SignalMonitorView = {
  signals: SignalStream[];
  anomalies: SignalAnomaly[];
  selectedSignal: SignalStream;
  selectedAnomalies: SignalAnomaly[];
  requestedSignalId?: string;
  selectionFound: boolean;
  overviewStats: SignalStat[];
};

const severityWeight: Record<SignalAnomaly["severity"], number> = {
  critical: 0,
  elevated: 1,
  watch: 2,
};

function normalizeSignalId(signalId?: string) {
  return signalId?.trim().toLowerCase();
}

export function readRequestedSignalId(value: string | string[] | undefined) {
  if (Array.isArray(value)) {
    return value[0];
  }

  return value;
}

function buildOverviewStats(): SignalStat[] {
  const affectedSignals = new Set(signalAnomalies.map((anomaly) => anomaly.signalId));
  const criticalAnomalies = signalAnomalies.filter(
    (anomaly) => anomaly.severity === "critical",
  ).length;
  const watchSignals = signalStreams.filter(
    (signal) => signal.status === "watch" || signal.status === "degraded",
  ).length;
  const offlineSignals = signalStreams.filter(
    (signal) => signal.status === "offline",
  ).length;

  return [
    { label: "Streams online", value: `${signalStreams.length - offlineSignals}/${signalStreams.length}` },
    { label: "Affected streams", value: `${affectedSignals.size}` },
    { label: "Critical anomalies", value: `${criticalAnomalies}` },
    { label: "Signals under watch", value: `${watchSignals}` },
  ];
}

export function resolveSignalMonitorView(signalId?: string): SignalMonitorView {
  const requestedSignalId = normalizeSignalId(signalId);
  const selectionFound = requestedSignalId
    ? signalStreams.some((signal) => signal.id === requestedSignalId)
    : true;

  const selectedSignal =
    signalStreams.find((signal) => signal.id === requestedSignalId) ??
    signalStreams[0];
  const sortedAnomalies = [...signalAnomalies].sort((left, right) => {
    const severityDelta =
      severityWeight[left.severity] - severityWeight[right.severity];

    if (severityDelta !== 0) {
      return severityDelta;
    }

    return left.title.localeCompare(right.title);
  });

  return {
    signals: signalStreams,
    anomalies: sortedAnomalies,
    selectedSignal,
    selectedAnomalies: sortedAnomalies.filter(
      (anomaly) => anomaly.signalId === selectedSignal.id,
    ),
    requestedSignalId,
    selectionFound,
    overviewStats: buildOverviewStats(),
  };
}
