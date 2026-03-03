import React from "react";
import { render, screen } from "@testing-library/react";
import { TechStack } from "../../../src/components";

describe("TechStack", () => {
  it("renders without crashing", () => {
    render(<TechStack />);
    expect(screen.getByText("TechStack")).toBeInTheDocument();
  });

  it("renders a section element", () => {
    const { container } = render(<TechStack />);
    expect(container.querySelector("section")).toBeInTheDocument();
  });

  it("matches snapshot", () => {
    const { container } = render(<TechStack />);
    expect(container).toMatchSnapshot();
  });
});
