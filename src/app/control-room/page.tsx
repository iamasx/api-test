import type { Metadata } from "next";

import { ControlRoomDashboard } from "@/components/control-room/ControlRoomDashboard";
import { createControlRoomSnapshot } from "@/components/control-room/control-room-data";

export const metadata: Metadata = {
  title: "Control Room",
  description: "Experimental mock operations dashboard.",
};

export default function ControlRoomPage() {
  return (
    <main className="min-h-screen bg-slate-950 px-4 py-6 text-slate-100 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <ControlRoomDashboard initialSnapshot={createControlRoomSnapshot()} />
      </div>
    </main>
  );
}
