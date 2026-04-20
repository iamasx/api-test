import { ArchiveDetailPanel } from "./archive-detail-panel";
import { ArchiveSnapshotList } from "./archive-snapshot-list";
import type { ArchiveBrowserView } from "../_lib/archive-browser";

type ArchiveBrowserShellProps = {
  view: ArchiveBrowserView;
};

export function ArchiveBrowserShell({ view }: ArchiveBrowserShellProps) {
  return (
    <main className="mx-auto flex w-full max-w-7xl flex-1 flex-col gap-8 px-6 py-8 sm:px-10 lg:px-12">
      <section className="overflow-hidden rounded-[2rem] border border-slate-200/80 bg-[var(--surface)] shadow-[0_20px_90px_rgba(15,23,42,0.08)]">
        <div className="grid gap-8 px-6 py-8 sm:px-10 lg:grid-cols-[minmax(0,1.15fr)_minmax(260px,0.85fr)] lg:px-12 lg:py-10">
          <div className="space-y-5">
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-amber-700">
              Archive browser
            </p>
            <div className="space-y-3">
              <h1 className="max-w-4xl text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl">
                Snapshot cards and preservation detail in one route.
              </h1>
              <p className="max-w-3xl text-lg leading-8 text-slate-600">
                The browser keeps the route intentionally self-contained:
                server-rendered selection, clear metadata badges, and a detail
                panel that can be validated with straightforward render tests.
              </p>
            </div>
          </div>

          <div className="rounded-[1.75rem] border border-slate-200/80 bg-[var(--surface-strong)] p-5">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-500">
              Archive summary
            </p>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {view.summaryMetrics.map((metric) => (
                <div
                  key={metric.label}
                  className="rounded-[1.2rem] border border-slate-200 bg-white/80 p-4"
                >
                  <p className="text-xs uppercase tracking-[0.18em] text-slate-500">
                    {metric.label}
                  </p>
                  <p className="mt-2 text-2xl font-semibold tracking-tight text-slate-950">
                    {metric.value}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <div className="grid gap-8 xl:grid-cols-[minmax(0,1.1fr)_minmax(360px,0.9fr)]">
        <ArchiveSnapshotList
          snapshots={view.snapshots}
          selectedSnapshotId={view.selectedSnapshot.id}
        />
        <ArchiveDetailPanel
          selectedSnapshot={view.selectedSnapshot}
          requestedSnapshotId={view.requestedSnapshotId}
          selectionFound={view.selectionFound}
        />
      </div>
    </main>
  );
}
