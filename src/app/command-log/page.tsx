import type { Metadata } from "next";

import { CommandLogWorkspace } from "@/components/command-log/command-log-workspace";

export const metadata: Metadata = {
  title: "Command Log",
  description:
    "Synthetic command log with grouped event streams, tag filters, and a pinned detail rail.",
};

export default function CommandLogPage() {
  return <CommandLogWorkspace />;
}
