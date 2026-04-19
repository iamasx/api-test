export type SectorTone = "clear" | "watch" | "critical";
export type ContactTone = "steady" | "watch" | "critical";

export type SectorSummary = {
  id: string;
  label: string;
  corridor: string;
  tone: SectorTone;
  contactCount: number;
  alertCount: number;
  sweepCoverage: number;
  driftDelta: number;
  readiness: string;
};

export type ContactCard = {
  id: string;
  callsign: string;
  sectorId: string;
  sectorLabel: string;
  classification: string;
  tone: ContactTone;
  isAlerted: boolean;
  altitude: number;
  speed: number;
  heading: string;
  lastSeen: string;
  summary: string;
};

export type AlertMarker = {
  id: string;
  label: string;
  tone: ContactTone;
  count: number;
  detail: string;
};

export type InspectorDetail = {
  contactId: string;
  mission: string;
  origin: string;
  confidence: string;
  handoffWindow: string;
  snapshot: string;
  noteChips: string[];
  alertToggles: { id: string; label: string; description: string }[];
};

export const radarHeartbeatSeed = "2026-04-19T18:42:15.000Z";

export const sectors: SectorSummary[] = [
  { id: "nova", label: "Sector Nova", corridor: "North rim", tone: "critical", contactCount: 2, alertCount: 2, sweepCoverage: 94, driftDelta: 6, readiness: "Hold vector" },
  { id: "sigma", label: "Sector Sigma", corridor: "Harbor lane", tone: "watch", contactCount: 2, alertCount: 1, sweepCoverage: 89, driftDelta: 11, readiness: "Queue intercept" },
  { id: "orbit", label: "Sector Orbit", corridor: "Inner ring", tone: "clear", contactCount: 1, alertCount: 0, sweepCoverage: 98, driftDelta: 3, readiness: "Sweep stable" },
  { id: "vanta", label: "Sector Vanta", corridor: "Far west", tone: "clear", contactCount: 1, alertCount: 0, sweepCoverage: 91, driftDelta: 5, readiness: "Passive hold" },
];

export const contacts: ContactCard[] = [
  { id: "cinder-41", callsign: "Cinder-41", sectorId: "nova", sectorLabel: "Sector Nova", classification: "Fast mover", tone: "critical", isAlerted: true, altitude: 18200, speed: 612, heading: "047 NE", lastSeen: "18:42:15Z", summary: "High-energy climb crossing the north rim with unstable IFF returns." },
  { id: "helix-12", callsign: "Helix-12", sectorId: "nova", sectorLabel: "Sector Nova", classification: "Relay drone", tone: "watch", isAlerted: true, altitude: 12400, speed: 318, heading: "101 E", lastSeen: "18:41:52Z", summary: "Holding a shallow eastbound arc while relay telemetry drifts outside tolerance." },
  { id: "meridian-5", callsign: "Meridian-5", sectorId: "sigma", sectorLabel: "Sector Sigma", classification: "Surface skim", tone: "watch", isAlerted: true, altitude: 6400, speed: 274, heading: "189 S", lastSeen: "18:42:04Z", summary: "Harbor-lane contact pacing traffic flow with intermittent thermal bloom." },
  { id: "aster-3", callsign: "Aster-3", sectorId: "sigma", sectorLabel: "Sector Sigma", classification: "Cargo escort", tone: "steady", isAlerted: false, altitude: 9600, speed: 228, heading: "214 SW", lastSeen: "18:41:39Z", summary: "Clean transponder pair on a routine escort path toward the outer docks." },
  { id: "skipper-09", callsign: "Skipper-09", sectorId: "orbit", sectorLabel: "Sector Orbit", classification: "Survey wing", tone: "steady", isAlerted: false, altitude: 15100, speed: 192, heading: "332 NW", lastSeen: "18:41:18Z", summary: "Inner-ring survey loop remains inside assigned lane with stable telemetry." },
  { id: "rook-77", callsign: "Rook-77", sectorId: "vanta", sectorLabel: "Sector Vanta", classification: "Silent track", tone: "steady", isAlerted: false, altitude: 8700, speed: 246, heading: "278 W", lastSeen: "18:40:55Z", summary: "Low-signature track coasting west with no fresh alert tags in the stack." },
];

