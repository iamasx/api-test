import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import {
  manifestDiscrepancies,
  manifestGroups,
  manifestRoomOverview,
  packageSummaries,
} from "./_data/manifest-room-data";
import ManifestRoomPage from "./page";

describe("ManifestRoomPage", () => {
  it("renders the route shell with manifest room actions and package summaries", () => {
    render(<ManifestRoomPage />);

    expect(screen.getByRole("heading", { level: 1, name: new RegExp(manifestRoomOverview.title, "i") })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /review manifest groups/i })).toHaveAttribute("href", "#manifest-groups");
    expect(screen.getByRole("link", { name: /open discrepancy panel/i })).toHaveAttribute("href", "#manifest-discrepancies");
    expect(screen.getByRole("link", { name: /back to route index/i })).toHaveAttribute("href", "/");

    const summaryList = screen.getByRole("list", { name: /package summaries/i });
    expect(within(summaryList).getAllByRole("listitem")).toHaveLength(packageSummaries.length);
    expect(summaryList).toHaveTextContent("Archive canisters");
    expect(summaryList).toHaveTextContent("1 seal mismatch");
  }, 15000);

  it("renders every manifest group with manifest cards and package details", () => {
    render(<ManifestRoomPage />);

    for (const group of manifestGroups) {
      const region = screen.getByRole("region", { name: group.title });

      expect(within(region).getByText(group.description)).toBeInTheDocument();
      expect(within(region).getByText(group.dock, { exact: false })).toBeInTheDocument();
      expect(within(region).getByText(group.cutoff, { exact: false })).toBeInTheDocument();
      const manifestList = within(region).getByRole("list", { name: `${group.title} manifests` });
      expect(manifestList.querySelectorAll(':scope > [role="listitem"]')).toHaveLength(
        group.manifests.length,
      );
      for (const manifest of group.manifests) {
        const manifestCard = within(manifestList).getByRole("heading", { name: manifest.carrier }).closest('[role="listitem"]');

        expect(manifestCard).toBeInTheDocument();
        expect(manifestCard).toHaveTextContent(manifest.id);
        expect(manifestCard).toHaveTextContent(manifest.lane);
        expect(manifestCard).toHaveTextContent(manifest.departure);
        expect(manifestCard).toHaveTextContent(manifest.packages[0].label);
      }
    }
  }, 15000);

  it("shows the discrepancy panel counts and issue details", () => {
    render(<ManifestRoomPage />);

    const discrepancyPanel = screen.getByLabelText(/manifest discrepancy panel/i);
    const discrepancyList = within(discrepancyPanel).getByRole("list", { name: /manifest discrepancies/i });
    expect(within(discrepancyList).getAllByRole("listitem")).toHaveLength(manifestDiscrepancies.length);
    expect(discrepancyPanel).toHaveTextContent("Critical");
    expect(discrepancyPanel).toHaveTextContent("Watch");
    expect(discrepancyPanel).toHaveTextContent("Resolved");

    const criticalIssue = within(discrepancyPanel).getByRole("heading", { name: /seal count mismatch on archive canisters/i }).closest('[role="listitem"]');

    expect(criticalIssue).toBeInTheDocument();
    expect(criticalIssue).toHaveTextContent("MN-2051");
    expect(criticalIssue).toHaveTextContent("Hold border relay until seal audit clears.");
    expect(criticalIssue).toHaveTextContent("J. Alvarez");
  }, 15000);
});
