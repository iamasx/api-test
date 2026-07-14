const lanes = [
  {
    id: "containment",
    title: "Containment lane",
    summary: "Protect the service window before downstream teams accumulate more debt.",
    serviceWindow: "Stabilize inside 45 minutes",
  },
  {
    id: "customer",
    title: "Customer lane",
    summary: "Route account-facing escalations that need a named recovery message or waiver.",
    serviceWindow: "Update customers inside 60 minutes",
  },
  {
    id: "recovery",
    title: "Recovery lane",
    summary: "Land the durable fix and assign the next operating checkpoint.",
    serviceWindow: "Close the loop before shift turnover",
  },
] as const;

const owners = [
  {
    id: "owner-1",
    name: "Lina Ortega",
    role: "Incident lead",
    shift: "UTC-5 / Day shift",
    focus: "Holding the containment lane and sequencing partner updates.",
    handoff: "18:30 handoff to Marcus Chen if warehouse relays remain degraded.",
  },
  {
    id: "owner-2",
    name: "Marcus Chen",
    role: "Customer desk captain",
    shift: "UTC+1 / Swing shift",
    focus: "Clearing account messaging, waivers, and launch approvals.",
    handoff: "Document waiver blockers before the west coast handoff.",
  },
  {
    id: "owner-3",
    name: "Amina Bello",
    role: "Platform response manager",
    shift: "UTC+0 / Follow-the-sun",
    focus: "Driving durable fixes for routing, telemetry, and retry posture.",
    handoff: "Publish recovery notes into the midnight review packet.",
  },
] as const;

const escalations = [
  {
    id: "esc-1",
    laneId: "containment",
    ownerId: "owner-1",
    severity: "critical",
    title: "Route planner retries are stacking on the relay cluster",
    service: "Relay routing",
    account: "Northline Freight",
    openedAt: "Opened 14 minutes ago",
    summary: "Retry bursts are pushing relay nodes past safe queue depth in the east region.",
    blocker: "Autoscaling is available, but the fail-open threshold has not been approved.",
    nextAction: "Approve temporary capacity burst and suppress non-critical replay jobs.",
    eta: "Decision window 18 minutes",
  },
  {
    id: "esc-2",
    laneId: "customer",
    ownerId: "owner-2",
    severity: "watch",
    title: "Atlas pharmacy handoff is waiting on cold-chain verification",
    service: "Account messaging",
    account: "Atlas Pharmacy",
    openedAt: "Opened 31 minutes ago",
    summary: "The customer needs a named recovery promise before 19:00.",
    blocker: "Warehouse telemetry is delayed, so the message still lacks a verified arrival window.",
    nextAction: "Issue a constrained update with the last verified depot checkpoint and callback time.",
    eta: "Customer update due in 22 minutes",
  },
  {
    id: "esc-3",
    laneId: "recovery",
    ownerId: "owner-3",
    severity: "stable",
    title: "Dock scanner patch fixed the duplicate labels but needs review",
    service: "Device recovery",
    account: "Shared operations",
    openedAt: "Opened 52 minutes ago",
    summary: "The patch stopped duplicate labels in staging and is ready for controlled promotion.",
    blocker: "Release review has not signed off on the rollback checkpoint.",
    nextAction: "Pair the release note with a rollback timestamp and move it into the next deploy slot.",
    eta: "Recovery review in 35 minutes",
  },
  {
    id: "esc-4",
    laneId: "customer",
    ownerId: "owner-2",
    severity: "critical",
    title: "Cross-border waiver package is incomplete for the summit lane",
    service: "Partner clearance",
    account: "Summit Bio",
    openedAt: "Opened 43 minutes ago",
    summary: "Legal approval is blocked because the final customs waiver is missing the carrier rider.",
    blocker: "The broker draft does not match the lane-specific insurance schedule.",
    nextAction: "Escalate the rider mismatch to legal and prepare the alternate broker packet.",
    eta: "Waiver call in 12 minutes",
  },
  {
    id: "esc-5",
    laneId: "containment",
    ownerId: "owner-1",
    severity: "watch",
    title: "Playback lag on the control wall is hiding recent recovery signals",
    service: "Ops telemetry",
    account: "Control room",
    openedAt: "Opened 27 minutes ago",
    summary: "The command wall is 90 seconds behind live feed timing during incident replay.",
    blocker: "Telemetry compression is competing with hot storage rebalance jobs.",
    nextAction: "Pause the rebalance batch and re-check wall latency against the live shard.",
    eta: "Latency check in 9 minutes",
  },
] as const;

const followUps = [
  {
    id: "follow-up-1",
    ownerId: "owner-1",
    escalationId: "esc-1",
    action: "Record the approved burst threshold and rollback marker in the lane log.",
    dueWindow: "Before the next 30-minute control review",
    reason: "The containment lane needs a written fallback before more replay traffic is released.",
  },
  {
    id: "follow-up-2",
    ownerId: "owner-2",
    escalationId: "esc-4",
    action: "Send the alternate broker packet if the insurance rider is not corrected on the waiver call.",
    dueWindow: "Immediately after the 19:00 waiver review",
    reason: "Customer approval cannot move without a broker-backed fallback.",
  },
  {
    id: "follow-up-3",
    ownerId: "owner-3",
    escalationId: "esc-3",
    action: "Attach the rollback checkpoint to the release note and request final sign-off.",
    dueWindow: "Before shift turnover",
    reason: "Recovery stays exposed until the patch is either promoted or explicitly deferred.",
  },
] as const;

export function getEscalationAtlasView() {
  const ownerById = new Map(owners.map((owner) => [owner.id, owner]));
  const laneById = new Map(lanes.map((lane) => [lane.id, lane]));

  return {
    hero: {
      eyebrow: "Escalation Atlas",
      title: "Map active escalation lanes, owner posture, and the follow-up queue.",
      description:
        "This route stages a compact operating view for teams triaging live escalations. It keeps lane pressure, named ownership, and the next written follow-up visible without backend state.",
    },
    metrics: [
      { label: "Active escalations", value: `${escalations.length}`, detail: "Live items across three lanes." },
      {
        label: "Critical now",
        value: `${escalations.filter((item) => item.severity === "critical").length}`,
        detail: "Escalations that can still miss an approval or recovery window.",
      },
      { label: "Owners on point", value: `${owners.length}`, detail: "Named leads carrying the next review cycle." },
    ],
    lanes: lanes.map((lane) => {
      const items = escalations.filter((item) => item.laneId === lane.id);
      return {
        ...lane,
        items,
        itemCount: items.length,
        criticalCount: items.filter((item) => item.severity === "critical").length,
        ownerNames: [...new Set(items.map((item) => ownerById.get(item.ownerId)?.name ?? ""))].filter(Boolean),
      };
    }),
    ownerSummaries: owners.map((owner) => {
      const activeItems = escalations.filter((item) => item.ownerId === owner.id);
      return {
        ...owner,
        activeCount: activeItems.length,
        criticalCount: activeItems.filter((item) => item.severity === "critical").length,
        laneTitles: [...new Set(activeItems.map((item) => laneById.get(item.laneId)?.title ?? ""))].filter(Boolean),
      };
    }),
    followUps: followUps.map((item) => ({
      ...item,
      ownerName: ownerById.get(item.ownerId)?.name ?? "Unassigned",
      escalationTitle:
        escalations.find((escalation) => escalation.id === item.escalationId)?.title ?? "Unknown escalation",
    })),
  };
}
