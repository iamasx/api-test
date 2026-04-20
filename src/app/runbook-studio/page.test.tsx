import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import {
  executionPreviews,
  revisionSummary,
  runbookGroups,
} from "./_data/runbook-studio-data";
import RunbookStudioPage from "./page";

describe("RunbookStudioPage", () => {
  it("renders the route hero, workflow entry points, and revision summary panel", () => {
    render(<RunbookStudioPage />);

    expect(
      screen.getByRole("heading", {
        level: 1,
        name: /review the runbook set, preview execution flow, and track revision drift before release/i,
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: /back to route index/i }),
    ).toHaveAttribute("href", "/");
    expect(
      screen.getByRole("heading", {
        level: 2,
        name: /group the procedures the same way the workflow hands off/i,
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", {
        level: 2,
        name: /dry-run the release before the runbook pack ships/i,
      }),
    ).toBeInTheDocument();

    const summaryPanel = screen.getByLabelText(/runbook revision summary/i);

    expect(
      within(summaryPanel).getByText(revisionSummary.title),
    ).toBeInTheDocument();
    expect(
      within(summaryPanel).getByText(revisionSummary.metrics[0].value),
    ).toBeInTheDocument();
    expect(
      within(summaryPanel).getByText(revisionSummary.changedAreas[0]),
    ).toBeInTheDocument();
  }, 15000);

  it("renders every grouped procedure card with revision and execution details", () => {
    render(<RunbookStudioPage />);

    for (const group of runbookGroups) {
      const procedureList = screen.getByRole("list", {
        name: `${group.title} procedures`,
      });

      expect(procedureList.querySelectorAll(':scope > [role="listitem"]')).toHaveLength(
        group.procedures.length,
      );

      for (const procedure of group.procedures) {
        const procedureCard = within(procedureList)
          .getByRole("heading", { level: 3, name: procedure.title })
          .closest('[role="listitem"]');

        expect(procedureCard).toBeInTheDocument();
        expect(procedureCard).toHaveTextContent(procedure.code);
        expect(procedureCard).toHaveTextContent(procedure.revision.version);
        expect(procedureCard).toHaveTextContent(procedure.execution.targetWindow);
        expect(procedureCard).toHaveTextContent(
          procedure.execution.outputs[0],
        );
        expect(procedureCard).toHaveTextContent(procedure.revision.notes[0]);
      }
    }
  }, 15000);

  it("renders every execution preview with dry-run steps and expected outputs", () => {
    render(<RunbookStudioPage />);

    const previewList = screen.getByRole("list", {
      name: /execution preview cards/i,
    });

    expect(previewList.querySelectorAll(':scope > [role="listitem"]')).toHaveLength(
      executionPreviews.length,
    );

    for (const preview of executionPreviews) {
      const previewCard = within(previewList)
        .getByRole("heading", { level: 3, name: preview.title })
        .closest('[role="listitem"]');

      expect(previewCard).toBeInTheDocument();
      expect(previewCard).toHaveTextContent(preview.operator);
      expect(previewCard).toHaveTextContent(preview.duration);
      expect(previewCard).toHaveTextContent(preview.steps[0].label);
      expect(previewCard).toHaveTextContent(preview.outputs[0]);
      expect(previewCard).toHaveTextContent(preview.signals[0]);
    }
  }, 15000);
});
