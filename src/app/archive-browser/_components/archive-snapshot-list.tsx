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
      className="space-y-4"
    >
      <div className="space-y-2">
        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-500">
          Snapshot list
        </p>
        <h2
          id="archive-snapshot-list-title"
          className="text-3xl font-semibold tracking-tight text-slate-950"
        >
          Archived entries
        </h2>
        <p className="max-w-2xl text-sm leading-7 text-slate-600">
          Each snapshot card exposes preservation metadata, searchable tags, and
          a linked detail state.
        </p>
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
