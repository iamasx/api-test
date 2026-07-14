export const watchtowerOverview = {
  eyebrow: "Watchtower route / Alert digest",
  title: "Scan alert drift, service health, and operator notes before the next rotation.",
  description:
    "The watchtower route compresses high-signal alerts, short health summaries, and operator context into a single handoff view for the next duty lead.",
  digestWindow: "Digest window · 18:00 to 22:00 UTC",
  focusNote:
    "Two critical digests still need explicit operator approval before automation can widen traffic again.",
  reviewWindow: "22:20 UTC",
  shiftLead: "Shift lead · N. Alvarez",
};

export const watchtowerAlerts = [
  {
    severity: "critical" as const,
    service: "Orbital relay mesh",
    title: "Fallback relays are saturating the north relay spine.",
    scope: "21 relays / 3 regions",
    owner: "M. Chen",
    digest:
      "Queue pressure crossed the auto-shed threshold twice after the west mesh reroute, so traffic is holding on manual trims until the next clean sample.",
    nextStep: "Approve a 12-minute route trim before 22:20 UTC.",
    affectedSystems: ["mesh-east-2", "north-spine cache", "fallback batch 4"],
  },
  {
    severity: "elevated" as const,
    service: "Payload scanner lane",
    title: "Scanner calibration drift is slowing parcel verification.",
    scope: "4 scanner cells",
    owner: "R. Singh",
    digest:
      "Verification retries climbed to 8.3% after the last firmware pull, which is still within failover range but now exceeding the shift target.",
    nextStep: "Hold inbound surges until calibration pass C finishes.",
    affectedSystems: ["scan-west-4", "handoff queue", "firmware mirror"],
  },
  {
    severity: "critical" as const,
    service: "Manifest handoff",
    title: "Manifest receipts are arriving behind the operator review window.",
    scope: "2 late cutover lanes",
    owner: "L. Ortega",
    digest:
      "Late receipts are not dropping traffic, but they are now compressing the audit review window enough to threaten the next automated closeout.",
    nextStep: "Keep closeout manual for the next two digest cycles.",
    affectedSystems: ["receipt stream", "lane-c7", "audit closeout bot"],
  },
];

export const watchtowerHealthSummaries = [
  {
    tone: "risk" as const,
    title: "Relay mesh health",
    signal: "Capacity margin 68%",
    owner: "Transit network",
    summary:
      "Manual trims are keeping the mesh stable, but the reserve margin is now thin enough that another burst would force wider shedding.",
    recommendation: "Keep bulk traffic capped until relay drift clears.",
  },
  {
    tone: "watch" as const,
    title: "Verification lane health",
    signal: "Retry rate 8.3%",
    owner: "Dock systems",
    summary:
      "Scanner throughput is still acceptable for current volume, although the current retry profile will create queue drag if inbound demand spikes.",
    recommendation: "Finish calibration pass C before lifting intake caps.",
  },
  {
    tone: "stable" as const,
    title: "Operator coverage health",
    signal: "Coverage confidence 94%",
    owner: "Shift command",
    summary:
      "Crew overlap and specialist coverage remain strong enough to absorb manual interventions without extending the next handoff.",
    recommendation: "Use the reserve reviewer to shadow critical receipts only.",
  },
];

export const watchtowerOperatorNotes = [
  {
    status: "tracking" as const,
    channel: "Ops chat",
    author: "N. Alvarez",
    time: "21:42 UTC",
    note: "Keep the north relay trim manual until queue depth stays below 68% for two consecutive samples.",
    followUp: "Review after the 22:10 UTC digest snapshot.",
  },
  {
    status: "queued" as const,
    channel: "Dock review",
    author: "R. Singh",
    time: "21:37 UTC",
    note: "Bundle scanner drift updates into one operator post so the incoming shift does not chase duplicate recalibration notes.",
    followUp: "Publish a single rollup before handoff.",
  },
  {
    status: "closed" as const,
    channel: "Audit lane",
    author: "L. Ortega",
    time: "21:31 UTC",
    note: "Receipt lag is manageable as long as the closeout bot stays paused and lane C7 remains on a human review path.",
    followUp: "Confirm pause state in the 22:20 UTC review.",
  },
];
