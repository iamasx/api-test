import type { Metadata } from "next";
import { IncidentDeckShell } from "@/components/incident-deck/incident-deck-shell";

export const metadata: Metadata = {
  title: "Incident Deck",
  description:
    "Mock incident workspace with local severity filters, response timeline, and responder detail state.",
};

export default function IncidentDeckPage() {
  return <IncidentDeckShell />;
}
