import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import ReviewHubPage from "./page";

describe("ReviewHubPage", () => {
  it("renders the route hero and primary actions", () => {
    render(<ReviewHubPage />);

    expect(
      screen.getByRole("heading", {
        name: /stage the shared landing-page overlap before the next merge lands\./i,
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: /back to overview/i }),
    ).toHaveAttribute("href", "/");
    expect(
      screen.getByRole("link", { name: /open navigator hub/i }),
    ).toHaveAttribute("href", "/navigator-hub");
    expect(screen.getByText("09:10-09:46")).toBeInTheDocument();
  });

  it("lists the shared file overlap targets and review lanes", () => {
    render(<ReviewHubPage />);

    const fileList = screen.getByRole("list", {
      name: /shared file overlap targets/i,
    });

    expect(within(fileList).getAllByRole("listitem")).toHaveLength(4);
    expect(within(fileList).getByText("src/app/page.tsx")).toBeInTheDocument();
    expect(
      within(fileList).getByText("src/app/review-hub/page.tsx"),
    ).toBeInTheDocument();

    const laneList = screen.getByRole("list", {
      name: /review handoff lanes/i,
    });

    expect(within(laneList).getAllByRole("listitem")).toHaveLength(4);
    expect(
      within(laneList).getByRole("heading", { name: /landing hero rewrite/i }),
    ).toBeInTheDocument();
    expect(
      within(laneList).getByRole("heading", { name: /review route audit/i }),
    ).toBeInTheDocument();
  });

  it("renders the release checks and cadence guidance", () => {
    render(<ReviewHubPage />);

    const releaseChecks = screen.getByRole("list", {
      name: /review release checks/i,
    });

    expect(within(releaseChecks).getAllByRole("listitem")).toHaveLength(4);
    expect(
      within(releaseChecks).getByText(
        /confirm the homepage now points at review hub/i,
      ),
    ).toBeInTheDocument();

    expect(
      screen.getByRole("heading", {
        name: /keep the overlap audit moving on a timed cadence\./i,
      }),
    ).toBeInTheDocument();
    expect(screen.getByText("09:24")).toBeInTheDocument();
    expect(screen.getByText(/shell pass/i)).toBeInTheDocument();
  });
});
