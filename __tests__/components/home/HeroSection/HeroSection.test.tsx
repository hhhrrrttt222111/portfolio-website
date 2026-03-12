import React from "react";
import { render, screen, fireEvent, act } from "@testing-library/react";
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
]);

let mockMotionValueValue = 0;
const mockSetValue = jest.fn((val: number) => {
  mockMotionValueValue = val;
});
const mockMotionValue = (initial: number) => ({
  get: () => mockMotionValueValue || initial,
  set: mockSetValue,
  subscribe: () => () => {},
  onChange: () => () => {},
  on: () => () => {},
});

let mockUseReducedMotion = false;

jest.mock("framer-motion", () => ({
  motion: {
    div: React.forwardRef<HTMLDivElement, Record<string, unknown>>((props, ref) => {
      const {
        onPointerDown,
        onPointerMove,
        onPointerUp,
        onPointerCancel,
        onMouseMove,
        onMouseLeave,
        ...rest
      } = props;
      const filtered = Object.fromEntries(
        Object.entries(rest).filter(([key]) => !FRAMER_PROPS.has(key)),
      );
      return (
        <div
          ref={ref}
          {...filtered}
          onPointerDown={onPointerDown as React.PointerEventHandler<HTMLDivElement>}
          onPointerMove={onPointerMove as React.PointerEventHandler<HTMLDivElement>}
          onPointerUp={onPointerUp as React.PointerEventHandler<HTMLDivElement>}
          onPointerCancel={onPointerCancel as React.PointerEventHandler<HTMLDivElement>}
          onMouseMove={onMouseMove as React.MouseEventHandler<HTMLDivElement>}
          onMouseLeave={onMouseLeave as React.MouseEventHandler<HTMLDivElement>}
        />
      );
    }),
  },
  useReducedMotion: () => mockUseReducedMotion,
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
  beforeEach(() => {
    mockMotionValueValue = 0;
    mockSetValue.mockClear();
    mockUseReducedMotion = false;
  });

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
    expect(screen.getByText("Hemanth R.")).toBeInTheDocument();
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

  it("responds to mouse move on section and updates swing target", () => {
    renderWithTheme();
    const section = screen.getByTestId("hero-section");

    Object.defineProperty(section, "getBoundingClientRect", {
      value: () => ({ left: 0, width: 1000, top: 0, height: 500 }),
      configurable: true,
    });

    act(() => {
      fireEvent.mouseMove(section, { clientX: 700, clientY: 300 });
    });

    expect(mockSetValue).toHaveBeenCalled();
  });

  it("responds to mouse leave on section and resets swing target", () => {
    renderWithTheme();
    const section = screen.getByTestId("hero-section");

    act(() => {
      fireEvent.mouseLeave(section);
    });

    expect(mockSetValue).toHaveBeenCalledWith(0);
  });

  it("does not update swing on mouse move when reduced motion is preferred", () => {
    mockUseReducedMotion = true;
    renderWithTheme();
    const section = screen.getByTestId("hero-section");

    mockSetValue.mockClear();

    act(() => {
      fireEvent.mouseMove(section, { clientX: 700, clientY: 300 });
    });

    expect(mockSetValue).not.toHaveBeenCalled();
  });

  it("handles pointer down to start dragging", () => {
    const { container } = renderWithTheme();
    const draggableElement = container.querySelector("[style*='grab']");

    if (draggableElement) {
      const mockSetPointerCapture = jest.fn();
      Object.defineProperty(draggableElement, "setPointerCapture", {
        value: mockSetPointerCapture,
        configurable: true,
      });

      act(() => {
        fireEvent.pointerDown(draggableElement, { clientX: 500, pointerId: 1 });
      });

      expect(mockSetPointerCapture).toHaveBeenCalled();
    }
  });

  it("handles pointer move during drag", () => {
    const { container } = renderWithTheme();
    const draggableElement = container.querySelector("[style*='grab']");

    if (draggableElement) {
      Object.defineProperty(draggableElement, "setPointerCapture", {
        value: jest.fn(),
        configurable: true,
      });

      act(() => {
        fireEvent.pointerDown(draggableElement, { clientX: 500, pointerId: 1 });
      });

      mockSetValue.mockClear();

      act(() => {
        fireEvent.pointerMove(draggableElement, { clientX: 600, pointerId: 1 });
      });

      expect(mockSetValue).toHaveBeenCalled();
    }
  });

  it("handles pointer up to stop dragging", () => {
    const { container } = renderWithTheme();
    const draggableElement = container.querySelector("[style*='grab']");

    if (draggableElement) {
      Object.defineProperty(draggableElement, "setPointerCapture", {
        value: jest.fn(),
        configurable: true,
      });

      act(() => {
        fireEvent.pointerDown(draggableElement, { clientX: 500, pointerId: 1 });
      });

      mockSetValue.mockClear();

      act(() => {
        fireEvent.pointerUp(draggableElement, { pointerId: 1 });
      });

      expect(mockSetValue).toHaveBeenCalledWith(0);
    }
  });

  it("handles pointer cancel to stop dragging", () => {
    const { container } = renderWithTheme();
    const draggableElement = container.querySelector("[style*='grab']");

    if (draggableElement) {
      Object.defineProperty(draggableElement, "setPointerCapture", {
        value: jest.fn(),
        configurable: true,
      });

      act(() => {
        fireEvent.pointerDown(draggableElement, { clientX: 500, pointerId: 1 });
      });

      mockSetValue.mockClear();

      act(() => {
        fireEvent.pointerCancel(draggableElement, { pointerId: 1 });
      });

      expect(mockSetValue).toHaveBeenCalledWith(0);
    }
  });

  it("does not respond to pointer down when reduced motion is preferred", () => {
    mockUseReducedMotion = true;
    const { container } = renderWithTheme();
    const draggableElement = container.querySelector("[style*='grab']");

    if (draggableElement) {
      const mockSetPointerCapture = jest.fn();
      Object.defineProperty(draggableElement, "setPointerCapture", {
        value: mockSetPointerCapture,
        configurable: true,
      });

      act(() => {
        fireEvent.pointerDown(draggableElement, { clientX: 500, pointerId: 1 });
      });

      expect(mockSetPointerCapture).not.toHaveBeenCalled();
    }
  });

  it("does not respond to pointer move when not dragging", () => {
    const { container } = renderWithTheme();
    const draggableElement = container.querySelector("[style*='grab']");

    if (draggableElement) {
      mockSetValue.mockClear();

      act(() => {
        fireEvent.pointerMove(draggableElement, { clientX: 600, pointerId: 1 });
      });

      expect(mockSetValue).not.toHaveBeenCalled();
    }
  });

  it("does not reset swing on mouse leave while dragging", () => {
    const { container } = renderWithTheme();
    const section = screen.getByTestId("hero-section");
    const draggableElement = container.querySelector("[style*='grab']");

    if (draggableElement) {
      Object.defineProperty(draggableElement, "setPointerCapture", {
        value: jest.fn(),
        configurable: true,
      });

      act(() => {
        fireEvent.pointerDown(draggableElement, { clientX: 500, pointerId: 1 });
      });

      mockSetValue.mockClear();

      act(() => {
        fireEvent.mouseLeave(section);
      });

      expect(mockSetValue).not.toHaveBeenCalledWith(0);
    }
  });

  it("renders correctly in dark mode", () => {
    const { container } = renderWithTheme("dark");
    expect(container.querySelector("section")).toBeInTheDocument();
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
