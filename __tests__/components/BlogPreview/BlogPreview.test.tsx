import React from "react";
import { render, screen } from "@testing-library/react";
import { BlogPreview } from "../../../src/components";

describe("BlogPreview", () => {
  it("renders without crashing", () => {
    render(<BlogPreview />);
    expect(screen.getByText("BlogPreview")).toBeInTheDocument();
  });

  it("renders a section element", () => {
    const { container } = render(<BlogPreview />);
    expect(container.querySelector("section")).toBeInTheDocument();
  });

  it("matches snapshot", () => {
    const { container } = render(<BlogPreview />);
    expect(container).toMatchSnapshot();
  });
});
