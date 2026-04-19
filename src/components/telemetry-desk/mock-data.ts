export const telemetryWindows = [
  { id: "shift", label: "06h", caption: "Shift handoff" },
  { id: "day", label: "24h", caption: "Desk day" },
  { id: "sweep", label: "72h", caption: "Drift sweep" },
] as const;

export type TelemetryWindowId = (typeof telemetryWindows)[number]["id"];
export type MetricState = "active" | "watch" | "steady";
export type AlertTone = "focus" | "watch" | "steady";
export type SummaryCard = { id: string; label: string; value: string; detail: string };
export type TelemetryMetric = { id: string; label: string; value: string; delta: string; description: string; state: MetricState };
export type ComparisonPoint = { label: string; primary: number; comparison: number };
export type ComparisonMode = { id: string; label: string; detail: string; unit: string; primaryLabel: string; comparisonLabel: string; series: ComparisonPoint[] };
export type ComparisonPanel = { id: string; title: string; strapline: string; status: AlertTone; metrics: string[]; defaultMode: string; modes: ComparisonMode[] };
export type AlertSummary = { id: string; label: string; count: string; detail: string; tone: AlertTone; metrics: string[] };
export type TelemetrySnapshot = { deskState: string; handoff: string; summary: SummaryCard[]; metrics: TelemetryMetric[]; comparisons: ComparisonPanel[]; alerts: AlertSummary[] };

const comparisonPanels: ComparisonPanel[] = [
  {
    id: "north-ridge",
    title: "North ridge relay",
    strapline: "Uplink pressure compared with the steady-state ridge map.",
    status: "focus",
    metrics: ["uplink", "throughput"],
    defaultMode: "baseline",
    modes: [
      { id: "baseline", label: "Baseline", detail: "Desk live compared with the last calm relay map.", unit: "%", primaryLabel: "Desk live", comparisonLabel: "Steady map", series: [{ label: "00h", primary: 74, comparison: 69 }, { label: "02h", primary: 78, comparison: 71 }, { label: "04h", primary: 84, comparison: 75 }, { label: "06h", primary: 91, comparison: 79 }] },
      { id: "incident", label: "Incident", detail: "Shows the same corridor against the last burst-response rehearsal.", unit: "%", primaryLabel: "Desk live", comparisonLabel: "Burst rehearsal", series: [{ label: "00h", primary: 74, comparison: 77 }, { label: "02h", primary: 78, comparison: 82 }, { label: "04h", primary: 84, comparison: 88 }, { label: "06h", primary: 91, comparison: 93 }] },
      { id: "handoff", label: "Handoff", detail: "Tracks the current shift against the outgoing crew's final snapshot.", unit: "%", primaryLabel: "Desk live", comparisonLabel: "Night desk", series: [{ label: "00h", primary: 74, comparison: 70 }, { label: "02h", primary: 78, comparison: 74 }, { label: "04h", primary: 84, comparison: 76 }, { label: "06h", primary: 91, comparison: 80 }] },
    ],
  },
  {
    id: "coast-mesh",
    title: "Coast mesh stabilizers",
    strapline: "Latency and drift checkpoints across the coastal sync ring.",
    status: "watch",
    metrics: ["sync", "drift", "recovery"],
    defaultMode: "incident",
    modes: [
      { id: "baseline", label: "Baseline", detail: "Compares current settling time against the clean-room pass.", unit: "ms", primaryLabel: "Desk live", comparisonLabel: "Clean-room", series: [{ label: "Pier A", primary: 28, comparison: 24 }, { label: "Pier B", primary: 24, comparison: 20 }, { label: "Pier C", primary: 20, comparison: 18 }, { label: "Pier D", primary: 18, comparison: 16 }] },
      { id: "incident", label: "Incident", detail: "Juxtaposes the ring against the last manual drift correction.", unit: "ms", primaryLabel: "Desk live", comparisonLabel: "Drift correction", series: [{ label: "Pier A", primary: 28, comparison: 31 }, { label: "Pier B", primary: 24, comparison: 29 }, { label: "Pier C", primary: 20, comparison: 26 }, { label: "Pier D", primary: 18, comparison: 23 }] },
      { id: "handoff", label: "Handoff", detail: "Matches the current desk against the archived dawn handoff.", unit: "ms", primaryLabel: "Desk live", comparisonLabel: "Dawn desk", series: [{ label: "Pier A", primary: 28, comparison: 27 }, { label: "Pier B", primary: 24, comparison: 23 }, { label: "Pier C", primary: 20, comparison: 21 }, { label: "Pier D", primary: 18, comparison: 18 }] },
    ],
  },
  {
    id: "vault-loop",
    title: "Vault loop failover",
    strapline: "Reserve-route recovery time through the hardened vault loop.",
    status: "steady",
    metrics: ["uplink", "drift", "recovery"],
    defaultMode: "handoff",
    modes: [
      { id: "baseline", label: "Baseline", detail: "Shows reserve-loop return time against the routine drill band.", unit: "m", primaryLabel: "Desk live", comparisonLabel: "Routine drill", series: [{ label: "Alpha", primary: 22, comparison: 18 }, { label: "Bravo", primary: 18, comparison: 16 }, { label: "Charlie", primary: 15, comparison: 13 }, { label: "Delta", primary: 12, comparison: 11 }] },
      { id: "incident", label: "Incident", detail: "Compares recovery timing with the worst recent breaker event.", unit: "m", primaryLabel: "Desk live", comparisonLabel: "Breaker event", series: [{ label: "Alpha", primary: 22, comparison: 26 }, { label: "Bravo", primary: 18, comparison: 24 }, { label: "Charlie", primary: 15, comparison: 20 }, { label: "Delta", primary: 12, comparison: 17 }] },
      { id: "handoff", label: "Handoff", detail: "Checks the reserve loop against the departing desk's hold pattern.", unit: "m", primaryLabel: "Desk live", comparisonLabel: "Night hold", series: [{ label: "Alpha", primary: 22, comparison: 24 }, { label: "Bravo", primary: 18, comparison: 20 }, { label: "Charlie", primary: 15, comparison: 16 }, { label: "Delta", primary: 12, comparison: 14 }] },
    ],
  },
];

