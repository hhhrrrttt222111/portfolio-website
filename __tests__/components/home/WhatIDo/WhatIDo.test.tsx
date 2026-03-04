import React from "react";
import { render, screen } from "@testing-library/react";
import { ThemeProvider } from "@mui/material/styles";
import { createAppTheme } from "@/theme";
import WhatIDo from "@/components/home/WhatIDo/WhatIDo";

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
  "onMouseMove",
  "onMouseLeave",
]);

jest.mock("framer-motion", () => ({
  motion: {
    div: React.forwardRef<HTMLDivElement, Record<string, unknown>>((props, ref) => {
      const filtered = Object.fromEntries(
        Object.entries(props).filter(([key]) => !FRAMER_PROPS.has(key)),
      );
      return <div ref={ref} {...filtered} />;
    }),
  },
  useReducedMotion: () => false,
}));

const renderWithTheme = (mode: "light" | "dark" = "light") =>
  render(
    <ThemeProvider theme={createAppTheme(mode)}>
      <WhatIDo />
    </ThemeProvider>,
  );

describe("WhatIDo", () => {
  it("renders without crashing", () => {
    const { container } = renderWithTheme();
    expect(container.firstChild).toBeTruthy();
  });

  it("renders a section element", () => {
    const { container } = renderWithTheme();
    expect(container.querySelector("section")).toBeInTheDocument();
  });

  it("renders the section title", () => {
    renderWithTheme();
    expect(screen.getByText("What I Do")).toBeInTheDocument();
  });

  it("renders the section subtitle", () => {
    renderWithTheme();
    expect(
      screen.getByText(/I specialize in building exceptional digital experiences/),
    ).toBeInTheDocument();
  });

  it("renders all four service cards", () => {
    renderWithTheme();
    expect(screen.getByText("Frontend Architecture")).toBeInTheDocument();
    expect(screen.getByText("UI Engineering")).toBeInTheDocument();
    expect(screen.getByText("Performance Optimization")).toBeInTheDocument();
    expect(screen.getByText("Backend APIs")).toBeInTheDocument();
  });

  it("renders card descriptions", () => {
    renderWithTheme();
    expect(
      screen.getByText(/Designing scalable, maintainable frontend systems/),
    ).toBeInTheDocument();
    expect(screen.getByText(/Crafting pixel-perfect interfaces/)).toBeInTheDocument();
    expect(screen.getByText(/Squeezing every millisecond/)).toBeInTheDocument();
    expect(screen.getByText(/Building robust RESTful and GraphQL APIs/)).toBeInTheDocument();
  });

  it("renders icons for each card", () => {
    const { container } = renderWithTheme();
    const icons = container.querySelectorAll("svg");
    expect(icons.length).toBe(4);
  });

  it("renders accent bars", () => {
    const { container } = renderWithTheme();
    const accentBars = container.querySelectorAll(".accent-bar");
    expect(accentBars.length).toBe(4);
  });

  it("renders correctly in dark mode", () => {
    const { container } = renderWithTheme("dark");
    expect(container.querySelector("section")).toBeInTheDocument();
    expect(screen.getByText("What I Do")).toBeInTheDocument();
  });

  it("matches snapshot (light mode)", () => {
    const { container } = renderWithTheme("light");
    expect(container).toMatchSnapshot();
  });

  it("matches snapshot (dark mode)", () => {
    const { container } = renderWithTheme("dark");
    expect(container).toMatchSnapshot();
  });
});
