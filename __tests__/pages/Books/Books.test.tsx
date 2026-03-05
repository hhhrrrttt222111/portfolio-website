import React from "react";
import { render, screen } from "@testing-library/react";
import { ThemeProvider } from "@mui/material/styles";
import { MemoryRouter } from "react-router-dom";
import { createAppTheme } from "@/theme";
import { Books } from "@/pages";

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
  "filter",
  "layout",
]);

const filterProps = (props: Record<string, unknown>) =>
  Object.fromEntries(Object.entries(props).filter(([key]) => !FRAMER_PROPS.has(key)));

const mockMotionValue = (initial: number) => ({
  get: () => initial,
  set: () => {},
  subscribe: () => () => {},
  onChange: () => () => {},
  on: () => () => {},
});

jest.mock("framer-motion", () => ({
  motion: {
    div: React.forwardRef<HTMLDivElement, Record<string, unknown>>((props, ref) => (
      <div ref={ref} {...filterProps(props)} />
    )),
    path: (props: Record<string, unknown>) => <path {...filterProps(props)} />,
    span: React.forwardRef<HTMLSpanElement, Record<string, unknown>>((props, ref) => (
      <span ref={ref} {...filterProps(props)} />
    )),
  },
  useReducedMotion: () => false,
  useMotionValue: (initial: number) => mockMotionValue(initial),
  useSpring: (source: unknown) => source,
  useScroll: () => ({ scrollYProgress: mockMotionValue(0) }),
  useTransform: () => mockMotionValue(0),
  AnimatePresence: ({ children }: { children: React.ReactNode }) => <>{children}</>,
  useInView: () => true,
}));

jest.mock("@/hooks/useGoodreadsData", () => ({
  __esModule: true,
  default: () => ({
    books: [
      {
        title: "Atomic Habits",
        author: "James Clear",
        cover: "https://example.com/cover.jpg",
        rating: 5,
        avgRating: 4.35,
        readDate: "2025-01-12",
        link: "https://goodreads.com/book/1",
      },
    ],
    loading: false,
    error: null,
  }),
}));

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

const renderBooks = (mode: "light" | "dark" = "light") =>
  render(
    <ThemeProvider theme={createAppTheme(mode)}>
      <MemoryRouter>
        <Books />
      </MemoryRouter>
    </ThemeProvider>,
  );

describe("Books Page", () => {
  it("renders without crashing", () => {
    const { container } = renderBooks();
    expect(container.firstChild).toBeTruthy();
  });

  it("renders the hero section", () => {
    renderBooks();
    expect(screen.getByTestId("books-hero")).toBeInTheDocument();
  });

  it("renders the page title", () => {
    renderBooks();
    expect(screen.getByText("My Reading Library")).toBeInTheDocument();
  });

  it("renders the filters", () => {
    renderBooks();
    expect(screen.getByTestId("book-filters")).toBeInTheDocument();
  });

  it("renders the search input", () => {
    renderBooks();
    expect(screen.getByPlaceholderText("Search by title or author...")).toBeInTheDocument();
  });

  it("displays books from hook", () => {
    renderBooks();
    expect(screen.getByText("Atomic Habits")).toBeInTheDocument();
  });

  it("renders the navbar", () => {
    renderBooks();
    expect(screen.getByText("HRT")).toBeInTheDocument();
  });

  it("renders the footer", () => {
    renderBooks();
    expect(screen.getByTestId("footer")).toBeInTheDocument();
  });

  it("renders correctly in dark mode", () => {
    renderBooks("dark");
    expect(screen.getByText("Atomic Habits")).toBeInTheDocument();
  });

  it("matches snapshot (light mode)", () => {
    const { container } = renderBooks("light");
    expect(container).toMatchSnapshot();
  });

  it("matches snapshot (dark mode)", () => {
    const { container } = renderBooks("dark");
    expect(container).toMatchSnapshot();
  });
});
