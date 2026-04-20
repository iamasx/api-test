import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import Home from "./page";

describe("Home", () => {
  it("renders the landing page sections for archive browser, research notebook, and field guide", () => {
    render(<Home />);

    expect(
      screen.getByRole("heading", {
        name: /controlled conflict drill b landing page headline/i,
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", {
        name: /open the notebook shell for experiments, observations, and status summaries/i,
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", {
        name: /open the field guide route for searchable procedures, grouped checklists, and reference detail/i,
      }),
    ).toBeInTheDocument();
  });

  it("links the field guide launch card to the route and issue tracker", () => {
    render(<Home />);

    const fieldGuideHeading = screen.getByRole("heading", {
      name: /open the field guide route for searchable procedures, grouped checklists, and reference detail/i,
    });
    const fieldGuideSection = fieldGuideHeading.closest("section");

    expect(fieldGuideSection).not.toBeNull();

    const scopedSection = within(fieldGuideSection as HTMLElement);

    expect(
      scopedSection.getByRole("link", { name: /open field guide/i }),
    ).toHaveAttribute("href", "/field-guide");
    expect(
      scopedSection.getByRole("link", { name: /review issue scope/i }),
    ).toHaveAttribute("href", "https://github.com/iamasx/api-test/issues/142");
    expect(
      scopedSection.getByText(
        /grouped procedure cards with searchable categories, priorities, and focus areas/i,
      ),
    ).toBeInTheDocument();
    expect(
      scopedSection.getByText(
        /checklist previews on the catalog side before opening the detail panel/i,
      ),
    ).toBeInTheDocument();
  });
});
