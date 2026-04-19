/* eslint-disable @next/next/no-img-element */
import "@testing-library/jest-dom/vitest";
import { cleanup } from "@testing-library/react";
import type { ImgHTMLAttributes } from "react";
import { afterEach, vi } from "vitest";

afterEach(() => {
  cleanup();
});

vi.mock("next/font/google", () => ({
  Geist: () => ({
    variable: "font-geist-sans",
  }),
  Geist_Mono: () => ({
    variable: "font-geist-mono",
  }),
}));

vi.mock("next/image", () => ({
  default: ({
    alt,
    priority,
    src,
    ...props
  }: ImgHTMLAttributes<HTMLImageElement> & {
    priority?: boolean;
    src: string;
  }) => (
    <img
      alt={alt}
      data-priority={priority ? "true" : undefined}
      src={src}
      {...props}
    />
  ),
}));
