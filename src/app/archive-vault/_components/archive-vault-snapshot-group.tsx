import Link from "next/link";

import { ArchiveVaultMetadataBadge } from "./archive-vault-metadata-badge";
import type { ArchiveVaultSnapshotGroup } from "../_data/archive-vault-data";

type ArchiveVaultSnapshotGroupProps = {
  group: ArchiveVaultSnapshotGroup;
  selectedSnapshotId: string;
};

export function ArchiveVaultSnapshotGroup({
  group,
  selectedSnapshotId,
}: ArchiveVaultSnapshotGroupProps) {
  return (
    <section
      aria-labelledby={`${group.id}-title`}
      className="space-y-4 rounded-[1.75rem] border border-[var(--line)] bg-[var(--surface)] p-6 shadow-[0_18px_70px_rgba(15,23,42,0.06)]"
    >
      <div className="space-y-3">
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">
          {group.eyebrow}
        </p>
        <h2
          id={`${group.id}-title`}
          className="text-3xl font-semibold tracking-tight text-slate-950"
        >
          {group.title}
        </h2>
        <p className="max-w-3xl text-sm leading-7 text-slate-600 sm:text-base">
          {group.description}
        </p>
      </div>

      <div
        aria-label={`${group.title} snapshots`}
        className="grid gap-4"
        role="list"
      >
        {group.snapshots.map((snapshot) => {
          const isSelected = snapshot.id === selectedSnapshotId;

          return (
            <article
              key={snapshot.id}
              aria-labelledby={`${snapshot.id}-title`}
              className={`rounded-[1.5rem] border p-5 transition ${
                isSelected
                  ? "border-slate-950 bg-slate-950 text-slate-50 shadow-[0_20px_65px_rgba(15,23,42,0.18)]"
                  : "border-slate-200 bg-white/75 text-slate-950"
              }`}
              role="listitem"
            >
              <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                <div className="space-y-3">
                  <p
                    className={`text-[11px] font-semibold uppercase tracking-[0.22em] ${
                      isSelected ? "text-amber-200" : "text-slate-500"
                    }`}
                  >
                    {snapshot.label}
                  </p>
                  <h3
                    id={`${snapshot.id}-title`}
                    className="text-2xl font-semibold tracking-tight"
                  >
                    {snapshot.title}
                  </h3>
                  <p
                    className={`max-w-2xl text-sm leading-7 ${
                      isSelected ? "text-slate-200" : "text-slate-600"
                    }`}
                  >
                    {snapshot.summary}
                  </p>
                </div>

                <Link
                  href={`/archive-vault?snapshot=${snapshot.id}`}
                  aria-current={isSelected ? "page" : undefined}
                  className={`inline-flex items-center justify-center rounded-full px-4 py-2 text-sm font-semibold transition ${
                    isSelected
                      ? "bg-amber-200 text-slate-950 hover:bg-amber-100"
                      : "border border-slate-300 text-slate-700 hover:border-slate-950 hover:text-slate-950"
                  }`}
                >
                  {isSelected ? "Viewing snapshot" : "Open snapshot"}
                </Link>
              </div>

              <div className="mt-5 grid gap-4 md:grid-cols-3">
                <div>
                  <p
                    className={`text-[11px] font-semibold uppercase tracking-[0.2em] ${
                      isSelected ? "text-slate-400" : "text-slate-500"
                    }`}
                  >
                    Archive seal
                  </p>
                  <p className="mt-2 text-sm leading-6">{snapshot.archivedLabel}</p>
                </div>
                <div>
                  <p
                    className={`text-[11px] font-semibold uppercase tracking-[0.2em] ${
                      isSelected ? "text-slate-400" : "text-slate-500"
                    }`}
                  >
                    Source
                  </p>
                  <p className="mt-2 text-sm leading-6">{snapshot.source}</p>
                </div>
                <div>
                  <p
                    className={`text-[11px] font-semibold uppercase tracking-[0.2em] ${
                      isSelected ? "text-slate-400" : "text-slate-500"
                    }`}
                  >
                    Vault zone
                  </p>
                  <p className="mt-2 text-sm leading-6">{snapshot.vaultZone}</p>
                </div>
              </div>

              <div className="mt-5 flex flex-wrap gap-2">
                {snapshot.tags.map((tag) => (
                  <span
                    key={`${snapshot.id}-${tag}`}
                    className={`rounded-full px-3 py-1 text-xs font-semibold tracking-[0.18em] uppercase ${
                      isSelected
                        ? "bg-white/10 text-slate-100"
                        : "bg-slate-100 text-slate-600"
                    }`}
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div className="mt-5 flex flex-wrap gap-2">
                {snapshot.metadataBadges.map((badge) => (
                  <ArchiveVaultMetadataBadge
                    key={`${snapshot.id}-${badge.label}`}
                    badge={badge}
                  />
                ))}
              </div>

              <div
                className={`mt-5 rounded-[1.2rem] border px-4 py-4 ${
                  isSelected
                    ? "border-white/10 bg-white/10"
                    : "border-slate-200 bg-slate-50/85"
                }`}
              >
                <p
                  className={`text-[11px] font-semibold uppercase tracking-[0.2em] ${
                    isSelected ? "text-slate-400" : "text-slate-500"
                  }`}
                >
                  Status
                </p>
                <p className="mt-2 text-sm font-medium">{snapshot.status}</p>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
