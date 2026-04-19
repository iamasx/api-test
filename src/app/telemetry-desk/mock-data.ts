export type ReportingWindowId = "90m" | "6h" | "24h";
export type MetricState = "active" | "inactive";
export type AlertTone = "critical" | "watch" | "clear";
export type ReportingWindow = { id: ReportingWindowId; label: string; range: string; cadence: string };
export type TelemetryMetric = { id: string; label: string; value: string; delta: string; state: MetricState; note: string };
export type TrendPanel = {
  id: string;
  title: string;
  owner: string;
  metricIds: string[];
  summary: string;
  status: "lift" | "steady" | "watch";
  defaultBaselineId: string;
  baselines: { id: string; label: string; value: string; delta: string; samples: number[] }[];
};
export type AlertSummary = { id: string; label: string; severity: AlertTone; count: number; metricIds: string[]; note: string };
export type TelemetrySnapshot = { periodLabel: string; metrics: TelemetryMetric[]; panels: TrendPanel[]; alerts: AlertSummary[] };

export const reportingWindows: ReportingWindow[] = [
  { id: "90m", label: "90m", range: "Last 90 minutes", cadence: "11 second relay cadence" },
  { id: "6h", label: "6h", range: "Current operations block", cadence: "30 second relay cadence" },
  { id: "24h", label: "24h", range: "Daily comparison rollup", cadence: "2 minute relay cadence" },
];

export const alertToneFilters: Array<{ id: AlertTone | "all"; label: string }> = [
  { id: "all", label: "All" },
  { id: "critical", label: "Critical" },
  { id: "watch", label: "Watch" },
  { id: "clear", label: "Clear" },
];

export const comparisonDefaults: Record<ReportingWindowId, { focusMetricId: string | null; hiddenPanelIds: string[] }> = {
  "90m": { focusMetricId: "ingress-load", hiddenPanelIds: [] },
  "6h": { focusMetricId: null, hiddenPanelIds: [] },
  "24h": { focusMetricId: "field-latency", hiddenPanelIds: [] },
};

