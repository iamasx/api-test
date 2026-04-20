export type CoverageTone = "staffed" | "thin" | "missing" | "flex";
export type PlannerTone = "steady" | "watch" | "risk";
export type WarningSeverity = "watch" | "critical";
export type HandoffStatus = "confirmed" | "watch" | "pending";

export interface PlannerSummaryCard {
  id: string;
  label: string;
  value: string;
  detail: string;
  tone: PlannerTone;
}

export interface CoverageColumn {
  id: string;
  label: string;
  detail: string;
}

export interface CoverageCell {
  roleId: CoverageColumn["id"];
  assigned: number;
  required: number;
  assignees: string;
  tone: CoverageTone;
  detail: string;
}

export interface CoverageLane {
  id: string;
  label: string;
  lead: string;
  focus: string;
  queueDepth: string;
  note: string;
  cells: CoverageCell[];
}

export interface CoverageSegment {
  id: string;
  label: string;
  window: string;
  supervisor: string;
  summary: string;
  columns: CoverageColumn[];
  lanes: CoverageLane[];
}

export interface SegmentSummary {
  id: string;
  label: string;
  value: string;
  detail: string;
  tone: PlannerTone;
}

export interface CoverageSegmentView extends CoverageSegment {
  summaries: SegmentSummary[];
}

export interface OpenShiftWarning {
  id: string;
  title: string;
  severity: WarningSeverity;
  window: string;
  owner: string;
  summary: string;
  action: string;
  seatGap: number;
  affectedSegments: CoverageSegment["id"][];
}

export interface HandoffNote {
  id: string;
  title: string;
  window: string;
  owner: string;
  status: HandoffStatus;
  summary: string;
  blockers: string[];
  nextStep: string;
}

export interface ShiftPlannerView {
  summary: typeof shiftPlannerOverview;
  summaryCards: PlannerSummaryCard[];
  coverageSegments: CoverageSegmentView[];
  openShiftWarnings: OpenShiftWarning[];
  handoffNotes: HandoffNote[];
}

export const shiftPlannerOverview = {
  eyebrow: "Shift Planner",
  title: "Map coverage depth, open shifts, and handoff risks before the next staffing move lands.",
  description:
    "This standalone staffing route pulls coverage matrices, open-shift warnings, and handoff notes into one operator-facing surface so the staffing picture can ship without depending on the other routes.",
  commandPost: "Service Ops East",
  shiftLabel: "Monday split coverage · 06:00-18:00",
};

export const coverageColumns = [
  {
    id: "intake",
    label: "Intake",
    detail: "Front-door queue ownership",
  },
  {
    id: "triage",
    label: "Triage",
    detail: "Prioritization and queue control",
  },
  {
    id: "escalations",
    label: "Escalations",
    detail: "Complex cases and vendor holds",
  },
  {
    id: "dispatch",
    label: "Dispatch",
    detail: "Outbound coordination and callbacks",
  },
  {
    id: "flex",
    label: "Flex",
    detail: "Cross-cover and break relief",
  },
] satisfies CoverageColumn[];

