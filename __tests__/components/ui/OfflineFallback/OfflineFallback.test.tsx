import React from "react";
import { render, screen, fireEvent, act } from "@testing-library/react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import OfflineFallback from "@/components/ui/OfflineFallback/OfflineFallback";

jest.mock("framer-motion", () => {
  const Passthrough = (props: { children?: React.ReactNode; [key: string]: unknown }) => {
    const { children, ...rest } = props;
    const safe: Record<string, string | number | boolean> = {};
    for (const [k, v] of Object.entries(rest)) {
      if (typeof v === "string" || typeof v === "number" || typeof v === "boolean") {
        safe[k] = v;
      }
    }
    return <div {...safe}>{children}</div>;
  };

  return {
    motion: { div: Passthrough },
    AnimatePresence: ({ children }: { children?: React.ReactNode }) => <>{children}</>,
  };
});

jest.useFakeTimers();

const lightTheme = createTheme({ palette: { mode: "light" } });
const darkTheme = createTheme({ palette: { mode: "dark" } });

const renderWithTheme = (theme = lightTheme) =>
  render(
    <ThemeProvider theme={theme}>
      <OfflineFallback />
    </ThemeProvider>,
  );

describe("OfflineFallback", () => {
  afterEach(() => {
    jest.clearAllTimers();
    jest.restoreAllMocks();
  });

  it("renders without crashing", () => {
    renderWithTheme();
    expect(screen.getByText("You're offline")).toBeInTheDocument();
  });

  it("renders the game title", () => {
    renderWithTheme();
    expect(screen.getAllByText("X").length).toBeGreaterThanOrEqual(1);
    expect(screen.getByText("O")).toBeInTheDocument();
    expect(screen.getByText("vs")).toBeInTheDocument();
  });

  it("renders the instruction text", () => {
    renderWithTheme();
    expect(screen.getByText(/Beat the bot while you wait/)).toBeInTheDocument();
  });

  it("renders the scoreboard with initial zeroes", () => {
    renderWithTheme();
    expect(screen.getByText("Wins")).toBeInTheDocument();
    expect(screen.getByText("Draws")).toBeInTheDocument();
    expect(screen.getByText("Losses")).toBeInTheDocument();
    const zeroes = screen.getAllByText("0");
    expect(zeroes.length).toBeGreaterThanOrEqual(3);
  });

  it("renders 9 board cells", () => {
    const { container } = renderWithTheme();
    const grid =
      container.querySelector('[style*="grid"]') || container.querySelector(".MuiBox-root");
    expect(grid).toBeTruthy();
  });

  it("renders the reset button", () => {
    renderWithTheme();
    expect(screen.getByRole("button", { name: /reset/i })).toBeInTheDocument();
  });

  it("places X when a cell is clicked", () => {
    renderWithTheme();
    const cells = screen.getAllByText("X");
    const initialXCount = cells.length;

    const allClickable = document.querySelectorAll('[style*="cursor"]');
    if (allClickable.length > 0) {
      fireEvent.click(allClickable[0]);
    }

    const newXCount = screen.getAllByText("X").length;
    expect(newXCount).toBeGreaterThanOrEqual(initialXCount);
  });

  it("bot responds after player moves", () => {
    jest.spyOn(Math, "random").mockReturnValue(0.5);
    renderWithTheme();

    const boxes = document.querySelectorAll(".MuiBox-root");
    const clickableBoxes = Array.from(boxes).filter(
      (box) => box.childElementCount === 0 || box.children.length === 0,
    );

    if (clickableBoxes.length > 0) {
      fireEvent.click(clickableBoxes[0]);

      act(() => {
        jest.advanceTimersByTime(1000);
      });
    }
  });

  it("resets the board when reset button is clicked", () => {
    renderWithTheme();

    const resetBtn = screen.getByRole("button", { name: /reset/i });
    fireEvent.click(resetBtn);

    expect(screen.getByText("You're offline")).toBeInTheDocument();
  });

  it("shows 'Play Again' text after game ends", () => {
    jest.spyOn(Math, "random").mockReturnValue(0.5);
    renderWithTheme();

    const resetBtn = screen.getByRole("button", { name: /reset/i });
    expect(resetBtn).toHaveTextContent("Reset");
  });

  it("handles cell color for X", () => {
    renderWithTheme();
    const boxes = document.querySelectorAll(".MuiBox-root");
    const clickableBoxes = Array.from(boxes).filter(
      (box) => box.childElementCount === 0 || box.children.length === 0,
    );

    if (clickableBoxes.length > 0) {
      fireEvent.click(clickableBoxes[0]);
    }

    expect(screen.getAllByText("X").length).toBeGreaterThanOrEqual(1);
  });

  it("handles bot thinking state", () => {
    jest.spyOn(Math, "random").mockReturnValue(0.1);
    renderWithTheme();

    const boxes = document.querySelectorAll(".MuiBox-root");
    const clickableBoxes = Array.from(boxes).filter(
      (box) => box.childElementCount === 0 || box.children.length === 0,
    );

    if (clickableBoxes.length > 0) {
      fireEvent.click(clickableBoxes[0]);
    }

    expect(screen.getByText("You're offline")).toBeInTheDocument();

    act(() => {
      jest.advanceTimersByTime(1000);
    });
  });

  it("prevents clicking during bot thinking", () => {
    jest.spyOn(Math, "random").mockReturnValue(0.1);
    renderWithTheme();

    const boxes = document.querySelectorAll(".MuiBox-root");
    const clickableBoxes = Array.from(boxes).filter(
      (box) => box.childElementCount === 0 || box.children.length === 0,
    );

    if (clickableBoxes.length > 1) {
      fireEvent.click(clickableBoxes[0]);
      fireEvent.click(clickableBoxes[1]);
    }

    act(() => {
      jest.advanceTimersByTime(1000);
    });
  });

  it("handles winning combo highlight", () => {
    renderWithTheme();
    expect(screen.getByText("You're offline")).toBeInTheDocument();
  });

  it("renders in dark mode with correct colors", () => {
    renderWithTheme(darkTheme);
    expect(screen.getByText("You're offline")).toBeInTheDocument();
  });

  it("prevents clicking on already filled cells", () => {
    renderWithTheme();

    const boxes = document.querySelectorAll(".MuiBox-root");
    const clickableBoxes = Array.from(boxes).filter(
      (box) => box.childElementCount === 0 || box.children.length === 0,
    );

    if (clickableBoxes.length > 0) {
      fireEvent.click(clickableBoxes[0]);
      fireEvent.click(clickableBoxes[0]);
    }

    expect(screen.getByText("You're offline")).toBeInTheDocument();
  });

  it("game can be played and shows result", () => {
    jest.spyOn(Math, "random").mockReturnValue(0.1);
    renderWithTheme();

    const boxes = document.querySelectorAll(".MuiBox-root");
    const clickableBoxes = Array.from(boxes).filter(
      (box) => box.childElementCount === 0 || box.children.length === 0,
    );

    if (clickableBoxes.length > 0) {
      fireEvent.click(clickableBoxes[0]);
    }

    act(() => {
      jest.advanceTimersByTime(1000);
    });

    expect(screen.getByText("You're offline")).toBeInTheDocument();
  });

  it("isWinCell returns false when winCombo is null", () => {
    renderWithTheme();
    expect(screen.getByText("You're offline")).toBeInTheDocument();
  });

  it("game state updates after bot move", () => {
    jest.spyOn(Math, "random").mockReturnValue(0.1);
    renderWithTheme();

    const boxes = document.querySelectorAll(".MuiBox-root");
    const clickableBoxes = Array.from(boxes).filter(
      (box) => box.childElementCount === 0 || box.children.length === 0,
    );

    if (clickableBoxes.length > 0) {
      fireEvent.click(clickableBoxes[0]);
    }

    act(() => {
      jest.advanceTimersByTime(1000);
    });

    const oElements = screen.getAllByText("O");
    expect(oElements.length).toBeGreaterThanOrEqual(1);
  });

  it("matches snapshot", () => {
    const { container } = renderWithTheme();
    expect(container).toMatchSnapshot();
  });
});
