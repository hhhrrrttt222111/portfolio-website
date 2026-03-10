import React from "react";
import { render, screen } from "@testing-library/react";
import { ThemeProvider } from "@mui/material/styles";
import { createAppTheme } from "@/theme";
import PhilosophySection from "@/components/about/PhilosophySection/PhilosophySection";
import { PHILOSOPHY_QUOTE } from "@/constants";

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
  "custom",
  "filter",
]);

const filterProps = (props: Record<string, unknown>) =>
  Object.fromEntries(Object.entries(props).filter(([key]) => !FRAMER_PROPS.has(key)));

const mockMotionValue = (initial: number) => ({
  get: () => initial,
  set: () => {},
  subscribe: () => () => {},
  onChange: () => () => {},
  on: () => () => {},
});

let mockUseReducedMotion = false;

jest.mock("framer-motion", () => ({
  motion: {
    div: React.forwardRef<HTMLDivElement, Record<string, unknown>>((props, ref) => (
      <div ref={ref} {...filterProps(props)} />
    )),
    span: React.forwardRef<HTMLSpanElement, Record<string, unknown>>((props, ref) => (
      <span ref={ref} {...filterProps(props)} />
    )),
  },
  useReducedMotion: () => mockUseReducedMotion,
  useMotionValue: (initial: number) => mockMotionValue(initial),
  useSpring: (source: unknown) => source,
  useScroll: () => ({ scrollYProgress: mockMotionValue(0) }),
  useTransform: () => mockMotionValue(0),
  AnimatePresence: ({ children }: { children: React.ReactNode }) => <>{children}</>,
  useInView: () => true,
}));

const renderComponent = (mode: "light" | "dark" = "light") =>
  render(
    <ThemeProvider theme={createAppTheme(mode)}>
      <PhilosophySection />
    </ThemeProvider>,
  );

describe("PhilosophySection", () => {
  beforeEach(() => {
    mockUseReducedMotion = false;
  });
  it("renders without crashing", () => {
    const { container } = renderComponent();
    expect(container.firstChild).toBeTruthy();
  });

  it("renders a section element", () => {
    const { container } = renderComponent();
    expect(container.querySelector("section")).toBeInTheDocument();
  });

  it("renders with test id", () => {
    renderComponent();
    expect(screen.getByTestId("philosophy-section")).toBeInTheDocument();
  });

  it("renders a blockquote element", () => {
    const { container } = renderComponent();
    expect(container.querySelector("blockquote")).toBeInTheDocument();
  });

  it("renders every word of the philosophy quote", () => {
    renderComponent();
    const words = PHILOSOPHY_QUOTE.split(" ");
    words.forEach((word) => {
      expect(screen.getByText(word)).toBeInTheDocument();
    });
  });

  it("renders the correct number of word spans", () => {
    const { container } = renderComponent();
    const words = PHILOSOPHY_QUOTE.split(" ");
    const blockquote = container.querySelector("blockquote");
    const wordSpans = blockquote?.querySelectorAll("span > span");
    expect(wordSpans?.length).toBe(words.length);
  });

  it("renders the attribution text", () => {
    renderComponent();
    expect(screen.getByText(/my design philosophy/)).toBeInTheDocument();
  });

  it("renders correctly in dark mode", () => {
    const { container } = renderComponent("dark");
    expect(container.querySelector("section")).toBeInTheDocument();
    expect(container.querySelector("blockquote")).toBeInTheDocument();
  });

  it("matches snapshot (light mode)", () => {
    const { container } = renderComponent("light");
    expect(container).toMatchSnapshot();
  });

  it("matches snapshot (dark mode)", () => {
    const { container } = renderComponent("dark");
    expect(container).toMatchSnapshot();
  });

  it("renders with reduced motion preference", () => {
    mockUseReducedMotion = true;
    renderComponent();
    expect(screen.getByTestId("philosophy-section")).toBeInTheDocument();
  });
});
