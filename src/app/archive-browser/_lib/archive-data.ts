export type ArchiveBadgeTone = "attention" | "calm" | "neutral";

export type ArchiveMetadataBadge = {
  label: string;
  value: string;
  tone?: ArchiveBadgeTone;
};

export type ArchiveMetric = {
  label: string;
  value: string;
};

export type ArchiveDetailEntry = {
  label: string;
  value: string;
};

export type ArchiveDetailSection = {
  title: string;
  description: string;
  entries: ArchiveDetailEntry[];
};

export type ArchiveSnapshot = {
  id: string;
  title: string;
  summary: string;
  source: string;
  archivedAt: string;
  archivedLabel: string;
  timeline: string;
  assetCount: number;
  storageFootprintGb: number;
  storageFootprintLabel: string;
  metadataBadges: ArchiveMetadataBadge[];
  highlightMetrics: ArchiveMetric[];
  detailSections: ArchiveDetailSection[];
  recoveryNotes: string[];
};

export const archiveSnapshots: ArchiveSnapshot[] = [
  {
    id: "glass-harbor-incident-ledger",
    title: "Glass Harbor / Incident ledger",
    summary:
      "Port authority incident reports, dock camera manifests, and signed witness addenda sealed after the quarterly reconciliation pass.",
    source: "Glass Harbor Port Authority",
    archivedAt: "2026-04-16",
    archivedLabel: "April 16, 2026",
    timeline: "January 3, 2026 to April 11, 2026",
    assetCount: 18420,
    storageFootprintGb: 42.6,
    storageFootprintLabel: "42.6 GB",
    metadataBadges: [
      { label: "Verification", value: "Merkle sealed", tone: "calm" },
      { label: "Retention", value: "12-year legal hold", tone: "attention" },
      { label: "Format", value: "CSV + signed PDFs", tone: "neutral" },
      { label: "Vault", value: "Reykjavik cold tier", tone: "neutral" },
    ],
    highlightMetrics: [
      { label: "Indexed records", value: "18,420" },
      { label: "Replication", value: "3 geosealed copies" },
      { label: "Primary digest", value: "SHA-256 / 98 groups" },
      { label: "Access profile", value: "Audit-only rotation" },
    ],
    detailSections: [
      {
        title: "Acquisition profile",
        description:
          "The seal was cut from the authority's quarter-close export window with all manifests reconciled against live berth assignments.",
        entries: [
          { label: "Collection method", value: "Automated export + chain receipt" },
          { label: "Captured systems", value: "Berth logs, CCTV indexes, customs notes" },
          { label: "Window length", value: "99 days" },
        ],
      },
      {
        title: "Integrity controls",
        description:
          "Each payload segment is hashed individually, then stitched into a signed ledger to support selective verification during review.",
        entries: [
          { label: "Hash tree", value: "98 leaf groups" },
          { label: "Seal authority", value: "North Atlantic compliance desk" },
          { label: "Tamper response", value: "Quarantine on digest mismatch" },
        ],
      },
      {
        title: "Custody trail",
        description:
          "The handoff path is short and documented, which makes this snapshot a reliable reference set for testable UI states.",
        entries: [
          { label: "Origin signer", value: "Marin Kappel" },
          { label: "Vault intake", value: "April 16, 2026 / 09:14 UTC" },
          { label: "Review cadence", value: "Semiannual spot check" },
        ],
      },
    ],
    recoveryNotes: [
      "Witness addenda remain cross-linked to berth incident IDs for replay.",
      "Camera manifests preserve source reel offsets but not the video payload.",
      "A subset of customs notes is intentionally redacted for public drill scenarios.",
    ],
  },
  {
    id: "sable-atlas-survey-mosaic",
    title: "Sable Atlas / Survey mosaic",
    summary:
      "Orthographic survey tiles and annotation overlays archived after the terrain team completed a full coastal remap.",
    source: "Atlas Survey Office",
    archivedAt: "2026-03-28",
    archivedLabel: "March 28, 2026",
    timeline: "December 18, 2025 to March 22, 2026",
    assetCount: 9328,
    storageFootprintGb: 186.4,
    storageFootprintLabel: "186.4 GB",
    metadataBadges: [
      { label: "Verification", value: "Frame-by-frame parity", tone: "calm" },
      { label: "Retention", value: "Permanent survey reference", tone: "attention" },
      { label: "Format", value: "GeoTIFF + JSON overlays", tone: "neutral" },
      { label: "Vault", value: "Svalbard map store", tone: "neutral" },
    ],
    highlightMetrics: [
      { label: "Tile groups", value: "1,184 stitched panels" },
      { label: "Spatial coverage", value: "486 coastal km" },
      { label: "Overlay revisions", value: "41 signed revisions" },
      { label: "Recovery target", value: "14 minute warm restore" },
    ],
    detailSections: [
      {
        title: "Capture profile",
        description:
          "Survey flights were normalized into a single index so any tile can be recalled without reconstructing the full mission path.",
        entries: [
          { label: "Sensor stack", value: "Lidar, visible light, tide overlays" },
          { label: "Resolution band", value: "12 cm to 18 cm ground sampling" },
          { label: "Anchor grid", value: "Northshore 7B geodetic map" },
        ],
      },
      {
        title: "Preservation profile",
        description:
          "The archive stores raw tiles beside finalized overlays, which makes side-by-side historical inspection possible in the detail view.",
        entries: [
          { label: "Primary store", value: "Immutable object tier" },
          { label: "Replica store", value: "Tape vault / quarterly verify" },
          { label: "Checksum set", value: "Dual SHA-256 and BLAKE3" },
        ],
      },
      {
        title: "Custody trail",
        description:
          "This snapshot has a longer handling chain because the survey office and terrain team sign off independently.",
        entries: [
          { label: "Mission supervisor", value: "Elin Duarte" },
          { label: "Archive intake", value: "March 28, 2026 / 18:42 UTC" },
          { label: "Public release status", value: "Internal only" },
        ],
      },
    ],
    recoveryNotes: [
      "Overlay revisions preserve author initials and approval timestamps.",
      "Tile seams are stored after correction but before color grading.",
      "Warm restore targets assume the annotation layer is requested first.",
    ],
  },
  {
    id: "aurora-station-shift-telemetry",
    title: "Aurora Station / Shift telemetry",
    summary:
      "Shift summaries, power draw telemetry, and handover annotations bundled from the station's winter operations cycle.",
    source: "Aurora Deep Field",
    archivedAt: "2026-02-14",
    archivedLabel: "February 14, 2026",
    timeline: "November 1, 2025 to February 8, 2026",
    assetCount: 27104,
    storageFootprintGb: 74.3,
    storageFootprintLabel: "74.3 GB",
    metadataBadges: [
      { label: "Verification", value: "Parity pass complete", tone: "calm" },
      { label: "Retention", value: "7-year ops baseline", tone: "attention" },
      { label: "Format", value: "NDJSON + plain text logs", tone: "neutral" },
      { label: "Vault", value: "Low-latency mirror tier", tone: "neutral" },
    ],
    highlightMetrics: [
      { label: "Shift packets", value: "27,104" },
      { label: "Telemetry streams", value: "19 synchronized feeds" },
      { label: "Alert density", value: "0.7% escalated events" },
      { label: "Replay mode", value: "Chronological stream" },
    ],
    detailSections: [
      {
        title: "Operations profile",
        description:
          "Station telemetry is grouped by handover window so investigators can step through a shift transition without reindexing the archive.",
        entries: [
          { label: "Grouping key", value: "Shift handover timestamp" },
          { label: "Packet cadence", value: "30 second aggregates" },
          { label: "Alert source", value: "Power, climate, access control" },
        ],
      },
      {
        title: "Integrity controls",
        description:
          "Telemetry packets were compacted after signing, preserving audit value while keeping the overall archive footprint low.",
        entries: [
          { label: "Compression", value: "Zstandard level 9" },
          { label: "Digest envelope", value: "Hourly signed manifests" },
          { label: "Replay integrity", value: "Out-of-order packets flagged" },
        ],
      },
      {
        title: "Custody trail",
        description:
          "Operations staff can request extracts, but the sealed archive remains managed by the infrastructure records team.",
        entries: [
          { label: "Origin signer", value: "Yara Brenn" },
          { label: "Records custodian", value: "Infrastructure archives team" },
          { label: "Inspection SLA", value: "4 hours" },
        ],
      },
    ],
    recoveryNotes: [
      "Shift annotations include free-text notes for equipment swaps.",
      "Escalated events are mirrored into a separate compliance notebook.",
      "The mirror tier is optimized for query-heavy drills and rehearsals.",
    ],
  },
  {
    id: "cinder-census-intake-registry",
    title: "Cinder Census / Intake registry",
    summary:
      "Registry rows, intake correspondence, and exception routing notes captured after the annual census reconciliation.",
    source: "Cinder Civic Office",
    archivedAt: "2026-01-09",
    archivedLabel: "January 9, 2026",
    timeline: "September 12, 2025 to January 4, 2026",
    assetCount: 14382,
    storageFootprintGb: 33.9,
    storageFootprintLabel: "33.9 GB",
    metadataBadges: [
      { label: "Verification", value: "Dual-sign release", tone: "calm" },
      { label: "Retention", value: "20-year civic record", tone: "attention" },
      { label: "Format", value: "Delimited rows + OCR PDFs", tone: "neutral" },
      { label: "Vault", value: "Municipal amber tier", tone: "neutral" },
    ],
    highlightMetrics: [
      { label: "Registry rows", value: "14,382" },
      { label: "Exception cases", value: "312 routed files" },
      { label: "OCR confidence", value: "97.4% median" },
      { label: "Disclosure profile", value: "Case-by-case export" },
    ],
    detailSections: [
      {
        title: "Acquisition profile",
        description:
          "The intake registry combines structured census rows with attached correspondence so reviewers can reconcile a household file in one place.",
        entries: [
          { label: "Intake channel", value: "Batch import + manual attachments" },
          { label: "Normalization pass", value: "Address and identifier cleanup" },
          { label: "Backfill status", value: "Complete through filing period 01" },
        ],
      },
      {
        title: "Preservation profile",
        description:
          "Records are optimized for long retention, so the archive keeps rendered OCR outputs beside source scans and case notes.",
        entries: [
          { label: "Storage mix", value: "Object store + offline tape" },
          { label: "Audit markers", value: "Household ID, filing route, reviewer" },
          { label: "Redaction mode", value: "Immutable derivative copies" },
        ],
      },
      {
        title: "Custody trail",
        description:
          "Municipal archives require two signers before a seal is accepted into the amber tier vault.",
        entries: [
          { label: "Origin signer", value: "Toma Eres" },
          { label: "Second signer", value: "Iris Fen" },
          { label: "Audit review", value: "Annual statutory review" },
        ],
      },
    ],
    recoveryNotes: [
      "OCR PDFs are stored with a reference back to the original scan bundle.",
      "Exception routing notes stay searchable by household identifier.",
      "Derivative redactions are materialized up front for faster review drills.",
    ],
  },
  {
    id: "opal-delta-forecast-frames",
    title: "Opal Delta / Forecast frames",
    summary:
      "Hydrology forecast grids and scenario notes preserved after the flood-model calibration cycle was frozen for external review.",
    source: "Opal Delta Modeling Desk",
    archivedAt: "2025-12-03",
    archivedLabel: "December 3, 2025",
    timeline: "August 15, 2025 to November 26, 2025",
    assetCount: 7614,
    storageFootprintGb: 129.1,
    storageFootprintLabel: "129.1 GB",
    metadataBadges: [
      { label: "Verification", value: "Scenario checks approved", tone: "calm" },
      { label: "Retention", value: "10-year policy baseline", tone: "attention" },
      { label: "Format", value: "NetCDF + markdown notes", tone: "neutral" },
      { label: "Vault", value: "Delta research reserve", tone: "neutral" },
    ],
    highlightMetrics: [
      { label: "Model frames", value: "7,614 archived states" },
      { label: "Calibration bands", value: "23 scenario families" },
      { label: "Restore path", value: "Frame-first partial hydrate" },
      { label: "Review profile", value: "Policy and engineering teams" },
    ],
    detailSections: [
      {
        title: "Model capture",
        description:
          "The archive stores forecast frames as checkpoints with linked scenario notes, making this a good test subject for a detail-heavy route.",
        entries: [
          { label: "Checkpoint interval", value: "Every 45 simulated minutes" },
          { label: "Scenario families", value: "Seasonal surge and dam release" },
          { label: "Boundaries", value: "Delta basin v4.2" },
        ],
      },
      {
        title: "Preservation controls",
        description:
          "Forecast frames are expensive to regenerate, so the seal favors rapid partial restore over compact storage alone.",
        entries: [
          { label: "Primary media", value: "Research object tier" },
          { label: "Fast lane", value: "Partial hydrate from frame map" },
          { label: "Validation routine", value: "Monthly replay sample" },
        ],
      },
      {
        title: "Custody trail",
        description:
          "The modeling desk is the origin owner, but policy reviewers control downstream access after the snapshot is frozen.",
        entries: [
          { label: "Origin signer", value: "Pavel Noor" },
          { label: "Policy liaison", value: "Rina Sol" },
          { label: "External review state", value: "Queued" },
        ],
      },
    ],
    recoveryNotes: [
      "Scenario markdown notes remain versioned against frame checkpoints.",
      "Partial hydrate can target a single basin region without restoring the full grid.",
      "Monthly replay samples focus on high-variance surge scenarios.",
    ],
  },
];
