import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import TeamDirectoryPage from "./page";
import { teamGroups } from "@/data/team-directory";

describe("TeamDirectoryPage", () => {
  it("renders the route hero and spotlight content", () => {
    render(<TeamDirectoryPage />);

    expect(
      screen.getByRole("heading", {
        level: 1,
        name: /find the right crew for launches, fixes, and field follow-through/i,
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", {
        level: 2,
        name: /spotlight: mara chen/i,
      }),
    ).toBeInTheDocument();
    expect(screen.getByText(/shared strengths/i)).toBeInTheDocument();
    expect(screen.getByText(/hands-on leads/i)).toBeInTheDocument();
  });

  it("renders every configured group heading", () => {
    render(<TeamDirectoryPage />);

    for (const group of teamGroups) {
      expect(
        screen.getByRole("heading", {
          level: 2,
          name: group.name,
        }),
      ).toBeInTheDocument();
    }
  });

  it("renders profile metadata, status, and skills", () => {
    render(<TeamDirectoryPage />);

    expect(
      screen.getByRole("heading", {
        level: 3,
        name: "Mara Chen",
      }),
    ).toBeInTheDocument();
    expect(screen.getByText("Singapore")).toBeInTheDocument();
    expect(screen.getByText("UTC+8")).toBeInTheDocument();
    expect(screen.getAllByText("Available now").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Next.js architecture").length).toBeGreaterThan(0);
    expect(
      screen.getAllByText(
        /open for two architecture reviews and one launch-readiness check this week/i,
      ).length,
    ).toBeGreaterThan(0);
  });
});
