import type { Metadata } from "next";
import Link from "next/link";

import { ArchiveVaultDetailPanel } from "./_components/archive-vault-detail-panel";
import { ArchiveVaultSnapshotGroup } from "./_components/archive-vault-snapshot-group";
import {
  archiveVaultSnapshotGroups,
  archiveVaultSnapshots,
} from "./_data/archive-vault-data";
import {
  readRequestedSnapshotId,
  resolveArchiveVaultSelection,
} from "./_lib/archive-vault";
import styles from "./archive-vault.module.css";

type ArchiveVaultPageProps = {
  searchParams: Promise<{
    snapshot?: string | string[] | undefined;
  }>;
};

const numberFormatter = new Intl.NumberFormat("en-US");

export const metadata: Metadata = {
  title: "Archive Vault",
  description:
    "Browse grouped archive snapshots, metadata badges, and a comparison-ready detail summary.",
};

function buildOverview() {
  const allTags = new Set(
    archiveVaultSnapshots.flatMap((snapshot) => snapshot.tags),
  );

  return [
    {
      label: "Snapshot groups",
      value: numberFormatter.format(archiveVaultSnapshotGroups.length),
      detail: "Independent archive lanes staged for audit, recovery, and research review.",
    },
    {
      label: "Snapshots",
      value: numberFormatter.format(archiveVaultSnapshots.length),
      detail: "Every archive package carries labels, timestamps, tags, and comparison notes.",
    },
    {
      label: "Tag themes",
      value: numberFormatter.format(allTags.size),
      detail: "Cross-cutting labels stay visible so the vault can be scanned quickly.",
    },
  ];
}

export default async function ArchiveVaultPage({
  searchParams,
}: ArchiveVaultPageProps) {
  const requestedSnapshotId = readRequestedSnapshotId(
    (await searchParams).snapshot,
  );
  const selection = resolveArchiveVaultSelection(requestedSnapshotId);
  const overview = buildOverview();

  return (
    <main className={styles.vaultPage}>
      <header className={styles.heroPanel}>
        <div className={styles.heroGrid}>
          <div className={styles.heroCopy}>
            <div className="space-y-4">
              <p className={styles.eyebrow}>Archive Vault</p>
              <h1 className={styles.heroTitle}>
                Browse sealed snapshots with visible labels, metadata badges,
                and a comparison-ready detail panel.
              </h1>
              <p className={styles.heroText}>
                The vault keeps audit packages, operational restores, and
                research baselines on one route, while preserving a dedicated
                detail surface for deep review of the active snapshot.
              </p>
            </div>

            <div className={styles.heroActions}>
              <Link
                href="/"
                className={styles.actionGhost}
              >
                Back to route index
              </Link>
              <Link
                href={`/archive-vault?snapshot=${selection.selectedSnapshot.id}`}
                className={styles.actionPrimary}
              >
                Keep current snapshot in view
              </Link>
            </div>
          </div>

          <section
            aria-labelledby="archive-vault-overview-title"
            className={styles.overviewCard}
          >
            <p className={styles.eyebrow}>Route overview</p>
            <h2
              id="archive-vault-overview-title"
              className={styles.overviewTitle}
            >
              Archive coverage at a glance
            </h2>
            <div className={styles.overviewGrid}>
              {overview.map((item) => (
                <article
                  key={item.label}
                  className={styles.overviewItem}
                >
                  <p className={styles.overviewLabel}>{item.label}</p>
                  <p className={styles.overviewValue}>{item.value}</p>
                  <p className={styles.overviewDetail}>{item.detail}</p>
                </article>
              ))}
            </div>
          </section>
        </div>
      </header>

      <section className={styles.contentGrid}>
        <div className={styles.browserColumn}>
          <section className={styles.browserIntro}>
            <div className={styles.browserIntroHeader}>
              <div className="space-y-3">
                <p className={styles.eyebrow}>Snapshot browser</p>
                <h2 className={styles.browserIntroTitle}>
                  Multiple archive lanes, one active detail summary
                </h2>
              </div>
              <p className={styles.browserIntroText}>
                Each group keeps its own archive purpose, while the shared
                detail panel stays ready for comparisons, replay, and restore
                planning from the selected snapshot.
              </p>
            </div>
          </section>

          {selection.snapshotGroups.map((group) => (
            <ArchiveVaultSnapshotGroup
              key={group.id}
              group={group}
              selectedSnapshotId={selection.selectedSnapshot.id}
            />
          ))}
        </div>

        <ArchiveVaultDetailPanel
          snapshot={selection.selectedSnapshot}
          requestedSnapshotId={selection.requestedSnapshotId}
          selectionFound={selection.selectionFound}
        />
      </section>
    </main>
  );
}
