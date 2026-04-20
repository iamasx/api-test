export type MetricStatus = "stable" | "attention" | "critical";
export type AlertSeverity = "critical" | "elevated" | "watch";
export type ActivityTone = "operator" | "automation" | "resolved";

export interface ControlRoomMetric {
  id: string;
  label: string;
  value: string;
  delta: string;
  status: MetricStatus;
  context: string;
  focus: string;
  progress: number;
}

export interface ControlRoomAlert {
  id: string;
  severity: AlertSeverity;
  title: string;
  zone: string;
  summary: string;
  owner: string;
  updatedAt: string;
  nextStep: string;
  customerImpact: string;
}

export interface ControlRoomAlertSection {
  id: string;
  title: string;
  responseWindow: string;
  summary: string;
  alerts: ControlRoomAlert[];
}

export interface OperatorActivityEntry {
  id: string;
  title: string;
  operator: string;
  role: string;
  timestamp: string;
  summary: string;
  handoff: string;
  tone: ActivityTone;
}

export const controlRoomMetrics = [
  {
    id: "signal-integrity",
    label: "Signal integrity",
    value: "99.94%",
    delta: "+0.02 vs last handoff",
    status: "stable",
    context:
      "Sensor traffic is flowing cleanly across the east and central mesh, keeping the room on a low-noise baseline.",
    focus: "Mesh heartbeat coverage",
    progress: 99,
  },
  {
    id: "containment-sla",
    label: "Containment SLA",
    value: "92%",
    delta: "3 incidents nearing threshold",
    status: "attention",
    context:
      "Most in-flight events are contained within the target window, but two facilities need faster approvals before shift change.",
    focus: "Acknowledgement window",
    progress: 92,
  },
  {
    id: "manual-overrides",
    label: "Manual overrides",
    value: "7 queued",
    delta: "2 above comfort band",
    status: "critical",
    context:
      "Override load is still concentrated around one cooling stack and one access-control recovery, raising the risk of operator fatigue.",
    focus: "Priority override lane",
    progress: 58,
  },
  {
    id: "field-coverage",
    label: "Field dispatch coverage",
    value: "18 crews",
    delta: "Full metro sweep online",
    status: "stable",
    context:
      "Dispatch boards remain balanced with reserve technicians staged near the highest-risk facilities before the evening surge.",
    focus: "Rapid dispatch readiness",
    progress: 88,
  },
] satisfies ControlRoomMetric[];

