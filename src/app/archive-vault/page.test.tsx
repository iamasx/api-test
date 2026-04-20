import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import {
  archiveVaultSnapshotGroups,
  archiveVaultSnapshots,
} from "./_data/archive-vault-data";
import ArchiveVaultPage from "./page";

async function renderArchiveVaultPage(
  snapshot?: string | string[] | undefined,
) {
  return render(
    await ArchiveVaultPage({
      searchParams: Promise.resolve({ snapshot }),
    }),
  );
}

describe("ArchiveVaultPage", () => {
  it("renders the route hero and every configured snapshot group", async () => {
    await renderArchiveVaultPage();

    expect(
      screen.getByRole("heading", {
        level: 1,
        name: /browse sealed snapshots with visible labels, metadata badges, and a comparison-ready detail panel/i,
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", {
        level: 2,
        name: /archive coverage at a glance/i,
      }),
    ).toBeInTheDocument();

    for (const group of archiveVaultSnapshotGroups) {
      expect(
        screen.getByRole("heading", {
          level: 2,
          name: group.title,
        }),
      ).toBeInTheDocument();
    }
  });

  it("renders multiple snapshot entries with labels, tags, and metadata badges", async () => {
    await renderArchiveVaultPage();

    const auditHoldList = screen.getByRole("list", {
      name: /preserved compliance archives snapshots/i,
    });
    expect(within(auditHoldList).getAllByRole("listitem", { name: /.+/ })).toHaveLength(
      archiveVaultSnapshotGroups[0].snapshots.length,
    );

    expect(screen.getAllByText("Snapshot 09").length).toBeGreaterThan(0);
    expect(screen.getAllByText("sealed-ledger").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Retention").length).toBeGreaterThan(0);
    expect(screen.getAllByText("12-year legal hold").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Merkle seal verified").length).toBeGreaterThan(0);
  });

  it("renders the selected snapshot detail panel from the query string", async () => {
    await renderArchiveVaultPage("reef-survey-image-stack");

    const detailPanel = screen.getByLabelText(/archive vault detail panel/i);

    expect(
      within(detailPanel).getByRole("heading", {
        level: 2,
        name: "Reef survey image stack",
      }),
    ).toBeInTheDocument();
    expect(detailPanel).toHaveTextContent("Habitat condition analyst");
    expect(detailPanel).toHaveTextContent(
      "Use as the visual anchor for reef condition comparisons",
    );
    expect(
      screen.getByRole("link", {
        name: /viewing snapshot/i,
      }),
    ).toHaveAttribute("href", "/archive-vault?snapshot=reef-survey-image-stack");
  });

  it("falls back to the default snapshot when the requested id is missing", async () => {
    await renderArchiveVaultPage("missing-entry");

    const detailPanel = screen.getByLabelText(/archive vault detail panel/i);
    expect(screen.getByRole("status")).toHaveTextContent("missing-entry");
    expect(detailPanel).toHaveTextContent(archiveVaultSnapshots[0].title);
    expect(detailPanel).toHaveTextContent(
      "Use as the baseline for customs dispute playback",
    );
  });
});
