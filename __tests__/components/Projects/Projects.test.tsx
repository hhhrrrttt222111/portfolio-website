import React from "react";
import { render, screen } from "@testing-library/react";
import { Projects } from "../../../src/components";

describe("Projects", () => {
  it("renders without crashing", () => {
    render(<Projects />);
    expect(screen.getByText("Projects")).toBeInTheDocument();
  });

  it("renders a section element", () => {
    const { container } = render(<Projects />);
    expect(container.querySelector("section")).toBeInTheDocument();
  });

  it("matches snapshot", () => {
    const { container } = render(<Projects />);
    expect(container).toMatchSnapshot();
  });
});
