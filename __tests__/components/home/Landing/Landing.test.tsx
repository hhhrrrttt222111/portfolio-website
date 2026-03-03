import React from "react";
import { render, screen } from "@testing-library/react";
import { Landing } from "@/components";

jest.mock("framer-motion", () => ({
  motion: {
    div: React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>((props, ref) => (
      <div ref={ref} {...props} />
    )),
  },
}));

describe("Landing", () => {
  it("renders without crashing", () => {
    const { container } = render(<Landing />);
    expect(container.firstChild).toBeTruthy();
  });

  it("renders a section element", () => {
    const { container } = render(<Landing />);
    expect(container.querySelector("section")).toBeInTheDocument();
  });

  it("renders the hero heading", () => {
    render(<Landing />);
    expect(screen.getByRole("heading", { level: 1 })).toBeInTheDocument();
    expect(screen.getByText("Creative")).toBeInTheDocument();
    expect(screen.getByText("Director")).toBeInTheDocument();
  });

  it("renders the subtitle", () => {
    render(<Landing />);
    expect(screen.getByText("Hey, I'm a")).toBeInTheDocument();
  });

  it("renders the tagline", () => {
    render(<Landing />);
    expect(screen.getByText(/Great design should feel/)).toBeInTheDocument();
    expect(screen.getByText("invisible.")).toBeInTheDocument();
  });

  it("renders the description", () => {
    render(<Landing />);
    expect(
      screen.getByText("From logo to language, I build brands that connect and convert."),
    ).toBeInTheDocument();
  });

  it("renders the portrait image", () => {
    render(<Landing />);
    const img = screen.getByAltText("Portrait");
    expect(img).toBeInTheDocument();
    expect(img.tagName).toBe("IMG");
  });

  it("matches snapshot", () => {
    const { container } = render(<Landing />);
    expect(container).toMatchSnapshot();
  });
});
