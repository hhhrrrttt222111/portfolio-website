import React from "react";
import { render, screen } from "@testing-library/react";
import { ThemeProvider } from "@mui/material/styles";
import { MemoryRouter } from "react-router-dom";
import { createAppTheme } from "@/theme";
import { Home } from "@/pages";

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
}));

const renderHome = () =>
  render(
    <ThemeProvider theme={createAppTheme("light")}>
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    </ThemeProvider>,
  );

describe("Home", () => {
  it("renders all components", () => {
    const { container } = renderHome();
    expect(screen.getByText("HRT")).toBeInTheDocument();
    expect(container.querySelectorAll("section").length).toBeGreaterThanOrEqual(1);
    expect(screen.getByTestId("footer")).toBeInTheDocument();
  });

  it("matches snapshot", () => {
    const { container } = renderHome();
    expect(container).toMatchSnapshot();
  });
});
