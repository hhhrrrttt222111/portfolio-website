import React from "react";
import { render, screen } from "@testing-library/react";
import { ThemeProvider } from "@mui/material/styles";
import { MemoryRouter } from "react-router-dom";
import { createAppTheme } from "@/theme";
import BlogPreview from "@/components/home/BlogPreview/BlogPreview";
import { BLOG_POSTS } from "@/constants";

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

jest.mock("framer-motion", () => ({
  motion: {
    div: React.forwardRef<HTMLDivElement, Record<string, unknown>>((props, ref) => (
      <div ref={ref} {...filterProps(props)} />
    )),
  },
  useReducedMotion: () => false,
}));

const renderWithTheme = (mode: "light" | "dark" = "light") =>
  render(
    <ThemeProvider theme={createAppTheme(mode)}>
      <MemoryRouter>
        <BlogPreview />
      </MemoryRouter>
    </ThemeProvider>,
  );

describe("BlogPreview", () => {
  it("renders without crashing", () => {
    const { container } = renderWithTheme();
    expect(container.firstChild).toBeTruthy();
  });

  it("renders a section element", () => {
    const { container } = renderWithTheme();
    expect(container.querySelector("section")).toBeInTheDocument();
  });

  it("renders with test id", () => {
    renderWithTheme();
    expect(screen.getByTestId("blog-preview")).toBeInTheDocument();
  });

  it("renders the section title", () => {
    renderWithTheme();
    expect(screen.getByText("From the Desk")).toBeInTheDocument();
  });

  it("renders the subtitle", () => {
    renderWithTheme();
    expect(screen.getByText(/Musings on cybersecurity/)).toBeInTheDocument();
  });

  it("renders all blog post titles", () => {
    renderWithTheme();
    BLOG_POSTS.forEach((post) => {
      expect(screen.getByText(post.title)).toBeInTheDocument();
    });
  });

  it("renders all blog post dates", () => {
    renderWithTheme();
    BLOG_POSTS.forEach((post) => {
      expect(screen.getByText(post.date)).toBeInTheDocument();
    });
  });

  it("renders all blog post tags", () => {
    renderWithTheme();
    BLOG_POSTS.forEach((post) => {
      expect(screen.getByText(post.tag)).toBeInTheDocument();
    });
  });

  it("renders blog links with correct href", () => {
    renderWithTheme();
    BLOG_POSTS.forEach((post) => {
      const links = screen.getAllByRole("link");
      const blogLink = links.find((l) => l.getAttribute("href") === post.url);
      expect(blogLink).toBeTruthy();
    });
  });

  it("renders blog links that open in new tab", () => {
    renderWithTheme();
    BLOG_POSTS.forEach((post) => {
      const links = screen.getAllByRole("link");
      const blogLink = links.find((l) => l.getAttribute("href") === post.url);
      expect(blogLink).toHaveAttribute("target", "_blank");
      expect(blogLink).toHaveAttribute("rel", "noopener noreferrer");
    });
  });

  it("renders the View All link pointing to /blog", () => {
    renderWithTheme();
    const viewAll = screen.getByText("View all articles");
    expect(viewAll).toBeInTheDocument();
    expect(viewAll.closest("a")).toHaveAttribute("href", "/blog");
  });

  it("renders correctly in dark mode", () => {
    const { container } = renderWithTheme("dark");
    expect(container.querySelector("section")).toBeInTheDocument();
    expect(screen.getByText("From the Desk")).toBeInTheDocument();
  });

  it("matches snapshot (light mode)", () => {
    const { container } = renderWithTheme("light");
    expect(container).toMatchSnapshot();
  });

  it("matches snapshot (dark mode)", () => {
    const { container } = renderWithTheme("dark");
    expect(container).toMatchSnapshot();
  });
});
