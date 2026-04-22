export type SegmentStatus = "on-time" | "delayed" | "blocked";
export type ConstraintTone = "clear" | "watch" | "critical";
export type DecisionState = "ready" | "review" | "hold";
export type NotePriority = "high" | "medium" | "low";

export interface RoutePlannerStat {
  label: string;
  value: string;
  detail: string;
}

export interface TimingSignal {
  id: string;
  label: string;
  value: string;
  tone: SegmentStatus;
  detail: string;
}

export interface RouteConstraint {
  id: string;
  label: string;
  tone: ConstraintTone;
  impact: string;
  owner: string;
  note: string;
}

export interface SegmentCheckpoint {
  label: string;
  detail: string;
}

export interface RouteSegment {
  id: string;
  lane: string;
  stage: string;
  etaWindow: string;
  status: SegmentStatus;
  mode: string;
  owner: string;
  summary: string;
  riskNote: string;
  checkpoint: SegmentCheckpoint;
  constraints: RouteConstraint["id"][];
}

export interface RouteSegmentGroup {
  id: string;
  label: string;
  description: string;
  segments: RouteSegment[];
}

export interface RouteDecision {
  id: string;
  title: string;
  state: DecisionState;
  owner: string;
  deadline: string;
  detail: string;
}

export interface RouteNote {
  id: string;
  title: string;
  priority: NotePriority;
  author: string;
  timestamp: string;
  body: string;
  segmentId: string | null;
}

export const routePlannerOverview = {
  eyebrow: "Route Planner",
  title: "Balance timing, segment risk, and dispatch commitments before the lane locks.",
  description:
    "A standalone planning route for comparing each segment of a live movement, reviewing timing pressure, and deciding whether to hold, reroute, or release the route.",
  routeName: "Route 48 · Denver to Tacoma relay chain",
  shiftLabel: "Shift 03 · Mountain corridor desk",
};

export const routePlannerStats = [
  {
    label: "Segments tracked",
    value: "5",
    detail: "Two origin legs, two corridor handoffs, and one final-mile release",
  },
  {
    label: "Constraint watchpoints",
    value: "4",
    detail: "Bridge permit timing, weather shelf, dock congestion, and crew-hours risk",
  },
  {
    label: "Decisions due this hour",
    value: "3",
    detail: "Release, reroute, and trailer swap calls all need a named owner",
  },
] satisfies RoutePlannerStat[];

export const routeTimingSignals = [
  {
    id: "origin-release",
    label: "Origin release",
    value: "08:10 MDT",
    tone: "on-time",
    detail: "Trailer is loaded, sealed, and still inside the planned release window.",
  },
  {
    id: "mountain-pass",
    label: "Mountain pass handoff",
    value: "+22 min",
    tone: "delayed",
    detail: "Chain-control restrictions are slowing the corridor transfer at Silver Ridge.",
  },
  {
    id: "yakima-connector",
    label: "Yakima connector",
    value: "Awaiting clearance",
    tone: "blocked",
    detail: "Bridge escort confirmation has not yet cleared the final connector segment.",
  },
] satisfies TimingSignal[];

export const routeConstraints = [
  {
    id: "permit-window",
    label: "Bridge permit window",
    tone: "critical",
    impact: "Blocks the Yakima connector if the escort slot is missed after 14:30 PDT.",
    owner: "Regional compliance",
    note: "Escort team is ready, but the bridge authority still needs to acknowledge the permit refresh.",
  },
  {
    id: "crew-hours",
    label: "Crew-hours threshold",
    tone: "watch",
    impact: "A 35-minute slip forces a relief-driver swap before the final-mile release.",
    owner: "Dispatch lead",
    note: "Reserve coverage is staged in Ellensburg, but only until the 15:00 transfer cutoff.",
  },
  {
    id: "dock-congestion",
    label: "Tacoma dock congestion",
    tone: "watch",
    impact: "Inbound unload priority drops if the route lands after the premium intake block.",
    owner: "Destination ops",
    note: "Two other premium trailers are stacked into the same gate window.",
  },
  {
    id: "weather-shelf",
    label: "Cascade weather shelf",
    tone: "clear",
    impact: "Conditions are currently inside the operating band for the primary corridor.",
    owner: "Weather desk",
    note: "Snowfall intensity eased in the last update, but the next sweep hits in 70 minutes.",
  },
] satisfies RouteConstraint[];

