export type SignalStreamType =
  | "telemetry"
  | "network"
  | "environmental"
  | "security";

export type SignalStreamStatus =
  | "tracking"
  | "watch"
  | "degraded"
  | "offline";

export type SignalSeverity = "watch" | "elevated" | "critical";

export type SignalStat = {
  label: string;
  value: string;
};

export type SignalDetailEntry = {
  label: string;
  value: string;
};

export type SignalDetailSection = {
  title: string;
  description: string;
  entries: SignalDetailEntry[];
};

export type SignalAnomaly = {
  id: string;
  signalId: string;
  title: string;
  severity: SignalSeverity;
  summary: string;
  detectionWindow: string;
  owner: string;
  impact: string;
  recommendedAction: string;
};

export type SignalStream = {
  id: string;
  name: string;
  type: SignalStreamType;
  status: SignalStreamStatus;
  region: string;
  cadence: string;
  refreshedAt: string;
  summary: string;
  throughput: string;
  drift: string;
  anomalyCount: number;
  headlineStats: SignalStat[];
  detailSections: SignalDetailSection[];
};

export const signalStreams: SignalStream[] = [
  {
    id: "polar-vault-telemetry",
    name: "Polar Vault Telemetry",
    type: "telemetry",
    status: "degraded",
    region: "Svalbard relay",
    cadence: "12 second ingest",
    refreshedAt: "Updated 2 minutes ago",
    summary:
      "Cryogenic vault sensors are still reporting, but thermal balancing packets are arriving out of sequence after the morning relay reset.",
    throughput: "18.4k packets/min",
    drift: "+14% replay backlog",
    anomalyCount: 2,
    headlineStats: [
      { label: "Signal integrity", value: "91.8%" },
      { label: "Thermal delta", value: "+4.2 C" },
      { label: "Replay lag", value: "86 seconds" },
    ],
    detailSections: [
      {
        title: "Stream posture",
        description:
          "Primary sensor packets continue to land, but sequence mismatches are concentrated around the relay handoff boundary.",
        entries: [
          { label: "Collector", value: "Vault edge array 3" },
          { label: "Primary lane", value: "Svalbard uplink / north ring" },
          { label: "Fallback mode", value: "Buffered replay and checksum stitch" },
        ],
      },
      {
        title: "Operator notes",
        description:
          "The backlog is currently within the containment window, but thermal variance is rising faster than the last cold-start drill.",
        entries: [
          { label: "Escalation owner", value: "Lena Solberg" },
          { label: "Last intervention", value: "Relay reset at 09:12 UTC" },
          { label: "Review target", value: "Stabilize before next archive seal" },
        ],
      },
    ],
  },
  {
    id: "harbor-mesh-uplink",
    name: "Harbor Mesh Uplink",
    type: "network",
    status: "tracking",
    region: "Glass Harbor perimeter",
    cadence: "Real-time mesh heartbeat",
    refreshedAt: "Updated 47 seconds ago",
    summary:
      "Dockside mesh nodes are stable after the overnight firmware roll, with no customer-impacting retransmission burst in the latest window.",
    throughput: "42.1 Mbps",
    drift: "-3% packet loss",
    anomalyCount: 0,
    headlineStats: [
      { label: "Node availability", value: "99.97%" },
      { label: "Median latency", value: "24 ms" },
      { label: "Burst retries", value: "3 in 6 hr" },
    ],
    detailSections: [
      {
        title: "Stream posture",
        description:
          "The mesh is acting as the route's clean baseline and is useful for contrasting stable cards against degraded and watch states.",
        entries: [
          { label: "Collector", value: "Harbor node supervisor" },
          { label: "Coverage", value: "17 dock and gate nodes" },
          { label: "Firmware lane", value: "2026.04-hf2" },
        ],
      },
      {
        title: "Operator notes",
        description:
          "No interventions are scheduled. The stream is green but still listed because it anchors the route's live status mix.",
        entries: [
          { label: "Escalation owner", value: "Marco Hale" },
          { label: "Last intervention", value: "Firmware roll at 01:18 UTC" },
          { label: "Review target", value: "Observe post-roll stability until shift handoff" },
        ],
      },
    ],
  },
  {
    id: "glacier-air-chemistry",
    name: "Glacier Air Chemistry",
    type: "environmental",
    status: "watch",
    region: "Aurora ridge canopy",
    cadence: "60 second sample bundle",
    refreshedAt: "Updated 5 minutes ago",
    summary:
      "Atmospheric readings remain within the seasonal band, but methane spikes are clustering close enough together to justify a watch posture.",
    throughput: "960 sample groups/hr",
    drift: "+0.9 ppm methane variance",
    anomalyCount: 1,
    headlineStats: [
      { label: "Methane spread", value: "7.3 ppm" },
      { label: "Humidity range", value: "61-67%" },
      { label: "Sampler uptime", value: "98.6%" },
    ],
    detailSections: [
      {
        title: "Stream posture",
        description:
          "This stream is not degraded, but the watch state should still stand out in the monitoring route and the anomaly summary.",
        entries: [
          { label: "Collector", value: "Ridge chemistry mast" },
          { label: "Coverage", value: "6 sensor towers" },
          { label: "Calibration age", value: "11 days" },
        ],
      },
      {
        title: "Operator notes",
        description:
          "Field ops want one more full sample cycle before dispatching a recalibration crew to the ridge.",
        entries: [
          { label: "Escalation owner", value: "Inez Mercer" },
          { label: "Last intervention", value: "Drift review at 07:05 UTC" },
          { label: "Review target", value: "Confirm clustering pattern by next sunrise pass" },
        ],
      },
    ],
  },
  {
    id: "citadel-access-ring",
    name: "Citadel Access Ring",
    type: "security",
    status: "offline",
    region: "Citadel east ingress",
    cadence: "5 second access event sync",
    refreshedAt: "No update for 19 minutes",
    summary:
      "Badge and gate events from the east ingress ring stopped replicating after the last controller failover, leaving the security desk on a blind spot.",
    throughput: "0 events/min",
    drift: "+19 minute blackout",
    anomalyCount: 2,
    headlineStats: [
      { label: "Reader coverage", value: "0 of 12 online" },
      { label: "Audit gap", value: "19 minutes" },
      { label: "Fallback queue", value: "214 unsent events" },
    ],
    detailSections: [
      {
        title: "Stream posture",
        description:
          "The offline state needs a sharper visual treatment than the degraded telemetry feed because the monitoring team has lost live visibility altogether.",
        entries: [
          { label: "Collector", value: "Ingress access controller 4B" },
          { label: "Coverage", value: "East ingress turnstiles and freight gate" },
          { label: "Fallback mode", value: "Local device buffering only" },
        ],
      },
      {
        title: "Operator notes",
        description:
          "Security can still inspect local device logs on site, but the centralized monitor is missing live events until the controller recovers.",
        entries: [
          { label: "Escalation owner", value: "Rafi Okonkwo" },
          { label: "Last intervention", value: "Controller failover at 08:58 UTC" },
          { label: "Review target", value: "Restore centralized event stream before shift change" },
        ],
      },
    ],
  },
];

