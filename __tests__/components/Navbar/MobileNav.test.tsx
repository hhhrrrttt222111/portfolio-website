import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import MobileNav from "../../../src/components/Navbar/MobileNav";

const MOCK_LINKS = [
  { label: "About", path: "/about" },
  { label: "Blog", path: "/blog" },
];

const renderMobileNav = (open = true, onClose = jest.fn()) =>
  render(
    <MemoryRouter>
      <MobileNav open={open} onClose={onClose} links={MOCK_LINKS} />
    </MemoryRouter>,
  );

describe("MobileNav", () => {
  it("renders without crashing when open", () => {
    renderMobileNav();
    expect(screen.getByText("HRT")).toBeInTheDocument();
  });

  it("renders all nav links", () => {
    renderMobileNav();
    MOCK_LINKS.forEach((link) => {
      expect(screen.getByText(link.label)).toBeInTheDocument();
    });
  });

  it("renders the Contact Me link", () => {
    renderMobileNav();
    expect(screen.getByRole("link", { name: /contact me/i })).toBeInTheDocument();
  });

  it("renders the close button", () => {
    renderMobileNav();
    expect(screen.getByRole("button", { name: /close menu/i })).toBeInTheDocument();
  });

  it("calls onClose when close button is clicked", () => {
    const onClose = jest.fn();
    renderMobileNav(true, onClose);
    fireEvent.click(screen.getByRole("button", { name: /close menu/i }));
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("calls onClose when a nav link is clicked", () => {
    const onClose = jest.fn();
    renderMobileNav(true, onClose);
    fireEvent.click(screen.getByText("About"));
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("calls onClose when Contact Me link is clicked", () => {
    const onClose = jest.fn();
    renderMobileNav(true, onClose);
    fireEvent.click(screen.getByRole("link", { name: /contact me/i }));
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("does not render content when closed", () => {
    renderMobileNav(false);
    expect(screen.queryByText("HRT")).not.toBeInTheDocument();
  });

  it("matches snapshot", () => {
    const { baseElement } = renderMobileNav();
    expect(baseElement).toMatchSnapshot();
  });
});
