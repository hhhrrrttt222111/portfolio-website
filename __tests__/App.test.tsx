import React, { Suspense } from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { ThemeProvider } from "@mui/material/styles";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import { createAppTheme } from "@/theme";
import { Home, NotFound } from "@/pages";
import Loader from "@/components/Loader/Loader";

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

const renderApp = (initialRoute = "/") =>
  render(
    <ThemeProvider theme={createAppTheme("light")}>
      <MemoryRouter initialEntries={[initialRoute]}>
        <Suspense fallback={<Loader />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </MemoryRouter>
    </ThemeProvider>,
  );

describe("App", () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it("renders the Home page at root route", async () => {
    renderApp("/");
    await waitFor(() => {
      expect(screen.getByText("HRT")).toBeInTheDocument();
    });
    expect(screen.getByTestId("footer")).toBeInTheDocument();
  });

  it("renders 404 page for non-existent routes", async () => {
    renderApp("/non-existent-page");
    await waitFor(() => {
      expect(screen.getByText("404")).toBeInTheDocument();
    });
    expect(screen.getByText("Page Not Found")).toBeInTheDocument();
  });

  it("Loader has accessibility attributes", () => {
    render(
      <ThemeProvider theme={createAppTheme("light")}>
        <Loader />
      </ThemeProvider>,
    );
    const loader = screen.getByRole("status");
    expect(loader).toHaveAttribute("aria-label", "Loading content");
  });
});
