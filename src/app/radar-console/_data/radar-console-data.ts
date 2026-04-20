export type RadarSectorTone = "critical" | "focused" | "watch" | "steady";

export type RadarPriorityTone = "priority-1" | "priority-2" | "priority-3";

export type RadarSignalState = "escalating" | "tracking" | "contained";

export type RadarConsoleOverview = {
  eyebrow: string;
  title: string;
  description: string;
  missionLabel: string;
  syncLabel: string;
  directive: string;
};

export type RadarSector = {
  id: string;
  code: string;
  name: string;
  posture: string;
  tone: RadarSectorTone;
  sweepWindow: string;
  orbit: string;
  focus: string;
  summary: string;
  terrain: string;
  activeSignalIds: string[];
  contactIds: string[];
};

export type RadarContact = {
  id: string;
  name: string;
  role: string;
  callSign: string;
  channel: string;
  responseWindow: string;
  location: string;
  status: string;
  specialty: string;
  sectorIds: string[];
};

export type RadarSignalPriority = {
  id: string;
  title: string;
  sectorId: string;
  priority: RadarPriorityTone;
  state: RadarSignalState;
  summary: string;
  lastUpdate: string;
  confidence: string;
  recommendedWindow: string;
  ownerContactIds: string[];
  actionChecklist: string[];
  telemetry: Array<{
    label: string;
    value: string;
  }>;
  narrative: string;
};

export type RadarPriorityLegendItem = {
  id: RadarPriorityTone;
  label: string;
  summary: string;
};

export type RadarInspectorMetadata = {
  eyebrow: string;
  title: string;
  description: string;
  defaultSignalId: string;
  legend: RadarPriorityLegendItem[];
};

export const radarConsoleOverview: RadarConsoleOverview = {
  eyebrow: "Issue 147 / Radar Console",
  title: "Track sector posture, contact ownership, and signal escalation from one route.",
  description:
    "Radar Console stages a dedicated monitoring surface for sector sweeps, contact summaries, and an inspector panel that can focus one signal at a time without depending on any live backend.",
  missionLabel: "Night sweep / Delta lattice / 23:40 UTC",
  syncLabel: "Synthetic feed refreshed 2 minutes ago",
  directive: "Escalate only when a sector shifts from watch to contested within the active sweep window.",
};

export const radarPriorityLegend: RadarPriorityLegendItem[] = [
  {
    id: "priority-1",
    label: "Priority 1",
    summary: "Immediate coordination required before the next sweep closes.",
  },
  {
    id: "priority-2",
    label: "Priority 2",
    summary: "Visible anomaly with enough stability to inspect before escalation.",
  },
  {
    id: "priority-3",
    label: "Priority 3",
    summary: "Background watch item that still needs an owner and notes.",
  },
];

export const radarInspectorMetadata: RadarInspectorMetadata = {
  eyebrow: "Signal inspector",
  title: "Select a signal to inspect its ownership, telemetry, and next actions.",
  description:
    "Each signal exposes its sector context, assigned contacts, telemetry checkpoints, and the immediate checklist expected from the operator.",
  defaultSignalId: "sig-aurora-bloom",
  legend: radarPriorityLegend,
};

export const radarSectors: RadarSector[] = [
  {
    id: "sector-cinder",
    code: "SC-01",
    name: "Cinder Shelf",
    posture: "Contested perimeter",
    tone: "critical",
    sweepWindow: "00:05 - 00:28 UTC",
    orbit: "Thermal low arc",
    focus: "Detect heat blooms around the freight relay and confirm whether the pattern is drifting inland.",
    summary:
      "Cinder Shelf is absorbing the most unstable telemetry. Two priority signals share the same thermal band, so the console needs a clear lead contact and a rapid handoff path.",
    terrain: "Coastal relay corridor with crosswind distortion",
    activeSignalIds: ["sig-aurora-bloom", "sig-magnet-runoff"],
    contactIds: ["contact-vale", "contact-iyer"],
  },
  {
    id: "sector-hinter",
    code: "SC-02",
    name: "Hinter Span",
    posture: "Focused watch",
    tone: "focused",
    sweepWindow: "00:10 - 00:34 UTC",
    orbit: "Mid-band lateral sweep",
    focus: "Track convoy-adjacent interference near the suspended service bridge.",
    summary:
      "Hinter Span has one recurring trace with enough consistency to review on the next pass. Contact ownership is stable, but the response window is narrowing as convoy traffic stacks.",
    terrain: "Elevated transit bridge and industrial overrun",
    activeSignalIds: ["sig-bridge-shadow"],
    contactIds: ["contact-sato", "contact-wren"],
  },
  {
    id: "sector-lumen",
    code: "SC-03",
    name: "Lumen Verge",
    posture: "Extended watchline",
    tone: "watch",
    sweepWindow: "00:18 - 00:42 UTC",
    orbit: "High reflective arc",
    focus: "Confirm whether reflective scatter near the reservoir is tied to weather or a staged relay.",
    summary:
      "Lumen Verge is quieter than Cinder Shelf, but the reflective surface keeps generating false positives. Operators need the sector summary and contact specialization visible in one glance.",
    terrain: "Reservoir basin and mirrored utility strip",
    activeSignalIds: ["sig-reservoir-fold", "sig-kite-latency"],
    contactIds: ["contact-marquez", "contact-wren"],
  },
  {
    id: "sector-northwake",
    code: "SC-04",
    name: "Northwake Steps",
    posture: "Stable coverage",
    tone: "steady",
    sweepWindow: "00:22 - 00:48 UTC",
    orbit: "Wide sentinel loop",
    focus: "Keep background coverage over the switchyard and verify that prior alerts remain contained.",
    summary:
      "Northwake Steps is the steadier anchor sector. It still carries one containment check so the inspector panel can demonstrate lower-priority monitoring without looking empty.",
    terrain: "Tiered switchyard and maintenance apron",
    activeSignalIds: ["sig-yard-echo"],
    contactIds: ["contact-iyer", "contact-marquez"],
  },
];

