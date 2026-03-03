import React from "react";
import { render, screen } from "@testing-library/react";
import { Services } from "../../../src/components";

describe("Services", () => {
  it("renders without crashing", () => {
    render(<Services />);
    expect(screen.getByText("Services")).toBeInTheDocument();
  });

  it("renders a section element", () => {
    const { container } = render(<Services />);
    expect(container.querySelector("section")).toBeInTheDocument();
  });

  it("matches snapshot", () => {
    const { container } = render(<Services />);
    expect(container).toMatchSnapshot();
  });
});
