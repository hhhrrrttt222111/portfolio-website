import React from "react";
import { render, screen } from "@testing-library/react";
import { ThemeProvider } from "@mui/material/styles";
import { MemoryRouter } from "react-router-dom";
import { createAppTheme } from "@/theme";
import { Home } from "@/pages";

jest.mock("framer-motion", () => {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const React = require("react");
  const FRAMER_PROPS = new Set([
    "initial",
    "animate",
    "exit",
    "variants",
    "transition",
    "whileHover",
    "whileInView",
    "whileTap",
    "whileFocus",
    "viewport",
    "onMouseMove",
    "onMouseLeave",
    "custom",
    "layoutId",
  ]);
  const filterProps = (props: Record<string, unknown>) =>
    Object.fromEntries(Object.entries(props).filter(([key]) => !FRAMER_PROPS.has(key)));
  const createMotionComponent = (tag: string) =>
    React.forwardRef((props: Record<string, unknown>, ref: React.Ref<HTMLElement>) =>
      React.createElement(tag, { ...filterProps(props), ref }),
    );
  const createFromComponent = (BaseComponent: React.ComponentType<Record<string, unknown>>) =>
    React.forwardRef((props: Record<string, unknown>, ref: React.Ref<HTMLElement>) =>
      React.createElement(BaseComponent, { ...filterProps(props), ref }),
    );
  const mockMotionValue = (initial: number) => ({
    get: () => initial,
    set: () => {},
    subscribe: () => () => {},
    onChange: () => () => {},
    on: () => () => {},
  });
  return {
    motion: {
      create: createFromComponent,
      div: createMotionComponent("div"),
      span: createMotionComponent("span"),
      a: createMotionComponent("a"),
      button: createMotionComponent("button"),
      header: createMotionComponent("header"),
      nav: createMotionComponent("nav"),
      path: createMotionComponent("path"),
    },
    useReducedMotion: () => false,
    useMotionValue: (initial: number) => mockMotionValue(initial),
    useSpring: (source: unknown) => source,
    useScroll: () => ({ scrollYProgress: mockMotionValue(0) }),
    useTransform: () => mockMotionValue(0),
    AnimatePresence: ({ children }: { children: React.ReactNode }) =>
      React.createElement(React.Fragment, null, children),
    useInView: () => true,
  };
});

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
});
