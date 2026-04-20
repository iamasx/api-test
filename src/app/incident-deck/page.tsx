import type { Metadata } from "next";
import { IncidentDeckShell } from "@/components/incident-deck/incident-deck-shell";

export const metadata: Metadata = {
  title: "Incident Deck",
  description:
    "Mock incident workspace with staged triage, escalation lanes, and response handoff tracking.",
};

export default function IncidentDeckPage() {
  return <IncidentDeckShell />;
}
