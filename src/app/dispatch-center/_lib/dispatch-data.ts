export type DispatchBucketTone = "critical" | "priority" | "steady" | "monitor";

export type DispatchBucket = {
  id: string;
  title: string;
  description: string;
  emphasis: string;
  serviceGoal: string;
  tone: DispatchBucketTone;
};

export type DispatchQueue = {
  id: string;
  name: string;
  pendingCount: number;
  dueSoon: number;
  oldestAge: string;
  releaseWindow: string;
  summary: string;
};

export type DispatchOwner = {
  id: string;
  name: string;
  role: string;
  base: string;
  shift: string;
  coverage: string;
  workload: string;
};

export type DispatchAssignmentPriority = "Critical" | "High" | "Planned";

export type DispatchAssignment = {
  id: string;
  reference: string;
  title: string;
  customer: string;
  lane: string;
  origin: string;
  destination: string;
  equipment: string;
  bucketId: string;
  queueId: string;
  ownerId: string;
  priority: DispatchAssignmentPriority;
  statusLabel: string;
  ageLabel: string;
  serviceWindow: string;
  handoffLabel: string;
  riskLabel: string;
  summary: string;
  blockers: string[];
  nextActions: string[];
  tags: string[];
  lastUpdated: string;
};

export const dispatchBuckets: DispatchBucket[] = [
  {
    id: "dispatch-now",
    title: "Dispatch now",
    description:
      "Loads already cleared by planning and waiting on final release or reroute confirmation.",
    emphasis: "Move the oldest critical work before the next outbound wave.",
    serviceGoal: "Release within 20 minutes",
    tone: "critical",
  },
  {
    id: "owner-decision",
    title: "Needs owner decision",
    description:
      "Assignments with a blocker, customer question, or lane tradeoff that needs dispatcher judgment.",
    emphasis: "Pair each assignment with a single owner and decision deadline.",
    serviceGoal: "Resolve within 45 minutes",
    tone: "priority",
  },
  {
    id: "ready-next-wave",
    title: "Ready for next wave",
    description:
      "Freight that is healthy now and staged for the next coordinated release window.",
    emphasis: "Protect service windows while balancing driver reset and yard capacity.",
    serviceGoal: "Release in the next cycle",
    tone: "steady",
  },
  {
    id: "monitor-shift",
    title: "Monitor through shift",
    description:
      "Assignments that are covered for now but still need watchpoints and owner follow-through.",
    emphasis: "Keep watch on dwell, handoffs, and customer commitments.",
    serviceGoal: "Review every 60 minutes",
    tone: "monitor",
  },
];

export const dispatchQueues: DispatchQueue[] = [
  {
    id: "premium-east",
    name: "Premium East",
    pendingCount: 6,
    dueSoon: 3,
    oldestAge: "54 min",
    releaseWindow: "Next release 10:40 ET",
    summary:
      "Priority freight staged between Newark and Allentown with one cold-chain lane trending late.",
  },
  {
    id: "retail-central",
    name: "Retail Central",
    pendingCount: 5,
    dueSoon: 2,
    oldestAge: "41 min",
    releaseWindow: "Next release 09:25 CT",
    summary:
      "Store replenishment loads are balanced, but dock congestion is compressing the noon release window.",
  },
  {
    id: "west-recovery",
    name: "West Recovery",
    pendingCount: 4,
    dueSoon: 1,
    oldestAge: "33 min",
    releaseWindow: "Next release 08:15 PT",
    summary:
      "Recovery lanes are stable after overnight weather, with one handoff still waiting on final owner confirmation.",
  },
];

export const dispatchOwners: DispatchOwner[] = [
  {
    id: "owner-kira",
    name: "Kira Holt",
    role: "Shift lead dispatcher",
    base: "Newark",
    shift: "06:00-14:00 ET",
    coverage: "Premium East and escalations",
    workload: "Owning 3 active releases and 1 customer escalation.",
  },
  {
    id: "owner-marco",
    name: "Marco Alvarez",
    role: "Linehaul coordinator",
    base: "Joliet",
    shift: "05:00-13:00 CT",
    coverage: "Retail Central and next-wave staging",
    workload: "Balancing 2 hot reloads and a four-load noon wave.",
  },
  {
    id: "owner-sanaa",
    name: "Sanaa Brooks",
    role: "Recovery specialist",
    base: "Ontario",
    shift: "04:00-12:00 PT",
    coverage: "West Recovery and exception handling",
    workload: "Tracking 2 handoff risks and one weather watch lane.",
  },
];