export const telemetryDeskSnapshots: Record<TelemetryWindowId, TelemetrySnapshot> = {
  shift: {
    deskState: "Crewed desk / relay focus",
    handoff: "2 tiles hot, 1 comparison muted by the previous handoff.",
    summary: [
      { id: "active", label: "Active relays", value: "14", detail: "3 require manual confirmation" },
      { id: "watch", label: "Watch alerts", value: "04", detail: "Drift cluster leads the queue" },
      { id: "quiet", label: "Quiet lanes", value: "09", detail: "Muted after overnight sweep" },
    ],
    metrics: [
      { id: "uplink", label: "Uplink hold", value: "92%", delta: "+3.2 pts", description: "Stability across the staffed uplink corridor.", state: "active" },
      { id: "sync", label: "Desk sync", value: "18s", delta: "-5s", description: "Median sector alignment during operator handoff.", state: "steady" },
      { id: "throughput", label: "Outer mesh", value: "184k/s", delta: "+12k/s", description: "Traffic held above the morning demand map.", state: "active" },
      { id: "drift", label: "Calibration drift", value: "7.3pp", delta: "-1.1pp", description: "Variance from the midnight alignment image.", state: "watch" },
      { id: "recovery", label: "Failover return", value: "14m", delta: "-2m", description: "Projected minutes to restore full reserve coverage.", state: "steady" },
    ],
    comparisons: comparisonPanels,
    alerts: [
      { id: "burst", label: "Burst queue", count: "11", detail: "Most bursts are pinned to ridge throughput ramps.", tone: "focus", metrics: ["throughput", "uplink"] },
      { id: "drift", label: "Drift watch", count: "04", detail: "Coastal alignment still needs a second pass.", tone: "watch", metrics: ["drift", "sync"] },
      { id: "reserve", label: "Reserve swaps", count: "02", detail: "Failover loop swaps cleared within the staffed window.", tone: "steady", metrics: ["recovery", "uplink"] },
    ],
  },
  day: {
    deskState: "Full desk / comparison sweep",
    handoff: "Comparison defaults reset at the top of the day cycle.",
    summary: [
      { id: "active", label: "Active relays", value: "19", detail: "5 carrying extra burst traffic" },
      { id: "watch", label: "Watch alerts", value: "06", detail: "Two tied to reserve-route drift" },
      { id: "quiet", label: "Quiet lanes", value: "07", detail: "Suppressed after noon reconciliation" },
    ],
    metrics: [
      { id: "uplink", label: "Uplink hold", value: "89%", delta: "+1.4 pts", description: "Uplink stability after the broader day-cycle handoff.", state: "steady" },
      { id: "sync", label: "Desk sync", value: "23s", delta: "+2s", description: "Cross-sector desk sync after wider traffic mixing.", state: "watch" },
      { id: "throughput", label: "Outer mesh", value: "196k/s", delta: "+20k/s", description: "Peak throughput for the busiest reporting window.", state: "active" },
      { id: "drift", label: "Calibration drift", value: "9.1pp", delta: "+0.7pp", description: "Deviation grows slightly under full routing pressure.", state: "watch" },
      { id: "recovery", label: "Failover return", value: "16m", delta: "+1m", description: "Reserve capacity takes longer to settle under load.", state: "steady" },
    ],
    comparisons: comparisonPanels,
    alerts: [
      { id: "burst", label: "Burst queue", count: "15", detail: "Outer-mesh spikes are still concentrated on the ridge relay.", tone: "focus", metrics: ["throughput", "uplink"] },
      { id: "drift", label: "Drift watch", count: "06", detail: "Coastal stabilizers remain the busiest correction lane.", tone: "watch", metrics: ["drift", "sync"] },
      { id: "reserve", label: "Reserve swaps", count: "05", detail: "More reserve-loop pivots are waiting for confirmation.", tone: "watch", metrics: ["recovery", "uplink"] },
    ],
  },
  sweep: {
    deskState: "Long sweep / drift archive",
    handoff: "This window favors historical drift checks over live burst response.",
    summary: [
      { id: "active", label: "Active relays", value: "11", detail: "Only anchor lanes remain pinned" },
      { id: "watch", label: "Watch alerts", value: "03", detail: "Most incidents aged out into archive review" },
      { id: "quiet", label: "Quiet lanes", value: "14", detail: "Long-window lanes stabilize after replay" },
    ],
    metrics: [
      { id: "uplink", label: "Uplink hold", value: "87%", delta: "-1.1 pts", description: "Hold softens across the long-window archive view.", state: "steady" },
      { id: "sync", label: "Desk sync", value: "16s", delta: "-4s", description: "Sector alignment normalizes once traffic bursts age out.", state: "active" },
      { id: "throughput", label: "Outer mesh", value: "161k/s", delta: "-18k/s", description: "Historical view settles below the staffed peak.", state: "steady" },
      { id: "drift", label: "Calibration drift", value: "5.4pp", delta: "-2.5pp", description: "Archive sweep shows drift recovering into range.", state: "active" },
      { id: "recovery", label: "Failover return", value: "11m", delta: "-3m", description: "Reserve paths recover faster in the long-window view.", state: "active" },
    ],
    comparisons: comparisonPanels,
    alerts: [
      { id: "burst", label: "Burst queue", count: "06", detail: "Only archived burst events remain pinned to the ridge relay.", tone: "steady", metrics: ["throughput", "uplink"] },
      { id: "drift", label: "Drift watch", count: "03", detail: "Archive review shows the coastal ring recovering cleanly.", tone: "focus", metrics: ["drift", "sync"] },
      { id: "reserve", label: "Reserve swaps", count: "01", detail: "Most reserve-loop pivots have already been cleared.", tone: "steady", metrics: ["recovery", "uplink"] },
    ],
  },
};

export function getDefaultPanelModes(panels: ComparisonPanel[]) {
  return Object.fromEntries(panels.map((panel) => [panel.id, panel.defaultMode]));
}
