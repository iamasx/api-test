export type HandoffEntryTone = "steady" | "watch" | "urgent";
export type ActionBulletTone = "now" | "next" | "watch";
export type CarryForwardTone = "open" | "scheduled" | "monitor";

export type ActionBullet = {
  id: string;
  label: string;
  owner: string;
  timing: string;
  tone: ActionBulletTone;
};

export type HandoffEntry = {
  id: string;
  shiftLabel: string;
  window: string;
  operator: string;
  channel: string;
  title: string;
  summary: string;
  highlights: string[];
  tone: HandoffEntryTone;
  actions: ActionBullet[];
};

export type CarryForwardNote = {
  id: string;
  lane: string;
  note: string;
  owner: string;
  nextCheck: string;
  tone: CarryForwardTone;
};

export type JournalStat = {
  id: string;
  label: string;
  value: string;
  detail: string;
};

export const handoffJournalOverview = {
  eyebrow: "Shift continuity journal",
  title: "Capture the handoff before the next shift has to guess what matters.",
  description:
    "The handoff journal keeps shift-by-shift summaries, action bullets, and carry-forward notes in one route so operators can pass context without reopening active issue boards.",
  activeWindow: "Fri 24 Apr · 17:30 handoff",
  nextSync: "Next continuity sync at 18:00",
  actions: [
    { label: "Review handoff entries", href: "#handoff-entries" },
    { label: "Jump to carry-forward", href: "#carry-forward" },
  ],
} as const;

export const handoffEntries: HandoffEntry[] = [
  {
    id: "dawn-shift",
    shiftLabel: "Dawn shift",
    window: "05:30 - 09:00",
    operator: "Mina Alvarez",
    channel: "Ops relay + dock board",
    title: "Inbound staging reopened after the backup generator swap.",
    summary:
      "The overnight weather hold cleared at 06:12 and staging lanes were reopened in sequence, which let the team drain the cold queue before the morning dispatch wave.",
    highlights: [
      "Cleared 14 queued containers before 07:40.",
      "Moved one rover team from sweep support to dock 3 staging.",
      "Kept scan accuracy above the 98% target during the restart window.",
    ],
    tone: "steady",
    actions: [
      {
        id: "dock-3-fuel",
        label: "Confirm the dock 3 rover fuel top-off before the 09:20 departures.",
        owner: "Rover lead",
        timing: "Before 09:10",
        tone: "now",
      },
      {
        id: "label-audit",
        label: "Audit relabeled cold-chain pallets against the revised lane tags.",
        owner: "Dock coordinator",
        timing: "First half of day shift",
        tone: "watch",
      },
      {
        id: "hold-log",
        label: "Append the generator restart times to the continuity log for finance recovery.",
        owner: "Shift supervisor",
        timing: "Before handoff close",
        tone: "next",
      },
    ],
  },
  {
    id: "day-shift",
    shiftLabel: "Day shift",
    window: "09:00 - 13:30",
    operator: "Jordan Pike",
    channel: "Control lane briefing",
    title: "Dispatch cadence recovered, but parcel imaging still needs active watching.",
    summary:
      "Outbound departures returned to the planned tempo by 11:05, although the parcel imaging patch introduced intermittent thumbnail lag on two sorting lanes.",
    highlights: [
      "Recovered the noon route set without dropping any export windows.",
      "Redirected image retries away from lanes 7 and 8 to keep throughput stable.",
      "Validated that downstream manifests stayed in sync during the patch rollout.",
    ],
    tone: "watch",
    actions: [
      {
        id: "lane-imaging",
        label: "Recheck thumbnail latency on lanes 7 and 8 after the next scanner reboot.",
        owner: "Imaging support",
        timing: "13:45 checkpoint",
        tone: "watch",
      },
      {
        id: "manifest-retry",
        label: "Leave the manifest retry ceiling at six attempts until the patch is rolled back or cleared.",
        owner: "Control operator",
        timing: "Carry through swing shift",
        tone: "now",
      },
      {
        id: "escalation-note",
        label: "Escalate to platform support if lag exceeds 45 seconds on three consecutive scans.",
        owner: "Shift lead",
        timing: "If triggered",
        tone: "next",
      },
    ],
  },
  {
    id: "swing-shift",
    shiftLabel: "Swing shift",
    window: "13:30 - 17:30",
    operator: "Rae Okafor",
    channel: "Floor sync + support desk",
    title: "The floor is stable for close, with two notes explicitly carried into the evening crew.",
    summary:
      "No new blockers opened during the afternoon run, and the crew is handing over a short, explicit list of follow-ups instead of a broad watchlist.",
    highlights: [
      "Held the exception queue below the five-item alert threshold.",
      "Closed the late manifest mismatch without delaying the 16:50 convoy.",
      "Prepared the evening crew with lane-by-lane staffing notes for the export surge.",
    ],
    tone: "urgent",
    actions: [
      {
        id: "staffing-brief",
        label: "Walk the evening lead through the lane staffing swaps before the 18:00 surge.",
        owner: "Outgoing supervisor",
        timing: "At handoff",
        tone: "now",
      },
      {
        id: "printer-ribbon",
        label: "Replace the dock 5 thermal ribbon before the export label batch begins.",
        owner: "Warehouse tech",
        timing: "17:45",
        tone: "now",
      },
      {
        id: "truck-seal",
        label: "Verify truck 14 seal photos land in the archive after the delayed upload finishes.",
        owner: "Security desk",
        timing: "18:10 follow-up",
        tone: "watch",
      },
    ],
  },
];

export const carryForwardNotes: CarryForwardNote[] = [
  {
    id: "dock-5-labeling",
    lane: "Dock 5 labeling",
    note: "The ribbon is fading on the thermal printer. Swap it before the evening export batch so the crew does not have to reprint labels mid-wave.",
    owner: "Warehouse tech",
    nextCheck: "17:45",
    tone: "open",
  },
  {
    id: "parcel-imaging",
    lane: "Parcel imaging",
    note: "Scanner thumbnails are occasionally late after the patch. Keep the retry ceiling in place and monitor for three slow scans in a row.",
    owner: "Imaging support",
    nextCheck: "18:15",
    tone: "monitor",
  },
  {
    id: "seal-archive",
    lane: "Security archive",
    note: "Truck 14 seal photos are queued for upload. Confirm they land in the archive before the end-of-day seal report is published.",
    owner: "Security desk",
    nextCheck: "18:10",
    tone: "scheduled",
  },
];

const actionCount = handoffEntries.reduce(
  (count, entry) => count + entry.actions.length,
  0,
);
const watchCount = handoffEntries.filter((entry) => entry.tone !== "steady").length;

export const handoffJournalStats: JournalStat[] = [
  {
    id: "entries",
    label: "Shift entries",
    value: String(handoffEntries.length),
    detail: "Morning, day, and swing notes stay visible in one uninterrupted read.",
  },
  {
    id: "actions",
    label: "Action bullets",
    value: String(actionCount),
    detail: "Each handoff closes with explicit owner and timing language.",
  },
  {
    id: "carry-forward",
    label: "Carry-forward notes",
    value: String(carryForwardNotes.length),
    detail: "Only the unresolved notes survive the handoff into the next crew.",
  },
  {
    id: "watch",
    label: "Watch shifts",
    value: String(watchCount),
    detail: "Two entries still need active monitoring before the route can fully settle.",
  },
];
