export type QueueStatusId =
  | "captured"
  | "triage"
  | "waiting"
  | "in-flight"
  | "ready";

export type QueueEscalation = "steady" | "watch" | "priority" | "sla-risk";

export type QueueOwner = {
  id: string;
  name: string;
  team: string;
  initials: string;
};

export type QueueBoardColumnDefinition = {
  id: QueueStatusId;
  title: string;
  description: string;
  wipLimit: number;
};

export type QueueBoardItem = {
  id: string;
  title: string;
  account: string;
  workflow: string;
  status: QueueStatusId;
  ownerId: QueueOwner["id"];
  ageHours: number;
  checkpoint: string;
  slaWindow: string;
  blocked: boolean;
  blocker?: string;
  escalation: QueueEscalation;
  escalationReason: string;
  notes: string;
  tags: string[];
};

export type QueueMetricTone = "neutral" | "alert" | "critical";

export type QueueBoardMetric = {
  id: string;
  label: string;
  value: string;
  detail: string;
  tone: QueueMetricTone;
};

export type QueueBoardColumn = QueueBoardColumnDefinition & {
  items: (QueueBoardItem & { owner: QueueOwner })[];
  count: number;
  escalatedCount: number;
  blockedCount: number;
};

export type QueueBoardView = {
  metrics: QueueBoardMetric[];
  columns: QueueBoardColumn[];
  escalatedItems: number;
  blockedItems: number;
  totalItems: number;
};

export const queueBoardColumns: QueueBoardColumnDefinition[] = [
  {
    id: "captured",
    title: "Captured",
    description: "Freshly created work that still needs the first ownership pass.",
    wipLimit: 4,
  },
  {
    id: "triage",
    title: "Triage",
    description: "Actively being classified, scoped, or reassigned before execution.",
    wipLimit: 5,
  },
  {
    id: "waiting",
    title: "Waiting",
    description: "Paused on an outside handoff, customer reply, or partner system update.",
    wipLimit: 3,
  },
  {
    id: "in-flight",
    title: "In Flight",
    description: "Execution work is underway with owners actively driving the next checkpoint.",
    wipLimit: 5,
  },
  {
    id: "ready",
    title: "Ready To Close",
    description: "Resolved work that needs final verification or customer confirmation.",
    wipLimit: 4,
  },
];

export const queueOwners: QueueOwner[] = [
  {
    id: "nina-patel",
    name: "Nina Patel",
    team: "Intake Desk",
    initials: "NP",
  },
  {
    id: "marco-silva",
    name: "Marco Silva",
    team: "Workflow Ops",
    initials: "MS",
  },
  {
    id: "talia-brooks",
    name: "Talia Brooks",
    team: "Escalations",
    initials: "TB",
  },
  {
    id: "owen-cho",
    name: "Owen Cho",
    team: "Partner Support",
    initials: "OC",
  },
  {
    id: "yasmin-rao",
    name: "Yasmin Rao",
    team: "Resolution Desk",
    initials: "YR",
  },
];

