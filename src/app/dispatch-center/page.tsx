import type { Metadata } from "next";
import { buildDispatchCenterSnapshot } from "./mock-data";
import { DispatchCenterShell } from "@/components/dispatch-center/dispatch-center-shell";

export const metadata: Metadata = {
  title: "Dispatch Center | API Test",
  description: "Isolated dispatch board with queue buckets, operator load cards, and local drawer state.",
};

export default function DispatchCenterPage() {
  return <DispatchCenterShell initialSnapshot={buildDispatchCenterSnapshot()} />;
}
