import React from "react";
import { render } from "@testing-library/react";
import { HeroSection } from "@/components";

describe("HeroSection", () => {
  it("renders without crashing", () => {
    const { container } = render(<HeroSection />);
    expect(container.firstChild).toBeTruthy();
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
