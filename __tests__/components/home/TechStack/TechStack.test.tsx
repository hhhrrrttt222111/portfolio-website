import React from "react";
import { render } from "@testing-library/react";
import { TechStack } from "@/components";

describe("TechStack", () => {
  it("renders without crashing", () => {
    const { container } = render(<TechStack />);
    expect(container.firstChild).toBeTruthy();
  });

  it("renders a section element", () => {
    const { container } = render(<TechStack />);
    expect(container.querySelector("section")).toBeInTheDocument();
  });

  it("matches snapshot", () => {
    const { container } = render(<TechStack />);
    expect(container).toMatchSnapshot();
  });
});
