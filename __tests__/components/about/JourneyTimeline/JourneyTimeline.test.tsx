import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { ThemeProvider } from "@mui/material/styles";
import { createAppTheme } from "@/theme";
import JourneyTimeline from "@/components/about/JourneyTimeline/JourneyTimeline";
import { JOURNEY_MILESTONES } from "@/constants";

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
  AnimatePresence: ({ children }: { children: React.ReactNode }) => <>{children}</>,
  useInView: () => true,
}));

const renderComponent = (mode: "light" | "dark" = "light") =>
  render(
    <ThemeProvider theme={createAppTheme(mode)}>
      <JourneyTimeline />
    </ThemeProvider>,
  );

describe("JourneyTimeline", () => {
  it("renders without crashing", () => {
    const { container } = renderComponent();
    expect(container.firstChild).toBeTruthy();
  });

  it("renders with test id", () => {
    renderComponent();
    expect(screen.getByTestId("journey-timeline")).toBeInTheDocument();
  });

  it("renders all milestone years", () => {
    renderComponent();
    JOURNEY_MILESTONES.forEach((milestone) => {
      expect(screen.getByText(String(milestone.year))).toBeInTheDocument();
    });
  });

  it("renders all milestone titles", () => {
    renderComponent();
    JOURNEY_MILESTONES.forEach((milestone) => {
      expect(screen.getByText(milestone.title)).toBeInTheDocument();
    });
  });

  it("shows description on click (mobile-friendly interaction)", () => {
    renderComponent();
    const firstTitle = screen.getByText(JOURNEY_MILESTONES[0].title);
    const milestoneNode =
      firstTitle.closest("[role='button']") ??
      firstTitle.parentElement?.parentElement?.parentElement;

    if (milestoneNode) {
      fireEvent.click(milestoneNode);
      expect(screen.getByText(JOURNEY_MILESTONES[0].description)).toBeInTheDocument();
    }
  });

  it("renders correct number of milestones", () => {
    renderComponent();
    const titles = JOURNEY_MILESTONES.map((m) => screen.getByText(m.title));
    expect(titles).toHaveLength(JOURNEY_MILESTONES.length);
  });

  it("milestones have accessible role and label", () => {
    renderComponent();
    const buttons = screen.getAllByRole("button");
    expect(buttons.length).toBeGreaterThanOrEqual(JOURNEY_MILESTONES.length);
  });

  it("renders correctly in dark mode", () => {
    const { container } = renderComponent("dark");
    expect(container.firstChild).toBeTruthy();
    JOURNEY_MILESTONES.forEach((milestone) => {
      expect(screen.getByText(milestone.title)).toBeInTheDocument();
    });
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