export const radarContacts: RadarContact[] = [
  {
    id: "contact-vale",
    name: "Nia Vale",
    role: "Sector lead",
    callSign: "Aegis-4",
    channel: "Ch. 12 / Thermal",
    responseWindow: "Respond inside 4 minutes",
    location: "Relay overlook",
    status: "Coordinating cross-sector escalation",
    specialty: "Thermal variance confirmation",
    sectorIds: ["sector-cinder"],
  },
  {
    id: "contact-iyer",
    name: "Arun Iyer",
    role: "Telemetry analyst",
    callSign: "Mosaic-2",
    channel: "Ch. 07 / Telemetry",
    responseWindow: "Respond inside 6 minutes",
    location: "Signal desk east",
    status: "Validating anomaly confidence",
    specialty: "Pattern drift and confidence scoring",
    sectorIds: ["sector-cinder", "sector-northwake"],
  },
  {
    id: "contact-sato",
    name: "Emi Sato",
    role: "Bridge liaison",
    callSign: "Span-3",
    channel: "Ch. 09 / Convoy",
    responseWindow: "Respond inside 5 minutes",
    location: "Transit bridge control",
    status: "Holding convoy handoff channel",
    specialty: "Bridge transit coordination",
    sectorIds: ["sector-hinter"],
  },
  {
    id: "contact-wren",
    name: "Owen Wren",
    role: "Field observer",
    callSign: "Kite-6",
    channel: "Ch. 15 / Visual",
    responseWindow: "Respond inside 8 minutes",
    location: "Reservoir south rim",
    status: "Sweeping reflective surfaces",
    specialty: "Visual confirmation in glare-heavy terrain",
    sectorIds: ["sector-hinter", "sector-lumen"],
  },
  {
    id: "contact-marquez",
    name: "Tala Marquez",
    role: "Reserve analyst",
    callSign: "Harbor-5",
    channel: "Ch. 05 / Reserve",
    responseWindow: "Respond inside 10 minutes",
    location: "Remote reserve desk",
    status: "Shadowing low-priority sectors",
    specialty: "Secondary review and containment audits",
    sectorIds: ["sector-lumen", "sector-northwake"],
  },
];

