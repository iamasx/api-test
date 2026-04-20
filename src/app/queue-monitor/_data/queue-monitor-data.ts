export type QueueMonitorColumnId =
  | "new-intake"
  | "ready-to-assign"
  | "actively-working"
  | "awaiting-external"
  | "ready-to-close";

export type QueueMonitorEscalationId =
  | "steady"
  | "watch"
  | "priority"
  | "sla-risk";

export type QueueMonitorQueue = {
  id: string;
  name: string;
  focus: string;
  summaryWindow: string;
};

export type QueueMonitorOwner = {
  id: string;
  name: string;
  role: string;
  team: string;
  initials: string;
};

export type QueueMonitorEscalationMarker = {
  id: QueueMonitorEscalationId;
  label: string;
  summary: string;
  responseExpectation: string;
  attentionNote: string;
};

export type QueueMonitorColumnDefinition = {
  id: QueueMonitorColumnId;
  title: string;
  description: string;
  wipLimit: number;
  backlogExpectation: string;
};

export type QueueMonitorItem = {
  id: string;
  title: string;
  queueId: QueueMonitorQueue["id"];
  account: string;
  columnId: QueueMonitorColumnId;
  ownerId: QueueMonitorOwner["id"];
  escalationId: QueueMonitorEscalationId;
  statusLabel: string;
  ageHours: number;
  blocked: boolean;
  backlogPosition: string;
  dueWindow: string;
  lastUpdate: string;
  nextAction: string;
  escalationDetail: string;
  blocker?: string;
  summary: string;
  tags: string[];
  focusPoints: string[];
};

export const queueMonitorQueues: QueueMonitorQueue[] = [
  {
    id: "returns-exceptions",
    name: "Returns Exceptions",
    focus: "Reverse logistics tickets that need same-day classification.",
    summaryWindow: "Watch volume before the 15:00 carrier sweep.",
  },
  {
    id: "finance-recovery",
    name: "Finance Recovery",
    focus: "Credits, billing corrections, and payout exceptions.",
    summaryWindow: "Keep callbacks inside the daily customer commitment window.",
  },
  {
    id: "partner-holds",
    name: "Partner Holds",
    focus: "External blockers owned by brokers, warehouses, and delivery partners.",
    summaryWindow: "Review every 30 minutes while partner desks are active.",
  },
  {
    id: "cold-chain-control",
    name: "Cold Chain Control",
    focus: "Temperature-sensitive moves with tight handling windows.",
    summaryWindow: "Escalate before reefer or dispatch holds roll overnight.",
  },
];

export const queueMonitorOwners: QueueMonitorOwner[] = [
  {
    id: "amira-kim",
    name: "Amira Kim",
    role: "Queue lead",
    team: "Workflow Control",
    initials: "AK",
  },
  {
    id: "jonah-reed",
    name: "Jonah Reed",
    role: "Escalation analyst",
    team: "Recovery Desk",
    initials: "JR",
  },
  {
    id: "priya-nolan",
    name: "Priya Nolan",
    role: "Partner liaison",
    team: "External Ops",
    initials: "PN",
  },
  {
    id: "lucas-ibarra",
    name: "Lucas Ibarra",
    role: "Resolution manager",
    team: "Customer Recovery",
    initials: "LI",
  },
  {
    id: "sofia-hart",
    name: "Sofia Hart",
    role: "Cold-chain specialist",
    team: "Thermal Control",
    initials: "SH",
  },
];

export const queueMonitorEscalationMarkers: QueueMonitorEscalationMarker[] = [
  {
    id: "steady",
    label: "Steady",
    summary: "Normal operating path with no active breach risk.",
    responseExpectation: "Review in the next regular queue sweep.",
    attentionNote: "Keep visible, but it does not need a focused intervention yet.",
  },
  {
    id: "watch",
    label: "Watch",
    summary: "Needs tighter observation because aging or repeat volume is building.",
    responseExpectation: "Recheck within the next 60 minutes.",
    attentionNote: "A short delay is acceptable, but the route should not lose ownership.",
  },
  {
    id: "priority",
    label: "Priority",
    summary: "Customer, cost, or throughput impact is rising and needs faster action.",
    responseExpectation: "Escalate or update within the next planning cycle.",
    attentionNote: "Use a named owner and visible next step until the pressure drops.",
  },
  {
    id: "sla-risk",
    label: "SLA Risk",
    summary: "A service promise is close to breach or already unsafe without intervention.",
    responseExpectation: "Keep on the escalation panel until a recovery path is confirmed.",
    attentionNote: "This marker should stay pinned in the detail view until it stabilizes.",
  },
];

