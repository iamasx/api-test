import type { Metadata } from "next";

import { LabNotebookShell } from "@/components/lab-notebook/lab-notebook-shell";

import { experiments, milestoneTags, notebookStatus, observationEntries, statusOptions } from "./notebook-data";

export const metadata: Metadata = {
  title: "Lab Notebook | API Test",
  description: "Mock notebook workspace with experiment cards, status filters, and an observation drawer.",
};

export default function LabNotebookPage() {
  return <LabNotebookShell experiments={experiments} milestoneTags={milestoneTags} notebookStatus={notebookStatus} observationEntries={observationEntries} statusOptions={statusOptions} />;
}
