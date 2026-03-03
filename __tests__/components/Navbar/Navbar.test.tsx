import React from "react";
import { render, screen } from "@testing-library/react";
import { Navbar } from "../../../src/components";

describe("Navbar", () => {
  it("renders without crashing", () => {
    render(<Navbar />);
    expect(screen.getByText("Navbar")).toBeInTheDocument();
  });

  it("renders a nav element", () => {
    const { container } = render(<Navbar />);
    expect(container.querySelector("nav")).toBeInTheDocument();
  });

  it("matches snapshot", () => {
    const { container } = render(<Navbar />);
    expect(container).toMatchSnapshot();
  });
});
