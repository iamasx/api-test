import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";

import AssetInventoryPage from "./page";

describe("AssetInventoryPage", () => {
  it(
    "renders the inventory route with category navigation, catalog sections, and detail panel",
    () => {
      render(<AssetInventoryPage />);

      expect(
        screen.getByRole("heading", {
          name: /catalog route for field hardware, live stock signals, and selected-item detail/i,
        }),
      ).toBeInTheDocument();
      expect(
        screen.getByRole("button", { name: /all inventory/i }),
      ).toBeInTheDocument();
      expect(screen.getByRole("region", { name: "Sensors" })).toBeInTheDocument();
      expect(screen.getByRole("region", { name: "Safety" })).toBeInTheDocument();
      expect(
        screen.getByLabelText(/selected inventory item details/i),
      ).toBeInTheDocument();
    },
    10000,
  );

  it("shows status and availability information for inventory cards", () => {
    render(<AssetInventoryPage />);

    const primaryCard = screen.getByRole("button", { name: /aether drone beacon/i });
    const lowStockCard = screen.getByRole("button", { name: /pulse rack reader/i });

    expect(primaryCard).toHaveTextContent("Operational");
    expect(primaryCard).toHaveTextContent("24 units ready for dispatch");
    expect(lowStockCard).toHaveTextContent("Low Stock");
    expect(lowStockCard).toHaveTextContent("4 readers left before reorder");
  });

  it("filters the catalog by category and keeps a visible detail panel", async () => {
    const user = userEvent.setup();

    render(<AssetInventoryPage />);

    const categoryNav = screen.getByRole("navigation", {
      name: /inventory categories/i,
    });

    await user.click(
      within(categoryNav).getByRole("button", {
        name: /protective systems and incident-response hardware staged for crews/i,
      }),
    );

    expect(screen.getByRole("region", { name: "Safety" })).toBeInTheDocument();
    expect(
      screen.queryByRole("region", { name: "Sensors" }),
    ).not.toBeInTheDocument();

    const detailPanel = screen.getByLabelText(/selected inventory item details/i);

    expect(
      within(detailPanel).getByRole("heading", {
        name: "Ember Suppression Canister",
      }),
    ).toBeInTheDocument();
    expect(detailPanel).toBeInTheDocument();
  });

  it("updates the detail panel when a different inventory card is selected", async () => {
    const user = userEvent.setup();

    render(<AssetInventoryPage />);

    await user.click(screen.getByRole("button", { name: /flux response kit/i }));

    const detailPanel = screen.getByLabelText(/selected inventory item details/i);

    expect(
      within(detailPanel).getByRole("heading", { name: "Flux Response Kit" }),
    ).toBeInTheDocument();
    expect(within(detailPanel).getByText("Emergency power locker")).toBeInTheDocument();
    expect(
      within(detailPanel).getByText("3 kits remain before replenishment"),
    ).toBeInTheDocument();
  });
});