export const coverageSegments = [
  {
    id: "opening-wave",
    label: "Opening wave",
    window: "06:00-10:00",
    supervisor: "Maya Trent / Shift lead",
    summary:
      "The opening push has enough frontline depth to absorb early queue spikes, but one escalation seat and one flex seat remain uncovered before staggered starts finish landing.",
    columns: coverageColumns,
    lanes: [
      {
        id: "north-pod-open",
        label: "North pod",
        lead: "Jae Solis",
        focus: "Priority callbacks and first-wave intake",
        queueDepth: "12 active conversations",
        note: "North pod is carrying the reserve buffer while central finishes its late-start coverage.",
        cells: [
          {
            roleId: "intake",
            assigned: 3,
            required: 3,
            assignees: "Jae, Mina, Cole",
            tone: "staffed",
            detail: "All three intake seats are active for the opening burst.",
          },
          {
            roleId: "triage",
            assigned: 2,
            required: 2,
            assignees: "Lina, Omar",
            tone: "staffed",
            detail: "Triage can absorb reroutes until central lunch coverage begins.",
          },
          {
            roleId: "escalations",
            assigned: 1,
            required: 1,
            assignees: "Priya",
            tone: "staffed",
            detail: "The named escalation specialist is live for vendor-critical work.",
          },
          {
            roleId: "dispatch",
            assigned: 1,
            required: 1,
            assignees: "Theo",
            tone: "staffed",
            detail: "Dispatch is fully covered for first-wave outbound callbacks.",
          },
          {
            roleId: "flex",
            assigned: 1,
            required: 1,
            assignees: "Marlon",
            tone: "flex",
            detail: "Flex coverage is live and can slide into central triage on demand.",
          },
        ],
      },
      {
        id: "central-pod-open",
        label: "Central pod",
        lead: "Nina Desai",
        focus: "Queue shaping and live escalations",
        queueDepth: "18 waiting, 4 high priority",
        note: "Central pod is the most exposed until the late-start triage specialist signs in.",
        cells: [
          {
            roleId: "intake",
            assigned: 3,
            required: 3,
            assignees: "Nina, Asha, Victor",
            tone: "staffed",
            detail: "All intake positions are staffed for the busiest launch window.",
          },
          {
            roleId: "triage",
            assigned: 1,
            required: 2,
            assignees: "Parker",
            tone: "thin",
            detail: "One triage seat is carrying both queue review and overflow routing.",
          },
          {
            roleId: "escalations",
            assigned: 1,
            required: 1,
            assignees: "Bea",
            tone: "staffed",
            detail: "Escalations are covered, but the buffer is narrow if a vendor case spikes.",
          },
          {
            roleId: "dispatch",
            assigned: 1,
            required: 1,
            assignees: "Kian",
            tone: "staffed",
            detail: "Dispatch coverage is steady for callback routing and field transfers.",
          },
          {
            roleId: "flex",
            assigned: 0,
            required: 1,
            assignees: "Open seat",
            tone: "missing",
            detail: "The break-relief seat is still open until the reserve floater is assigned.",
          },
        ],
      },
      {
        id: "south-pod-open",
        label: "South pod",
        lead: "Elena Park",
        focus: "Partner queue and multilingual overflow",
        queueDepth: "9 live tickets",
        note: "South pod keeps language coverage stable, but the escalation seat is still open.",
        cells: [
          {
            roleId: "intake",
            assigned: 2,
            required: 2,
            assignees: "Elena, Hugo",
            tone: "staffed",
            detail: "The partner intake queue is stable and fully staffed.",
          },
          {
            roleId: "triage",
            assigned: 2,
            required: 2,
            assignees: "Isa, Rowan",
            tone: "staffed",
            detail: "Triage is balanced and can absorb overflow from north pod.",
          },
          {
            roleId: "escalations",
            assigned: 0,
            required: 1,
            assignees: "Open seat",
            tone: "missing",
            detail: "No named escalation analyst is online until the late-start specialist signs in.",
          },
          {
            roleId: "dispatch",
            assigned: 1,
            required: 1,
            assignees: "Moe",
            tone: "staffed",
            detail: "Dispatch is stable for partner handoffs and outbound follow-up.",
          },
          {
            roleId: "flex",
            assigned: 1,
            required: 1,
            assignees: "Sia",
            tone: "flex",
            detail: "Flex coverage is active for bilingual overflow and break coverage.",
          },
        ],
      },
    ],
  },
  {
    id: "midshift-bridge",
    label: "Midshift bridge",
    window: "10:00-14:00",
    supervisor: "Jordan Pike / Staffing manager",
    summary:
      "Lunch overlap compresses intake, dispatch, and relief coverage at the same time, so the bridge hours need explicit move-by-move staffing decisions instead of passive monitoring.",
    columns: coverageColumns,
    lanes: [
      {
        id: "north-pod-bridge",
        label: "North pod",
        lead: "Jae Solis",
        focus: "Renewal callbacks and wait-time control",
        queueDepth: "17 waiting, 3 outbound holds",
        note: "North pod can carry callback volume, but intake and flex both thin out during lunch.",
        cells: [
          {
            roleId: "intake",
            assigned: 2,
            required: 3,
            assignees: "Jae, Mina",
            tone: "thin",
            detail: "One intake seat is on lunch, leaving callback work exposed to queue spikes.",
          },
          {
            roleId: "triage",
            assigned: 2,
            required: 2,
            assignees: "Lina, Omar",
            tone: "staffed",
            detail: "Triage stays fully staffed through the bridge window.",
          },
          {
            roleId: "escalations",
            assigned: 1,
            required: 1,
            assignees: "Priya",
            tone: "staffed",
            detail: "The escalation desk is stable for complex callbacks.",
          },
          {
            roleId: "dispatch",
            assigned: 1,
            required: 1,
            assignees: "Theo",
            tone: "staffed",
            detail: "Dispatch remains available for outbound scheduling.",
          },
          {
            roleId: "flex",
            assigned: 0,
            required: 1,
            assignees: "Open seat",
            tone: "missing",
            detail: "No float coverage is named while north intake runs a reduced crew.",
          },
        ],
      },
      {
        id: "central-pod-bridge",
        label: "Central pod",
        lead: "Nina Desai",
        focus: "Vendor escalations and overflow control",
        queueDepth: "22 waiting, 6 urgent",
        note: "Central pod has the deepest queue and loses dispatch coverage for most of the bridge window.",
        cells: [
          {
            roleId: "intake",
            assigned: 3,
            required: 3,
            assignees: "Nina, Asha, Victor",
            tone: "staffed",
            detail: "Intake is fully staffed, keeping the central queue from hard-blocking.",
          },
          {
            roleId: "triage",
            assigned: 2,
            required: 2,
            assignees: "Parker, Bea",
            tone: "staffed",
            detail: "Triage has full coverage and can absorb overflow from south.",
          },
          {
            roleId: "escalations",
            assigned: 1,
            required: 1,
            assignees: "Nadia",
            tone: "staffed",
            detail: "Escalations stay covered, but only with one analyst live.",
          },
          {
            roleId: "dispatch",
            assigned: 0,
            required: 1,
            assignees: "Open seat",
            tone: "missing",
            detail: "Dispatch is uncovered while the usual owner is in training.",
          },
          {
            roleId: "flex",
            assigned: 1,
            required: 1,
            assignees: "Kian",
            tone: "flex",
            detail: "The reserve floater is live and can cover dispatch only if triage holds steady.",
          },
        ],
      },
      {
        id: "south-pod-bridge",
        label: "South pod",
        lead: "Elena Park",
        focus: "Partner queue and translation support",
        queueDepth: "14 live tickets, 2 reopeners",
        note: "South pod keeps specialist work moving, but its triage and relief seats both thin out.",
        cells: [
          {
            roleId: "intake",
            assigned: 2,
            required: 2,
            assignees: "Elena, Hugo",
            tone: "staffed",
            detail: "Partner intake stays fully staffed through the lunch bridge.",
          },
          {
            roleId: "triage",
            assigned: 1,
            required: 2,
            assignees: "Isa",
            tone: "thin",
            detail: "One person is covering both queue review and translation overflow.",
          },
          {
            roleId: "escalations",
            assigned: 1,
            required: 1,
            assignees: "Rowan",
            tone: "staffed",
            detail: "Escalations are covered for partner holds and approvals.",
          },
          {
            roleId: "dispatch",
            assigned: 1,
            required: 1,
            assignees: "Moe",
            tone: "staffed",
            detail: "Dispatch coverage remains available for partner callbacks.",
          },
          {
            roleId: "flex",
            assigned: 0,
            required: 1,
            assignees: "Open seat",
            tone: "missing",
            detail: "The relief seat is unassigned across the lunch bridge.",
          },
        ],
      },
    ],
  },
  {
    id: "closeout-handoff",
    label: "Closeout handoff",
    window: "14:00-18:00",
    supervisor: "Loren Vega / Floor supervisor",
    summary:
      "Late-day coverage recovers overall, but the partner desk still closes with one missing flex seat, which makes the final handoff notes more important than the raw headcount suggests.",
    columns: coverageColumns,
    lanes: [
      {
        id: "harbor-desk-close",
        label: "Harbor desk",
        lead: "Mina Ho",
        focus: "Same-day callbacks and wrap-up notes",
        queueDepth: "7 active, 5 scheduled callbacks",
        note: "Harbor desk is fully staffed and can lend relief coverage to partner work if needed.",
        cells: [
          {
            roleId: "intake",
            assigned: 2,
            required: 2,
            assignees: "Mina, Cole",
            tone: "staffed",
            detail: "Intake is fully covered for the closeout window.",
          },
          {
            roleId: "triage",
            assigned: 2,
            required: 2,
            assignees: "Lina, Omar",
            tone: "staffed",
            detail: "Triage remains fully staffed for same-day triage and wrap decisions.",
          },
          {
            roleId: "escalations",
            assigned: 1,
            required: 1,
            assignees: "Priya",
            tone: "staffed",
            detail: "Escalations stay stable through the end-of-day queue sweep.",
          },
          {
            roleId: "dispatch",
            assigned: 1,
            required: 1,
            assignees: "Theo",
            tone: "staffed",
            detail: "Dispatch is fully covered for final outbound callbacks.",
          },
          {
            roleId: "flex",
            assigned: 1,
            required: 1,
            assignees: "Marlon",
            tone: "flex",
            detail: "Flex coverage is active and can absorb last-minute closeout tasks.",
          },
        ],
      },
      {
        id: "partner-desk-close",
        label: "Partner desk",
        lead: "Elena Park",
        focus: "Partner backlog and language support",
        queueDepth: "11 open partner tickets",
        note: "Partner desk keeps its specialist lane staffed, but one intake seat and the flex seat remain exposed.",
        cells: [
          {
            roleId: "intake",
            assigned: 1,
            required: 2,
            assignees: "Elena",
            tone: "thin",
            detail: "One intake seat is carrying both backlog cleanup and new partner work.",
          },
          {
            roleId: "triage",
            assigned: 1,
            required: 1,
            assignees: "Isa",
            tone: "staffed",
            detail: "Triage coverage is stable for closeout prioritization.",
          },
          {
            roleId: "escalations",
            assigned: 1,
            required: 1,
            assignees: "Rowan",
            tone: "staffed",
            detail: "The specialist lane is staffed for late vendor decisions.",
          },
          {
            roleId: "dispatch",
            assigned: 1,
            required: 1,
            assignees: "Moe",
            tone: "staffed",
            detail: "Dispatch is staffed for final partner callbacks.",
          },
          {
            roleId: "flex",
            assigned: 0,
            required: 1,
            assignees: "Open seat",
            tone: "missing",
            detail: "No backup operator is named for partner work if wrap time slips.",
          },
        ],
      },
      {
        id: "after-hours-queue-close",
        label: "After-hours queue",
        lead: "Noah Reese",
        focus: "Deferred cases and overnight prep",
        queueDepth: "6 handoff items",
        note: "After-hours prep is stable and can take one extra callback block if partner work spills.",
        cells: [
          {
            roleId: "intake",
            assigned: 2,
            required: 2,
            assignees: "Noah, Tali",
            tone: "staffed",
            detail: "Deferred intake is fully staffed for the handoff block.",
          },
          {
            roleId: "triage",
            assigned: 1,
            required: 1,
            assignees: "Ari",
            tone: "staffed",
            detail: "Triage coverage is stable for overnight prep notes.",
          },
          {
            roleId: "escalations",
            assigned: 1,
            required: 1,
            assignees: "Drew",
            tone: "staffed",
            detail: "Escalations are staffed for the last delayed cases.",
          },
          {
            roleId: "dispatch",
            assigned: 1,
            required: 1,
            assignees: "Soren",
            tone: "staffed",
            detail: "Dispatch remains covered for overnight callback scheduling.",
          },
          {
            roleId: "flex",
            assigned: 1,
            required: 1,
            assignees: "Mika",
            tone: "flex",
            detail: "Flex coverage is live for final wrap tasks and spillover work.",
          },
        ],
      },
    ],
  },
] satisfies CoverageSegment[];