export const queueBoardItems: QueueBoardItem[] = [
  {
    id: "QB-241",
    title: "Reconcile duplicate shipment hold for Northline Retail",
    account: "Northline Retail",
    workflow: "Warehouse exception",
    status: "captured",
    ownerId: "nina-patel",
    ageHours: 2,
    checkpoint: "Assign triage owner before 10:30 local",
    slaWindow: "8 hours to first action",
    blocked: false,
    escalation: "watch",
    escalationReason: "Repeated exception from the same facility in the last 24 hours.",
    notes: "Two replacement orders are waiting for the hold decision before labels can print.",
    tags: ["Returns", "East hub"],
  },
  {
    id: "QB-244",
    title: "Validate export paperwork mismatch for Aurora Medical",
    account: "Aurora Medical",
    workflow: "Compliance review",
    status: "captured",
    ownerId: "nina-patel",
    ageHours: 1,
    checkpoint: "Check document set against broker feed",
    slaWindow: "12 hours to route",
    blocked: false,
    escalation: "steady",
    escalationReason: "No active escalation; paperwork correction can route through standard review.",
    notes: "Mismatch is limited to package count and can clear with a corrected invoice packet.",
    tags: ["Exports", "Paperwork"],
  },
  {
    id: "QB-229",
    title: "Restore missing ASN events for Granite Foods",
    account: "Granite Foods",
    workflow: "Integration recovery",
    status: "triage",
    ownerId: "marco-silva",
    ageHours: 9,
    checkpoint: "Confirm event replay window with EDI monitor",
    slaWindow: "4 hours to recovery plan",
    blocked: true,
    blocker: "Partner EDI logs have not been re-shared since the overnight outage.",
    escalation: "priority",
    escalationReason: "High-volume account with stores already asking for arrival confirmation.",
    notes: "Three distribution centers are affected, but only one needs same-day replay for shelf resets.",
    tags: ["EDI", "Stores", "Same day"],
  },
  {
    id: "QB-233",
    title: "Approve cold-chain reroute exception for Arcline Health",
    account: "Arcline Health",
    workflow: "Exception approval",
    status: "triage",
    ownerId: "talia-brooks",
    ageHours: 6,
    checkpoint: "Secure medical advisor approval before noon dispatch cutoff",
    slaWindow: "6 hours to approval",
    blocked: false,
    escalation: "watch",
    escalationReason: "Temperature-sensitive order with a narrow dispatch window.",
    notes: "Site team has already accepted the alternate lane if sign-off happens before the truck release.",
    tags: ["Cold chain", "Dispatch"],
  },
  {
    id: "QB-236",
    title: "Review warehouse scan variance for Harbor Mart",
    account: "Harbor Mart",
    workflow: "Variance review",
    status: "triage",
    ownerId: "marco-silva",
    ageHours: 4,
    checkpoint: "Compare scanner logs with handheld backup export",
    slaWindow: "10 hours to disposition",
    blocked: false,
    escalation: "steady",
    escalationReason: "Variance is isolated to one shift and has a clean fallback path.",
    notes: "Only six cases are unaccounted for, and store replenishment stays inside tolerance if confirmed today.",
    tags: ["Inventory", "Audit"],
  },
  {
    id: "QB-221",
    title: "Await signed carrier waiver from Summit Bio",
    account: "Summit Bio",
    workflow: "Carrier waiver",
    status: "waiting",
    ownerId: "owen-cho",
    ageHours: 18,
    checkpoint: "Receive signed waiver before reefer lock expires",
    slaWindow: "2 hours to breach",
    blocked: true,
    blocker: "Customer legal review has not released the final waiver language.",
    escalation: "sla-risk",
    escalationReason: "Release window closes this shift and the reefer capacity cannot be held overnight.",
    notes: "Without the waiver, the load rolls to tomorrow and pushes a lab replenishment order outside target.",
    tags: ["Legal", "Reefer", "Time critical"],
  },
  {
    id: "QB-227",
    title: "Waiting on customs release code for Cobalt Devices",
    account: "Cobalt Devices",
    workflow: "Border clearance",
    status: "waiting",
    ownerId: "owen-cho",
    ageHours: 14,
    checkpoint: "Broker to confirm release code and inspection status",
    slaWindow: "5 hours to detention fees",
    blocked: true,
    blocker: "Broker queue is delayed after a customs system maintenance window.",
    escalation: "priority",
    escalationReason: "Detention charges begin this evening if the trailer is not released.",
    notes: "Destination site can absorb a short delay, but detention cost will hit the account if the trailer sits overnight.",
    tags: ["Broker", "Border", "Fees"],
  },
  {
    id: "QB-214",
    title: "Rebuild delayed label bundle for Cedar & Co.",
    account: "Cedar & Co.",
    workflow: "Label regeneration",
    status: "in-flight",
    ownerId: "yasmin-rao",
    ageHours: 5,
    checkpoint: "Push regenerated bundle to print station by 11:15",
    slaWindow: "7 hours to recovery",
    blocked: false,
    escalation: "steady",
    escalationReason: "Owner has the fix in motion and no downstream stop is expected.",
    notes: "The packaging team already confirmed the printer fleet is healthy after the overnight jam was cleared.",
    tags: ["Labels", "Packaging"],
  },
  {
    id: "QB-218",
    title: "Re-run payment capture sync for Northstar Clinics",
    account: "Northstar Clinics",
    workflow: "Finance sync",
    status: "in-flight",
    ownerId: "yasmin-rao",
    ageHours: 7,
    checkpoint: "Validate remittance batch before the next reconciliation sweep",
    slaWindow: "6 hours to customer statement miss",
    blocked: false,
    escalation: "watch",
    escalationReason: "Customer statement timing is sensitive even though the retry path exists.",
    notes: "The sync can still land inside the daily statement window if the batch validates on the first replay.",
    tags: ["Payments", "Retry"],
  },
  {
    id: "QB-220",
    title: "Escalate missed pickup credit memo for Atlas Home",
    account: "Atlas Home",
    workflow: "Credit memo",
    status: "in-flight",
    ownerId: "talia-brooks",
    ageHours: 11,
    checkpoint: "Finance lead to approve customer credit before 15:00",
    slaWindow: "3 hours to callback commitment",
    blocked: false,
    escalation: "priority",
    escalationReason: "Customer success has already promised a same-day callback with credit status.",
    notes: "Approval path is short, but the account team needs an answer before their renewal check-in this afternoon.",
    tags: ["Credits", "Renewal"],
  },
  {
    id: "QB-205",
    title: "Confirm reroute credit posted for Luma Outdoor",
    account: "Luma Outdoor",
    workflow: "Post-resolution check",
    status: "ready",
    ownerId: "yasmin-rao",
    ageHours: 3,
    checkpoint: "Verify ledger update and send closure note",
    slaWindow: "Close today",
    blocked: false,
    escalation: "steady",
    escalationReason: "All corrective work is done; only confirmation remains.",
    notes: "Finance already sees the adjustment, so this should close as soon as the customer note is sent.",
    tags: ["Closure", "Finance"],
  },
  {
    id: "QB-209",
    title: "Close incident after customer sign-off for Helio Labs",
    account: "Helio Labs",
    workflow: "Customer confirmation",
    status: "ready",
    ownerId: "talia-brooks",
    ageHours: 8,
    checkpoint: "Collect final sign-off from site lead",
    slaWindow: "Waiting on confirmation",
    blocked: false,
    escalation: "watch",
    escalationReason: "Closure is delayed only by customer acknowledgement.",
    notes: "The fix has been stable since yesterday, but the incident cannot close until the lab manager replies.",
    tags: ["Customer", "Resolution"],
  },
];

