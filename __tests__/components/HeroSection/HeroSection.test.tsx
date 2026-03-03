import React from "react";
import { render, screen } from "@testing-library/react";
import { HeroSection } from "../../../src/components";

describe("HeroSection", () => {
  it("renders without crashing", () => {
    render(<HeroSection />);
    expect(screen.getByText("HeroSection")).toBeInTheDocument();
  });

  it("renders a section element", () => {
    const { container } = render(<HeroSection />);
    expect(container.querySelector("section")).toBeInTheDocument();
  });

  it("matches snapshot", () => {
    const { container } = render(<HeroSection />);
    expect(container).toMatchSnapshot();
  });
});