export const openShiftWarnings = [
  {
    id: "warning-south-escalations",
    title: "South pod escalation seat is still unassigned for the opening wave",
    severity: "critical",
    window: "06:30-09:30",
    owner: "Leo Brooks / Escalations manager",
    summary:
      "The south pod opens without a named escalation specialist, so high-touch partner cases must be rerouted until the late-start analyst signs in.",
    action:
      "Route vendor-critical work to north pod and hold new partner escalations for the 09:30 staffing check-in.",
    seatGap: 1,
    affectedSegments: ["opening-wave"],
  },
  {
    id: "warning-central-triage",
    title: "Central pod triage is thin until the staggered lunch bridge settles",
    severity: "watch",
    window: "08:45-11:15",
    owner: "Maya Trent / Shift lead",
    summary:
      "One triage operator is covering both queue review and overflow routing while central holds the deepest live backlog on the floor.",
    action:
      "Move the north flex operator into central triage if waiting conversations stay above 18 for more than two check-ins.",
    seatGap: 1,
    affectedSegments: ["opening-wave", "midshift-bridge"],
  },
  {
    id: "warning-central-dispatch",
    title: "Central dispatch goes dark across the midday bridge",
    severity: "critical",
    window: "11:00-13:30",
    owner: "Jordan Pike / Staffing manager",
    summary:
      "The central pod loses dispatch coverage while the usual owner is in training, creating a hard dependency on flex coverage staying available.",
    action:
      "Pin Kian to dispatch unless the urgent queue breaches six, and push noncritical callbacks into the closeout block.",
    seatGap: 1,
    affectedSegments: ["midshift-bridge"],
  },
  {
    id: "warning-partner-closeout",
    title: "Partner desk closes without a backup flex operator",
    severity: "watch",
    window: "15:30-18:00",
    owner: "Loren Vega / Floor supervisor",
    summary:
      "The closeout window has enough specialist depth, but no extra flex seat is available if partner wrap-up work runs long.",
    action:
      "Borrow harbor flex coverage for the final 30 minutes if partner backlog stays above ten open tickets.",
    seatGap: 1,
    affectedSegments: ["closeout-handoff"],
  },
] satisfies OpenShiftWarning[];

