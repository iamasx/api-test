import { fireEvent, render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { SignalLabWorkspace } from "./signal-lab-workspace";

describe("SignalLabWorkspace", () => {
  it("pins multiple streams and switches the comparison workspace into detail view", () => {
    render(<SignalLabWorkspace />);

    const comparisonWorkspace = screen.getByLabelText(/Comparison workspace/i);

    fireEvent.click(
      screen.getByRole("button", {
        name: /Pin Lattice Echo 03 for comparison/i,
      }),
    );

    expect(
      within(comparisonWorkspace).getByText(
        /Ion Trace 07 \/ Phase Array 12 \/ Lattice Echo 03/i,
      ),
    ).toBeInTheDocument();

    fireEvent.click(
      within(comparisonWorkspace).getByRole("button", {
        name: /Detail view/i,
      }),
    );

    expect(within(comparisonWorkspace).getByText(/^Lens shift$/i)).toBeInTheDocument();
    expect(
      within(comparisonWorkspace).getByText(
        /open anomaly threads are represented/i,
      ),
    ).toBeInTheDocument();
  });

  it("explains anomalies and confidence shifts inside the inspector", () => {
    render(<SignalLabWorkspace />);

    fireEvent.click(
      screen.getByRole("button", { name: /Inspect Phase Array 12/i }),
    );

    const inspector = screen.getByLabelText(/Inspector panel/i);

    expect(
      within(inspector).getByRole("heading", { name: /Phase Array 12/i }),
    ).toBeInTheDocument();
    expect(
      within(inspector).getByText(/Confidence narrative/i),
    ).toBeInTheDocument();
    expect(
      within(inspector).getAllByText(/-12 pts in the 2h lens/i),
    ).toHaveLength(2);
    expect(
      within(inspector).getByText(/Mirror lane divergence/i),
    ).toBeInTheDocument();
    expect(
      within(inspector).getByText(/stays ahead of Phase Array 12/i),
    ).toBeInTheDocument();
  });

  it("keeps anomaly actions local for pinning, dismissal, and restore", () => {
    render(<SignalLabWorkspace />);

    const comparisonWorkspace = screen.getByLabelText(/Comparison workspace/i);

    fireEvent.click(
      screen.getByRole("button", {
        name: /Pin stream Prism Tide 05/i,
      }),
    );

    expect(
      within(comparisonWorkspace).getByText(
        /Ion Trace 07 \/ Phase Array 12 \/ Prism Tide 05/i,
      ),
    ).toBeInTheDocument();

    fireEvent.click(
      screen.getByRole("button", {
        name: /Dismiss Phase drift beyond synthetic envelope/i,
      }),
    );

    expect(
      screen.queryByText(/Phase drift beyond synthetic envelope/i),
    ).not.toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: /Show dismissed/i }));

    expect(
      screen.getByText(/Phase drift beyond synthetic envelope/i),
    ).toBeInTheDocument();

    fireEvent.click(
      screen.getByRole("button", {
        name: /Track Harmonic residue ghosting on refracted lane/i,
      }),
    );

    expect(screen.getByText("Tracked")).toBeInTheDocument();
  });
});
