export type ShipmentLaneTone = "steady" | "watch" | "exception";
export type PackageSummaryId = "priority" | "satchels" | "returns" | "oversize";

export type ParcelGroup = {
  id: string;
  summaryId: PackageSummaryId;
  label: string;
  count: number;
  statusLabel: string;
  zone: string;
};

export type ShipmentLane = {
  id: string;
  laneCode: string;
  origin: string;
  destination: string;
  departureWindow: string;
  checkpoint: string;
  delayedParcels: number;
  trailerFill: string;
  tone: ShipmentLaneTone;
  statusLabel: string;
  capacity: number;
  slaRiskParcels: number;
  balanceNote: string;
  parcelGroups: ParcelGroup[];
  exceptionIds: string[];
};

export type LaneException = {
  id: string;
  laneId: string;
  type: string;
  title: string;
  detail: string;
  severity: "high" | "medium" | "low";
  owner: string;
  updatedAt: string;
  affectedParcels: number;
  slaRiskNote: string;
};

export type PackageSummary = {
  id: PackageSummaryId;
  label: string;
  count: number;
  share: string;
  note: string;
};

export type ScenarioImpactState = "resolve" | "soften" | "introduce";

export type BalancingScenarioMove = {
  id: string;
  fromLaneId: string;
  toLaneId: string;
  summaryId: PackageSummaryId;
  label: string;
  parcelCount: number;
  etaChange: string;
  reason: string;
  toStatusLabel: string;
  toZone: string;
};

export type ScenarioExceptionImpact = {
  id: string;
  laneId: string;
  change: ScenarioImpactState;
  type: string;
  severity: "high" | "medium" | "low";
  title: string;
  detail: string;
  owner: string;
  affectedParcels: number;
  slaRiskNote: string;
  existingExceptionId?: string;
};

export type ScenarioPackageEffect = {
  summaryId: PackageSummaryId;
  movedParcels: number;
  slaRiskDelta: number;
  note: string;
  status: "steady" | "improved" | "watch";
};

export type BalancingScenarioLaneEffect = {
  laneId: string;
  delayedParcelsDelta: number;
  slaRiskParcelsDelta: number;
  checkpoint: string;
  statusLabel: string;
  tone: ShipmentLaneTone;
  balanceNote: string;
};

export type BalancingScenario = {
  id: string;
  label: string;
  summary: string;
  posture: "conservative" | "protective" | "aggressive";
  operator: string;
  dispatchWindow: string;
  tradeoff: string;
  comparisonNote: string;
  moves: BalancingScenarioMove[];
  laneEffects: BalancingScenarioLaneEffect[];
  exceptionImpacts: ScenarioExceptionImpact[];
  packageEffects: ScenarioPackageEffect[];
};

export const parcelHubSyncLabel = "Dispatch sync 06:15 local";

export const exceptionTypes = [
  "Sort gap",
  "Address hold",
  "Trailer reweigh",
  "Weather spillover",
  "Flex handoff",
  "Manifest resequence",
];

export const packageSummaries: PackageSummary[] = [
  {
    id: "priority",
    label: "Priority cartons",
    count: 684,
    share: "38%",
    note: "Most exposed to reroute and label-validation misses.",
  },
  {
    id: "satchels",
    label: "Metro satchels",
    count: 512,
    share: "28%",
    note: "Fastest pressure relief lever when cage work starts to spike.",
  },
  {
    id: "returns",
    label: "Returns mesh",
    count: 291,
    share: "16%",
    note: "Usually absorbs balancing changes without changing SLA posture.",
  },
  {
    id: "oversize",
    label: "Oversize pallets",
    count: 316,
    share: "18%",
    note: "Axle checks and lift sequencing drive the biggest exception swings.",
  },
];

