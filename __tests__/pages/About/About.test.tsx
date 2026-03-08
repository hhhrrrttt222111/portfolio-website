import React from "react";
import { render, screen } from "@testing-library/react";
import { ThemeProvider } from "@mui/material/styles";
import { MemoryRouter } from "react-router-dom";
import { createAppTheme } from "@/theme";
import { About } from "@/pages";

const renderAbout = (mode: "light" | "dark" = "light") =>
  render(
    <ThemeProvider theme={createAppTheme(mode)}>
      <MemoryRouter>
        <About />
      </MemoryRouter>
    </ThemeProvider>,
  );

describe("About Page", () => {
  it("renders without crashing", () => {
    const { container } = renderAbout();
    expect(container.firstChild).toBeTruthy();
  });

  it("renders the hero section with heading", () => {
    renderAbout();
    expect(screen.getByText(/I'm Hemanth/)).toBeInTheDocument();
  });

  it("renders the education section", () => {
    renderAbout();
    expect(screen.getByText("Education")).toBeInTheDocument();
    expect(screen.getByTestId("education-section")).toBeInTheDocument();
  });

  it("renders the experience section", () => {
    renderAbout();
    expect(screen.getByText("Experience")).toBeInTheDocument();
    expect(screen.getByTestId("experience-section")).toBeInTheDocument();
  });

  it("renders the philosophy section", () => {
    renderAbout();
    expect(screen.getByText("Great")).toBeInTheDocument();
    expect(screen.getByText("crafted")).toBeInTheDocument();
    expect(screen.getByTestId("philosophy-section")).toBeInTheDocument();
  });

  it("renders the navbar", () => {
    renderAbout();
    expect(screen.getByText("HRT")).toBeInTheDocument();
  });

  it("renders the footer", () => {
    renderAbout();
    expect(screen.getByTestId("footer")).toBeInTheDocument();
  });

  it("renders all four sections", () => {
    const { container } = renderAbout();
    const sections = container.querySelectorAll("section");
    expect(sections.length).toBeGreaterThanOrEqual(4);
  });

  it("renders reading links", () => {
    renderAbout();
    expect(screen.getByText(/My Reading List/)).toBeInTheDocument();
  });

  it("renders education institutions", () => {
    renderAbout();
    expect(screen.getByText("Model Engineering College, Thrikkakara")).toBeInTheDocument();
    expect(screen.getByText("Bhavans Vidya Mandir, Eroor")).toBeInTheDocument();
  });

  it("renders correctly in dark mode", () => {
    const { container } = renderAbout("dark");
    expect(container.querySelectorAll("section").length).toBeGreaterThanOrEqual(4);
    expect(screen.getByText(/I'm Hemanth/)).toBeInTheDocument();
  });

  it("matches snapshot (light mode)", () => {
    const { container } = renderAbout("light");
    expect(container).toMatchSnapshot();
  });

  it("matches snapshot (dark mode)", () => {
    const { container } = renderAbout("dark");
    expect(container).toMatchSnapshot();
  });
});
