import type { Metadata } from "next";

import { SignalLabWorkspace } from "@/components/signal-lab/signal-lab-workspace";

export const metadata: Metadata = {
  title: "Signal Lab",
  description:
    "Synthetic monitoring workspace with stream cards, anomaly markers, and inspector panels.",
};

export default function SignalLabPage() {
  return <SignalLabWorkspace />;
}
