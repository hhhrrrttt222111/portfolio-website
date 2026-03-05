import React from "react";
import { render, screen } from "@testing-library/react";
import { ThemeProvider } from "@mui/material/styles";
import { MemoryRouter } from "react-router-dom";
import { createAppTheme } from "@/theme";
import { About } from "@/pages";

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

jest.mock("framer-motion", () => ({
  motion: {
    div: React.forwardRef<HTMLDivElement, Record<string, unknown>>((props, ref) => (
      <div ref={ref} {...filterProps(props)} />
    )),
    path: (props: Record<string, unknown>) => <path {...filterProps(props)} />,
    span: React.forwardRef<HTMLSpanElement, Record<string, unknown>>((props, ref) => (
      <span ref={ref} {...filterProps(props)} />
    )),
  },
  useReducedMotion: () => false,
  useMotionValue: (initial: number) => mockMotionValue(initial),
  useSpring: (source: unknown) => source,
  useScroll: () => ({ scrollYProgress: mockMotionValue(0) }),
  useTransform: () => mockMotionValue(0),
  AnimatePresence: ({ children }: { children: React.ReactNode }) => <>{children}</>,
  useInView: () => true,
}));

const renderAbout = (mode: "light" | "dark" = "light") =>
  render(
    <ThemeProvider theme={createAppTheme(mode)}>
      <MemoryRouter>
        <About />
      </MemoryRouter>
    </ThemeProvider>,
  );

describe("About Page", () => {
  it("renders without crashing", () => {
    const { container } = renderAbout();
    expect(container.firstChild).toBeTruthy();
  });

  it("renders the hero section with heading", () => {
    renderAbout();
    expect(screen.getByText(/I'm Hemanth/)).toBeInTheDocument();
  });

  it("renders the education section", () => {
    renderAbout();
    expect(screen.getByText("Education")).toBeInTheDocument();
    expect(screen.getByTestId("education-section")).toBeInTheDocument();
  });

  it("renders the experience section", () => {
    renderAbout();
    expect(screen.getByText("Experience")).toBeInTheDocument();
    expect(screen.getByTestId("experience-section")).toBeInTheDocument();
  });

  it("renders the philosophy section", () => {
    renderAbout();
    expect(screen.getByText("Great")).toBeInTheDocument();
    expect(screen.getByText("crafted")).toBeInTheDocument();
    expect(screen.getByTestId("philosophy-section")).toBeInTheDocument();
  });

  it("renders the navbar", () => {
    renderAbout();
    expect(screen.getByText("HRT")).toBeInTheDocument();
  });

  it("renders the footer", () => {
    renderAbout();
    expect(screen.getByTestId("footer")).toBeInTheDocument();
  });

  it("renders all four sections", () => {
    const { container } = renderAbout();
    const sections = container.querySelectorAll("section");
    expect(sections.length).toBeGreaterThanOrEqual(4);
  });

  it("renders reading links", () => {
    renderAbout();
    expect(screen.getByText(/Book Review Blog/)).toBeInTheDocument();
    expect(screen.getByText(/My Reading List/)).toBeInTheDocument();
  });

  it("renders education institutions", () => {
    renderAbout();
    expect(screen.getByText("Model Engineering College, Thrikkakara")).toBeInTheDocument();
    expect(screen.getByText("Bhavans Vidya Mandir, Eroor")).toBeInTheDocument();
  });

  it("renders correctly in dark mode", () => {
    const { container } = renderAbout("dark");
    expect(container.querySelectorAll("section").length).toBeGreaterThanOrEqual(4);
    expect(screen.getByText(/I'm Hemanth/)).toBeInTheDocument();
  });

  it("matches snapshot (light mode)", () => {
    const { container } = renderAbout("light");
    expect(container).toMatchSnapshot();
  });

  it("matches snapshot (dark mode)", () => {
    const { container } = renderAbout("dark");
    expect(container).toMatchSnapshot();
  });
});