export const signalAnomalies: SignalAnomaly[] = [
  {
    id: "thermal-packet-skew",
    signalId: "polar-vault-telemetry",
    title: "Thermal packet skew widening",
    severity: "elevated",
    summary:
      "Packet ordering drift crossed the alert threshold twice in the last 20 minutes, pushing replay lag past the expected buffer lane.",
    detectionWindow: "Detected across the last 20 minutes",
    owner: "Lena Solberg",
    impact: "Late thermal snapshots could hide a fast temperature rise inside the vault shell.",
    recommendedAction:
      "Keep the relay in buffered replay mode and compare the next checksum cycle before clearing the feed.",
  },
  {
    id: "cooling-delta-rise",
    signalId: "polar-vault-telemetry",
    title: "Cooling delta climbing above drill baseline",
    severity: "watch",
    summary:
      "Thermal spread is still below the critical trigger, but it is outpacing the last planned cold-start sequence.",
    detectionWindow: "Trending upward for 42 minutes",
    owner: "Lena Solberg",
    impact: "Operators may need to delay the next archive intake if the spread keeps widening.",
    recommendedAction:
      "Compare the next two sensor bundles against the pre-reset baseline before escalating to infrastructure.",
  },
  {
    id: "methane-cluster-repeat",
    signalId: "glacier-air-chemistry",
    title: "Methane spike cluster repeating",
    severity: "watch",
    summary:
      "Three closely spaced methane spikes landed in the same canopy quadrant after sunrise, matching the previous day's cluster pattern.",
    detectionWindow: "Observed in two consecutive sample windows",
    owner: "Inez Mercer",
    impact: "A repeat pattern increases the chance that the variance is a site issue rather than transient weather noise.",
    recommendedAction:
      "Hold the watch posture and stage a calibration crew if the next sample bundle confirms the same quadrant pattern.",
  },
  {
    id: "controller-blackout",
    signalId: "citadel-access-ring",
    title: "Controller blackout at east ingress",
    severity: "critical",
    summary:
      "The controller failover left the east ingress ring offline, so central monitoring has no live access event confirmation from the affected readers.",
    detectionWindow: "No replicated events for 19 minutes",
    owner: "Rafi Okonkwo",
    impact: "Security response now depends on local inspection and cannot verify badge activity from the central desk.",
    recommendedAction:
      "Dispatch on-site verification immediately and restore controller replication before the next freight clearance window.",
  },
  {
    id: "unsent-event-queue",
    signalId: "citadel-access-ring",
    title: "Buffered access queue rising",
    severity: "elevated",
    summary:
      "Local devices are still logging events, but the unsent queue is climbing as long as the ring stays disconnected from the monitoring plane.",
    detectionWindow: "Queue grew by 214 events in 19 minutes",
    owner: "Rafi Okonkwo",
    impact: "Once the link recovers, the replay burst could obscure the exact order of ingress events during the outage window.",
    recommendedAction:
      "Preserve local device clocks and prepare to reconcile replayed events against guard desk notes after recovery.",
  },
];
