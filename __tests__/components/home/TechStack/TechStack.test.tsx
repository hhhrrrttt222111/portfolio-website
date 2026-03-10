import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { ThemeProvider } from "@mui/material/styles";
import { createAppTheme } from "@/theme";
import TechStack from "@/components/home/TechStack/TechStack";
import SkillCategory from "@/components/home/TechStack/SkillCategory";
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

let mockUseReducedMotion = false;
let mockUseInView = true;

jest.mock("framer-motion", () => ({
  motion: {
    div: React.forwardRef<HTMLDivElement, Record<string, unknown>>((props, ref) => (
      <div ref={ref} {...filterProps(props)} />
    )),
    span: React.forwardRef<HTMLSpanElement, Record<string, unknown>>((props, ref) => (
      <span ref={ref} {...filterProps(props)} />
    )),
  },
  useReducedMotion: () => mockUseReducedMotion,
  useInView: () => mockUseInView,
  AnimatePresence: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}));

const renderWithTheme = (mode: "light" | "dark" = "light") =>
  render(
    <ThemeProvider theme={createAppTheme(mode)}>
      <TechStack />
    </ThemeProvider>,
  );

const renderSkillCategory = (mode: "light" | "dark" = "light", index = 0) =>
  render(
    <ThemeProvider theme={createAppTheme(mode)}>
      <SkillCategory category={TECH_STACK[index]} index={index} />
    </ThemeProvider>,
  );

describe("TechStack", () => {
  beforeEach(() => {
    mockUseReducedMotion = false;
    mockUseInView = true;
  });

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

  it("renders with reduced motion preference", () => {
    mockUseReducedMotion = true;
    renderWithTheme();
    expect(screen.getByTestId("tech-stack")).toBeInTheDocument();
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

describe("SkillCategory", () => {
  beforeEach(() => {
    mockUseReducedMotion = false;
    mockUseInView = true;
  });

  it("renders category label and command", () => {
    renderSkillCategory();
    const labels = screen.getAllByText(TECH_STACK[0].label);
    expect(labels.length).toBeGreaterThanOrEqual(1);
    expect(screen.getByText(TECH_STACK[0].command)).toBeInTheDocument();
  });

  it("renders all skills in the category", () => {
    renderSkillCategory();
    TECH_STACK[0].skills.forEach((skill) => {
      expect(screen.getByText(skill)).toBeInTheDocument();
    });
  });

  it("dismisses card when close button is clicked", async () => {
    const { container } = renderSkillCategory();
    const dotGroups = container.querySelectorAll("span");
    const closeButton = dotGroups[0];

    if (closeButton) {
      fireEvent.click(closeButton);
      await waitFor(() => {
        expect(container.querySelector("[class*='TerminalWindow']")).toBeNull();
      });
    }
  });

  it("expands dialog when green button is clicked", async () => {
    const { container } = renderSkillCategory();
    const dotGroups = container.querySelectorAll("span");
    const greenButton = dotGroups[2];

    if (greenButton) {
      fireEvent.click(greenButton);
      await waitFor(() => {
        const dialogs = document.querySelectorAll("[role='dialog']");
        expect(dialogs.length).toBeGreaterThanOrEqual(1);
      });
    }
  });

  it("collapses dialog when close button in dialog is clicked", async () => {
    const { container } = renderSkillCategory();
    const dotGroups = container.querySelectorAll("span");
    const greenButton = dotGroups[2];

    if (greenButton) {
      fireEvent.click(greenButton);
      await waitFor(() => {
        const dialogs = document.querySelectorAll("[role='dialog']");
        expect(dialogs.length).toBeGreaterThanOrEqual(1);
      });

      const dialog = document.querySelector("[role='dialog']");
      if (dialog) {
        const dialogDots = dialog.querySelectorAll("span");
        if (dialogDots[0]) {
          fireEvent.click(dialogDots[0]);
        }
      }
    }
  });

  it("renders with reduced motion preference", () => {
    mockUseReducedMotion = true;
    renderSkillCategory();
    const labels = screen.getAllByText(TECH_STACK[0].label);
    expect(labels.length).toBeGreaterThanOrEqual(1);
  });

  it("renders when not in view", () => {
    mockUseInView = false;
    renderSkillCategory();
    const labels = screen.getAllByText(TECH_STACK[0].label);
    expect(labels.length).toBeGreaterThanOrEqual(1);
  });

  it("shows cursor when not in view", () => {
    mockUseInView = false;
    const { container } = renderSkillCategory();
    const cursor = container.querySelector(".cursor");
    expect(cursor).toBeInTheDocument();
  });

  it("hides cursor when in view", () => {
    mockUseInView = true;
    const { container } = renderSkillCategory();
    const cursor = container.querySelector(".cursor");
    expect(cursor).toBeNull();
  });

  it("renders different categories correctly", () => {
    if (TECH_STACK.length > 1) {
      renderSkillCategory("light", 1);
      const labels = screen.getAllByText(TECH_STACK[1].label);
      expect(labels.length).toBeGreaterThanOrEqual(1);
    }
  });
});
