"use client";

import { startTransition, useState } from "react";

import {
  dependencyHighlights,
  getDefaultInspectedService,
  getServiceMapClusterViews,
  getServiceMapInspectorView,
  getServiceMapSummary,
} from "../_data/service-map-data";
import styles from "../service-map.module.css";
import { ClusterSection } from "./cluster-section";
import { DependencyHighlight } from "./dependency-highlight";
import { InspectorPanel } from "./inspector-panel";

const clusterViews = getServiceMapClusterViews();
const summary = getServiceMapSummary();
const defaultServiceId = getDefaultInspectedService()?.id ?? "";

export function ServiceMapShell() {
  const [selectedServiceId, setSelectedServiceId] = useState(defaultServiceId);
  const inspectorView = getServiceMapInspectorView(selectedServiceId);

  function handleSelectService(serviceId: string) {
    startTransition(() => {
      setSelectedServiceId(serviceId);
    });
  }

  if (!inspectorView) {
    return null;
  }

  return (
    <main
      className={`${styles.shell} mx-auto flex w-full max-w-7xl flex-1 flex-col gap-8 px-6 py-8 sm:px-10 lg:px-12 lg:py-12`}
    >
      <section
        className={`${styles.heroPanel} overflow-hidden rounded-[2.4rem] border border-slate-200/80 bg-[linear-gradient(135deg,rgba(7,20,39,0.98),rgba(10,43,63,0.95)_52%,rgba(14,84,92,0.92))] px-6 py-8 text-white shadow-[0_30px_110px_-52px_rgba(15,23,42,0.96)] sm:px-8 lg:px-10`}
      >
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1.35fr)_minmax(280px,0.9fr)]">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.32em] text-cyan-300">
              Service Map
            </p>
            <h1 className="mt-4 max-w-4xl text-4xl font-semibold tracking-tight sm:text-5xl">
              Service clusters, dependency pressure, and one live inspector.
            </h1>
            <p className="mt-5 max-w-3xl text-base leading-8 text-slate-200 sm:text-lg">
              This route stages a route-local topology map with grouped service
              clusters, dependency highlights, and a focused detail panel for
              the currently selected node.
            </p>
            <div className="mt-6 flex flex-wrap gap-3 text-sm text-slate-200">
              <span className="rounded-full border border-white/12 bg-white/8 px-4 py-2">
                {summary.totalClusters} clusters
              </span>
              <span className="rounded-full border border-white/12 bg-white/8 px-4 py-2">
                {summary.totalServices} mapped services
              </span>
              <span className="rounded-full border border-white/12 bg-white/8 px-4 py-2">
                {summary.dependencyHighlights} dependency highlights
              </span>
            </div>
          </div>

          <aside
            className={`${styles.summaryPanel} rounded-[1.8rem] border border-white/12 bg-white/8 p-5`}
          >
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-cyan-200/85">
              Highest risk node
            </p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight">
              {summary.highestRiskNode.name}
            </h2>
            <p className="mt-3 text-sm leading-7 text-slate-200">
              {summary.highestRiskNode.note}
            </p>
            <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
              <div
                className={`${styles.summaryMetricCard} rounded-[1.25rem] border border-white/12 bg-slate-950/35 px-4 py-3`}
              >
                <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-300">
                  Severe highlights
                </p>
                <p className="mt-2 text-2xl font-semibold text-white">
                  {summary.severeHighlights}
                </p>
              </div>
              <div
                className={`${styles.summaryMetricCard} rounded-[1.25rem] border border-white/12 bg-slate-950/35 px-4 py-3`}
              >
                <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-300">
                  Current signal
                </p>
                <p className="mt-2 text-sm leading-6 text-white">
                  {summary.highestRiskNode.p95Latency} p95 /{" "}
                  {summary.highestRiskNode.errorRate} errors /{" "}
                  {summary.highestRiskNode.saturation} saturation
                </p>
              </div>
            </div>
          </aside>
        </div>
      </section>

      <section aria-labelledby="service-map-highlights" className="space-y-5">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">
              Dependency highlights
            </p>
            <h2
              id="service-map-highlights"
              className="mt-2 text-3xl font-semibold tracking-tight text-slate-950"
            >
              Shared risks that cut across the map
            </h2>
          </div>
          <p className="max-w-2xl text-sm leading-7 text-slate-600">
            Each highlight calls out one dependency, the services it touches,
            and the next action the mock operations team would take.
          </p>
        </div>

        <div
          aria-label="Dependency highlights"
          className={`${styles.highlightGrid} grid gap-4 xl:grid-cols-3`}
          role="list"
        >
          {dependencyHighlights.map((highlight) => (
            <div key={highlight.id} role="listitem">
              <DependencyHighlight highlight={highlight} />
            </div>
          ))}
        </div>
      </section>

      <div className="grid gap-8 xl:grid-cols-[minmax(0,1.2fr)_minmax(350px,0.8fr)]">
        <section
          aria-labelledby="service-map-clusters"
          className="space-y-6"
          data-testid="service-map-clusters"
        >
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">
                Cluster sections
              </p>
              <h2
                id="service-map-clusters"
                className="mt-2 text-3xl font-semibold tracking-tight text-slate-950"
              >
                Topology grouped by operational lane
              </h2>
            </div>
            <p className="max-w-2xl text-sm leading-7 text-slate-600">
              Select any service card to move its dependency posture and service
              notes into the inspector panel.
            </p>
          </div>

          {clusterViews.map((cluster) => (
            <ClusterSection
              key={cluster.id}
              cluster={cluster}
              selectedServiceId={selectedServiceId}
              onSelectService={handleSelectService}
            />
          ))}
        </section>

        <div className={`${styles.stickyInspector} xl:sticky xl:top-8 xl:self-start`}>
          <InspectorPanel view={inspectorView} />
        </div>
      </div>
    </main>
  );
}
