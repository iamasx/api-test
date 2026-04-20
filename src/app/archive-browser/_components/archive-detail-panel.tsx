import { ArchiveMetadataBadge } from "./archive-metadata-badge";
import type { ArchiveSnapshot } from "../_lib/archive-data";

type ArchiveDetailPanelProps = {
  selectedSnapshot: ArchiveSnapshot;
  requestedSnapshotId?: string;
  selectionFound: boolean;
};

export function ArchiveDetailPanel({
  selectedSnapshot,
  requestedSnapshotId,
  selectionFound,
}: ArchiveDetailPanelProps) {
  return (
    <aside>
      <section
        aria-label="Archive detail view"
        className="space-y-5 rounded-[2rem] border border-slate-900 bg-slate-950 p-6 text-slate-100"
      >
        <div className="space-y-3">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-amber-200/80">
            Detail view
          </p>
          <h2 className="text-3xl font-semibold tracking-tight">
            {selectedSnapshot.title}
          </h2>
          <p className="text-sm leading-7 text-slate-300">
            {selectedSnapshot.summary}
          </p>
        </div>

        {!selectionFound && requestedSnapshotId ? (
          <p
            role="status"
            className="rounded-[1.25rem] border border-amber-300/40 bg-amber-300/10 px-4 py-3 text-sm leading-6 text-amber-100"
          >
            Snapshot ID <span className="font-semibold">{requestedSnapshotId}</span>{" "}
            was not found. Showing the latest archive instead.
          </p>
        ) : null}

        <div className="space-y-4 rounded-[1.5rem] border border-white/10 bg-white/5 p-4">
          <div className="flex flex-wrap gap-2">
            {selectedSnapshot.metadataBadges.map((badge) => (
              <ArchiveMetadataBadge
                key={`${selectedSnapshot.id}-${badge.label}-detail`}
                badge={badge}
              />
            ))}
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <div>
              <p className="text-xs uppercase tracking-[0.18em] text-slate-400">
                Label
              </p>
              <p className="mt-1 text-sm font-medium text-white">
                {selectedSnapshot.label}
              </p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.18em] text-slate-400">
                Status
              </p>
              <p className="mt-1 text-sm font-medium text-white">
                {selectedSnapshot.status}
              </p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.18em] text-slate-400">
                Source
              </p>
              <p className="mt-1 text-sm font-medium text-white">
                {selectedSnapshot.source}
              </p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.18em] text-slate-400">
                Archive seal
              </p>
              <p className="mt-1 text-sm font-medium text-white">
                {selectedSnapshot.archivedLabel}
              </p>
            </div>
            <div className="sm:col-span-2">
              <p className="text-xs uppercase tracking-[0.18em] text-slate-400">
                Capture range
              </p>
              <p className="mt-1 text-sm font-medium text-white">
                {selectedSnapshot.captureRange}
              </p>
            </div>
          </div>
        </div>

        <section className="space-y-3 rounded-[1.5rem] border border-white/10 bg-white/5 p-4">
          <h3 className="text-xl font-semibold text-white">Archive timeline</h3>
          <ul className="space-y-3">
            {selectedSnapshot.timelineEntries.map((entry) => (
              <li
                key={`${selectedSnapshot.id}-${entry.label}`}
                className="rounded-[1rem] border border-white/10 bg-slate-900/80 p-4"
              >
                <p className="text-xs uppercase tracking-[0.18em] text-amber-200/80">
                  {entry.label}
                </p>
                <p className="mt-2 text-sm font-medium text-white">
                  {entry.timestamp}
                </p>
                <p className="mt-2 text-sm leading-6 text-slate-300">
                  {entry.detail}
                </p>
              </li>
            ))}
          </ul>
        </section>

        <div className="space-y-4">
          {selectedSnapshot.detailSections.map((section) => (
            <section
              key={`${selectedSnapshot.id}-${section.title}`}
              className="space-y-3 rounded-[1.5rem] border border-white/10 bg-white/5 p-4"
            >
              <div className="space-y-2">
                <h3 className="text-xl font-semibold text-white">
                  {section.title}
                </h3>
                <p className="text-sm leading-6 text-slate-300">
                  {section.description}
                </p>
              </div>

              <dl className="grid gap-3 sm:grid-cols-3">
                {section.rows.map((row) => (
                  <div
                    key={`${selectedSnapshot.id}-${section.title}-${row.label}`}
                    className="rounded-[1rem] border border-white/10 bg-slate-900/80 p-3"
                  >
                    <dt className="text-xs uppercase tracking-[0.18em] text-slate-400">
                      {row.label}
                    </dt>
                    <dd className="mt-2 text-sm font-medium leading-6 text-white">
                      {row.value}
                    </dd>
                  </div>
                ))}
              </dl>
            </section>
          ))}
        </div>

        <section className="space-y-3 rounded-[1.5rem] border border-white/10 bg-white/5 p-4">
          <h3 className="text-xl font-semibold text-white">Recovery notes</h3>
          <ul className="space-y-3">
            {selectedSnapshot.recoveryNotes.map((note) => (
              <li
                key={`${selectedSnapshot.id}-${note}`}
                className="rounded-[1rem] border border-white/10 bg-slate-900/80 px-4 py-3 text-sm leading-6 text-slate-200"
              >
                {note}
              </li>
            ))}
          </ul>
        </section>
      </section>
    </aside>
  );
}
