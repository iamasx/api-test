import { cleanup, render, screen, within } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";

import InventoryBayPage from "./page";
import {
  inventoryBayBands,
  inventoryBayCategories,
  inventoryBayLowStockAlerts,
} from "./_data/inventory-bay-data";

afterEach(() => {
  cleanup();
});

describe("InventoryBayPage", () => {
  it("renders the route shell, overview metrics, and stock bands", () => {
    render(<InventoryBayPage />);

    expect(
      screen.getByRole("heading", {
        level: 1,
        name: /see stock bands, category pressure, and low-stock warnings in one bay scan\./i,
      }),
    ).toBeInTheDocument();

    const overviewList = screen.getByRole("list", {
      name: /inventory bay overview/i,
    });
    expect(within(overviewList).getAllByRole("listitem")).toHaveLength(4);

    const bandList = screen.getByRole("list", { name: /stock bands/i });
    expect(within(bandList).getAllByRole("listitem")).toHaveLength(
      inventoryBayBands.length,
    );

    const healthyCard = within(bandList)
      .getByRole("heading", { name: /healthy/i })
      .closest("li");
    const criticalCard = within(bandList)
      .getByRole("heading", { name: /critical/i })
      .closest("li");

    expect(healthyCard).toHaveTextContent("114");
    expect(healthyCard).toHaveTextContent("18d");
    expect(healthyCard).toHaveTextContent("38% of inventory tracked on this route");
    expect(criticalCard).toHaveTextContent("5");
    expect(criticalCard).toHaveTextContent("3d");
    expect(criticalCard).toHaveTextContent("25% of inventory tracked on this route");
  });

  it("renders every configured bay category as a summary tile", () => {
    render(<InventoryBayPage />);

    const categoryList = screen.getByRole("list", {
      name: /category summaries/i,
    });

    expect(within(categoryList).getAllByRole("listitem")).toHaveLength(
      inventoryBayCategories.length,
    );

    const fastPicksTile = within(categoryList)
      .getByRole("heading", { name: /fast picks/i })
      .closest("article");

    expect(fastPicksTile).toBeTruthy();
    expect(fastPicksTile).toHaveTextContent("Bay East / Pick wall");
    expect(fastPicksTile).toHaveTextContent("80%");
    expect(fastPicksTile).toHaveTextContent("28");
    expect(fastPicksTile).toHaveTextContent("Pick-to-Light Pods");
    expect(fastPicksTile).toHaveTextContent("13:30 wave launch");
    expect(fastPicksTile).toHaveTextContent("Automation Reliability");
  });

  it("shows the low-stock panel with visible warnings and owner detail", () => {
    render(<InventoryBayPage />);

    const lowStockPanel = screen.getByLabelText(/low-stock panel/i);
    expect(lowStockPanel).toBeInTheDocument();

    const warningList = within(lowStockPanel).getByRole("list", {
      name: /low-stock warnings/i,
    });
    expect(within(warningList).getAllByRole("listitem")).toHaveLength(
      inventoryBayLowStockAlerts.length,
    );

    expect(
      within(lowStockPanel).getByRole("heading", { name: /pick-to-light pods/i }),
    ).toBeInTheDocument();

    const criticalAlert = within(lowStockPanel)
      .getByRole("heading", { name: /pick-to-light pods/i })
      .closest("article");
    const watchAlert = within(lowStockPanel)
      .getByRole("heading", { name: /cryo gel packs/i })
      .closest("article");

    expect(criticalAlert).toHaveTextContent("Automation Reliability");
    expect(criticalAlert).toHaveTextContent(
      "Manual QA release the blocked lot and move two healthy pods from the training lane.",
    );
    expect(criticalAlert).toHaveTextContent("Before 13:30 wave launch");
    expect(watchAlert).toHaveTextContent("During 14:30 freezer sweep");
  });

  it("keeps the split desktop layout and mobile-friendly category grid hooks", () => {
    render(<InventoryBayPage />);

    const layout = screen.getByTestId("inventory-bay-layout");
    const categoryList = screen.getByRole("list", {
      name: /category summaries/i,
    });
    const lowStockPanel = screen.getByLabelText(/low-stock panel/i);

    expect(layout.className).toContain("xl:grid-cols-[minmax(0,1.4fr)_320px]");
    expect(categoryList.className).toContain("sm:grid-cols-2");
    expect(lowStockPanel.className).toContain("xl:sticky");
  });
});