export const radarSignalPriorities: RadarSignalPriority[] = [
  {
    id: "sig-aurora-bloom",
    title: "Aurora Bloom",
    sectorId: "sector-cinder",
    priority: "priority-1",
    state: "escalating",
    summary:
      "Heat bloom widened by 18% across the freight relay edge during the last two sweeps.",
    lastUpdate: "Updated 90 seconds ago",
    confidence: "92% confidence",
    recommendedWindow: "Escalate before 00:16 UTC",
    ownerContactIds: ["contact-vale", "contact-iyer"],
    actionChecklist: [
      "Confirm whether the widened edge overlaps the relay access corridor.",
      "Request a visual verification pass before the next thermal sweep closes.",
      "Prepare a reroute note for sectors sharing the same telemetry band.",
    ],
    telemetry: [
      {
        label: "Drift velocity",
        value: "4.1 m/s inland",
      },
      {
        label: "Thermal spread",
        value: "+18% over prior pass",
      },
      {
        label: "Interference floor",
        value: "11% above baseline",
      },
    ],
    narrative:
      "Aurora Bloom is the sharpest anomaly on the board. It is expanding fast enough that the sector card needs to call it out, and the inspector should give the operator the direct checklist without additional navigation.",
  },
  {
    id: "sig-magnet-runoff",
    title: "Magnet Runoff",
    sectorId: "sector-cinder",
    priority: "priority-2",
    state: "tracking",
    summary:
      "Electromagnetic runoff remains bound to the coastal corridor but has started to echo against the relay towers.",
    lastUpdate: "Updated 4 minutes ago",
    confidence: "76% confidence",
    recommendedWindow: "Recheck at 00:20 UTC",
    ownerContactIds: ["contact-iyer"],
    actionChecklist: [
      "Compare echo profile against the prior relay maintenance signature.",
      "Flag if coastal wind shear pushes the trace beyond tower three.",
    ],
    telemetry: [
      {
        label: "Echo repetition",
        value: "Every 23 seconds",
      },
      {
        label: "Signal width",
        value: "1.8 km corridor",
      },
      {
        label: "Noise compression",
        value: "Moderate",
      },
    ],
    narrative:
      "Magnet Runoff is a solid mid-priority comparator for the inspector. It shares geography with the lead anomaly but does not yet justify the same escalation posture.",
  },
  {
    id: "sig-bridge-shadow",
    title: "Bridge Shadow",
    sectorId: "sector-hinter",
    priority: "priority-2",
    state: "tracking",
    summary:
      "Interference shadow is pacing convoy movement beneath the suspended service bridge.",
    lastUpdate: "Updated 3 minutes ago",
    confidence: "71% confidence",
    recommendedWindow: "Resolve before convoy shift at 00:30 UTC",
    ownerContactIds: ["contact-sato", "contact-wren"],
    actionChecklist: [
      "Confirm whether the shadow is attached to convoy metal mass or an external relay.",
      "Keep convoy operations informed before the next bridge entry cycle.",
    ],
    telemetry: [
      {
        label: "Convoy overlap",
        value: "62% overlap",
      },
      {
        label: "Shadow persistence",
        value: "2 sweep cycles",
      },
      {
        label: "Transit impact",
        value: "Medium",
      },
    ],
    narrative:
      "Bridge Shadow is useful because it ties contact coordination directly to a sector summary. The route needs this type of signal to make the contact panel feel operational instead of decorative.",
  },
  {
    id: "sig-reservoir-fold",
    title: "Reservoir Fold",
    sectorId: "sector-lumen",
    priority: "priority-2",
    state: "tracking",
    summary:
      "Reflective scatter folded into a repeatable curve near the reservoir utility strip.",
    lastUpdate: "Updated 6 minutes ago",
    confidence: "68% confidence",
    recommendedWindow: "Review during the 00:34 UTC high arc",
    ownerContactIds: ["contact-wren", "contact-marquez"],
    actionChecklist: [
      "Compare the curve against weather shimmer logs from the prior sweep.",
      "Escalate only if the fold persists through the next reflective pass.",
    ],
    telemetry: [
      {
        label: "Reflective bounce",
        value: "High",
      },
      {
        label: "Pattern lock",
        value: "Emerging",
      },
      {
        label: "Weather collision",
        value: "Possible",
      },
    ],
    narrative:
      "Reservoir Fold is intentionally ambiguous. It gives the inspector a case where the right action is disciplined observation rather than immediate escalation.",
  },
  {
    id: "sig-kite-latency",
    title: "Kite Latency",
    sectorId: "sector-lumen",
    priority: "priority-3",
    state: "tracking",
    summary:
      "Visual confirmation lag is trailing the reservoir sweep by nearly one full rotation.",
    lastUpdate: "Updated 8 minutes ago",
    confidence: "61% confidence",
    recommendedWindow: "Keep on watch through 00:42 UTC",
    ownerContactIds: ["contact-wren"],
    actionChecklist: [
      "Check whether glare conditions are extending confirmation lag.",
      "Leave in watch status unless the latency crosses the next sweep.",
    ],
    telemetry: [
      {
        label: "Observer lag",
        value: "46 seconds",
      },
      {
        label: "Visibility",
        value: "Glare-heavy",
      },
      {
        label: "Escalation need",
        value: "Low",
      },
    ],
    narrative:
      "Kite Latency gives the route a lower-priority case that still benefits from visible owner and telemetry metadata, especially on mobile where the inspector must stay readable.",
  },
  {
    id: "sig-yard-echo",
    title: "Yard Echo",
    sectorId: "sector-northwake",
    priority: "priority-3",
    state: "contained",
    summary:
      "Residual switchyard echo remains inside the previously cleared maintenance apron.",
    lastUpdate: "Updated 11 minutes ago",
    confidence: "84% confidence",
    recommendedWindow: "Confirm containment by 00:45 UTC",
    ownerContactIds: ["contact-iyer", "contact-marquez"],
    actionChecklist: [
      "Verify that the contained signature does not widen after the next loop.",
      "Log containment completion if the apron boundary stays intact.",
    ],
    telemetry: [
      {
        label: "Boundary drift",
        value: "None detected",
      },
      {
        label: "Containment span",
        value: "Stable for 3 passes",
      },
      {
        label: "Residual noise",
        value: "Low",
      },
    ],
    narrative:
      "Yard Echo rounds out the route with a contained state so the inspector can demonstrate summary behavior beyond active escalation and watch items.",
  },
];
