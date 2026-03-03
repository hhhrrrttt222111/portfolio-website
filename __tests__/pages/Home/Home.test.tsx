import React from "react";
import { render, screen } from "@testing-library/react";
import { Home } from "../../../src/pages";

describe("Home", () => {
  it("renders all components", () => {
    const { container } = render(<Home />);
    expect(screen.getByText("Portfolio")).toBeInTheDocument();
    expect(container.querySelectorAll("section").length).toBeGreaterThanOrEqual(1);
    expect(screen.getByText("Footer")).toBeInTheDocument();
  });

  it("matches snapshot", () => {
    const { container } = render(<Home />);
    expect(container).toMatchSnapshot();
  });
});
