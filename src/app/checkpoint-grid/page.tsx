import type { Metadata } from "next";

import { CheckpointGridShell } from "@/components/checkpoint-grid/checkpoint-grid-shell";

export const metadata: Metadata = {
  title: "Checkpoint Grid",
  description:
    "Mock milestone dashboard with checkpoint tiles, progress bands, and local review notes.",
};

export default function CheckpointGridPage() {
  return <CheckpointGridShell />;
}
