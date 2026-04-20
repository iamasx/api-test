import { ArchiveDetailPanel } from "./archive-detail-panel";
import { ArchiveSnapshotList } from "./archive-snapshot-list";
import type { ArchiveBrowserSelection } from "../_lib/archive-browser";

const numberFormatter = new Intl.NumberFormat("en-US");

type ArchiveBrowserShellProps = {
  selection: ArchiveBrowserSelection;
};

function formatFootprint(totalFootprintGb: number) {
  if (totalFootprintGb >= 1000) {
    return `${(totalFootprintGb / 1000).toFixed(1)} TB`;
  }

  return `${totalFootprintGb.toFixed(1)} GB`;
}

function buildOverview(selection: ArchiveBrowserSelection) {
  const totalAssets = selection.snapshots.reduce(
    (count, snapshot) => count + snapshot.assetCount,
    0,
  );
  const totalFootprint = selection.snapshots.reduce(
    (count, snapshot) => count + snapshot.storageFootprintGb,
    0,
  );
  const allTags = new Set(
    selection.snapshots.flatMap((snapshot) => snapshot.tags),
  );

  return [
    {
      label: "Snapshots",
      value: numberFormatter.format(selection.snapshots.length),
    },
    {
      label: "Preserved assets",
      value: numberFormatter.format(totalAssets),
    },
    {
      label: "Storage footprint",
      value: formatFootprint(totalFootprint),
    },
    {
      label: "Tagged themes",
      value: numberFormatter.format(allTags.size),
    },
  ];
}

export function ArchiveBrowserShell({
  selection,
}: ArchiveBrowserShellProps) {
  const overview = buildOverview(selection);

  return (
    <main className="mx-auto flex w-full max-w-7xl flex-1 flex-col gap-8 px-6 py-8 sm:px-10 lg:px-12">
      <section className="rounded-[2rem] border border-slate-200/80 bg-[var(--surface)] p-6 shadow-[0_20px_80px_rgba(15,23,42,0.08)] sm:p-8">
        <div className="grid gap-8 xl:grid-cols-[minmax(0,1.1fr)_minmax(300px,0.9fr)]">
          <div className="space-y-4">
            <p className="text-sm font-semibold uppercase tracking-[0.26em] text-amber-700">
              Archive browser
            </p>
            <div className="space-y-3">
              <h1 className="max-w-4xl text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl">
                Inspect preserved snapshots with visible metadata and a detail-first review panel.
              </h1>
              <p className="max-w-3xl text-base leading-8 text-slate-600 sm:text-lg">
                This route keeps archive browsing independent and testable:
                server-rendered snapshot selection, explicit metadata badges,
                and a detail surface that expands timeline and recovery notes.
              </p>
            </div>
          </div>

          <section
            aria-labelledby="archive-browser-overview-title"
            className="rounded-[1.75rem] border border-slate-200 bg-white/80 p-5"
          >
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-slate-500">
              Route overview
            </p>
            <h2
              id="archive-browser-overview-title"
              className="mt-3 text-2xl font-semibold tracking-tight text-slate-950"
            >
              Archive metrics at a glance
            </h2>
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              {overview.map((item) => (
                <div
                  key={item.label}
                  className="rounded-[1.2rem] border border-slate-200 bg-slate-50 p-4"
                >
                  <p className="text-xs uppercase tracking-[0.18em] text-slate-500">
                    {item.label}
                  </p>
                  <p className="mt-2 text-2xl font-semibold tracking-tight text-slate-950">
                    {item.value}
                  </p>
                </div>
              ))}
            </div>
          </section>
        </div>
      </section>

      <div className="grid gap-8 xl:grid-cols-[minmax(0,1.05fr)_minmax(340px,0.95fr)]">
        <ArchiveSnapshotList
          snapshots={selection.snapshots}
          selectedSnapshotId={selection.selectedSnapshot.id}
        />
        <ArchiveDetailPanel
          selectedSnapshot={selection.selectedSnapshot}
          requestedSnapshotId={selection.requestedSnapshotId}
          selectionFound={selection.selectionFound}
        />
      </div>
    </main>
  );
}
