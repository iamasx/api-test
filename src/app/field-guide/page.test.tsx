import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";

import FieldGuidePage from "./page";

describe("FieldGuidePage", () => {
  it("renders the route hero, grouped controls, and default detail panel", () => {
    render(<FieldGuidePage />);

    expect(
      screen.getByText(
        /search procedures, run the checklist, and keep reference detail close to the active response/i,
      ),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("searchbox", { name: /search procedures/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("navigation", { name: /field guide categories/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("navigation", { name: /procedure priorities/i }),
    ).toBeInTheDocument();
    expect(screen.getByLabelText(/field guide focus areas/i)).toBeInTheDocument();
    expect(
      screen.getByLabelText(/field guide workspace summary/i),
    ).toBeInTheDocument();

    const detailPanel = screen.getByLabelText(/selected procedure details/i);

    expect(
      within(detailPanel).getByText("Grid Sag Bridge Activation"),
    ).toBeInTheDocument();
    expect(screen.getByText(/selected focus/i)).toBeInTheDocument();
    expect(within(detailPanel).getByText(/priority note/i)).toBeInTheDocument();
    expect(within(detailPanel).getByText(/crew checklist/i)).toBeInTheDocument();
    expect(within(detailPanel).getByText(/reference notes/i)).toBeInTheDocument();
  });

  it("renders grouped procedure cards with checklist previews and metadata", () => {
    render(<FieldGuidePage />);

    expect(
      screen.getByRole("heading", { name: /power recovery/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: /site restart/i }),
    ).toBeInTheDocument();

    expect(
      screen.getByRole("button", { name: /grid sag bridge activation/i }),
    ).toHaveTextContent("FG-201");
    expect(
      screen.getByRole("button", { name: /smoke lane lockout sweep/i }),
    ).toHaveTextContent("Elevated");
    expect(
      screen.getByRole("button", { name: /cold lane restart sequence/i }),
    ).toHaveTextContent("4 steps");
    expect(
      screen.getByRole("button", { name: /mast failover brief/i }),
    ).toHaveTextContent("3 checklist items");

    const gridSagCard = screen.getByRole("button", {
      name: /grid sag bridge activation/i,
    });

    expect(gridSagCard).toHaveTextContent("Checklist Preview");
    expect(gridSagCard).toHaveTextContent(
      /arc-safe gloves and face shield are on before the cabinet is opened/i,
    );
    expect(gridSagCard).toHaveTextContent("+2 more checks in the detail panel");
    expect(
      screen.getByRole("button", { name: /buffer coil warm start/i }),
    ).toBeInTheDocument();
  });

  it("filters procedures by category, priority, and focus area", async () => {
    const user = userEvent.setup();

    render(<FieldGuidePage />);
    const categoryNavigation = screen.getByRole("navigation", {
      name: /field guide categories/i,
    });

    await user.click(
      within(categoryNavigation).getByRole("button", {
        name: /signal integrity/i,
      }),
    );
    await user.click(
      screen.getByRole("button", { name: /elevated/i }),
    );
    await user.click(
      screen.getByRole("button", { name: /signal recovery/i }),
    );

    expect(
      screen.getByRole("button", { name: /mast failover brief/i }),
    ).toBeInTheDocument();
    expect(
      screen.queryByRole("button", { name: /relay drift verification/i }),
    ).not.toBeInTheDocument();
    expect(
      screen.queryByRole("button", { name: /grid sag bridge activation/i }),
    ).not.toBeInTheDocument();

    const workspaceSummary = screen.getByLabelText(/field guide workspace summary/i);

    expect(within(workspaceSummary).getByText("Signal Integrity")).toBeInTheDocument();
    expect(
      within(workspaceSummary).getByText("Priority: Elevated"),
    ).toBeInTheDocument();
    expect(
      within(workspaceSummary).getByText("Focus: Signal recovery"),
    ).toBeInTheDocument();

    const detailPanel = screen.getByLabelText(/selected procedure details/i);

    expect(
      within(detailPanel).getByText("Mast Failover Brief"),
    ).toBeInTheDocument();
  });

  it("updates the detail panel with focus summaries, checklist totals, and references", async () => {
    const user = userEvent.setup();

    render(<FieldGuidePage />);

    await user.click(
      screen.getByRole("button", { name: /air scrubber handoff brief/i }),
    );

    const detailPanel = screen.getByLabelText(/selected procedure details/i);

    expect(
      within(detailPanel).getByText("Air Scrubber Handoff Brief"),
    ).toBeInTheDocument();
    expect(within(detailPanel).getByText("2026-04-18")).toBeInTheDocument();
    expect(within(detailPanel).getByText("Perimeter control")).toBeInTheDocument();
    expect(
      within(detailPanel).getByText("Ventilation tech once the cable path and airflow are confirmed"),
    ).toBeInTheDocument();
  });

  it("supports search-driven narrowing and empty-state feedback", async () => {
    const user = userEvent.setup();

    render(<FieldGuidePage />);

    const searchInput = screen.getByRole("searchbox", {
      name: /search procedures/i,
    });

    await user.type(searchInput, "FG-233");

    expect(
      screen.getByRole("button", { name: /mast failover brief/i }),
    ).toBeInTheDocument();
    expect(
      screen.queryByRole("button", { name: /smoke lane lockout sweep/i }),
    ).not.toBeInTheDocument();

    let detailPanel = screen.getByLabelText(/selected procedure details/i);

    expect(
      within(detailPanel).getByText("Mast Failover Brief"),
    ).toBeInTheDocument();
    expect(screen.getByText("Query: FG-233")).toBeInTheDocument();

    await user.clear(searchInput);
    await user.type(searchInput, "zzz");

    expect(screen.getByText(/no matching procedures/i)).toBeInTheDocument();
    expect(
      screen.getByText(/no procedure selected/i),
    ).toBeInTheDocument();

    await user.click(
      screen.getByRole("button", { name: /show all procedures/i }),
    );

    expect(
      screen.getByRole("button", { name: /grid sag bridge activation/i }),
    ).toBeInTheDocument();
    detailPanel = screen.getByLabelText(/selected procedure details/i);
    expect(
      within(detailPanel).getByText("Grid Sag Bridge Activation"),
    ).toBeInTheDocument();
  });
});