export const queueMonitorColumns: QueueMonitorColumnDefinition[] = [
  {
    id: "new-intake",
    title: "New Intake",
    description: "Fresh requests waiting for the first backlog review and queue assignment.",
    wipLimit: 4,
    backlogExpectation: "Keep under one hour of unowned intake.",
  },
  {
    id: "ready-to-assign",
    title: "Ready To Assign",
    description: "Scoped work that needs a named owner and an explicit next checkpoint.",
    wipLimit: 5,
    backlogExpectation: "Do not let assignment spill beyond the current shift.",
  },
  {
    id: "actively-working",
    title: "Actively Working",
    description: "Owners are driving the queue item and reporting progress inside the same lane.",
    wipLimit: 6,
    backlogExpectation: "Keep active work below the team throughput target.",
  },
  {
    id: "awaiting-external",
    title: "Awaiting External",
    description: "Blocked on outside approvals, documents, or partner-system recovery.",
    wipLimit: 3,
    backlogExpectation: "Escalate early if the partner dependency is time-sensitive.",
  },
  {
    id: "ready-to-close",
    title: "Ready To Close",
    description: "Recovery work is done and only confirmation or final notes remain.",
    wipLimit: 4,
    backlogExpectation: "Close within the same business day when confirmation arrives.",
  },
];

