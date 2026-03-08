import React from "react";
import { render, screen } from "@testing-library/react";
import { ThemeProvider } from "@mui/material/styles";
import { createAppTheme } from "@/theme";
import { Footer } from "@/components";
import { SOCIAL_LINKS } from "@/constants";

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

  const createMotionComponent = (tag: string) => {
    const Component = React.forwardRef(
      (props: Record<string, unknown>, ref: React.Ref<HTMLElement>) => {
        const filtered = Object.fromEntries(
          Object.entries(props).filter(([key]) => !FRAMER_PROPS.has(key)),
        );
        return React.createElement(tag, { ...filtered, ref });
      },
    );
    return Component;
  };

  const createFromComponent = (BaseComponent: React.ComponentType<Record<string, unknown>>) => {
    const Component = React.forwardRef(
      (props: Record<string, unknown>, ref: React.Ref<HTMLElement>) => {
        const filtered = Object.fromEntries(
          Object.entries(props).filter(([key]) => !FRAMER_PROPS.has(key)),
        );
        return React.createElement(BaseComponent, { ...filtered, ref });
      },
    );
    return Component;
  };

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
    useReducedMotion: () => false,
  };
});

const renderWithTheme = (mode: "light" | "dark" = "light") =>
  render(
    <ThemeProvider theme={createAppTheme(mode)}>
      <Footer />
    </ThemeProvider>,
  );

describe("Footer", () => {
  it("renders without crashing", () => {
    const { container } = renderWithTheme();
    expect(container.firstChild).toBeTruthy();
  });

  it("renders a footer element", () => {
    const { container } = renderWithTheme();
    expect(container.querySelector("footer")).toBeInTheDocument();
  });

  it("renders the footer with test id", () => {
    renderWithTheme();
    expect(screen.getByTestId("footer")).toBeInTheDocument();
  });

  it("renders the copyright text with current year", () => {
    renderWithTheme();
    const year = new Date().getFullYear();
    expect(screen.getByText(`© ${year} Hemanth R. All rights reserved.`)).toBeInTheDocument();
  });

  it("renders all social media links", () => {
    renderWithTheme();
    SOCIAL_LINKS.forEach((link) => {
      expect(screen.getByLabelText(link.name)).toBeInTheDocument();
    });
  });

  it("renders social links with correct href", () => {
    renderWithTheme();
    SOCIAL_LINKS.forEach((link) => {
      const anchor = screen.getByLabelText(link.name);
      expect(anchor).toHaveAttribute("href", link.url);
    });
  });

  it("renders social links that open in new tab", () => {
    renderWithTheme();
    SOCIAL_LINKS.forEach((link) => {
      const anchor = screen.getByLabelText(link.name);
      expect(anchor).toHaveAttribute("target", "_blank");
      expect(anchor).toHaveAttribute("rel", "noopener noreferrer");
    });
  });

  it("renders wave SVG paths", () => {
    const { container } = renderWithTheme();
    const waveSvg = container.querySelector("svg[viewBox='0 0 1920 160']");
    expect(waveSvg).toBeInTheDocument();
    const paths = waveSvg!.querySelectorAll("path");
    expect(paths.length).toBe(3);
  });

  it("renders correctly in dark mode", () => {
    const { container } = renderWithTheme("dark");
    expect(container.querySelector("footer")).toBeInTheDocument();
    expect(screen.getByTestId("footer")).toBeInTheDocument();
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