export const handoffNotes = [
  {
    id: "handoff-1",
    title: "Opening supervisor handoff",
    window: "05:50-06:10",
    owner: "Maya Trent",
    status: "confirmed",
    summary:
      "The opening supervisor handoff already captured queue goals, reserve rules, and which backlog tags can wait until the lunch bridge.",
    blockers: [
      "No active blockers for the opening briefing.",
      "North pod owns reserve coverage until central flex is assigned.",
    ],
    nextStep: "Carry the reserve rule into the 08:45 staffing review without changing queue ownership.",
  },
  {
    id: "handoff-2",
    title: "Lunch bridge staffing handoff",
    window: "09:45-10:15",
    owner: "Jordan Pike",
    status: "watch",
    summary:
      "The lunch bridge needs an explicit note about who covers central dispatch and when north flex is allowed to move off reserve duty.",
    blockers: [
      "Central dispatch has no primary owner during the bridge window.",
      "North intake loses one seat at the same time flex coverage is exposed.",
    ],
    nextStep: "Publish the move order before 09:45 so pods do not make conflicting relief decisions.",
  },
  {
    id: "handoff-3",
    title: "Vendor escalation carry-forward",
    window: "13:40-14:05",
    owner: "Leo Brooks",
    status: "pending",
    summary:
      "The vendor queue needs a clean handoff note because one partner approval is still waiting on the south escalation seat that opened late.",
    blockers: [
      "One vendor approval remains unresolved after the opening-wave coverage gap.",
      "Partner desk closeout already starts with a thin intake seat.",
    ],
    nextStep: "Attach the unresolved approval number and the named callback owner before the closeout supervisor signs off.",
  },
  {
    id: "handoff-4",
    title: "Closeout to after-hours handoff",
    window: "17:30-18:00",
    owner: "Loren Vega",
    status: "confirmed",
    summary:
      "After-hours prep is stable, and the remaining work is mostly about preserving callback ownership and the final partner backlog count.",
    blockers: [
      "No blocking staffing gaps outside the partner flex seat.",
      "Harbor desk can still lend one operator if closeout slips.",
    ],
    nextStep: "Record the final partner backlog count and the callback owner list in the after-hours log.",
  },
] satisfies HandoffNote[];

