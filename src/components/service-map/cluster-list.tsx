import type { ServiceCluster, ServiceNode } from "@/app/service-map/service-map-data";

const clusterTone = {
  steady: "border-emerald-300/20 bg-emerald-300/8 text-emerald-100",
  watch: "border-amber-300/20 bg-amber-300/8 text-amber-100",
  critical: "border-rose-300/20 bg-rose-300/8 text-rose-100",
};

const nodeTone = {
  healthy: "bg-emerald-400",
  watch: "bg-amber-400",
  critical: "bg-rose-400",
};

type ClusterListProps = {
  clusters: ServiceCluster[]; focusedClusterId: string | null; mutedClusterIds: string[]; nodes: ServiceNode[];
  onSelectCluster: (clusterId: string) => void; onSelectNode: (nodeId: string, clusterId: string) => void;
  onToggleFocus: (clusterId: string) => void; onToggleMute: (clusterId: string) => void;
  selectedClusterId: string; selectedNodeId: string | null;
};

export function ClusterList({
  clusters,
  focusedClusterId,
  mutedClusterIds,
  nodes,
  onSelectCluster,
  onSelectNode,
  onToggleFocus,
  onToggleMute,
  selectedClusterId,
  selectedNodeId,
}: ClusterListProps) {
  return (
    <section className="rounded-[1.75rem] border border-white/10 bg-black/25 p-5 shadow-xl shadow-black/20 backdrop-blur sm:p-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-stone-400">Node Clusters</p>
          <h2 className="mt-2 text-2xl font-semibold text-stone-50">Cluster focus and mute controls stay local to this route.</h2>
        </div>
        <div className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-stone-300">{focusedClusterId ? "Focused scope active" : "Full topology"}</div>
      </div>
      <div className="mt-5 grid gap-4 lg:grid-cols-2">
        {clusters.map((cluster) => {
          const clusterNodes = nodes.filter((node) => node.clusterId === cluster.id);
          const muted = mutedClusterIds.includes(cluster.id);
          const active = selectedClusterId === cluster.id;
          return (
            <article
              className={`rounded-[1.5rem] border p-4 transition ${
                active
                  ? "border-amber-300/35 bg-amber-300/10 shadow-lg shadow-amber-950/15"
                  : "border-white/10 bg-white/[0.04]"
              } ${muted ? "opacity-55" : ""}`}
              key={cluster.id}
            >
              <div className="flex flex-wrap items-start justify-between gap-3">
                <button className="space-y-2 text-left" onClick={() => onSelectCluster(cluster.id)} type="button">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="text-lg font-semibold text-stone-50">{cluster.name}</h3>
                    <span className={`rounded-full border px-2.5 py-1 text-xs ${clusterTone[cluster.health]}`}>Score {cluster.healthScore}</span>
                  </div>
                  <p className="max-w-md text-sm leading-6 text-stone-300">{cluster.summary}</p>
                </button>
                <div className="flex flex-wrap gap-2">
                  <button
                    className={`rounded-full px-3 py-1.5 text-xs font-semibold ${
                      focusedClusterId === cluster.id
                        ? "bg-amber-300 text-stone-950"
                        : "border border-white/10 bg-white/5 text-stone-200"
                    }`}
                    onClick={() => onToggleFocus(cluster.id)}
                    type="button"
                  >
                    {focusedClusterId === cluster.id ? "Focused" : "Focus"}
                  </button>
                  <button
                    className={`rounded-full px-3 py-1.5 text-xs font-semibold ${
                      muted
                        ? "bg-stone-100 text-stone-950"
                        : "border border-white/10 bg-white/5 text-stone-200"
                    }`}
                    onClick={() => onToggleMute(cluster.id)}
                    type="button"
                  >
                    {muted ? "Unmute" : "Mute"}
                  </button>
                </div>
              </div>
              <div className="mt-4 flex flex-wrap gap-2 text-xs text-stone-400"><span>{cluster.owner}</span><span>&bull;</span><span>{cluster.region}</span><span>&bull;</span><span>{cluster.riskLabel}</span></div>
              <div className="mt-4 grid gap-2">
                {clusterNodes.map((node) => {
                  const selected = node.id === selectedNodeId;
                  return (
                    <button
                      className={`flex items-center justify-between rounded-2xl border px-3 py-3 text-left transition ${
                        selected
                          ? "border-amber-300/40 bg-amber-300/10"
                          : "border-white/10 bg-black/20 hover:border-white/20 hover:bg-white/[0.06]"
                      }`}
                      key={node.id}
                      onClick={() => onSelectNode(node.id, cluster.id)}
                      type="button"
                    >
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <span className={`h-2.5 w-2.5 rounded-full ${nodeTone[node.status]}`} />
                          <span className="truncate font-medium text-stone-50">{node.name}</span>
                        </div>
                        <p className="mt-1 truncate text-xs text-stone-400">{node.role}</p>
                      </div>
                      <div className="text-right text-xs text-stone-400"><p>{node.latencyMs} ms</p><p>{node.traffic}</p></div>
                    </button>
                  );
                })}
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
