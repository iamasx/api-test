export type ArchiveVaultBadgeTone = "accent" | "caution" | "steady";

export type ArchiveVaultMetadataBadge = {
  label: string;
  value: string;
  tone?: ArchiveVaultBadgeTone;
};

export type ArchiveVaultDetailRow = {
  label: string;
  value: string;
};

export type ArchiveVaultDetailSummary = {
  heading: string;
  overview: string;
  comparisonReadiness: string;
  reviewWindow: string;
  rows: ArchiveVaultDetailRow[];
};

export type ArchiveVaultSnapshot = {
  id: string;
  label: string;
  title: string;
  archivedAt: string;
  archivedLabel: string;
  status: string;
  source: string;
  vaultZone: string;
  summary: string;
  tags: string[];
  metadataBadges: ArchiveVaultMetadataBadge[];
  detailSummary: ArchiveVaultDetailSummary;
};

export type ArchiveVaultSnapshotGroup = {
  id: string;
  eyebrow: string;
  title: string;
  description: string;
  snapshots: ArchiveVaultSnapshot[];
};

export const archiveVaultSnapshotGroups: ArchiveVaultSnapshotGroup[] = [
  {
    id: "audit-holds",
    eyebrow: "Audit holds",
    title: "Preserved compliance archives",
    description:
      "Long-lived archive packages kept comparison-ready for external review windows and replay drills.",
    snapshots: [
      {
        id: "harbor-customs-ledger",
        label: "Snapshot 09",
        title: "Harbor customs ledger",
        archivedAt: "2026-04-19T05:40:00Z",
        archivedLabel: "April 19, 2026 at 05:40 UTC",
        status: "Sealed for legal review",
        source: "Glass Harbor Customs Desk",
        vaultZone: "North Atlantic cold tier",
        summary:
          "Quarter-close customs entries, release memos, and dock annotations bundled into a review-safe archive ledger.",
        tags: ["customs", "audit", "sealed-ledger"],
        metadataBadges: [
          {
            label: "Retention",
            value: "12-year legal hold",
            tone: "caution",
          },
          {
            label: "Integrity",
            value: "Merkle seal verified",
            tone: "steady",
          },
          {
            label: "Mirror",
            value: "2 geo-locked copies",
            tone: "accent",
          },
        ],
        detailSummary: {
          heading: "Use as the baseline for customs dispute playback",
          overview:
            "The ledger keeps release signatures and correction notes in a single sealed package so reviewers can compare each amendment against the archived original.",
          comparisonReadiness:
            "Every correction batch is indexed by berth and release cycle, which keeps side-by-side comparisons deterministic during audit replay.",
          reviewWindow: "Primary review window: within 9 minutes of hydrate request",
          rows: [
            { label: "Primary focus", value: "Release memos versus correction notes" },
            { label: "Baseline slice", value: "Q1 berth 3 through berth 11 ledgers" },
            { label: "Review owner", value: "Port compliance and legal liaison" },
          ],
        },
      },
      {
        id: "relay-incident-docket",
        label: "Snapshot 08",
        title: "Relay incident docket",
        archivedAt: "2026-04-11T14:15:00Z",
        archivedLabel: "April 11, 2026 at 14:15 UTC",
        status: "Audit replay approved",
        source: "Inland Relay Oversight",
        vaultZone: "Frankfurt compliance mirror",
        summary:
          "Escalation notes, route overrides, and witness summaries preserved for internal incident board comparisons.",
        tags: ["incident", "oversight", "comparison-ready"],
        metadataBadges: [
          {
            label: "Retention",
            value: "8-year oversight baseline",
            tone: "caution",
          },
          {
            label: "Integrity",
            value: "Digest chain complete",
            tone: "steady",
          },
          {
            label: "Access",
            value: "Board review only",
            tone: "accent",
          },
        ],
        detailSummary: {
          heading: "Use as the operator handoff comparison set",
          overview:
            "The archive pairs every route override with the operator shift handoff that triggered it, making replay and accountability checks easier to compare.",
          comparisonReadiness:
            "Docket entries are grouped by escalation lane, so discrepancy review can scan the original route change and every follow-up note together.",
          reviewWindow: "Primary review window: within 14 minutes of hydrate request",
          rows: [
            { label: "Primary focus", value: "Overrides versus shift handoff notes" },
            { label: "Baseline slice", value: "Signal lanes 2A, 3C, and 4B" },
            { label: "Review owner", value: "Incident board recorder" },
          ],
        },
      },
    ],
  },
  {
    id: "operational-recovery",
    eyebrow: "Operational recovery",
    title: "Restorable command archives",
    description:
      "Archive sets optimized for fast targeted restores when operations teams need evidence, transcripts, or dispatch context.",
    snapshots: [
      {
        id: "evacuation-audio-trace",
        label: "Snapshot 07",
        title: "Evacuation audio trace",
        archivedAt: "2026-03-28T16:05:00Z",
        archivedLabel: "March 28, 2026 at 16:05 UTC",
        status: "Ready for supervised playback",
        source: "Northwind Transit Command",
        vaultZone: "Zurich warm mirror",
        summary:
          "Command-room audio, route change transcripts, and operator acknowledgements kept together for playback-led review.",
        tags: ["audio", "dispatch", "playback"],
        metadataBadges: [
          {
            label: "Retention",
            value: "6-year operations baseline",
            tone: "caution",
          },
          {
            label: "Integrity",
            value: "Waveform parity verified",
            tone: "steady",
          },
          {
            label: "Restore",
            value: "Single-route hydrate",
            tone: "accent",
          },
        ],
        detailSummary: {
          heading: "Use as the playback source for route escalation drills",
          overview:
            "Audio blocks are aligned with transcript excerpts and route overrides so drill leads can compare the spoken command with the resulting network action.",
          comparisonReadiness:
            "Every dispatch event carries a transcript pointer and operator acknowledgement window, which keeps route-by-route playback aligned without manual stitching.",
          reviewWindow: "Primary review window: within 6 minutes of hydrate request",
          rows: [
            { label: "Primary focus", value: "Operator audio versus transcript slices" },
            { label: "Baseline slice", value: "Routes N4, E2, and bypass lane C" },
            { label: "Review owner", value: "Transit exercise coordinator" },
          ],
        },
      },
      {
        id: "storm-shelter-occupancy-rollup",
        label: "Snapshot 06",
        title: "Storm shelter occupancy rollup",
        archivedAt: "2026-03-04T08:25:00Z",
        archivedLabel: "March 04, 2026 at 08:25 UTC",
        status: "Indexed for spot recovery",
        source: "Civic Response Hub",
        vaultZone: "Oslo warm standby",
        summary:
          "Shelter census logs, supply checklists, and reassignment notes preserved for targeted restore during weather events.",
        tags: ["shelter", "response", "spot-restore"],
        metadataBadges: [
          {
            label: "Retention",
            value: "5-year response baseline",
            tone: "caution",
          },
          {
            label: "Integrity",
            value: "Replica quorum satisfied",
            tone: "steady",
          },
          {
            label: "Restore",
            value: "Zone-scoped recovery",
            tone: "accent",
          },
        ],
        detailSummary: {
          heading: "Use as the occupancy comparison anchor across zones",
          overview:
            "The rollup links census snapshots with supply deltas, which lets operators compare occupancy swings against the inventory decisions made at the same moment.",
          comparisonReadiness:
            "Every zone is versioned independently so the panel can compare a single shelter corridor without loading the full event package.",
          reviewWindow: "Primary review window: within 11 minutes of hydrate request",
          rows: [
            { label: "Primary focus", value: "Occupancy swings versus supply reassignments" },
            { label: "Baseline slice", value: "Zones North, River, and East Annex" },
            { label: "Review owner", value: "Weather response desk" },
          ],
        },
      },
    ],
  },
  {
    id: "research-baselines",
    eyebrow: "Research baselines",
    title: "Comparative study archives",
    description:
      "Evidence packages preserved for slow-moving comparative review, trend analysis, and replay of intervention points.",
    snapshots: [
      {
        id: "orchard-sensor-baseline",
        label: "Snapshot 05",
        title: "Orchard sensor baseline",
        archivedAt: "2026-02-17T10:30:00Z",
        archivedLabel: "February 17, 2026 at 10:30 UTC",
        status: "Research review ready",
        source: "Solstice Orchard Lab",
        vaultZone: "Low-latency mirror tier",
        summary:
          "Telemetry packets, irrigation overrides, and notebook excerpts archived for seasonal comparison work.",
        tags: ["telemetry", "agriculture", "seasonal-study"],
        metadataBadges: [
          {
            label: "Retention",
            value: "5-year research baseline",
            tone: "caution",
          },
          {
            label: "Integrity",
            value: "Parity pass complete",
            tone: "steady",
          },
          {
            label: "Compare",
            value: "Harvest-cycle aligned",
            tone: "accent",
          },
        ],
        detailSummary: {
          heading: "Use as the baseline for intervention point analysis",
          overview:
            "The archive joins sensor drift, manual overrides, and notebook commentary so researchers can compare automation decisions with field intervention in one package.",
          comparisonReadiness:
            "Telemetry is indexed by irrigation zone and harvest cycle, which makes seasonal side-by-side comparisons consistent even when packet rates differ.",
          reviewWindow: "Primary review window: within 4 hours of full replay request",
          rows: [
            { label: "Primary focus", value: "Sensor drift versus manual overrides" },
            { label: "Baseline slice", value: "Harvest cycles 2 through 5" },
            { label: "Review owner", value: "Yield anomaly review team" },
          ],
        },
      },
      {
        id: "reef-survey-image-stack",
        label: "Snapshot 04",
        title: "Reef survey image stack",
        archivedAt: "2026-01-26T12:55:00Z",
        archivedLabel: "January 26, 2026 at 12:55 UTC",
        status: "Curated for comparative review",
        source: "Pelagic Survey Cooperative",
        vaultZone: "Lisbon cold reference tier",
        summary:
          "Image captures, annotation overlays, and diver notes preserved as a single comparison set for habitat review.",
        tags: ["imagery", "survey", "annotation"],
        metadataBadges: [
          {
            label: "Retention",
            value: "10-year habitat baseline",
            tone: "caution",
          },
          {
            label: "Integrity",
            value: "Frame hash register signed",
            tone: "steady",
          },
          {
            label: "Compare",
            value: "Survey-grid normalized",
            tone: "accent",
          },
        ],
        detailSummary: {
          heading: "Use as the visual anchor for reef condition comparisons",
          overview:
            "Image frames remain aligned with annotation overlays and diver notes, which keeps habitat comparisons grounded in the exact survey pass that produced them.",
          comparisonReadiness:
            "Each frame bundle is normalized to the same survey grid, so the detail panel can compare condition changes without reprojecting the image stack.",
          reviewWindow: "Primary review window: within 18 minutes of focused hydrate request",
          rows: [
            { label: "Primary focus", value: "Image deltas versus annotation overlays" },
            { label: "Baseline slice", value: "Grid sectors C4 through E7" },
            { label: "Review owner", value: "Habitat condition analyst" },
          ],
        },
      },
    ],
  },
];

export const archiveVaultSnapshots = archiveVaultSnapshotGroups.flatMap(
  (group) => group.snapshots,
);
