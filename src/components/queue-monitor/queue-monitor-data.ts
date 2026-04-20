export type QueueTone = "stable" | "watch" | "critical";
export type AgeFilter = "all" | "aging" | "breach";
export type QueueScope = "all" | "watch" | "stable";
export type AgeBand = "fresh" | "aging" | "breach";
export type EscalationLevelId = "none" | "lead" | "director";
export type PriorityBand = "monitor" | "expedite" | "critical";
export type PriorityFilter = "all" | "expedite" | "critical";
export type ViewMode = "live" | "forecast";
export type InsightMode = "operations" | "priority";
export type ForecastWindowId = "30m" | "60m" | "90m";

export type ForecastWindow = {
  id: ForecastWindowId;
  label: string;
  note: string;
  shortLabel: string;
};

export type ForecastPoint = {
  windowId: ForecastWindowId;
  backlogCount: number;
  agingCount: number;
  breachCount: number;
  oldestMinutes: number;
  intakePerHour: number;
  clearedPerHour: number;
  tone: QueueTone;
  statusLabel: string;
  priorityRank: number;
  carryover: number;
  projectedWaitMinutes: number;
  explanationSummary: string;
};

export type PriorityDriver = {
  id: string;
  label: string;
  detail: string;
  impact: string;
  tone: "calm" | "watch" | "hot";
};

export type QueueSummary = {
  id: string;
  label: string;
  region: string;
  owner: string;
  tone: QueueTone;
  statusLabel: string;
  intakePerHour: number;
  clearedPerHour: number;
  oldestMinutes: number;
  slaWindow: string;
  backlogCount: number;
  agingCount: number;
  breachCount: number;
  priorityRank: number;
  carryover: number;
  projectedWaitMinutes: number;
  prioritySummary: string;
  rationale: string;
  pressureSignals: string[];
  priorityDrivers: PriorityDriver[];
  forecast: ForecastPoint[];
};

export type BacklogForecastState = {
  windowId: ForecastWindowId;
  ageMinutes: number;
  ageBand: AgeBand;
  priorityBand: PriorityBand;
  riskLabel: string;
  rationale: string;
  nextAction: string;
  etaLabel: string;
};

export type BacklogItem = {
  id: string;
  queueId: string;
  caseRef: string;
  customer: string;
  title: string;
  detail: string;
  owner: string;
  ageMinutes: number;
  ageBand: AgeBand;
  severity: "low" | "medium" | "high";
  nextAction: string;
  segment: string;
  escalationLevel: EscalationLevelId;
  priorityBand: PriorityBand;
  priorityReason: string;
  explanationPoints: string[];
  blockingSignal: string;
  forecast: BacklogForecastState[];
};

export type ThroughputSummary = {
  id: string;
  label: string;
  value: string;
  note: string;
  tone: "up" | "flat" | "down";
};

export type EscalationLevel = {
  id: EscalationLevelId;
  label: string;
  note: string;
  tone: "calm" | "watch" | "hot";
};

export const queueMonitorSnapshot = "Snapshot 09:40 local";

export const forecastWindows: ForecastWindow[] = [
  {
    id: "30m",
    label: "30 min",
    shortLabel: "30m",
    note: "Next routing pass",
  },
  {
    id: "60m",
    label: "60 min",
    shortLabel: "60m",
    note: "Shift midpoint forecast",
  },
  {
    id: "90m",
    label: "90 min",
    shortLabel: "90m",
    note: "Handoff risk preview",
  },
];

export const escalationLevels: EscalationLevel[] = [
  {
    id: "none",
    label: "Local watch",
    note: "Keep the item inside the queue team.",
    tone: "calm",
  },
  {
    id: "lead",
    label: "Shift lead",
    note: "Pull the queue lead into the next pass.",
    tone: "watch",
  },
  {
    id: "director",
    label: "Director page",
    note: "Escalate immediately for deadline risk.",
    tone: "hot",
  },
];

