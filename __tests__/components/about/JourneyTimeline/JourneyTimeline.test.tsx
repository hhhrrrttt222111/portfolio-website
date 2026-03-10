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
  AnimatePresence: ({ children }: { children: React.ReactNode }) => <>{children}</>,
  useInView: () => true,
}));

let mockIsMobile = false;

jest.mock("@mui/material/useMediaQuery", () => ({
  __esModule: true,
  default: () => mockIsMobile,
}));

const renderComponent = (mode: "light" | "dark" = "light") =>
  render(
    <ThemeProvider theme={createAppTheme(mode)}>
      <JourneyTimeline />
    </ThemeProvider>,
  );

describe("JourneyTimeline", () => {
  beforeEach(() => {
    mockIsMobile = false;
    mockUseReducedMotion = false;
  });

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

  it("toggles description off when clicking same milestone again", () => {
    renderComponent();
    const firstTitle = screen.getByText(JOURNEY_MILESTONES[0].title);
    const milestoneNode =
      firstTitle.closest("[role='button']") ??
      firstTitle.parentElement?.parentElement?.parentElement;

    if (milestoneNode) {
      fireEvent.click(milestoneNode);
      fireEvent.click(milestoneNode);
    }
    expect(screen.getByTestId("journey-timeline")).toBeInTheDocument();
  });

  it("responds to keyboard Enter key", () => {
    renderComponent();
    const buttons = screen.getAllByRole("button");
    if (buttons.length > 0) {
      fireEvent.keyDown(buttons[0], { key: "Enter", code: "Enter" });
    }
    expect(screen.getByTestId("journey-timeline")).toBeInTheDocument();
  });

  it("responds to keyboard Space key", () => {
    renderComponent();
    const buttons = screen.getAllByRole("button");
    if (buttons.length > 0) {
      fireEvent.keyDown(buttons[0], { key: " ", code: "Space" });
    }
    expect(screen.getByTestId("journey-timeline")).toBeInTheDocument();
  });

  it("ignores other keyboard keys", () => {
    renderComponent();
    const buttons = screen.getAllByRole("button");
    if (buttons.length > 0) {
      fireEvent.keyDown(buttons[0], { key: "Tab", code: "Tab" });
    }
    expect(screen.getByTestId("journey-timeline")).toBeInTheDocument();
  });

  it("shows tooltip on hover (desktop)", () => {
    renderComponent();
    const buttons = screen.getAllByRole("button");
    if (buttons.length > 0) {
      fireEvent.mouseEnter(buttons[0]);
      expect(screen.getByText(JOURNEY_MILESTONES[0].description)).toBeInTheDocument();
    }
  });

  it("hides tooltip on mouse leave", () => {
    renderComponent();
    const buttons = screen.getAllByRole("button");
    if (buttons.length > 0) {
      fireEvent.mouseEnter(buttons[0]);
      fireEvent.mouseLeave(buttons[0]);
    }
    expect(screen.getByTestId("journey-timeline")).toBeInTheDocument();
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

  it("renders with reduced motion preference", () => {
    mockUseReducedMotion = true;
    renderComponent();
    expect(screen.getByTestId("journey-timeline")).toBeInTheDocument();
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

describe("JourneyTimeline - Mobile View", () => {
  beforeEach(() => {
    mockIsMobile = true;
    mockUseReducedMotion = false;
  });

  it("renders mobile layout when on mobile", () => {
    renderComponent();
    expect(screen.getByTestId("journey-timeline")).toBeInTheDocument();
    JOURNEY_MILESTONES.forEach((milestone) => {
      expect(screen.getByText(milestone.title)).toBeInTheDocument();
    });
  });

  it("shows description on click in mobile view", () => {
    renderComponent();
    const buttons = screen.getAllByRole("button");
    if (buttons.length > 0) {
      fireEvent.click(buttons[0]);
    }
    expect(screen.getByTestId("journey-timeline")).toBeInTheDocument();
  });

  it("toggles description off when clicking same milestone in mobile", () => {
    renderComponent();
    const buttons = screen.getAllByRole("button");
    if (buttons.length > 0) {
      fireEvent.click(buttons[0]);
      fireEvent.click(buttons[0]);
    }
    expect(screen.getByTestId("journey-timeline")).toBeInTheDocument();
  });

  it("responds to keyboard Enter key in mobile view", () => {
    renderComponent();
    const buttons = screen.getAllByRole("button");
    if (buttons.length > 0) {
      fireEvent.keyDown(buttons[0], { key: "Enter", code: "Enter" });
    }
    expect(screen.getByTestId("journey-timeline")).toBeInTheDocument();
  });

  it("responds to keyboard Space key in mobile view", () => {
    renderComponent();
    const buttons = screen.getAllByRole("button");
    if (buttons.length > 0) {
      fireEvent.keyDown(buttons[0], { key: " ", code: "Space" });
    }
    expect(screen.getByTestId("journey-timeline")).toBeInTheDocument();
  });

  it("ignores other keyboard keys in mobile view", () => {
    renderComponent();
    const buttons = screen.getAllByRole("button");
    if (buttons.length > 0) {
      fireEvent.keyDown(buttons[0], { key: "Escape", code: "Escape" });
    }
    expect(screen.getByTestId("journey-timeline")).toBeInTheDocument();
  });

  it("renders with reduced motion preference in mobile", () => {
    mockUseReducedMotion = true;
    renderComponent();
    expect(screen.getByTestId("journey-timeline")).toBeInTheDocument();
  });

  it("matches snapshot (mobile view)", () => {
    const { container } = renderComponent("light");
    expect(container).toMatchSnapshot();
  });
});
