import type { Metadata } from "next";
import { alertJournalDays } from "./alert-journal-data";
import { AlertJournalShell } from "@/components/alert-journal/alert-journal-shell";

export const metadata: Metadata = {
  title: "Alert Journal",
  description: "Mock alert journal with local grouping, filters, and resolution markers.",
};

export default function AlertJournalPage() {
  return <AlertJournalShell initialDays={alertJournalDays} />;
}
