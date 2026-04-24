export type ResponseLedgerEntryStatus = "sealed" | "watching" | "handoff";
export type ResponseLedgerEntry = {
  id: string;
  timestamp: string;
  action: string;
  summary: string;
  outcome: string;
  owner: string;
  team: string;
  status: ResponseLedgerEntryStatus;
  signal: string;
  reviewWindow: string;
};
export type OutcomeSummary = {
  id: string;
  label: string;
  headline: string;
  detail: string;
  owner: string;
};
export type OwnershipRailItemStatus = "on-watch" | "balanced";

export type OwnershipRailItem = {
  id: string;
  name: string;
  role: string;
  status: OwnershipRailItemStatus;
  focus: string;
  queue: string;
  coverage: string;
};

export const responseLedgerEntries: ResponseLedgerEntry[] = [
  {
    id: "dock-reroute",
    timestamp: "05:42 UTC",
    action: "Rebalanced Dock 4 overflow into the Harbor East recovery lane",
    summary: "The shift moved overflow before the receiving backlog crossed the forty-minute mark.",
    outcome: "Overflow stabilized and the next trailer landed into a controlled queue.",
    owner: "Mara Singh",
    team: "Inbound control",
    status: "sealed",
    signal: "Queue delta -18%",
    reviewWindow: "Review again at 06:15 UTC",
  },
  {
    id: "cold-chain-rotation",
    timestamp: "06:08 UTC",
    action: "Rotated the cold-chain packout roster after scanner drift surfaced on line C",
    summary: "One intake lane was paused to protect chilled orders while calibration completed.",
    outcome: "Product integrity held, but the outbound promise window stays under watch.",
    owner: "Eli Navarro",
    team: "Packout",
    status: "watching",
    signal: "27 at-risk orders",
    reviewWindow: "Escalate if delay exceeds 20 min",
  },
  {
    id: "callback-bundle",
    timestamp: "06:27 UTC",
    action: "Bundled aging callback cases into one customer recovery packet",
    summary: "Support and dispatch collapsed duplicate outreach lists into one visible ownership set.",
    outcome: "Customer exposure narrowed to the oldest unresolved parcel group.",
    owner: "Jordan Pike",
    team: "Customer recovery",
    status: "sealed",
    signal: "19 cases closed",
    reviewWindow: "Next review at 07:00 UTC",
  },
  {
    id: "micro-wave-split",
    timestamp: "06:54 UTC",
    action: "Split the warehouse sweep into two micro-waves to protect the premium lane",
    summary: "A fast premium pass shipped first, while standard replenishment was pushed into handoff.",
    outcome: "Premium departures stayed on time and only one replenishment risk moved to the next shift.",
    owner: "Ren Ito",
    team: "Floor control",
    status: "handoff",
    signal: "Premium on-time 96%",
    reviewWindow: "Carry into aisle reset briefing",
  },
];
export const responseLedgerOutcomeSummaries: OutcomeSummary[] = [
  {
    id: "pressure-release",
    label: "Pressure release",
    headline: "Queue pressure dropped before the dock surge became a site-wide delay.",
    detail: "The dock reroute and premium sweep kept the highest-risk work moving first.",
    owner: "Inbound control and floor control",
  },
  {
    id: "customer-containment",
    label: "Customer containment",
    headline: "Aging callbacks now sit inside one compact recovery queue.",
    detail: "The response reduced duplicate outreach and gave the morning desk one owner map.",
    owner: "Customer recovery",
  },
  {
    id: "handoff-readiness",
    label: "Shift handoff",
    headline: "Only one intervention still depends on the incoming shift to finish cleanly.",
    detail: "Standard replenishment remains in flight while the rest of the response loop is sealed.",
    owner: "Floor control",
  },
];
export const responseLedgerOwnershipRail: OwnershipRailItem[] = [
  {
    id: "mara-singh",
    name: "Mara Singh",
    role: "Inbound control lead",
    status: "balanced",
    focus: "Hold Dock 4 below escalation while trailer six lands.",
    queue: "4 actions under review",
    coverage: "Receiving, trailer assignment, dock balancing",
  },
  {
    id: "eli-navarro",
    name: "Eli Navarro",
    role: "Cold-chain coordinator",
    status: "on-watch",
    focus: "Monitor chilled packout latency until the scanner bank stays stable.",
    queue: "3 active monitors",
    coverage: "Cold-chain intake, packout sequencing, callback prep",
  },
  {
    id: "ren-ito",
    name: "Ren Ito",
    role: "Floor control supervisor",
    status: "on-watch",
    focus: "Carry replenishment risk into the aisle reset without touching premium flow.",
    queue: "1 handoff in flight",
    coverage: "Sweep timing, aisle resets, premium lane protection",
  },
];

export function getResponseLedgerView() {
  const closedActions = responseLedgerEntries.filter((entry) => entry.status === "sealed").length;
  const handoffs = responseLedgerEntries.filter((entry) => entry.status === "handoff").length;

  return {
    entries: responseLedgerEntries,
    outcomeSummaries: responseLedgerOutcomeSummaries,
    ownershipRail: responseLedgerOwnershipRail,
    summary: {
      eyebrow: "Response Ledger",
      title: "Track action history, short outcomes, and who owns the next move.",
      description:
        "A compact ledger for the current response cycle: what changed, what settled, and who carries the next checkpoint into the next review window.",
      stats: [
        { label: "Actions logged", value: responseLedgerEntries.length.toString() },
        { label: "Closed loops", value: closedActions.toString() },
        { label: "Active owners", value: responseLedgerOwnershipRail.length.toString() },
        { label: "Open handoffs", value: handoffs.toString() },
      ],
    },
  };
}