export const alertMarkers: AlertMarker[] = [
  { id: "burn", label: "Burn rate", tone: "critical", count: 2, detail: "Dual tracks exceeding nominal climb rate." },
  { id: "iff", label: "IFF drift", tone: "watch", count: 3, detail: "Reply cadence outside synthetic baseline." },
  { id: "handoff", label: "Handoff queue", tone: "watch", count: 1, detail: "One sector change pending confirmation." },
];

export const inspectorDetails: InspectorDetail[] = [
  { contactId: "cinder-41", mission: "North rim containment", origin: "Beacon lattice 3A", confidence: "94% track confidence", handoffWindow: "02:14 until ridge exit", snapshot: "Cinder-41 is the current priority burn marker with enough closure to trigger a manual intercept recommendation.", noteChips: ["IFF stale", "Pitch spike", "Crosswind bias"], alertToggles: [{ id: "intercept", label: "Flag intercept", description: "Promote to the local intercept queue." }, { id: "jam", label: "Jam check", description: "Mark for spectrum verification on the next sweep." }, { id: "handoff", label: "Hold handoff", description: "Keep this track inside the current sector until review." }] },
  { contactId: "helix-12", mission: "Relay integrity watch", origin: "Platform spine 6", confidence: "88% track confidence", handoffWindow: "03:27 until corridor edge", snapshot: "Helix-12 is maintaining route shape, but its relay signatures still pulse above the Nova watch band.", noteChips: ["Relay echo", "Vector split", "Low fuel bias"], alertToggles: [{ id: "stabilize", label: "Force stabilize", description: "Pin the contact to the current relay profile." }, { id: "probe", label: "Probe channel", description: "Queue a local telemetry replay check." }, { id: "shadow", label: "Shadow track", description: "Attach a second observer on the next cycle." }] },
  { contactId: "meridian-5", mission: "Harbor lane verification", origin: "Pier sweep node 2", confidence: "81% track confidence", handoffWindow: "01:46 until dock line", snapshot: "Meridian-5 moves with the shipping pattern, but periodic thermal bloom keeps it on the Sigma watch board.", noteChips: ["Thermal bloom", "Wake masking", "Pier clutter"], alertToggles: [{ id: "intercept", label: "Flag intercept", description: "Escalate this skim track for closer watch." }, { id: "quiet", label: "Quiet ping", description: "Suppress noncritical pings for the next pass." }, { id: "escort", label: "Assign escort", description: "Mark for a local escort recommendation." }] },
  { contactId: "aster-3", mission: "Escort continuity", origin: "Harbor relay mesh", confidence: "92% track confidence", handoffWindow: "04:11 until route merge", snapshot: "Aster-3 is clean and steady, serving as a low-noise reference track for the Sigma corridor.", noteChips: ["Cargo lane", "Stable transponder", "Routine merge"], alertToggles: [{ id: "mirror", label: "Mirror track", description: "Use this contact as a clean reference sample." }, { id: "handoff", label: "Prep handoff", description: "Stage the next sector transition." }, { id: "escort", label: "Extend escort", description: "Keep escort coverage on the next hop." }] },
  { contactId: "skipper-09", mission: "Inner ring survey", origin: "Survey mast 4", confidence: "96% track confidence", handoffWindow: "05:06 until loop reset", snapshot: "Skipper-09 remains the calmest track in the sweep and helps anchor Orbit-sector drift checks.", noteChips: ["Survey loop", "Clear lane", "Stable sync"], alertToggles: [{ id: "anchor", label: "Anchor drift", description: "Use this track as the drift baseline." }, { id: "mirror", label: "Mirror sweep", description: "Replay on the next orbit pass." }, { id: "quiet", label: "Quiet ping", description: "Reduce console noise from routine updates." }] },
  { contactId: "rook-77", mission: "Far west passive watch", origin: "Edge repeater 1", confidence: "84% track confidence", handoffWindow: "06:22 until fade line", snapshot: "Rook-77 is quiet, low-signature, and currently carries no active alert tags inside Sector Vanta.", noteChips: ["Silent track", "Low return", "Wide drift"], alertToggles: [{ id: "promote", label: "Promote watch", description: "Lift this track into the watch column manually." }, { id: "quiet", label: "Quiet ping", description: "Keep the console clear unless the tone changes." }, { id: "handoff", label: "Draft handoff", description: "Stage a westbound handoff package." }] },
];
