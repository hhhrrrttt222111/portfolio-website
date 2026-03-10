import React from "react";
import { render, screen } from "@testing-library/react";
import { ThemeProvider } from "@mui/material/styles";
import { MemoryRouter } from "react-router-dom";
import { createAppTheme } from "@/theme";
import AboutHero from "@/components/about/AboutHero/AboutHero";

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
      <MemoryRouter>
        <AboutHero />
      </MemoryRouter>
    </ThemeProvider>,
  );

describe("AboutHero", () => {
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
    expect(screen.getByTestId("about-hero")).toBeInTheDocument();
  });

  it("renders the About Me subheading", () => {
    renderComponent();
    expect(screen.getByText("About Me")).toBeInTheDocument();
  });

  it("renders the hero heading", () => {
    renderComponent();
    expect(screen.getByText(/I'm Hemanth/)).toBeInTheDocument();
  });

  it("renders the personal story paragraph", () => {
    renderComponent();
    expect(screen.getByText(/fascinated by computers/)).toBeInTheDocument();
  });

  it("renders the reading note", () => {
    renderComponent();
    expect(screen.getByText(/avid reader/)).toBeInTheDocument();
  });

  it("renders the reading list link to /books", () => {
    renderComponent();
    const readingLink = screen.getByText(/My Reading List/);
    expect(readingLink).toBeInTheDocument();
    expect(readingLink.closest("a")).toHaveAttribute("href", "/books");
  });

  it("renders journey milestones", () => {
    renderComponent();
    expect(screen.getByText("First Freelance Project")).toBeInTheDocument();
    expect(screen.getByText("First Internship")).toBeInTheDocument();
    expect(screen.getByText("Landed My First Job")).toBeInTheDocument();
  });

  it("renders correctly in dark mode", () => {
    const { container } = renderComponent("dark");
    expect(container.querySelector("section")).toBeInTheDocument();
    expect(screen.getByText(/I'm Hemanth/)).toBeInTheDocument();
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
    expect(screen.getByText(/I'm Hemanth/)).toBeInTheDocument();
  });
});
