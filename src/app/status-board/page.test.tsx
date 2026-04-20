import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import {
  regionalHealthGroups,
  responseChecklist,
  responseSidebarNotes,
  statusBoardSummary,
} from "./_data/status-board-data";
import StatusBoardPage from "./page";

describe("StatusBoardPage", () => {
  it("renders the route shell, hero summary, and checklist sidebar", () => {
    render(<StatusBoardPage />);

    expect(
      screen.getByRole("heading", {
        level: 1,
        name: /track regional service health and response posture in one place/i,
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", {
        level: 2,
        name: /service health grouped by region/i,
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", {
        level: 2,
        name: /checklist before the next regional handoff/i,
      }),
    ).toBeInTheDocument();

    const summaryList = screen.getByRole("list", {
      name: /status board summary/i,
    });

    expect(within(summaryList).getAllByRole("listitem")).toHaveLength(
      statusBoardSummary.stats.length,
    );
    expect(screen.getByTestId("status-board-layout").className).toContain(
      "xl:grid-cols-[minmax(0,1.32fr)_minmax(320px,0.78fr)]",
    );
  });

  it("renders every configured region with its grouped service cards", () => {
    render(<StatusBoardPage />);

    for (const group of regionalHealthGroups) {
      const groupHeading = screen.getByRole("heading", {
        level: 2,
        name: group.name,
      });
      const groupSection = groupHeading.closest("section");

      expect(groupSection).toBeInTheDocument();
      expect(groupSection).toHaveAttribute("data-state", group.status);
      expect(within(groupSection as HTMLElement).getByText(group.summary)).toBeInTheDocument();

      const serviceList = within(groupSection as HTMLElement).getByRole("list", {
        name: `${group.name} services`,
      });

      expect(within(serviceList).getAllByRole("listitem")).toHaveLength(
        group.services.length,
      );

      for (const service of group.services) {
        const card = within(serviceList).getByText(service.name).closest("li");

        expect(card).toBeInTheDocument();
        expect(card).toHaveAttribute("data-state", service.status);
        expect(card).toHaveTextContent(service.uptime);
        expect(card).toHaveTextContent(service.latency);
      }
    }
  });

  it("renders checklist items, completion counts, and handoff notes", () => {
    render(<StatusBoardPage />);

    const checklist = screen.getByRole("list", {
      name: /response checklist/i,
    });
    const sidebarHeading = screen.getByRole("heading", {
      level: 2,
      name: /checklist before the next regional handoff/i,
    });
    const sidebar = sidebarHeading.closest("aside");

    expect(within(checklist).getAllByRole("listitem")).toHaveLength(
      responseChecklist.length,
    );
    expect(sidebar).toBeInTheDocument();
    expect(sidebar).toHaveTextContent("Open actions");
    expect(sidebar).toHaveTextContent(
      String(responseChecklist.filter((item) => !item.completed).length),
    );
    expect(sidebar).toHaveTextContent("Completed");
    expect(sidebar).toHaveTextContent(
      String(responseChecklist.filter((item) => item.completed).length),
    );

    for (const note of responseSidebarNotes) {
      expect(screen.getByText(note.label)).toBeInTheDocument();
      expect(screen.getByText(note.value)).toBeInTheDocument();
    }
  });
});