export function getCoverageGap(cell: CoverageCell) {
  return Math.max(cell.required - cell.assigned, 0);
}

function getSegmentPlannedSeats(segment: CoverageSegment) {
  return segment.lanes.reduce(
    (segmentTotal, lane) =>
      segmentTotal +
      lane.cells.reduce((laneTotal, cell) => laneTotal + cell.required, 0),
    0,
  );
}

function getSegmentStaffedSeats(segment: CoverageSegment) {
  return segment.lanes.reduce(
    (segmentTotal, lane) =>
      segmentTotal +
      lane.cells.reduce((laneTotal, cell) => laneTotal + cell.assigned, 0),
    0,
  );
}

function getSegmentGapCount(segment: CoverageSegment) {
  return segment.lanes.reduce(
    (segmentTotal, lane) =>
      segmentTotal +
      lane.cells.reduce((laneTotal, cell) => laneTotal + getCoverageGap(cell), 0),
    0,
  );
}

function getSegmentFlexCount(segment: CoverageSegment) {
  return segment.lanes.reduce(
    (segmentTotal, lane) =>
      segmentTotal +
      lane.cells.filter((cell) => cell.tone === "flex" && cell.assigned > 0).length,
    0,
  );
}

function getSegmentWatchLaneCount(segment: CoverageSegment) {
  return segment.lanes.filter((lane) =>
    lane.cells.some((cell) => cell.tone === "thin" || cell.tone === "missing"),
  ).length;
}

