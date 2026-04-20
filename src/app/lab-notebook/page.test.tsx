import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import {
  experimentEntries,
  notebookSummaryMetrics,
  observationPanels,
} from "./_data/lab-notebook-data";
import LabNotebookPage from "./page";

describe("LabNotebookPage", () => {
  it("renders the notebook hero and primary section headings", () => {
    render(<LabNotebookPage />);

    expect(
      screen.getByRole("heading", {
        level: 1,
        name: /multi-panel notebook for experiment logs, field observations, and shift summaries/i,
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", {
        level: 2,
        name: /status summaries at a glance/i,
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", {
        level: 2,
        name: /active notebook entries/i,
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", {
        level: 2,
        name: /observation panels and anomaly notes/i,
      }),
    ).toBeInTheDocument();
  });

  it("renders every summary metric and experiment entry from mock data", () => {
    render(<LabNotebookPage />);

    const summaryList = screen.getByRole("list", {
      name: /notebook summaries/i,
    });
    const experimentSection = screen
      .getByRole("heading", {
        level: 2,
        name: /active notebook entries/i,
      })
      .closest("section");

    expect(within(summaryList).getAllByRole("listitem")).toHaveLength(
      notebookSummaryMetrics.length,
    );
    expect(experimentSection).toBeTruthy();

    for (const metric of notebookSummaryMetrics) {
      expect(within(summaryList).getByText(metric.label)).toBeInTheDocument();
      expect(within(summaryList).getByText(metric.value)).toBeInTheDocument();
    }

    for (const entry of experimentEntries) {
      expect(
        within(experimentSection as HTMLElement).getByRole("heading", {
          level: 3,
          name: entry.title,
        }),
      ).toBeInTheDocument();
      expect(
        within(experimentSection as HTMLElement).getByText(entry.codename),
      ).toBeInTheDocument();
      expect(
        within(experimentSection as HTMLElement).getByText(entry.lead),
      ).toBeInTheDocument();
    }
  });

  it("renders representative observation and follow-up content", () => {
    render(<LabNotebookPage />);

    const observationGrid = screen.getByTestId("lab-notebook-observation-grid");
    const prioritySection = screen
      .getByRole("heading", { name: /priority follow-up/i })
      .closest("section");
    const linksSection = screen
      .getByRole("heading", { name: /notebook links/i })
      .closest("section");

    expect(prioritySection).toBeTruthy();
    expect(linksSection).toBeTruthy();
    expect(
      within(prioritySection as HTMLElement).getByText("Morrow-12"),
    ).toBeInTheDocument();
    expect(
      within(prioritySection as HTMLElement).getByText("Solace-07"),
    ).toBeInTheDocument();

    expect(
      within(observationGrid).getByRole("heading", {
        level: 3,
        name: observationPanels[0].title,
      }),
    ).toBeInTheDocument();
    expect(
      within(observationGrid).getByText(observationPanels[0].notes[0]),
    ).toBeInTheDocument();
    expect(
      within(observationGrid).getByText(observationPanels[2].anomaly),
    ).toBeInTheDocument();
    expect(
      within(linksSection as HTMLElement).getByText(/2 linked observation panels\./i),
    ).toBeInTheDocument();
    expect(
      within(linksSection as HTMLElement).getAllByText(/1 linked observation panel\./i),
    ).toHaveLength(3);
  });

  it("exposes the responsive multi-panel layout hooks", () => {
    render(<LabNotebookPage />);

    const summaryGrid = screen.getByTestId("lab-notebook-summary-grid");
    const workspace = screen.getByTestId("lab-notebook-workspace");
    const observationGrid = screen.getByTestId("lab-notebook-observation-grid");

    expect(summaryGrid.className).toContain("md:grid-cols-3");
    expect(workspace.className).toContain(
      "xl:grid-cols-[minmax(0,1.2fr)_minmax(20rem,0.8fr)]",
    );
    expect(observationGrid.className).toContain("2xl:grid-cols-2");
  });
});
