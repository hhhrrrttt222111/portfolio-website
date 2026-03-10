import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import MobileNav from "@/components/Navbar/MobileNav";
import { NAV_LINKS, LOGO_TEXT, CTA_LINK } from "@/constants";

const theme = createTheme();

const renderMobileNav = (
  onClose = jest.fn(),
  initialRoute = "/",
  onContactClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void,
) =>
  render(
    <ThemeProvider theme={theme}>
      <MemoryRouter initialEntries={[initialRoute]}>
        <MobileNav onClose={onClose} links={[...NAV_LINKS]} onContactClick={onContactClick} />
      </MemoryRouter>
    </ThemeProvider>,
  );

describe("MobileNav", () => {
  it("renders without crashing", () => {
    renderMobileNav();
    expect(screen.getByText(LOGO_TEXT)).toBeInTheDocument();
  });

  it("renders all nav links from constants", () => {
    renderMobileNav();
    NAV_LINKS.forEach((link) => {
      expect(screen.getByText(link.label)).toBeInTheDocument();
    });
  });

  it("renders the Contact Me link", () => {
    renderMobileNav();
    expect(screen.getByRole("link", { name: CTA_LINK.label })).toBeInTheDocument();
  });

  it("renders the close button", () => {
    renderMobileNav();
    expect(screen.getByRole("button", { name: /close menu/i })).toBeInTheDocument();
  });

  it("calls onClose when close button is clicked", () => {
    const onClose = jest.fn();
    renderMobileNav(onClose);
    fireEvent.click(screen.getByRole("button", { name: /close menu/i }));
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("calls onClose when a nav link is clicked", () => {
    const onClose = jest.fn();
    renderMobileNav(onClose);
    fireEvent.click(screen.getByText("About"));
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("calls onClose when Contact Me link is clicked", () => {
    const onClose = jest.fn();
    renderMobileNav(onClose);
    fireEvent.click(screen.getByRole("link", { name: CTA_LINK.label }));
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("calls onClose when overlay is clicked", () => {
    const onClose = jest.fn();
    const { container } = renderMobileNav(onClose);
    const overlay = container.querySelector('[aria-hidden="true"]');
    if (overlay) {
      fireEvent.click(overlay);
      expect(onClose).toHaveBeenCalledTimes(1);
    }
  });

  it("calls onClose when Escape key is pressed", () => {
    const onClose = jest.fn();
    renderMobileNav(onClose);
    fireEvent.keyDown(document, { key: "Escape" });
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("has correct aria attributes for accessibility", () => {
    renderMobileNav();
    const dialog = screen.getByRole("dialog");
    expect(dialog).toHaveAttribute("aria-modal", "true");
    expect(dialog).toHaveAttribute("aria-label", "Mobile navigation menu");
  });

  it("navigation links have correct href attributes", () => {
    renderMobileNav();
    NAV_LINKS.forEach((link) => {
      const navLink = screen.getByRole("link", { name: link.label });
      expect(navLink).toHaveAttribute("href", link.path);
    });
  });

  it("CTA button has correct href", () => {
    renderMobileNav();
    const ctaButton = screen.getByRole("link", { name: CTA_LINK.label });
    expect(ctaButton).toHaveAttribute("href", "/#contact");
  });

  it("calls onContactClick when Contact Me link is clicked", () => {
    const onClose = jest.fn();
    const onContactClick = jest.fn();
    renderMobileNav(onClose, "/", onContactClick);
    fireEvent.click(screen.getByRole("link", { name: CTA_LINK.label }));
    expect(onContactClick).toHaveBeenCalledTimes(1);
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("shows active indicator for current route", async () => {
    renderMobileNav(jest.fn(), "/about");
    const aboutLink = screen.getByRole("link", { name: "About" });
    await waitFor(() => {
      expect(aboutLink).toHaveAttribute("aria-current", "page");
    });
  });

  it("sets body overflow to hidden when mounted", () => {
    renderMobileNav();
    expect(document.body.style.overflow).toBe("hidden");
  });

  it("matches snapshot", () => {
    const { baseElement } = renderMobileNav();
    expect(baseElement).toMatchSnapshot();
  });
});
