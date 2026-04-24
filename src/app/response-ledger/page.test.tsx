import { cleanup, render, screen, within } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";

import {
  getResponseLedgerView,
  responseLedgerEntries,
  responseLedgerOutcomeSummaries,
  responseLedgerOwnershipRail,
} from "./_data/response-ledger-data";
import ResponseLedgerPage from "./page";

afterEach(() => {
  cleanup();
});

describe("ResponseLedgerPage", () => {
  it("renders the route shell with its main sections and navigation", () => {
    const view = getResponseLedgerView();
    render(<ResponseLedgerPage />);
    expect(screen.getByRole("heading", { level: 1, name: view.summary.title })).toBeInTheDocument();
    expect(
      screen.getByRole("heading", {
        level: 2,
        name: /every intervention is logged with a visible owner and outcome\./i,
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", {
        level: 2,
        name: /compact accountability for the next review window\./i,
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", {
        level: 2,
        name: /short summaries keep the shift outcome legible\./i,
      }),
    ).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /review timeline/i })).toHaveAttribute(
      "href",
      "#action-history",
    );
    expect(screen.getByRole("link", { name: /back to route index/i })).toHaveAttribute("href", "/");
  });

  it("renders action history, summaries, and the ownership rail from the mock data", () => {
    render(<ResponseLedgerPage />);
    const entryList = screen.getByRole("list", { name: /ledger entries/i });
    const outcomeList = screen.getByRole("list", { name: /outcome summaries/i });
    const ownershipRail = screen.getByRole("list", { name: /ownership rail entries/i });
    expect(within(entryList).getAllByRole("listitem")).toHaveLength(responseLedgerEntries.length);
    expect(within(outcomeList).getAllByRole("listitem")).toHaveLength(
      responseLedgerOutcomeSummaries.length,
    );
    expect(within(ownershipRail).getAllByRole("listitem")).toHaveLength(
      responseLedgerOwnershipRail.length,
    );

    const firstEntry = responseLedgerEntries[0];
    const firstOwner = responseLedgerOwnershipRail[0];
    const firstOutcome = responseLedgerOutcomeSummaries[0];

    expect(within(entryList).getByRole("heading", { name: firstEntry.action })).toBeInTheDocument();
    expect(screen.getByText(firstEntry.outcome)).toBeInTheDocument();
    expect(screen.getByText(firstEntry.reviewWindow)).toBeInTheDocument();
    expect(within(ownershipRail).getByRole("heading", { name: firstOwner.name })).toBeInTheDocument();
    expect(screen.getByText(firstOwner.focus)).toBeInTheDocument();
    expect(within(outcomeList).getByRole("heading", { name: firstOutcome.headline })).toBeInTheDocument();
    expect(screen.getByText(firstOutcome.detail)).toBeInTheDocument();
  });

  it("preserves the summary metrics and responsive layout hooks", () => {
    const view = getResponseLedgerView();
    render(<ResponseLedgerPage />);
    const summaryList = screen.getByRole("list", { name: /response ledger summary/i });
    const layout = screen.getByTestId("response-ledger-layout");
    const outcomes = screen.getByTestId("response-ledger-outcomes");
    expect(within(summaryList).getAllByRole("listitem")).toHaveLength(view.summary.stats.length);
    for (const stat of view.summary.stats) {
      expect(screen.getByText(stat.label)).toBeInTheDocument();
      expect(screen.getByText(stat.value)).toBeInTheDocument();
    }

    expect(layout.className).toContain("xl:grid-cols-[minmax(0,1.16fr)_minmax(300px,0.84fr)]");
    expect(outcomes.className).toContain("lg:grid-cols-3");
  });
});
