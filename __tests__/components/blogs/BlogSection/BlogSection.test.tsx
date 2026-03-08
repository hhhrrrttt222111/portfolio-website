import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { ThemeProvider } from "@mui/material/styles";
import { createAppTheme } from "@/theme";
import BlogSection from "@/components/blogs/BlogSection/BlogSection";
import type { Blog } from "@/constants/blogs";

const mockHackerBlog: Blog = {
  id: "hackzism",
  name: "Hackzism",
  tagline: "Nothing hacks better than Hackzism!",
  description: "A technical blog exploring cybersecurity and ethical hacking.",
  url: "https://hackzism.blogspot.com",
  topics: ["Hacking", "Python", "Kali Linux"],
  theme: "hacker",
  posts: [
    {
      id: "post-1",
      title: "Test Hacker Post 1",
      excerpt: "Test excerpt for hacker post 1",
      url: "https://hackzism.blogspot.com/post-1",
      date: "January 1, 2024",
      tags: ["Security", "Python"],
      readingTime: "5 min read",
    },
    {
      id: "post-2",
      title: "Test Hacker Post 2",
      excerpt: "Test excerpt for hacker post 2",
      url: "https://hackzism.blogspot.com/post-2",
      date: "January 15, 2024",
      tags: ["Networking"],
      readingTime: "8 min read",
    },
  ],
};

const mockLiteraryBlog: Blog = {
  id: "bibliosmia",
  name: "Bibliosmia",
  tagline: "The intoxicating scent of good books",
  description: "A personal journey through literature.",
  url: "https://hhhrrrttt222111.blogspot.com/",
  topics: ["Book Reviews", "Literature", "Reading"],
  theme: "literary",
  posts: [
    {
      id: "post-1",
      title: "Test Literary Post 1",
      excerpt: "Test excerpt for literary post 1",
      url: "https://hhhrrrttt222111.blogspot.com/post-1",
      date: "February 1, 2024",
      tags: ["Fiction", "Review"],
      readingTime: "6 min read",
    },
  ],
};

const renderWithTheme = (blog: Blog, mode: "light" | "dark" = "dark") =>
  render(
    <ThemeProvider theme={createAppTheme(mode)}>
      <BlogSection blog={blog} />
    </ThemeProvider>,
  );

describe("BlogSection", () => {
  const originalOpen = window.open;

  beforeEach(() => {
    window.open = jest.fn();
  });

  afterEach(() => {
    window.open = originalOpen;
  });

  describe("Hacker Theme", () => {
    it("renders without crashing", () => {
      const { container } = renderWithTheme(mockHackerBlog);
      expect(container.firstChild).toBeTruthy();
    });

    it("renders the blog name", () => {
      renderWithTheme(mockHackerBlog);
      expect(screen.getByRole("heading", { name: "Hackzism" })).toBeInTheDocument();
    });

    it("renders the blog tagline", () => {
      renderWithTheme(mockHackerBlog);
      expect(screen.getByText("Nothing hacks better than Hackzism!")).toBeInTheDocument();
    });

    it("renders the blog description", () => {
      renderWithTheme(mockHackerBlog);
      expect(screen.getByText(/A technical blog exploring cybersecurity/)).toBeInTheDocument();
    });

    it("renders all topic tags", () => {
      renderWithTheme(mockHackerBlog);
      expect(screen.getByText("Hacking")).toBeInTheDocument();
      expect(screen.getAllByText("Python").length).toBeGreaterThan(0);
      expect(screen.getByText("Kali Linux")).toBeInTheDocument();
    });

    it("renders all blog posts", () => {
      renderWithTheme(mockHackerBlog);
      expect(screen.getByText("Test Hacker Post 1")).toBeInTheDocument();
      expect(screen.getByText("Test Hacker Post 2")).toBeInTheDocument();
    });

    it("renders hacker-style visit button", () => {
      renderWithTheme(mockHackerBlog);
      expect(screen.getByText("$ visit_blog")).toBeInTheDocument();
    });

    it("opens blog URL when visit button is clicked", () => {
      renderWithTheme(mockHackerBlog);
      const visitButton = screen.getByText("$ visit_blog");
      fireEvent.click(visitButton);
      expect(window.open).toHaveBeenCalledWith(
        "https://hackzism.blogspot.com",
        "_blank",
        "noopener,noreferrer",
      );
    });

    it("renders Lottie animation", () => {
      renderWithTheme(mockHackerBlog);
      expect(screen.getByTestId("lottie-animation")).toBeInTheDocument();
    });

    it("has correct section aria-labelledby", () => {
      renderWithTheme(mockHackerBlog);
      const section = screen.getByRole("region", { name: /Hackzism/ });
      expect(section).toHaveAttribute("aria-labelledby", "hackzism-title");
    });

    it("renders correctly in light mode", () => {
      const { container } = renderWithTheme(mockHackerBlog, "light");
      expect(container.firstChild).toBeTruthy();
    });
  });

  describe("Literary Theme", () => {
    it("renders without crashing", () => {
      const { container } = renderWithTheme(mockLiteraryBlog);
      expect(container.firstChild).toBeTruthy();
    });

    it("renders the blog name", () => {
      renderWithTheme(mockLiteraryBlog);
      expect(screen.getByRole("heading", { name: "Bibliosmia" })).toBeInTheDocument();
    });

    it("renders the blog tagline", () => {
      renderWithTheme(mockLiteraryBlog);
      expect(screen.getByText("The intoxicating scent of good books")).toBeInTheDocument();
    });

    it("renders literary-style visit button", () => {
      renderWithTheme(mockLiteraryBlog);
      expect(screen.getByText("Visit Full Blog")).toBeInTheDocument();
    });

    it("opens blog URL when visit button is clicked", () => {
      renderWithTheme(mockLiteraryBlog);
      const visitButton = screen.getByText("Visit Full Blog");
      fireEvent.click(visitButton);
      expect(window.open).toHaveBeenCalledWith(
        "https://hhhrrrttt222111.blogspot.com/",
        "_blank",
        "noopener,noreferrer",
      );
    });

    it("renders all topic tags", () => {
      renderWithTheme(mockLiteraryBlog);
      expect(screen.getByText("Book Reviews")).toBeInTheDocument();
      expect(screen.getAllByText("Literature").length).toBeGreaterThan(0);
      expect(screen.getAllByText("Reading").length).toBeGreaterThan(0);
    });

    it("renders correctly in light mode", () => {
      const { container } = renderWithTheme(mockLiteraryBlog, "light");
      expect(container.firstChild).toBeTruthy();
    });
  });

  describe("Accessibility", () => {
    it("visit button has correct aria-label for hacker blog", () => {
      renderWithTheme(mockHackerBlog);
      const button = screen.getByRole("button", { name: /Visit Hackzism blog/ });
      expect(button).toBeInTheDocument();
    });

    it("visit button has correct aria-label for literary blog", () => {
      renderWithTheme(mockLiteraryBlog);
      const button = screen.getByRole("button", { name: /Visit Bibliosmia blog/ });
      expect(button).toBeInTheDocument();
    });

    it("section has proper landmark role", () => {
      renderWithTheme(mockHackerBlog);
      expect(screen.getByRole("region")).toBeInTheDocument();
    });
  });

  it("matches snapshot (hacker dark)", () => {
    const { container } = renderWithTheme(mockHackerBlog, "dark");
    expect(container).toMatchSnapshot();
  });

  it("matches snapshot (literary light)", () => {
    const { container } = renderWithTheme(mockLiteraryBlog, "light");
    expect(container).toMatchSnapshot();
  });
});