export const queueMonitorItems: QueueMonitorItem[] = [
  {
    id: "QM-301",
    title: "Classify duplicate return authorization for Luma Market",
    queueId: "returns-exceptions",
    account: "Luma Market",
    columnId: "new-intake",
    ownerId: "amira-kim",
    escalationId: "watch",
    statusLabel: "Needs intake review",
    ageHours: 2,
    blocked: false,
    backlogPosition: "2 of 5 in intake review",
    dueWindow: "First action due by 10:45 local",
    lastUpdate: "Raised from overnight duplicate scan monitor at 08:12.",
    nextAction: "Confirm whether the second authorization should merge into the live case.",
    escalationDetail: "The same store has raised three duplicate authorizations since yesterday.",
    summary:
      "Carrier labels are on hold until intake decides whether this is a repeat return or a true new request.",
    tags: ["Returns", "Retail", "Repeat volume"],
    focusPoints: [
      "Check whether the prior case already consumed the restock disposition.",
      "Avoid issuing another label while the warehouse pallet is still sealed.",
    ],
  },
  {
    id: "QM-304",
    title: "Route cold-pack variance review for Northwind Clinics",
    queueId: "cold-chain-control",
    account: "Northwind Clinics",
    columnId: "new-intake",
    ownerId: "sofia-hart",
    escalationId: "priority",
    statusLabel: "Pending queue assignment",
    ageHours: 1,
    blocked: false,
    backlogPosition: "1 of 3 cold-chain intake tickets",
    dueWindow: "Assignment due before 11:00 dispatch planning",
    lastUpdate: "Temperature logger exception arrived with the morning reefer unload.",
    nextAction: "Assign the case to the thermal specialist before the noon outbound wave.",
    escalationDetail: "If the review slips, the clinic replenishment may miss the protected dispatch window.",
    summary:
      "The shipment is stable, but the variance needs specialist ownership before the product can be released.",
    tags: ["Cold chain", "Dispatch", "Thermal"],
    focusPoints: [
      "Compare logger timestamps against the dock handoff record.",
      "Confirm whether the clinic accepted the alternate storage path.",
    ],
  },
  {
    id: "QM-287",
    title: "Assign missed pickup credit follow-up for Harbor Electric",
    queueId: "finance-recovery",
    account: "Harbor Electric",
    columnId: "ready-to-assign",
    ownerId: "jonah-reed",
    escalationId: "priority",
    statusLabel: "Waiting for named owner",
    ageHours: 6,
    blocked: false,
    backlogPosition: "3 of 7 in assignment queue",
    dueWindow: "Customer callback promised before 14:00",
    lastUpdate: "Support renewed the request after the customer asked for a same-day answer.",
    nextAction: "Hand off to a recovery manager who can approve the credit path today.",
    escalationDetail: "The account team has already committed to a same-day callback with a decision.",
    summary:
      "The queue item is fully scoped, but it needs an owner with credit approval authority before the callback window closes.",
    tags: ["Credits", "Customer commit", "Callback"],
    focusPoints: [
      "Check whether the missed pickup was carrier-caused or warehouse-caused.",
      "Confirm the credit amount already discussed with customer success.",
    ],
  },
  {
    id: "QM-292",
    title: "Queue broker document replay for Eastline Components",
    queueId: "partner-holds",
    account: "Eastline Components",
    columnId: "ready-to-assign",
    ownerId: "priya-nolan",
    escalationId: "watch",
    statusLabel: "Ready for partner follow-up",
    ageHours: 4,
    blocked: false,
    backlogPosition: "5 of 7 in assignment queue",
    dueWindow: "Partner touchpoint due this hour",
    lastUpdate: "The broker requested a clean resend after their portal timed out overnight.",
    nextAction: "Assign to the liaison covering the broker desk before lunch coverage changes.",
    escalationDetail: "The delay is still recoverable, but the desk handoff gets slower after noon.",
    summary:
      "The issue is straightforward if the replay is assigned before the broker team rotates coverage.",
    tags: ["Broker", "Replay", "Portal"],
    focusPoints: [
      "Confirm the replay packet includes the amended invoice page count.",
      "Avoid reusing the expired broker portal upload token.",
    ],
  },
  {
    id: "QM-276",
    title: "Resolve scanner gap on Lattice Foods replenishment batch",
    queueId: "returns-exceptions",
    account: "Lattice Foods",
    columnId: "actively-working",
    ownerId: "amira-kim",
    escalationId: "steady",
    statusLabel: "Investigating scan history",
    ageHours: 5,
    blocked: false,
    backlogPosition: "2 of 6 in active work",
    dueWindow: "Recovery note expected by the next replenishment check",
    lastUpdate: "Ops replayed two handheld logs and isolated the missing wave segment.",
    nextAction: "Confirm whether the missing scans can be replayed without manual relabeling.",
    escalationDetail: "No service breach is active because the replenishment truck is still inside tolerance.",
    summary:
      "The queue item is moving on schedule and should clear once the missing scan segment is replayed.",
    tags: ["Scanning", "Replenishment", "Warehouse"],
    focusPoints: [
      "Check the handheld battery swap window against the missing scan timestamps.",
      "Update the store ETA only if the replay fails.",
    ],
  },
  {
    id: "QM-281",
    title: "Secure finance approval for Atlas Home exception credit",
    queueId: "finance-recovery",
    account: "Atlas Home",
    columnId: "actively-working",
    ownerId: "lucas-ibarra",
    escalationId: "priority",
    statusLabel: "Approval path in motion",
    ageHours: 9,
    blocked: false,
    backlogPosition: "4 of 6 in active work",
    dueWindow: "Decision required before the 15:00 renewal call",
    lastUpdate: "Finance asked for proof that the warehouse carrier handoff failed twice.",
    nextAction: "Attach the second failed pickup record and resubmit the credit request for approval.",
    escalationDetail: "The renewal team cannot brief the customer without a final credit position.",
    summary:
      "Most of the work is done, but the last approval gate needs evidence before the customer-facing call.",
    tags: ["Finance", "Renewal", "Approval"],
    focusPoints: [
      "Pull the warehouse gate logs for both failed pickup attempts.",
      "Keep the account executive informed before the renewal call starts.",
    ],
  },
  {
    id: "QM-268",
    title: "Await amended customs packet for Ember Devices",
    queueId: "partner-holds",
    account: "Ember Devices",
    columnId: "awaiting-external",
    ownerId: "priya-nolan",
    escalationId: "watch",
    statusLabel: "Waiting on broker resend",
    ageHours: 11,
    blocked: true,
    backlogPosition: "1 of 4 external holds",
    dueWindow: "Broker response due before detention charges start",
    lastUpdate: "The broker acknowledged the packet error and promised a corrected upload.",
    nextAction: "Stay on the broker queue until the amended packet appears in the portal.",
    escalationDetail: "Charges are not active yet, but the window narrows if the resend misses the afternoon cut.",
    blocker: "The broker portal still shows the outdated invoice packet from the first submission.",
    summary:
      "The queue item is externally blocked, but the broker has already confirmed they are preparing the corrected packet.",
    tags: ["Broker", "Customs", "External hold"],
    focusPoints: [
      "Check that the commodity count and invoice page count match the corrected packet.",
      "Escalate to the broker lead if nothing lands before the afternoon cut.",
    ],
  },
  {
    id: "QM-271",
    title: "Obtain weekend dispatch waiver for Summit Bio restock",
    queueId: "cold-chain-control",
    account: "Summit Bio",
    columnId: "awaiting-external",
    ownerId: "sofia-hart",
    escalationId: "sla-risk",
    statusLabel: "Blocked on clinical sign-off",
    ageHours: 17,
    blocked: true,
    backlogPosition: "2 of 4 external holds",
    dueWindow: "Waiver required in 90 minutes to keep the reefer release",
    lastUpdate: "The customer accepted the reroute plan, but clinical leadership still has not signed the weekend waiver.",
    nextAction: "Keep the case on the escalation panel and call the clinical approver directly if legal is still silent at the top of the hour.",
    escalationDetail: "Without the waiver, the reefer slot rolls overnight and the replenishment order misses the service commitment.",
    blocker: "Clinical leadership has not returned the signed waiver packet to the dispatch desk.",
    summary:
      "This is the highest-risk queue item because the recovery path exists, but the external signature has not landed.",
    tags: ["Cold chain", "SLA risk", "Weekend release"],
    focusPoints: [
      "Confirm whether legal can accept an emailed signature copy while the portal is delayed.",
      "Prepare the fallback dispatch note in case the reefer slot is lost.",
      "Keep the account team updated every 30 minutes until the waiver lands.",
    ],
  },
  {
    id: "QM-259",
    title: "Close recovery note for Cedar Labs freezer alarm false positive",
    queueId: "cold-chain-control",
    account: "Cedar Labs",
    columnId: "ready-to-close",
    ownerId: "lucas-ibarra",
    escalationId: "steady",
    statusLabel: "Pending final note",
    ageHours: 3,
    blocked: false,
    backlogPosition: "1 of 2 awaiting closure",
    dueWindow: "Close before shift handoff",
    lastUpdate: "The lab confirmed there was no product exposure after the alarm review.",
    nextAction: "Send the final customer recap and archive the alarm trace with the queue record.",
    escalationDetail: "Operational risk is cleared, so the remaining work is documentation only.",
    summary:
      "The queue item is functionally resolved and only needs closure notes before it leaves the board.",
    tags: ["Closure", "Alarm review", "Documentation"],
    focusPoints: [
      "Attach the corrected logger screenshot to the closure note.",
      "Confirm the lab contact received the no-exposure summary.",
    ],
  },
  {
    id: "QM-263",
    title: "Finalize payout correction summary for Beacon Stores",
    queueId: "finance-recovery",
    account: "Beacon Stores",
    columnId: "ready-to-close",
    ownerId: "jonah-reed",
    escalationId: "watch",
    statusLabel: "Waiting on customer acknowledgement",
    ageHours: 8,
    blocked: false,
    backlogPosition: "2 of 2 awaiting closure",
    dueWindow: "Close today if the finance contact confirms",
    lastUpdate: "Corrected payout figures were delivered and the customer asked for a short verification window.",
    nextAction: "Check for acknowledgement after the next finance inbox sweep and close if approved.",
    escalationDetail: "The account is stable, but the open loop should not roll into tomorrow without a response.",
    summary:
      "The financial correction is complete, and only customer acknowledgement remains before the queue item can close.",
    tags: ["Payouts", "Customer follow-up", "Closure"],
    focusPoints: [
      "Confirm the corrected payout amount matches the memo already sent to the store group.",
      "Close immediately if the customer acknowledges before handoff.",
    ],
  },
];

export const queueMonitorFocusedItemId = "QM-271";
