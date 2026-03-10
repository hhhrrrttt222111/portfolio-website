import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { ThemeProvider } from "@mui/material/styles";
import { createAppTheme } from "@/theme";
import Projects from "@/components/home/Projects/Projects";
import { PROJECTS } from "@/constants/projects";

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

const mockWindowOpen = jest.fn();
Object.defineProperty(window, "open", {
  writable: true,
  value: mockWindowOpen,
});

const renderWithTheme = (mode: "light" | "dark" = "light") =>
  render(
    <ThemeProvider theme={createAppTheme(mode)}>
      <Projects />
    </ThemeProvider>,
  );

describe("Projects", () => {
  beforeEach(() => {
    mockWindowOpen.mockClear();
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
    expect(section).toHaveAttribute("id", "projects");
  });

  it("renders the section title", () => {
    renderWithTheme();
    expect(screen.getByText("Projects")).toBeInTheDocument();
  });

  it("renders the section subtitle", () => {
    renderWithTheme();
    expect(
      screen.getByText("// A collection of my recent work and experiments"),
    ).toBeInTheDocument();
  });

  it("renders all project cards", () => {
    renderWithTheme();
    PROJECTS.forEach((project) => {
      expect(screen.getByText(project.title)).toBeInTheDocument();
    });
  });

  it("renders project descriptions", () => {
    renderWithTheme();
    PROJECTS.forEach((project) => {
      expect(screen.getByText(project.description)).toBeInTheDocument();
    });
  });

  it("renders project tags", () => {
    renderWithTheme();
    PROJECTS.forEach((project) => {
      project.tags.forEach((tag) => {
        expect(screen.getAllByText(tag).length).toBeGreaterThanOrEqual(1);
      });
    });
  });

  it("renders project numbers", () => {
    const { container } = renderWithTheme();
    const projectNumbers = container.querySelectorAll(".project-number");
    expect(projectNumbers.length).toBe(PROJECTS.length);
  });

  it("renders GitHub links for each project", () => {
    renderWithTheme();
    const githubLinks = screen.getAllByText("View on GitHub");
    expect(githubLinks.length).toBe(PROJECTS.length);
  });

  it("opens GitHub link when project card is clicked", () => {
    renderWithTheme();
    const firstProjectCard = screen.getByLabelText(`View ${PROJECTS[0].title} on GitHub`);
    fireEvent.click(firstProjectCard);
    expect(mockWindowOpen).toHaveBeenCalledWith(
      PROJECTS[0].githubUrl,
      "_blank",
      "noopener,noreferrer",
    );
  });

  it("opens GitHub link when Enter key is pressed on project card", () => {
    renderWithTheme();
    const firstProjectCard = screen.getByLabelText(`View ${PROJECTS[0].title} on GitHub`);
    fireEvent.keyDown(firstProjectCard, { key: "Enter" });
    expect(mockWindowOpen).toHaveBeenCalledWith(
      PROJECTS[0].githubUrl,
      "_blank",
      "noopener,noreferrer",
    );
  });

  it("opens GitHub link when Space key is pressed on project card", () => {
    renderWithTheme();
    const firstProjectCard = screen.getByLabelText(`View ${PROJECTS[0].title} on GitHub`);
    fireEvent.keyDown(firstProjectCard, { key: " " });
    expect(mockWindowOpen).toHaveBeenCalledWith(
      PROJECTS[0].githubUrl,
      "_blank",
      "noopener,noreferrer",
    );
  });

  it("renders correctly in dark mode", () => {
    const { container } = renderWithTheme("dark");
    expect(container.querySelector("section")).toBeInTheDocument();
    expect(screen.getByText("Projects")).toBeInTheDocument();
  });

  it("project cards have correct accessibility attributes", () => {
    renderWithTheme();
    PROJECTS.forEach((project) => {
      const card = screen.getByLabelText(`View ${project.title} on GitHub`);
      expect(card).toHaveAttribute("role", "button");
      expect(card).toHaveAttribute("tabIndex", "0");
    });
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
    expect(screen.getByText("Projects")).toBeInTheDocument();
  });

  it("does not open link for other keys", () => {
    renderWithTheme();
    const firstProjectCard = screen.getByLabelText(`View ${PROJECTS[0].title} on GitHub`);
    fireEvent.keyDown(firstProjectCard, { key: "Tab" });
    expect(mockWindowOpen).not.toHaveBeenCalled();
  });
});
