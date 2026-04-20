import {
  getHistoryForWindow,
  getSignalStreamAnomalies,
  getSignalStreamById,
  type ComparisonWindow,
  type SignalStream,
} from "./mock-data";

export type ComparisonMetric = {
  label: string;
  value: string;
  detail: string;
};

export type ComparisonSummary = {
  headline: string;
  narrative: string;
  metrics: ComparisonMetric[];
  highlights: string[];
  recommendation: string;
};

export type ComparisonDetailRow = {
  id: string;
  name: string;
  status: SignalStream["status"];
  confidence: string;
  shift: string;
  anomalyLoad: string;
  driver: string;
  watchword: string;
  note: string;
};

export type ComparisonDetail = {
  rows: ComparisonDetailRow[];
  insights: string[];
};

export type InspectorPeerNote = {
  peerId: string;
  peerName: string;
  confidenceGap: string;
  shiftGap: string;
  summary: string;
};

const windowLabels: Record<ComparisonWindow, string> = {
  "45m": "45m lens",
  "2h": "2h lens",
  shift: "shift lens",
};

function getUniqueStreams(streamIds: string[]) {
  return Array.from(new Set(streamIds)).flatMap((streamId) => {
    const stream = getSignalStreamById(streamId);

    return stream ? [stream] : [];
  });
}

function getConfidenceShift(stream: SignalStream, window: ComparisonWindow) {
  const history = getHistoryForWindow(stream, window);
  const first = history[0];
  const last = history.at(-1);

  if (!first || !last) {
    return 0;
  }

  return last.confidence - first.confidence;
}

function formatSignedValue(value: number, unit = "pts") {
  if (value === 0) {
    return `0 ${unit}`;
  }

  return `${value > 0 ? "+" : ""}${value} ${unit}`;
}

function formatAnomalyLoad(count: number) {
  return `${count} ${count === 1 ? "anomaly" : "anomalies"}`;
}

export function getWindowLabel(window: ComparisonWindow) {
  return windowLabels[window];
}

export function getConfidenceShiftLabel(
  stream: SignalStream,
  window: ComparisonWindow,
) {
  return formatSignedValue(getConfidenceShift(stream, window));
}

export function buildComparisonSummary(
  streamIds: string[],
  window: ComparisonWindow,
): ComparisonSummary | null {
  const streams = getUniqueStreams(streamIds);

  if (streams.length < 2) {
    return null;
  }

  const leader = streams.reduce((best, stream) =>
    stream.confidence > best.confidence ? stream : best,
  );
  const laggard = streams.reduce((worst, stream) =>
    stream.confidence < worst.confidence ? stream : worst,
  );
  const widestShiftStream = streams.reduce((current, stream) =>
    Math.abs(getConfidenceShift(stream, window)) >
    Math.abs(getConfidenceShift(current, window))
      ? stream
      : current,
  );
  const averageConfidence = Math.round(
    streams.reduce((total, stream) => total + stream.confidence, 0) /
      streams.length,
  );
  const totalAnomalies = streams.reduce(
    (total, stream) => total + getSignalStreamAnomalies(stream.id).length,
    0,
  );
  const improvingCount = streams.filter(
    (stream) => getConfidenceShift(stream, window) > 0,
  ).length;
  const slippingCount = streams.filter(
    (stream) => getConfidenceShift(stream, window) < 0,
  ).length;
  const spread = leader.confidence - laggard.confidence;

  return {
    headline: `${leader.name} anchors the comparison while ${laggard.name} sets the watch floor.`,
    narrative: `Across the ${getWindowLabel(window)}, pinned streams average ${averageConfidence}% confidence with a ${spread}-point spread from the strongest baseline to the weakest return path.`,
    metrics: [
      {
        label: "Pinned streams",
        value: String(streams.length),
        detail: streams.map((stream) => stream.name).join(" / "),
      },
      {
        label: "Confidence spread",
        value: `${spread} pts`,
        detail: `${leader.name} leads at ${leader.confidence}% while ${laggard.name} trails at ${laggard.confidence}%.`,
      },
      {
        label: "Open anomaly load",
        value: String(totalAnomalies),
        detail: `${widestShiftStream.name} shows the sharpest lens swing at ${getConfidenceShiftLabel(widestShiftStream, window)}.`,
      },
    ],
    highlights: [
      `${leader.name} is the cleanest reference because ${leader.outlook.toLowerCase()}`,
      slippingCount > 0
        ? `${slippingCount} pinned stream${slippingCount === 1 ? "" : "s"} are still losing confidence in the active lens.`
        : "No pinned stream is losing confidence in the active lens.",
      improvingCount > 0
        ? `${improvingCount} pinned stream${improvingCount === 1 ? "" : "s"} are recovering or trending up, which gives the workspace a usable comparison baseline.`
        : "None of the pinned streams are improving, so treat the workspace as active watch only.",
      `${laggard.name} needs the closest inspection because ${laggard.confidenceStory.toLowerCase()}`,
    ],
    recommendation: `Use ${leader.name} as the baseline and inspect ${laggard.name} for ${laggard.watchword.toLowerCase()}.`,
  };
}

export function buildComparisonDetail(
  streamIds: string[],
  window: ComparisonWindow,
): ComparisonDetail | null {
  const streams = getUniqueStreams(streamIds);

  if (streams.length < 2) {
    return null;
  }

  const rows = streams
    .map((stream) => {
      const anomalyCount = getSignalStreamAnomalies(stream.id).length;

      return {
        id: stream.id,
        name: stream.name,
        status: stream.status,
        confidence: `${stream.confidence}%`,
        shift: getConfidenceShiftLabel(stream, window),
        anomalyLoad: formatAnomalyLoad(anomalyCount),
        driver: stream.driftDriver,
        watchword: stream.watchword,
        note: stream.outlook,
      };
    })
    .sort((left, right) => Number.parseInt(right.confidence, 10) - Number.parseInt(left.confidence, 10));

  const strongest = rows[0];
  const weakest = rows.at(-1);
  const totalAnomalies = rows.reduce((total, row) => {
    const count = Number.parseInt(row.anomalyLoad, 10);
    return total + count;
  }, 0);

  return {
    rows,
    insights: [
      `${strongest.name} holds the strongest confidence posture in the ${getWindowLabel(window)} at ${strongest.confidence}.`,
      `${weakest?.name ?? strongest.name} is the current outlier and should stay visible beside the strongest baseline until its drift driver narrows.`,
      `${totalAnomalies} open anomaly threads are represented across the pinned set, which keeps the detail view useful even when one stream looks calm.`,
    ],
  };
}

export function buildInspectorPeerNotes(
  streamId: string | null,
  compareIds: string[],
  window: ComparisonWindow,
): InspectorPeerNote[] {
  const subject = getSignalStreamById(streamId);

  if (!subject) {
    return [];
  }

  return getUniqueStreams(compareIds)
    .filter((stream) => stream.id !== subject.id)
    .map((peer) => {
      const confidenceGap = subject.confidence - peer.confidence;
      const shiftGap =
        getConfidenceShift(subject, window) - getConfidenceShift(peer, window);

      return {
        peerId: peer.id,
        peerName: peer.name,
        confidenceGap: formatSignedValue(confidenceGap),
        shiftGap: `${formatSignedValue(shiftGap)} lens delta`,
        summary:
          confidenceGap >= 0
            ? `${subject.name} still outranks ${peer.name}, but ${peer.driftDriver.toLowerCase()} keeps the gap active.`
            : `${peer.name} stays ahead of ${subject.name}, so the current drift still favors the comparison baseline over the inspected stream.`,
      };
    });
}
