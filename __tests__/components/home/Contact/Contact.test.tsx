import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { ThemeProvider } from "@mui/material/styles";
import { createAppTheme } from "@/theme";
import Contact from "@/components/home/Contact/Contact";

const mockSendEmail = jest.fn();
const mockReset = jest.fn();
let mockIsLoading = false;
let mockError: string | null = null;
let mockSuccess = false;

jest.mock("@/hooks", () => ({
  useEmailJS: () => ({
    sendEmail: mockSendEmail,
    get isLoading() {
      return mockIsLoading;
    },
    get error() {
      return mockError;
    },
    get success() {
      return mockSuccess;
    },
    reset: mockReset,
  }),
}));

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
    create: (Component: React.ComponentType<Record<string, unknown>>) =>
      React.forwardRef<HTMLElement, Record<string, unknown>>((props, ref) => {
        const filtered = Object.fromEntries(
          Object.entries(props).filter(([key]) => !FRAMER_PROPS.has(key)),
        );
        return <Component ref={ref} {...filtered} />;
      }),
  },
  useReducedMotion: () => true,
  AnimatePresence: ({ children }: { children: React.ReactNode }) =>
    React.createElement(React.Fragment, null, children),
}));

const renderWithTheme = (mode: "light" | "dark" = "light") =>
  render(
    <ThemeProvider theme={createAppTheme(mode)}>
      <Contact />
    </ThemeProvider>,
  );

describe("Contact", () => {
  beforeEach(() => {
    jest.useFakeTimers();
    mockSendEmail.mockClear();
    mockReset.mockClear();
    mockSendEmail.mockResolvedValue(true);
    mockIsLoading = false;
    mockError = null;
    mockSuccess = false;
  });

  afterEach(() => {
    jest.useRealTimers();
  });

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

  it("renders the form title", () => {
    renderWithTheme();
    expect(screen.getByText("Send a Message")).toBeInTheDocument();
  });

  it("renders the Name input field", () => {
    renderWithTheme();
    expect(screen.getByLabelText(/Your Name/)).toBeInTheDocument();
  });

  it("renders the Email input field", () => {
    renderWithTheme();
    expect(screen.getByLabelText(/Your Email/)).toBeInTheDocument();
  });

  it("renders the Message textarea", () => {
    renderWithTheme();
    expect(screen.getByLabelText(/Your Message/)).toBeInTheDocument();
  });

  it("renders the submit button", () => {
    renderWithTheme();
    expect(screen.getByRole("button", { name: /Send Message/ })).toBeInTheDocument();
  });

  it("updates input values on change", () => {
    renderWithTheme();
    const nameInput = screen.getByLabelText(/Your Name/) as HTMLInputElement;
    const emailInput = screen.getByLabelText(/Your Email/) as HTMLInputElement;
    const messageInput = screen.getByLabelText(/Your Message/) as HTMLTextAreaElement;

    fireEvent.change(nameInput, { target: { name: "name", value: "John" } });
    fireEvent.change(emailInput, { target: { name: "email", value: "john@test.com" } });
    fireEvent.change(messageInput, { target: { name: "message", value: "Hello!" } });

    expect(nameInput.value).toBe("John");
    expect(emailInput.value).toBe("john@test.com");
    expect(messageInput.value).toBe("Hello!");
  });

  it("calls sendEmail with form data on submit", async () => {
    const { container } = renderWithTheme();
    const nameInput = screen.getByLabelText(/Your Name/) as HTMLInputElement;
    const emailInput = screen.getByLabelText(/Your Email/) as HTMLInputElement;
    const messageInput = screen.getByLabelText(/Your Message/) as HTMLTextAreaElement;
    const form = container.querySelector("form") as HTMLFormElement;

    fireEvent.change(nameInput, { target: { name: "name", value: "John" } });
    fireEvent.change(emailInput, { target: { name: "email", value: "john@test.com" } });
    fireEvent.change(messageInput, { target: { name: "message", value: "Hello!" } });
    fireEvent.submit(form);

    await waitFor(() => {
      expect(mockSendEmail).toHaveBeenCalledWith({
        name: "John",
        email: "john@test.com",
        message: "Hello!",
      });
    });
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
