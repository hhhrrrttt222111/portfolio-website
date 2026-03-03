import React from "react";
import { render, screen } from "@testing-library/react";
import { Home } from "../../../src/pages";

describe("Home", () => {
  it("renders all components", () => {
    render(<Home />);
    expect(screen.getByText("Navbar")).toBeInTheDocument();
    expect(screen.getByText("HeroSection")).toBeInTheDocument();
    expect(screen.getByText("Services")).toBeInTheDocument();
    expect(screen.getByText("TechStack")).toBeInTheDocument();
    expect(screen.getByText("Projects")).toBeInTheDocument();
    expect(screen.getByText("BlogPreview")).toBeInTheDocument();
    expect(screen.getByText("Footer")).toBeInTheDocument();
    expect(screen.getByText("CursorFollower")).toBeInTheDocument();
  });

  it("matches snapshot", () => {
    const { container } = render(<Home />);
    expect(container).toMatchSnapshot();
  });
});
