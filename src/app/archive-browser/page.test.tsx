import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { ArchiveBrowserShell } from "./_components/archive-browser-shell";
import { resolveArchiveBrowserView } from "./_lib/archive-browser";
import { archiveSnapshots } from "./_lib/archive-data";

describe("ArchiveBrowserShell", () => {
  it("renders every snapshot and defaults to the most recent detail entry", () => {
    const view = resolveArchiveBrowserView();

    render(<ArchiveBrowserShell view={view} />);

    expect(
      screen.getByRole("heading", { name: /snapshot cards and preservation detail/i }),
    ).toBeInTheDocument();
    expect(screen.getAllByRole("article")).toHaveLength(archiveSnapshots.length);

    const detail = screen.getByRole("region", { name: /snapshot detail/i });

    expect(
      within(detail).getByRole("heading", { name: archiveSnapshots[0].title }),
    ).toBeInTheDocument();
    expect(within(detail).getByText(archiveSnapshots[0].summary)).toBeInTheDocument();
  });

  it("shows the requested snapshot when a valid snapshot id is selected", () => {
    const chosenSnapshot = archiveSnapshots[2];
    const view = resolveArchiveBrowserView(chosenSnapshot.id);

    render(<ArchiveBrowserShell view={view} />);

    const detail = screen.getByRole("region", { name: /snapshot detail/i });
    const activeLink = screen.getByRole("link", { name: /viewing detail/i });

    expect(
      within(detail).getByRole("heading", { name: chosenSnapshot.title }),
    ).toBeInTheDocument();
    expect(activeLink).toHaveAttribute(
      "href",
      `/archive-browser?snapshot=${chosenSnapshot.id}`,
    );
    expect(activeLink).toHaveAttribute("aria-current", "page");
  });

  it("falls back to the latest snapshot and shows a status message for an unknown id", () => {
    const view = resolveArchiveBrowserView("missing-snapshot");

    render(<ArchiveBrowserShell view={view} />);

    expect(screen.getByRole("status")).toHaveTextContent(
      /missing-snapshot.*not found/i,
    );

    const detail = screen.getByRole("region", { name: /snapshot detail/i });

    expect(
      within(detail).getByRole("heading", { name: archiveSnapshots[0].title }),
    ).toBeInTheDocument();
  });
});
