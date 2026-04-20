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
    <aside className="xl:sticky xl:top-8 xl:self-start">
      <section
        aria-label="Snapshot detail"
        className="rounded-[2rem] border border-slate-200/80 bg-slate-950 p-5 text-slate-100 shadow-[0_24px_90px_rgba(15,23,42,0.18)] sm:p-6"
      >
        <div className="space-y-5">
          <div className="space-y-3">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-amber-200/80">
              Detail view
            </p>
            <div className="space-y-3">
              <h2 className="text-3xl font-semibold tracking-tight">
                {selectedSnapshot.title}
              </h2>
              <p className="text-base leading-7 text-slate-300">
                {selectedSnapshot.summary}
              </p>
            </div>
          </div>

          {!selectionFound && requestedSnapshotId ? (
            <p
              role="status"
              className="rounded-[1.25rem] border border-amber-300/40 bg-amber-300/10 px-4 py-3 text-sm leading-6 text-amber-100"
            >
              Snapshot "{requestedSnapshotId}" was not found. Showing the most
              recent sealed archive instead.
            </p>
          ) : null}

          <div className="rounded-[1.5rem] border border-white/10 bg-white/6 p-4">
            <div className="flex flex-wrap gap-2">
              {selectedSnapshot.metadataBadges.map((badge) => (
                <ArchiveMetadataBadge
                  key={`${selectedSnapshot.id}-${badge.label}-detail`}
                  badge={badge}
                />
              ))}
            </div>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {selectedSnapshot.highlightMetrics.map((metric) => (
                <div
                  key={`${selectedSnapshot.id}-${metric.label}`}
                  className="rounded-[1.15rem] border border-white/10 bg-slate-900/80 p-4"
                >
                  <p className="text-xs uppercase tracking-[0.18em] text-slate-400">
                    {metric.label}
                  </p>
                  <p className="mt-2 text-lg font-semibold text-amber-50">
                    {metric.value}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[1.5rem] border border-white/10 bg-white/6 p-4">
            <p className="text-xs uppercase tracking-[0.18em] text-slate-400">
              Source and capture window
            </p>
            <div className="mt-3 grid gap-3 sm:grid-cols-2">
              <div>
                <p className="text-sm text-slate-400">Origin</p>
                <p className="mt-1 font-medium text-white">
                  {selectedSnapshot.source}
                </p>
              </div>
              <div>
                <p className="text-sm text-slate-400">Archive seal</p>
                <p className="mt-1 font-medium text-white">
                  {selectedSnapshot.archivedLabel}
                </p>
              </div>
              <div className="sm:col-span-2">
                <p className="text-sm text-slate-400">Capture range</p>
                <p className="mt-1 font-medium text-white">
                  {selectedSnapshot.timeline}
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            {selectedSnapshot.detailSections.map((section) => (
              <section
                key={`${selectedSnapshot.id}-${section.title}`}
                className="rounded-[1.5rem] border border-white/10 bg-white/6 p-4"
              >
                <div className="space-y-2">
                  <h3 className="text-xl font-semibold text-white">
                    {section.title}
                  </h3>
                  <p className="text-sm leading-6 text-slate-300">
                    {section.description}
                  </p>
                </div>

                <dl className="mt-4 grid gap-3 sm:grid-cols-3">
                  {section.entries.map((entry) => (
                    <div
                      key={`${selectedSnapshot.id}-${section.title}-${entry.label}`}
                      className="rounded-[1rem] border border-white/10 bg-slate-900/80 p-3"
                    >
                      <dt className="text-xs uppercase tracking-[0.18em] text-slate-400">
                        {entry.label}
                      </dt>
                      <dd className="mt-2 text-sm font-medium leading-6 text-white">
                        {entry.value}
                      </dd>
                    </div>
                  ))}
                </dl>
              </section>
            ))}
          </div>

          <section className="rounded-[1.5rem] border border-white/10 bg-white/6 p-4">
            <h3 className="text-xl font-semibold text-white">Recovery notes</h3>
            <ul className="mt-4 space-y-3">
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
        </div>
      </section>
    </aside>
  );
}