export const shipmentLanes: ShipmentLane[] = [
  {
    id: "den-chi",
    laneCode: "DEN -> CHI",
    origin: "Denver Hub",
    destination: "Chicago Sort",
    departureWindow: "05:55-06:25",
    checkpoint: "Dock 4 closes in 18 min",
    delayedParcels: 148,
    trailerFill: "84% trailer fill",
    tone: "watch",
    statusLabel: "Delay watch",
    capacity: 220,
    slaRiskParcels: 64,
    balanceNote: "Priority cartons are stacking faster than the north-belt sweep can absorb.",
    exceptionIds: ["lane-ex-1", "lane-ex-2"],
    parcelGroups: [
      {
        id: "den-1",
        summaryId: "priority",
        label: "Priority cartons",
        count: 128,
        statusLabel: "Hold scan",
        zone: "North belt",
      },
      {
        id: "den-2",
        summaryId: "returns",
        label: "Returns mesh",
        count: 42,
        statusLabel: "Ready",
        zone: "Backhaul",
      },
      {
        id: "den-3",
        summaryId: "oversize",
        label: "Oversize pallets",
        count: 34,
        statusLabel: "Reweigh",
        zone: "Lift zone",
      },
    ],
  },
  {
    id: "phx-dfw",
    laneCode: "PHX -> DFW",
    origin: "Phoenix Hub",
    destination: "Dallas Relay",
    departureWindow: "06:20-06:55",
    checkpoint: "Gate 2 staging complete",
    delayedParcels: 96,
    trailerFill: "79% trailer fill",
    tone: "exception",
    statusLabel: "Exception focus",
    capacity: 245,
    slaRiskParcels: 58,
    balanceNote: "Scanner drift is forcing manual tallies through the exception cage.",
    exceptionIds: ["lane-ex-3", "lane-ex-4"],
    parcelGroups: [
      {
        id: "phx-1",
        summaryId: "satchels",
        label: "Metro satchels",
        count: 164,
        statusLabel: "Split sort",
        zone: "South spur",
      },
      {
        id: "phx-2",
        summaryId: "priority",
        label: "Priority cartons",
        count: 73,
        statusLabel: "Address hold",
        zone: "Exception cage",
      },
      {
        id: "phx-3",
        summaryId: "oversize",
        label: "Oversize pallets",
        count: 22,
        statusLabel: "Loaded",
        zone: "Lift zone",
      },
    ],
  },
  {
    id: "sea-sac",
    laneCode: "SEA -> SAC",
    origin: "Seattle Node",
    destination: "Sacramento Crossdock",
    departureWindow: "06:45-07:10",
    checkpoint: "Weather pad in review",
    delayedParcels: 61,
    trailerFill: "67% trailer fill",
    tone: "watch",
    statusLabel: "Pad extended",
    capacity: 236,
    slaRiskParcels: 24,
    balanceNote: "Seattle has headroom, but apron checks limit how far operators can lean on it.",
    exceptionIds: ["lane-ex-5"],
    parcelGroups: [
      {
        id: "sea-1",
        summaryId: "satchels",
        label: "Metro satchels",
        count: 121,
        statusLabel: "Buffered",
        zone: "West mezzanine",
      },
      {
        id: "sea-2",
        summaryId: "returns",
        label: "Returns mesh",
        count: 38,
        statusLabel: "Ready",
        zone: "Backhaul",
      },
      {
        id: "sea-3",
        summaryId: "priority",
        label: "Priority cartons",
        count: 47,
        statusLabel: "Weather hold",
        zone: "Outbound belt",
      },
    ],
  },
  {
    id: "mia-atl",
    laneCode: "MIA -> ATL",
    origin: "Miami Spur",
    destination: "Atlanta Hub",
    departureWindow: "07:05-07:35",
    checkpoint: "Seal check passed",
    delayedParcels: 0,
    trailerFill: "91% trailer fill",
    tone: "steady",
    statusLabel: "Clear lane",
    capacity: 250,
    slaRiskParcels: 12,
    balanceNote: "Atlanta flex sort is the cleanest buffer if the hub needs extra protected capacity.",
    exceptionIds: [],
    parcelGroups: [
      {
        id: "mia-1",
        summaryId: "priority",
        label: "Priority cartons",
        count: 102,
        statusLabel: "Loaded",
        zone: "East dock",
      },
      {
        id: "mia-2",
        summaryId: "satchels",
        label: "Metro satchels",
        count: 87,
        statusLabel: "Loaded",
        zone: "East dock",
      },
      {
        id: "mia-3",
        summaryId: "returns",
        label: "Returns mesh",
        count: 29,
        statusLabel: "Ready",
        zone: "Backhaul",
      },
    ],
  },
];

