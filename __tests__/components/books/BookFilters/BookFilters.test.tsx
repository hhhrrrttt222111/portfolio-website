import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { ThemeProvider } from "@mui/material/styles";
import { createAppTheme } from "@/theme";
import BookFilters from "@/components/books/BookFilters/BookFilters";

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
  },
  AnimatePresence: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}));

const defaultProps = {
  search: "",
  onSearchChange: jest.fn(),
  ratingFilter: null as number | null,
  onRatingFilterChange: jest.fn(),
  sortOrder: "newest" as const,
  onSortOrderChange: jest.fn(),
  resultCount: 10,
  totalCount: 10,
};

const renderComponent = (props = {}, mode: "light" | "dark" = "light") =>
  render(
    <ThemeProvider theme={createAppTheme(mode)}>
      <BookFilters {...defaultProps} {...props} />
    </ThemeProvider>,
  );

describe("BookFilters", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders without crashing", () => {
    const { container } = renderComponent();
    expect(container.firstChild).toBeTruthy();
  });

  it("renders with test id", () => {
    renderComponent();
    expect(screen.getByTestId("book-filters")).toBeInTheDocument();
  });

  it("renders search input", () => {
    renderComponent();
    expect(screen.getByPlaceholderText("Search by title or author...")).toBeInTheDocument();
  });

  it("calls onSearchChange when typing", () => {
    renderComponent();
    const input = screen.getByPlaceholderText("Search by title or author...");
    fireEvent.change(input, { target: { value: "atomic" } });
    expect(defaultProps.onSearchChange).toHaveBeenCalledWith("atomic");
  });

  it("renders rating filter chips", () => {
    renderComponent();
    expect(screen.getByText("All")).toBeInTheDocument();
    expect(screen.getByLabelText("Filter by 5 stars")).toBeInTheDocument();
    expect(screen.getByLabelText("Filter by 4 stars")).toBeInTheDocument();
    expect(screen.getByLabelText("Filter by 3 stars")).toBeInTheDocument();
  });

  it("calls onRatingFilterChange when clicking a rating chip", () => {
    renderComponent();
    fireEvent.click(screen.getByLabelText("Filter by 5 stars"));
    expect(defaultProps.onRatingFilterChange).toHaveBeenCalledWith(5);
  });

  it("calls onRatingFilterChange with null when clicking All", () => {
    renderComponent({ ratingFilter: 5 });
    fireEvent.click(screen.getByText("All"));
    expect(defaultProps.onRatingFilterChange).toHaveBeenCalledWith(null);
  });

  it("renders sort button with Newest label", () => {
    renderComponent();
    expect(screen.getByText("Newest")).toBeInTheDocument();
  });

  it("calls onSortOrderChange when clicking sort", () => {
    renderComponent();
    fireEvent.click(screen.getByText("Newest"));
    expect(defaultProps.onSortOrderChange).toHaveBeenCalledWith("oldest");
  });

  it("shows correct result count", () => {
    renderComponent({ resultCount: 10, totalCount: 10 });
    expect(screen.getByText("10 books")).toBeInTheDocument();
  });

  it("shows filtered result count", () => {
    renderComponent({ resultCount: 3, totalCount: 10 });
    expect(screen.getByText("3 of 10")).toBeInTheDocument();
  });

  it("renders correctly in dark mode", () => {
    renderComponent({}, "dark");
    expect(screen.getByTestId("book-filters")).toBeInTheDocument();
  });

  it("matches snapshot (light mode)", () => {
    const { container } = renderComponent({}, "light");
    expect(container).toMatchSnapshot();
  });

  it("matches snapshot (dark mode)", () => {
    const { container } = renderComponent({}, "dark");
    expect(container).toMatchSnapshot();
  });
});
