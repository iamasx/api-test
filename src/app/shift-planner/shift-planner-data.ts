export const plannerShifts = [
  { id: "dawn", label: "Dawn", window: "05:30-13:30" },
  { id: "swing", label: "Swing", window: "13:30-21:30" },
  { id: "night", label: "Night", window: "21:30-05:30" },
] as const;

export type PlannerShift = (typeof plannerShifts)[number];
export type PlannerShiftId = (typeof plannerShifts)[number]["id"];

export const plannerRoles = [
  { id: "triage", label: "Triage Lead", squad: "Intake Desk" },
  { id: "dispatch", label: "Dispatch", squad: "Routing Board" },
  { id: "floor", label: "Floor Support", squad: "Floor Coverage" },
  { id: "qa", label: "QA Escalation", squad: "Escalation Loop" },
] as const;

export type PlannerRole = (typeof plannerRoles)[number];
export type PlannerRoleId = (typeof plannerRoles)[number]["id"];
export type CoverageTone = "ready" | "watch" | "gap";
export type HandoffStatus = "ready" | "pending";

export type PlannerTeamMember = {
  id: string;
  name: string;
  roleId: PlannerRoleId;
  focus: string;
};

export type PlannerCoverageBlock = {
  shiftId: PlannerShiftId;
  target: number;
  assigneeIds: string[];
  tone: CoverageTone;
  note: string;
};

export type PlannerCoverageRow = {
  roleId: PlannerRoleId;
  note: string;
  assignments: PlannerCoverageBlock[];
};

export type HandoffNote = {
  id: string;
  title: string;
  shiftId: PlannerShiftId;
  ownerId: string;
  status: HandoffStatus;
  body: string;
};

export type PlannerDay = {
  id: string;
  label: string;
  dateLabel: string;
  focus: string;
  staffing: { scheduled: number; target: number; onCall: number };
  coverage: PlannerCoverageRow[];
  handoffNotes: HandoffNote[];
};

export const plannerTeamMembers: PlannerTeamMember[] = [
  { id: "maya", name: "Maya Chen", roleId: "triage", focus: "priority queues" },
  { id: "noor", name: "Noor Patel", roleId: "triage", focus: "refund review" },
  { id: "ellis", name: "Ellis Grant", roleId: "dispatch", focus: "lane balancing" },
  { id: "jo", name: "Jo Alvarez", roleId: "dispatch", focus: "overflow reroutes" },
  { id: "rhea", name: "Rhea Singh", roleId: "floor", focus: "counter coverage" },
  { id: "omar", name: "Omar Reed", roleId: "floor", focus: "dock support" },
  { id: "ivy", name: "Ivy Park", roleId: "qa", focus: "handoff validation" },
  { id: "tess", name: "Tess Moore", roleId: "qa", focus: "escalation audit" },
  { id: "luca", name: "Luca Diaz", roleId: "triage", focus: "backlog sweep" },
  { id: "sana", name: "Sana Brooks", roleId: "floor", focus: "late swing flex" },
];

