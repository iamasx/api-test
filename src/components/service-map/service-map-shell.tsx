"use client";

import { startTransition, useState } from "react";

import {
  dependencyLinks,
  serviceClusters,
  serviceMapOverview,
  serviceNodes,
} from "@/app/service-map/service-map-data";
import { ClusterList } from "./cluster-list";
import { DependencyPanel } from "./dependency-panel";
import { FocusInspector } from "./focus-inspector";

function toggleId(items: string[], id: string) {
  return items.includes(id) ? items.filter((item) => item !== id) : [...items, id];
}

export function ServiceMapShell() {
  const [selectedClusterId, setSelectedClusterId] = useState(serviceClusters[0]?.id ?? "");
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(serviceNodes[0]?.id ?? null);
  const [focusedClusterId, setFocusedClusterId] = useState<string | null>(null);
  const [mutedClusterIds, setMutedClusterIds] = useState<string[]>([]);
  const [highlightedLinkId, setHighlightedLinkId] = useState<string | null>("edge-session");
  const visibleClusters = focusedClusterId ? serviceClusters.filter((cluster) => cluster.id === focusedClusterId) : serviceClusters;
  const activeClusterId = visibleClusters.some((cluster) => cluster.id === selectedClusterId) ? selectedClusterId : (visibleClusters[0]?.id ?? "");
  const activeCluster = serviceClusters.find((cluster) => cluster.id === activeClusterId) ?? null;
  const activeNode = serviceNodes.find((node) => node.id === selectedNodeId) ?? null;
  const activeNodeVisible = activeNode ? visibleClusters.some((cluster) => cluster.id === activeNode.clusterId) : false;
  const inspectorNode = activeNodeVisible ? activeNode : null;
  const criticalNodeCount = serviceNodes.filter((node) => node.status === "critical").length;
  const mutedNodeCount = serviceNodes.filter((node) => mutedClusterIds.includes(node.clusterId)).length;
  const filteredLinks = dependencyLinks.filter((link) => {
    const fromNode = serviceNodes.find((node) => node.id === link.fromId);
    const toNode = serviceNodes.find((node) => node.id === link.toId);
    return !mutedClusterIds.includes(fromNode?.clusterId ?? "") && !mutedClusterIds.includes(toNode?.clusterId ?? "");
  });
  const relatedLinks = filteredLinks.filter((link) => {
    if (inspectorNode) return link.fromId === inspectorNode.id || link.toId === inspectorNode.id;
    return activeCluster ? activeCluster.nodeIds.includes(link.fromId) || activeCluster.nodeIds.includes(link.toId) : false;
  });
  const spotlightLink = relatedLinks.find((link) => link.id === highlightedLinkId) ?? null;
  const focusedClusterName = serviceClusters.find((cluster) => cluster.id === focusedClusterId)?.name ?? null;
  function handleSelectCluster(clusterId: string) {
    const cluster = serviceClusters.find((item) => item.id === clusterId);
    startTransition(() => {
      setSelectedClusterId(clusterId);
      if (!selectedNodeId || activeNode?.clusterId !== clusterId) setSelectedNodeId(cluster?.nodeIds[0] ?? null);
    });
  }

  function handleSelectNode(nodeId: string, clusterId: string) {
    const nextNodeId = selectedNodeId === nodeId ? null : nodeId;
    const nextLinkId = nextNodeId ? dependencyLinks.find((link) => link.fromId === nextNodeId || link.toId === nextNodeId)?.id ?? null : null;
    startTransition(() => {
      setSelectedClusterId(clusterId);
      setSelectedNodeId(nextNodeId);
      setHighlightedLinkId(nextLinkId);
    });
  }
  function handleToggleFocus(clusterId: string) {
    const nextFocusId = focusedClusterId === clusterId ? null : clusterId;
    const cluster = serviceClusters.find((item) => item.id === clusterId);
    startTransition(() => {
      setFocusedClusterId(nextFocusId);
      if (nextFocusId) {
        setSelectedClusterId(clusterId);
        setSelectedNodeId(cluster?.nodeIds[0] ?? null);
        setHighlightedLinkId(dependencyLinks.find((link) => cluster?.nodeIds.includes(link.fromId) || cluster?.nodeIds.includes(link.toId))?.id ?? null);
      }
    });
  }

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(251,191,36,0.18),_transparent_32%),linear-gradient(180deg,_#16110a_0%,_#211712_44%,_#09090b_100%)] px-4 py-6 text-stone-100 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl space-y-6">
        <section className="overflow-hidden rounded-[2rem] border border-amber-200/15 bg-black/30 shadow-2xl shadow-amber-950/20 backdrop-blur">
          <div className="grid gap-6 px-6 py-7 lg:grid-cols-[minmax(0,1.35fr)_minmax(320px,0.8fr)] lg:px-8">
            <div className="space-y-4">
              <div className="flex flex-wrap items-center gap-3">
                <p className="text-xs font-semibold uppercase tracking-[0.35em] text-amber-200/70">Service Map</p>
                <span className="rounded-full border border-amber-300/25 bg-amber-300/12 px-3 py-1 text-xs font-semibold text-amber-100">{serviceMapOverview.healthMode}</span>
              </div>
              <div className="space-y-3">
                <h1 className="max-w-3xl text-4xl font-semibold tracking-tight text-stone-50 sm:text-5xl">
                  Mock topology route with cluster focus, muted edges, and inspector detail.
                </h1>
                <p className="max-w-2xl text-sm leading-7 text-stone-300 sm:text-base">{serviceMapOverview.summary}</p>
              </div>
              <div className="flex flex-wrap gap-3 text-xs text-stone-300">
                <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5">Snapshot {serviceMapOverview.generatedAt}</span>
                <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5">Scope {focusedClusterName ?? "All clusters"}</span>
              </div>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              <article className="rounded-3xl border border-white/10 bg-white/5 px-4 py-4">
                <p className="text-sm text-stone-400">Clusters / Services</p>
                <p className="mt-2 text-3xl font-semibold text-stone-50">{serviceClusters.length} / {serviceNodes.length}</p>
              </article>
              <article className="rounded-3xl border border-amber-300/20 bg-amber-300/10 px-4 py-4 text-amber-50">
                <p className="text-sm text-amber-100/80">Visible links</p>
                <p className="mt-2 text-3xl font-semibold">{filteredLinks.length}</p>
              </article>
              <article className="rounded-3xl border border-rose-300/20 bg-rose-300/10 px-4 py-4 text-rose-50">
                <p className="text-sm text-rose-100/80">Critical nodes</p>
                <p className="mt-2 text-3xl font-semibold">{criticalNodeCount}</p>
              </article>
              <article className="rounded-3xl border border-sky-300/20 bg-sky-300/10 px-4 py-4 text-sky-50">
                <p className="text-sm text-sky-100/80">Muted clusters</p>
                <p className="mt-2 text-3xl font-semibold">{mutedClusterIds.length}</p>
              </article>
            </div>
          </div>
        </section>
        <div className="grid gap-6 xl:grid-cols-[minmax(0,1.45fr)_minmax(320px,0.95fr)]">
          <div className="space-y-6">
            <ClusterList
              clusters={visibleClusters}
              focusedClusterId={focusedClusterId}
              mutedClusterIds={mutedClusterIds}
              nodes={serviceNodes}
              onSelectCluster={handleSelectCluster}
              onSelectNode={handleSelectNode}
              onToggleFocus={handleToggleFocus}
              onToggleMute={(clusterId) => setMutedClusterIds((items) => toggleId(items, clusterId))}
              selectedClusterId={activeClusterId}
              selectedNodeId={selectedNodeId}
            />
            <DependencyPanel
              activeCluster={activeCluster}
              activeNode={inspectorNode}
              highlightedLinkId={spotlightLink?.id ?? null}
              isClusterMuted={activeCluster ? mutedClusterIds.includes(activeCluster.id) : false}
              links={relatedLinks}
              nodes={serviceNodes}
              onHighlight={(linkId) => setHighlightedLinkId((current) => current === linkId ? null : linkId)}
            />
          </div>
          <FocusInspector
            activeCluster={activeCluster}
            activeNode={inspectorNode}
            focusedClusterName={focusedClusterName}
            isClusterMuted={activeCluster ? mutedClusterIds.includes(activeCluster.id) : false}
            mutedNodeCount={mutedNodeCount}
            spotlightLink={spotlightLink}
            totalLinks={relatedLinks.length}
            totalMutedClusters={mutedClusterIds.length}
          />
        </div>
      </div>
    </main>
  );
}
