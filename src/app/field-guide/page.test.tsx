import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";

import FieldGuidePage from "./page";

describe("FieldGuidePage", () => {
  it("renders the route hero, search controls, and default detail panel", () => {
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

    const detailPanel = screen.getByLabelText(/selected procedure details/i);

    expect(
      within(detailPanel).getByText("Grid Sag Bridge Activation"),
    ).toBeInTheDocument();
    expect(within(detailPanel).getByText(/priority note/i)).toBeInTheDocument();
    expect(within(detailPanel).getByText(/crew checklist/i)).toBeInTheDocument();
    expect(within(detailPanel).getByText(/reference notes/i)).toBeInTheDocument();
  });

  it("renders multiple procedure cards with meaningful metadata", () => {
    render(<FieldGuidePage />);

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
  });

  it("filters procedures by category and updates the visible detail selection", async () => {
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

    expect(
      screen.getByRole("button", { name: /relay drift verification/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /mast failover brief/i }),
    ).toBeInTheDocument();
    expect(
      screen.queryByRole("button", { name: /grid sag bridge activation/i }),
    ).not.toBeInTheDocument();

    const detailPanel = screen.getByLabelText(/selected procedure details/i);

    expect(
      within(detailPanel).getByText("Relay Drift Verification"),
    ).toBeInTheDocument();
  });

  it("renders the checklist preview section with grouped check types", () => {
    render(<FieldGuidePage />);

    const previewSection = screen.getByLabelText(/checklist preview/i);

    expect(
      within(previewSection).getByText(/action checks across all procedures/i),
    ).toBeInTheDocument();

    expect(
      within(previewSection).getByText(/required/i),
    ).toBeInTheDocument();
    expect(
      within(previewSection).getByText(/verify on site/i),
    ).toBeInTheDocument();
    expect(
      within(previewSection).getByText(/recommended/i),
    ).toBeInTheDocument();

    expect(
      within(previewSection).getByText(/total checks/i),
    ).toBeInTheDocument();
  });

  it("renders the new mock procedures in the catalog", () => {
    render(<FieldGuidePage />);

    expect(
      screen.getByRole("button", { name: /dock seal integrity audit/i }),
    ).toHaveTextContent("FG-610");
    expect(
      screen.getByRole("button", { name: /conveyor jam clearance/i }),
    ).toHaveTextContent("FG-715");
  });

  it("updates checklist preview when filtering by category", async () => {
    const user = userEvent.setup();

    render(<FieldGuidePage />);
    const categoryNavigation = screen.getByRole("navigation", {
      name: /field guide categories/i,
    });

    await user.click(
      within(categoryNavigation).getByRole("button", {
        name: /power recovery/i,
      }),
    );

    const previewSection = screen.getByLabelText(/checklist preview/i);

    expect(
      within(previewSection).queryByText(/dock seal integrity audit/i),
    ).not.toBeInTheDocument();

    expect(
      within(previewSection).getByText(/FG-201/),
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
