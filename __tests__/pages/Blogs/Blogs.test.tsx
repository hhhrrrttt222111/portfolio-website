import React from "react";
import { render, screen } from "@testing-library/react";
import { ThemeProvider } from "@mui/material/styles";
import { BrowserRouter } from "react-router-dom";
import { createAppTheme } from "@/theme";
import Blogs from "@/pages/Blogs/Blogs";
import { BLOGS } from "@/constants/blogs";

const renderWithProviders = (mode: "light" | "dark" = "dark") =>
  render(
    <BrowserRouter>
      <ThemeProvider theme={createAppTheme(mode)}>
        <Blogs />
      </ThemeProvider>
    </BrowserRouter>,
  );

describe("Blogs Page", () => {
  it("renders without crashing", () => {
    const { container } = renderWithProviders();
    expect(container.firstChild).toBeTruthy();
  });

  it("renders the hero title", () => {
    renderWithProviders();
    expect(screen.getByText("My Blogs")).toBeInTheDocument();
  });

  it("renders the hero subtitle", () => {
    renderWithProviders();
    expect(screen.getByText(/Reflections on technology and literature/)).toBeInTheDocument();
  });

  it("renders both blog sections", () => {
    renderWithProviders();
    expect(screen.getByRole("heading", { name: "Hackzism" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Bibliosmia" })).toBeInTheDocument();
  });

  it("renders Hackzism blog tagline", () => {
    renderWithProviders();
    expect(screen.getByText("Nothing hacks better than Hackzism!")).toBeInTheDocument();
  });

  it("renders Bibliosmia blog tagline", () => {
    renderWithProviders();
    expect(screen.getByText("The intoxicating scent of good books")).toBeInTheDocument();
  });

  it("renders all Hackzism posts", () => {
    renderWithProviders();
    const hackzismBlog = BLOGS.find((blog) => blog.id === "hackzism");
    hackzismBlog?.posts.forEach((post) => {
      expect(screen.getByText(post.title)).toBeInTheDocument();
    });
  });

  it("renders all Bibliosmia posts", () => {
    renderWithProviders();
    const bibliosmiaBlog = BLOGS.find((blog) => blog.id === "bibliosmia");
    bibliosmiaBlog?.posts.forEach((post) => {
      expect(screen.getByText(post.title)).toBeInTheDocument();
    });
  });

  it("renders visit blog buttons for both blogs", () => {
    renderWithProviders();
    expect(screen.getByText("$ visit_blog")).toBeInTheDocument();
    expect(screen.getByText("Visit Full Blog")).toBeInTheDocument();
  });

  it("renders Hackzism topic tags", () => {
    renderWithProviders();
    expect(screen.getAllByText("Hacking").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Python").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Kali Linux").length).toBeGreaterThan(0);
  });

  it("renders Bibliosmia topic tags", () => {
    renderWithProviders();
    expect(screen.getByText("Book Reviews")).toBeInTheDocument();
    expect(screen.getAllByText("Literature").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Reading").length).toBeGreaterThan(0);
  });

  it("renders Lottie animations", () => {
    renderWithProviders();
    const animations = screen.getAllByTestId("lottie-animation");
    expect(animations.length).toBe(2);
  });

  it("renders main content area", () => {
    renderWithProviders();
    expect(screen.getByRole("main")).toBeInTheDocument();
  });

  it("renders header section", () => {
    renderWithProviders();
    const banners = screen.getAllByRole("banner");
    expect(banners.length).toBeGreaterThan(0);
  });

  it("renders correctly in light mode", () => {
    const { container } = renderWithProviders("light");
    expect(container.firstChild).toBeTruthy();
    expect(screen.getByText("My Blogs")).toBeInTheDocument();
  });

  it("renders section divider", () => {
    const { container } = renderWithProviders();
    const divider = container.querySelector('[aria-hidden="true"]');
    expect(divider).toBeInTheDocument();
  });

  it("matches snapshot (dark mode)", () => {
    const { container } = renderWithProviders("dark");
    expect(container).toMatchSnapshot();
  });

  it("matches snapshot (light mode)", () => {
    const { container } = renderWithProviders("light");
    expect(container).toMatchSnapshot();
  });
});
