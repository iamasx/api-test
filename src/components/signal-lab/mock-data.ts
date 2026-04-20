export type StreamStatus = "stable" | "drifting" | "critical";
export type Severity = "low" | "medium" | "high";
export type ReadingTone = "steady" | "watch" | "alert";

export const comparisonWindows = [
  {
    id: "45m",
    label: "45m lens",
    detail: "Recent recovery pulses and short-run confidence swings.",
  },
  {
    id: "2h",
    label: "2h lens",
    detail: "Full anomaly run covering the current operating block.",
  },
  {
    id: "shift",
    label: "Shift lens",
    detail: "Handoff posture across the longer operator window.",
  },
] as const;

export type ComparisonWindow = (typeof comparisonWindows)[number]["id"];

export type StreamReading = {
  label: string;
  value: string;
  trend: string;
  tone: ReadingTone;
};

export type StreamMarker = {
  label: string;
  time: string;
  detail: string;
  confidenceNote: string;
};

export type StreamTrendPoint = {
  time: string;
  confidence: number;
  phaseLock: number;
  echoSpill: number;
  anomalyLoad: number;
  note: string;
};

export type StreamCallout = {
  label: string;
  detail: string;
};

export type SignalStream = {
  id: string;
  name: string;
  channel: string;
  status: StreamStatus;
  owner: string;
  throughput: string;
  cadence: string;
  noiseFloor: string;
  syncWindow: string;
  region: string;
  confidence: number;
  baseline: string;
  watchword: string;
  confidenceStory: string;
  driftDriver: string;
  outlook: string;
  readings: StreamReading[];
  markers: StreamMarker[];
  history: StreamTrendPoint[];
  callouts: StreamCallout[];
};

export type SignalAnomaly = {
  id: string;
  streamId: SignalStream["id"];
  title: string;
  severity: Severity;
  summary: string;
  detectedAt: string;
  delta: string;
  recommendation: string;
  confidenceShift: string;
  driver: string;
  explanation: string;
  compareNote: string;
};

export const heartbeatSeed = "2026-04-19T09:30:00.000Z";

const reading = (
  label: string,
  value: string,
  trend: string,
  tone: ReadingTone,
): StreamReading => ({
  label,
  value,
  trend,
  tone,
});

const marker = (
  label: string,
  time: string,
  detail: string,
  confidenceNote: string,
): StreamMarker => ({
  label,
  time,
  detail,
  confidenceNote,
});

const point = (
  time: string,
  confidence: number,
  phaseLock: number,
  echoSpill: number,
  anomalyLoad: number,
  note: string,
): StreamTrendPoint => ({
  time,
  confidence,
  phaseLock,
  echoSpill,
  anomalyLoad,
  note,
});

const callout = (label: string, detail: string): StreamCallout => ({
  label,
  detail,
});

