import { createElement, forwardRef } from "react";
import { cleanup } from "@testing-library/react";
import * as matchers from "@testing-library/jest-dom/matchers";
import { afterEach, expect, vi } from "vitest";

vi.mock("next/link", () => {
  const MockLink = forwardRef<HTMLAnchorElement, any>(function MockLink(
    { href, children, ...props },
    ref,
  ) {
    const resolvedHref =
      typeof href === "string"
        ? href
        : typeof href === "object" &&
            href !== null &&
            "pathname" in href &&
            typeof href.pathname === "string"
          ? href.pathname
          : "#";

    return createElement("a", { ...props, href: resolvedHref, ref }, children);
  });

  return { default: MockLink };
});

expect.extend(matchers);

afterEach(() => {
  cleanup();
});