export const dispatchAssignments: DispatchAssignment[] = [
  {
    id: "asgmt-nyc-204",
    reference: "DC-204",
    title: "Cold-chain reroute for Manhattan grocery replenishment",
    customer: "Mercury Market",
    lane: "Newark, NJ -> Bronx, NY",
    origin: "Newark crossdock",
    destination: "Bronx grocery cluster",
    equipment: "53' reefer",
    bucketId: "dispatch-now",
    queueId: "premium-east",
    ownerId: "owner-kira",
    priority: "Critical",
    statusLabel: "Carrier locked, waiting on temperature waiver",
    ageLabel: "54 min open",
    serviceWindow: "Deliver by 12:20 ET",
    handoffLabel: "Driver swap in Secaucus",
    riskLabel: "High spoilage risk after 11:35 ET",
    summary:
      "The original tractor dropped for an engine fault, so the load is staged for an immediate reefer swap and waiver call.",
    blockers: [
      "Customer approval needed for a 25-minute delivery slip.",
      "Waiver note has not been attached to the replacement unit.",
    ],
    nextActions: [
      "Call the customer dock lead and confirm the revised ETA.",
      "Attach the waiver to the replacement tractor and release the dispatch.",
    ],
    tags: ["Cold chain", "ETA risk", "Driver swap"],
    lastUpdated: "Updated 7 minutes ago by Kira Holt",
  },
  {
    id: "asgmt-atl-188",
    reference: "DC-188",
    title: "Expedite electronics replenishment ahead of store launch",
    customer: "Northstar Retail",
    lane: "Allentown, PA -> Atlanta, GA",
    origin: "Allentown consolidation yard",
    destination: "Atlanta launch site",
    equipment: "Team straight truck",
    bucketId: "dispatch-now",
    queueId: "premium-east",
    ownerId: "owner-kira",
    priority: "High",
    statusLabel: "All checks complete, waiting on premium release",
    ageLabel: "39 min open",
    serviceWindow: "Arrive by 05:45 ET tomorrow",
    handoffLabel: "Premium release at 10:40 ET",
    riskLabel: "Launch display misses if released after the current wave",
    summary:
      "All linehaul checks are complete and the load is staged with a rested team, but it needs approval into the current premium wave.",
    blockers: [
      "Capacity manager has not signed off on the premium override.",
    ],
    nextActions: [
      "Get premium override approval from the capacity manager.",
      "Release the load with the current eastbound team assignment.",
    ],
    tags: ["Store launch", "Premium wave", "Team driver"],
    lastUpdated: "Updated 11 minutes ago by Kira Holt",
  },
  {
    id: "asgmt-chi-321",
    reference: "DC-321",
    title: "Decide between dock hold or crossdock release for apparel wave",
    customer: "Elm Street Outfitters",
    lane: "Joliet, IL -> Columbus, OH",
    origin: "Joliet retail yard",
    destination: "Columbus reserve facility",
    equipment: "53' dry van",
    bucketId: "owner-decision",
    queueId: "retail-central",
    ownerId: "owner-marco",
    priority: "High",
    statusLabel: "Dock congestion compressing the release slot",
    ageLabel: "41 min open",
    serviceWindow: "Deliver by 06:00 ET tomorrow",
    handoffLabel: "Yard release pending owner call",
    riskLabel: "Dock hold may push the lane into overnight dwell",
    summary:
      "The trailer is loaded, but Joliet dock congestion means dispatch must either hold for a cleaner release or reroute through the crossdock.",
    blockers: [
      "Yard team needs a go or hold call before the 09:25 CT release.",
      "Customer store ops wants confirmation before changing the lane plan.",
    ],
    nextActions: [
      "Choose crossdock release or dock hold before the release window closes.",
      "Send the decision note to store ops and the yard supervisor.",
    ],
    tags: ["Retail wave", "Dock hold", "Owner call"],
    lastUpdated: "Updated 5 minutes ago by Marco Alvarez",
  },
  {
    id: "asgmt-den-090",
    reference: "DC-090",
    title: "Resolve missing hazmat packet before Denver outbound",
    customer: "Summit Industrial",
    lane: "Kansas City, MO -> Denver, CO",
    origin: "Kansas City secure staging",
    destination: "Denver fabrication site",
    equipment: "48' hazmat van",
    bucketId: "owner-decision",
    queueId: "retail-central",
    ownerId: "owner-marco",
    priority: "Critical",
    statusLabel: "Documentation gap holding release",
    ageLabel: "32 min open",
    serviceWindow: "Deliver by 18:10 MT",
    handoffLabel: "Compliance handoff blocked",
    riskLabel: "Driver will time out on the current route plan after 09:50 CT",
    summary:
      "The load is sealed and driver-ready, but the hazmat packet upload failed and compliance has not reissued the final packet.",
    blockers: [
      "Compliance still needs to resend the signed hazmat packet.",
      "Driver cannot depart without packet confirmation in the tablet.",
    ],
    nextActions: [
      "Escalate the packet resend to compliance immediately.",
      "Refresh the driver tablet and confirm packet availability before release.",
    ],
    tags: ["Hazmat", "Compliance", "Driver hours"],
    lastUpdated: "Updated 14 minutes ago by Marco Alvarez",
  },
  {
    id: "asgmt-lax-412",
    reference: "DC-412",
    title: "Stage a healthy next-wave release for media fixtures",
    customer: "Pacific Studio Supply",
    lane: "Ontario, CA -> Los Angeles, CA",
    origin: "Ontario transload",
    destination: "Los Angeles lot staging",
    equipment: "28' pup",
    bucketId: "ready-next-wave",
    queueId: "west-recovery",
    ownerId: "owner-sanaa",
    priority: "Planned",
    statusLabel: "Ready and staged for the 08:15 PT release",
    ageLabel: "18 min open",
    serviceWindow: "Set by 10:30 PT",
    handoffLabel: "Short-haul release next wave",
    riskLabel: "Low risk if released in the next cycle",
    summary:
      "Fixtures are staged at the transload and the short-haul driver is checked in, with no current blockers on the next wave.",
    blockers: [
      "No active blockers. Keep the lane tied to the 08:15 PT release.",
    ],
    nextActions: [
      "Confirm trailer seal at the release cutoff.",
      "Push final release once the west-recovery wave opens.",
    ],
    tags: ["Short haul", "Healthy lane", "Wave staging"],
    lastUpdated: "Updated 8 minutes ago by Sanaa Brooks",
  },
  {
    id: "asgmt-phx-552",
    reference: "DC-552",
    title: "Keep reserve driver coverage warm for a pharmacy lane",
    customer: "Crestline Pharmacy",
    lane: "Ontario, CA -> Phoenix, AZ",
    origin: "Ontario temperature hold",
    destination: "Phoenix pharmacy hub",
    equipment: "53' reefer",
    bucketId: "monitor-shift",
    queueId: "west-recovery",
    ownerId: "owner-sanaa",
    priority: "High",
    statusLabel: "On track with reserve coverage standing by",
    ageLabel: "27 min open",
    serviceWindow: "Deliver by 05:10 MT tomorrow",
    handoffLabel: "Reserve driver on 20-minute notice",
    riskLabel: "Moderate risk if the current driver slips past meal break",
    summary:
      "The lane is healthy, but the team is holding reserve-driver coverage in case the primary driver loses the slot after the meal break.",
    blockers: [
      "Primary driver meal-break timing could force a quick handoff.",
    ],
    nextActions: [
      "Check in with the primary driver at the end of the meal break.",
      "Release the reserve plan if the current ETA is still clean.",
    ],
    tags: ["Reserve coverage", "Pharmacy", "Meal break"],
    lastUpdated: "Updated 6 minutes ago by Sanaa Brooks",
  },
  {
    id: "asgmt-clt-274",
    reference: "DC-274",
    title: "Hold a customer-ready watchpoint on a white-glove delivery",
    customer: "Atelier Home",
    lane: "Greensboro, NC -> Charlotte, NC",
    origin: "Greensboro white-glove hub",
    destination: "Charlotte design district",
    equipment: "26' straight truck",
    bucketId: "monitor-shift",
    queueId: "premium-east",
    ownerId: "owner-kira",
    priority: "Planned",
    statusLabel: "Driver en route, waiting on final dock text alert",
    ageLabel: "21 min open",
    serviceWindow: "Deliver by 15:30 ET",
    handoffLabel: "Customer text alert due at 12:00 ET",
    riskLabel: "Low risk until the final white-glove dock confirmation",
    summary:
      "The stop is moving on time, but the customer wants a final text confirmation before the truck reaches the design district dock.",
    blockers: [
      "Customer dock alert still needs to be sent at noon.",
    ],
    nextActions: [
      "Trigger the dock text alert at 12:00 ET.",
      "Keep the white-glove stop on the watch board until unload starts.",
    ],
    tags: ["White glove", "Customer alert", "Watch board"],
    lastUpdated: "Updated 9 minutes ago by Kira Holt",
  },
];
