import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import { Home } from "@/pages";

const renderApp = (initialRoute = "/") =>
  render(
    <MemoryRouter initialEntries={[initialRoute]}>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </MemoryRouter>,
  );

describe("App", () => {
  it("renders the Home page at root route", () => {
    renderApp("/");
    expect(screen.getByText("HRT")).toBeInTheDocument();
    expect(screen.getByText("Footer")).toBeInTheDocument();
  });

  it("matches snapshot", () => {
    const { container } = renderApp("/");
    expect(container).toMatchSnapshot();
  });
});
