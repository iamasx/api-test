export type StreamStatus = "stable" | "drifting" | "critical";
export type Severity = "low" | "medium" | "high";
export type ReadingTone = "steady" | "watch" | "alert";

export type StreamReading = { label: string; value: string; trend: string; tone: ReadingTone };
export type StreamMarker = { label: string; time: string; detail: string };
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
  readings: StreamReading[];
  markers: StreamMarker[];
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
};

export const heartbeatSeed = "2026-04-19T09:30:00.000Z";
const reading = (label: string, value: string, trend: string, tone: ReadingTone): StreamReading => ({ label, value, trend, tone });
const marker = (label: string, time: string, detail: string): StreamMarker => ({ label, time, detail });
export const signalStreams: SignalStream[] = [
  {
    id: "ion-trace-07", name: "Ion Trace 07", channel: "Substrate relay", status: "stable", owner: "Console North",
    throughput: "184 kHz", cadence: "4.2 ms jitter", noiseFloor: "-72 dB", syncWindow: "94.8%", region: "Delta Shelf",
    readings: [reading("Phase lock", "0.91", "+0.02", "steady"), reading("Return gain", "8.4 dB", "-0.1", "steady"), reading("Echo spill", "3.7%", "+0.4", "watch")],
    markers: [marker("Bootstrap", "09:24:12", "Loop seal closed"), marker("Sweep", "09:27:40", "Noise gate normalized"), marker("Pulse", "09:29:58", "Signal plateau retained")],
  },
  {
    id: "phase-array-12", name: "Phase Array 12", channel: "Synthetic mirror", status: "drifting", owner: "Vector Room",
    throughput: "236 kHz", cadence: "9.6 ms jitter", noiseFloor: "-61 dB", syncWindow: "87.2%", region: "North Basin",
    readings: [reading("Phase lock", "0.74", "-0.11", "watch"), reading("Return gain", "6.1 dB", "-0.8", "watch"), reading("Echo spill", "9.8%", "+2.1", "alert")],
    markers: [marker("Offset", "09:18:09", "Mirror lane diverged"), marker("Drift", "09:26:41", "Threshold crossed"), marker("Clamp", "09:29:22", "Recovery bias applied")],
  },
  {
    id: "lattice-echo-03", name: "Lattice Echo 03", channel: "Null cage", status: "critical", owner: "Archive West",
    throughput: "117 kHz", cadence: "14.8 ms jitter", noiseFloor: "-54 dB", syncWindow: "72.4%", region: "Quiet Fringe",
    readings: [reading("Phase lock", "0.41", "-0.23", "alert"), reading("Return gain", "3.3 dB", "-1.9", "alert"), reading("Echo spill", "18.4%", "+4.7", "alert")],
    markers: [marker("Fault", "09:15:38", "Carrier split detected"), marker("Spike", "09:21:03", "Synthetic bloom flared"), marker("Hold", "09:28:11", "Operator froze relay")],
  },
  {
    id: "harbor-sim-21", name: "Harbor Sim 21", channel: "Coastal sampler", status: "stable", owner: "Dock Array",
    throughput: "201 kHz", cadence: "5.7 ms jitter", noiseFloor: "-69 dB", syncWindow: "92.1%", region: "South Break",
    readings: [reading("Phase lock", "0.88", "+0.01", "steady"), reading("Return gain", "7.6 dB", "+0.2", "steady"), reading("Echo spill", "4.4%", "-0.3", "steady")],
    markers: [marker("Anchor", "09:17:20", "Baseline restored"), marker("Trim", "09:25:33", "Channel weight balanced"), marker("Pulse", "09:29:44", "Heartbeat confirmed")],
  },
];
export const signalAnomalies: SignalAnomaly[] = [
  {
    id: "phase-drift-envelope", streamId: "phase-array-12", title: "Phase drift beyond synthetic envelope", severity: "high",
    summary: "Mirror channel yaw is widening faster than the auto-clamp can recover.", detectedAt: "09:28:45", delta: "+14.2%",
    recommendation: "Focus the stream and watch the next recovery pass.",
  },
  {
    id: "echo-bloom-flare", streamId: "lattice-echo-03", title: "Echo bloom flare on null cage return", severity: "high",
    summary: "The return path shows a repeated flare every third pulse packet.", detectedAt: "09:26:58", delta: "+22.9%",
    recommendation: "Pause the stream before the relay saturates.",
  },
  {
    id: "noise-gate-slip", streamId: "ion-trace-07", title: "Noise gate slip near bootstrap marker", severity: "medium",
    summary: "A brief gate slip appeared after the last bootstrap cycle.", detectedAt: "09:24:13", delta: "+6.1%",
    recommendation: "Track the anomaly to compare with the next heartbeat.",
  },
  {
    id: "cadence-shear", streamId: "harbor-sim-21", title: "Cadence shear resolved but still reportable", severity: "low",
    summary: "A resolved cadence shear remains within the historical watch range.", detectedAt: "09:19:05", delta: "+2.3%",
    recommendation: "Dismiss after operator review if the channel stays steady.",
  },
];
