import React from "react";
import { render, screen } from "@testing-library/react";
import { ThemeProvider } from "@mui/material/styles";
import { createAppTheme } from "@/theme";
import BookCard from "@/components/books/BookCard/BookCard";
import type { Book } from "@/types";

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
  "layout",
]);

const filterProps = (props: Record<string, unknown>) =>
  Object.fromEntries(Object.entries(props).filter(([key]) => !FRAMER_PROPS.has(key)));

jest.mock("framer-motion", () => ({
  motion: {
    div: React.forwardRef<HTMLDivElement, Record<string, unknown>>((props, ref) => (
      <div ref={ref} {...filterProps(props)} />
    )),
    span: React.forwardRef<HTMLSpanElement, Record<string, unknown>>((props, ref) => (
      <span ref={ref} {...filterProps(props)} />
    )),
  },
  useReducedMotion: () => false,
  AnimatePresence: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}));

const mockBook: Book = {
  title: "Atomic Habits",
  author: "James Clear",
  cover: "https://example.com/cover.jpg",
  rating: 5,
  avgRating: 4.35,
  readDate: "2025-01-12",
  link: "https://goodreads.com/book/123",
};

const renderComponent = (book: Book = mockBook, mode: "light" | "dark" = "light") =>
  render(
    <ThemeProvider theme={createAppTheme(mode)}>
      <BookCard book={book} />
    </ThemeProvider>,
  );

describe("BookCard", () => {
  it("renders without crashing", () => {
    const { container } = renderComponent();
    expect(container.firstChild).toBeTruthy();
  });

  it("renders with test id", () => {
    renderComponent();
    expect(screen.getByTestId("book-card")).toBeInTheDocument();
  });

  it("renders the book title", () => {
    renderComponent();
    expect(screen.getByText("Atomic Habits")).toBeInTheDocument();
  });

  it("renders the author name", () => {
    renderComponent();
    expect(screen.getByText("James Clear")).toBeInTheDocument();
  });

  it("renders the read date formatted", () => {
    renderComponent();
    expect(screen.getByText("Jan 2025")).toBeInTheDocument();
  });

  it("has accessible link role", () => {
    renderComponent();
    const card = screen.getByTestId("book-card");
    expect(card).toHaveAttribute("role", "link");
    expect(card).toHaveAttribute("aria-label", "Atomic Habits by James Clear on Goodreads");
  });

  it("renders cover image with lazy loading", () => {
    renderComponent();
    const img = screen.getByAltText("Cover of Atomic Habits");
    expect(img).toHaveAttribute("loading", "lazy");
    expect(img).toHaveAttribute("src", "https://example.com/cover.jpg");
  });

  it("renders 5 star icons", () => {
    const { container } = renderComponent();
    const stars = container.querySelectorAll("svg");
    expect(stars).toHaveLength(5);
  });

  it("renders placeholder when cover is empty", () => {
    renderComponent({ ...mockBook, cover: "" });
    expect(screen.getByText("📖")).toBeInTheDocument();
  });

  it("renders correctly in dark mode", () => {
    renderComponent(mockBook, "dark");
    expect(screen.getByText("Atomic Habits")).toBeInTheDocument();
  });

  it("matches snapshot (light mode)", () => {
    const { container } = renderComponent(mockBook, "light");
    expect(container).toMatchSnapshot();
  });

  it("matches snapshot (dark mode)", () => {
    const { container } = renderComponent(mockBook, "dark");
    expect(container).toMatchSnapshot();
  });
});