export const routeSegmentGroups = [
  {
    id: "origin-control",
    label: "Origin control",
    description:
      "Validate release readiness before the route leaves the Denver yard and commits the lane plan.",
    segments: [
      {
        id: "seg-01",
        lane: "Denver yard release",
        stage: "Stage 1",
        etaWindow: "08:10-08:35 MDT",
        status: "on-time",
        mode: "Linehaul",
        owner: "Origin dispatch",
        summary:
          "Trailer loading is complete and the outbound tractor is attached with no deviation from the planned release sequence.",
        riskNote:
          "No active blockers, but the route needs to leave before the dock reset window narrows.",
        checkpoint: {
          label: "Seal verification",
          detail: "Cross-check trailer seal against the cold-load manifest before release.",
        },
        constraints: ["crew-hours"],
      },
      {
        id: "seg-02",
        lane: "Fort Collins fuel and swap",
        stage: "Stage 2",
        etaWindow: "09:20-09:45 MDT",
        status: "delayed",
        mode: "Service stop",
        owner: "Regional linehaul",
        summary:
          "Fueling remains available, but the swap pad is cycling slower than target after a maintenance inspection backlog.",
        riskNote:
          "A delay here compresses the mountain pass buffer and increases exposure to corridor restrictions.",
        checkpoint: {
          label: "Swap pad release",
          detail: "Confirm the spare dolly is staged before the lead unit enters the service lane.",
        },
        constraints: ["crew-hours", "weather-shelf"],
      },
    ],
  },
  {
    id: "corridor-commitments",
    label: "Corridor commitments",
    description:
      "Track the long-haul transfer segments where timing and permit risk can force a reroute decision.",
    segments: [
      {
        id: "seg-03",
        lane: "Silver Ridge pass",
        stage: "Stage 3",
        etaWindow: "12:05-12:40 MDT",
        status: "delayed",
        mode: "Mountain relay",
        owner: "Corridor control",
        summary:
          "The route remains open, but chain-control checks added a rolling queue that is extending handoff time.",
        riskNote:
          "If the pass runs beyond 12:40 MDT, the Yakima connector loses most of its permit cushion.",
        checkpoint: {
          label: "Escort standby",
          detail: "Keep the permit escort team warm-started while the relay approaches the state line.",
        },
        constraints: ["permit-window", "weather-shelf"],
      },
      {
        id: "seg-04",
        lane: "Yakima connector bridge",
        stage: "Stage 4",
        etaWindow: "14:00-14:25 PDT",
        status: "blocked",
        mode: "Permit crossing",
        owner: "Bridge operations",
        summary:
          "The route cannot enter the connector bridge until the refreshed escort permit is acknowledged by the authority desk.",
        riskNote:
          "Missing this bridge slot forces a hard reroute through the south bypass and adds 78 minutes.",
        checkpoint: {
          label: "Permit acknowledgement",
          detail: "Receive the bridge authority confirmation number before the tractor clears staging.",
        },
        constraints: ["permit-window"],
      },
    ],
  },
  {
    id: "destination-release",
    label: "Destination release",
    description:
      "Protect the final segment so the route still lands with enough priority to unload on the first dock wave.",
    segments: [
      {
        id: "seg-05",
        lane: "Tacoma premium intake",
        stage: "Stage 5",
        etaWindow: "16:10-16:35 PDT",
        status: "on-time",
        mode: "Final mile",
        owner: "Destination control",
        summary:
          "The destination dock still has premium capacity reserved for this route if the connector clears on the next permit cycle.",
        riskNote:
          "Every corridor delay now flows directly into the dock priority window and customer commitment buffer.",
        checkpoint: {
          label: "Door assignment",
          detail: "Hold door 14A unless the connector slip exceeds 30 minutes.",
        },
        constraints: ["dock-congestion", "crew-hours"],
      },
    ],
  },
] satisfies RouteSegmentGroup[];

