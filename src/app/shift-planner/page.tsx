import type { Metadata } from "next";
import { ShiftPlannerWorkspace } from "@/components/shift-planner/shift-planner-workspace";

export const metadata: Metadata = {
  title: "Shift Planner | API Test",
  description: "Mock staffing workspace with role coverage, shift filters, and local hand-off notes.",
};

export default function ShiftPlannerPage() {
  return <ShiftPlannerWorkspace />;
}
