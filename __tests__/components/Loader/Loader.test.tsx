import React from "react";
import { render, screen } from "@testing-library/react";
import { ThemeProvider } from "@mui/material/styles";
import { createAppTheme } from "@/theme";

const FRAMER_PROPS = new Set([
  "initial",
  "animate",
  "exit",
  "variants",
  "transition",
  "whileHover",
  "whileInView",
  "whileTap",
  "viewport",
]);

const filterProps = (props: Record<string, unknown>) =>
  Object.fromEntries(Object.entries(props).filter(([key]) => !FRAMER_PROPS.has(key)));

jest.mock("framer-motion", () => ({
  motion: {
    div: React.forwardRef<HTMLDivElement, Record<string, unknown>>((props, ref) => (
      <div ref={ref} {...filterProps(props)} />
    )),
  },
  AnimatePresence: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}));

import Loader from "@/components/Loader/Loader";

const renderLoader = (props?: { text?: string }) =>
  render(
    <ThemeProvider theme={createAppTheme("light")}>
      <Loader {...props} />
    </ThemeProvider>,
  );

describe("Loader", () => {
  it("renders with default loading text", () => {
    renderLoader();
    expect(screen.getByText("Loading")).toBeInTheDocument();
  });

  it("renders with custom loading text", () => {
    renderLoader({ text: "Please wait" });
    expect(screen.getByText("Please wait")).toBeInTheDocument();
  });

  it("has correct accessibility attributes", () => {
    renderLoader();
    const loader = screen.getByRole("status");
    expect(loader).toHaveAttribute("aria-label", "Loading content");
    expect(loader).toHaveAttribute("aria-live", "polite");
  });

  it("renders the loader container", () => {
    const { container } = renderLoader();
    expect(container.firstChild).toBeInTheDocument();
    expect(container.querySelector("div")).toBeInTheDocument();
  });

  it("renders animation elements", () => {
    const { container } = renderLoader();
    const divElements = container.querySelectorAll("div");
    expect(divElements.length).toBeGreaterThan(1);
  });

  it("renders in dark mode", () => {
    const { container } = render(
      <ThemeProvider theme={createAppTheme("dark")}>
        <Loader />
      </ThemeProvider>,
    );
    expect(container.firstChild).toBeInTheDocument();
  });
});
