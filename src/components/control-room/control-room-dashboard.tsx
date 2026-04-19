"use client";

import { useState, useTransition } from "react";
import {
  buildControlRoomSnapshot,
  type ControlRoomSnapshot,
} from "@/app/control-room/mock-data";
import { AlertList } from "./alert-list";
import { ActivityFeed } from "./activity-feed";
import { ControlRoomHeader } from "./control-room-header";
import { MetricsGrid } from "./metrics-grid";
import { QuickActions } from "./quick-actions";

type ControlRoomDashboardProps = {
  initialSnapshot: ControlRoomSnapshot;
};

export function ControlRoomDashboard({
  initialSnapshot,
}: ControlRoomDashboardProps) {
  const [snapshot, setSnapshot] = useState(initialSnapshot);
  const [cycle, setCycle] = useState(0);
  const [isRefreshing, startTransition] = useTransition();

  const warningCount = snapshot.alerts.filter(
    (alert) => alert.severity === "warning",
  ).length;
  const criticalCount = snapshot.alerts.filter(
    (alert) => alert.severity === "critical",
  ).length;

  function refreshSnapshot() {
    const nextCycle = cycle + 1;

    startTransition(() => {
      setCycle(nextCycle);
      setSnapshot(buildControlRoomSnapshot(nextCycle, new Date()));
    });
  }

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,rgba(6,95,70,0.18),transparent_32%),linear-gradient(180deg,#021014_0%,#031a21_55%,#01070c_100%)] px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl space-y-6">
        <ControlRoomHeader
          criticalCount={criticalCount}
          environment={snapshot.environment}
          isRefreshing={isRefreshing}
          lastUpdated={snapshot.lastUpdated}
          warningCount={warningCount}
          onRefresh={refreshSnapshot}
        />
        <div className="grid gap-6 xl:grid-cols-[minmax(0,1.75fr)_minmax(320px,0.95fr)]">
          <div className="space-y-6">
            <MetricsGrid metrics={snapshot.metrics} />
            <ActivityFeed items={snapshot.feed} />
          </div>
          <div className="space-y-6">
            <AlertList alerts={snapshot.alerts} />
            <QuickActions />
          </div>
        </div>
      </div>
    </main>
  );
}
