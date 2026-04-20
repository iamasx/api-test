export type IncidentSeverity = "critical" | "high" | "medium" | "low";
export type IncidentSeverityFilter = IncidentSeverity | "all";
export type ResponderStatus = "On bridge" | "Deploying" | "Relief" | "Monitoring";
export type OwnershipState =
  | "Bridge lead"
  | "Shared bridge"
  | "Escalated"
  | "Pending handoff"
  | "Follow-up owner";
export type ActionState =
  | "Queued"
  | "In progress"
  | "Blocked"
  | "Ready to hand off"
  | "Done";
export type EscalationLaneStatus =
  | "Standby"
  | "Warming"
  | "Engaged"
  | "Handoff"
  | "Watch";
export type HandoffStatus =
  | "Drafting brief"
  | "Awaiting acknowledgment"
  | "Acknowledged"
  | "Closed out";
export type ChecklistState = "Ready" | "Pending" | "Blocked";

export const incidentStageOrder = [
  "signal",
  "triage",
  "containment",
  "handoff",
  "watch",
] as const;

export type IncidentStageId = (typeof incidentStageOrder)[number];

export type SeverityLevel = {
  id: IncidentSeverity;
  label: string;
  summary: string;
  badgeClass: string;
  surfaceClass: string;
};

export type IncidentStage = {
  id: IncidentStageId;
  label: string;
  shortLabel: string;
  summary: string;
  badgeClass: string;
  surfaceClass: string;
};

export type IncidentAction = {
  id: string;
  title: string;
  detail: string;
  ownerId: string;
  lane: string;
  state: ActionState;
};

export type EscalationLane = {
  id: string;
  label: string;
  team: string;
  status: EscalationLaneStatus;
  summary: string;
  coverage: string;
  nextCheck: string;
  responderIds: string[];
};

export type HandoffChecklistItem = {
  id: string;
  label: string;
  status: ChecklistState;
};

export type HandoffRecord = {
  title: string;
  summary: string;
  lane: string;
  eta: string;
  risk: string;
  status: HandoffStatus;
  outgoingOwnerId: string;
  incomingOwnerId: string;
  checklist: HandoffChecklistItem[];
};

export type OwnershipSnapshot = {
  primaryOwnerId: string;
  coordinatorId: string;
  lane: string;
  state: OwnershipState;
  summary: string;
  nextReview: string;
};

export type IncidentWorkflowStage = {
  stageId: IncidentStageId;
  status: string;
  stageFocus: string;
  activeTask: string;
  ownership: OwnershipSnapshot;
  lanes: EscalationLane[];
  actions: IncidentAction[];
  handoff: HandoffRecord;
};

export type TimelineEntry = {
  id: string;
  incidentId: string;
  stageId: IncidentStageId;
  kind: string;
  title: string;
  detail: string;
  at: string;
  channel: string;
  responderIds: string[];
};

export type IncidentRecord = {
  id: string;
  code: string;
  title: string;
  service: string;
  severity: IncidentSeverity;
  openedAt: string;
  lead: string;
  region: string;
  affectedUsers: string;
  summary: string;
  responderIds: string[];
  initialStageId: IncidentStageId;
  workflow: IncidentWorkflowStage[];
  timeline: TimelineEntry[];
};

export type ResponderRecord = {
  id: string;
  name: string;
  role: string;
  team: string;
  status: ResponderStatus;
  zone: string;
  shift: string;
  specialties: string[];
  note: string;
};

export const incidentSeverities = [
  {
    id: "critical",
    label: "Critical",
    summary: "Customer-impacting and actively mitigating.",
    badgeClass: "border border-rose-400/30 bg-rose-500/15 text-rose-100",
    surfaceClass: "bg-rose-500/10 text-rose-100 ring-rose-400/30",
  },
  {
    id: "high",
    label: "High",
    summary: "Escalated and tracking a recovery owner.",
    badgeClass: "border border-orange-300/30 bg-orange-400/15 text-orange-50",
    surfaceClass: "bg-orange-400/10 text-orange-100 ring-orange-300/30",
  },
  {
    id: "medium",
    label: "Medium",
    summary: "Contained but still consuming operator time.",
    badgeClass: "border border-amber-300/30 bg-amber-400/15 text-amber-50",
    surfaceClass: "bg-amber-400/10 text-amber-100 ring-amber-300/30",
  },
  {
    id: "low",
    label: "Low",
    summary: "Observed and held in an active watch lane.",
    badgeClass: "border border-cyan-300/30 bg-cyan-400/15 text-cyan-50",
    surfaceClass: "bg-cyan-400/10 text-cyan-100 ring-cyan-300/30",
  },
] satisfies SeverityLevel[];

export const incidentStages = [
  {
    id: "signal",
    label: "Signal",
    shortLabel: "Detect",
    summary: "Verify blast radius, freeze risky changes, and open the bridge.",
    badgeClass: "border border-sky-300/30 bg-sky-400/15 text-sky-100",
    surfaceClass: "bg-sky-400/10 text-sky-100 ring-sky-300/30",
  },
  {
    id: "triage",
    label: "Triage",
    shortLabel: "Scope",
    summary: "Pin a primary owner, line up specialists, and choose the first mitigation lane.",
    badgeClass: "border border-indigo-300/30 bg-indigo-400/15 text-indigo-100",
    surfaceClass: "bg-indigo-400/10 text-indigo-100 ring-indigo-300/30",
  },
  {
    id: "containment",
    label: "Containment",
    shortLabel: "Stabilize",
    summary: "Run the active mitigation plan and keep the blast radius from widening.",
    badgeClass: "border border-emerald-300/30 bg-emerald-400/15 text-emerald-100",
    surfaceClass: "bg-emerald-400/10 text-emerald-100 ring-emerald-300/30",
  },
  {
    id: "handoff",
    label: "Handoff",
    shortLabel: "Transfer",
    summary: "Package context, transfer ownership, and confirm acknowledgment from the receiving lane.",
    badgeClass: "border border-fuchsia-300/30 bg-fuchsia-400/15 text-fuchsia-100",
    surfaceClass: "bg-fuchsia-400/10 text-fuchsia-100 ring-fuchsia-300/30",
  },
  {
    id: "watch",
    label: "Watch",
    shortLabel: "Monitor",
    summary: "Hold follow-up ownership, watch regression indicators, and retire extra escalation lanes.",
    badgeClass: "border border-cyan-300/30 bg-cyan-400/15 text-cyan-100",
    surfaceClass: "bg-cyan-400/10 text-cyan-100 ring-cyan-300/30",
  },
] satisfies IncidentStage[];

export const incidentResponders = [
  {
    id: "maya-tran",
    name: "Maya Tran",
    role: "Incident commander",
    team: "Core platform",
    status: "On bridge",
    zone: "UTC-7",
    shift: "Primary command",
    specialties: ["Traffic shaping", "Rollback control"],
    note: "Holding the bridge narrative together while mitigation owners rotate in and out.",
  },
  {
    id: "jonah-price",
    name: "Jonah Price",
    role: "Database on-call",
    team: "Data systems",
    status: "Deploying",
    zone: "UTC-5",
    shift: "Mitigation owner",
    specialties: ["Replica recovery", "Failover checks"],
    note: "Treats every recovery plan like a lease-management problem and keeps rollback options explicit.",
  },
  {
    id: "leila-ortega",
    name: "Leila Ortega",
    role: "Edge specialist",
    team: "Network runtime",
    status: "On bridge",
    zone: "UTC+1",
    shift: "Regional escalation",
    specialties: ["Cache routing", "Token propagation"],
    note: "Tracks propagation drift between POPs and the bridge summary with almost no latency.",
  },
  {
    id: "cameron-reeves",
    name: "Cameron Reeves",
    role: "Comms lead",
    team: "Customer ops",
    status: "Monitoring",
    zone: "UTC-4",
    shift: "Status pacing",
    specialties: ["Status updates", "Escalation pacing"],
    note: "Keeps customer messaging as narrow as possible until the receiving lane explicitly accepts ownership.",
  },
  {
    id: "talia-brooks",
    name: "Talia Brooks",
    role: "Queue response",
    team: "Workflow control",
    status: "Relief",
    zone: "UTC-6",
    shift: "Replay control",
    specialties: ["Backlog draining", "Replay safety"],
    note: "Protects duplicate suppression first and worries about throughput second.",
  },
  {
    id: "owen-singh",
    name: "Owen Singh",
    role: "Delivery analyst",
    team: "Partner systems",
    status: "Monitoring",
    zone: "UTC+5:30",
    shift: "Partner liaison",
    specialties: ["Webhook fan-out", "Partner retry policy"],
    note: "Can usually tell whether a partner escalation will convert into customer impact before the queue does.",
  },
  {
    id: "iris-chen",
    name: "Iris Chen",
    role: "Service operations lead",
    team: "Service operations",
    status: "On bridge",
    zone: "UTC+8",
    shift: "Regional coordinator",
    specialties: ["Follow-the-sun coverage", "Escalation routing"],
    note: "Owns the receiving side of handoffs and closes gaps in escalation coverage between regions.",
  },
  {
    id: "samir-dutta",
    name: "Samir Dutta",
    role: "Follow-the-sun lead",
    team: "Platform reliability",
    status: "Deploying",
    zone: "UTC+5:30",
    shift: "Transfer owner",
    specialties: ["Recovery watch", "Bridge packet review"],
    note: "Prefers handoffs with explicit stop conditions, owner lists, and rollback constraints already attached.",
  },
] satisfies ResponderRecord[];

