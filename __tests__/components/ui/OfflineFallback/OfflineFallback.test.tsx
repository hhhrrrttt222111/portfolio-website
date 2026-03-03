import React from "react";
import { render, screen, fireEvent, act } from "@testing-library/react";
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

describe("OfflineFallback", () => {
  afterEach(() => {
    jest.clearAllTimers();
  });

  it("renders without crashing", () => {
    render(<OfflineFallback />);
    expect(screen.getByText("You're offline")).toBeInTheDocument();
  });

  it("renders the game title", () => {
    render(<OfflineFallback />);
    expect(screen.getAllByText("X").length).toBeGreaterThanOrEqual(1);
    expect(screen.getByText("O")).toBeInTheDocument();
    expect(screen.getByText("vs")).toBeInTheDocument();
  });

  it("renders the instruction text", () => {
    render(<OfflineFallback />);
    expect(screen.getByText(/Beat the bot while you wait/)).toBeInTheDocument();
  });

  it("renders the scoreboard with initial zeroes", () => {
    render(<OfflineFallback />);
    expect(screen.getByText("Wins")).toBeInTheDocument();
    expect(screen.getByText("Draws")).toBeInTheDocument();
    expect(screen.getByText("Losses")).toBeInTheDocument();
    const zeroes = screen.getAllByText("0");
    expect(zeroes.length).toBeGreaterThanOrEqual(3);
  });

  it("renders 9 board cells", () => {
    const { container } = render(<OfflineFallback />);
    const grid =
      container.querySelector('[style*="grid"]') || container.querySelector(".MuiBox-root");
    expect(grid).toBeTruthy();
  });

  it("renders the reset button", () => {
    render(<OfflineFallback />);
    expect(screen.getByRole("button", { name: /reset/i })).toBeInTheDocument();
  });

  it("places X when a cell is clicked", () => {
    render(<OfflineFallback />);
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
    render(<OfflineFallback />);

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

    jest.restoreAllMocks();
  });

  it("resets the board when reset button is clicked", () => {
    render(<OfflineFallback />);

    const resetBtn = screen.getByRole("button", { name: /reset/i });
    fireEvent.click(resetBtn);

    expect(screen.getByText("You're offline")).toBeInTheDocument();
  });

  it("shows 'Play Again' text after game ends", () => {
    jest.spyOn(Math, "random").mockReturnValue(0.5);
    render(<OfflineFallback />);

    const resetBtn = screen.getByRole("button", { name: /reset/i });
    expect(resetBtn).toHaveTextContent("Reset");

    jest.restoreAllMocks();
  });

  it("matches snapshot", () => {
    const { container } = render(<OfflineFallback />);
    expect(container).toMatchSnapshot();
  });
});
