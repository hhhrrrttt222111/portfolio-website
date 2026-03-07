import React from "react";
import { render, screen, fireEvent, act } from "@testing-library/react";
import { ThemeProvider } from "@mui/material/styles";
import { MemoryRouter } from "react-router-dom";
import { createAppTheme } from "@/theme";

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
]);

const filterProps = (props: Record<string, unknown>) =>
  Object.fromEntries(Object.entries(props).filter(([key]) => !FRAMER_PROPS.has(key)));

const mockNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
}));

jest.mock("framer-motion", () => ({
  motion: {
    div: React.forwardRef<HTMLDivElement, Record<string, unknown>>((props, ref) => (
      <div ref={ref} {...filterProps(props)} />
    )),
  },
  AnimatePresence: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}));

import NotFound from "@/pages/NotFound/NotFound";

const renderNotFound = () =>
  render(
    <ThemeProvider theme={createAppTheme("light")}>
      <MemoryRouter>
        <NotFound />
      </MemoryRouter>
    </ThemeProvider>,
  );

describe("NotFound", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.useFakeTimers();
    localStorage.clear();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it("renders 404 error code", () => {
    renderNotFound();
    expect(screen.getByText("404")).toBeInTheDocument();
  });

  it("renders page not found message", () => {
    renderNotFound();
    expect(screen.getByText("Page Not Found")).toBeInTheDocument();
  });

  it("renders back to home button", () => {
    renderNotFound();
    expect(screen.getByRole("button", { name: /back to home/i })).toBeInTheDocument();
  });

  it("navigates to home when button is clicked", () => {
    renderNotFound();
    const homeButton = screen.getByRole("button", { name: /back to home/i });
    fireEvent.click(homeButton);
    expect(mockNavigate).toHaveBeenCalledWith("/");
  });

  it("renders game container with title", () => {
    renderNotFound();
    expect(screen.getByText("Catch the Ball")).toBeInTheDocument();
  });

  it("renders start game button initially", () => {
    renderNotFound();
    expect(screen.getByRole("button", { name: /start game/i })).toBeInTheDocument();
  });

  it("starts game when start button is clicked", () => {
    renderNotFound();
    const startButton = screen.getByRole("button", { name: /start game/i });
    fireEvent.click(startButton);

    expect(screen.getByText(/Score:/)).toBeInTheDocument();
    expect(screen.getByText(/Time: 15s/)).toBeInTheDocument();
  });

  it("updates score when ball is clicked during game", () => {
    renderNotFound();

    const startButton = screen.getByRole("button", { name: /start game/i });
    fireEvent.click(startButton);

    const ball = screen.getByRole("button", { name: /click to catch ball/i });
    fireEvent.click(ball);

    expect(screen.getByText(/Score:/)).toHaveTextContent("1");
  });

  it("ends game when timer reaches zero", () => {
    renderNotFound();

    const startButton = screen.getByRole("button", { name: /start game/i });
    fireEvent.click(startButton);

    act(() => {
      jest.advanceTimersByTime(15000);
    });

    expect(screen.getByText("Time's Up!")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /play again/i })).toBeInTheDocument();
  });

  it("allows restarting game after it ends", () => {
    renderNotFound();

    const startButton = screen.getByRole("button", { name: /start game/i });
    fireEvent.click(startButton);

    act(() => {
      jest.advanceTimersByTime(15000);
    });

    const playAgainButton = screen.getByRole("button", { name: /play again/i });
    fireEvent.click(playAgainButton);

    expect(screen.getByText(/Time: 15s/)).toBeInTheDocument();
  });

  it("starts game when space key is pressed", () => {
    renderNotFound();

    fireEvent.keyDown(window, { code: "Space", key: " " });

    expect(screen.getByText(/Time: 15s/)).toBeInTheDocument();
  });

  it("saves high score to localStorage", () => {
    renderNotFound();

    const startButton = screen.getByRole("button", { name: /start game/i });
    fireEvent.click(startButton);

    const ball = screen.getByRole("button", { name: /click to catch ball/i });
    fireEvent.click(ball);
    fireEvent.click(ball);
    fireEvent.click(ball);

    act(() => {
      jest.advanceTimersByTime(15000);
    });

    expect(localStorage.getItem("notfound-highscore")).toBe("3");
  });

  it("displays high score when available", () => {
    localStorage.setItem("notfound-highscore", "10");
    renderNotFound();

    expect(screen.getByText("High Score: 10")).toBeInTheDocument();
  });

  it("has accessible game area", () => {
    renderNotFound();
    expect(
      screen.getByRole("application", { name: /ball catching game area/i }),
    ).toBeInTheDocument();
  });

  it("renders in dark mode", () => {
    const { container } = render(
      <ThemeProvider theme={createAppTheme("dark")}>
        <MemoryRouter>
          <NotFound />
        </MemoryRouter>
      </ThemeProvider>,
    );
    expect(container.firstChild).toBeInTheDocument();
  });
});