function isEscalated(item: QueueBoardItem) {
  return item.escalation !== "steady";
}

function getOwner(ownerId: QueueOwner["id"]) {
  const owner = queueOwners.find((candidate) => candidate.id === ownerId);

  if (!owner) {
    throw new Error(`Queue owner not found for id: ${ownerId}`);
  }

  return owner;
}

export function getQueueBoardView(
  items: QueueBoardItem[] = queueBoardItems,
): QueueBoardView {
  const totalItems = items.length;
  const escalatedItems = items.filter(isEscalated).length;
  const blockedItems = items.filter((item) => item.blocked).length;
  const slaRiskItems = items.filter((item) => item.escalation === "sla-risk").length;
  const agingItems = items.filter((item) => item.ageHours >= 8).length;

  const columns = queueBoardColumns.map((column) => {
    const columnItems = items
      .filter((item) => item.status === column.id)
      .map((item) => ({
        ...item,
        owner: getOwner(item.ownerId),
      }));

    return {
      ...column,
      items: columnItems,
      count: columnItems.length,
      escalatedCount: columnItems.filter(isEscalated).length,
      blockedCount: columnItems.filter((item) => item.blocked).length,
    };
  });

  return {
    metrics: [
      {
        id: "open-items",
        label: "Open items",
        value: String(totalItems),
        detail: "Active work currently visible across the board.",
        tone: "neutral",
      },
      {
        id: "escalated",
        label: "Escalated now",
        value: String(escalatedItems),
        detail: "Items carrying watch, priority, or SLA-risk markers.",
        tone: "alert",
      },
      {
        id: "blocked",
        label: "Blocked handoffs",
        value: String(blockedItems),
        detail: "Cards paused on partner, broker, or customer dependencies.",
        tone: blockedItems > 0 ? "alert" : "neutral",
      },
      {
        id: "aging",
        label: "Aging 8h+",
        value: String(agingItems),
        detail: "Work that has been sitting long enough to require visible attention.",
        tone: agingItems > 2 || slaRiskItems > 0 ? "critical" : "alert",
      },
    ],
    columns,
    escalatedItems,
    blockedItems,
    totalItems,
  };
}