export const incidents = [
  {
    id: "deck-441",
    code: "INC-441",
    title: "Checkout token refresh failures spike in the primary lane",
    service: "payments-api",
    severity: "critical",
    openedAt: "09:12 UTC",
    lead: "Maya Tran",
    region: "us-east / eu-west",
    affectedUsers: "11% checkout attempts",
    summary: "Edge-issued refresh tokens begin expiring ahead of session rollover after a hot shard rebalance.",
    responderIds: [
      "maya-tran",
      "jonah-price",
      "leila-ortega",
      "cameron-reeves",
      "samir-dutta",
    ],
    initialStageId: "triage",
    workflow: [
      {
        stageId: "signal",
        status: "Investigating",
        stageFocus:
          "Freeze risky writes, verify shard skew, and decide whether the issue is auth cache or replica drift.",
        activeTask:
          "Confirm the token-expiry spike on hot shards and keep the config promotion guardrail closed.",
        ownership: {
          primaryOwnerId: "maya-tran",
          coordinatorId: "cameron-reeves",
          lane: "Primary bridge",
          state: "Bridge lead",
          summary: "Bridge command stays centralized while the first mitigation owners are paged in.",
          nextReview: "09:18 UTC",
        },
        lanes: [
          {
            id: "deck-441-signal-platform",
            label: "Auth platform lane",
            team: "Core platform",
            status: "Engaged",
            summary: "Lock the rollout window and verify whether cache eviction changed with the rebalance.",
            coverage: "Bridge commander + auth owners",
            nextCheck: "09:16 UTC",
            responderIds: ["maya-tran"],
          },
          {
            id: "deck-441-signal-data",
            label: "Replica validation lane",
            team: "Data systems",
            status: "Warming",
            summary: "Check for follower lag before blaming token churn exclusively on the edge layer.",
            coverage: "Database on-call",
            nextCheck: "09:17 UTC",
            responderIds: ["jonah-price"],
          },
          {
            id: "deck-441-signal-comms",
            label: "Customer comms lane",
            team: "Customer ops",
            status: "Standby",
            summary: "Hold messaging while the bridge confirms whether customer sessions are recovering on retry.",
            coverage: "Status desk",
            nextCheck: "09:20 UTC",
            responderIds: ["cameron-reeves"],
          },
        ],
        actions: [
          {
            id: "deck-441-signal-1",
            title: "Confirm shard-level blast radius",
            detail: "Split monitor failures by hot shard and by region before assigning the first mitigation lane.",
            ownerId: "maya-tran",
            lane: "Primary bridge",
            state: "In progress",
          },
          {
            id: "deck-441-signal-2",
            title: "Pause the config promotion",
            detail: "Prevent the latest cache policy from widening while bridge notes are still incomplete.",
            ownerId: "maya-tran",
            lane: "Rollback control",
            state: "Done",
          },
          {
            id: "deck-441-signal-3",
            title: "Open replica drift checks",
            detail: "Validate whether stale lease holders are preserving old token state on replica followers.",
            ownerId: "jonah-price",
            lane: "Replica validation",
            state: "Queued",
          },
        ],
        handoff: {
          title: "Prepare the containment brief",
          summary: "Package the bridge timeline and rollout guardrails before handing the live fix to the data lane.",
          lane: "Primary bridge to data systems",
          eta: "Within 8 min",
          risk: "Replica lag can mask token recovery and produce a false clean canary.",
          status: "Drafting brief",
          outgoingOwnerId: "maya-tran",
          incomingOwnerId: "jonah-price",
          checklist: [
            {
              id: "deck-441-signal-check-1",
              label: "Hot-shard symptom summary attached",
              status: "Ready",
            },
            {
              id: "deck-441-signal-check-2",
              label: "Rollback guardrail status attached",
              status: "Pending",
            },
            {
              id: "deck-441-signal-check-3",
              label: "External status draft reviewed",
              status: "Pending",
            },
          ],
        },
      },
      {
        stageId: "triage",
        status: "Stabilizing",
        stageFocus:
          "Run the first fix under command supervision and keep comms narrow while the canary is still noisy.",
        activeTask:
          "Patch the auth cache eviction window and hold traffic below 10% until replica lag flattens.",
        ownership: {
          primaryOwnerId: "maya-tran",
          coordinatorId: "cameron-reeves",
          lane: "Cross-region bridge",
          state: "Escalated",
          summary: "Platform command stays with Maya while data, edge, and comms lanes all join the bridge.",
          nextReview: "09:28 UTC",
        },
        lanes: [
          {
            id: "deck-441-triage-platform",
            label: "Auth platform lane",
            team: "Core platform",
            status: "Engaged",
            summary: "Patch cache eviction and pin the rollout until token burn settles.",
            coverage: "Incident command",
            nextCheck: "09:24 UTC",
            responderIds: ["maya-tran"],
          },
          {
            id: "deck-441-triage-data",
            label: "Replica recovery lane",
            team: "Data systems",
            status: "Engaged",
            summary: "Drain stale lease holders and confirm that replica lag is no longer amplifying failures.",
            coverage: "Database on-call",
            nextCheck: "09:25 UTC",
            responderIds: ["jonah-price"],
          },
          {
            id: "deck-441-triage-edge",
            label: "Edge parity lane",
            team: "Network runtime",
            status: "Warming",
            summary: "Verify standby POP parity before traffic expands past the held canary window.",
            coverage: "Regional edge specialist",
            nextCheck: "09:27 UTC",
            responderIds: ["leila-ortega"],
          },
          {
            id: "deck-441-triage-comms",
            label: "Customer comms lane",
            team: "Customer ops",
            status: "Engaged",
            summary: "Keep the status banner at investigating until the next burn sample completes.",
            coverage: "Status desk",
            nextCheck: "09:30 UTC",
            responderIds: ["cameron-reeves"],
          },
        ],
        actions: [
          {
            id: "deck-441-triage-1",
            title: "Canary the cache eviction patch",
            detail: "Run the narrowed eviction window at 10% traffic with a rollback threshold tied to session burn.",
            ownerId: "maya-tran",
            lane: "Auth platform lane",
            state: "In progress",
          },
          {
            id: "deck-441-triage-2",
            title: "Purge stale replica lease holders",
            detail: "Remove follower-side token state that is surviving longer than the new auth lease window.",
            ownerId: "jonah-price",
            lane: "Replica recovery lane",
            state: "In progress",
          },
          {
            id: "deck-441-triage-3",
            title: "Shadow POP parity after the config hold",
            detail: "Check issuer-bundle parity before the canary widens beyond a safe rollback scope.",
            ownerId: "leila-ortega",
            lane: "Edge parity lane",
            state: "Queued",
          },
          {
            id: "deck-441-triage-4",
            title: "Hold customer messaging at investigating",
            detail: "Avoid over-promising recovery before the follow-the-sun lane is staged for transfer.",
            ownerId: "cameron-reeves",
            lane: "Customer comms lane",
            state: "Ready to hand off",
          },
        ],
        handoff: {
          title: "Draft the follow-the-sun bridge packet",
          summary: "Start collecting rollback notes, POP parity checks, and canary guardrails for the later transfer.",
          lane: "Primary bridge to platform reliability",
          eta: "Within 20 min",
          risk: "A region-specific regression could reopen the incident after the command lane rotates out.",
          status: "Awaiting acknowledgment",
          outgoingOwnerId: "maya-tran",
          incomingOwnerId: "samir-dutta",
          checklist: [
            {
              id: "deck-441-triage-check-1",
              label: "Mitigation timeline summarized",
              status: "Ready",
            },
            {
              id: "deck-441-triage-check-2",
              label: "Rollback thresholds attached",
              status: "Ready",
            },
            {
              id: "deck-441-triage-check-3",
              label: "Regional watch owners confirmed",
              status: "Pending",
            },
          ],
        },
      },
      {
        stageId: "containment",
        status: "Containing",
        stageFocus:
          "Keep the fix stable long enough to separate the recovery owner from the bridge commander.",
        activeTask:
          "Widen the patch to 50% traffic, hold replica lag below threshold, and prep the watch transfer packet.",
        ownership: {
          primaryOwnerId: "jonah-price",
          coordinatorId: "maya-tran",
          lane: "Mitigation bridge",
          state: "Shared bridge",
          summary: "Jonah owns the live containment work while Maya still holds command and rollback authority.",
          nextReview: "09:41 UTC",
        },
        lanes: [
          {
            id: "deck-441-containment-platform",
            label: "Patch rollout lane",
            team: "Core platform",
            status: "Engaged",
            summary: "Widen the narrowed cache policy while rollback remains one click away on the bridge.",
            coverage: "Commander + platform lane",
            nextCheck: "09:37 UTC",
            responderIds: ["maya-tran"],
          },
          {
            id: "deck-441-containment-data",
            label: "Replica recovery lane",
            team: "Data systems",
            status: "Engaged",
            summary: "Validate follower lag and close the stale lease window before the canary widens again.",
            coverage: "Database on-call",
            nextCheck: "09:39 UTC",
            responderIds: ["jonah-price"],
          },
          {
            id: "deck-441-containment-edge",
            label: "Edge parity lane",
            team: "Network runtime",
            status: "Engaged",
            summary: "Watch POP-level session issuance and block any region from reopening the failure mode.",
            coverage: "Edge specialist",
            nextCheck: "09:40 UTC",
            responderIds: ["leila-ortega"],
          },
          {
            id: "deck-441-containment-comms",
            label: "Customer comms lane",
            team: "Customer ops",
            status: "Warming",
            summary: "Prepare the next customer update, but keep it unpublished until the watch owner is named.",
            coverage: "Status desk",
            nextCheck: "09:44 UTC",
            responderIds: ["cameron-reeves"],
          },
        ],
        actions: [
          {
            id: "deck-441-containment-1",
            title: "Widen traffic to the stable canary",
            detail: "Expand only after replica lag and auth burn both stay inside the handoff envelope.",
            ownerId: "maya-tran",
            lane: "Patch rollout lane",
            state: "In progress",
          },
          {
            id: "deck-441-containment-2",
            title: "Verify follower lag stays below the watch line",
            detail: "Use the cleanest replica set as the gate for any later transfer of ownership.",
            ownerId: "jonah-price",
            lane: "Replica recovery lane",
            state: "In progress",
          },
          {
            id: "deck-441-containment-3",
            title: "Capture POP parity screenshots",
            detail: "Attach proof that standby nodes are no longer serving the stale issuer bundle.",
            ownerId: "leila-ortega",
            lane: "Edge parity lane",
            state: "Ready to hand off",
          },
          {
            id: "deck-441-containment-4",
            title: "Write the outgoing bridge summary",
            detail: "Describe the stop conditions and the exact rollback command for the receiving follow-up owner.",
            ownerId: "cameron-reeves",
            lane: "Customer comms lane",
            state: "Queued",
          },
        ],
        handoff: {
          title: "Transfer bridge packet and rollback notes to the follow-the-sun reliability pod",
          summary: "Move the incident from active containment into a named watch owner without losing rollback confidence.",
          lane: "Mitigation bridge to platform reliability",
          eta: "Within 12 min",
          risk: "A late session burn in EU can still require Maya to reclaim command.",
          status: "Awaiting acknowledgment",
          outgoingOwnerId: "maya-tran",
          incomingOwnerId: "samir-dutta",
          checklist: [
            {
              id: "deck-441-containment-check-1",
              label: "POP parity evidence attached",
              status: "Ready",
            },
            {
              id: "deck-441-containment-check-2",
              label: "Rollback trigger documented",
              status: "Ready",
            },
            {
              id: "deck-441-containment-check-3",
              label: "Receiving owner joined the bridge",
              status: "Pending",
            },
          ],
        },
      },
      {
        stageId: "handoff",
        status: "Transferring ownership",
        stageFocus:
          "Make the receiver explicit, close any ambiguous tasks, and preserve the rollback path for one more review cycle.",
        activeTask:
          "Complete the transfer packet, confirm acknowledgment from Samir, and hold EU watch coverage for one more interval.",
        ownership: {
          primaryOwnerId: "samir-dutta",
          coordinatorId: "cameron-reeves",
          lane: "Follow-the-sun watch",
          state: "Pending handoff",
          summary: "Samir is accepting the watch lane while Cameron tracks the acknowledgment and update cadence.",
          nextReview: "09:55 UTC",
        },
        lanes: [
          {
            id: "deck-441-handoff-platform",
            label: "Transfer lane",
            team: "Platform reliability",
            status: "Handoff",
            summary: "Review the bridge packet, confirm rollback handles, and pick the watch checkpoint cadence.",
            coverage: "Receiving owner",
            nextCheck: "09:50 UTC",
            responderIds: ["samir-dutta"],
          },
          {
            id: "deck-441-handoff-edge",
            label: "Regional watch lane",
            team: "Network runtime",
            status: "Engaged",
            summary: "Stay live on EU edge metrics until the receiving pod confirms confidence in the watch plan.",
            coverage: "Edge specialist",
            nextCheck: "09:51 UTC",
            responderIds: ["leila-ortega"],
          },
          {
            id: "deck-441-handoff-comms",
            label: "Status lane",
            team: "Customer ops",
            status: "Engaged",
            summary: "Move messaging from investigating to monitoring only after the handoff is explicitly accepted.",
            coverage: "Status desk",
            nextCheck: "09:54 UTC",
            responderIds: ["cameron-reeves"],
          },
        ],
        actions: [
          {
            id: "deck-441-handoff-1",
            title: "Review rollback handles with the receiver",
            detail: "Walk through the exact revert conditions so command can be reclaimed without ambiguity.",
            ownerId: "samir-dutta",
            lane: "Transfer lane",
            state: "In progress",
          },
          {
            id: "deck-441-handoff-2",
            title: "Hold EU session watch coverage",
            detail: "Keep one specialist live on the regional dashboard through the first transfer interval.",
            ownerId: "leila-ortega",
            lane: "Regional watch lane",
            state: "In progress",
          },
          {
            id: "deck-441-handoff-3",
            title: "Publish narrowed monitoring copy",
            detail: "State that mitigation is holding while the incident transitions to a watch owner.",
            ownerId: "cameron-reeves",
            lane: "Status lane",
            state: "Ready to hand off",
          },
        ],
        handoff: {
          title: "Receiving owner acknowledgment",
          summary: "Samir has the bridge packet, rollback steps, and the named watch targets for the next interval.",
          lane: "Platform reliability acceptance",
          eta: "Acknowledged",
          risk: "Only an EU regression above the rollback line should reopen bridge command.",
          status: "Acknowledged",
          outgoingOwnerId: "maya-tran",
          incomingOwnerId: "samir-dutta",
          checklist: [
            {
              id: "deck-441-handoff-check-1",
              label: "Receiver acknowledged rollback guardrails",
              status: "Ready",
            },
            {
              id: "deck-441-handoff-check-2",
              label: "Status copy updated to monitoring",
              status: "Ready",
            },
            {
              id: "deck-441-handoff-check-3",
              label: "Regional watch checkpoint scheduled",
              status: "Ready",
            },
          ],
        },
      },
      {
        stageId: "watch",
        status: "Monitoring",
        stageFocus:
          "Keep regression indicators visible, retire extra lanes, and leave one owner accountable for re-entry conditions.",
        activeTask:
          "Watch EU token refresh success for two more intervals and retire the live bridge if no rollback line is crossed.",
        ownership: {
          primaryOwnerId: "samir-dutta",
          coordinatorId: "cameron-reeves",
          lane: "Follow-up watch",
          state: "Follow-up owner",
          summary: "The bridge is closed, but the follow-the-sun pod still owns re-entry criteria and watch cadence.",
          nextReview: "10:18 UTC",
        },
        lanes: [
          {
            id: "deck-441-watch-platform",
            label: "Watch owner lane",
            team: "Platform reliability",
            status: "Watch",
            summary: "Review session burn and rollback triggers every interval until the watch expires.",
            coverage: "Follow-the-sun lead",
            nextCheck: "10:02 UTC",
            responderIds: ["samir-dutta"],
          },
          {
            id: "deck-441-watch-edge",
            label: "Regional edge lane",
            team: "Network runtime",
            status: "Watch",
            summary: "Remain available for one more checkpoint, then drop to standby if parity holds.",
            coverage: "Edge specialist",
            nextCheck: "10:05 UTC",
            responderIds: ["leila-ortega"],
          },
          {
            id: "deck-441-watch-comms",
            label: "Customer comms lane",
            team: "Customer ops",
            status: "Standby",
            summary: "Only re-engage if the watch owner reopens the incident or customer impact returns.",
            coverage: "Status desk",
            nextCheck: "On demand",
            responderIds: ["cameron-reeves"],
          },
        ],
        actions: [
          {
            id: "deck-441-watch-1",
            title: "Run two more regional burn reviews",
            detail: "Verify that EU session success remains above the recovery threshold after bridge close.",
            ownerId: "samir-dutta",
            lane: "Watch owner lane",
            state: "In progress",
          },
          {
            id: "deck-441-watch-2",
            title: "Retire live edge coverage",
            detail: "Move Leila out of active watch if the next parity sample stays green.",
            ownerId: "leila-ortega",
            lane: "Regional edge lane",
            state: "Queued",
          },
          {
            id: "deck-441-watch-3",
            title: "Close the bridge summary",
            detail: "Capture the final watch owner, stop conditions, and post-incident follow-up note.",
            ownerId: "cameron-reeves",
            lane: "Customer comms lane",
            state: "Done",
          },
        ],
        handoff: {
          title: "Watch ownership settled",
          summary: "The bridge transfer is complete and the follow-up owner is accountable for any re-entry decision.",
          lane: "Closed transfer",
          eta: "Completed",
          risk: "Late session churn remains the only material reopen signal.",
          status: "Closed out",
          outgoingOwnerId: "maya-tran",
          incomingOwnerId: "samir-dutta",
          checklist: [
            {
              id: "deck-441-watch-check-1",
              label: "Watch owner recorded",
              status: "Ready",
            },
            {
              id: "deck-441-watch-check-2",
              label: "Extra bridge lanes retired",
              status: "Ready",
            },
            {
              id: "deck-441-watch-check-3",
              label: "Re-entry rule documented",
              status: "Ready",
            },
          ],
        },
      },
    ],
    timeline: [
      {
        id: "deck-441-signal-entry",
        incidentId: "deck-441",
        stageId: "signal",
        kind: "Detection",
        title: "Synthetic checkout monitors cross the burn budget",
        detail: "Token refresh failures jump on hot shards and the rollout guardrail halts the active promotion.",
        at: "09:14 UTC",
        channel: "signal-bus",
        responderIds: ["maya-tran"],
      },
      {
        id: "deck-441-triage-entry",
        incidentId: "deck-441",
        stageId: "triage",
        kind: "Triage",
        title: "Cross-region bridge opens and shard lease drift is confirmed",
        detail: "The bridge splits work into auth, data, edge, and comms lanes while the first canary remains pinned.",
        at: "09:23 UTC",
        channel: "ops-bridge",
        responderIds: ["maya-tran", "jonah-price", "cameron-reeves"],
      },
      {
        id: "deck-441-containment-entry",
        incidentId: "deck-441",
        stageId: "containment",
        kind: "Containment",
        title: "Cache eviction patch reaches 50% canary without new auth loss",
        detail: "Replica lag stays inside the watch line and POP parity stabilizes across the held regions.",
        at: "09:38 UTC",
        channel: "mitigation-room",
        responderIds: ["maya-tran", "jonah-price", "leila-ortega"],
      },
      {
        id: "deck-441-handoff-entry",
        incidentId: "deck-441",
        stageId: "handoff",
        kind: "Handoff",
        title: "Follow-the-sun pod accepts recovery watch with rollback notes",
        detail: "Samir acknowledges the bridge packet and Cameron narrows customer messaging to monitoring.",
        at: "09:49 UTC",
        channel: "handoff-desk",
        responderIds: ["samir-dutta", "cameron-reeves"],
      },
      {
        id: "deck-441-watch-entry",
        incidentId: "deck-441",
        stageId: "watch",
        kind: "Monitoring",
        title: "Status page drops to monitoring as token refresh success normalizes",
        detail: "The watch owner keeps EU regression checks active while the rest of the bridge begins to stand down.",
        at: "10:03 UTC",
        channel: "status-page",
        responderIds: ["samir-dutta", "cameron-reeves"],
      },
    ],
  },
  {
    id: "deck-438",
    code: "INC-438",
    title: "Edge auth config drift holds back new session issuance",
    service: "gateway-edge",
    severity: "high",
    openedAt: "09:37 UTC",
    lead: "Leila Ortega",
    region: "ap-south / eu-central",
    affectedUsers: "4 regional POPs",
    summary: "A delayed config propagation wave leaves standby nodes serving an outdated issuer bundle.",
    responderIds: [
      "leila-ortega",
      "maya-tran",
      "cameron-reeves",
      "iris-chen",
      "samir-dutta",
    ],
    initialStageId: "containment",
    workflow: [
      {
        stageId: "signal",
        status: "Investigating",
        stageFocus:
          "Prove that the drift is isolated to standby POPs before starting any broad regional messaging.",
        activeTask:
          "Lock the affected standby nodes out of rotation and confirm issuer-bundle mismatch on the edge.",
        ownership: {
          primaryOwnerId: "leila-ortega",
          coordinatorId: "cameron-reeves",
          lane: "Edge bridge",
          state: "Bridge lead",
          summary: "Leila owns the bridge until regional service operations can stage a receiving pod.",
          nextReview: "09:45 UTC",
        },
        lanes: [
          {
            id: "deck-438-signal-edge",
            label: "POP isolation lane",
            team: "Network runtime",
            status: "Engaged",
            summary: "Pin traffic away from the stale standby nodes before the issuer mismatch can spread.",
            coverage: "Edge specialist",
            nextCheck: "09:43 UTC",
            responderIds: ["leila-ortega"],
          },
          {
            id: "deck-438-signal-platform",
            label: "Bridge support lane",
            team: "Core platform",
            status: "Warming",
            summary: "Confirm that central config is healthy so the bridge can keep scope strictly regional.",
            coverage: "Commander assist",
            nextCheck: "09:46 UTC",
            responderIds: ["maya-tran"],
          },
          {
            id: "deck-438-signal-comms",
            label: "Support lane",
            team: "Customer ops",
            status: "Standby",
            summary: "Hold a regional advisory draft until session parity checks complete.",
            coverage: "Support desk",
            nextCheck: "09:50 UTC",
            responderIds: ["cameron-reeves"],
          },
        ],
        actions: [
          {
            id: "deck-438-signal-1",
            title: "Fence stale standby POPs",
            detail: "Keep all drifted nodes out of rotation before session issuance splits further.",
            ownerId: "leila-ortega",
            lane: "POP isolation lane",
            state: "In progress",
          },
          {
            id: "deck-438-signal-2",
            title: "Check central issuer bundle health",
            detail: "Confirm that config generation is healthy and the blast radius is purely propagation.",
            ownerId: "maya-tran",
            lane: "Bridge support lane",
            state: "Queued",
          },
        ],
        handoff: {
          title: "Stage regional operations coverage",
          summary: "Prepare a receiving lane for after-hours watch before the edge bridge begins to close.",
          lane: "Edge bridge to service operations",
          eta: "Within 18 min",
          risk: "If parity reopens in APAC, the bridge will need the regional desk live immediately.",
          status: "Drafting brief",
          outgoingOwnerId: "leila-ortega",
          incomingOwnerId: "iris-chen",
          checklist: [
            {
              id: "deck-438-signal-check-1",
              label: "Impacted POP list attached",
              status: "Ready",
            },
            {
              id: "deck-438-signal-check-2",
              label: "Regional watch roster attached",
              status: "Pending",
            },
          ],
        },
      },
      {
        stageId: "triage",
        status: "Triage",
        stageFocus:
          "Reduce the problem to a bounded propagation failure and choose the minimum set of extra lanes.",
        activeTask:
          "Reseed the standby nodes and prove issuer parity in shadow before customers see a wider session gap.",
        ownership: {
          primaryOwnerId: "leila-ortega",
          coordinatorId: "cameron-reeves",
          lane: "Regional bridge",
          state: "Escalated",
          summary: "Edge remains the active owner, but service operations is already preparing follow-the-sun coverage.",
          nextReview: "09:57 UTC",
        },
        lanes: [
          {
            id: "deck-438-triage-edge",
            label: "POP reseed lane",
            team: "Network runtime",
            status: "Engaged",
            summary: "Push the fresh issuer bundle and leave the nodes in shadow until parity checks complete.",
            coverage: "Edge specialist",
            nextCheck: "09:54 UTC",
            responderIds: ["leila-ortega"],
          },
          {
            id: "deck-438-triage-ops",
            label: "Regional operations lane",
            team: "Service operations",
            status: "Warming",
            summary: "Stage receiving coverage for APAC and capture the minimum watch plan if handoff becomes necessary.",
            coverage: "Regional coordinator",
            nextCheck: "09:58 UTC",
            responderIds: ["iris-chen"],
          },
          {
            id: "deck-438-triage-comms",
            label: "Regional support lane",
            team: "Customer ops",
            status: "Engaged",
            summary: "Share a narrow advisory for affected geographies instead of a global incident message.",
            coverage: "Support desk",
            nextCheck: "10:00 UTC",
            responderIds: ["cameron-reeves"],
          },
        ],
        actions: [
          {
            id: "deck-438-triage-1",
            title: "Reseed stale issuer bundles",
            detail: "Force shadow nodes to fetch the corrected issuer bundle before they are reconsidered for traffic.",
            ownerId: "leila-ortega",
            lane: "POP reseed lane",
            state: "In progress",
          },
          {
            id: "deck-438-triage-2",
            title: "Assemble regional watch roster",
            detail: "Name the APAC coverage owner early so the bridge does not have to improvise a transfer later.",
            ownerId: "iris-chen",
            lane: "Regional operations lane",
            state: "Queued",
          },
          {
            id: "deck-438-triage-3",
            title: "Publish the regional holding line",
            detail: "Explain that session issuance may be delayed in a bounded set of geographies.",
            ownerId: "cameron-reeves",
            lane: "Regional support lane",
            state: "Ready to hand off",
          },
        ],
        handoff: {
          title: "Prepare APAC receiving coverage",
          summary: "Get Iris and Samir aligned on who receives the watch lane once parity stabilizes.",
          lane: "Regional bridge to APAC watch",
          eta: "Within 10 min",
          risk: "Late parity drift in eu-central would require re-expanding the bridge footprint.",
          status: "Awaiting acknowledgment",
          outgoingOwnerId: "leila-ortega",
          incomingOwnerId: "iris-chen",
          checklist: [
            {
              id: "deck-438-triage-check-1",
              label: "Regional advisory attached",
              status: "Ready",
            },
            {
              id: "deck-438-triage-check-2",
              label: "APAC watch owner confirmed",
              status: "Pending",
            },
          ],
        },
      },
      {
        stageId: "containment",
        status: "Containing",
        stageFocus:
          "Bring the reseeded nodes back in shadow, keep customer messaging narrow, and decide whether the watch lane can transfer.",
        activeTask:
          "Validate issuer parity on the reseeded POPs and hold traffic off the recovered nodes until APAC watch is staffed.",
        ownership: {
          primaryOwnerId: "leila-ortega",
          coordinatorId: "iris-chen",
          lane: "Reseed bridge",
          state: "Shared bridge",
          summary: "Leila still owns the live fix while Iris starts coordinating the receiving region.",
          nextReview: "10:08 UTC",
        },
        lanes: [
          {
            id: "deck-438-containment-edge",
            label: "POP parity lane",
            team: "Network runtime",
            status: "Engaged",
            summary: "Keep reseeded nodes in shadow and verify session issuance parity before traffic returns.",
            coverage: "Edge specialist",
            nextCheck: "10:05 UTC",
            responderIds: ["leila-ortega"],
          },
          {
            id: "deck-438-containment-ops",
            label: "APAC watch lane",
            team: "Service operations",
            status: "Warming",
            summary: "Review the receiving packet, confirm regional checkpoints, and decide whether Samir needs to join live.",
            coverage: "Regional coordinator",
            nextCheck: "10:09 UTC",
            responderIds: ["iris-chen"],
          },
          {
            id: "deck-438-containment-comms",
            label: "Support lane",
            team: "Customer ops",
            status: "Engaged",
            summary: "Hold the advisory steady and avoid broadening scope while the shadow lane is still active.",
            coverage: "Support desk",
            nextCheck: "10:10 UTC",
            responderIds: ["cameron-reeves"],
          },
        ],
        actions: [
          {
            id: "deck-438-containment-1",
            title: "Run shadow parity checks",
            detail: "Compare issuer bundles and session issuance on every reseeded POP before rejoining the pool.",
            ownerId: "leila-ortega",
            lane: "POP parity lane",
            state: "In progress",
          },
          {
            id: "deck-438-containment-2",
            title: "Name the receiving watch owner",
            detail: "Confirm whether Iris keeps the watch or Samir takes the late-hour follow-up shift.",
            ownerId: "iris-chen",
            lane: "APAC watch lane",
            state: "In progress",
          },
          {
            id: "deck-438-containment-3",
            title: "Refresh the regional support note",
            detail: "Keep the message specific to the affected geographies and the narrow session symptom.",
            ownerId: "cameron-reeves",
            lane: "Support lane",
            state: "Done",
          },
        ],
        handoff: {
          title: "Regional watch transfer",
          summary: "Shift active ownership from the edge bridge to the APAC regional desk once shadow parity holds.",
          lane: "Edge bridge to APAC watch",
          eta: "Within 8 min",
          risk: "If a reseeded POP regresses under real traffic, Leila must reclaim ownership immediately.",
          status: "Awaiting acknowledgment",
          outgoingOwnerId: "leila-ortega",
          incomingOwnerId: "iris-chen",
          checklist: [
            {
              id: "deck-438-containment-check-1",
              label: "Parity screenshots attached",
              status: "Ready",
            },
            {
              id: "deck-438-containment-check-2",
              label: "Real-traffic reopen rule attached",
              status: "Ready",
            },
            {
              id: "deck-438-containment-check-3",
              label: "Receiving desk acknowledged",
              status: "Pending",
            },
          ],
        },
      },
      {
        stageId: "handoff",
        status: "Handing off",
        stageFocus:
          "Keep one live edge specialist attached while the regional desk proves it can own the watch cadence cleanly.",
        activeTask:
          "Complete the APAC watch transfer, keep shadow metrics visible, and record the reopen threshold for the receiving desk.",
        ownership: {
          primaryOwnerId: "iris-chen",
          coordinatorId: "cameron-reeves",
          lane: "Regional watch transfer",
          state: "Pending handoff",
          summary: "Iris is accepting the watch while Leila stays live on parity checks through the first interval.",
          nextReview: "10:18 UTC",
        },
        lanes: [
          {
            id: "deck-438-handoff-ops",
            label: "Regional watch lane",
            team: "Service operations",
            status: "Handoff",
            summary: "Own the watch cadence, checkpoint schedule, and reopen rule for the affected POP set.",
            coverage: "Regional coordinator",
            nextCheck: "10:16 UTC",
            responderIds: ["iris-chen"],
          },
          {
            id: "deck-438-handoff-edge",
            label: "Shadow parity lane",
            team: "Network runtime",
            status: "Engaged",
            summary: "Stay attached for one more interval while the receiving desk confirms comfort with the metrics.",
            coverage: "Edge specialist",
            nextCheck: "10:17 UTC",
            responderIds: ["leila-ortega"],
          },
          {
            id: "deck-438-handoff-comms",
            label: "Regional support lane",
            team: "Customer ops",
            status: "Standby",
            summary: "Only re-engage if the APAC watch owner reopens the incident or traffic parity slips.",
            coverage: "Support desk",
            nextCheck: "On demand",
            responderIds: ["cameron-reeves"],
          },
        ],
        actions: [
          {
            id: "deck-438-handoff-1",
            title: "Confirm receive-side watch cadence",
            detail: "Lock checkpoint times and make sure APAC watch coverage is explicit about reopen thresholds.",
            ownerId: "iris-chen",
            lane: "Regional watch lane",
            state: "In progress",
          },
          {
            id: "deck-438-handoff-2",
            title: "Stay live on shadow parity",
            detail: "Leave Leila attached through the first receiving interval and then retire the bridge if stable.",
            ownerId: "leila-ortega",
            lane: "Shadow parity lane",
            state: "Ready to hand off",
          },
        ],
        handoff: {
          title: "Regional desk acknowledgment",
          summary: "Iris has accepted ownership of the watch lane and the reopen threshold is documented.",
          lane: "APAC watch acceptance",
          eta: "Acknowledged",
          risk: "A new issuer mismatch under real traffic is the only trigger for bridge re-entry.",
          status: "Acknowledged",
          outgoingOwnerId: "leila-ortega",
          incomingOwnerId: "iris-chen",
          checklist: [
            {
              id: "deck-438-handoff-check-1",
              label: "Receiving desk acknowledged",
              status: "Ready",
            },
            {
              id: "deck-438-handoff-check-2",
              label: "Reopen threshold documented",
              status: "Ready",
            },
          ],
        },
      },
      {
        stageId: "watch",
        status: "Monitoring",
        stageFocus:
          "Leave the regional desk accountable for regressions and retire edge specialists as soon as the first checkpoint clears.",
        activeTask:
          "Watch session issuance parity for two regional checkpoints and stand down the bridge if no POP drifts again.",
        ownership: {
          primaryOwnerId: "iris-chen",
          coordinatorId: "cameron-reeves",
          lane: "Regional watch",
          state: "Follow-up owner",
          summary: "The watch has moved fully into service operations with a documented path to re-open the bridge.",
          nextReview: "10:42 UTC",
        },
        lanes: [
          {
            id: "deck-438-watch-ops",
            label: "Regional watch lane",
            team: "Service operations",
            status: "Watch",
            summary: "Hold the named watch until two checkpoints pass with no new issuer parity drift.",
            coverage: "Regional coordinator",
            nextCheck: "10:28 UTC",
            responderIds: ["iris-chen"],
          },
          {
            id: "deck-438-watch-edge",
            label: "Edge specialist lane",
            team: "Network runtime",
            status: "Standby",
            summary: "Remain available only if a reseeded POP slips back under real traffic.",
            coverage: "Edge specialist",
            nextCheck: "On demand",
            responderIds: ["leila-ortega"],
          },
        ],
        actions: [
          {
            id: "deck-438-watch-1",
            title: "Run the final parity checkpoint",
            detail: "Verify that shadow and live session issuance remain aligned across the recovered POPs.",
            ownerId: "iris-chen",
            lane: "Regional watch lane",
            state: "In progress",
          },
          {
            id: "deck-438-watch-2",
            title: "Stand down live bridge support",
            detail: "Retire the edge bridge after the first regional checkpoint succeeds.",
            ownerId: "cameron-reeves",
            lane: "Regional support lane",
            state: "Queued",
          },
        ],
        handoff: {
          title: "Watch ownership settled",
          summary: "Regional operations owns the follow-up watch and the bridge has a clean re-entry path if parity regresses.",
          lane: "Closed transfer",
          eta: "Completed",
          risk: "Only a real-traffic parity slip should reopen this incident.",
          status: "Closed out",
          outgoingOwnerId: "leila-ortega",
          incomingOwnerId: "iris-chen",
          checklist: [
            {
              id: "deck-438-watch-check-1",
              label: "Watch owner recorded",
              status: "Ready",
            },
            {
              id: "deck-438-watch-check-2",
              label: "Bridge stand-down plan recorded",
              status: "Ready",
            },
          ],
        },
      },
    ],
    timeline: [
      {
        id: "deck-438-signal-entry",
        incidentId: "deck-438",
        stageId: "signal",
        kind: "Detection",
        title: "Standby edge nodes fail issuer parity checks",
        detail: "Session issuance splits between old and new issuer bundles in a narrow regional slice of POPs.",
        at: "09:41 UTC",
        channel: "edge-watch",
        responderIds: ["leila-ortega"],
      },
      {
        id: "deck-438-triage-entry",
        incidentId: "deck-438",
        stageId: "triage",
        kind: "Triage",
        title: "Reseed plan approved and regional advisory stays narrow",
        detail: "The bridge isolates the problem to propagation drift and avoids broadening customer messaging.",
        at: "09:53 UTC",
        channel: "ops-bridge",
        responderIds: ["leila-ortega", "cameron-reeves"],
      },
      {
        id: "deck-438-containment-entry",
        incidentId: "deck-438",
        stageId: "containment",
        kind: "Containment",
        title: "Reseeded POPs rejoin in shadow while APAC watch is staged",
        detail: "Issuer parity holds in shadow and Iris begins assembling the receiving coverage plan.",
        at: "10:07 UTC",
        channel: "regional-ops",
        responderIds: ["leila-ortega", "iris-chen"],
      },
      {
        id: "deck-438-handoff-entry",
        incidentId: "deck-438",
        stageId: "handoff",
        kind: "Handoff",
        title: "Regional watch ownership shifts to service operations",
        detail: "Iris acknowledges the handoff while Leila stays attached for one more parity interval.",
        at: "10:18 UTC",
        channel: "handoff-desk",
        responderIds: ["iris-chen", "leila-ortega"],
      },
      {
        id: "deck-438-watch-entry",
        incidentId: "deck-438",
        stageId: "watch",
        kind: "Monitoring",
        title: "Recovered POPs stay aligned under live session traffic",
        detail: "The regional desk keeps the watch open, but the active bridge is no longer needed.",
        at: "10:31 UTC",
        channel: "regional-ops",
        responderIds: ["iris-chen"],
      },
    ],
  },
  {
    id: "deck-435",
    code: "INC-435",
    title: "Webhook replay queue grows after partner retry burst",
    service: "shipment-webhooks",
    severity: "medium",
    openedAt: "10:05 UTC",
    lead: "Talia Brooks",
    region: "global queue mesh",
    affectedUsers: "Delayed delivery events",
    summary: "Carrier retries arrive out of order and saturate the replay workers assigned to the recovery lane.",
    responderIds: ["talia-brooks", "owen-singh", "cameron-reeves", "iris-chen"],
    initialStageId: "handoff",
    workflow: [
      {
        stageId: "signal",
        status: "Investigating",
        stageFocus:
          "Confirm duplicate suppression is healthy before the queue team burns all spare capacity on throughput.",
        activeTask:
          "Measure replay depth, verify dedupe safety, and split carrier retries by arrival pattern.",
        ownership: {
          primaryOwnerId: "talia-brooks",
          coordinatorId: "owen-singh",
          lane: "Queue bridge",
          state: "Bridge lead",
          summary: "Queue control owns first response while partner systems evaluates customer-facing spillover.",
          nextReview: "10:12 UTC",
        },
        lanes: [
          {
            id: "deck-435-signal-queue",
            label: "Replay safety lane",
            team: "Workflow control",
            status: "Engaged",
            summary: "Protect dedupe guarantees before scaling workers and risking duplicate merchant notifications.",
            coverage: "Queue response",
            nextCheck: "10:11 UTC",
            responderIds: ["talia-brooks"],
          },
          {
            id: "deck-435-signal-partner",
            label: "Partner analysis lane",
            team: "Partner systems",
            status: "Warming",
            summary: "Identify the retrying carrier cohort and whether merchant-facing timelines need a hold.",
            coverage: "Partner liaison",
            nextCheck: "10:13 UTC",
            responderIds: ["owen-singh"],
          },
        ],
        actions: [
          {
            id: "deck-435-signal-1",
            title: "Measure duplicate suppression pressure",
            detail: "Make sure safety is holding before scaling workers on the oldest partitions.",
            ownerId: "talia-brooks",
            lane: "Replay safety lane",
            state: "In progress",
          },
          {
            id: "deck-435-signal-2",
            title: "Tag the retrying carrier cohort",
            detail: "Split replay traffic by carrier so the bridge knows which partner updates may be required later.",
            ownerId: "owen-singh",
            lane: "Partner analysis lane",
            state: "Queued",
          },
        ],
        handoff: {
          title: "Prepare partner-facing watch coverage",
          summary: "Build the receiving packet early so the queue bridge can drop out once backlog burn is predictable.",
          lane: "Queue bridge to partner systems",
          eta: "Within 22 min",
          risk: "A late duplicate spike would force queue control to retake ownership.",
          status: "Drafting brief",
          outgoingOwnerId: "talia-brooks",
          incomingOwnerId: "owen-singh",
          checklist: [
            {
              id: "deck-435-signal-check-1",
              label: "Carrier cohort attached",
              status: "Pending",
            },
            {
              id: "deck-435-signal-check-2",
              label: "Dedupe status attached",
              status: "Ready",
            },
          ],
        },
      },
      {
        stageId: "triage",
        status: "Triage",
        stageFocus:
          "Assign queue and partner owners at the same time so backlog draining and merchant messaging do not drift apart.",
        activeTask:
          "Warm spare workers, throttle the worst carrier cohort, and keep merchant-facing updates on hold.",
        ownership: {
          primaryOwnerId: "talia-brooks",
          coordinatorId: "owen-singh",
          lane: "Queue control bridge",
          state: "Escalated",
          summary: "Queue control owns mitigation while partner systems starts preparing a receiving handoff packet.",
          nextReview: "10:22 UTC",
        },
        lanes: [
          {
            id: "deck-435-triage-queue",
            label: "Backlog drain lane",
            team: "Workflow control",
            status: "Engaged",
            summary: "Warm spare workers and protect dedupe constraints while the oldest replay partition drains.",
            coverage: "Queue response",
            nextCheck: "10:20 UTC",
            responderIds: ["talia-brooks"],
          },
          {
            id: "deck-435-triage-partner",
            label: "Partner coordination lane",
            team: "Partner systems",
            status: "Engaged",
            summary: "Hold merchant updates and line up partner communications for the eventual watch transfer.",
            coverage: "Partner liaison",
            nextCheck: "10:23 UTC",
            responderIds: ["owen-singh"],
          },
          {
            id: "deck-435-triage-comms",
            label: "Merchant messaging lane",
            team: "Customer ops",
            status: "Warming",
            summary: "Prepare holding copy that can be handed to the receiving lane once dedupe is proven stable.",
            coverage: "Status desk",
            nextCheck: "10:24 UTC",
            responderIds: ["cameron-reeves"],
          },
        ],
        actions: [
          {
            id: "deck-435-triage-1",
            title: "Warm spare workers on the oldest replay partition",
            detail: "Add throughput only where dedupe confidence is highest and replay ordering is most predictable.",
            ownerId: "talia-brooks",
            lane: "Backlog drain lane",
            state: "In progress",
          },
          {
            id: "deck-435-triage-2",
            title: "Throttle the retrying carrier cohort",
            detail: "Spread carrier retries so queue pressure decreases without dropping merchant signals.",
            ownerId: "owen-singh",
            lane: "Partner coordination lane",
            state: "In progress",
          },
          {
            id: "deck-435-triage-3",
            title: "Prepare merchant holding copy",
            detail: "Write a narrow message that can transfer to the receiving partner lane if needed.",
            ownerId: "cameron-reeves",
            lane: "Merchant messaging lane",
            state: "Queued",
          },
        ],
        handoff: {
          title: "Prepare partner watch handoff",
          summary: "Package queue metrics and dedupe guardrails before transferring ownership to partner systems.",
          lane: "Queue control to partner systems",
          eta: "Within 14 min",
          risk: "Late duplicate detection failures would put the queue team back in charge immediately.",
          status: "Awaiting acknowledgment",
          outgoingOwnerId: "talia-brooks",
          incomingOwnerId: "owen-singh",
          checklist: [
            {
              id: "deck-435-triage-check-1",
              label: "Dedupe dashboard attached",
              status: "Ready",
            },
            {
              id: "deck-435-triage-check-2",
              label: "Merchant message draft attached",
              status: "Pending",
            },
          ],
        },
      },
      {
        stageId: "containment",
        status: "Containing",
        stageFocus:
          "Drain the oldest queue slices safely and reduce the live bridge surface area before any ownership shift.",
        activeTask:
          "Keep duplicate suppression green while the warmed spare workers drain the oldest backlog partition.",
        ownership: {
          primaryOwnerId: "talia-brooks",
          coordinatorId: "owen-singh",
          lane: "Replay control",
          state: "Shared bridge",
          summary: "Queue control still owns the live backlog, but partner systems is already handling the external flank.",
          nextReview: "10:33 UTC",
        },
        lanes: [
          {
            id: "deck-435-containment-queue",
            label: "Replay drain lane",
            team: "Workflow control",
            status: "Engaged",
            summary: "Hold the warmed spare workers on the oldest partition and avoid dedupe regressions.",
            coverage: "Queue response",
            nextCheck: "10:30 UTC",
            responderIds: ["talia-brooks"],
          },
          {
            id: "deck-435-containment-partner",
            label: "Partner watch lane",
            team: "Partner systems",
            status: "Engaged",
            summary: "Coordinate with carriers and merchants so the later handoff lands on a stable external narrative.",
            coverage: "Partner liaison",
            nextCheck: "10:34 UTC",
            responderIds: ["owen-singh"],
          },
          {
            id: "deck-435-containment-comms",
            label: "Merchant messaging lane",
            team: "Customer ops",
            status: "Standby",
            summary: "Stay ready in case the receiving lane needs a coordinated merchant message on transfer.",
            coverage: "Status desk",
            nextCheck: "On demand",
            responderIds: ["cameron-reeves"],
          },
        ],
        actions: [
          {
            id: "deck-435-containment-1",
            title: "Drain the oldest replay partition",
            detail: "Keep the warm workers focused on the safest queue slice until depth normalizes.",
            ownerId: "talia-brooks",
            lane: "Replay drain lane",
            state: "In progress",
          },
          {
            id: "deck-435-containment-2",
            title: "Confirm carriers are back inside retry policy",
            detail: "Use partner data to decide whether the queue can transfer ownership without reopening.",
            ownerId: "owen-singh",
            lane: "Partner watch lane",
            state: "Ready to hand off",
          },
        ],
        handoff: {
          title: "Queue-to-partner transfer packet",
          summary: "Transfer backlog watch ownership to partner systems once queue depth and dedupe both hold steady.",
          lane: "Replay control to partner watch",
          eta: "Within 6 min",
          risk: "If backlog depth spikes again, the receiving lane will need to page queue control back in.",
          status: "Awaiting acknowledgment",
          outgoingOwnerId: "talia-brooks",
          incomingOwnerId: "owen-singh",
          checklist: [
            {
              id: "deck-435-containment-check-1",
              label: "Queue depth snapshot attached",
              status: "Ready",
            },
            {
              id: "deck-435-containment-check-2",
              label: "Dedupe health attached",
              status: "Ready",
            },
            {
              id: "deck-435-containment-check-3",
              label: "Receiving owner acknowledged",
              status: "Pending",
            },
          ],
        },
      },
      {
        stageId: "handoff",
        status: "Handing off",
        stageFocus:
          "Make the receiving partner lane explicit and leave only one live queue owner attached for re-entry.",
        activeTask:
          "Transfer merchant-facing follow-up to Owen while Talia keeps one queue checkpoint live for a safe reopen path.",
        ownership: {
          primaryOwnerId: "owen-singh",
          coordinatorId: "iris-chen",
          lane: "Partner follow-up",
          state: "Pending handoff",
          summary: "Partner systems is accepting ongoing ownership while service operations tracks the receiving packet quality.",
          nextReview: "10:42 UTC",
        },
        lanes: [
          {
            id: "deck-435-handoff-partner",
            label: "Partner follow-up lane",
            team: "Partner systems",
            status: "Handoff",
            summary: "Own merchant and carrier coordination once the queue depth stays under the transfer threshold.",
            coverage: "Partner liaison",
            nextCheck: "10:40 UTC",
            responderIds: ["owen-singh"],
          },
          {
            id: "deck-435-handoff-queue",
            label: "Queue checkpoint lane",
            team: "Workflow control",
            status: "Engaged",
            summary: "Stay attached for one more replay checkpoint so partner systems has a clean reopen path.",
            coverage: "Queue response",
            nextCheck: "10:41 UTC",
            responderIds: ["talia-brooks"],
          },
          {
            id: "deck-435-handoff-comms",
            label: "Merchant status lane",
            team: "Customer ops",
            status: "Engaged",
            summary: "Carry the merchant holding line into the partner-owned follow-up state.",
            coverage: "Status desk",
            nextCheck: "10:43 UTC",
            responderIds: ["cameron-reeves"],
          },
        ],
        actions: [
          {
            id: "deck-435-handoff-1",
            title: "Review receiving packet with partner systems",
            detail: "Confirm queue thresholds, carrier cohort notes, and the exact conditions for reopening queue control.",
            ownerId: "owen-singh",
            lane: "Partner follow-up lane",
            state: "In progress",
          },
          {
            id: "deck-435-handoff-2",
            title: "Run one final queue checkpoint",
            detail: "Leave Talia attached until the next replay depth sample confirms the transfer is safe.",
            ownerId: "talia-brooks",
            lane: "Queue checkpoint lane",
            state: "Ready to hand off",
          },
          {
            id: "deck-435-handoff-3",
            title: "Carry merchant status hold into partner ownership",
            detail: "Transfer the holding line so merchants do not get conflicting updates during the ownership shift.",
            ownerId: "cameron-reeves",
            lane: "Merchant status lane",
            state: "In progress",
          },
        ],
        handoff: {
          title: "Partner lane acknowledgment",
          summary: "Owen has accepted ongoing follow-up while queue control stays attached for one final checkpoint.",
          lane: "Partner follow-up acceptance",
          eta: "Awaiting checkpoint",
          risk: "A renewed duplicate spike is the main trigger for queue control to retake ownership.",
          status: "Awaiting acknowledgment",
          outgoingOwnerId: "talia-brooks",
          incomingOwnerId: "owen-singh",
          checklist: [
            {
              id: "deck-435-handoff-check-1",
              label: "Queue checkpoint scheduled",
              status: "Ready",
            },
            {
              id: "deck-435-handoff-check-2",
              label: "Merchant holding line transferred",
              status: "Ready",
            },
            {
              id: "deck-435-handoff-check-3",
              label: "Receiving owner acknowledged",
              status: "Pending",
            },
          ],
        },
      },
      {
        stageId: "watch",
        status: "Monitoring",
        stageFocus:
          "Keep only the partner lane live, leave queue control on standby, and document the re-entry conditions clearly.",
        activeTask:
          "Watch carrier retry behavior and merchant latency while queue control drops to on-call standby.",
        ownership: {
          primaryOwnerId: "owen-singh",
          coordinatorId: "iris-chen",
          lane: "Partner watch",
          state: "Follow-up owner",
          summary: "Partner systems owns follow-up and service operations keeps the handoff record clean for re-entry.",
          nextReview: "11:03 UTC",
        },
        lanes: [
          {
            id: "deck-435-watch-partner",
            label: "Partner watch lane",
            team: "Partner systems",
            status: "Watch",
            summary: "Keep carrier retry pressure and merchant delay metrics under review until the watch window expires.",
            coverage: "Partner liaison",
            nextCheck: "10:54 UTC",
            responderIds: ["owen-singh"],
          },
          {
            id: "deck-435-watch-queue",
            label: "Queue standby lane",
            team: "Workflow control",
            status: "Standby",
            summary: "Re-enter only if replay depth or dedupe pressure rises above the documented threshold again.",
            coverage: "Queue response",
            nextCheck: "On demand",
            responderIds: ["talia-brooks"],
          },
        ],
        actions: [
          {
            id: "deck-435-watch-1",
            title: "Track carrier retry pressure",
            detail: "Keep an eye on the previously noisy cohort until it settles back under the normal retry envelope.",
            ownerId: "owen-singh",
            lane: "Partner watch lane",
            state: "In progress",
          },
          {
            id: "deck-435-watch-2",
            title: "Close the transfer record",
            detail: "Document the reopen threshold and the final merchant messaging disposition.",
            ownerId: "iris-chen",
            lane: "Service operations",
            state: "Done",
          },
        ],
        handoff: {
          title: "Watch ownership settled",
          summary: "The partner lane owns the follow-up watch and queue control only returns if replay pressure regresses.",
          lane: "Closed transfer",
          eta: "Completed",
          risk: "Renewed duplicate risk is the only meaningful reopen trigger.",
          status: "Closed out",
          outgoingOwnerId: "talia-brooks",
          incomingOwnerId: "owen-singh",
          checklist: [
            {
              id: "deck-435-watch-check-1",
              label: "Receiving owner recorded",
              status: "Ready",
            },
            {
              id: "deck-435-watch-check-2",
              label: "Queue reopen rule documented",
              status: "Ready",
            },
          ],
        },
      },
    ],
    timeline: [
      {
        id: "deck-435-signal-entry",
        incidentId: "deck-435",
        stageId: "signal",
        kind: "Detection",
        title: "Partner retry storm piles into the replay lane",
        detail: "Queue depth doubles in one interval, but duplicate suppression still refuses bad replays.",
        at: "10:08 UTC",
        channel: "queue-ops",
        responderIds: ["talia-brooks", "owen-singh"],
      },
      {
        id: "deck-435-triage-entry",
        incidentId: "deck-435",
        stageId: "triage",
        kind: "Triage",
        title: "Spare workers warm while the noisiest carrier cohort is throttled",
        detail: "Queue control and partner systems coordinate a safe backlog drain without widening merchant noise.",
        at: "10:18 UTC",
        channel: "workflow-control",
        responderIds: ["talia-brooks", "owen-singh"],
      },
      {
        id: "deck-435-containment-entry",
        incidentId: "deck-435",
        stageId: "containment",
        kind: "Containment",
        title: "Warm spare workers drain the oldest replay partition",
        detail: "Duplicate suppression stays green while backlog depth finally bends in the right direction.",
        at: "10:28 UTC",
        channel: "workflow-control",
        responderIds: ["talia-brooks"],
      },
      {
        id: "deck-435-handoff-entry",
        incidentId: "deck-435",
        stageId: "handoff",
        kind: "Handoff",
        title: "Merchant status hold is handed to partner success desk",
        detail: "Owen accepts the follow-up packet while Talia stays attached for one final queue checkpoint.",
        at: "10:39 UTC",
        channel: "partner-room",
        responderIds: ["owen-singh", "cameron-reeves"],
      },
      {
        id: "deck-435-watch-entry",
        incidentId: "deck-435",
        stageId: "watch",
        kind: "Monitoring",
        title: "Carrier retry pressure flattens under the partner-owned watch lane",
        detail: "Queue control drops to standby and merchants keep the narrow holding line until delay metrics normalize.",
        at: "10:56 UTC",
        channel: "partner-room",
        responderIds: ["owen-singh"],
      },
    ],
  },
  {
    id: "deck-431",
    code: "INC-431",
    title: "Audit fan-out stays under watch after canary rule change",
    service: "event-audit",
    severity: "low",
    openedAt: "10:31 UTC",
    lead: "Owen Singh",
    region: "secondary workers",
    affectedUsers: "Internal review queues",
    summary: "A narrow audit rule change increases side-channel fan-out, but retry pressure is now flattening.",
    responderIds: ["owen-singh", "talia-brooks", "iris-chen"],
    initialStageId: "watch",
    workflow: [
      {
        stageId: "signal",
        status: "Investigating",
        stageFocus:
          "Verify that the queue is still healthy before adding any extra response surface to a low-severity watch.",
        activeTask:
          "Check duplicate fan-out on the canary workers and confirm downstream review queues remain healthy.",
        ownership: {
          primaryOwnerId: "owen-singh",
          coordinatorId: "talia-brooks",
          lane: "Audit watch",
          state: "Bridge lead",
          summary: "Partner systems opens the watch while workflow control validates queue safety.",
          nextReview: "10:36 UTC",
        },
        lanes: [
          {
            id: "deck-431-signal-audit",
            label: "Audit watch lane",
            team: "Partner systems",
            status: "Engaged",
            summary: "Track duplicate fan-out and confirm the canary is the only noisy slice.",
            coverage: "Delivery analyst",
            nextCheck: "10:35 UTC",
            responderIds: ["owen-singh"],
          },
          {
            id: "deck-431-signal-queue",
            label: "Queue safety lane",
            team: "Workflow control",
            status: "Warming",
            summary: "Validate that downstream review queues remain under their paging threshold.",
            coverage: "Queue response",
            nextCheck: "10:38 UTC",
            responderIds: ["talia-brooks"],
          },
        ],
        actions: [
          {
            id: "deck-431-signal-1",
            title: "Inspect canary duplicate fan-out",
            detail: "Separate the new rule effect from background retry noise before escalating unnecessarily.",
            ownerId: "owen-singh",
            lane: "Audit watch lane",
            state: "In progress",
          },
          {
            id: "deck-431-signal-2",
            title: "Verify downstream queue safety",
            detail: "Check that internal review queues remain healthy even if duplicate audit events stay elevated.",
            ownerId: "talia-brooks",
            lane: "Queue safety lane",
            state: "Queued",
          },
        ],
        handoff: {
          title: "Prepare a quiet watch handoff",
          summary: "If the issue remains low-grade, move ownership into service operations without ever widening to a full bridge.",
          lane: "Audit watch to service operations",
          eta: "Within 30 min",
          risk: "Unexpected downstream queue growth would invalidate the quiet transfer plan.",
          status: "Drafting brief",
          outgoingOwnerId: "owen-singh",
          incomingOwnerId: "iris-chen",
          checklist: [
            {
              id: "deck-431-signal-check-1",
              label: "Canary-only scope confirmed",
              status: "Pending",
            },
            {
              id: "deck-431-signal-check-2",
              label: "Queue health attached",
              status: "Ready",
            },
          ],
        },
      },
      {
        stageId: "triage",
        status: "Triage",
        stageFocus:
          "Keep the response light, name a follow-up owner, and avoid creating a heavier process than the symptom warrants.",
        activeTask:
          "Watch duplicate fan-out on the canary slice and keep queue depth below the internal paging line.",
        ownership: {
          primaryOwnerId: "owen-singh",
          coordinatorId: "iris-chen",
          lane: "Quiet watch",
          state: "Escalated",
          summary: "Service operations is aware, but the incident still stays below the threshold for a broader bridge.",
          nextReview: "10:45 UTC",
        },
        lanes: [
          {
            id: "deck-431-triage-audit",
            label: "Audit watch lane",
            team: "Partner systems",
            status: "Engaged",
            summary: "Track the canary duplicate rate and confirm it decays with no extra mitigation.",
            coverage: "Delivery analyst",
            nextCheck: "10:43 UTC",
            responderIds: ["owen-singh"],
          },
          {
            id: "deck-431-triage-ops",
            label: "Service operations lane",
            team: "Service operations",
            status: "Warming",
            summary: "Prepare to receive the watch if the issue stays quiet for one more checkpoint.",
            coverage: "Regional coordinator",
            nextCheck: "10:47 UTC",
            responderIds: ["iris-chen"],
          },
        ],
        actions: [
          {
            id: "deck-431-triage-1",
            title: "Track duplicate rate for one more checkpoint",
            detail: "Avoid new mitigations unless the low-grade symptom fails to decay on its own.",
            ownerId: "owen-singh",
            lane: "Audit watch lane",
            state: "In progress",
          },
          {
            id: "deck-431-triage-2",
            title: "Prepare a service-operations receive note",
            detail: "Name the follow-up owner early in case the quiet watch needs to transfer.",
            ownerId: "iris-chen",
            lane: "Service operations lane",
            state: "Queued",
          },
        ],
        handoff: {
          title: "Prepare quiet transfer",
          summary: "Package the canary evidence and queue-health note so the watch can transfer cleanly if needed.",
          lane: "Quiet watch to service operations",
          eta: "Within 16 min",
          risk: "Any queue growth would force the issue back into workflow control ownership.",
          status: "Awaiting acknowledgment",
          outgoingOwnerId: "owen-singh",
          incomingOwnerId: "iris-chen",
          checklist: [
            {
              id: "deck-431-triage-check-1",
              label: "Canary evidence attached",
              status: "Ready",
            },
            {
              id: "deck-431-triage-check-2",
              label: "Follow-up owner named",
              status: "Pending",
            },
          ],
        },
      },
      {
        stageId: "containment",
        status: "Contained",
        stageFocus:
          "Hold the quiet watch without over-rotating into a formal mitigation flow that the symptom does not justify.",
        activeTask:
          "Leave the canary rule in place, keep the quiet watch open, and confirm review queues stay flat.",
        ownership: {
          primaryOwnerId: "owen-singh",
          coordinatorId: "iris-chen",
          lane: "Quiet watch",
          state: "Shared bridge",
          summary: "The incident stays lightweight, but service operations is now paired on the eventual follow-up state.",
          nextReview: "10:57 UTC",
        },
        lanes: [
          {
            id: "deck-431-containment-audit",
            label: "Audit watch lane",
            team: "Partner systems",
            status: "Engaged",
            summary: "Keep the canary under observation and verify duplicate fan-out keeps decaying.",
            coverage: "Delivery analyst",
            nextCheck: "10:54 UTC",
            responderIds: ["owen-singh"],
          },
          {
            id: "deck-431-containment-ops",
            label: "Follow-up lane",
            team: "Service operations",
            status: "Warming",
            summary: "Review the quiet-transfer note and the queue-health threshold for any reopen event.",
            coverage: "Regional coordinator",
            nextCheck: "10:58 UTC",
            responderIds: ["iris-chen"],
          },
        ],
        actions: [
          {
            id: "deck-431-containment-1",
            title: "Watch the canary duplicate rate",
            detail: "Keep one more internal checkpoint before deciding whether the issue can transfer fully to follow-up.",
            ownerId: "owen-singh",
            lane: "Audit watch lane",
            state: "In progress",
          },
          {
            id: "deck-431-containment-2",
            title: "Review quiet-transfer evidence",
            detail: "Make sure service operations has the exact evidence needed to own any later follow-up.",
            ownerId: "iris-chen",
            lane: "Follow-up lane",
            state: "Ready to hand off",
          },
        ],
        handoff: {
          title: "Quiet transfer packet",
          summary: "Move the low-grade watch into service operations once the next checkpoint confirms no queue risk.",
          lane: "Quiet watch to follow-up",
          eta: "Within 8 min",
          risk: "If queue depth rises, the transfer stops and workflow control re-enters immediately.",
          status: "Awaiting acknowledgment",
          outgoingOwnerId: "owen-singh",
          incomingOwnerId: "iris-chen",
          checklist: [
            {
              id: "deck-431-containment-check-1",
              label: "Queue-health note attached",
              status: "Ready",
            },
            {
              id: "deck-431-containment-check-2",
              label: "Receiving owner acknowledged",
              status: "Pending",
            },
          ],
        },
      },
      {
        stageId: "handoff",
        status: "Handing off",
        stageFocus:
          "Shift the low-grade watch to a named follow-up owner without widening the responder set again.",
        activeTask:
          "Transfer quiet watch ownership to Iris and leave Owen available only for a narrow reopen trigger.",
        ownership: {
          primaryOwnerId: "iris-chen",
          coordinatorId: "owen-singh",
          lane: "Follow-up watch transfer",
          state: "Pending handoff",
          summary: "Service operations accepts the follow-up watch while Owen stays attached for a narrow reopen rule.",
          nextReview: "11:06 UTC",
        },
        lanes: [
          {
            id: "deck-431-handoff-ops",
            label: "Follow-up watch lane",
            team: "Service operations",
            status: "Handoff",
            summary: "Accept the quiet watch and retain the documented queue-health threshold for any reopen.",
            coverage: "Regional coordinator",
            nextCheck: "11:04 UTC",
            responderIds: ["iris-chen"],
          },
          {
            id: "deck-431-handoff-audit",
            label: "Canary context lane",
            team: "Partner systems",
            status: "Standby",
            summary: "Stay available for context only if the watch owner decides to reopen the issue.",
            coverage: "Delivery analyst",
            nextCheck: "On demand",
            responderIds: ["owen-singh"],
          },
        ],
        actions: [
          {
            id: "deck-431-handoff-1",
            title: "Confirm quiet-watch acceptance",
            detail: "Review the evidence packet and make the receive-side reopen rule explicit.",
            ownerId: "iris-chen",
            lane: "Follow-up watch lane",
            state: "In progress",
          },
          {
            id: "deck-431-handoff-2",
            title: "Record the reopen trigger",
            detail: "Leave Owen attached only for queue-health regressions or a duplicate fan-out spike.",
            ownerId: "owen-singh",
            lane: "Canary context lane",
            state: "Ready to hand off",
          },
        ],
        handoff: {
          title: "Quiet watch acknowledgment",
          summary: "Iris has the evidence packet and the incident can remain a low-noise follow-up watch.",
          lane: "Follow-up acceptance",
          eta: "Acknowledged",
          risk: "Only a queue-health regression should widen the response model again.",
          status: "Acknowledged",
          outgoingOwnerId: "owen-singh",
          incomingOwnerId: "iris-chen",
          checklist: [
            {
              id: "deck-431-handoff-check-1",
              label: "Receiving owner acknowledged",
              status: "Ready",
            },
            {
              id: "deck-431-handoff-check-2",
              label: "Reopen rule recorded",
              status: "Ready",
            },
          ],
        },
      },
      {
        stageId: "watch",
        status: "Monitoring",
        stageFocus:
          "Hold the watch quietly, keep the reopen rule crisp, and avoid dragging the incident back into a bigger process.",
        activeTask:
          "Watch duplicate fan-out under the canary rule for one more checkpoint and stand down the last extra owner if it stays flat.",
        ownership: {
          primaryOwnerId: "iris-chen",
          coordinatorId: "owen-singh",
          lane: "Follow-up watch",
          state: "Follow-up owner",
          summary: "Service operations owns the final watch while Owen is only a narrow escalation backstop.",
          nextReview: "11:22 UTC",
        },
        lanes: [
          {
            id: "deck-431-watch-ops",
            label: "Follow-up watch lane",
            team: "Service operations",
            status: "Watch",
            summary: "Hold the quiet watch until the canary returns to its usual duplicate baseline.",
            coverage: "Regional coordinator",
            nextCheck: "11:15 UTC",
            responderIds: ["iris-chen"],
          },
          {
            id: "deck-431-watch-audit",
            label: "Audit specialist lane",
            team: "Partner systems",
            status: "Standby",
            summary: "Only rejoin if the watch owner sees a queue-health regression or duplicate spike.",
            coverage: "Delivery analyst",
            nextCheck: "On demand",
            responderIds: ["owen-singh"],
          },
        ],
        actions: [
          {
            id: "deck-431-watch-1",
            title: "Run the final canary checkpoint",
            detail: "Confirm that duplicate fan-out keeps decaying without any new queue pressure.",
            ownerId: "iris-chen",
            lane: "Follow-up watch lane",
            state: "In progress",
          },
          {
            id: "deck-431-watch-2",
            title: "Close the quiet-transfer note",
            detail: "Document the final watch owner and the only condition that would reopen the issue.",
            ownerId: "owen-singh",
            lane: "Audit specialist lane",
            state: "Done",
          },
        ],
        handoff: {
          title: "Quiet watch settled",
          summary: "The low-grade issue now sits entirely with the follow-up owner and no active bridge remains.",
          lane: "Closed transfer",
          eta: "Completed",
          risk: "Any material queue growth would reopen the issue immediately.",
          status: "Closed out",
          outgoingOwnerId: "owen-singh",
          incomingOwnerId: "iris-chen",
          checklist: [
            {
              id: "deck-431-watch-check-1",
              label: "Watch owner recorded",
              status: "Ready",
            },
            {
              id: "deck-431-watch-check-2",
              label: "Reopen threshold documented",
              status: "Ready",
            },
          ],
        },
      },
    ],
    timeline: [
      {
        id: "deck-431-signal-entry",
        incidentId: "deck-431",
        stageId: "signal",
        kind: "Detection",
        title: "Audit retries drift above the watch threshold",
        detail: "Duplicate event fan-out rises on the canary workers, but downstream review queues stay healthy.",
        at: "10:34 UTC",
        channel: "audit-watch",
        responderIds: ["owen-singh"],
      },
      {
        id: "deck-431-triage-entry",
        incidentId: "deck-431",
        stageId: "triage",
        kind: "Triage",
        title: "Quiet watch stays below the paging line",
        detail: "Service operations is alerted, but the incident remains low-grade and does not widen to a full bridge.",
        at: "10:43 UTC",
        channel: "audit-watch",
        responderIds: ["owen-singh", "iris-chen"],
      },
      {
        id: "deck-431-containment-entry",
        incidentId: "deck-431",
        stageId: "containment",
        kind: "Containment",
        title: "Secondary queues stay flat while duplicate fan-out decays",
        detail: "The canary keeps duplicating some audit events, but nothing downstream is close to paging.",
        at: "10:55 UTC",
        channel: "workflow-control",
        responderIds: ["owen-singh", "talia-brooks"],
      },
      {
        id: "deck-431-handoff-entry",
        incidentId: "deck-431",
        stageId: "handoff",
        kind: "Handoff",
        title: "Quiet watch ownership shifts to service operations",
        detail: "Iris accepts the follow-up watch and Owen drops to a narrow context-only role.",
        at: "11:05 UTC",
        channel: "handoff-desk",
        responderIds: ["iris-chen", "owen-singh"],
      },
      {
        id: "deck-431-watch-entry",
        incidentId: "deck-431",
        stageId: "watch",
        kind: "Monitoring",
        title: "Canary duplicate fan-out remains below the reopen threshold",
        detail: "The quiet watch continues without any need to widen the response model again.",
        at: "11:18 UTC",
        channel: "audit-watch",
        responderIds: ["iris-chen"],
      },
    ],
  },
] satisfies IncidentRecord[];

