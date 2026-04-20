import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";

import {
  dependencyHighlights,
  serviceMapClusters,
  serviceMapNodes,
} from "./_data/service-map-data";
import ServiceMapPage from "./page";

describe("ServiceMapPage", () => {
  it("renders the hero, dependency section, cluster sections, and inspector panel", () => {
    render(<ServiceMapPage />);

    expect(
      screen.getByRole("heading", {
        level: 1,
        name: /service clusters, dependency pressure, and one live inspector\./i,
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", {
        level: 2,
        name: /shared risks that cut across the map/i,
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", {
        level: 2,
        name: /topology grouped by operational lane/i,
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByLabelText(/selected service inspector/i),
    ).toBeInTheDocument();
  });

  it("renders every configured cluster heading and dependency highlight card", () => {
    render(<ServiceMapPage />);

    for (const cluster of serviceMapClusters) {
      expect(
        screen.getByRole("heading", {
          level: 2,
          name: cluster.name,
        }),
      ).toBeInTheDocument();
    }

    const highlightList = screen.getByRole("list", {
      name: /dependency highlights/i,
    });

    expect(within(highlightList).getAllByRole("listitem")).toHaveLength(
      dependencyHighlights.length,
    );

    for (const highlight of dependencyHighlights) {
      expect(
        within(highlightList).getAllByRole("heading", {
          level: 3,
          name: highlight.dependencyName,
        }).length,
      ).toBeGreaterThan(0);
    }
  });

  it("shows service metadata within the cluster cards", () => {
    render(<ServiceMapPage />);

    const workflowApiCard = screen.getByRole("button", { name: /workflow api/i });
    const analyticsCard = screen.getByRole("button", { name: /analytics lake/i });

    expect(workflowApiCard).toHaveTextContent("27k rpm");
    expect(workflowApiCard).toHaveTextContent("288 ms");
    expect(workflowApiCard).toHaveTextContent("1.2%");
    expect(analyticsCard).toHaveTextContent("4.9 min");
    expect(analyticsCard).toHaveTextContent("91%");
  });

  it("updates the inspector panel when a different service is selected", async () => {
    const user = userEvent.setup();

    render(<ServiceMapPage />);

    const inspector = screen.getByLabelText(/selected service inspector/i);

    expect(
      within(inspector).getByRole("heading", {
        level: 2,
        name: "Analytics Lake",
      }),
    ).toBeInTheDocument();
    expect(within(inspector).getByText(/backfill workloads are competing/i)).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: /token broker/i }));

    expect(
      within(inspector).getByRole("heading", {
        level: 2,
        name: "Token Broker",
      }),
    ).toBeInTheDocument();
    expect(within(inspector).getByText("Node.js 22")).toBeInTheDocument();
    expect(
      within(inspector).getByText(/latency increased after the last partner rollout/i),
    ).toBeInTheDocument();
  });

  it("maps the expected number of services into the route", () => {
    render(<ServiceMapPage />);

    expect(screen.getAllByRole("button")).toHaveLength(serviceMapNodes.length);
  });
});
