import type {
  DependencyLink,
  ServiceCluster,
  ServiceNode,
} from "@/app/service-map/service-map-data";

const statusTone = {
  healthy: "border-emerald-300/20 bg-emerald-300/10 text-emerald-100",
  watch: "border-amber-300/20 bg-amber-300/10 text-amber-100",
  critical: "border-rose-300/20 bg-rose-300/10 text-rose-100",
};

type FocusInspectorProps = {
  activeCluster: ServiceCluster | null; activeNode: ServiceNode | null; focusedClusterName: string | null;
  isClusterMuted: boolean; mutedNodeCount: number; spotlightLink: DependencyLink | null;
  totalLinks: number; totalMutedClusters: number;
};

export function FocusInspector({
  activeCluster,
  activeNode,
  focusedClusterName,
  isClusterMuted,
  mutedNodeCount,
  spotlightLink,
  totalLinks,
  totalMutedClusters,
}: FocusInspectorProps) {
  return (
    <aside className="rounded-[1.75rem] border border-white/10 bg-black/30 p-5 shadow-xl shadow-black/20 backdrop-blur sm:p-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-stone-400">Focus Inspector</p>
          <h2 className="mt-2 text-2xl font-semibold text-stone-50">{activeNode ? activeNode.name : "Selection cleared"}</h2>
        </div>
        {activeNode ? (
          <span className={`rounded-full border px-3 py-1.5 text-xs font-semibold ${statusTone[activeNode.status]}`}>{activeNode.status}</span>
        ) : null}
      </div>
      {activeNode ? (
        <div className="mt-5 space-y-5">
          <div className="space-y-3">
            <p className="text-sm leading-6 text-stone-300">{activeNode.summary}</p>
            <div className="flex flex-wrap gap-2 text-xs text-stone-300">
              <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5">{activeCluster?.name}</span>
              <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5">{activeNode.role}</span>
              <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5">{activeNode.onCall}</span>
            </div>
          </div>
          <div className="grid gap-3 sm:grid-cols-3">
            <article className="rounded-3xl border border-white/10 bg-white/[0.04] px-4 py-4"><p className="text-xs uppercase tracking-[0.25em] text-stone-500">Latency</p><p className="mt-2 text-2xl font-semibold text-stone-50">{activeNode.latencyMs} ms</p></article>
            <article className="rounded-3xl border border-white/10 bg-white/[0.04] px-4 py-4"><p className="text-xs uppercase tracking-[0.25em] text-stone-500">Traffic</p><p className="mt-2 text-2xl font-semibold text-stone-50">{activeNode.traffic}</p></article>
            <article className="rounded-3xl border border-white/10 bg-white/[0.04] px-4 py-4"><p className="text-xs uppercase tracking-[0.25em] text-stone-500">Visible links</p><p className="mt-2 text-2xl font-semibold text-stone-50">{totalLinks}</p></article>
          </div>
          <section className="rounded-[1.5rem] border border-white/10 bg-white/[0.04] p-4">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-stone-500">Inspector Notes</p>
            <p className="mt-3 text-sm text-stone-300">{activeNode.recentChange}</p>
            <ul className="mt-4 space-y-3 text-sm leading-6 text-stone-300">
              {activeNode.inspectorNotes.map((note) => (
                <li className="rounded-2xl border border-white/8 bg-black/20 px-3 py-3" key={note}>{note}</li>
              ))}
            </ul>
          </section>
          <section className="rounded-[1.5rem] border border-amber-300/15 bg-amber-300/[0.06] p-4">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-amber-100/70">Dependency Spotlight</p>
            {spotlightLink ? (
              <>
                <p className="mt-3 text-lg font-semibold text-stone-50">{spotlightLink.highlight}</p>
                <p className="mt-2 text-sm leading-6 text-stone-300">{spotlightLink.summary}</p>
                <p className="mt-3 text-xs text-stone-400">{spotlightLink.volume}</p>
              </>
            ) : (
              <p className="mt-3 text-sm leading-6 text-stone-300">Select a dependency card to pin one handoff in the inspector.</p>
            )}
          </section>
          <div className="rounded-[1.5rem] border border-white/10 bg-white/[0.04] p-4 text-sm leading-6 text-stone-300">
            <p>Focused scope: {focusedClusterName ?? "All clusters"}</p>
            <p>Muted clusters: {totalMutedClusters} / muted nodes: {mutedNodeCount}</p>
            <p>{isClusterMuted ? "Active cluster output is muted from the dependency scan." : "Dependency scan remains visible for this cluster."}</p>
          </div>
        </div>
      ) : (
        <div className="mt-5 rounded-[1.5rem] border border-dashed border-white/15 bg-white/[0.03] p-8 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-stone-500">Empty focus</p>
          <h3 className="mt-3 text-xl font-semibold text-stone-100">No node is selected for inspection.</h3>
          <p className="mt-3 text-sm leading-6 text-stone-400">Re-select a service from the cluster list to restore node detail, or leave the selection cleared to review the cluster without a pinned node.</p>
          {activeCluster ? (
            <p className="mt-4 text-xs text-stone-500">Active cluster: {activeCluster.name} {focusedClusterName ? `· focused as ${focusedClusterName}` : ""}</p>
          ) : null}
        </div>
      )}
    </aside>
  );
}
