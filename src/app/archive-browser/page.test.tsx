import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { archiveSnapshots } from "./_lib/archive-data";
import ArchiveBrowserPage from "./page";

async function renderArchiveBrowserPage(
  snapshot?: string | string[] | undefined,
) {
  render(
    await ArchiveBrowserPage({
      searchParams: Promise.resolve(
        snapshot === undefined ? {} : { snapshot },
      ),
    }),
  );
}

describe("ArchiveBrowserPage", () => {
  it("renders the route shell, every snapshot card, and default detail metadata", async () => {
    await renderArchiveBrowserPage();

    expect(
      screen.getByRole("heading", {
        level: 1,
        name: /inspect preserved snapshots with visible metadata and a detail-first review panel/i,
      }),
    ).toBeInTheDocument();
    expect(screen.getAllByRole("article")).toHaveLength(archiveSnapshots.length);

    const firstCard = screen.getAllByRole("article")[0];

    expect(within(firstCard).getByText(archiveSnapshots[0].status)).toBeInTheDocument();
    expect(
      within(firstCard).getByText(archiveSnapshots[0].metadataBadges[0].value),
    ).toBeInTheDocument();

    const detailPanel = screen.getByRole("region", {
      name: /archive detail view/i,
    });

    expect(
      within(detailPanel).getByRole("heading", {
        level: 2,
        name: archiveSnapshots[0].title,
      }),
    ).toBeInTheDocument();
    expect(
      within(detailPanel).getByText(archiveSnapshots[0].timelineEntries[0].timestamp),
    ).toBeInTheDocument();
    expect(
      within(detailPanel).getByText(archiveSnapshots[0].recoveryNotes[0]),
    ).toBeInTheDocument();
  });

  it("selects the requested snapshot from the query string and marks its card active", async () => {
    const selectedSnapshot = archiveSnapshots[2];

    await renderArchiveBrowserPage(selectedSnapshot.id);

    const detailPanel = screen.getByRole("region", {
      name: /archive detail view/i,
    });
    const activeLink = screen.getByRole("link", { name: /viewing detail/i });

    expect(
      within(detailPanel).getByRole("heading", {
        level: 2,
        name: selectedSnapshot.title,
      }),
    ).toBeInTheDocument();
    expect(within(detailPanel).getByText(selectedSnapshot.status)).toBeInTheDocument();
    expect(activeLink).toHaveAttribute(
      "href",
      `/archive-browser?snapshot=${selectedSnapshot.id}`,
    );
    expect(activeLink).toHaveAttribute("aria-current", "page");
  });

  it("uses the first query-string value when snapshot is repeated", async () => {
    await renderArchiveBrowserPage([
      archiveSnapshots[1].id,
      archiveSnapshots[0].id,
    ]);

    const detailPanel = screen.getByRole("region", {
      name: /archive detail view/i,
    });

    expect(
      within(detailPanel).getByRole("heading", {
        level: 2,
        name: archiveSnapshots[1].title,
      }),
    ).toBeInTheDocument();
  });

  it("falls back to the latest snapshot and shows a status message for an unknown id", async () => {
    await renderArchiveBrowserPage("missing-snapshot");

    expect(screen.getByRole("status")).toHaveTextContent(
      /missing-snapshot.*latest archive/i,
    );

    const detailPanel = screen.getByRole("region", {
      name: /archive detail view/i,
    });

    expect(
      within(detailPanel).getByRole("heading", {
        level: 2,
        name: archiveSnapshots[0].title,
      }),
    ).toBeInTheDocument();
  });
});
