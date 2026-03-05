import React from "react";
import { render, screen } from "@testing-library/react";
import { ThemeProvider } from "@mui/material/styles";
import { createAppTheme } from "@/theme";
import BookGrid from "@/components/books/BookGrid/BookGrid";
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

const mockObserve = jest.fn();
const mockDisconnect = jest.fn();

beforeEach(() => {
  global.IntersectionObserver = jest.fn(() => ({
    observe: mockObserve,
    disconnect: mockDisconnect,
    unobserve: jest.fn(),
    root: null,
    rootMargin: "",
    thresholds: [],
    takeRecords: () => [],
  })) as unknown as typeof IntersectionObserver;
});

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

const mockBooks: Book[] = [
  {
    title: "Atomic Habits",
    author: "James Clear",
    cover: "https://example.com/cover1.jpg",
    rating: 5,
    avgRating: 4.35,
    readDate: "2025-01-12",
    link: "https://goodreads.com/book/1",
  },
  {
    title: "Deep Work",
    author: "Cal Newport",
    cover: "https://example.com/cover2.jpg",
    rating: 4,
    avgRating: 4.19,
    readDate: "2025-02-20",
    link: "https://goodreads.com/book/2",
  },
];

function generateBooks(count: number): Book[] {
  return Array.from({ length: count }, (_, i) => ({
    title: `Book ${i + 1}`,
    author: `Author ${i + 1}`,
    cover: `https://example.com/cover${i}.jpg`,
    rating: (i % 5) + 1,
    avgRating: 4.0,
    readDate: `2025-01-${String(i + 1).padStart(2, "0")}`,
    link: `https://goodreads.com/book/${i}`,
  }));
}

const renderComponent = (books: Book[] = mockBooks, mode: "light" | "dark" = "light") =>
  render(
    <ThemeProvider theme={createAppTheme(mode)}>
      <BookGrid books={books} />
    </ThemeProvider>,
  );

describe("BookGrid", () => {
  it("renders without crashing", () => {
    const { container } = renderComponent();
    expect(container.firstChild).toBeTruthy();
  });

  it("renders with test id", () => {
    renderComponent();
    expect(screen.getByTestId("book-grid")).toBeInTheDocument();
  });

  it("renders all book cards", () => {
    renderComponent();
    expect(screen.getByText("Atomic Habits")).toBeInTheDocument();
    expect(screen.getByText("Deep Work")).toBeInTheDocument();
  });

  it("renders correct number of cards", () => {
    renderComponent();
    const cards = screen.getAllByTestId("book-card");
    expect(cards).toHaveLength(2);
  });

  it("shows empty state when no books", () => {
    renderComponent([]);
    expect(screen.getByTestId("empty-state")).toBeInTheDocument();
    expect(screen.getByText("No books found")).toBeInTheDocument();
    expect(screen.getByText(/Try adjusting/)).toBeInTheDocument();
  });

  it("shows empty state icon", () => {
    renderComponent([]);
    expect(screen.getByText("📚")).toBeInTheDocument();
  });

  it("only renders first page of books initially", () => {
    renderComponent(generateBooks(30));
    const cards = screen.getAllByTestId("book-card");
    expect(cards).toHaveLength(20);
  });

  it("shows load-more sentinel when more books exist", () => {
    renderComponent(generateBooks(30));
    expect(screen.getByTestId("load-more-sentinel")).toBeInTheDocument();
  });

  it("does not show sentinel when all books visible", () => {
    renderComponent(generateBooks(5));
    expect(screen.queryByTestId("load-more-sentinel")).not.toBeInTheDocument();
  });

  it("sets up IntersectionObserver for lazy loading", () => {
    renderComponent(generateBooks(30));
    expect(global.IntersectionObserver).toHaveBeenCalled();
    expect(mockObserve).toHaveBeenCalled();
  });

  it("renders correctly in dark mode", () => {
    renderComponent(mockBooks, "dark");
    expect(screen.getByText("Atomic Habits")).toBeInTheDocument();
  });

  it("matches snapshot (light mode)", () => {
    const { container } = renderComponent(mockBooks, "light");
    expect(container).toMatchSnapshot();
  });

  it("matches snapshot (dark mode)", () => {
    const { container } = renderComponent(mockBooks, "dark");
    expect(container).toMatchSnapshot();
  });

  it("matches snapshot (empty state)", () => {
    const { container } = renderComponent([], "light");
    expect(container).toMatchSnapshot();
  });
});
