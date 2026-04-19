import type { Metadata } from "next";
import { buildControlRoomSnapshot } from "./mock-data";
import { ControlRoomDashboard } from "@/components/control-room/control-room-dashboard";

export const metadata: Metadata = {
  title: "Control Room",
  description: "Mock operations dashboard with local metrics, alerts, and feed data.",
};

export default function ControlRoomPage() {
  return (
    <ControlRoomDashboard
      initialSnapshot={buildControlRoomSnapshot(0, new Date())}
    />
  );
}
