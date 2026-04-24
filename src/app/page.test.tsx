import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import Home from "./page";

describe("Home", () => {
  it("features the review hub entry from the landing page", () => {
    render(<Home />);

    expect(
      screen.getByRole("heading", {
        level: 1,
        name: /stage the shared landing-page overlap from the review hub\./i,
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: /open review hub/i }),
    ).toHaveAttribute("href", "/review-hub");
    expect(
      screen.queryByText(/issue 216 \/ navigator hub/i),
    ).not.toBeInTheDocument();
  });
});
