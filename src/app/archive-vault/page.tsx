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
    <main className="mx-auto flex min-h-screen w-full max-w-7xl flex-1 flex-col gap-8 px-6 py-12 sm:px-10 lg:px-14">
      <header className="overflow-hidden rounded-[2rem] border border-[var(--line)] bg-[var(--surface)] p-8 shadow-[0_20px_90px_rgba(15,23,42,0.08)] sm:p-10">
        <div className="grid gap-8 xl:grid-cols-[minmax(0,1.25fr)_minmax(280px,0.75fr)] xl:items-end">
          <div className="space-y-5">
            <div className="space-y-4">
              <p className="text-sm font-semibold uppercase tracking-[0.28em] text-amber-700">
                Archive Vault
              </p>
              <h1 className="max-w-4xl text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl">
                Browse sealed snapshots with visible labels, metadata badges,
                and a comparison-ready detail panel.
              </h1>
              <p className="max-w-3xl text-base leading-7 text-slate-600 sm:text-lg">
                The vault keeps audit packages, operational restores, and
                research baselines on one route, while preserving a dedicated
                detail surface for deep review of the active snapshot.
              </p>
            </div>

            <div className="flex flex-col gap-4 sm:flex-row">
              <Link
                href="/"
                className="inline-flex items-center justify-center rounded-full border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-700 transition hover:border-slate-950 hover:text-slate-950"
              >
                Back to route index
              </Link>
              <Link
                href={`/archive-vault?snapshot=${selection.selectedSnapshot.id}`}
                className="inline-flex items-center justify-center rounded-full bg-slate-950 px-5 py-3 text-sm font-semibold text-amber-50 transition hover:bg-slate-800"
              >
                Keep current snapshot in view
              </Link>
            </div>
          </div>

          <section
            aria-labelledby="archive-vault-overview-title"
            className="rounded-[1.6rem] border border-slate-200 bg-white/70 p-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.85)]"
          >
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">
              Route overview
            </p>
            <h2
              id="archive-vault-overview-title"
              className="mt-3 text-2xl font-semibold tracking-tight text-slate-950"
            >
              Archive coverage at a glance
            </h2>
            <div className="mt-5 grid gap-4">
              {overview.map((item) => (
                <article
                  key={item.label}
                  className="rounded-[1.35rem] border border-slate-200 bg-slate-50/80 p-4"
                >
                  <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-500">
                    {item.label}
                  </p>
                  <p className="mt-2 text-3xl font-semibold tracking-tight text-slate-950">
                    {item.value}
                  </p>
                  <p className="mt-2 text-sm leading-6 text-slate-600">
                    {item.detail}
                  </p>
                </article>
              ))}
            </div>
          </section>
        </div>
      </header>

      <section className="grid gap-6 xl:grid-cols-[minmax(0,1.12fr)_minmax(320px,0.88fr)] xl:items-start">
        <div className="space-y-6">
          <section className="rounded-[1.75rem] border border-[var(--line)] bg-[var(--surface)] p-6 shadow-[0_18px_70px_rgba(15,23,42,0.06)]">
            <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
              <div className="space-y-3">
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">
                  Snapshot browser
                </p>
                <h2 className="text-3xl font-semibold tracking-tight text-slate-950">
                  Multiple archive lanes, one active detail summary
                </h2>
              </div>
              <p className="max-w-2xl text-sm leading-7 text-slate-600">
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
