import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import ResponseLedgerPage from "./page";
import {
  actionEntries,
  outcomeSummaries,
  getOwnershipRecords,
} from "./_data/response-ledger-data";

describe("ResponseLedgerPage", () => {
  it("renders the page heading and summary stats", () => {
    render(<ResponseLedgerPage />);

    expect(
      screen.getByRole("heading", { level: 1, name: /response ledger/i }),
    ).toBeInTheDocument();

    expect(screen.getByText(String(actionEntries.length))).toBeInTheDocument();
    expect(
      screen.getByText(
        String(actionEntries.filter((a) => a.status === "completed").length),
      ),
    ).toBeInTheDocument();
  });

  it("renders all action history entries", () => {
    render(<ResponseLedgerPage />);

    const actionList = screen.getByRole("list", {
      name: /response ledger actions/i,
    });
    expect(within(actionList).getAllByRole("listitem")).toHaveLength(
      actionEntries.length,
    );

    for (const action of actionEntries) {
      expect(screen.getByText(action.title)).toBeInTheDocument();
    }
  });

  it("renders outcome summaries", () => {
    render(<ResponseLedgerPage />);

    const outcomeList = screen.getByRole("list", {
      name: /outcome summaries/i,
    });
    expect(within(outcomeList).getAllByRole("listitem")).toHaveLength(
      outcomeSummaries.length,
    );

    for (const outcome of outcomeSummaries) {
      expect(screen.getByText(outcome.label)).toBeInTheDocument();
    }
  });

  it("renders the ownership rail with all owners", () => {
    render(<ResponseLedgerPage />);

    const ownershipList = screen.getByRole("list", {
      name: /ownership summary/i,
    });
    const records = getOwnershipRecords();

    expect(within(ownershipList).getAllByRole("listitem")).toHaveLength(
      records.length,
    );

    for (const record of records) {
      expect(screen.getByText(record.owner)).toBeInTheDocument();
    }
  });
});
