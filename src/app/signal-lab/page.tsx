import type { Metadata } from "next";

import { SignalLabWorkspace } from "@/components/signal-lab/signal-lab-workspace";

export const metadata: Metadata = {
  title: "Signal Lab",
  description:
    "Comparison-first signal workspace with pinned anomaly streams, confidence trends, and a dedicated inspector.",
};

export default function SignalLabPage() {
  return <SignalLabWorkspace />;
}
