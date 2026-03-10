import React from "react";
import { render, screen } from "@testing-library/react";
import { ThemeProvider } from "@mui/material/styles";
import { createAppTheme } from "@/theme";
import BooksHero from "@/components/books/BooksHero/BooksHero";

const FRAMER_PROPS = new Set([
  "initial",
  "animate",
  "exit",
  "variants",
  "transition",
  "whileHover",
  "whileInView",
  "whileTap",
  "viewport",
  "onMouseMove",
  "onMouseLeave",
  "custom",
]);

const filterProps = (props: Record<string, unknown>) =>
  Object.fromEntries(Object.entries(props).filter(([key]) => !FRAMER_PROPS.has(key)));

let mockUseReducedMotion = false;

jest.mock("framer-motion", () => ({
  motion: {
    div: React.forwardRef<HTMLDivElement, Record<string, unknown>>((props, ref) => (
      <div ref={ref} {...filterProps(props)} />
    )),
  },
  useReducedMotion: () => mockUseReducedMotion,
}));

const INSTAGRAM_URL = "https://www.instagram.com/bibliosmia.brews/";

const renderComponent = (bookCount = 10, mode: "light" | "dark" = "light") =>
  render(
    <ThemeProvider theme={createAppTheme(mode)}>
      <BooksHero bookCount={bookCount} />
    </ThemeProvider>,
  );

describe("BooksHero", () => {
  beforeEach(() => {
    mockUseReducedMotion = false;
  });
  it("renders without crashing", () => {
    const { container } = renderComponent();
    expect(container.firstChild).toBeTruthy();
  });

  it("renders a section element", () => {
    const { container } = renderComponent();
    expect(container.querySelector("section")).toBeInTheDocument();
  });

  it("renders with test id", () => {
    renderComponent();
    expect(screen.getByTestId("books-hero")).toBeInTheDocument();
  });

  it("renders the page title", () => {
    renderComponent();
    expect(screen.getByText("My Reading Library")).toBeInTheDocument();
  });

  it("renders the subtitle", () => {
    renderComponent();
    expect(screen.getByText(/collection of books/)).toBeInTheDocument();
  });

  it("renders the book count number", () => {
    renderComponent(10);
    expect(screen.getByText("10")).toBeInTheDocument();
  });

  it("renders the book count label", () => {
    renderComponent(10);
    expect(screen.getByText("books read")).toBeInTheDocument();
  });

  it("renders different book count", () => {
    renderComponent(42);
    expect(screen.getByText("42")).toBeInTheDocument();
  });

  it("renders the Instagram link", () => {
    renderComponent();
    const instagramLink = screen.getByRole("link", { name: /follow.*instagram/i });
    expect(instagramLink).toBeInTheDocument();
    expect(instagramLink).toHaveAttribute("href", INSTAGRAM_URL);
  });

  it("Instagram link opens in new tab", () => {
    renderComponent();
    const instagramLink = screen.getByRole("link", { name: /follow.*instagram/i });
    expect(instagramLink).toHaveAttribute("target", "_blank");
    expect(instagramLink).toHaveAttribute("rel", "noopener noreferrer");
  });

  it("renders Instagram link text", () => {
    renderComponent();
    expect(screen.getByText("Follow for book updates")).toBeInTheDocument();
  });

  it("renders correctly in dark mode", () => {
    renderComponent(10, "dark");
    expect(screen.getByText("My Reading Library")).toBeInTheDocument();
  });

  it("matches snapshot (light mode)", () => {
    const { container } = renderComponent(10, "light");
    expect(container).toMatchSnapshot();
  });

  it("matches snapshot (dark mode)", () => {
    const { container } = renderComponent(10, "dark");
    expect(container).toMatchSnapshot();
  });

  it("renders with reduced motion preference", () => {
    mockUseReducedMotion = true;
    renderComponent();
    expect(screen.getByText("My Reading Library")).toBeInTheDocument();
  });
});