export function createIncidentStageState(
  seed: IncidentRecord[] = incidents,
): Record<string, IncidentStageId> {
  return Object.fromEntries(
    seed.map((incident) => [incident.id, incident.initialStageId]),
  ) as Record<string, IncidentStageId>;
}

export function getIncidentStageIndex(stageId: IncidentStageId) {
  return incidentStageOrder.indexOf(stageId);
}

export function getNextIncidentStage(stageId: IncidentStageId) {
  const nextIndex = Math.min(
    getIncidentStageIndex(stageId) + 1,
    incidentStageOrder.length - 1,
  );

  return incidentStageOrder[nextIndex] ?? stageId;
}

export function getPreviousIncidentStage(stageId: IncidentStageId) {
  const nextIndex = Math.max(getIncidentStageIndex(stageId) - 1, 0);

  return incidentStageOrder[nextIndex] ?? stageId;
}

export function getIncidentWorkflowStage(
  incident: IncidentRecord,
  stageId: IncidentStageId,
) {
  return (
    incident.workflow.find((workflowStage) => workflowStage.stageId === stageId) ??
    incident.workflow[0]
  );
}

export function getVisibleTimelineEntries(
  incident: IncidentRecord,
  stageId: IncidentStageId,
  responderId?: string | null,
) {
  const maxStageIndex = getIncidentStageIndex(stageId);

  return incident.timeline.filter((entry) => {
    if (getIncidentStageIndex(entry.stageId) > maxStageIndex) {
      return false;
    }

    if (!responderId) {
      return true;
    }

    return entry.responderIds.includes(responderId);
  });
}

export function countActiveEscalations(
  incident: IncidentRecord,
  stageId: IncidentStageId,
) {
  return getIncidentWorkflowStage(incident, stageId).lanes.filter(
    (lane) => lane.status !== "Standby",
  ).length;
}

export function isIncidentStageComplete(
  stageId: IncidentStageId,
  currentStageId: IncidentStageId,
) {
  return getIncidentStageIndex(stageId) < getIncidentStageIndex(currentStageId);
}
