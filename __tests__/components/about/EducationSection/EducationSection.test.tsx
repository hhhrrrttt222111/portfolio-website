import React from "react";
import { render, screen } from "@testing-library/react";
import { ThemeProvider } from "@mui/material/styles";
import { createAppTheme } from "@/theme";
import EducationSection from "@/components/about/EducationSection/EducationSection";
import { EDUCATION } from "@/constants";

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
      <EducationSection />
    </ThemeProvider>,
  );

describe("EducationSection", () => {
  it("renders without crashing", () => {
    const { container } = renderComponent();
    expect(container.firstChild).toBeTruthy();
  });

  it("renders a section element", () => {
    const { container } = renderComponent();
    expect(container.querySelector("section")).toBeInTheDocument();
  });

  it("renders with test id", () => {
    renderComponent();
    expect(screen.getByTestId("education-section")).toBeInTheDocument();
  });

  it("renders the section title", () => {
    renderComponent();
    expect(screen.getByText("Education")).toBeInTheDocument();
  });

  it("renders the section subtitle", () => {
    renderComponent();
    expect(screen.getByText(/foundation that shaped/)).toBeInTheDocument();
  });

  it("renders all institution names", () => {
    renderComponent();
    EDUCATION.forEach((edu) => {
      expect(screen.getByText(edu.institution)).toBeInTheDocument();
    });
  });

  it("renders year ranges for all entries", () => {
    renderComponent();
    EDUCATION.forEach((edu) => {
      const yearLabel =
        edu.endYear === "Present"
          ? `${edu.startYear} — Present`
          : `${edu.startYear} — ${edu.endYear}`;
      expect(screen.getByText(yearLabel)).toBeInTheDocument();
    });
  });

  it("renders level or degree for each entry", () => {
    renderComponent();
    EDUCATION.forEach((edu) => {
      const label = edu.level ?? edu.degree;
      if (label) {
        expect(screen.getByText(label)).toBeInTheDocument();
      }
    });
  });

  it("renders correct number of education cards", () => {
    renderComponent();
    const institutions = EDUCATION.map((edu) => screen.getByText(edu.institution));
    expect(institutions).toHaveLength(EDUCATION.length);
  });

  it("renders correctly in dark mode", () => {
    const { container } = renderComponent("dark");
    expect(container.querySelector("section")).toBeInTheDocument();
    expect(screen.getByText("Education")).toBeInTheDocument();
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