export const signalStreams: SignalStream[] = [
  {
    id: "ion-trace-07",
    name: "Ion Trace 07",
    channel: "Substrate relay",
    status: "stable",
    owner: "Console North",
    throughput: "184 kHz",
    cadence: "4.2 ms jitter",
    noiseFloor: "-72 dB",
    syncWindow: "94.8%",
    region: "Delta Shelf",
    confidence: 91,
    baseline: "Bootstrap-calibrated relay reference",
    watchword: "Fast local recovery",
    confidenceStory:
      "Confidence dipped briefly during the latest bootstrap gate slip, then recovered above the morning line within two heartbeat cycles.",
    driftDriver: "bootstrap gate slip",
    outlook:
      "Good baseline candidate for side-by-side comparisons against noisier channels.",
    readings: [
      reading("Phase lock", "0.91", "+0.02", "steady"),
      reading("Return gain", "8.4 dB", "-0.1", "steady"),
      reading("Echo spill", "3.7%", "+0.4", "watch"),
    ],
    markers: [
      marker(
        "Bootstrap",
        "09:24:12",
        "Loop seal closed before the last relay sweep.",
        "Confidence recovered after the gate cleared.",
      ),
      marker(
        "Sweep",
        "09:27:40",
        "Noise gate normalized with no saturation spike.",
        "The stream returned to its normal confidence band.",
      ),
      marker(
        "Pulse",
        "09:29:58",
        "Synthetic plateau retained on the final pulse cluster.",
        "No further confidence drift appeared after the pulse.",
      ),
    ],
    history: [
      point("08:10", 86, 0.87, 4.2, 1, "Bootstrap slip begins."),
      point("08:35", 87, 0.88, 4.0, 1, "Gate stabilizer catches up."),
      point("09:00", 88, 0.89, 3.9, 1, "Confidence returns to baseline."),
      point("09:15", 90, 0.91, 3.8, 0, "Plateau restored."),
      point("09:30", 89, 0.9, 3.9, 1, "Minor spill returns."),
      point("09:45", 91, 0.91, 3.7, 0, "Relay closes strong."),
    ],
    callouts: [
      callout(
        "Baseline role",
        "Keeps the cleanest substrate relay profile in the current set.",
      ),
      callout(
        "Confidence anchor",
        "Recovered faster than any other stream after a negative event.",
      ),
      callout(
        "Compare use",
        "Best pinned beside drifting channels to isolate whether noise is systemic.",
      ),
    ],
  },
  {
    id: "phase-array-12",
    name: "Phase Array 12",
    channel: "Synthetic mirror",
    status: "drifting",
    owner: "Vector Room",
    throughput: "236 kHz",
    cadence: "9.6 ms jitter",
    noiseFloor: "-61 dB",
    syncWindow: "87.2%",
    region: "North Basin",
    confidence: 74,
    baseline: "Mirror lane reference with manual clamp support",
    watchword: "Mirror divergence",
    confidenceStory:
      "Confidence has been sliding for the full operating block because the mirror lane keeps drifting wider than the recovery clamp can absorb.",
    driftDriver: "mirror lane divergence",
    outlook:
      "Needs comparison against a stable reference before the clamp setting is tuned again.",
    readings: [
      reading("Phase lock", "0.74", "-0.11", "watch"),
      reading("Return gain", "6.1 dB", "-0.8", "watch"),
      reading("Echo spill", "9.8%", "+2.1", "alert"),
    ],
    markers: [
      marker(
        "Offset",
        "09:18:09",
        "Mirror lane diverged off the expected return angle.",
        "Confidence began falling immediately after the offset marker.",
      ),
      marker(
        "Drift",
        "09:26:41",
        "Threshold crossed and operator clamp bias applied.",
        "The clamp slowed the drop but did not reverse it.",
      ),
      marker(
        "Clamp",
        "09:29:22",
        "Recovery bias held the stream inside manual control range.",
        "Confidence stabilized temporarily while the clamp remained active.",
      ),
    ],
    history: [
      point("08:10", 86, 0.86, 7.6, 1, "Mirror lane still inside envelope."),
      point("08:35", 83, 0.82, 8.1, 1, "Return angle begins widening."),
      point("09:00", 80, 0.79, 8.6, 2, "Clamp is engaged."),
      point("09:15", 78, 0.77, 9.1, 2, "Manual bias slows the loss."),
      point("09:30", 76, 0.75, 9.6, 2, "Spill continues to grow."),
      point("09:45", 74, 0.74, 9.8, 2, "Mirror stays outside the preferred lane."),
    ],
    callouts: [
      callout(
        "Pressure point",
        "Confidence loss tracks almost one-for-one with widening spill.",
      ),
      callout(
        "Operator note",
        "Recovery clamp buys time but does not remove the underlying divergence.",
      ),
      callout(
        "Compare use",
        "Pair with Ion Trace 07 or Harbor Sim 21 to see whether instability is local.",
      ),
    ],
  },
  {
    id: "lattice-echo-03",
    name: "Lattice Echo 03",
    channel: "Null cage",
    status: "critical",
    owner: "Archive West",
    throughput: "117 kHz",
    cadence: "14.8 ms jitter",
    noiseFloor: "-54 dB",
    syncWindow: "72.4%",
    region: "Quiet Fringe",
    confidence: 58,
    baseline: "Null cage relay under frozen hold conditions",
    watchword: "Escalating bloom",
    confidenceStory:
      "Confidence is collapsing because every third pulse packet flares the return path and forces the null cage into increasingly narrow recovery windows.",
    driftDriver: "echo bloom flare",
    outlook:
      "Treat as the watch floor in any comparison workspace until relay saturation risk is removed.",
    readings: [
      reading("Phase lock", "0.41", "-0.23", "alert"),
      reading("Return gain", "3.3 dB", "-1.9", "alert"),
      reading("Echo spill", "18.4%", "+4.7", "alert"),
    ],
    markers: [
      marker(
        "Fault",
        "09:15:38",
        "Carrier split detected inside the null cage.",
        "Confidence dropped sharply after the split.",
      ),
      marker(
        "Spike",
        "09:21:03",
        "Synthetic bloom flared on the third pulse cycle.",
        "Each bloom flare removed another band of confidence.",
      ),
      marker(
        "Hold",
        "09:28:11",
        "Operator froze the relay before the cage saturated.",
        "The hold stopped a steeper decline but did not recover the stream.",
      ),
    ],
    history: [
      point("08:10", 78, 0.64, 11.2, 1, "Return path already warm."),
      point("08:35", 72, 0.58, 12.6, 1, "Bloom cycles start repeating."),
      point("09:00", 69, 0.53, 14.1, 2, "Third-pulse flare confirmed."),
      point("09:15", 64, 0.48, 15.9, 2, "Carrier split widens."),
      point("09:30", 60, 0.44, 17.5, 2, "Null cage forced into hold."),
      point("09:45", 58, 0.41, 18.4, 2, "Confidence stays in the critical band."),
    ],
    callouts: [
      callout(
        "Critical floor",
        "Lowest-confidence stream in the workspace and the largest anomaly burden.",
      ),
      callout(
        "Immediate question",
        "Need to separate cage instability from upstream bloom amplification.",
      ),
      callout(
        "Compare use",
        "Pin beside stable streams to quantify how much bloom is local versus shared.",
      ),
    ],
  },
  {
    id: "harbor-sim-21",
    name: "Harbor Sim 21",
    channel: "Coastal sampler",
    status: "stable",
    owner: "Dock Array",
    throughput: "201 kHz",
    cadence: "5.7 ms jitter",
    noiseFloor: "-69 dB",
    syncWindow: "92.1%",
    region: "South Break",
    confidence: 88,
    baseline: "Balanced coastal sampler reference",
    watchword: "Flat confidence curve",
    confidenceStory:
      "Confidence stayed nearly flat after a resolved cadence shear, which makes this stream a strong comparator for recent drift investigations.",
    driftDriver: "resolved cadence shear",
    outlook:
      "Useful control stream when operators need to check whether a spike is environmental.",
    readings: [
      reading("Phase lock", "0.88", "+0.01", "steady"),
      reading("Return gain", "7.6 dB", "+0.2", "steady"),
      reading("Echo spill", "4.4%", "-0.3", "steady"),
    ],
    markers: [
      marker(
        "Anchor",
        "09:17:20",
        "Baseline restored after sampler trim correction.",
        "Confidence returned to the morning baseline and held.",
      ),
      marker(
        "Trim",
        "09:25:33",
        "Channel weight balanced across the coastal band.",
        "No secondary loss appeared after trim.",
      ),
      marker(
        "Pulse",
        "09:29:44",
        "Heartbeat confirmed at target cadence.",
        "Confidence remained flat through the last pulse cycle.",
      ),
    ],
    history: [
      point("08:10", 84, 0.85, 4.8, 1, "Minor cadence shear appears."),
      point("08:35", 85, 0.86, 4.7, 1, "Sampler trim begins."),
      point("09:00", 86, 0.87, 4.6, 1, "Shear is already easing."),
      point("09:15", 87, 0.88, 4.5, 0, "Baseline returns."),
      point("09:30", 88, 0.88, 4.4, 0, "Channel remains balanced."),
      point("09:45", 88, 0.88, 4.4, 0, "Confidence holds flat."),
    ],
    callouts: [
      callout(
        "Control stream",
        "Most even confidence shape after the sampler trim was applied.",
      ),
      callout(
        "Residual risk",
        "Cadence shear is resolved, but the recovery should still be reviewed.",
      ),
      callout(
        "Compare use",
        "Pairs well with drifting streams to confirm whether spill is localized.",
      ),
    ],
  },
  {
    id: "prism-tide-05",
    name: "Prism Tide 05",
    channel: "Refracted sampler",
    status: "drifting",
    owner: "Helix Pier",
    throughput: "168 kHz",
    cadence: "7.4 ms jitter",
    noiseFloor: "-66 dB",
    syncWindow: "89.9%",
    region: "Glass Inlet",
    confidence: 82,
    baseline: "Refracted sampling lane with tidal reflection",
    watchword: "Oscillating harmonic residue",
    confidenceStory:
      "Confidence is still net positive on the longer lens, but the latest harmonic residue reintroduced oscillation that needs to be compared against the cleaner baselines.",
    driftDriver: "harmonic residue rebounds",
    outlook:
      "Worth pinning when operators need a stream that is neither clean nor critical.",
    readings: [
      reading("Phase lock", "0.83", "+0.03", "steady"),
      reading("Return gain", "6.9 dB", "-0.2", "watch"),
      reading("Echo spill", "7.1%", "+1.4", "watch"),
    ],
    markers: [
      marker(
        "Refract",
        "09:12:06",
        "Tidal reflection clipped the outer sampling lane.",
        "Confidence rose first, then softened as residue returned.",
      ),
      marker(
        "Ripple",
        "09:23:17",
        "Harmonic residue widened across the refracted path.",
        "The stream lost some of its earlier gains after the ripple.",
      ),
      marker(
        "Balance",
        "09:31:48",
        "Operator rebalanced the sampler without muting the lane.",
        "Confidence stayed above the morning line despite the wobble.",
      ),
    ],
    history: [
      point("08:10", 79, 0.79, 6.2, 1, "Sampler wakes into a clean band."),
      point("08:35", 81, 0.81, 6.5, 1, "Tidal reflection lifts the lane."),
      point("09:00", 82, 0.82, 6.8, 1, "Confidence peaks early."),
      point("09:15", 83, 0.84, 6.9, 1, "Refracted path stays strong."),
      point("09:30", 81, 0.82, 7.0, 1, "Residue returns."),
      point("09:45", 82, 0.83, 7.1, 1, "Operator rebalance steadies the loss."),
    ],
    callouts: [
      callout(
        "Middle signal",
        "Sits between the cleanest baselines and the critical floor.",
      ),
      callout(
        "Useful comparison",
        "Helps determine whether newer residue events are likely to self-correct.",
      ),
      callout(
        "Watch item",
        "Latest oscillation makes it a good peer for Phase Array 12 detail checks.",
      ),
    ],
  },
];

