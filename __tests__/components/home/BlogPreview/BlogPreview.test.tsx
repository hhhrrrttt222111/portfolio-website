import React from "react";
import { render } from "@testing-library/react";
import { BlogPreview } from "@/components";

describe("BlogPreview", () => {
  it("renders without crashing", () => {
    const { container } = render(<BlogPreview />);
    expect(container.firstChild).toBeTruthy();
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