export const shiftPlannerDays: PlannerDay[] = [
  {
    id: "sat-19", label: "Sat 19", dateLabel: "Saturday, Apr 19", focus: "Weekend queue cleanup",
    staffing: { scheduled: 14, target: 16, onCall: 3 },
    coverage: [
      { roleId: "triage", note: "Frontline queue ownership and refund triage.", assignments: [
        { shiftId: "dawn", target: 2, assigneeIds: ["maya", "luca"], tone: "ready", note: "Refund backlog clears before noon dispatch handoff." },
        { shiftId: "swing", target: 2, assigneeIds: ["noor"], tone: "gap", note: "One open seat remains for retail surge coverage." },
        { shiftId: "night", target: 1, assigneeIds: ["maya"], tone: "ready", note: "Single lead covers the overnight drip queue." },
      ] },
      { roleId: "dispatch", note: "Lane balancing and courier reroute control.", assignments: [
        { shiftId: "dawn", target: 1, assigneeIds: ["ellis"], tone: "ready", note: "Outbound cutover is fully staffed." },
        { shiftId: "swing", target: 2, assigneeIds: ["ellis", "jo"], tone: "ready", note: "Peak pickup window has both routing leads online." },
        { shiftId: "night", target: 1, assigneeIds: [], tone: "gap", note: "Night dispatch is still waiting on callback confirmation." },
      ] },
      { roleId: "floor", note: "Counter support, dock float, and break relief.", assignments: [
        { shiftId: "dawn", target: 2, assigneeIds: ["rhea"], tone: "watch", note: "Coverage holds if dock load stays under forecast." },
        { shiftId: "swing", target: 2, assigneeIds: ["rhea", "sana"], tone: "ready", note: "Flex pair can absorb callouts after 16:00." },
        { shiftId: "night", target: 1, assigneeIds: ["omar"], tone: "ready", note: "Dock handoff lands with one steady closer." },
      ] },
      { roleId: "qa", note: "Escalation review and closing readiness checks.", assignments: [
        { shiftId: "dawn", target: 1, assigneeIds: ["ivy"], tone: "ready", note: "Morning audits are covered without overflow risk." },
        { shiftId: "swing", target: 1, assigneeIds: ["tess"], tone: "ready", note: "Escalation sign-off remains on cadence." },
        { shiftId: "night", target: 1, assigneeIds: [], tone: "watch", note: "Dispatch gap may pull QA into floating review mode." },
      ] },
    ],
    handoffNotes: [
      { id: "sat-19-dawn", title: "Dawn backlog watch", shiftId: "dawn", ownerId: "maya", status: "ready", body: "Refund queue should stay below 12 tickets if dock scans land before 08:30." },
      { id: "sat-19-swing", title: "Swing relief", shiftId: "swing", ownerId: "rhea", status: "pending", body: "Keep Sana floating near the retail counter until the second dispatch lead is settled." },
      { id: "sat-19-night", title: "Night callback", shiftId: "night", ownerId: "ivy", status: "pending", body: "Confirm who owns dispatch fallback before 20:00 or reduce after-hours intake." },
    ],
  },
  {
    id: "sun-20", label: "Sun 20", dateLabel: "Sunday, Apr 20", focus: "Short weekend crew",
    staffing: { scheduled: 12, target: 15, onCall: 4 },
    coverage: [
      { roleId: "triage", note: "Light demand, but returns spike after noon.", assignments: [
        { shiftId: "dawn", target: 2, assigneeIds: ["maya"], tone: "watch", note: "Single opener is fine until return drop-offs begin." },
        { shiftId: "swing", target: 2, assigneeIds: ["noor", "luca"], tone: "ready", note: "Backlog sweep is paired for the afternoon." },
        { shiftId: "night", target: 1, assigneeIds: [], tone: "gap", note: "Overnight triage is intentionally unfilled pending demand check." },
      ] },
      { roleId: "dispatch", note: "Reroutes and weekend exception holds.", assignments: [
        { shiftId: "dawn", target: 1, assigneeIds: ["jo"], tone: "ready", note: "Courier exception queue is stable." },
        { shiftId: "swing", target: 1, assigneeIds: ["ellis"], tone: "ready", note: "Single controller is enough for planned volume." },
        { shiftId: "night", target: 1, assigneeIds: ["jo"], tone: "ready", note: "Late reroutes fold into the same desk." },
      ] },
      { roleId: "floor", note: "Weekend counter and dock split.", assignments: [
        { shiftId: "dawn", target: 2, assigneeIds: ["rhea"], tone: "watch", note: "Break coverage depends on on-call support arriving." },
        { shiftId: "swing", target: 2, assigneeIds: ["sana"], tone: "gap", note: "Counter queue is short one relief partner." },
        { shiftId: "night", target: 1, assigneeIds: ["omar"], tone: "ready", note: "Dock close remains fully owned." },
      ] },
      { roleId: "qa", note: "Limited review queue with tight handoff windows.", assignments: [
        { shiftId: "dawn", target: 1, assigneeIds: ["ivy"], tone: "ready", note: "Morning review desk stays stable." },
        { shiftId: "swing", target: 1, assigneeIds: [], tone: "gap", note: "Escalation sign-off needs a borrowed reviewer." },
        { shiftId: "night", target: 1, assigneeIds: ["tess"], tone: "ready", note: "Night close-out can absorb a small spillover." },
      ] },
    ],
    handoffNotes: [
      { id: "sun-20-dawn", title: "Returns spike prep", shiftId: "dawn", ownerId: "noor", status: "ready", body: "If return volume jumps after lunch, move Luca back to the front of queue triage." },
      { id: "sun-20-swing", title: "Review coverage", shiftId: "swing", ownerId: "tess", status: "pending", body: "QA still needs a swing partner; dispatch should avoid handing off unresolved audit flags." },
    ],
  },
  {
    id: "mon-21", label: "Mon 21", dateLabel: "Monday, Apr 21", focus: "Launch day staffing ramp",
    staffing: { scheduled: 17, target: 17, onCall: 2 },
    coverage: [
      { roleId: "triage", note: "Morning launch queue and same-day corrections.", assignments: [
        { shiftId: "dawn", target: 2, assigneeIds: ["maya", "noor"], tone: "ready", note: "Launch-day intake opens with full coverage." },
        { shiftId: "swing", target: 2, assigneeIds: ["luca", "maya"], tone: "ready", note: "Backlog rollover remains paired through peak hours." },
        { shiftId: "night", target: 1, assigneeIds: ["noor"], tone: "ready", note: "Night queue keeps a single experienced lead." },
      ] },
      { roleId: "dispatch", note: "Courier resets and reroute recovery.", assignments: [
        { shiftId: "dawn", target: 2, assigneeIds: ["ellis", "jo"], tone: "ready", note: "Launch cutover has both routing controllers online." },
        { shiftId: "swing", target: 2, assigneeIds: ["ellis", "jo"], tone: "ready", note: "Peak traffic stays paired all afternoon." },
        { shiftId: "night", target: 1, assigneeIds: ["ellis"], tone: "ready", note: "Late exceptions remain inside normal thresholds." },
      ] },
      { roleId: "floor", note: "Counter support with launch-day relief pair.", assignments: [
        { shiftId: "dawn", target: 2, assigneeIds: ["rhea", "omar"], tone: "ready", note: "Opening lanes are fully staffed." },
        { shiftId: "swing", target: 2, assigneeIds: ["rhea", "sana"], tone: "ready", note: "Break relief is fully covered." },
        { shiftId: "night", target: 1, assigneeIds: ["omar"], tone: "ready", note: "Close-out team stays within target." },
      ] },
      { roleId: "qa", note: "Extra launch-day review headroom.", assignments: [
        { shiftId: "dawn", target: 1, assigneeIds: ["ivy"], tone: "ready", note: "Morning review queue is staffed." },
        { shiftId: "swing", target: 1, assigneeIds: ["tess"], tone: "ready", note: "Escalation loop has clear sign-off ownership." },
        { shiftId: "night", target: 1, assigneeIds: ["ivy"], tone: "ready", note: "Final audit pass stays in-house." },
      ] },
    ],
    handoffNotes: [
      { id: "mon-21-dawn", title: "Launch board sweep", shiftId: "dawn", ownerId: "ellis", status: "ready", body: "Dispatch board is balanced; keep one triage lead paired with courier exceptions until 10:00." },
      { id: "mon-21-swing", title: "Afternoon buffer", shiftId: "swing", ownerId: "sana", status: "ready", body: "Floor support is healthy enough to release on-call backup unless the counter queue doubles." },
      { id: "mon-21-night", title: "Close-out script", shiftId: "night", ownerId: "ivy", status: "ready", body: "Night QA owns final audit, then hands the clean board to the launch recap in the morning." },
    ],
  },
];
