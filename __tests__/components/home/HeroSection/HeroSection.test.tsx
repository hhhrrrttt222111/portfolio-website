import React from "react";
import { render, screen } from "@testing-library/react";
import { ThemeProvider } from "@mui/material/styles";
import { createAppTheme } from "@/theme";
import HeroSection from "@/components/home/HeroSection/HeroSection";

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

const mockMotionValue = (initial: number) => ({
  get: () => initial,
  set: () => {},
  subscribe: () => () => {},
  onChange: () => () => {},
  on: () => () => {},
});

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
  useMotionValue: (initial: number) => mockMotionValue(initial),
  useSpring: (source: unknown) => source,
}));

const renderWithTheme = (mode: "light" | "dark" = "light") =>
  render(
    <ThemeProvider theme={createAppTheme(mode)}>
      <HeroSection />
    </ThemeProvider>,
  );

describe("HeroSection", () => {
  it("renders without crashing", () => {
    const { container } = renderWithTheme();
    expect(container.firstChild).toBeTruthy();
  });

  it("renders a section element", () => {
    const { container } = renderWithTheme();
    expect(container.querySelector("section")).toBeInTheDocument();
  });

  it("renders the hero section with test id", () => {
    renderWithTheme();
    expect(screen.getByTestId("hero-section")).toBeInTheDocument();
  });

  it("renders the portfolio title", () => {
    renderWithTheme();
    expect(screen.getByText("portfólio")).toBeInTheDocument();
  });

  it("renders the current year", () => {
    renderWithTheme();
    expect(screen.getByText(String(new Date().getFullYear()))).toBeInTheDocument();
  });

  it("renders the subtitle with name", () => {
    renderWithTheme();
    expect(screen.getByText("[ Hemanth R ]")).toBeInTheDocument();
  });

  it("renders the hero icon SVG", () => {
    const { container } = renderWithTheme();
    const svgs = container.querySelectorAll("svg");
    expect(svgs.length).toBeGreaterThanOrEqual(2);
  });

  it("renders the coiled cord SVG", () => {
    const { container } = renderWithTheme();
    const paths = container.querySelectorAll("svg path");
    expect(paths.length).toBeGreaterThanOrEqual(1);
  });

  it("renders the icon with grab cursor for interaction", () => {
    const { container } = renderWithTheme();
    const iconWrapper = container.querySelector("[style*='grab']");
    expect(iconWrapper).toBeTruthy();
  });

  it("renders correctly in dark mode", () => {
    const { container } = renderWithTheme("dark");
    expect(container.querySelector("section")).toBeInTheDocument();
    expect(screen.getByText("portfólio")).toBeInTheDocument();
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
