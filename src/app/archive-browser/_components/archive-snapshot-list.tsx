import { ArchiveSnapshotCard } from "./archive-snapshot-card";
import type { ArchiveSnapshot } from "../_lib/archive-data";

type ArchiveSnapshotListProps = {
  snapshots: ArchiveSnapshot[];
  selectedSnapshotId: string;
};

export function ArchiveSnapshotList({
  snapshots,
  selectedSnapshotId,
}: ArchiveSnapshotListProps) {
  return (
    <section
      aria-labelledby="archive-snapshot-list-title"
      className="rounded-[2rem] border border-slate-200/80 bg-[var(--surface)] p-5 shadow-[0_18px_65px_rgba(15,23,42,0.08)] sm:p-6"
    >
      <div className="mb-6 space-y-3">
        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-500">
          Snapshot list
        </p>
        <div className="space-y-2">
          <h2
            id="archive-snapshot-list-title"
            className="text-3xl font-semibold tracking-tight text-slate-950"
          >
            Archived entries ready for inspection
          </h2>
          <p className="max-w-2xl text-base leading-7 text-slate-600">
            Each card exposes the preservation metadata up front, then links
            into the richer detail panel without introducing client-side state.
          </p>
        </div>
      </div>

      <div className="space-y-4">
        {snapshots.map((snapshot) => (
          <ArchiveSnapshotCard
            key={snapshot.id}
            snapshot={snapshot}
            isSelected={snapshot.id === selectedSnapshotId}
          />
        ))}
      </div>
    </section>
  );
}
