import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { ThemeProvider } from "@mui/material/styles";
import { createAppTheme } from "@/theme";
import Contact from "@/components/home/Contact/Contact";

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

const renderWithTheme = (mode: "light" | "dark" = "light") =>
  render(
    <ThemeProvider theme={createAppTheme(mode)}>
      <Contact />
    </ThemeProvider>,
  );

describe("Contact", () => {
  it("renders without crashing", () => {
    const { container } = renderWithTheme();
    expect(container.firstChild).toBeTruthy();
  });

  it("renders a section element", () => {
    const { container } = renderWithTheme();
    expect(container.querySelector("section")).toBeInTheDocument();
  });

  it("renders the contact section with test id", () => {
    renderWithTheme();
    expect(screen.getByTestId("contact-section")).toBeInTheDocument();
  });

  it("renders the section title", () => {
    renderWithTheme();
    expect(screen.getByText("Get In Touch")).toBeInTheDocument();
  });

  it("renders the subtitle", () => {
    renderWithTheme();
    expect(
      screen.getByText(/Have a project in mind or just want to say hello/),
    ).toBeInTheDocument();
  });

  it("renders the phone number", () => {
    renderWithTheme();
    expect(screen.getByText("+1 (555) 123-4567")).toBeInTheDocument();
  });

  it("renders the email address", () => {
    renderWithTheme();
    expect(screen.getByText("hello@hemanthr.dev")).toBeInTheDocument();
  });

  it("renders the Name input field", () => {
    renderWithTheme();
    expect(screen.getByLabelText(/Name/)).toBeInTheDocument();
  });

  it("renders the Email input field", () => {
    renderWithTheme();
    expect(screen.getByLabelText(/Email/)).toBeInTheDocument();
  });

  it("renders the Message textarea", () => {
    renderWithTheme();
    expect(screen.getByLabelText(/Message/)).toBeInTheDocument();
  });

  it("renders the submit button", () => {
    renderWithTheme();
    expect(screen.getByRole("button", { name: /Send Message/ })).toBeInTheDocument();
  });

  it("updates input values on change", () => {
    renderWithTheme();
    const nameInput = screen.getByLabelText(/Name/) as HTMLInputElement;
    const emailInput = screen.getByLabelText(/Email/) as HTMLInputElement;
    const messageInput = screen.getByLabelText(/Message/) as HTMLTextAreaElement;

    fireEvent.change(nameInput, { target: { name: "name", value: "John" } });
    fireEvent.change(emailInput, { target: { name: "email", value: "john@test.com" } });
    fireEvent.change(messageInput, { target: { name: "message", value: "Hello!" } });

    expect(nameInput.value).toBe("John");
    expect(emailInput.value).toBe("john@test.com");
    expect(messageInput.value).toBe("Hello!");
  });

  it("clears form on submit", () => {
    renderWithTheme();
    const nameInput = screen.getByLabelText(/Name/) as HTMLInputElement;
    const emailInput = screen.getByLabelText(/Email/) as HTMLInputElement;
    const messageInput = screen.getByLabelText(/Message/) as HTMLTextAreaElement;
    const submitButton = screen.getByRole("button", { name: /Send Message/ });

    fireEvent.change(nameInput, { target: { name: "name", value: "John" } });
    fireEvent.change(emailInput, { target: { name: "email", value: "john@test.com" } });
    fireEvent.change(messageInput, { target: { name: "message", value: "Hello!" } });
    fireEvent.click(submitButton);

    expect(nameInput.value).toBe("");
    expect(emailInput.value).toBe("");
    expect(messageInput.value).toBe("");
  });

  it("renders correctly in dark mode", () => {
    const { container } = renderWithTheme("dark");
    expect(container.querySelector("section")).toBeInTheDocument();
    expect(screen.getByText("Get In Touch")).toBeInTheDocument();
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
