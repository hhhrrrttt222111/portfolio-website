import React from "react";
import { render, screen } from "@testing-library/react";
import { ThemeProvider } from "@mui/material/styles";
import { createAppTheme } from "@/theme";
import ExperienceTimeline from "@/components/about/ExperienceTimeline/ExperienceTimeline";
import { EXPERIENCES } from "@/constants";

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

jest.mock("framer-motion", () => ({
  motion: {
    div: React.forwardRef<HTMLDivElement, Record<string, unknown>>((props, ref) => (
      <div ref={ref} {...filterProps(props)} />
    )),
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

const renderComponent = (mode: "light" | "dark" = "light") =>
  render(
    <ThemeProvider theme={createAppTheme(mode)}>
      <ExperienceTimeline />
    </ThemeProvider>,
  );

describe("ExperienceTimeline", () => {
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
    expect(screen.getByTestId("experience-section")).toBeInTheDocument();
  });

  it("renders the section title", () => {
    renderComponent();
    expect(screen.getByText("Experience")).toBeInTheDocument();
  });

  it("renders the section subtitle", () => {
    renderComponent();
    expect(screen.getByText(/timeline of roles/)).toBeInTheDocument();
  });

  it("renders all job titles", () => {
    renderComponent();
    const uniqueTitles = [...new Set(EXPERIENCES.map((exp) => exp.title))];
    uniqueTitles.forEach((title) => {
      const elements = screen.getAllByText(title);
      expect(elements.length).toBeGreaterThan(0);
    });
  });

  it("renders all company names", () => {
    renderComponent();
    EXPERIENCES.forEach((exp) => {
      expect(screen.getByText(exp.company)).toBeInTheDocument();
    });
  });

  it("renders all date ranges", () => {
    renderComponent();
    EXPERIENCES.forEach((exp) => {
      expect(screen.getByText(exp.dateRange)).toBeInTheDocument();
    });
  });

  it("renders all descriptions", () => {
    renderComponent();
    EXPERIENCES.forEach((exp) => {
      expect(screen.getByText(exp.description)).toBeInTheDocument();
    });
  });

  it("renders correct number of experience cards", () => {
    renderComponent();
    const companies = EXPERIENCES.map((exp) => screen.getByText(exp.company));
    expect(companies).toHaveLength(EXPERIENCES.length);
  });

  it("renders correctly in dark mode", () => {
    const { container } = renderComponent("dark");
    expect(container.querySelector("section")).toBeInTheDocument();
    expect(screen.getByText("Experience")).toBeInTheDocument();
  });

  it("matches snapshot (light mode)", () => {
    const { container } = renderComponent("light");
    expect(container).toMatchSnapshot();
  });

  it("matches snapshot (dark mode)", () => {
    const { container } = renderComponent("dark");
    expect(container).toMatchSnapshot();
  });
});
