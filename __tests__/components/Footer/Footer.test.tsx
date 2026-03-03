import React from "react";
import { render, screen } from "@testing-library/react";
import { Footer } from "../../../src/components";

describe("Footer", () => {
  it("renders without crashing", () => {
    render(<Footer />);
    expect(screen.getByText("Footer")).toBeInTheDocument();
  });

  it("renders a footer element", () => {
    const { container } = render(<Footer />);
    expect(container.querySelector("footer")).toBeInTheDocument();
  });

  it("matches snapshot", () => {
    const { container } = render(<Footer />);
    expect(container).toMatchSnapshot();
  });
});
