import { fireEvent, render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { SignalLabWorkspace } from "./signal-lab-workspace";

describe("SignalLabWorkspace", () => {
  it("updates the inspector when a new stream is selected", () => {
    render(<SignalLabWorkspace />);

    fireEvent.click(screen.getByRole("button", { name: /Phase Array 12/i }));

    const inspector = screen.getByLabelText(/Inspector panel/i);
    expect(within(inspector).getByText(/Phase Array 12/i)).toBeInTheDocument();
    expect(within(inspector).getByText(/North Basin/i)).toBeInTheDocument();
  });

  it("handles anomaly dismissal and restore locally", () => {
    render(<SignalLabWorkspace />);
    fireEvent.click(
      screen.getByRole("button", { name: /Dismiss Phase drift beyond synthetic envelope/i }),
    );
    expect(screen.queryByText(/Phase drift beyond synthetic envelope/i)).not.toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: /Show dismissed/i }));
    expect(screen.getByText(/Phase drift beyond synthetic envelope/i)).toBeInTheDocument();
    fireEvent.click(
      screen.getByRole("button", { name: /Track Phase drift beyond synthetic envelope/i }),
    );
    expect(screen.getByText("Tracked")).toBeInTheDocument();
  });
});
