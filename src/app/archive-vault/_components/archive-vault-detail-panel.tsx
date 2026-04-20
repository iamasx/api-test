import { ArchiveVaultMetadataBadge } from "./archive-vault-metadata-badge";
import type { ArchiveVaultSnapshot } from "../_data/archive-vault-data";

type ArchiveVaultDetailPanelProps = {
  snapshot: ArchiveVaultSnapshot;
  requestedSnapshotId?: string;
  selectionFound?: boolean;
};

export function ArchiveVaultDetailPanel({
  snapshot,
  requestedSnapshotId,
  selectionFound = true,
}: ArchiveVaultDetailPanelProps) {
  return (
    <aside
      aria-label="Archive vault detail panel"
      className="rounded-[1.75rem] border border-[var(--line)] bg-[var(--surface)] p-6 shadow-[0_18px_70px_rgba(15,23,42,0.06)] sm:p-7"
    >
      <div className="space-y-4">
        <div className="space-y-3">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">
            Detail summary
          </p>
          <h2 className="text-3xl font-semibold tracking-tight text-slate-950">
            {snapshot.title}
          </h2>
          <p className="text-sm leading-7 text-slate-600 sm:text-base">
            {snapshot.detailSummary.overview}
          </p>
        </div>

        {!selectionFound && requestedSnapshotId ? (
          <p
            role="status"
            className="rounded-2xl border border-amber-300/45 bg-amber-100/60 px-4 py-3 text-sm leading-6 text-amber-950"
          >
            Snapshot <span className="font-semibold">{requestedSnapshotId}</span>{" "}
            was not found. Showing the current vault baseline instead.
          </p>
        ) : null}

        <ul className="flex flex-wrap gap-2">
          {snapshot.metadataBadges.map((badge) => (
            <ArchiveVaultMetadataBadge
              key={`${snapshot.id}-${badge.label}-detail`}
              badge={badge}
            />
          ))}
        </ul>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <article className="rounded-[1.35rem] border border-slate-200 bg-white/70 p-4">
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-500">
            Archive label
          </p>
          <p className="mt-2 text-lg font-semibold text-slate-950">
            {snapshot.label}
          </p>
          <p className="mt-2 text-sm leading-6 text-slate-600">
            Sealed {snapshot.archivedLabel}
          </p>
        </article>

        <article className="rounded-[1.35rem] border border-slate-200 bg-white/70 p-4">
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-500">
            Comparison readiness
          </p>
          <p className="mt-2 text-sm leading-6 text-slate-700">
            {snapshot.detailSummary.comparisonReadiness}
          </p>
        </article>
      </div>

      <section className="mt-6 rounded-[1.5rem] border border-slate-200 bg-white/75 p-5">
        <h3 className="text-lg font-semibold text-slate-950">
          {snapshot.detailSummary.heading}
        </h3>
        <p className="mt-3 text-sm leading-7 text-slate-600">
          {snapshot.detailSummary.reviewWindow}
        </p>

        <dl className="mt-5 grid gap-3">
          {snapshot.detailSummary.rows.map((row) => (
            <div
              key={`${snapshot.id}-${row.label}`}
              className="rounded-2xl border border-slate-200 bg-slate-50/80 px-4 py-4"
            >
              <dt className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-500">
                {row.label}
              </dt>
              <dd className="mt-2 text-sm leading-6 text-slate-700">
                {row.value}
              </dd>
            </div>
          ))}
        </dl>
      </section>
    </aside>
  );
}