export const laneExceptions: LaneException[] = [
  {
    id: "lane-ex-1",
    laneId: "den-chi",
    type: "Sort gap",
    title: "Inbound cage 4 missed the final consolidation sweep",
    detail: "Forty-two priority cartons remained in the recycle buffer after the presort handoff.",
    severity: "high",
    owner: "North dock lead",
    updatedAt: "11m ago",
    affectedParcels: 42,
    slaRiskNote: "Adds 18 priority cartons to the first SLA warning bucket.",
  },
  {
    id: "lane-ex-2",
    laneId: "den-chi",
    type: "Trailer reweigh",
    title: "Oversize pallet pair needs a second axle balance check",
    detail: "The lift zone flagged pallet spacing after the first trailer weight capture came in above plan.",
    severity: "medium",
    owner: "Lift zone team",
    updatedAt: "6m ago",
    affectedParcels: 14,
    slaRiskNote: "Could hold two oversize pallets past dock close if reweigh misses the next slot.",
  },
  {
    id: "lane-ex-3",
    laneId: "phx-dfw",
    type: "Address hold",
    title: "Seven satchels are parked for suite validation before release",
    detail: "The route can still make cutoff, but local validation needs to clear before final manifest close.",
    severity: "medium",
    owner: "Address desk",
    updatedAt: "4m ago",
    affectedParcels: 7,
    slaRiskNote: "Address desk work keeps the fast lane under a manual review threshold.",
  },
  {
    id: "lane-ex-4",
    laneId: "phx-dfw",
    type: "Sort gap",
    title: "South spur scanner drifted during metro bundle induction",
    detail: "A temporary manual tally is active while the lane keeps the remaining satchel batch staged nearby.",
    severity: "high",
    owner: "Automation specialist",
    updatedAt: "2m ago",
    affectedParcels: 35,
    slaRiskNote: "If the lane stays loaded, the manual tally becomes the top SLA exposure in the route.",
  },
  {
    id: "lane-ex-5",
    laneId: "sea-sac",
    type: "Weather spillover",
    title: "Pad release is waiting on the marine-layer visibility check",
    detail: "The lane is still viable, but dispatch widened the departure window to absorb apron traffic and moisture checks.",
    severity: "low",
    owner: "Dispatch desk",
    updatedAt: "8m ago",
    affectedParcels: 11,
    slaRiskNote: "Low-severity weather risk only turns material if Seattle also receives rerouted work.",
  },
];

