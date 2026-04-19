import type { Metadata } from "next";

import { buildStatusBoardSnapshot } from "./mock-data";
import { StatusBoardShell } from "@/components/status-board/status-board-shell";

export const metadata: Metadata = {
  title: "Status Board | API Test",
  description:
    "Mock service status board with regional health cards, dependency status, and a failover checklist.",
};

export default function StatusBoardPage() {
  return (
    <StatusBoardShell
      initialSnapshot={buildStatusBoardSnapshot(0, new Date())}
    />
  );
}
