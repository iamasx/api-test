export type QueueTone = "stable" | "watch" | "critical";
export type AgeFilter = "all" | "aging" | "breach";
export type QueueScope = "all" | "watch" | "stable";
export type AgeBand = "fresh" | "aging" | "breach";
export type EscalationLevelId = "none" | "lead" | "director";

export type QueueSummary = {
  id: string; label: string; region: string; owner: string; tone: QueueTone; statusLabel: string;
  intakePerHour: number; clearedPerHour: number; oldestMinutes: number; slaWindow: string;
};

export type BacklogItem = {
  id: string; queueId: string; caseRef: string; customer: string; title: string; detail: string;
  owner: string; ageMinutes: number; ageBand: AgeBand; severity: "low" | "medium" | "high";
  nextAction: string; segment: string; escalationLevel: EscalationLevelId;
};

export type ThroughputSummary = { id: string; label: string; value: string; note: string; tone: "up" | "flat" | "down" };
export type EscalationLevel = { id: EscalationLevelId; label: string; note: string; tone: "calm" | "watch" | "hot" };

export const queueMonitorSnapshot = "Snapshot 09:40 local";

export const throughputSummaries: ThroughputSummary[] = [
  { id: "inflow", label: "Inflow / hr", value: "142", note: "Eight more than the last half hour.", tone: "up" },
  { id: "clearance", label: "Clearance / hr", value: "118", note: "Two queues are clearing below intake.", tone: "down" },
  { id: "stability", label: "Projected carryover", value: "24", note: "If unchanged, two breach items remain by handoff.", tone: "flat" },
];

export const escalationLevels: EscalationLevel[] = [
  { id: "none", label: "Local watch", note: "Keep the item inside the queue team.", tone: "calm" },
  { id: "lead", label: "Shift lead", note: "Pull the queue lead into the next pass.", tone: "watch" },
  { id: "director", label: "Director page", note: "Escalate immediately for deadline risk.", tone: "hot" },
];

export const queueSummaries: QueueSummary[] = [
  { id: "claims", label: "Priority Claims", region: "North pod", owner: "Mika Patel", tone: "critical", statusLabel: "Backlog breach", intakePerHour: 38, clearedPerHour: 27, oldestMinutes: 128, slaWindow: "90 min target" },
  { id: "identity", label: "Identity Review", region: "Trust desk", owner: "Cam Nguyen", tone: "watch", statusLabel: "Aging concentration", intakePerHour: 29, clearedPerHour: 24, oldestMinutes: 82, slaWindow: "75 min target" },
  { id: "returns", label: "Returns Exceptions", region: "Marketplace lane", owner: "Jules Carter", tone: "watch", statusLabel: "Throughput drift", intakePerHour: 41, clearedPerHour: 35, oldestMinutes: 64, slaWindow: "70 min target" },
  { id: "loyalty", label: "Loyalty Adjustments", region: "Retention desk", owner: "Ava Brooks", tone: "stable", statusLabel: "Within target", intakePerHour: 22, clearedPerHour: 25, oldestMinutes: 31, slaWindow: "60 min target" },
];

export const backlogItems: BacklogItem[] = [
  { id: "claim-140", queueId: "claims", caseRef: "CLM-140", customer: "Northwind Health", title: "Appeal reopened after duplicate denial batch", detail: "Two denial reasons landed on the same claim packet and blocked the automatic close step.", owner: "Remy", ageMinutes: 128, ageBand: "breach", severity: "high", nextAction: "Pull the denial packet before the 10:15 sweep.", segment: "Enterprise", escalationLevel: "director" },
  { id: "claim-156", queueId: "claims", caseRef: "CLM-156", customer: "Blue Basin Dental", title: "Refund hold waiting on payer trace", detail: "The repayment file is ready, but finance still needs the corrected trace number.", owner: "Nadia", ageMinutes: 93, ageBand: "breach", severity: "medium", nextAction: "Confirm trace ID with finance and release the hold.", segment: "SMB", escalationLevel: "lead" },
  { id: "claim-162", queueId: "claims", caseRef: "CLM-162", customer: "Crown Labs", title: "Manual coding review queued after rule mismatch", detail: "The edit engine split the modifiers into two review branches, leaving one item parked.", owner: "Owen", ageMinutes: 46, ageBand: "aging", severity: "medium", nextAction: "Resolve the modifier branch and re-run coding.", segment: "Mid-market", escalationLevel: "none" },
  { id: "id-404", queueId: "identity", caseRef: "ID-404", customer: "Horizon Clinics", title: "Beneficial-owner document failed checksum on resubmission", detail: "The resubmitted PDF is legible, but the checksum on the uploaded package does not match.", owner: "Theo", ageMinutes: 82, ageBand: "aging", severity: "high", nextAction: "Request a clean upload and hold release until it lands.", segment: "Enterprise", escalationLevel: "lead" },
  { id: "id-417", queueId: "identity", caseRef: "ID-417", customer: "Studio Meridian", title: "Passport image review waiting on secondary verifier", detail: "The first reviewer cleared the image; the second verification slot has not picked it up yet.", owner: "Iris", ageMinutes: 58, ageBand: "aging", severity: "medium", nextAction: "Pull the item into the next trust desk pairing.", segment: "SMB", escalationLevel: "none" },
  { id: "ret-212", queueId: "returns", caseRef: "RET-212", customer: "Evergreen Outfitters", title: "Warehouse exception lacks arrival scan for carton 3", detail: "The return is partially received, but one carton still shows as in transit in the partner feed.", owner: "Liam", ageMinutes: 64, ageBand: "aging", severity: "medium", nextAction: "Confirm the missing scan with the carrier rep.", segment: "Retail", escalationLevel: "lead" },
  { id: "ret-229", queueId: "returns", caseRef: "RET-229", customer: "Paper Kite", title: "Carrier credit request paused on surcharge dispute", detail: "The refund total is agreed, but the surcharge line item is still contested in the handoff notes.", owner: "June", ageMinutes: 39, ageBand: "fresh", severity: "low", nextAction: "Clear the surcharge note and relaunch the credit memo.", segment: "SMB", escalationLevel: "none" },
  { id: "ret-244", queueId: "returns", caseRef: "RET-244", customer: "Northstar Outdoors", title: "Restock rejection sent back for image proof", detail: "The warehouse note references damage, but the proof image never attached to the return record.", owner: "Piper", ageMinutes: 22, ageBand: "fresh", severity: "low", nextAction: "Attach warehouse proof and continue the rejection.", segment: "Retail", escalationLevel: "none" },
  { id: "loy-087", queueId: "loyalty", caseRef: "LOY-087", customer: "Maple & Co.", title: "Points reversal waiting on duplicate-order check", detail: "The order pair is already linked, but the system has not cleared the reversal hold yet.", owner: "Sage", ageMinutes: 31, ageBand: "fresh", severity: "low", nextAction: "Verify duplicate ownership and post the reversal.", segment: "Consumer", escalationLevel: "none" },
  { id: "loy-091", queueId: "loyalty", caseRef: "LOY-091", customer: "Pine Harbor", title: "Tier adjustment pending nightly balance sync", detail: "The requested tier move is ready to post after the next ledger snapshot completes.", owner: "Arlo", ageMinutes: 18, ageBand: "fresh", severity: "low", nextAction: "Carry this item into the overnight sync window.", segment: "Consumer", escalationLevel: "none" },
];
