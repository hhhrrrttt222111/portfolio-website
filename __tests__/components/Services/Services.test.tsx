import React from "react";
import { render } from "@testing-library/react";
import { Services } from "../../../src/components";

describe("Services", () => {
  it("renders without crashing", () => {
    const { container } = render(<Services />);
    expect(container.firstChild).toBeTruthy();
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
