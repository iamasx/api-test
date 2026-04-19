import type {
  DependencyLink,
  ServiceCluster,
  ServiceNode,
} from "@/app/service-map/service-map-data";

const modeTone = {
  core: "border-emerald-300/20 bg-emerald-300/10 text-emerald-100",
  watch: "border-amber-300/20 bg-amber-300/10 text-amber-100",
  buffered: "border-sky-300/20 bg-sky-300/10 text-sky-100",
};

type DependencyPanelProps = {
  activeCluster: ServiceCluster | null; activeNode: ServiceNode | null; highlightedLinkId: string | null;
  isClusterMuted: boolean; links: DependencyLink[]; nodes: ServiceNode[]; onHighlight: (linkId: string) => void;
};

export function DependencyPanel({
  activeCluster,
  activeNode,
  highlightedLinkId,
  isClusterMuted,
  links,
  nodes,
  onHighlight,
}: DependencyPanelProps) {
  return (
    <section className="rounded-[1.75rem] border border-white/10 bg-black/25 p-5 shadow-xl shadow-black/20 backdrop-blur sm:p-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-stone-400">Dependency Highlights</p>
          <h2 className="mt-2 text-2xl font-semibold text-stone-50">{activeNode ? activeNode.name : activeCluster?.name ?? "Select a cluster"}</h2>
        </div>
        <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-stone-300">{links.length} visible handoffs</span>
      </div>
      {links.length > 0 ? (
        <div className="mt-5 space-y-3">
          {links.map((link) => {
            const fromNode = nodes.find((node) => node.id === link.fromId);
            const toNode = nodes.find((node) => node.id === link.toId);
            return (
              <button
                className={`w-full rounded-[1.5rem] border p-4 text-left transition ${
                  highlightedLinkId === link.id
                    ? "border-amber-300/40 bg-amber-300/10"
                    : "border-white/10 bg-white/[0.04] hover:border-white/20 hover:bg-white/[0.06]"
                }`}
                key={link.id}
                onClick={() => onHighlight(link.id)}
                type="button"
              >
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <p className="text-sm font-semibold text-stone-50">{fromNode?.name} &rarr; {toNode?.name}</p>
                  <span className={`rounded-full border px-2.5 py-1 text-xs ${modeTone[link.mode]}`}>{link.highlight}</span>
                </div>
                <p className="mt-2 text-sm leading-6 text-stone-300">{link.summary}</p>
                <p className="mt-3 text-xs text-stone-400">{link.volume}</p>
              </button>
            );
          })}
        </div>
      ) : (
        <div className="mt-5 rounded-[1.5rem] border border-dashed border-white/15 bg-white/[0.03] p-8 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-stone-500">No visible links</p>
          <h3 className="mt-3 text-xl font-semibold text-stone-100">{isClusterMuted ? "Dependency scan muted for this cluster." : "No handoff is pinned right now."}</h3>
          <p className="mt-3 text-sm leading-6 text-stone-400">
            {isClusterMuted
              ? "Unmute the active cluster to restore local dependency highlights."
              : "Select a node in the cluster list or clear the deselected state to restore highlights."}
          </p>
        </div>
      )}
    </section>
  );
}
