import React from "react";
import { render, screen } from "@testing-library/react";
import { ThemeProvider } from "@mui/material/styles";
import { createAppTheme } from "@/theme";
import TechStack from "@/components/home/TechStack/TechStack";
import { TECH_STACK } from "@/constants";

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
  useInView: () => true,
  AnimatePresence: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}));

const renderWithTheme = (mode: "light" | "dark" = "light") =>
  render(
    <ThemeProvider theme={createAppTheme(mode)}>
      <TechStack />
    </ThemeProvider>,
  );

describe("TechStack", () => {
  it("renders without crashing", () => {
    const { container } = renderWithTheme();
    expect(container.firstChild).toBeTruthy();
  });

  it("renders a section element", () => {
    const { container } = renderWithTheme();
    expect(container.querySelector("section")).toBeInTheDocument();
  });

  it("renders with test id", () => {
    renderWithTheme();
    expect(screen.getByTestId("tech-stack")).toBeInTheDocument();
  });

  it("renders the section title", () => {
    renderWithTheme();
    expect(screen.getByText(/Tech Stack/)).toBeInTheDocument();
  });

  it("renders the subtitle with total skill count", () => {
    renderWithTheme();
    const total = TECH_STACK.reduce((sum, cat) => sum + cat.skills.length, 0);
    expect(screen.getByText(new RegExp(`${total} tools`))).toBeInTheDocument();
  });

  it("renders all category labels", () => {
    renderWithTheme();
    TECH_STACK.forEach((category) => {
      const labels = screen.getAllByText(category.label);
      expect(labels.length).toBeGreaterThanOrEqual(1);
    });
  });

  it("renders all skill names", () => {
    renderWithTheme();
    TECH_STACK.forEach((category) => {
      category.skills.forEach((skill) => {
        const elements = screen.getAllByText(skill);
        expect(elements.length).toBeGreaterThanOrEqual(1);
      });
    });
  });

  it("renders terminal command for each category", () => {
    renderWithTheme();
    TECH_STACK.forEach((category) => {
      expect(screen.getByText(category.command)).toBeInTheDocument();
    });
  });

  it("renders item count for each category", () => {
    renderWithTheme();
    const expectedCounts = TECH_STACK.map(
      (c) => `${c.skills.length} ${c.skills.length === 1 ? "item" : "items"} found`,
    );
    const uniqueCounts = [...new Set(expectedCounts)];
    uniqueCounts.forEach((label) => {
      const elements = screen.getAllByText(label);
      const expectedOccurrences = expectedCounts.filter((c) => c === label).length;
      expect(elements.length).toBe(expectedOccurrences);
    });
  });

  it("renders terminal dot groups", () => {
    const { container } = renderWithTheme();
    const dotGroups = container.querySelectorAll("span");
    expect(dotGroups.length).toBeGreaterThanOrEqual(TECH_STACK.length * 3);
  });

  it("renders correctly in dark mode", () => {
    const { container } = renderWithTheme("dark");
    expect(container.querySelector("section")).toBeInTheDocument();
    expect(screen.getByText(/Tech Stack/)).toBeInTheDocument();
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