export const balancingScenarios: BalancingScenario[] = [
  {
    id: "priority-protect",
    label: "Protect priority SLA",
    summary:
      "Shift protected cartons into Atlanta flex capacity and peel metro satchels out of the Phoenix cage before the next dispatch cutoff.",
    posture: "protective",
    operator: "Hub dispatch lead",
    dispatchWindow: "Hold 12 minutes for relabel and handoff",
    tradeoff: "Miami picks up a small relabel check, but the biggest SLA risk leaves Denver and Phoenix.",
    comparisonNote: "Best SLA improvement with a light new-risk footprint.",
    moves: [
      {
        id: "priority-protect-1",
        fromLaneId: "den-chi",
        toLaneId: "mia-atl",
        summaryId: "priority",
        label: "Priority cartons",
        parcelCount: 26,
        etaChange: "-18 min risk",
        reason: "Use Atlanta flex sort to clear Denver's north-belt overflow before the final sweep closes.",
        toStatusLabel: "Flex receive",
        toZone: "East dock",
      },
      {
        id: "priority-protect-2",
        fromLaneId: "phx-dfw",
        toLaneId: "sea-sac",
        summaryId: "satchels",
        label: "Metro satchels",
        parcelCount: 18,
        etaChange: "-12 min risk",
        reason: "Reduce the manual tally wave in Phoenix before scanner drift becomes a hard SLA breach.",
        toStatusLabel: "Flex receive",
        toZone: "West mezzanine",
      },
    ],
    laneEffects: [
      {
        laneId: "den-chi",
        delayedParcelsDelta: -52,
        slaRiskParcelsDelta: -24,
        checkpoint: "North-belt sweep reset for final seal",
        statusLabel: "Priority protected",
        tone: "watch",
        balanceNote: "Denver drops below its last high-risk threshold once the overflow exits the recycle buffer.",
      },
      {
        laneId: "phx-dfw",
        delayedParcelsDelta: -24,
        slaRiskParcelsDelta: -16,
        checkpoint: "Manual tally isolated to the final satchel wave",
        statusLabel: "Scanner recovery",
        tone: "watch",
        balanceNote: "Phoenix is still noisy, but the cage no longer drives the entire route posture.",
      },
      {
        laneId: "sea-sac",
        delayedParcelsDelta: 10,
        slaRiskParcelsDelta: 4,
        checkpoint: "Seattle flex relay opens for satchel spillover",
        statusLabel: "Flex assist",
        tone: "watch",
        balanceNote: "Seattle absorbs the spillover without crossing the weather hold threshold.",
      },
      {
        laneId: "mia-atl",
        delayedParcelsDelta: 8,
        slaRiskParcelsDelta: 6,
        checkpoint: "Atlanta flex trailer staged for protected cartons",
        statusLabel: "Flex receiver",
        tone: "watch",
        balanceNote: "Miami stays inside capacity but needs a quick relabel check for diverted priority volume.",
      },
    ],
    exceptionImpacts: [
      {
        id: "priority-protect-impact-1",
        laneId: "den-chi",
        change: "resolve",
        existingExceptionId: "lane-ex-1",
        type: "Sort gap",
        severity: "high",
        title: "Final sweep clears once Denver sheds the protected overflow",
        detail: "The move reopens enough belt capacity to sweep cage 4 before the seal lock.",
        owner: "North dock lead",
        affectedParcels: 42,
        slaRiskNote: "Removes the highest-priority carton exposure from Denver.",
      },
      {
        id: "priority-protect-impact-2",
        laneId: "phx-dfw",
        change: "resolve",
        existingExceptionId: "lane-ex-3",
        type: "Address hold",
        severity: "medium",
        title: "Address desk queue clears once the satchel batch is split",
        detail: "Phoenix no longer needs to validate the whole release wave at the same time.",
        owner: "Address desk",
        affectedParcels: 7,
        slaRiskNote: "Takes one manual validation step out of the critical path.",
      },
      {
        id: "priority-protect-impact-3",
        laneId: "phx-dfw",
        change: "soften",
        existingExceptionId: "lane-ex-4",
        type: "Sort gap",
        severity: "medium",
        title: "Scanner drift remains, but the exposed wave is materially smaller",
        detail: "Operators only need to hand-count the tail of the satchel bundle after the split.",
        owner: "Automation specialist",
        affectedParcels: 17,
        slaRiskNote: "Cuts the remaining scanner-drift exposure roughly in half.",
      },
      {
        id: "priority-protect-impact-4",
        laneId: "mia-atl",
        change: "introduce",
        type: "Flex handoff",
        severity: "low",
        title: "Diverted priority cartons need relabel verification at the ATL flex trailer",
        detail: "The handoff is local and planned, but operators need one extra label audit before seal.",
        owner: "East dock lead",
        affectedParcels: 14,
        slaRiskNote: "Creates a small relabel touchpoint without pushing the lane into hard breach territory.",
      },
    ],
    packageEffects: [
      {
        summaryId: "priority",
        movedParcels: 26,
        slaRiskDelta: -24,
        note: "Protected cartons leave the Denver overflow and recover the biggest SLA slice in the hub.",
        status: "improved",
      },
      {
        summaryId: "satchels",
        movedParcels: 18,
        slaRiskDelta: -9,
        note: "Metro satchels stop driving the Phoenix cage backlog once the wave is split.",
        status: "improved",
      },
      {
        summaryId: "returns",
        movedParcels: 0,
        slaRiskDelta: 0,
        note: "Returns mesh stays untouched so backhaul remains predictable.",
        status: "steady",
      },
      {
        summaryId: "oversize",
        movedParcels: 0,
        slaRiskDelta: 0,
        note: "Oversize work still needs the existing Denver axle check.",
        status: "watch",
      },
    ],
  },
  {
    id: "exception-drain",
    label: "Drain exception cage",
    summary:
      "Aggressively empty Phoenix and Denver exception work into flex lanes, trading a cleaner queue for a tighter Atlanta finish.",
    posture: "aggressive",
    operator: "Sort recovery manager",
    dispatchWindow: "Hold 18 minutes for resequencing",
    tradeoff: "Open exceptions fall fastest, but Miami becomes the new pressure edge.",
    comparisonNote: "Best exception reduction, highest downstream tradeoff.",
    moves: [
      {
        id: "exception-drain-1",
        fromLaneId: "phx-dfw",
        toLaneId: "mia-atl",
        summaryId: "priority",
        label: "Priority cartons",
        parcelCount: 32,
        etaChange: "-15 min risk",
        reason: "Bypass the Phoenix exception cage and push protected volume straight into Atlanta flex handling.",
        toStatusLabel: "Flex receive",
        toZone: "East dock",
      },
      {
        id: "exception-drain-2",
        fromLaneId: "den-chi",
        toLaneId: "sea-sac",
        summaryId: "oversize",
        label: "Oversize pallets",
        parcelCount: 14,
        etaChange: "-8 min risk",
        reason: "Use Seattle's spare lift capacity to avoid a second Denver reweigh cycle.",
        toStatusLabel: "Flex receive",
        toZone: "Lift zone B",
      },
    ],
    laneEffects: [
      {
        laneId: "den-chi",
        delayedParcelsDelta: -22,
        slaRiskParcelsDelta: -10,
        checkpoint: "Axle relief clears before dock lock",
        statusLabel: "Lift relief",
        tone: "watch",
        balanceNote: "Denver stops double-handling its heaviest pallets once Seattle absorbs the overflow.",
      },
      {
        laneId: "phx-dfw",
        delayedParcelsDelta: -52,
        slaRiskParcelsDelta: -26,
        checkpoint: "Phoenix cage reset for final validation pass",
        statusLabel: "Cage drained",
        tone: "watch",
        balanceNote: "Phoenix recovers quickly because the protected wave leaves the manual queue entirely.",
      },
      {
        laneId: "sea-sac",
        delayedParcelsDelta: 18,
        slaRiskParcelsDelta: 8,
        checkpoint: "Secondary lift slot opened for diverted oversize",
        statusLabel: "Lift assist",
        tone: "watch",
        balanceNote: "Seattle stays workable, but lift sequencing becomes a monitored constraint.",
      },
      {
        laneId: "mia-atl",
        delayedParcelsDelta: 18,
        slaRiskParcelsDelta: 12,
        checkpoint: "Manifest resequence needed before ATL close",
        statusLabel: "SLA watch",
        tone: "exception",
        balanceNote: "Atlanta flex sort can take the freight, but the resequence window gets materially tighter.",
      },
    ],
    exceptionImpacts: [
      {
        id: "exception-drain-impact-1",
        laneId: "den-chi",
        change: "resolve",
        existingExceptionId: "lane-ex-2",
        type: "Trailer reweigh",
        severity: "medium",
        title: "Denver clears the axle issue once oversize is split to Seattle",
        detail: "The trailer no longer needs the second balance check after the overflow leaves the lift zone.",
        owner: "Lift zone team",
        affectedParcels: 14,
        slaRiskNote: "Eliminates the only remaining oversize blocker on the lane.",
      },
      {
        id: "exception-drain-impact-2",
        laneId: "phx-dfw",
        change: "resolve",
        existingExceptionId: "lane-ex-3",
        type: "Address hold",
        severity: "medium",
        title: "Address validation queue clears when Phoenix sheds the protected wave",
        detail: "The address desk can finish the remaining holds without blocking manifest close.",
        owner: "Address desk",
        affectedParcels: 7,
        slaRiskNote: "Turns a manual validation blocker into standard follow-up work.",
      },
      {
        id: "exception-drain-impact-3",
        laneId: "phx-dfw",
        change: "resolve",
        existingExceptionId: "lane-ex-4",
        type: "Sort gap",
        severity: "high",
        title: "Scanner drift becomes non-blocking after the reroute",
        detail: "Phoenix keeps the drift in place, but the critical satchel load is no longer behind it.",
        owner: "Automation specialist",
        affectedParcels: 35,
        slaRiskNote: "Removes the route's largest active exception queue from dispatch planning.",
      },
      {
        id: "exception-drain-impact-4",
        laneId: "mia-atl",
        change: "introduce",
        type: "Manifest resequence",
        severity: "medium",
        title: "Atlanta flex trailer needs a second manifest ordering pass",
        detail: "The protected freight lands cleanly, but dock control needs to resequence the final trailer map.",
        owner: "ATL dock control",
        affectedParcels: 19,
        slaRiskNote: "Moves exception work downstream and tightens the final dispatch buffer.",
      },
    ],
    packageEffects: [
      {
        summaryId: "priority",
        movedParcels: 32,
        slaRiskDelta: -20,
        note: "Priority freight exits the Phoenix cage, but Atlanta becomes the new sequencing edge.",
        status: "improved",
      },
      {
        summaryId: "satchels",
        movedParcels: 0,
        slaRiskDelta: 0,
        note: "Satchel exposure drops only because the cage is no longer overloaded by protected work.",
        status: "steady",
      },
      {
        summaryId: "returns",
        movedParcels: 0,
        slaRiskDelta: 0,
        note: "Returns stay stable and keep backhaul handling predictable.",
        status: "steady",
      },
      {
        summaryId: "oversize",
        movedParcels: 14,
        slaRiskDelta: -6,
        note: "Seattle lift capacity removes Denver's second axle-check loop at the cost of a tighter lift schedule.",
        status: "watch",
      },
    ],
  },
  {
    id: "minimal-touch",
    label: "Minimal-touch rebalance",
    summary:
      "Make the smallest safe moves possible to trim SLA exposure without creating new preview exceptions for dispatch to absorb.",
    posture: "conservative",
    operator: "Shift manager",
    dispatchWindow: "Hold 8 minutes for confirmation",
    tradeoff: "Exception counts stay mostly flat, but the route does not recover as much pressure as the stronger plans.",
    comparisonNote: "Safest preview, smallest operational upside.",
    moves: [
      {
        id: "minimal-touch-1",
        fromLaneId: "den-chi",
        toLaneId: "mia-atl",
        summaryId: "priority",
        label: "Priority cartons",
        parcelCount: 16,
        etaChange: "-10 min risk",
        reason: "Use existing Atlanta slack to soften Denver's protected backlog without changing dock choreography too much.",
        toStatusLabel: "Flex receive",
        toZone: "East dock",
      },
      {
        id: "minimal-touch-2",
        fromLaneId: "phx-dfw",
        toLaneId: "sea-sac",
        summaryId: "satchels",
        label: "Metro satchels",
        parcelCount: 12,
        etaChange: "-7 min risk",
        reason: "Shave the top off the Phoenix satchel wave while keeping Seattle inside its weather buffer.",
        toStatusLabel: "Flex receive",
        toZone: "West mezzanine",
      },
    ],
    laneEffects: [
      {
        laneId: "den-chi",
        delayedParcelsDelta: -28,
        slaRiskParcelsDelta: -14,
        checkpoint: "Denver sweep regains one full release pass",
        statusLabel: "Pressure eased",
        tone: "watch",
        balanceNote: "Denver improves, but operators still have to watch the oversize check and final sweep timing.",
      },
      {
        laneId: "phx-dfw",
        delayedParcelsDelta: -18,
        slaRiskParcelsDelta: -10,
        checkpoint: "Phoenix satchel wave drops below manual tally peak",
        statusLabel: "Controlled watch",
        tone: "exception",
        balanceNote: "Phoenix is still the noisiest lane, but the hand-count window is smaller and easier to cover.",
      },
      {
        laneId: "sea-sac",
        delayedParcelsDelta: 6,
        slaRiskParcelsDelta: 3,
        checkpoint: "Seattle flex space opens for a single satchel spill",
        statusLabel: "Buffered assist",
        tone: "watch",
        balanceNote: "Seattle keeps enough pad to absorb the spill without escalating weather posture.",
      },
      {
        laneId: "mia-atl",
        delayedParcelsDelta: 4,
        slaRiskParcelsDelta: 2,
        checkpoint: "Atlanta flex sort takes a light protected batch",
        statusLabel: "Flex ready",
        tone: "watch",
        balanceNote: "Miami takes the extra work without introducing a new downstream exception queue.",
      },
    ],
    exceptionImpacts: [
      {
        id: "minimal-touch-impact-1",
        laneId: "den-chi",
        change: "soften",
        existingExceptionId: "lane-ex-1",
        type: "Sort gap",
        severity: "medium",
        title: "Denver's missed sweep remains visible, but the exposed parcel count drops",
        detail: "A smaller overflow wave means the north belt can recover most of the stuck priority cartons.",
        owner: "North dock lead",
        affectedParcels: 23,
        slaRiskNote: "Cuts the size of the priority gap without forcing a new handoff.",
      },
      {
        id: "minimal-touch-impact-2",
        laneId: "phx-dfw",
        change: "soften",
        existingExceptionId: "lane-ex-4",
        type: "Sort gap",
        severity: "medium",
        title: "Phoenix keeps the scanner drift, but the remaining manual wave shrinks",
        detail: "Operators still hand-count the tail, just not the entire satchel batch.",
        owner: "Automation specialist",
        affectedParcels: 23,
        slaRiskNote: "Lowers the active exposure without creating a new flex-lane review.",
      },
    ],
    packageEffects: [
      {
        summaryId: "priority",
        movedParcels: 16,
        slaRiskDelta: -14,
        note: "Priority relief is smaller than the stronger plans, but it does not create a downstream manifest review.",
        status: "improved",
      },
      {
        summaryId: "satchels",
        movedParcels: 12,
        slaRiskDelta: -5,
        note: "Satchel pressure eases just enough to make the Phoenix queue more predictable.",
        status: "improved",
      },
      {
        summaryId: "returns",
        movedParcels: 0,
        slaRiskDelta: 0,
        note: "Returns stay on the current plan and remain the cleanest buffer in the route.",
        status: "steady",
      },
      {
        summaryId: "oversize",
        movedParcels: 0,
        slaRiskDelta: 0,
        note: "Oversize pallets stay in place, so Denver still carries the reweigh risk.",
        status: "watch",
      },
    ],
  },
];
