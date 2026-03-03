import React from "react";
import { render } from "@testing-library/react";
import { CursorFollower } from "@/components";

describe("CursorFollower", () => {
  it("renders without crashing", () => {
    const { container } = render(<CursorFollower />);
    expect(container.firstChild).toBeTruthy();
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
