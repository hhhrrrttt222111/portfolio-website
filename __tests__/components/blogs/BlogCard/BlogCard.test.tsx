import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { ThemeProvider } from "@mui/material/styles";
import { createAppTheme } from "@/theme";
import BlogCard from "@/components/blogs/BlogCard/BlogCard";
import type { BlogPost } from "@/constants/blogs";

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

jest.mock("framer-motion", () => ({
  motion: {
    div: React.forwardRef<HTMLDivElement, Record<string, unknown>>((props, ref) => {
      const filtered = Object.fromEntries(
        Object.entries(props).filter(([key]) => !FRAMER_PROPS.has(key)),
      );
      return <div ref={ref} {...filtered} />;
    }),
  },
  useReducedMotion: () => false,
}));

const mockPost: BlogPost = {
  id: "test-post-1",
  title: "Test Blog Post Title",
  excerpt: "This is a test excerpt for the blog post that should be displayed on the card.",
  url: "https://example.com/test-post",
  date: "January 15, 2024",
  tags: ["Testing", "React", "TypeScript"],
  readingTime: "5 min read",
};

const renderWithTheme = (
  post: BlogPost = mockPost,
  variant: "hacker" | "literary" = "hacker",
  mode: "light" | "dark" = "dark",
  index: number = 0,
) =>
  render(
    <ThemeProvider theme={createAppTheme(mode)}>
      <BlogCard post={post} variant={variant} index={index} />
    </ThemeProvider>,
  );

describe("BlogCard", () => {
  const originalOpen = window.open;

  beforeEach(() => {
    window.open = jest.fn();
  });

  afterEach(() => {
    window.open = originalOpen;
  });

  it("renders without crashing", () => {
    const { container } = renderWithTheme();
    expect(container.firstChild).toBeTruthy();
  });

  it("renders the post title", () => {
    renderWithTheme();
    expect(screen.getByText("Test Blog Post Title")).toBeInTheDocument();
  });

  it("renders the post excerpt", () => {
    renderWithTheme();
    expect(screen.getByText(/This is a test excerpt/)).toBeInTheDocument();
  });

  it("renders the post date", () => {
    renderWithTheme();
    expect(screen.getByText("January 15, 2024")).toBeInTheDocument();
  });

  it("renders the reading time", () => {
    renderWithTheme();
    expect(screen.getByText("5 min read")).toBeInTheDocument();
  });

  it("renders post tags", () => {
    renderWithTheme();
    expect(screen.getByText("Testing")).toBeInTheDocument();
    expect(screen.getByText("React")).toBeInTheDocument();
    expect(screen.getByText("TypeScript")).toBeInTheDocument();
  });

  it("renders hacker variant read button text", () => {
    renderWithTheme(mockPost, "hacker");
    expect(screen.getByText("$ read_article")).toBeInTheDocument();
  });

  it("renders literary variant read button text", () => {
    renderWithTheme(mockPost, "literary");
    expect(screen.getByText("Read Article")).toBeInTheDocument();
  });

  it("opens post URL in new tab on click", () => {
    renderWithTheme();
    const card = screen.getByRole("article");
    fireEvent.click(card);
    expect(window.open).toHaveBeenCalledWith(
      "https://example.com/test-post",
      "_blank",
      "noopener,noreferrer",
    );
  });

  it("opens post URL on Enter key press", () => {
    renderWithTheme();
    const card = screen.getByRole("article");
    fireEvent.keyDown(card, { key: "Enter" });
    expect(window.open).toHaveBeenCalledWith(
      "https://example.com/test-post",
      "_blank",
      "noopener,noreferrer",
    );
  });

  it("opens post URL on Space key press", () => {
    renderWithTheme();
    const card = screen.getByRole("article");
    fireEvent.keyDown(card, { key: " " });
    expect(window.open).toHaveBeenCalledWith(
      "https://example.com/test-post",
      "_blank",
      "noopener,noreferrer",
    );
  });

  it("has correct aria-label for accessibility", () => {
    renderWithTheme();
    const card = screen.getByRole("article");
    expect(card).toHaveAttribute("aria-label", "Read article: Test Blog Post Title");
  });

  it("is focusable for keyboard navigation", () => {
    renderWithTheme();
    const card = screen.getByRole("article");
    expect(card).toHaveAttribute("tabIndex", "0");
  });

  it("renders correctly in light mode", () => {
    const { container } = renderWithTheme(mockPost, "hacker", "light");
    expect(container.firstChild).toBeTruthy();
    expect(screen.getByText("Test Blog Post Title")).toBeInTheDocument();
  });

  it("renders correctly with literary variant in dark mode", () => {
    const { container } = renderWithTheme(mockPost, "literary", "dark");
    expect(container.firstChild).toBeTruthy();
    expect(screen.getByText("Test Blog Post Title")).toBeInTheDocument();
  });

  it("renders correctly with literary variant in light mode", () => {
    const { container } = renderWithTheme(mockPost, "literary", "light");
    expect(container.firstChild).toBeTruthy();
    expect(screen.getByText("Test Blog Post Title")).toBeInTheDocument();
  });

  it("limits displayed tags to 3", () => {
    const postWithManyTags: BlogPost = {
      ...mockPost,
      tags: ["Tag1", "Tag2", "Tag3", "Tag4", "Tag5"],
    };
    renderWithTheme(postWithManyTags);
    expect(screen.getByText("Tag1")).toBeInTheDocument();
    expect(screen.getByText("Tag2")).toBeInTheDocument();
    expect(screen.getByText("Tag3")).toBeInTheDocument();
    expect(screen.queryByText("Tag4")).not.toBeInTheDocument();
    expect(screen.queryByText("Tag5")).not.toBeInTheDocument();
  });

  it("matches snapshot (hacker dark)", () => {
    const { container } = renderWithTheme(mockPost, "hacker", "dark");
    expect(container).toMatchSnapshot();
  });

  it("matches snapshot (literary light)", () => {
    const { container } = renderWithTheme(mockPost, "literary", "light");
    expect(container).toMatchSnapshot();
  });
});
