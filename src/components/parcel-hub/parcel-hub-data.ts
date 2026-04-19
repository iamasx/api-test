export type ShipmentLaneTone = "steady" | "watch" | "exception";
export type ParcelGroup = { id: string; label: string; count: number; statusLabel: string; zone: string };
export type ShipmentLane = {
  id: string; laneCode: string; origin: string; destination: string; departureWindow: string;
  checkpoint: string; delayedParcels: number; trailerFill: string; tone: ShipmentLaneTone;
  statusLabel: string; parcelGroups: ParcelGroup[]; exceptionIds: string[];
};
export type LaneException = {
  id: string; laneId: string; type: string; title: string; detail: string;
  severity: "high" | "medium" | "low"; owner: string; updatedAt: string;
};
export type PackageSummary = { id: string; label: string; count: number; share: string; note: string };

export const parcelHubSyncLabel = "Dispatch sync 06:15 local";

export const exceptionTypes = [
  "Sort gap",
  "Address hold",
  "Trailer reweigh",
  "Weather spillover",
];

export const packageSummaries: PackageSummary[] = [
  { id: "priority", label: "Priority cartons", count: 684, share: "38%", note: "Most exposed to re-scan misses." },
  { id: "satchels", label: "Metro satchels", count: 512, share: "28%", note: "Balanced across relays and hub transfers." },
  { id: "returns", label: "Returns mesh", count: 291, share: "16%", note: "Backhaul volume is mostly clear." },
  { id: "oversize", label: "Oversize pallets", count: 316, share: "18%", note: "Reweigh checks keep two lanes in watch." },
];

export const shipmentLanes: ShipmentLane[] = [
  {
    id: "den-chi", laneCode: "DEN -> CHI", origin: "Denver Hub", destination: "Chicago Sort",
    departureWindow: "05:55-06:25", checkpoint: "Dock 4 closes in 18 min", delayedParcels: 148,
    trailerFill: "84% trailer fill", tone: "watch", statusLabel: "Delay watch", exceptionIds: ["lane-ex-1", "lane-ex-2"],
    parcelGroups: [
      { id: "den-1", label: "Priority cartons", count: 128, statusLabel: "Hold scan", zone: "North belt" },
      { id: "den-2", label: "Returns mesh", count: 42, statusLabel: "Ready", zone: "Backhaul" },
      { id: "den-3", label: "Oversize pallets", count: 34, statusLabel: "Reweigh", zone: "Lift zone" },
    ],
  },
  {
    id: "phx-dfw", laneCode: "PHX -> DFW", origin: "Phoenix Hub", destination: "Dallas Relay",
    departureWindow: "06:20-06:55", checkpoint: "Gate 2 staging complete", delayedParcels: 96,
    trailerFill: "79% trailer fill", tone: "exception", statusLabel: "Exception focus", exceptionIds: ["lane-ex-3", "lane-ex-4"],
    parcelGroups: [
      { id: "phx-1", label: "Metro satchels", count: 164, statusLabel: "Split sort", zone: "South spur" },
      { id: "phx-2", label: "Priority cartons", count: 73, statusLabel: "Address hold", zone: "Exception cage" },
      { id: "phx-3", label: "Oversize pallets", count: 22, statusLabel: "Loaded", zone: "Lift zone" },
    ],
  },
  {
    id: "sea-sac", laneCode: "SEA -> SAC", origin: "Seattle Node", destination: "Sacramento Crossdock",
    departureWindow: "06:45-07:10", checkpoint: "Weather pad in review", delayedParcels: 61,
    trailerFill: "67% trailer fill", tone: "watch", statusLabel: "Pad extended", exceptionIds: ["lane-ex-5"],
    parcelGroups: [
      { id: "sea-1", label: "Metro satchels", count: 121, statusLabel: "Buffered", zone: "West mezzanine" },
      { id: "sea-2", label: "Returns mesh", count: 38, statusLabel: "Ready", zone: "Backhaul" },
      { id: "sea-3", label: "Priority cartons", count: 47, statusLabel: "Weather hold", zone: "Outbound belt" },
    ],
  },
  {
    id: "mia-atl", laneCode: "MIA -> ATL", origin: "Miami Spur", destination: "Atlanta Hub",
    departureWindow: "07:05-07:35", checkpoint: "Seal check passed", delayedParcels: 0,
    trailerFill: "91% trailer fill", tone: "steady", statusLabel: "Clear lane", exceptionIds: [],
    parcelGroups: [
      { id: "mia-1", label: "Priority cartons", count: 102, statusLabel: "Loaded", zone: "East dock" },
      { id: "mia-2", label: "Metro satchels", count: 87, statusLabel: "Loaded", zone: "East dock" },
      { id: "mia-3", label: "Returns mesh", count: 29, statusLabel: "Ready", zone: "Backhaul" },
    ],
  },
];

export const laneExceptions: LaneException[] = [
  {
    id: "lane-ex-1", laneId: "den-chi", type: "Sort gap",
    title: "Inbound cage 4 missed the final consolidation sweep",
    detail: "Forty-two priority cartons remained in the recycle buffer after the presort handoff.",
    severity: "high", owner: "North dock lead", updatedAt: "11m ago",
  },
  {
    id: "lane-ex-2", laneId: "den-chi", type: "Trailer reweigh",
    title: "Oversize pallet pair needs a second axle balance check",
    detail: "The lift zone flagged pallet spacing after the first trailer weight capture came in above plan.",
    severity: "medium", owner: "Lift zone team", updatedAt: "6m ago",
  },
  {
    id: "lane-ex-3", laneId: "phx-dfw", type: "Address hold",
    title: "Seven satchels are parked for suite validation before release",
    detail: "The route can still make cutoff, but local validation needs to clear before final manifest close.",
    severity: "medium", owner: "Address desk", updatedAt: "4m ago",
  },
  {
    id: "lane-ex-4", laneId: "phx-dfw", type: "Sort gap",
    title: "South spur scanner drifted during metro bundle induction",
    detail: "A temporary manual tally is active while the lane keeps the remaining satchel batch staged nearby.",
    severity: "high", owner: "Automation specialist", updatedAt: "2m ago",
  },
  {
    id: "lane-ex-5", laneId: "sea-sac", type: "Weather spillover",
    title: "Pad release is waiting on the marine-layer visibility check",
    detail: "The lane is still viable, but dispatch widened the departure window to absorb apron traffic and moisture checks.",
    severity: "low", owner: "Dispatch desk", updatedAt: "8m ago",
  },
];
