import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { Navbar } from "../../../src/components";

const renderNavbar = () =>
  render(
    <MemoryRouter>
      <Navbar />
    </MemoryRouter>,
  );

describe("Navbar", () => {
  it("renders without crashing", () => {
    renderNavbar();
    expect(screen.getByText("HRT")).toBeInTheDocument();
  });

  it("renders a header element", () => {
    const { container } = renderNavbar();
    expect(container.querySelector("header")).toBeInTheDocument();
  });

  it("matches snapshot", () => {
    const { container } = renderNavbar();
    expect(container).toMatchSnapshot();
  });
});
