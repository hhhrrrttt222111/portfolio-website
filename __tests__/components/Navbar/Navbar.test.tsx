import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { Navbar } from "@/components";
import { NAV_LINKS, LOGO_TEXT, CTA_LINK } from "@/constants";

const theme = createTheme();

const renderNavbar = (initialRoute = "/") =>
  render(
    <ThemeProvider theme={theme}>
      <MemoryRouter initialEntries={[initialRoute]}>
        <Navbar />
      </MemoryRouter>
    </ThemeProvider>,
  );

const mockMatchMedia = (matches: boolean) => {
  Object.defineProperty(window, "matchMedia", {
    writable: true,
    value: jest.fn().mockImplementation((query) => ({
      matches,
      media: query,
      onchange: null,
      addListener: jest.fn(),
      removeListener: jest.fn(),
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    })),
  });
};

describe("Navbar", () => {
  beforeEach(() => {
    mockMatchMedia(false);
  });

  it("renders without crashing", () => {
    renderNavbar();
    expect(screen.getByText(LOGO_TEXT)).toBeInTheDocument();
  });

  it("renders a header element", () => {
    const { container } = renderNavbar();
    expect(container.querySelector("header")).toBeInTheDocument();
  });

  it("renders all navigation links from constants", () => {
    renderNavbar();
    NAV_LINKS.forEach((link) => {
      expect(screen.getByRole("link", { name: link.label })).toBeInTheDocument();
    });
  });

  it("renders the CTA button", () => {
    renderNavbar();
    expect(screen.getByRole("link", { name: CTA_LINK.label })).toBeInTheDocument();
  });

  it("logo links to home page", () => {
    renderNavbar();
    const logo = screen.getByRole("link", { name: LOGO_TEXT });
    expect(logo).toHaveAttribute("href", "/");
  });

  it("navigation links have correct href attributes", () => {
    renderNavbar();
    NAV_LINKS.forEach((link) => {
      const navLink = screen.getByRole("link", { name: link.label });
      expect(navLink).toHaveAttribute("href", link.path);
    });
  });

  it("CTA button has correct href", () => {
    renderNavbar();
    const ctaButton = screen.getByRole("link", { name: CTA_LINK.label });
    expect(ctaButton).toHaveAttribute("href", "/#contact");
  });

  it("CTA button scrolls to contact section on click", () => {
    const scrollToSpy = jest.fn();
    window.scrollTo = scrollToSpy;

    const contactSection = document.createElement("div");
    contactSection.id = "contact";
    document.body.appendChild(contactSection);

    renderNavbar();
    const ctaButton = screen.getByRole("link", { name: CTA_LINK.label });
    fireEvent.click(ctaButton);

    expect(scrollToSpy).toHaveBeenCalledWith(expect.objectContaining({ behavior: "smooth" }));

    document.body.removeChild(contactSection);
  });

  it("matches snapshot", () => {
    const { container } = renderNavbar();
    expect(container).toMatchSnapshot();
  });
});

describe("Navbar - Mobile", () => {
  beforeEach(() => {
    mockMatchMedia(true);
  });

  it("renders hamburger button on mobile", () => {
    renderNavbar();
    expect(screen.getByRole("button", { name: /open menu/i })).toBeInTheDocument();
  });

  it("hamburger button has correct aria attributes", () => {
    renderNavbar();
    const hamburger = screen.getByRole("button", { name: /open menu/i });
    expect(hamburger).toHaveAttribute("aria-expanded", "false");
  });

  it("opens mobile menu when hamburger is clicked", async () => {
    renderNavbar();
    const hamburger = screen.getByRole("button", { name: /open menu/i });
    fireEvent.click(hamburger);

    await waitFor(() => {
      expect(screen.getByRole("dialog")).toBeInTheDocument();
    });
  });

  it("does not render desktop nav links on mobile", () => {
    renderNavbar();
    NAV_LINKS.forEach((link) => {
      expect(screen.queryByRole("link", { name: link.label })).not.toBeInTheDocument();
    });
  });
});

describe("Navbar - Scroll behavior", () => {
  beforeEach(() => {
    mockMatchMedia(false);
  });

  it("responds to scroll events", () => {
    renderNavbar();
    Object.defineProperty(window, "scrollY", { value: 100, writable: true });
    fireEvent.scroll(window);
    expect(screen.getByText(LOGO_TEXT)).toBeInTheDocument();
  });
});

describe("Navbar - Active state", () => {
  beforeEach(() => {
    mockMatchMedia(false);
  });

  it("highlights active navigation link on About page", () => {
    renderNavbar("/about");
    const aboutLink = screen.getByRole("link", { name: "About" });
    expect(aboutLink).toBeInTheDocument();
  });

  it("highlights active navigation link on Blog page", () => {
    renderNavbar("/blog");
    const blogLink = screen.getByRole("link", { name: "Blog" });
    expect(blogLink).toBeInTheDocument();
  });

  it("renders navigation links for active route", () => {
    renderNavbar("/about");
    const links = screen.getAllByRole("link");
    expect(links.length).toBeGreaterThan(0);
    expect(screen.getByRole("link", { name: "About" })).toBeInTheDocument();
  });
});
