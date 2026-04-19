"use client";

import { startTransition, useState } from "react";

import {
  plannedRoutes,
  routeConstraints,
  type ConstraintId,
} from "@/app/route-planner/route-planner-data";
import { ConstraintSidebar } from "./constraint-sidebar";
import { RoutePlannerHeader } from "./route-planner-header";
import { RouteSelector } from "./route-selector";
import { SegmentRail } from "./segment-rail";

export function RoutePlannerShell() {
  const [selectedRouteId, setSelectedRouteId] = useState(plannedRoutes[0]?.id ?? "");
  const [selectedSegmentId, setSelectedSegmentId] = useState<string | null>(plannedRoutes[0]?.segments[0]?.id ?? null);
  const [selectedConstraintIds, setSelectedConstraintIds] = useState<ConstraintId[]>([]);
  const activeRoute = plannedRoutes.find((route) => route.id === selectedRouteId) ?? plannedRoutes[0];
  const hasActiveFilters = selectedConstraintIds.length > 0;
  const activeConstraints = routeConstraints.filter((constraint) => selectedConstraintIds.includes(constraint.id));
  const visibleSegments = activeRoute.segments.filter((segment) =>
    selectedConstraintIds.length === 0 ? true : segment.constraintIds.some((constraintId) => selectedConstraintIds.includes(constraintId)),
  );
  const activeSegmentId = visibleSegments.some((segment) => segment.id === selectedSegmentId) ? selectedSegmentId : (visibleSegments[0]?.id ?? null);
  const activeSegment = activeRoute.segments.find((segment) => segment.id === activeSegmentId) ?? null;
  const totalBufferMinutes = visibleSegments.reduce((total, segment) => total + segment.bufferMinutes, 0);
  const rerouteCount = visibleSegments.filter((segment) => segment.status === "reroute").length;
  const watchCount = visibleSegments.filter((segment) => segment.status === "watch").length;
  const decision =
    visibleSegments.length === 0
      ? { label: "Reset filters", title: "No live segments match the current constraint slice.", detail: "This route is still available, but none of its segments carry the filters currently enabled in the sidebar." }
      : rerouteCount > 0
        ? { label: "Escalate reroute", title: "A constrained segment now needs path reassignment.", detail: "Keep the route active, but move the flagged segment to its fallback corridor before downstream timing collapses." }
        : watchCount > 1
          ? { label: "Hold and monitor", title: "Multiple segments are stable but require close sequencing.", detail: "The plan is still viable if dispatch keeps each handoff inside the current time window and avoids compounding watch states." }
          : { label: hasActiveFilters ? "Filtered view" : "Baseline plan", title: "Preferred corridor remains intact.", detail: "No reroute trigger is active in the visible chain, so operators can keep the current route as the working plan." };

  function handleSelectRoute(routeId: string) {
    const nextRoute = plannedRoutes.find((route) => route.id === routeId);
    if (!nextRoute) return;
    startTransition(() => {
      setSelectedRouteId(routeId);
      setSelectedSegmentId(nextRoute.segments[0]?.id ?? null);
    });
  }

  function handleSelectSegment(segmentId: string) {
    startTransition(() => setSelectedSegmentId(segmentId));
  }

  function handleToggleConstraint(constraintId: ConstraintId) {
    startTransition(() => {
      setSelectedConstraintIds((current) => current.includes(constraintId) ? current.filter((value) => value !== constraintId) : [...current, constraintId]);
    });
  }

  function handleClearConstraints() {
    startTransition(() => setSelectedConstraintIds([]));
  }

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,rgba(245,158,11,0.2),transparent_30%),linear-gradient(180deg,#fffaf0_0%,#f8fafc_45%,#eef2ff_100%)] px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl space-y-6">
        <RoutePlannerHeader
          activeConstraintCount={activeConstraints.length}
          dispatchLead={activeRoute.dispatchLead}
          objective={activeRoute.objective}
          planningMode={activeRoute.planningMode}
          routeName={activeRoute.name}
          routeScore={activeRoute.routeScore}
          selectedWindow={activeRoute.selectedWindow}
          summary={activeRoute.summary}
          totalSegments={activeRoute.segments.length}
          visibleSegments={visibleSegments.length}
        />
        <RouteSelector
          onSelectRoute={handleSelectRoute}
          routes={plannedRoutes}
          selectedRouteId={activeRoute.id}
        />
        <div className="grid gap-6 xl:grid-cols-[minmax(0,1.45fr)_minmax(320px,0.9fr)]">
          <SegmentRail
            constraints={routeConstraints}
            hasActiveFilters={hasActiveFilters}
            onClearFilters={handleClearConstraints}
            onSelectSegment={handleSelectSegment}
            routeName={activeRoute.name}
            segments={visibleSegments}
            selectedSegmentId={activeSegmentId}
            totalSegments={activeRoute.segments.length}
          />
          <ConstraintSidebar
            activeSegment={activeSegment}
            constraints={routeConstraints}
            decision={decision}
            hasActiveFilters={hasActiveFilters}
            onClearFilters={handleClearConstraints}
            onToggleConstraint={handleToggleConstraint}
            selectedConstraintIds={selectedConstraintIds}
            totalBufferMinutes={totalBufferMinutes}
            visibleSegments={visibleSegments}
          />
        </div>
      </div>
    </main>
  );
}
