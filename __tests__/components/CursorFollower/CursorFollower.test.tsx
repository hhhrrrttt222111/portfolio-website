import React from "react";
import { render, screen } from "@testing-library/react";
import { CursorFollower } from "../../../src/components";

describe("CursorFollower", () => {
  it("renders without crashing", () => {
    render(<CursorFollower />);
    expect(screen.getByText("CursorFollower")).toBeInTheDocument();
  });

  it("renders a div element", () => {
    const { container } = render(<CursorFollower />);
    expect(container.firstChild).toBeInstanceOf(HTMLDivElement);
  });

  it("matches snapshot", () => {
    const { container } = render(<CursorFollower />);
    expect(container).toMatchSnapshot();
  });
});