export const signalAnomalies: SignalAnomaly[] = [
  {
    id: "phase-drift-envelope",
    streamId: "phase-array-12",
    title: "Phase drift beyond synthetic envelope",
    severity: "high",
    summary:
      "Mirror channel yaw is widening faster than the auto-clamp can recover.",
    detectedAt: "09:28:45",
    delta: "+14.2%",
    recommendation:
      "Pin this stream beside a stable baseline before changing the clamp again.",
    confidenceShift: "-12 pts in the 2h lens",
    driver: "Mirror lane divergence",
    explanation:
      "The clamp arrests the acceleration but does not pull the mirror back into the expected lane, so confidence keeps bleeding after every pulse.",
    compareNote:
      "Compared with Ion Trace 07, the spill rate is more than double while the reference lane remains steady.",
  },
  {
    id: "mirror-recovery-lag",
    streamId: "phase-array-12",
    title: "Recovery clamp lag after offset correction",
    severity: "medium",
    summary:
      "Manual bias is active, but the recovery curve still lags the last two checkpoints.",
    detectedAt: "09:31:12",
    delta: "+5.4%",
    recommendation:
      "Inspect the next two recovery markers before releasing manual control.",
    confidenceShift: "-4 pts after clamp engagement",
    driver: "Delayed clamp response",
    explanation:
      "The operator clamp is keeping the stream operable, but its recovery tail is too slow to reverse the recent loss within the current operating block.",
    compareNote:
      "Harbor Sim 21 recovered a similar cadence issue without a persistent tail, which makes this lag stand out.",
  },
  {
    id: "echo-bloom-flare",
    streamId: "lattice-echo-03",
    title: "Echo bloom flare on null cage return",
    severity: "high",
    summary:
      "The return path shows a repeated flare every third pulse packet.",
    detectedAt: "09:26:58",
    delta: "+22.9%",
    recommendation:
      "Keep the relay under hold and compare it with a clean baseline before resuming.",
    confidenceShift: "-20 pts in the 2h lens",
    driver: "Repeated third-pulse bloom flare",
    explanation:
      "Each flare widens the return bloom and strips confidence from the null cage because the hold arrives after the highest-energy packet has already landed.",
    compareNote:
      "No other pinned stream shows a decay slope this steep, even when spill is already elevated.",
  },
  {
    id: "noise-gate-slip",
    streamId: "ion-trace-07",
    title: "Noise gate slip near bootstrap marker",
    severity: "medium",
    summary:
      "A brief gate slip appeared after the last bootstrap cycle.",
    detectedAt: "09:24:13",
    delta: "+6.1%",
    recommendation:
      "Keep it pinned as the reference if the next heartbeat stays clean.",
    confidenceShift: "-3 pts, then recovered",
    driver: "Bootstrap gate slip",
    explanation:
      "The gate slip caused a short-lived spill increase, but the relay regained its confidence band before the next full sweep.",
    compareNote:
      "The recovery window is much shorter than the one currently affecting Phase Array 12.",
  },
  {
    id: "cadence-shear",
    streamId: "harbor-sim-21",
    title: "Cadence shear resolved but still reportable",
    severity: "low",
    summary:
      "A resolved cadence shear remains within the historical watch range.",
    detectedAt: "09:19:05",
    delta: "+2.3%",
    recommendation:
      "Keep as a calm comparator until the next shoreline sampling cycle completes.",
    confidenceShift: "+4 pts since the early shear",
    driver: "Minor sampler trim lag",
    explanation:
      "The issue is effectively closed, but it is still valuable because it shows what a healthy recovery shape looks like in the same workspace.",
    compareNote:
      "Useful as the low-drama reference when comparing noisy or critical streams.",
  },
  {
    id: "harmonic-ghost",
    streamId: "prism-tide-05",
    title: "Harmonic residue ghosting on refracted lane",
    severity: "medium",
    summary:
      "A refracted residue band returned after the sampler had almost cleared.",
    detectedAt: "09:30:28",
    delta: "+8.7%",
    recommendation:
      "Pair with a stable lane to decide whether the residue is self-correcting or growing.",
    confidenceShift: "+3 pts, then softened to +1",
    driver: "Refracted harmonic residue",
    explanation:
      "The stream still sits above its early confidence line, but the residue wobble is eating into those gains and could become a persistent drift pattern.",
    compareNote:
      "It is a strong midpoint reference when the workspace needs something between calm and critical.",
  },
];

export function getSignalStreamById(streamId: string | null | undefined) {
  if (!streamId) {
    return null;
  }

  return signalStreams.find((stream) => stream.id === streamId) ?? null;
}

export function getSignalStreamAnomalies(streamId: string) {
  return signalAnomalies.filter((anomaly) => anomaly.streamId === streamId);
}

export function getHistoryForWindow(
  stream: SignalStream,
  window: ComparisonWindow,
) {
  switch (window) {
    case "45m":
      return stream.history.slice(-4);
    case "shift":
      return stream.history;
    case "2h":
    default:
      return stream.history.slice(-6);
  }
}