export const queueSummaries: QueueSummary[] = [
  {
    id: "claims",
    label: "Priority Claims",
    region: "North pod",
    owner: "Mika Patel",
    tone: "critical",
    statusLabel: "Backlog breach",
    intakePerHour: 38,
    clearedPerHour: 27,
    oldestMinutes: 128,
    slaWindow: "90 min target",
    backlogCount: 17,
    agingCount: 8,
    breachCount: 3,
    priorityRank: 1,
    carryover: 4,
    projectedWaitMinutes: 101,
    prioritySummary:
      "Claims stays at the top because intake is outrunning clearance and breach work is stacking ahead of the next sweep.",
    rationale:
      "Two reopened payer appeals and one blocked trace correction keep director attention locked on the claims lane.",
    pressureSignals: [
      "11 more items arrive each hour than the pod clears.",
      "Three claims are already past the ninety minute target.",
      "Manual coding rework keeps reopened packets in the same lane.",
    ],
    priorityDrivers: [
      {
        id: "claims-gap",
        label: "Intake outruns clearance",
        impact: "+11 / hr gap",
        tone: "hot",
        detail:
          "The pod is taking in 38 claims an hour and clearing 27, so every sweep adds exposed work instead of burning it down.",
      },
      {
        id: "claims-breach",
        label: "Existing breach concentration",
        impact: "3 breach claims",
        tone: "hot",
        detail:
          "Already-breached claims are consuming lead attention and shrinking room for new intake.",
      },
      {
        id: "claims-rework",
        label: "Reopened packet rework",
        impact: "2-step correction loop",
        tone: "watch",
        detail:
          "Coding and finance both have to touch the same packet before it can leave the queue.",
      },
    ],
    forecast: [
      {
        windowId: "30m",
        backlogCount: 19,
        agingCount: 9,
        breachCount: 4,
        oldestMinutes: 145,
        intakePerHour: 40,
        clearedPerHour: 28,
        tone: "critical",
        statusLabel: "Director attention",
        priorityRank: 1,
        carryover: 5,
        projectedWaitMinutes: 106,
        explanationSummary:
          "Breach risk climbs if the payer trace stays blocked through the next routing pass.",
      },
      {
        windowId: "60m",
        backlogCount: 23,
        agingCount: 11,
        breachCount: 5,
        oldestMinutes: 158,
        intakePerHour: 41,
        clearedPerHour: 29,
        tone: "critical",
        statusLabel: "Stack building",
        priorityRank: 1,
        carryover: 6,
        projectedWaitMinutes: 111,
        explanationSummary:
          "Reopened appeals keep director pages active even if one blocked payout clears.",
      },
      {
        windowId: "90m",
        backlogCount: 27,
        agingCount: 13,
        breachCount: 7,
        oldestMinutes: 173,
        intakePerHour: 42,
        clearedPerHour: 29,
        tone: "critical",
        statusLabel: "Carryover locked",
        priorityRank: 1,
        carryover: 8,
        projectedWaitMinutes: 118,
        explanationSummary:
          "Claims remains the top queue because breach work compounds faster than the pod can absorb it.",
      },
    ],
  },
  {
    id: "identity",
    label: "Identity Review",
    region: "Trust desk",
    owner: "Cam Nguyen",
    tone: "watch",
    statusLabel: "Aging concentration",
    intakePerHour: 29,
    clearedPerHour: 24,
    oldestMinutes: 82,
    slaWindow: "75 min target",
    backlogCount: 12,
    agingCount: 5,
    breachCount: 1,
    priorityRank: 2,
    carryover: 3,
    projectedWaitMinutes: 79,
    prioritySummary:
      "Identity sits just behind claims because verifier capacity is thin and enterprise KYC packets are bunching together.",
    rationale:
      "The queue stays near the top while two-person review coverage is uneven across the next hour.",
    pressureSignals: [
      "Verifier coverage drops to one reviewer for the 10:00 block.",
      "One enterprise packet is already close to its trust desk deadline.",
      "Manual checksum retries are stretching second-pass review time.",
    ],
    priorityDrivers: [
      {
        id: "identity-capacity",
        label: "Second verifier scarcity",
        impact: "-1 reviewer next pass",
        tone: "watch",
        detail:
          "The trust desk loses one secondary verifier for the 10:00 block, so enterprise packets queue behind each other.",
      },
      {
        id: "identity-enterprise",
        label: "Enterprise document sensitivity",
        impact: "2 high-touch packets",
        tone: "watch",
        detail:
          "Large-account document packs need paired review and cannot be cleared in single-pass mode.",
      },
      {
        id: "identity-checksum",
        label: "Checksum rework",
        impact: "repeat upload cycle",
        tone: "calm",
        detail:
          "Broken upload packages are adding another manual touch but not yet causing widespread breaches.",
      },
    ],
    forecast: [
      {
        windowId: "30m",
        backlogCount: 13,
        agingCount: 6,
        breachCount: 2,
        oldestMinutes: 95,
        intakePerHour: 30,
        clearedPerHour: 24,
        tone: "watch",
        statusLabel: "Coverage thinning",
        priorityRank: 2,
        carryover: 4,
        projectedWaitMinutes: 83,
        explanationSummary:
          "Enterprise packets start to stack once paired review capacity narrows.",
      },
      {
        windowId: "60m",
        backlogCount: 15,
        agingCount: 8,
        breachCount: 3,
        oldestMinutes: 108,
        intakePerHour: 31,
        clearedPerHour: 24,
        tone: "watch",
        statusLabel: "Manual review pileup",
        priorityRank: 2,
        carryover: 5,
        projectedWaitMinutes: 88,
        explanationSummary:
          "Identity holds rank two while secondary verification remains the main bottleneck.",
      },
      {
        windowId: "90m",
        backlogCount: 16,
        agingCount: 9,
        breachCount: 4,
        oldestMinutes: 121,
        intakePerHour: 31,
        clearedPerHour: 23,
        tone: "critical",
        statusLabel: "Deadline slip risk",
        priorityRank: 3,
        carryover: 6,
        projectedWaitMinutes: 93,
        explanationSummary:
          "Identity turns critical by handoff, but returns edges ahead because inbound exceptions spike faster.",
      },
    ],
  },
  {
    id: "returns",
    label: "Returns Exceptions",
    region: "Marketplace lane",
    owner: "Jules Carter",
    tone: "watch",
    statusLabel: "Throughput drift",
    intakePerHour: 41,
    clearedPerHour: 35,
    oldestMinutes: 64,
    slaWindow: "70 min target",
    backlogCount: 14,
    agingCount: 4,
    breachCount: 0,
    priorityRank: 3,
    carryover: 2,
    projectedWaitMinutes: 67,
    prioritySummary:
      "Returns sits below identity now, but carrier exception volume is building and can move this lane up before handoff.",
    rationale:
      "Inbound warehouse and carrier mismatches are still controllable, but the lane has little slack if arrival scans continue to fail.",
    pressureSignals: [
      "Returns is taking in six more exceptions an hour than it clears.",
      "Carrier scan disputes are clustering around the same marketplace lane.",
      "Fresh items are likely to age into breach by handoff if proof never lands.",
    ],
    priorityDrivers: [
      {
        id: "returns-gap",
        label: "Arrival volume ramp",
        impact: "+6 / hr gap",
        tone: "watch",
        detail:
          "The lane is still clearing most work, but new arrival exceptions are accelerating faster than planned.",
      },
      {
        id: "returns-proof",
        label: "Proof and scan dependency",
        impact: "multi-party unblock",
        tone: "watch",
        detail:
          "Warehouse proof and carrier scans both have to land before several exceptions can close.",
      },
      {
        id: "returns-handoff",
        label: "Handoff exposure",
        impact: "3 items near target",
        tone: "calm",
        detail:
          "Several exceptions are still fresh now, but they age into real handoff risk if the lane drifts for another hour.",
      },
    ],
    forecast: [
      {
        windowId: "30m",
        backlogCount: 15,
        agingCount: 5,
        breachCount: 1,
        oldestMinutes: 78,
        intakePerHour: 42,
        clearedPerHour: 35,
        tone: "watch",
        statusLabel: "Aging into target edge",
        priorityRank: 3,
        carryover: 3,
        projectedWaitMinutes: 71,
        explanationSummary:
          "Carrier exception arrivals stay manageable, but the oldest item crosses the lane target.",
      },
      {
        windowId: "60m",
        backlogCount: 16,
        agingCount: 6,
        breachCount: 2,
        oldestMinutes: 91,
        intakePerHour: 43,
        clearedPerHour: 35,
        tone: "watch",
        statusLabel: "Warehouse proof lag",
        priorityRank: 3,
        carryover: 4,
        projectedWaitMinutes: 75,
        explanationSummary:
          "Returns keeps building because carrier scan disputes are not clearing inside the same pass.",
      },
      {
        windowId: "90m",
        backlogCount: 18,
        agingCount: 7,
        breachCount: 3,
        oldestMinutes: 104,
        intakePerHour: 44,
        clearedPerHour: 34,
        tone: "critical",
        statusLabel: "Handoff spike",
        priorityRank: 2,
        carryover: 5,
        projectedWaitMinutes: 80,
        explanationSummary:
          "Carrier arrivals push this lane ahead of identity by handoff unless proof and scans land together.",
      },
    ],
  },
  {
    id: "loyalty",
    label: "Loyalty Adjustments",
    region: "Retention desk",
    owner: "Ava Brooks",
    tone: "stable",
    statusLabel: "Within target",
    intakePerHour: 22,
    clearedPerHour: 25,
    oldestMinutes: 31,
    slaWindow: "60 min target",
    backlogCount: 8,
    agingCount: 1,
    breachCount: 0,
    priorityRank: 4,
    carryover: 1,
    projectedWaitMinutes: 34,
    prioritySummary:
      "Loyalty remains stable because the desk is still clearing above intake, even with nightly balance work approaching.",
    rationale:
      "The retention desk has room to absorb short-term sync work, so this lane stays last in the priority stack.",
    pressureSignals: [
      "Clearance stays ahead of intake for most of the shift.",
      "Only one tracked item is close to its target window.",
      "Nightly balance sync adds friction later, but not enough to pull rank yet.",
    ],
    priorityDrivers: [
      {
        id: "loyalty-buffer",
        label: "Positive clearance buffer",
        impact: "+3 / hr",
        tone: "calm",
        detail:
          "The desk is still clearing slightly more work than it takes in, so it can absorb minor drift.",
      },
      {
        id: "loyalty-sync",
        label: "Nightly sync dependency",
        impact: "1 queued adjustment",
        tone: "watch",
        detail:
          "A couple of items still depend on the nightly balance sync, but they are not putting the desk over target yet.",
      },
      {
        id: "loyalty-severity",
        label: "Low severity mix",
        impact: "consumer volume",
        tone: "calm",
        detail:
          "Most of the desk work is low-severity consumer adjustments rather than hard-stop enterprise issues.",
      },
    ],
    forecast: [
      {
        windowId: "30m",
        backlogCount: 7,
        agingCount: 1,
        breachCount: 0,
        oldestMinutes: 43,
        intakePerHour: 22,
        clearedPerHour: 25,
        tone: "stable",
        statusLabel: "Buffer intact",
        priorityRank: 4,
        carryover: 1,
        projectedWaitMinutes: 38,
        explanationSummary:
          "Loyalty stays comfortably stable while the desk clears above intake.",
      },
      {
        windowId: "60m",
        backlogCount: 8,
        agingCount: 2,
        breachCount: 0,
        oldestMinutes: 56,
        intakePerHour: 23,
        clearedPerHour: 24,
        tone: "stable",
        statusLabel: "Sync watch",
        priorityRank: 4,
        carryover: 1,
        projectedWaitMinutes: 42,
        explanationSummary:
          "The nightly sync adds some aging work, but not enough to displace the higher-risk lanes.",
      },
      {
        windowId: "90m",
        backlogCount: 9,
        agingCount: 3,
        breachCount: 1,
        oldestMinutes: 69,
        intakePerHour: 23,
        clearedPerHour: 23,
        tone: "watch",
        statusLabel: "Sync friction",
        priorityRank: 4,
        carryover: 2,
        projectedWaitMinutes: 47,
        explanationSummary:
          "Loyalty slips into watch mode by handoff, but it still trails the other queues on absolute risk.",
      },
    ],
  },
];