function getSegmentSummaries(segment: CoverageSegment): SegmentSummary[] {
  const staffedSeats = getSegmentStaffedSeats(segment);
  const plannedSeats = getSegmentPlannedSeats(segment);
  const gapCount = getSegmentGapCount(segment);
  const flexCount = getSegmentFlexCount(segment);
  const watchLanes = getSegmentWatchLaneCount(segment);

  return [
    {
      id: `${segment.id}-staffed`,
      label: "Staffed seats",
      value: `${staffedSeats}/${plannedSeats}`,
      detail: "Assigned seats against the planned coverage target for this segment.",
      tone: gapCount > 2 ? "watch" : "steady",
    },
    {
      id: `${segment.id}-gaps`,
      label: "Open gaps",
      value: String(gapCount),
      detail: "Seats that are thin or fully unassigned inside this segment.",
      tone: gapCount > 2 ? "risk" : gapCount > 0 ? "watch" : "steady",
    },
    {
      id: `${segment.id}-flex`,
      label: "Flex seats live",
      value: String(flexCount),
      detail: `${watchLanes} lanes still need watch coverage during this window.`,
      tone: flexCount === 0 ? "risk" : watchLanes > 1 ? "watch" : "steady",
    },
  ];
}

export function getShiftPlannerView(): ShiftPlannerView {
  const plannedSeats = coverageSegments.reduce(
    (total, segment) => total + getSegmentPlannedSeats(segment),
    0,
  );
  const staffedSeats = coverageSegments.reduce(
    (total, segment) => total + getSegmentStaffedSeats(segment),
    0,
  );
  const openSeatGaps = coverageSegments.reduce(
    (total, segment) => total + getSegmentGapCount(segment),
    0,
  );
  const flexSeats = coverageSegments.reduce(
    (total, segment) => total + getSegmentFlexCount(segment),
    0,
  );
  const criticalWarnings = openShiftWarnings.filter(
    (warning) => warning.severity === "critical",
  ).length;
  const handoffsOnWatch = handoffNotes.filter(
    (note) => note.status === "watch" || note.status === "pending",
  ).length;

  return {
    summary: shiftPlannerOverview,
    summaryCards: [
      {
        id: "coverage-segments",
        label: "Coverage segments",
        value: String(coverageSegments.length),
        detail: "Opening, midday bridge, and closeout coverage windows share one staffing surface.",
        tone: "steady",
      },
      {
        id: "planned-seats",
        label: "Planned seats",
        value: `${staffedSeats}/${plannedSeats}`,
        detail: "Assigned seats across intake, triage, escalations, dispatch, and flex coverage.",
        tone: openSeatGaps > 6 ? "watch" : "steady",
      },
      {
        id: "open-seat-gaps",
        label: "Open seat gaps",
        value: String(openSeatGaps),
        detail: `${criticalWarnings} critical warnings are attached to missing seats and timing overlap.`,
        tone: openSeatGaps > 6 ? "risk" : openSeatGaps > 0 ? "watch" : "steady",
      },
      {
        id: "handoffs-on-watch",
        label: "Handoffs on watch",
        value: String(handoffsOnWatch),
        detail: `${flexSeats} flex seats are active, but note quality still matters for the lunch bridge and closeout carry-forward.`,
        tone: handoffsOnWatch > 1 ? "watch" : "steady",
      },
    ],
    coverageSegments: coverageSegments.map((segment) => ({
      ...segment,
      summaries: getSegmentSummaries(segment),
    })),
    openShiftWarnings,
    handoffNotes,
  };
}
