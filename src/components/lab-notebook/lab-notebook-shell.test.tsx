import { fireEvent, render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import {
  boardLanes,
  comparisonMetrics,
  experimentRuns,
  experimentTemplates,
  experiments,
  milestoneTags,
  notebookStatus,
  observationEntries,
  outcomeReviews,
  reviewDecisionOptions,
  statusOptions,
} from "@/app/lab-notebook/notebook-data";
import { LabNotebookShell } from "./lab-notebook-shell";

function renderNotebook() {
  render(
    <LabNotebookShell
      boardLanes={boardLanes}
      comparisonMetrics={comparisonMetrics}
      experimentRuns={experimentRuns}
      experimentTemplates={experimentTemplates}
      experiments={experiments}
      milestoneTags={milestoneTags}
      notebookStatus={notebookStatus}
      observationEntries={observationEntries}
      outcomeReviews={outcomeReviews}
      reviewDecisionOptions={reviewDecisionOptions}
      statusOptions={statusOptions}
    />,
  );
}

describe("LabNotebookShell", () => {
  it("filters by template and creates a new notebook board from the selected template", () => {
    renderNotebook();
    const board = screen.getByLabelText("Template-aware experiment board");

    fireEvent.click(screen.getByLabelText("Select template: Thermal recovery ladder"));

    expect(
      within(board).getByText("Amber 04 thermal loop", { selector: "h3" }),
    ).toBeInTheDocument();
    expect(
      within(board).queryByText("Vector 12 catalyst assay", { selector: "h3" }),
    ).not.toBeInTheDocument();

    fireEvent.click(screen.getByLabelText("Create notebook from template: Thermal recovery ladder"));

    expect(
      within(board).getByText("Thermal recovery ladder draft 2", { selector: "h3" }),
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        "Keep the draft on intake until the paired runs are compared and documented.",
      ),
    ).toBeInTheDocument();
  }, 10_000);

  it("compares multiple runs in summary and detail views", () => {
    renderNotebook();

    const comparisonPanel = screen.getByLabelText("Run comparison panel");

    expect(within(comparisonPanel).getByText("Average signal")).toBeInTheDocument();
    expect(
      within(comparisonPanel).getByRole("checkbox", { name: "Select Run 5 ratio swap" }),
    ).toBeChecked();
    expect(
      within(comparisonPanel).getByRole("checkbox", { name: "Select Run 6 follow-up" }),
    ).toBeChecked();

    fireEvent.click(
      within(comparisonPanel).getByRole("checkbox", { name: "Select Run 4 baseline" }),
    );
    fireEvent.click(
      within(comparisonPanel).getByRole("button", { name: "Detail view" }),
    );

    expect(
      within(comparisonPanel).getByText(
        "The baseline closed with a broad spread and a warm handoff on the final tray.",
      ),
    ).toBeInTheDocument();
    expect(
      within(comparisonPanel).getByText(
        "The follow-up confirmed the ratio swap and tightened the spread even further.",
      ),
    ).toBeInTheDocument();
  }, 10_000);

  it("filters observation entries by the currently selected run set", () => {
    renderNotebook();

    const comparisonPanel = screen.getByLabelText("Run comparison panel");
    const observationDrawer = screen.getByLabelText("Observation drawer");

    expect(
      within(observationDrawer).getByText("Ratio swap narrowed the spread"),
    ).toBeInTheDocument();
    expect(
      within(observationDrawer).getByText("Follow-up pull held the gain"),
    ).toBeInTheDocument();

    fireEvent.click(
      within(comparisonPanel).getByRole("checkbox", { name: "Select Run 5 ratio swap" }),
    );

    expect(
      within(observationDrawer).queryByText("Ratio swap narrowed the spread"),
    ).not.toBeInTheDocument();
    expect(
      within(observationDrawer).getByText("Follow-up pull held the gain"),
    ).toBeInTheDocument();
  }, 10_000);

  it("updates the board context when review helpers and decisions change", () => {
    renderNotebook();

    fireEvent.click(
      screen.getByRole("button", { name: "Open notebook: Amber 04 thermal loop" }),
    );

    fireEvent.click(
      screen.getByRole("checkbox", { name: "Toggle helper: Clear one cooldown cycle" }),
    );
    expect(screen.getByText("3 of 3 ready")).toBeInTheDocument();

    fireEvent.click(
      screen.getByRole("button", { name: /Hold on comparison lane/i }),
    );

    expect(
      screen.getByText(
        "Thermal recovery ladder is currently sending this board toward compare.",
      ),
    ).toBeInTheDocument();
  }, 10_000);
});