export const routeDecisionQueue = [
  {
    id: "decision-release",
    title: "Keep the current corridor release",
    state: "review",
    owner: "A. Navarro",
    deadline: "Decide by 12:15 MDT",
    detail: "Only valid if Silver Ridge clears inside the current rolling restriction window.",
  },
  {
    id: "decision-reroute",
    title: "Arm the south bypass contingency",
    state: "ready",
    owner: "Dispatch lead",
    deadline: "Prep by 12:05 MDT",
    detail: "The bypass protects bridge risk, but adds linehaul miles and a dock-priority penalty.",
  },
  {
    id: "decision-relief-driver",
    title: "Authorize relief-driver swap",
    state: "hold",
    owner: "Crew planning",
    deadline: "Hold until 13:20 MDT",
    detail: "Only required if the route slips beyond the current crew-hours threshold.",
  },
] satisfies RouteDecision[];

export const notePriorityStyles: Record<NotePriority, string> = {
  high: "border-rose-300/20 bg-rose-300/10 text-rose-50",
  medium: "border-amber-300/20 bg-amber-300/10 text-amber-50",
  low: "border-slate-300/20 bg-slate-300/10 text-slate-200",
};

export const notePriorityLabels: Record<NotePriority, string> = {
  high: "High",
  medium: "Medium",
  low: "Low",
};

export const routeNotes = [
  {
    id: "note-bridge-fallback",
    title: "Bridge fallback timing is tighter than it looks",
    priority: "high",
    author: "A. Navarro",
    timestamp: "08:42 MDT",
    body: "The south bypass adds 78 minutes but the dock priority penalty makes it closer to 95 minutes of real impact. If we trigger the bypass, notify destination ops immediately so they can hold door 14A.",
    segmentId: "seg-04",
  },
  {
    id: "note-crew-hours-buffer",
    title: "Crew-hours buffer depends on Ellensburg staging",
    priority: "medium",
    author: "Dispatch lead",
    timestamp: "08:15 MDT",
    body: "The relief driver in Ellensburg is only available until the 15:00 transfer cutoff. If Silver Ridge slips past 12:40, we lose the option to swap without rebooking from Yakima at premium rates.",
    segmentId: "seg-03",
  },
  {
    id: "note-weather-update",
    title: "Next weather sweep could change corridor status",
    priority: "medium",
    author: "Weather desk",
    timestamp: "07:55 MDT",
    body: "Snowfall intensity dropped in the last update, but the forecast model shows a secondary band arriving around 10:30 MDT. If it materialises, expect chain controls to tighten again on Silver Ridge.",
    segmentId: null,
  },
  {
    id: "note-dock-stacking",
    title: "Two premium trailers already stacked at Tacoma",
    priority: "high",
    author: "Destination ops",
    timestamp: "08:30 MDT",
    body: "Gate 7 and gate 9 are already committed to inbound premium loads. If Route 48 slips past the first dock wave, the next available premium slot is 90 minutes later and requires a yard shunt.",
    segmentId: "seg-05",
  },
  {
    id: "note-seal-audit",
    title: "Cold-load seal audit passed without exceptions",
    priority: "low",
    author: "Origin dispatch",
    timestamp: "07:40 MDT",
    body: "All three seal numbers matched the manifest. Temperature logger confirmed the compartment held below threshold during the overnight pre-cool cycle.",
    segmentId: "seg-01",
  },
] satisfies RouteNote[];
