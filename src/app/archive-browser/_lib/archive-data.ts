export type ArchiveBadgeTone = "alert" | "verified" | "muted";

export type ArchiveMetadataBadge = {
  label: string;
  value: string;
  tone?: ArchiveBadgeTone;
};

export type ArchiveDetailRow = {
  label: string;
  value: string;
};

export type ArchiveDetailSection = {
  title: string;
  description: string;
  rows: ArchiveDetailRow[];
};

export type ArchiveTimelineEntry = {
  label: string;
  timestamp: string;
  detail: string;
};

export type ArchiveSnapshot = {
  id: string;
  label: string;
  title: string;
  summary: string;
  source: string;
  archivedAt: string;
  archivedLabel: string;
  captureRange: string;
  status: string;
  assetCount: number;
  storageFootprintGb: number;
  storageFootprintLabel: string;
  tags: string[];
  metadataBadges: ArchiveMetadataBadge[];
  detailSections: ArchiveDetailSection[];
  timelineEntries: ArchiveTimelineEntry[];
  recoveryNotes: string[];
};

export const archiveSnapshots: ArchiveSnapshot[] = [
  {
    id: "glass-harbor-incident-ledger",
    label: "Snapshot 07",
    title: "Glass Harbor incident ledger",
    summary:
      "Quarter-close manifests, dock incident reports, and witness addenda preserved as a single evidentiary archive for replay drills.",
    source: "Glass Harbor Port Authority",
    archivedAt: "2026-04-18T06:20:00Z",
    archivedLabel: "April 18, 2026 at 06:20 UTC",
    captureRange: "January 03, 2026 to April 11, 2026",
    status: "Sealed for audit replay",
    assetCount: 18420,
    storageFootprintGb: 42.6,
    storageFootprintLabel: "42.6 GB",
    tags: ["incidents", "port", "audit-ready"],
    metadataBadges: [
      { label: "Retention", value: "12-year legal hold", tone: "alert" },
      { label: "Integrity", value: "Merkle-sealed ledger", tone: "verified" },
      { label: "Vault", value: "Reykjavik cold tier", tone: "muted" },
    ],
    detailSections: [
      {
        title: "Archive package",
        description:
          "The package keeps manifests, signed statements, and redaction notes together so investigators can review a single archive surface.",
        rows: [
          { label: "Primary contents", value: "Berth logs, manifests, witness PDFs" },
          { label: "Packaging mode", value: "Quarter-close export with chain receipt" },
          { label: "Review profile", value: "Incident replay and compliance audit" },
        ],
      },
      {
        title: "Preservation controls",
        description:
          "Every ledger slice is hashed independently before the final seal is written into the archive index.",
        rows: [
          { label: "Digest family", value: "SHA-256 with 98 leaf groups" },
          { label: "Replica count", value: "3 geosealed copies" },
          { label: "Tamper handling", value: "Quarantine on digest mismatch" },
        ],
      },
      {
        title: "Access expectations",
        description:
          "Public drill scenarios can inspect event narratives, but the archive keeps customs annotations behind a restricted review gate.",
        rows: [
          { label: "Access lane", value: "Audit-only request flow" },
          { label: "Restricted fields", value: "Customs notes and witness contact data" },
          { label: "Restore target", value: "11-minute partial hydrate" },
        ],
      },
    ],
    timelineEntries: [
      {
        label: "Collection frozen",
        timestamp: "April 11, 2026 at 22:05 UTC",
        detail: "Berth logs and statements were locked after the quarter-close export passed reconciliation.",
      },
      {
        label: "Seal issued",
        timestamp: "April 18, 2026 at 06:20 UTC",
        detail: "The North Atlantic compliance desk countersigned the archive ledger and pushed it into cold storage.",
      },
      {
        label: "Drill approved",
        timestamp: "April 19, 2026 at 09:30 UTC",
        detail: "The archive was cleared for rehearsal use with redaction-safe witness references.",
      },
    ],
    recoveryNotes: [
      "Witness addenda stay cross-linked to berth incident IDs for deterministic replay.",
      "Camera manifests retain reel offsets without bundling raw video payloads.",
      "Redaction-safe drill exports are generated from the sealed ledger, not from live systems.",
    ],
  },
  {
    id: "northwind-evacuation-audio-bundle",
    label: "Snapshot 06",
    title: "Northwind evacuation audio bundle",
    summary:
      "Dispatch room recordings, operator transcripts, and route-change annotations archived after the evacuation readiness exercise.",
    source: "Northwind Transit Command",
    archivedAt: "2026-03-27T15:45:00Z",
    archivedLabel: "March 27, 2026 at 15:45 UTC",
    captureRange: "February 09, 2026 to March 25, 2026",
    status: "Ready for supervised playback",
    assetCount: 9621,
    storageFootprintGb: 88.1,
    storageFootprintLabel: "88.1 GB",
    tags: ["audio", "dispatch", "exercise"],
    metadataBadges: [
      { label: "Retention", value: "8-year operations baseline", tone: "alert" },
      { label: "Integrity", value: "Waveform parity verified", tone: "verified" },
      { label: "Vault", value: "Zurich warm mirror", tone: "muted" },
    ],
    detailSections: [
      {
        title: "Archive package",
        description:
          "Source audio sits beside transcript excerpts and route overrides so review teams can trace each dispatch decision.",
        rows: [
          { label: "Primary contents", value: "WAV bundles, transcript slices, route notes" },
          { label: "Session grouping", value: "Operator shift and dispatch event pair" },
          { label: "Review profile", value: "Exercise playback and after-action review" },
        ],
      },
      {
        title: "Preservation controls",
        description:
          "Audio archives prioritize playback fidelity first, then layer verification metadata for drift detection.",
        rows: [
          { label: "Checksum pair", value: "BLAKE3 plus sample-range parity" },
          { label: "Replica count", value: "2 warm copies and 1 tape export" },
          { label: "Drift handling", value: "Frame mismatch flagged before restore" },
        ],
      },
      {
        title: "Access expectations",
        description:
          "Exercises can replay command audio, but participant identifiers remain masked outside the review room.",
        rows: [
          { label: "Access lane", value: "Training review with custodian approval" },
          { label: "Restricted fields", value: "Operator identities and emergency contact notes" },
          { label: "Restore target", value: "6-minute targeted retrieval" },
        ],
      },
    ],
    timelineEntries: [
      {
        label: "Audio normalized",
        timestamp: "March 25, 2026 at 20:14 UTC",
        detail: "Shift recordings were re-bucketed by dispatch event and operator handoff.",
      },
      {
        label: "Seal issued",
        timestamp: "March 27, 2026 at 15:45 UTC",
        detail: "Transit records signed the archive and synchronized the warm mirror copies.",
      },
      {
        label: "Playback certified",
        timestamp: "March 28, 2026 at 10:05 UTC",
        detail: "Exercise coordinators confirmed the bundle for supervised playback use.",
      },
    ],
    recoveryNotes: [
      "Transcript slices preserve speaker changes at the second-level timestamp.",
      "Route override notes remain attached to the dispatch event that triggered them.",
      "Warm mirror recovery is optimized for a single route or control room rather than the full bundle.",
    ],
  },
  {
    id: "solstice-orchard-sensor-rollup",
    label: "Snapshot 05",
    title: "Solstice orchard sensor rollup",
    summary:
      "Environmental sensor streams, irrigation overrides, and technician notebook excerpts preserved after a seasonal yield study.",
    source: "Solstice Orchard Lab",
    archivedAt: "2026-02-16T11:10:00Z",
    archivedLabel: "February 16, 2026 at 11:10 UTC",
    captureRange: "October 02, 2025 to February 12, 2026",
    status: "Indexed for comparative review",
    assetCount: 27104,
    storageFootprintGb: 74.3,
    storageFootprintLabel: "74.3 GB",
    tags: ["sensors", "agriculture", "comparative-study"],
    metadataBadges: [
      { label: "Retention", value: "5-year research baseline", tone: "alert" },
      { label: "Integrity", value: "Parity pass complete", tone: "verified" },
      { label: "Vault", value: "Low-latency mirror tier", tone: "muted" },
    ],
    detailSections: [
      {
        title: "Archive package",
        description:
          "Telemetry is grouped with manual notebook corrections so reviewers can inspect human intervention beside the raw sensor history.",
        rows: [
          { label: "Primary contents", value: "Telemetry packets, override logs, field notes" },
          { label: "Session grouping", value: "Irrigation zone and harvest cycle" },
          { label: "Review profile", value: "Yield anomaly comparison" },
        ],
      },
      {
        title: "Preservation controls",
        description:
          "The archive compresses high-frequency telemetry after signing so long-range comparisons stay practical without weakening auditability.",
        rows: [
          { label: "Compression", value: "Zstandard level 9" },
          { label: "Replica count", value: "2 mirrors with weekly verify" },
          { label: "Replay handling", value: "Out-of-order sensor packets flagged" },
        ],
      },
      {
        title: "Access expectations",
        description:
          "Researchers can query trend summaries quickly, but full notebook extracts stay restricted to the field operations team.",
        rows: [
          { label: "Access lane", value: "Research review with notebook gating" },
          { label: "Restricted fields", value: "Technician initials and manual override reasons" },
          { label: "Restore target", value: "4-hour complete replay window" },
        ],
      },
    ],
    timelineEntries: [
      {
        label: "Sensor window closed",
        timestamp: "February 12, 2026 at 17:05 UTC",
        detail: "The seasonal export locked after the final irrigation cycle was certified.",
      },
      {
        label: "Seal issued",
        timestamp: "February 16, 2026 at 11:10 UTC",
        detail: "Research ops wrote the sealed rollup and synchronized the mirror tier.",
      },
      {
        label: "Comparison set approved",
        timestamp: "February 17, 2026 at 07:55 UTC",
        detail: "Analysts cleared the archive for cross-season comparison work.",
      },
    ],
    recoveryNotes: [
      "Field notes remain anchored to the irrigation zone that triggered the manual override.",
      "Trend queries can restore a single zone without hydrating the full season.",
      "Comparative review exports omit technician names by default.",
    ],
  },
  {
    id: "opal-delta-forecast-freeze",
    label: "Snapshot 04",
    title: "Opal Delta forecast freeze",
    summary:
      "Hydrology model checkpoints, boundary assumptions, and policy review notes archived after the annual flood calibration freeze.",
    source: "Opal Delta Modeling Desk",
    archivedAt: "2025-12-03T08:00:00Z",
    archivedLabel: "December 03, 2025 at 08:00 UTC",
    captureRange: "August 15, 2025 to November 26, 2025",
    status: "Queued for policy inspection",
    assetCount: 7614,
    storageFootprintGb: 129.1,
    storageFootprintLabel: "129.1 GB",
    tags: ["forecast", "hydrology", "policy"],
    metadataBadges: [
      { label: "Retention", value: "10-year policy baseline", tone: "alert" },
      { label: "Integrity", value: "Scenario checks approved", tone: "verified" },
      { label: "Vault", value: "Delta research reserve", tone: "muted" },
    ],
    detailSections: [
      {
        title: "Archive package",
        description:
          "Forecast checkpoints stay bundled with scenario notes so downstream reviewers can understand why a model state was frozen.",
        rows: [
          { label: "Primary contents", value: "NetCDF frames, scenario notes, policy review memo" },
          { label: "Session grouping", value: "Calibration family and basin region" },
          { label: "Review profile", value: "Engineering and policy inspection" },
        ],
      },
      {
        title: "Preservation controls",
        description:
          "Partial restore is favored over full hydrate because the policy workflow usually inspects one basin region at a time.",
        rows: [
          { label: "Primary media", value: "Research object tier with frame map" },
          { label: "Replica count", value: "1 reserve plus monthly replay sample" },
          { label: "Validation routine", value: "Monthly high-variance scenario replay" },
        ],
      },
      {
        title: "Access expectations",
        description:
          "Policy reviewers can browse notes and outputs, but mutable model inputs remain isolated from the frozen archive path.",
        rows: [
          { label: "Access lane", value: "Policy review with engineering escrow" },
          { label: "Restricted fields", value: "Mutable calibration inputs and draft scenarios" },
          { label: "Restore target", value: "Frame-first partial hydrate" },
        ],
      },
    ],
    timelineEntries: [
      {
        label: "Calibration frozen",
        timestamp: "November 26, 2025 at 19:00 UTC",
        detail: "The final surge and release scenarios were locked for external review.",
      },
      {
        label: "Seal issued",
        timestamp: "December 03, 2025 at 08:00 UTC",
        detail: "The modeling desk finalized the archive and wrote it into the research reserve.",
      },
      {
        label: "Policy queue opened",
        timestamp: "December 04, 2025 at 12:40 UTC",
        detail: "Regional policy reviewers received the frame map and note index.",
      },
    ],
    recoveryNotes: [
      "Scenario markdown notes remain versioned against their checkpoint family.",
      "Partial restore can hydrate a single basin region without reading the full grid set.",
      "Monthly replay samples focus on high-variance surge scenarios first.",
    ],
  },
];
