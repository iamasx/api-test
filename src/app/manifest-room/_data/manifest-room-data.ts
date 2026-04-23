export const manifestRoomOverview = {
  eyebrow: "Manifest Room / Dispatch Mock",
  title: "Stage grouped manifests, package rollups, and discrepancy follow-up before dispatch.",
  description:
    "The manifest room keeps outbound groups, package summaries, and compact discrepancy triage on one route so the shift lead can clear exceptions before the next wave closes.",
  primaryAction: "Review manifest groups",
  secondaryAction: "Open discrepancy panel",
};

export const packageSummaries = [
  { id: "cold-chain", label: "Cold-chain kits", manifested: "184 units", staged: "176 sealed", discrepancy: "2 temperature holds", note: "Split across docks D-14 and H-03 for staggered release." },
  { id: "archive-canisters", label: "Archive canisters", manifested: "68 canisters", staged: "64 scanned", discrepancy: "1 seal mismatch", note: "Cross-border relay depends on the final seal reconciliation." },
  { id: "specimen-sleeves", label: "Specimen sleeves", manifested: "420 sleeves", staged: "409 staged", discrepancy: "5 relabel checks", note: "Overflow volume is concentrated in the final-mile overflow group." },
  { id: "field-repair-packs", label: "Field repair packs", manifested: "52 kits", staged: "52 ready", discrepancy: "No open issues", note: "Ready for immediate release when the relay window opens." },
] as const;

export const manifestGroups = [
  {
    id: "cold-chain-departures",
    label: "Group 01",
    title: "Cold-chain departures",
    description: "Priority medical and preservation freight leaving on the first wave with temperature tracking attached to every manifest.",
    dock: "Dock D-14",
    cutoff: "18:20 local",
    manifests: [
      { id: "MN-2044", carrier: "Northline Air", lane: "Delta relay", departure: "18:05", status: "sealed", packages: [{ label: "Cryo cassettes", count: "24 cases", staging: "24 sealed" }, { label: "Gel stabilizers", count: "60 packs", staging: "58 staged" }] },
      { id: "MN-2047", carrier: "Blue Summit Cargo", lane: "Harbor transfer", departure: "18:18", status: "review", packages: [{ label: "Specimen sleeves", count: "108 sleeves", staging: "103 staged" }, { label: "Chain-of-custody tags", count: "108 tags", staging: "108 ready" }] },
    ],
  },
  {
    id: "cross-border-relay",
    label: "Group 02",
    title: "Cross-border relay",
    description: "Manifests that need customs-ready package labeling and seal confirmation before the relay truck clears the gate.",
    dock: "Dock B-06",
    cutoff: "19:05 local",
    manifests: [
      { id: "MN-2051", carrier: "Axis Freight", lane: "Northern border", departure: "18:50", status: "holding", packages: [{ label: "Archive canisters", count: "32 canisters", staging: "30 scanned" }, { label: "Repair packs", count: "18 kits", staging: "18 sealed" }] },
      { id: "MN-2055", carrier: "Relay Eight", lane: "South corridor", departure: "19:02", status: "review", packages: [{ label: "Specimen sleeves", count: "122 sleeves", staging: "120 staged" }, { label: "Archive canisters", count: "18 canisters", staging: "18 sealed" }] },
    ],
  },
  {
    id: "final-mile-overflow",
    label: "Group 03",
    title: "Final-mile overflow",
    description: "Overflow manifests held for same-day courier reassignment when the primary wave exceeds the planned package mix.",
    dock: "Dock H-03",
    cutoff: "20:10 local",
    manifests: [
      { id: "MN-2059", carrier: "Last Mile One", lane: "Metro west", departure: "19:40", status: "review", packages: [{ label: "Cold-chain kits", count: "36 units", staging: "34 sealed" }, { label: "Repair packs", count: "14 kits", staging: "14 ready" }] },
      { id: "MN-2062", carrier: "Courier Atlas", lane: "Metro east", departure: "20:05", status: "sealed", packages: [{ label: "Specimen sleeves", count: "190 sleeves", staging: "186 staged" }, { label: "Cold-chain kits", count: "28 units", staging: "28 sealed" }] },
    ],
  },
] as const;

export const manifestDiscrepancies = [
  { id: "disc-01", severity: "critical", title: "Seal count mismatch on archive canisters", manifestId: "MN-2051", packageLabel: "Archive canisters", detail: "Two canisters were scanned into staging without the second seal verification stamp.", action: "Hold border relay until seal audit clears.", owner: "J. Alvarez" },
  { id: "disc-02", severity: "watch", title: "Temperature hold on cold-chain kits", manifestId: "MN-2059", packageLabel: "Cold-chain kits", detail: "Sensor log showed a five-minute warming spike during dock reassignment.", action: "Replace the affected kits before overflow release.", owner: "M. Patel" },
  { id: "disc-03", severity: "watch", title: "Specimen sleeve relabel queue still open", manifestId: "MN-2047", packageLabel: "Specimen sleeves", detail: "Five sleeves still need destination relabeling after the harbor transfer lane changed.", action: "Close relabel task before final seal at 17:55.", owner: "R. Chen" },
  { id: "disc-04", severity: "resolved", title: "Courier reassignment cleared for metro east", manifestId: "MN-2062", packageLabel: "Specimen sleeves", detail: "Dispatch confirmed the courier swap and reprinted the route inserts for metro east.", action: "No further action, keep the manifest in the sealed queue.", owner: "S. Monroe" },
] as const;
