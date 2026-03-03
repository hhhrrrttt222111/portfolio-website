import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { Home } from "@/pages";

const renderHome = () =>
  render(
    <MemoryRouter>
      <Home />
    </MemoryRouter>,
  );

describe("Home", () => {
  it("renders all components", () => {
    const { container } = renderHome();
    expect(screen.getByText("HRT")).toBeInTheDocument();
    expect(container.querySelectorAll("section").length).toBeGreaterThanOrEqual(1);
    expect(screen.getByText("Footer")).toBeInTheDocument();
  });

  it("matches snapshot", () => {
    const { container } = renderHome();
    expect(container).toMatchSnapshot();
  });
});