export const backlogItems: BacklogItem[] = [
  {
    id: "claim-140",
    queueId: "claims",
    caseRef: "CLM-140",
    customer: "Northwind Health",
    title: "Appeal reopened after duplicate denial batch",
    detail:
      "Two denial reasons landed on the same claim packet and blocked the automatic close step.",
    owner: "Remy",
    ageMinutes: 128,
    ageBand: "breach",
    severity: "high",
    nextAction: "Pull the denial packet before the 10:15 sweep.",
    segment: "Enterprise",
    escalationLevel: "director",
    priorityBand: "critical",
    priorityReason:
      "Already in breach with duplicate-denial rework still open across coding and finance.",
    explanationPoints: [
      "Two denial reasons force a manual packet rebuild.",
      "The enterprise account misses revenue timing if this stays parked.",
      "Director paging is already active because the target window is blown.",
    ],
    blockingSignal:
      "Finance and coding both need the corrected denial packet before release can restart.",
    forecast: [
      {
        windowId: "30m",
        ageMinutes: 153,
        ageBand: "breach",
        priorityBand: "critical",
        riskLabel: "Another sweep misses if the duplicate-denial packet is still unresolved.",
        rationale:
          "Claims remains the top breach driver because the reopened packet still needs two teams to clear it.",
        nextAction:
          "Keep the director page open and route coding support into the next pass.",
        etaLabel: "Projected to stay open through the next 30 minutes.",
      },
      {
        windowId: "60m",
        ageMinutes: 176,
        ageBand: "breach",
        priorityBand: "critical",
        riskLabel: "Carryover becomes certain if the trace repair does not land in the midpoint pass.",
        rationale:
          "The reopened packet keeps claims pinned at the top because it blocks both breach clearance and new intake.",
        nextAction:
          "Hold payout release and push the corrected packet into the director review bundle.",
        etaLabel: "Likely to remain open into the shift midpoint.",
      },
      {
        windowId: "90m",
        ageMinutes: 203,
        ageBand: "breach",
        priorityBand: "critical",
        riskLabel: "Handoff starts with this packet still open unless finance and coding close the loop together.",
        rationale:
          "This appeal continues to anchor the claims queue because no single team can clear it alone.",
        nextAction:
          "Escalate the packet as handoff-critical and keep the director page active.",
        etaLabel: "Projected to survive into handoff without multi-team intervention.",
      },
    ],
  },
  {
    id: "claim-156",
    queueId: "claims",
    caseRef: "CLM-156",
    customer: "Blue Basin Dental",
    title: "Refund hold waiting on payer trace",
    detail:
      "The repayment file is ready, but finance still needs the corrected trace number.",
    owner: "Nadia",
    ageMinutes: 93,
    ageBand: "breach",
    severity: "medium",
    nextAction: "Confirm trace ID with finance and release the hold.",
    segment: "SMB",
    escalationLevel: "lead",
    priorityBand: "expedite",
    priorityReason:
      "The item is already over target and one missing payer trace keeps it from clearing.",
    explanationPoints: [
      "The repayment file is complete except for the corrected trace number.",
      "Every missed pass keeps the claims pod under its clearance target.",
      "Lead escalation is enough for now, but the item is drifting toward director review.",
    ],
    blockingSignal:
      "Finance cannot post the repayment without the corrected payer trace on file.",
    forecast: [
      {
        windowId: "30m",
        ageMinutes: 118,
        ageBand: "breach",
        priorityBand: "expedite",
        riskLabel: "The repayment misses another pass if the trace ID still has not been corrected.",
        rationale:
          "This claim stays near the front because it is simple work blocked by one missing finance dependency.",
        nextAction: "Pull finance into the next pass and verify the trace against the payer log.",
        etaLabel: "Projected to remain unresolved through the next routing pass.",
      },
      {
        windowId: "60m",
        ageMinutes: 141,
        ageBand: "breach",
        priorityBand: "critical",
        riskLabel: "The refund becomes a handoff blocker once it sits open for another hour.",
        rationale:
          "The trace blocker becomes director-visible because the claim is now pure carryover risk.",
        nextAction: "Promote the claim into the director digest if the payer trace is still missing.",
        etaLabel: "Likely to escalate by the midpoint forecast window.",
      },
      {
        windowId: "90m",
        ageMinutes: 166,
        ageBand: "breach",
        priorityBand: "critical",
        riskLabel: "Without the trace fix, this refund rolls directly into handoff as unresolved carryover.",
        rationale:
          "A simple finance dependency becomes a critical carryover item by handoff.",
        nextAction:
          "Keep the claim in the handoff packet and page finance if the trace is still absent.",
        etaLabel: "Projected to remain open into handoff without intervention.",
      },
    ],
  },
  {
    id: "claim-162",
    queueId: "claims",
    caseRef: "CLM-162",
    customer: "Crown Labs",
    title: "Manual coding review queued after rule mismatch",
    detail:
      "The edit engine split the modifiers into two review branches, leaving one item parked.",
    owner: "Owen",
    ageMinutes: 46,
    ageBand: "aging",
    severity: "medium",
    nextAction: "Resolve the modifier branch and re-run coding.",
    segment: "Mid-market",
    escalationLevel: "none",
    priorityBand: "monitor",
    priorityReason:
      "Not yet in breach, but the branch mismatch is likely to age into claims carryover if it stays untouched.",
    explanationPoints: [
      "The claim is blocked by a split modifier path inside the edit engine.",
      "A fast coding touch closes it now, but delay pushes it into the breach stack.",
      "The item is still local-watch material while it remains under target.",
    ],
    blockingSignal:
      "Coding needs to collapse the modifier branches before the claim can resume automation.",
    forecast: [
      {
        windowId: "30m",
        ageMinutes: 71,
        ageBand: "aging",
        priorityBand: "expedite",
        riskLabel: "This claim reaches the target edge if the modifier branch is still split in the next pass.",
        rationale:
          "The branch mismatch starts consuming higher priority because it is about to tip into breach territory.",
        nextAction: "Pull a coding reviewer into the next sweep and clear the rule split.",
        etaLabel: "Projected to become an expedite item inside 30 minutes.",
      },
      {
        windowId: "60m",
        ageMinutes: 96,
        ageBand: "breach",
        priorityBand: "expedite",
        riskLabel: "The claim crosses the ninety minute target unless the modifier branch is corrected.",
        rationale:
          "A once-manageable coding defect becomes visible carryover pressure by the midpoint forecast.",
        nextAction: "Promote the claim into the lead queue for the next coding pass.",
        etaLabel: "Projected to breach by the 60 minute forecast.",
      },
      {
        windowId: "90m",
        ageMinutes: 121,
        ageBand: "breach",
        priorityBand: "critical",
        riskLabel: "The parked coding mismatch becomes a handoff-critical claim if it is still untouched.",
        rationale:
          "The claim turns critical because it adds to the same breach stack already pulling claims to rank one.",
        nextAction: "Escalate the coding mismatch into the director digest before handoff.",
        etaLabel: "Projected to become critical by handoff.",
      },
    ],
  },
  {
    id: "id-404",
    queueId: "identity",
    caseRef: "ID-404",
    customer: "Horizon Clinics",
    title: "Beneficial-owner document failed checksum on resubmission",
    detail:
      "The resubmitted PDF is legible, but the checksum on the uploaded package does not match.",
    owner: "Theo",
    ageMinutes: 82,
    ageBand: "aging",
    severity: "high",
    nextAction: "Request a clean upload and hold release until it lands.",
    segment: "Enterprise",
    escalationLevel: "lead",
    priorityBand: "expedite",
    priorityReason:
      "Paired review is needed and the broken upload package is already close to the trust desk deadline.",
    explanationPoints: [
      "The package needs a clean re-upload before paired review can finish.",
      "Enterprise document handling raises the consequence of delay.",
      "The queue is capacity-constrained because one verifier drops out in the next block.",
    ],
    blockingSignal:
      "The upload package cannot pass paired review until the checksum mismatch is removed.",
    forecast: [
      {
        windowId: "30m",
        ageMinutes: 103,
        ageBand: "breach",
        priorityBand: "critical",
        riskLabel: "This packet breaches the trust target if a clean upload does not arrive before the next pass.",
        rationale:
          "The enterprise document becomes the sharpest identity risk once it crosses the paired review deadline.",
        nextAction: "Hold release and route the client to a clean upload lane immediately.",
        etaLabel: "Projected to breach inside the next 30 minutes.",
      },
      {
        windowId: "60m",
        ageMinutes: 126,
        ageBand: "breach",
        priorityBand: "critical",
        riskLabel: "The packet becomes a primary trust desk carryover item without a clean resubmission.",
        rationale:
          "Verifier scarcity and enterprise sensitivity keep this item near the top of the identity stack.",
        nextAction:
          "Escalate the upload failure into the lead digest and reserve paired review capacity.",
        etaLabel: "Likely to remain open into the shift midpoint.",
      },
      {
        windowId: "90m",
        ageMinutes: 149,
        ageBand: "breach",
        priorityBand: "critical",
        riskLabel: "Handoff begins with this packet unresolved unless the clean upload lands before the last paired-review slot.",
        rationale:
          "This packet continues to anchor identity risk because the queue cannot clear it in single-review mode.",
        nextAction:
          "Mark the packet as handoff-critical and keep paired review reserved for the clean upload.",
        etaLabel: "Projected to remain unresolved by handoff.",
      },
    ],
  },
  {
    id: "id-417",
    queueId: "identity",
    caseRef: "ID-417",
    customer: "Studio Meridian",
    title: "Passport image review waiting on secondary verifier",
    detail:
      "The first reviewer cleared the image; the second verification slot has not picked it up yet.",
    owner: "Iris",
    ageMinutes: 58,
    ageBand: "aging",
    severity: "medium",
    nextAction: "Pull the item into the next trust desk pairing.",
    segment: "SMB",
    escalationLevel: "none",
    priorityBand: "monitor",
    priorityReason:
      "Second verifier coverage stays thin for the next hour, so this image check is likely to age into breach.",
    explanationPoints: [
      "Only the second verification touch is missing.",
      "Trust desk capacity drops before the pending pair slot refreshes.",
      "The item is still recoverable without director attention if it gets the next slot.",
    ],
    blockingSignal:
      "The trust desk cannot finish the review until a secondary verifier claims the package.",
    forecast: [
      {
        windowId: "30m",
        ageMinutes: 82,
        ageBand: "aging",
        priorityBand: "expedite",
        riskLabel: "This review reaches the trust desk edge if the secondary verifier slot stays empty.",
        rationale:
          "The item becomes an expedite candidate because the queue has fewer paired-review slots than pending work.",
        nextAction: "Reserve the next paired-review slot for this image package.",
        etaLabel: "Projected to move into expedite focus inside 30 minutes.",
      },
      {
        windowId: "60m",
        ageMinutes: 104,
        ageBand: "breach",
        priorityBand: "expedite",
        riskLabel: "The passport review breaches if the second verifier still has not picked it up by midpoint.",
        rationale:
          "The review becomes visible queue pressure once it tips over target and competes with enterprise packets.",
        nextAction: "Promote the image package into the lead queue and claim the next verifier slot.",
        etaLabel: "Projected to breach by the midpoint forecast.",
      },
      {
        windowId: "90m",
        ageMinutes: 127,
        ageBand: "breach",
        priorityBand: "critical",
        riskLabel: "Handoff inherits this review unless the secondary verifier slot is claimed before the last pass.",
        rationale:
          "The package becomes critical because paired-review scarcity keeps it in front of fresh intake.",
        nextAction:
          "Add the package to the handoff digest and pull a backup verifier if available.",
        etaLabel: "Projected to become critical by handoff.",
      },
    ],
  },
  {
    id: "ret-212",
    queueId: "returns",
    caseRef: "RET-212",
    customer: "Evergreen Outfitters",
    title: "Warehouse exception lacks arrival scan for carton 3",
    detail:
      "The return is partially received, but one carton still shows as in transit in the partner feed.",
    owner: "Liam",
    ageMinutes: 64,
    ageBand: "aging",
    severity: "medium",
    nextAction: "Confirm the missing scan with the carrier rep.",
    segment: "Retail",
    escalationLevel: "lead",
    priorityBand: "expedite",
    priorityReason:
      "The lane is still under target overall, but this carton will breach quickly if the carrier scan never lands.",
    explanationPoints: [
      "Warehouse and carrier systems disagree on the third carton status.",
      "The exception closes fast once the missing scan posts.",
      "The returns lane is trending up, so older exceptions get more expensive each pass.",
    ],
    blockingSignal:
      "Carrier confirmation is required before the warehouse can finish the exception closeout.",
    forecast: [
      {
        windowId: "30m",
        ageMinutes: 86,
        ageBand: "breach",
        priorityBand: "expedite",
        riskLabel: "The exception breaches the lane target if the missing arrival scan is still absent next pass.",
        rationale:
          "A single scan dependency becomes visible returns pressure once the oldest carton crosses target.",
        nextAction: "Call the carrier rep in the next pass and flag the shipment for scan recovery.",
        etaLabel: "Projected to breach inside the next 30 minutes.",
      },
      {
        windowId: "60m",
        ageMinutes: 109,
        ageBand: "breach",
        priorityBand: "critical",
        riskLabel: "The carton exception becomes a handoff risk once it sits unresolved through midpoint.",
        rationale:
          "Carrier and warehouse dependencies keep the lane from burning down its oldest work.",
        nextAction: "Page the lane lead and hold the warehouse exception open for direct carrier follow-up.",
        etaLabel: "Likely to escalate by the 60 minute forecast.",
      },
      {
        windowId: "90m",
        ageMinutes: 132,
        ageBand: "breach",
        priorityBand: "critical",
        riskLabel: "Returns handoff inherits this scan dispute if the carrier feed still disagrees on carton 3.",
        rationale:
          "The unresolved scan becomes one of the items that pushes returns above identity by handoff.",
        nextAction: "Carry the scan dispute into the handoff deck and request direct carrier escalation.",
        etaLabel: "Projected to remain open into handoff.",
      },
    ],
  },
  {
    id: "ret-229",
    queueId: "returns",
    caseRef: "RET-229",
    customer: "Paper Kite",
    title: "Carrier credit request paused on surcharge dispute",
    detail:
      "The refund total is agreed, but the surcharge line item is still contested in the handoff notes.",
    owner: "June",
    ageMinutes: 39,
    ageBand: "fresh",
    severity: "low",
    nextAction: "Clear the surcharge note and relaunch the credit memo.",
    segment: "SMB",
    escalationLevel: "none",
    priorityBand: "monitor",
    priorityReason:
      "Fresh today, but likely to move up if the surcharge dispute still blocks the memo in the next two passes.",
    explanationPoints: [
      "The disputed surcharge is the only unresolved field on the memo.",
      "This is low-severity work now, but it ages quickly in a busy returns lane.",
      "The item stays local if the next pass resolves the note cleanly.",
    ],
    blockingSignal:
      "Finance needs the surcharge note cleared before the carrier credit memo can resume.",
    forecast: [
      {
        windowId: "30m",
        ageMinutes: 61,
        ageBand: "aging",
        priorityBand: "monitor",
        riskLabel: "The memo starts aging if the surcharge dispute is still unresolved next pass.",
        rationale:
          "The item remains manageable, but it no longer benefits from fresh-work slack once the lane keeps building.",
        nextAction: "Resolve the surcharge note before the next memo batch is assembled.",
        etaLabel: "Projected to enter aging state inside 30 minutes.",
      },
      {
        windowId: "60m",
        ageMinutes: 84,
        ageBand: "aging",
        priorityBand: "expedite",
        riskLabel: "The disputed memo joins the expedite set if it misses the midpoint batch.",
        rationale:
          "Returns volume makes even low-severity disputes matter once they crowd the next carrier batch.",
        nextAction: "Pull the memo into the lead queue and clear the surcharge note manually.",
        etaLabel: "Projected to move into expedite focus by midpoint.",
      },
      {
        windowId: "90m",
        ageMinutes: 108,
        ageBand: "breach",
        priorityBand: "expedite",
        riskLabel: "The memo breaches before handoff if the surcharge dispute still blocks the credit release.",
        rationale:
          "A low-severity dispute becomes meaningful because the returns lane is already carrying older scan exceptions.",
        nextAction: "Add the memo to the handoff packet if the surcharge note is still unresolved.",
        etaLabel: "Projected to breach by handoff.",
      },
    ],
  },
  {
    id: "ret-244",
    queueId: "returns",
    caseRef: "RET-244",
    customer: "Northstar Outdoors",
    title: "Restock rejection sent back for image proof",
    detail:
      "The warehouse note references damage, but the proof image never attached to the return record.",
    owner: "Piper",
    ageMinutes: 22,
    ageBand: "fresh",
    severity: "low",
    nextAction: "Attach warehouse proof and continue the rejection.",
    segment: "Retail",
    escalationLevel: "none",
    priorityBand: "monitor",
    priorityReason:
      "Low urgency now, though missing proof becomes more expensive if the lane stays above planned intake.",
    explanationPoints: [
      "Only the warehouse proof image is missing from the record.",
      "The case can close fast if the proof posts before the next batch.",
      "Fresh work in returns loses priority fast once arrival exceptions keep stacking.",
    ],
    blockingSignal:
      "The warehouse must attach the damage image before the rejection can be finalized.",
    forecast: [
      {
        windowId: "30m",
        ageMinutes: 46,
        ageBand: "fresh",
        priorityBand: "monitor",
        riskLabel: "Still low-risk if proof lands in the next warehouse upload batch.",
        rationale:
          "The item stays local because missing proof is the only unresolved step and the age is still manageable.",
        nextAction: "Confirm the image upload in the next warehouse sync.",
        etaLabel: "Projected to remain fresh through the next 30 minutes.",
      },
      {
        windowId: "60m",
        ageMinutes: 69,
        ageBand: "aging",
        priorityBand: "monitor",
        riskLabel: "The restock rejection starts aging if the proof image still has not attached by midpoint.",
        rationale:
          "The lane has to spend attention on older scan disputes first, so missing proof becomes a secondary drag.",
        nextAction: "Queue the proof request behind carrier scan recovery.",
        etaLabel: "Projected to enter aging state by midpoint.",
      },
      {
        windowId: "90m",
        ageMinutes: 93,
        ageBand: "aging",
        priorityBand: "expedite",
        riskLabel: "The missing proof image becomes handoff work if warehouse sync still has not landed.",
        rationale:
          "The item joins the expedite set once fresh-work slack disappears from the returns lane.",
        nextAction: "Add the proof gap to the handoff list if the upload still has not posted.",
        etaLabel: "Projected to become expedite by handoff.",
      },
    ],
  },
  {
    id: "loy-087",
    queueId: "loyalty",
    caseRef: "LOY-087",
    customer: "Maple & Co.",
    title: "Points reversal waiting on duplicate-order check",
    detail:
      "The order pair is already linked, but the system has not cleared the reversal hold yet.",
    owner: "Sage",
    ageMinutes: 31,
    ageBand: "fresh",
    severity: "low",
    nextAction: "Verify duplicate ownership and post the reversal.",
    segment: "Consumer",
    escalationLevel: "none",
    priorityBand: "monitor",
    priorityReason:
      "Stable desk conditions keep this low, though the nightly sync can make it age if it misses the current window.",
    explanationPoints: [
      "Duplicate ownership is already linked on the order pair.",
      "The only remaining blocker is the reversal hold release.",
      "Loyalty has enough buffer that this item stays local until the sync window tightens.",
    ],
    blockingSignal:
      "The points reversal cannot post until the duplicate-order hold clears in the ledger.",
    forecast: [
      {
        windowId: "30m",
        ageMinutes: 47,
        ageBand: "fresh",
        priorityBand: "monitor",
        riskLabel: "Still low-risk while the retention desk keeps clearing above intake.",
        rationale:
          "The item remains low priority because loyalty still has enough buffer to absorb the sync dependency.",
        nextAction: "Watch for the duplicate-order hold to clear in the next ledger refresh.",
        etaLabel: "Projected to remain fresh through the next 30 minutes.",
      },
      {
        windowId: "60m",
        ageMinutes: 63,
        ageBand: "aging",
        priorityBand: "monitor",
        riskLabel: "The reversal starts aging once the nightly sync window begins to crowd the desk.",
        rationale:
          "The only thing lifting this item is the approaching ledger sync, not acute queue pressure.",
        nextAction: "Queue the reversal for the first post-sync release batch.",
        etaLabel: "Projected to enter aging state by midpoint.",
      },
      {
        windowId: "90m",
        ageMinutes: 78,
        ageBand: "aging",
        priorityBand: "expedite",
        riskLabel: "The reversal becomes handoff watch work if the ledger hold survives into the sync window.",
        rationale:
          "The item moves up modestly because loyalty loses some of its clearance buffer late in the shift.",
        nextAction: "Carry the reversal into the sync watchlist if the hold is still active.",
        etaLabel: "Projected to become expedite near handoff.",
      },
    ],
  },
  {
    id: "loy-091",
    queueId: "loyalty",
    caseRef: "LOY-091",
    customer: "Pine Harbor",
    title: "Tier adjustment pending nightly balance sync",
    detail:
      "The requested tier move is ready to post after the next ledger snapshot completes.",
    owner: "Arlo",
    ageMinutes: 18,
    ageBand: "fresh",
    severity: "low",
    nextAction: "Carry this item into the overnight sync window.",
    segment: "Consumer",
    escalationLevel: "none",
    priorityBand: "monitor",
    priorityReason:
      "Lowest current priority because the desk is still stable and the item is intentionally parked for the nightly sync.",
    explanationPoints: [
      "The tier move is otherwise ready to post.",
      "The next ledger snapshot is the intended release point.",
      "This only rises if the sync queue starts to crowd late in the shift.",
    ],
    blockingSignal:
      "The ledger snapshot has to complete before the tier adjustment can post cleanly.",
    forecast: [
      {
        windowId: "30m",
        ageMinutes: 34,
        ageBand: "fresh",
        priorityBand: "monitor",
        riskLabel: "Still intentionally parked while the nightly sync window approaches.",
        rationale:
          "This is planned waiting, not operational pressure, so it stays at the bottom of the stack.",
        nextAction: "Leave the adjustment parked until the ledger snapshot starts.",
        etaLabel: "Projected to remain fresh through the next 30 minutes.",
      },
      {
        windowId: "60m",
        ageMinutes: 51,
        ageBand: "fresh",
        priorityBand: "monitor",
        riskLabel: "Remains low-risk as long as the loyalty desk keeps its clearance buffer.",
        rationale:
          "The sync dependency is expected and still not displacing more urgent work.",
        nextAction: "Prepare the adjustment for the first post-sync release wave.",
        etaLabel: "Projected to stay low priority through midpoint.",
      },
      {
        windowId: "90m",
        ageMinutes: 68,
        ageBand: "aging",
        priorityBand: "expedite",
        riskLabel: "The tier change joins the sync watchlist by handoff if the ledger window slips.",
        rationale:
          "The item rises only because loyalty loses its surplus clearance late in the shift.",
        nextAction: "Move the adjustment into the sync watchlist before handoff.",
        etaLabel: "Projected to enter aging watch by handoff.",
      },
    ],
  },
];
