import type { Metadata } from "next";

import { QueueMonitorShell } from "@/components/queue-monitor/queue-monitor-shell";

export const metadata: Metadata = {
  title: "Queue Monitor | API Test",
  description: "Isolated backlog monitor route with queue columns, throughput indicators, and local escalation controls.",
};

export default function QueueMonitorPage() {
  return <QueueMonitorShell />;
}
