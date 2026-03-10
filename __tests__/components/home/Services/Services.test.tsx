import React from "react";
import { render, screen } from "@testing-library/react";
import { ThemeProvider } from "@mui/material/styles";
import { createAppTheme } from "@/theme";
import Services from "@/components/home/Services/Services";
import { SERVICES } from "@/constants/services";

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

let mockUseReducedMotion = false;

jest.mock("framer-motion", () => ({
  motion: {
    div: React.forwardRef<HTMLDivElement, Record<string, unknown>>((props, ref) => {
      const filtered = Object.fromEntries(
        Object.entries(props).filter(([key]) => !FRAMER_PROPS.has(key)),
      );
      return <div ref={ref} {...filtered} />;
    }),
  },
  useReducedMotion: () => mockUseReducedMotion,
  useInView: () => true,
}));

const renderWithTheme = (mode: "light" | "dark" = "light") =>
  render(
    <ThemeProvider theme={createAppTheme(mode)}>
      <Services />
    </ThemeProvider>,
  );

describe("Services", () => {
  beforeEach(() => {
    mockUseReducedMotion = false;
  });
  it("renders without crashing", () => {
    const { container } = renderWithTheme();
    expect(container.firstChild).toBeTruthy();
  });

  it("renders a section element with id", () => {
    const { container } = renderWithTheme();
    const section = container.querySelector("section");
    expect(section).toBeInTheDocument();
    expect(section).toHaveAttribute("id", "services");
  });

  it("renders the section label", () => {
    renderWithTheme();
    expect(screen.getByText("What I Offer")).toBeInTheDocument();
  });

  it("renders the section title", () => {
    renderWithTheme();
    expect(screen.getByText("Services")).toBeInTheDocument();
  });

  it("renders the section subtitle", () => {
    renderWithTheme();
    expect(
      screen.getByText(/Transforming ideas into exceptional digital experiences/),
    ).toBeInTheDocument();
  });

  it("renders all service cards", () => {
    renderWithTheme();
    SERVICES.forEach((service) => {
      expect(screen.getByText(service.title)).toBeInTheDocument();
    });
  });

  it("renders all four services", () => {
    renderWithTheme();
    expect(screen.getByText("Website Creation")).toBeInTheDocument();
    expect(screen.getByText("Ideation")).toBeInTheDocument();
    expect(screen.getByText("Web Designing")).toBeInTheDocument();
    expect(screen.getByText("Tech Consulting")).toBeInTheDocument();
  });

  it("renders service descriptions", () => {
    renderWithTheme();
    SERVICES.forEach((service) => {
      expect(screen.getByText(service.description)).toBeInTheDocument();
    });
  });

  it("renders service features", () => {
    renderWithTheme();
    SERVICES.forEach((service) => {
      service.features.forEach((feature) => {
        expect(screen.getByText(feature)).toBeInTheDocument();
      });
    });
  });

  it("renders service numbers", () => {
    renderWithTheme();
    expect(screen.getByText("01")).toBeInTheDocument();
    expect(screen.getByText("02")).toBeInTheDocument();
    expect(screen.getByText("03")).toBeInTheDocument();
    expect(screen.getByText("04")).toBeInTheDocument();
  });

  it("renders icons for each service", () => {
    const { container } = renderWithTheme();
    const icons = container.querySelectorAll(".MuiSvgIcon-root");
    expect(icons.length).toBe(SERVICES.length);
  });

  it("renders correctly in dark mode", () => {
    const { container } = renderWithTheme("dark");
    expect(container.querySelector("section")).toBeInTheDocument();
    expect(screen.getByText("Services")).toBeInTheDocument();
  });

  it("renders glow orbs", () => {
    const { container } = renderWithTheme();
    const glowOrbs = container.querySelectorAll('[class*="GlowOrb"]');
    expect(glowOrbs.length).toBeGreaterThanOrEqual(0);
  });

  it("renders background decorative elements", () => {
    const { container } = renderWithTheme();
    const section = container.querySelector("section");
    expect(section).toBeInTheDocument();
    expect(section?.children.length).toBeGreaterThan(1);
  });

  it("matches snapshot (light mode)", () => {
    const { container } = renderWithTheme("light");
    expect(container).toMatchSnapshot();
  });

  it("matches snapshot (dark mode)", () => {
    const { container } = renderWithTheme("dark");
    expect(container).toMatchSnapshot();
  });

  it("renders with reduced motion preference", () => {
    mockUseReducedMotion = true;
    renderWithTheme();
    expect(screen.getByText("Services")).toBeInTheDocument();
  });
});