export const controlRoomAlertSections = [
  {
    id: "immediate-action",
    title: "Immediate action",
    responseWindow: "Acknowledge within 5 minutes",
    summary:
      "Active incidents that can spill into customer-facing downtime or safety exposure without an operator handoff.",
    alerts: [
      {
        id: "cooling-loop-drift",
        severity: "critical",
        title: "Cooling loop drift in pod C-12",
        zone: "North plant · Pod C-12",
        summary:
          "The temperature control loop has cycled outside its tolerance band three times in the last 14 minutes.",
        owner: "Facilities command",
        updatedAt: "Updated 4 minutes ago",
        nextStep: "Dispatch the reserve refrigeration crew and isolate the affected aisle.",
        customerImpact: "Cold-storage fulfillment promises are at risk for the next wave.",
      },
      {
        id: "badge-auth-retry",
        severity: "elevated",
        title: "Badge authentication retry spike",
        zone: "South gate access control",
        summary:
          "Credential checks are timing out intermittently, forcing manual confirmation on a growing share of entries.",
        owner: "Security systems",
        updatedAt: "Updated 7 minutes ago",
        nextStep: "Fail over to the secondary auth profile and keep a supervisor at the gate.",
        customerImpact: "Shift turnover may slow if credential checks continue to queue.",
      },
    ],
  },
  {
    id: "stabilization-queue",
    title: "Stabilization queue",
    responseWindow: "Clear before next shift handoff",
    summary:
      "Events that are contained for now but still need deliberate follow-through to avoid reopening during the next operating block.",
    alerts: [
      {
        id: "backup-generator-sync",
        severity: "elevated",
        title: "Backup generator sync lag",
        zone: "Riverfront campus",
        summary:
          "The standby generator responded on time, but its transfer controller is reporting a slower-than-normal resync.",
        owner: "Power operations",
        updatedAt: "Updated 12 minutes ago",
        nextStep: "Run a controller reset during the next load lull and keep remote telemetry pinned.",
        customerImpact: "No downtime yet, but resilience is reduced for a second power event.",
      },
      {
        id: "sorter-optics-calibration",
        severity: "watch",
        title: "Sorter optics calibration drift",
        zone: "Parcel line 4",
        summary:
          "A recent calibration package reduced misses, but sensor confidence is still wobbling on high-glare cartons.",
        owner: "Automation desk",
        updatedAt: "Updated 16 minutes ago",
        nextStep: "Keep the calibration tech on standby and monitor reject rates through the next batch.",
        customerImpact: "Premium parcel throughput could soften during the peak sort burst.",
      },
    ],
  },
  {
    id: "observation-deck",
    title: "Observation deck",
    responseWindow: "Monitor through the next 30 minutes",
    summary:
      "Lower-severity signals that are visible in the room because they tend to compound when they line up with staffing or weather changes.",
    alerts: [
      {
        id: "camera-latency-west-yard",
        severity: "watch",
        title: "Camera latency across west yard",
        zone: "West yard perimeter",
        summary:
          "Two perimeter camera feeds are dropping frames after the latest firmware roll, though alert detection remains online.",
        owner: "Perimeter security",
        updatedAt: "Updated 19 minutes ago",
        nextStep: "Rollback the firmware package if frame loss climbs above the current band.",
        customerImpact: "Minimal now, but evidence capture quality is reduced if an incident occurs.",
      },
      {
        id: "dock-door-sensor-noise",
        severity: "watch",
        title: "Dock door sensor noise",
        zone: "Inbound dock cluster B",
        summary:
          "Door sensors are producing duplicate open-close events during the heaviest inbound trailer movements.",
        owner: "Site operations",
        updatedAt: "Updated 23 minutes ago",
        nextStep: "Audit the noisy sensors at the next scheduled trailer break and suppress duplicate alerts.",
        customerImpact: "Operator attention is being diluted by duplicate events rather than true failures.",
      },
    ],
  },
] satisfies ControlRoomAlertSection[];

export const operatorActivityEntries = [
  {
    id: "override-bundle",
    title: "Override bundle approved for the north plant",
    operator: "S. Alvarez",
    role: "Command lead",
    timestamp: "08:14 UTC",
    summary:
      "The room approved a bundled override so facilities, security, and dispatch can act against the same incident window.",
    handoff: "All follow-on owners have a synchronized containment timeline.",
    tone: "operator",
  },
  {
    id: "yard-cameras",
    title: "Camera diagnostics rolled back in the west yard",
    operator: "Room automation",
    role: "Automated safeguard",
    timestamp: "08:02 UTC",
    summary:
      "A rollback rule restored the previous firmware package after repeated frame-loss alerts crossed the safe threshold.",
    handoff: "Perimeter security retained full motion detection coverage.",
    tone: "automation",
  },
  {
    id: "generator-followup",
    title: "Riverfront generator controller reset scheduled",
    operator: "T. Morgan",
    role: "Power coordinator",
    timestamp: "07:49 UTC",
    summary:
      "A low-load reset window was coordinated with field technicians to avoid reopening the power event during active operations.",
    handoff: "Field crew arrival is confirmed for the next quiet interval.",
    tone: "operator",
  },
  {
    id: "sorter-reject-rate",
    title: "Sorter reject rate normalized after manual tuning",
    operator: "K. Iqbal",
    role: "Automation specialist",
    timestamp: "07:31 UTC",
    summary:
      "Manual tuning on line 4 reduced false rejects enough to pull the incident back into the stabilization queue.",
    handoff: "The remaining optics drift will stay under observation instead of escalation.",
    tone: "resolved",
  },
  {
    id: "gate-coverage",
    title: "Supervisor dispatched to the south gate",
    operator: "J. Rivera",
    role: "Security coordinator",
    timestamp: "07:18 UTC",
    summary:
      "A supervisor moved to the south gate to keep entries moving while credential retries are being mitigated.",
    handoff: "Shift turnover remains on schedule despite the auth jitter.",
    tone: "operator",
  },
] satisfies OperatorActivityEntry[];
