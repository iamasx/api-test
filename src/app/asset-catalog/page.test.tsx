import { fireEvent, render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";

import AssetCatalogPage from "./page";

describe("AssetCatalogPage", () => {
  it("renders the route with searchable sections, category tabs, and a visible detail panel", () => {
    render(<AssetCatalogPage />);

    const categoryTabs = screen.getByLabelText(/asset catalog categories/i);

    expect(
      screen.getByRole("heading", {
        name: /searchable asset sections with category tabs and a focused availability detail panel/i,
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("searchbox", { name: /search assets/i }),
    ).toBeInTheDocument();
    expect(within(categoryTabs).getByText("All Assets")).toBeInTheDocument();
    expect(screen.getByText("Aerial Survey", { selector: "h2" })).toBeInTheDocument();
    expect(
      screen.getByText("Shelter Systems", { selector: "h2" }),
    ).toBeInTheDocument();
    expect(
      screen.getByLabelText(/selected asset availability details/i),
    ).toBeInTheDocument();
  });

  it("shows meaningful status and availability details on asset cards", () => {
    render(<AssetCatalogPage />);

    const meridianCard = screen.getByRole("button", {
      name: /meridian survey drone/i,
    });
    const atlasCard = screen.getByRole("button", {
      name: /atlas cell cart/i,
    });

    expect(meridianCard).toHaveTextContent("Available");
    expect(meridianCard).toHaveTextContent(
      "6 drones ready across the north apron and can launch in under 12 minutes.",
    );
    expect(meridianCard).toHaveTextContent("6 ready units");
    expect(meridianCard).toHaveTextContent("Overflight Team Delta");

    expect(atlasCard).toHaveTextContent("Unavailable");
    expect(atlasCard).toHaveTextContent("0 carts ready");
    expect(atlasCard).toHaveTextContent("Grid Recovery Unit");
  });

  it(
    "filters the catalog by category and search while keeping the detail panel visible",
    async () => {
    const user = userEvent.setup();

    render(<AssetCatalogPage />);

      const categoryTabs = screen.getByLabelText(/asset catalog categories/i);
      const powerTab = within(categoryTabs)
        .getByText("Power Reserve")
        .closest("button");

      expect(powerTab).not.toBeNull();
      await user.click(powerTab!);

      expect(
        screen.getByText("Power Reserve", { selector: "h2" }),
      ).toBeInTheDocument();
      expect(
        screen.queryByText("Aerial Survey", { selector: "h2" }),
      ).not.toBeInTheDocument();

      const detailPanel = screen.getByLabelText(
        /selected asset availability details/i,
      );

      expect(
        within(detailPanel).getByText("Atlas Cell Cart", { selector: "h2" }),
      ).toBeInTheDocument();

      fireEvent.change(screen.getByRole("searchbox", { name: /search assets/i }), {
        target: { value: "microgrid" },
      });

      expect(
        await screen.findByText("Pulse Microgrid Crate", { selector: "h3" }),
      ).toBeInTheDocument();
      expect(
        screen.queryByText("Atlas Cell Cart", { selector: "h3" }),
      ).not.toBeInTheDocument();
      expect(detailPanel).toBeInTheDocument();
      expect(
        await within(detailPanel).findByText("Pulse Microgrid Crate", {
          selector: "h2",
        }),
      ).toBeInTheDocument();
    },
    10000,
  );

  it("updates the detail panel when a different asset card is selected", async () => {
    const user = userEvent.setup();

    render(<AssetCatalogPage />);

    await user.click(
      screen.getByRole("button", { name: /breakwater lift sled/i }),
    );

    const detailPanel = screen.getByLabelText(/selected asset availability details/i);

    expect(
      within(detailPanel).getByRole("heading", { name: "Breakwater Lift Sled" }),
    ).toBeInTheDocument();
    expect(within(detailPanel).getByText("East marina gate")).toBeInTheDocument();
    expect(
      within(detailPanel).getByText("Shoreline Handling Team"),
    ).toBeInTheDocument();
  });
});
