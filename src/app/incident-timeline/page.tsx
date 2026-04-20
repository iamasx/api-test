import type { Metadata } from "next";
import { incidents } from "./data";
import { IncidentTimelineReview } from "./incident-timeline-review";

export const metadata: Metadata = {
  title: "Incident Timeline Review",
  description:
    "Route shell for reviewing incident summaries, severity filters, and response timelines.",
};

export default function IncidentTimelinePage() {
  return <IncidentTimelineReview incidents={incidents} />;
}
