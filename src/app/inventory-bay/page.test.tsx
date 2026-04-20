import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import InventoryBayPage from "./page";
import {
  inventoryBayBands,
  inventoryBayCategories,
  inventoryBayRecommendations,
} from "./_data/inventory-bay-data";

describe("InventoryBayPage", () => {
  it(
    "renders the route hero, stock bands, and recommendation panel",
    () => {
      render(<InventoryBayPage />);

      expect(
        screen.getByRole("heading", {
          level: 1,
          name: /scan stock bands, bay sections, and next restock moves from one route/i,
        }),
      ).toBeInTheDocument();

      const bandList = screen.getByRole("list", { name: /stock bands/i });
      expect(within(bandList).getAllByRole("listitem")).toHaveLength(
        inventoryBayBands.length,
      );

      const recommendationPanel = screen.getByLabelText(
        /restock recommendations/i,
      );
      expect(recommendationPanel).toBeInTheDocument();
      expect(
        within(recommendationPanel).getAllByRole("heading", {
          name: /escalate pick-to-light pods firmware batch/i,
        }).length,
      ).toBeGreaterThan(0);
    },
    15000,
  );

  it(
    "renders every configured bay category section",
    () => {
      render(<InventoryBayPage />);

      for (const category of inventoryBayCategories) {
        expect(
          screen.getByRole("region", {
            name: category.name,
          }),
        ).toBeInTheDocument();
      }
    },
    15000,
  );

  it(
    "shows meaningful stock details on inventory cards",
    () => {
      render(<InventoryBayPage />);

      const coldStorageSection = screen.getByRole("region", {
        name: "Cold Storage",
      });
      const cryoCard = within(coldStorageSection).getByRole("article", {
        name: "Cryo Gel Packs",
      });

      expect(cryoCard).toHaveTextContent("Watch");
      expect(cryoCard).toHaveTextContent("22 units on hand");
      expect(cryoCard).toHaveTextContent("10 available to promise");
      expect(cryoCard).toHaveTextContent("7 days of cover");
      expect(cryoCard).toHaveTextContent("Reorder at 18");
      expect(cryoCard).toHaveTextContent("Transfer from Bay 2 at 14:30");
      expect(cryoCard).toHaveTextContent("Cold Chain Lead");
    },
    15000,
  );

  it(
    "renders the full recommendation queue with owners and due windows",
    () => {
      render(<InventoryBayPage />);

      const recommendationPanel = screen.getByLabelText(
        /restock recommendations/i,
      );
      const recommendationQueue = within(recommendationPanel).getByRole("list", {
        name: /recommendation queue/i,
      });

      expect(within(recommendationQueue).getAllByRole("listitem")).toHaveLength(
        inventoryBayRecommendations.length,
      );
      expect(
        within(recommendationPanel).getAllByText(/before 13:30 wave launch/i)
          .length,
      ).toBeGreaterThan(0);
      expect(
        within(recommendationPanel).getAllByText(/during 14:30 freezer sweep/i)
          .length,
      ).toBeGreaterThan(0);
      expect(
        within(recommendationPanel).getByText(/quality desk/i),
      ).toBeInTheDocument();
    },
    15000,
  );
});
