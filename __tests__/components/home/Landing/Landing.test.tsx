import React from "react";
import { render, screen } from "@testing-library/react";
import { Landing } from "@/components";

let mockUseReducedMotion = false;

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
    AnimatePresence: ({ children }: { children: React.ReactNode }) =>
      React.createElement(React.Fragment, null, children),
    useReducedMotion: () => mockUseReducedMotion,
  };
});

jest.mock("gsap", () => ({
  default: {
    registerPlugin: jest.fn(),
    context: (fn: () => void) => {
      fn();
      return { revert: jest.fn() };
    },
    fromTo: jest.fn(),
  },
  gsap: {
    registerPlugin: jest.fn(),
    context: (fn: () => void) => {
      fn();
      return { revert: jest.fn() };
    },
    fromTo: jest.fn(),
  },
  registerPlugin: jest.fn(),
  context: (fn: () => void) => {
    fn();
    return { revert: jest.fn() };
  },
  fromTo: jest.fn(),
}));

jest.mock("gsap/ScrollTrigger", () => ({
  default: {},
  ScrollTrigger: {},
}));

describe("Landing", () => {
  beforeEach(() => {
    mockUseReducedMotion = false;
  });

  it("renders without crashing", () => {
    const { container } = render(<Landing />);
    expect(container.firstChild).toBeTruthy();
  });

  it("renders a section element", () => {
    const { container } = render(<Landing />);
    expect(container.querySelector("section")).toBeInTheDocument();
  });

  it("renders the hero heading with Freelance text", () => {
    render(<Landing />);
    expect(screen.getByRole("heading", { level: 1 })).toBeInTheDocument();
    expect(screen.getByText("Software")).toBeInTheDocument();
    expect(screen.getByText("Developer")).toBeInTheDocument();
  });

  it("renders the subtitle", () => {
    render(<Landing />);
    expect(screen.getByText("Hey, I'm a")).toBeInTheDocument();
  });

  it("renders the tagline", () => {
    render(<Landing />);
    expect(screen.getByText(/Great design should feel/)).toBeInTheDocument();
  });

  it("renders the description", () => {
    render(<Landing />);
    expect(
      screen.getByText(/From idea to production, I help turn concepts into high-quality/),
    ).toBeInTheDocument();
  });

  it("renders the portrait image", () => {
    render(<Landing />);
    const img = screen.getByAltText("Portrait");
    expect(img).toBeInTheDocument();
    expect(img.tagName).toBe("IMG");
  });

  it("renders accent text elements", () => {
    render(<Landing />);
    expect(screen.getByText("fast")).toBeInTheDocument();
    expect(screen.getByText("intuitive")).toBeInTheDocument();
    expect(screen.getByText("reliable")).toBeInTheDocument();
  });

  it("renders with reduced motion preference", () => {
    mockUseReducedMotion = true;
    const { container } = render(<Landing />);
    expect(container.querySelector("section")).toBeInTheDocument();
    expect(screen.getByText("Software")).toBeInTheDocument();
  });

  it("matches snapshot", () => {
    const { container } = render(<Landing />);
    expect(container).toMatchSnapshot();
  });
});
