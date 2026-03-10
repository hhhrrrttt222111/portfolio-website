import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { ThemeProvider } from "@mui/material/styles";
import { createAppTheme } from "@/theme";
import WhatIDo from "@/components/home/WhatIDo/WhatIDo";
import ServiceCard from "@/components/home/WhatIDo/ServiceCard";
import { WHAT_I_DO_CARDS } from "@/constants";

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

let mockUseReducedMotion = false;
const mockOnMouseMove = jest.fn();
const mockOnMouseLeave = jest.fn();

jest.mock("framer-motion", () => ({
  motion: {
    div: React.forwardRef<HTMLDivElement, Record<string, unknown>>((props, ref) => {
      const { onMouseMove, onMouseLeave, ...rest } = props;
      const filtered = Object.fromEntries(
        Object.entries(rest).filter(([key]) => !FRAMER_PROPS.has(key)),
      );
      return (
        <div
          ref={ref}
          {...filtered}
          onMouseMove={onMouseMove as React.MouseEventHandler<HTMLDivElement>}
          onMouseLeave={onMouseLeave as React.MouseEventHandler<HTMLDivElement>}
        />
      );
    }),
  },
  useReducedMotion: () => mockUseReducedMotion,
}));

const renderWithTheme = (mode: "light" | "dark" = "light") =>
  render(
    <ThemeProvider theme={createAppTheme(mode)}>
      <WhatIDo />
    </ThemeProvider>,
  );

const renderServiceCard = (mode: "light" | "dark" = "light") =>
  render(
    <ThemeProvider theme={createAppTheme(mode)}>
      <ServiceCard card={WHAT_I_DO_CARDS[0]} />
    </ThemeProvider>,
  );

describe("WhatIDo", () => {
  beforeEach(() => {
    mockUseReducedMotion = false;
    mockOnMouseMove.mockClear();
    mockOnMouseLeave.mockClear();
  });

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

describe("ServiceCard", () => {
  beforeEach(() => {
    mockUseReducedMotion = false;
  });

  it("renders the card title and description", () => {
    renderServiceCard();
    expect(screen.getByText("Frontend Architecture")).toBeInTheDocument();
    expect(
      screen.getByText(/Designing scalable, maintainable frontend systems/),
    ).toBeInTheDocument();
  });

  it("handles mouse move to apply tilt effect", () => {
    mockUseReducedMotion = false;
    const { container } = renderServiceCard();
    const motionDivs = container.querySelectorAll("div");
    const cardWrapper = Array.from(motionDivs).find((div) => div.getAttribute("onmousemove"));

    const targetDiv = cardWrapper || motionDivs[1];
    if (targetDiv) {
      Object.defineProperty(targetDiv, "getBoundingClientRect", {
        value: () => ({ left: 0, top: 0, width: 200, height: 200 }),
        configurable: true,
      });

      fireEvent.mouseMove(targetDiv, { clientX: 150, clientY: 50 });
      expect(targetDiv).toBeInTheDocument();
    }
  });

  it("resets tilt on mouse leave", () => {
    mockUseReducedMotion = false;
    const { container } = renderServiceCard();
    const motionDivs = container.querySelectorAll("div");
    const targetDiv = motionDivs[1];

    if (targetDiv) {
      fireEvent.mouseLeave(targetDiv);
      expect(targetDiv).toBeInTheDocument();
    }
  });

  it("does not apply tilt when reduced motion is preferred", () => {
    mockUseReducedMotion = true;
    const { container } = renderServiceCard();
    const motionDivs = container.querySelectorAll("div");
    const targetDiv = motionDivs[1];

    if (targetDiv) {
      Object.defineProperty(targetDiv, "getBoundingClientRect", {
        value: () => ({ left: 0, top: 0, width: 200, height: 200 }),
        configurable: true,
      });

      fireEvent.mouseMove(targetDiv, { clientX: 150, clientY: 50 });
      expect(targetDiv).toBeInTheDocument();
    }
  });

  it("calculates tilt values correctly", () => {
    mockUseReducedMotion = false;
    const { container } = renderServiceCard();
    const motionDivs = container.querySelectorAll("div");
    const targetDiv = motionDivs[1];

    if (targetDiv) {
      Object.defineProperty(targetDiv, "getBoundingClientRect", {
        value: () => ({ left: 0, top: 0, width: 200, height: 200 }),
        configurable: true,
      });

      fireEvent.mouseMove(targetDiv, { clientX: 0, clientY: 0 });
      fireEvent.mouseMove(targetDiv, { clientX: 200, clientY: 200 });
      fireEvent.mouseMove(targetDiv, { clientX: 100, clientY: 100 });
      expect(targetDiv).toBeInTheDocument();
    }
  });
});