export const telemetryDeskData: Record<ReportingWindowId, TelemetrySnapshot> = {
  "90m": {
    periodLabel: "14:10-15:40 UTC",
    metrics: [
      { id: "ingress-load", label: "Ingress Load", value: "81%", delta: "+4.6%", state: "active", note: "Burst lanes are running above the relay median." },
      { id: "uplink-stability", label: "Uplink Stability", value: "99.2%", delta: "-0.3%", state: "active", note: "Short packet loss surfaced on the northern relay path." },
      { id: "field-latency", label: "Field Latency", value: "182 ms", delta: "-14 ms", state: "active", note: "Dispatch hops recovered after the last route rebalance." },
      { id: "thermal-reserve", label: "Thermal Reserve", value: "7.8 mw", delta: "-0.9 mw", state: "inactive", note: "Reserve is idle but still tracked for handoff readiness." },
      { id: "sensor-drift", label: "Sensor Drift", value: "0.8 deg", delta: "+0.2 deg", state: "inactive", note: "Drift remains within buffer but is trending away from baseline." },
      { id: "queue-depth", label: "Queue Depth", value: "14 stacks", delta: "+3", state: "active", note: "Dispatch queue is backfilling after the 14:00 handoff." },
    ],
    panels: [
      { id: "throughput", title: "Cross-grid throughput", owner: "Transit lanes", metricIds: ["ingress-load", "queue-depth"], summary: "Inbound load is outpacing routed clearance by one short cycle.", status: "watch", defaultBaselineId: "prior-shift", baselines: [{ id: "prior-shift", label: "Prior shift", value: "74%", delta: "+7 pts", samples: [42, 58, 61, 73, 84] }, { id: "forecast", label: "Forecast", value: "79%", delta: "+2 pts", samples: [40, 55, 63, 68, 76] }, { id: "median", label: "Sector median", value: "71%", delta: "+10 pts", samples: [38, 44, 56, 60, 69] }] },
      { id: "relay", title: "Relay integrity", owner: "North mesh", metricIds: ["uplink-stability", "sensor-drift"], summary: "Recovery holds, but one relay remains below the clean packet floor.", status: "steady", defaultBaselineId: "forecast", baselines: [{ id: "prior-shift", label: "Prior shift", value: "98.6%", delta: "+0.6 pts", samples: [72, 83, 88, 91, 95] }, { id: "forecast", label: "Forecast", value: "99.0%", delta: "+0.2 pts", samples: [75, 80, 87, 90, 96] }, { id: "median", label: "Sector median", value: "98.1%", delta: "+1.1 pts", samples: [68, 74, 79, 84, 89] }] },
      { id: "dispatch", title: "Dispatch latency", owner: "Field routing", metricIds: ["field-latency"], summary: "Latency is improving faster than the daily corridor expectation.", status: "lift", defaultBaselineId: "median", baselines: [{ id: "prior-shift", label: "Prior shift", value: "201 ms", delta: "-19 ms", samples: [86, 74, 66, 58, 43] }, { id: "forecast", label: "Forecast", value: "188 ms", delta: "-6 ms", samples: [78, 71, 63, 55, 46] }, { id: "median", label: "Sector median", value: "214 ms", delta: "-32 ms", samples: [92, 79, 70, 61, 52] }] },
    ],
    alerts: [
      { id: "a1", label: "Burst queue spillover", severity: "critical", count: 3, metricIds: ["ingress-load", "queue-depth"], note: "Three stacks crossed the burst lane ceiling in the last 18 minutes." },
      { id: "a2", label: "Relay packet watch", severity: "watch", count: 2, metricIds: ["uplink-stability", "sensor-drift"], note: "Two relays need another clean pass before they return to nominal." },
      { id: "a3", label: "Latency corridor clear", severity: "clear", count: 1, metricIds: ["field-latency"], note: "Routing trims brought the southern corridor back inside the target band." },
      { id: "a4", label: "Thermal reserve idle", severity: "watch", count: 1, metricIds: ["thermal-reserve"], note: "Reserve stayed offline by design during the condensed reporting window." },
    ],
  },
  "6h": {
    periodLabel: "09:00-15:00 UTC",
    metrics: [
      { id: "ingress-load", label: "Ingress Load", value: "76%", delta: "+2.4%", state: "active", note: "Load widened after the noon sync but remained inside planned capacity." },
      { id: "uplink-stability", label: "Uplink Stability", value: "99.6%", delta: "+0.1%", state: "active", note: "Relay integrity stayed clean across the full block." },
      { id: "field-latency", label: "Field Latency", value: "194 ms", delta: "-8 ms", state: "active", note: "Dispatch timings normalized after the late-morning backlog was cleared." },
      { id: "thermal-reserve", label: "Thermal Reserve", value: "8.9 mw", delta: "+0.5 mw", state: "inactive", note: "The reserve bank stayed ready without being promoted into the active mix." },
      { id: "sensor-drift", label: "Sensor Drift", value: "0.6 deg", delta: "-0.1 deg", state: "inactive", note: "Calibration checks held drift close to the operating midpoint." },
      { id: "queue-depth", label: "Queue Depth", value: "11 stacks", delta: "-2", state: "active", note: "Queue pressure eased across the back half of the block." },
    ],
    panels: [
      { id: "throughput", title: "Cross-grid throughput", owner: "Transit lanes", metricIds: ["ingress-load", "queue-depth"], summary: "Load remains elevated, but the desk recovered most of the noon surge.", status: "steady", defaultBaselineId: "forecast", baselines: [{ id: "prior-shift", label: "Prior shift", value: "73%", delta: "+3 pts", samples: [39, 51, 60, 66, 74] }, { id: "forecast", label: "Forecast", value: "75%", delta: "+1 pt", samples: [37, 49, 58, 64, 72] }, { id: "median", label: "Sector median", value: "70%", delta: "+6 pts", samples: [34, 45, 53, 59, 68] }] },
      { id: "relay", title: "Relay integrity", owner: "North mesh", metricIds: ["uplink-stability", "sensor-drift"], summary: "Recovery checks held above target with only minor calibration drift left open.", status: "lift", defaultBaselineId: "median", baselines: [{ id: "prior-shift", label: "Prior shift", value: "99.1%", delta: "+0.5 pts", samples: [69, 76, 82, 89, 94] }, { id: "forecast", label: "Forecast", value: "99.3%", delta: "+0.3 pts", samples: [70, 78, 84, 90, 95] }, { id: "median", label: "Sector median", value: "98.7%", delta: "+0.9 pts", samples: [64, 73, 80, 86, 91] }] },
      { id: "dispatch", title: "Dispatch latency", owner: "Field routing", metricIds: ["field-latency"], summary: "The desk is back under the mid-block latency floor and holding the gain.", status: "steady", defaultBaselineId: "prior-shift", baselines: [{ id: "prior-shift", label: "Prior shift", value: "202 ms", delta: "-8 ms", samples: [88, 79, 72, 61, 48] }, { id: "forecast", label: "Forecast", value: "198 ms", delta: "-4 ms", samples: [84, 76, 69, 60, 50] }, { id: "median", label: "Sector median", value: "210 ms", delta: "-16 ms", samples: [91, 82, 75, 66, 56] }] },
    ],
    alerts: [
      { id: "a1", label: "Relay watchlist", severity: "watch", count: 2, metricIds: ["uplink-stability", "sensor-drift"], note: "Two relays remain on follow-up review even though the desk stabilized." },
      { id: "a2", label: "Queue backlog cleared", severity: "clear", count: 4, metricIds: ["queue-depth", "ingress-load"], note: "Four earlier queue flags were resolved without carrying into the afternoon block." },
      { id: "a3", label: "Dispatch target recovered", severity: "clear", count: 2, metricIds: ["field-latency"], note: "The field routing desk closed both latency exceptions before handoff." },
      { id: "a4", label: "Reserve bank staged", severity: "watch", count: 1, metricIds: ["thermal-reserve"], note: "Reserve stayed staged in case the noon load burst escalated." },
    ],
  },
  "24h": {
    periodLabel: "Last 24 hours",
    metrics: [
      { id: "ingress-load", label: "Ingress Load", value: "71%", delta: "+1.1%", state: "active", note: "Daily load remained above baseline but avoided the overnight surge threshold." },
      { id: "uplink-stability", label: "Uplink Stability", value: "99.4%", delta: "+0.2%", state: "active", note: "Integrity remained consistent through both day and night windows." },
      { id: "field-latency", label: "Field Latency", value: "206 ms", delta: "-21 ms", state: "active", note: "Dispatch routing closed the day significantly lower than the morning peak." },
      { id: "thermal-reserve", label: "Thermal Reserve", value: "9.6 mw", delta: "+1.4 mw", state: "inactive", note: "The reserve buffer accumulated capacity throughout the quieter overnight period." },
      { id: "sensor-drift", label: "Sensor Drift", value: "0.7 deg", delta: "-0.2 deg", state: "inactive", note: "Calibration jobs held steady after the early drift flare was corrected." },
      { id: "queue-depth", label: "Queue Depth", value: "9 stacks", delta: "-5", state: "active", note: "Queue backlog declined sharply compared with the previous daily cycle." },
    ],
    panels: [
      { id: "throughput", title: "Cross-grid throughput", owner: "Transit lanes", metricIds: ["ingress-load", "queue-depth"], summary: "The daily profile shows a shallower peak and a cleaner overnight taper.", status: "lift", defaultBaselineId: "median", baselines: [{ id: "prior-shift", label: "Prior cycle", value: "69%", delta: "+2 pts", samples: [31, 47, 58, 63, 70] }, { id: "forecast", label: "Forecast", value: "72%", delta: "-1 pt", samples: [34, 46, 55, 62, 69] }, { id: "median", label: "Daily median", value: "67%", delta: "+4 pts", samples: [28, 40, 51, 57, 65] }] },
      { id: "relay", title: "Relay integrity", owner: "North mesh", metricIds: ["uplink-stability", "sensor-drift"], summary: "Daily relay health held steady with less calibration drift than the prior cycle.", status: "steady", defaultBaselineId: "forecast", baselines: [{ id: "prior-shift", label: "Prior cycle", value: "98.9%", delta: "+0.5 pts", samples: [63, 71, 78, 86, 92] }, { id: "forecast", label: "Forecast", value: "99.2%", delta: "+0.2 pts", samples: [66, 73, 80, 87, 93] }, { id: "median", label: "Daily median", value: "98.6%", delta: "+0.8 pts", samples: [60, 68, 74, 81, 88] }] },
      { id: "dispatch", title: "Dispatch latency", owner: "Field routing", metricIds: ["field-latency"], summary: "Latency fell well below the prior cycle and carried the gain through handoff.", status: "lift", defaultBaselineId: "prior-shift", baselines: [{ id: "prior-shift", label: "Prior cycle", value: "227 ms", delta: "-21 ms", samples: [95, 86, 73, 62, 44] }, { id: "forecast", label: "Forecast", value: "214 ms", delta: "-8 ms", samples: [89, 80, 70, 61, 49] }, { id: "median", label: "Daily median", value: "221 ms", delta: "-15 ms", samples: [93, 84, 75, 66, 55] }] },
    ],
    alerts: [
      { id: "a1", label: "Daily queue exception", severity: "critical", count: 1, metricIds: ["queue-depth", "ingress-load"], note: "One queue event breached the overnight burst threshold before it was corrected." },
      { id: "a2", label: "Relay stability clean", severity: "clear", count: 5, metricIds: ["uplink-stability", "sensor-drift"], note: "Five relay checks closed with no carryover faults into the next cycle." },
      { id: "a3", label: "Latency recovery sustained", severity: "clear", count: 3, metricIds: ["field-latency"], note: "Latency stayed below the daily target after the afternoon route trim." },
      { id: "a4", label: "Reserve monitoring idle", severity: "watch", count: 1, metricIds: ["thermal-reserve"], note: "Reserve remained available but never required promotion into the active mix." },
    ],
  },
};
