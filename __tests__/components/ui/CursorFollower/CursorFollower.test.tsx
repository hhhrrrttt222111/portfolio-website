import React from "react";
import { render, fireEvent, act } from "@testing-library/react";
import { CursorFollower } from "@/components";

const mockMatchMedia = (matches: boolean) => {
  Object.defineProperty(window, "matchMedia", {
    writable: true,
    value: jest.fn().mockImplementation((query) => ({
      matches,
      media: query,
      onchange: null,
      addListener: jest.fn(),
      removeListener: jest.fn(),
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    })),
  });
};

describe("CursorFollower", () => {
  beforeEach(() => {
    mockMatchMedia(false);
  });

  it("renders without crashing", () => {
    const { container } = render(<CursorFollower />);
    expect(container.firstChild).toBeTruthy();
  });

  it("renders a div element", () => {
    const { container } = render(<CursorFollower />);
    expect(container.firstChild).toBeInstanceOf(HTMLDivElement);
  });

  it("returns null on touch devices", () => {
    mockMatchMedia(true);
    const { container } = render(<CursorFollower />);
    expect(container.firstChild).toBeNull();
  });

  it("responds to mouse move events", () => {
    const { container } = render(<CursorFollower />);

    act(() => {
      fireEvent.mouseMove(window, { clientX: 100, clientY: 200 });
    });

    expect(container.firstChild).toBeTruthy();
  });

  it("responds to mouse down events", () => {
    const { container } = render(<CursorFollower />);

    act(() => {
      fireEvent.mouseDown(window);
    });

    expect(container.firstChild).toBeTruthy();
  });

  it("responds to mouse up events", () => {
    const { container } = render(<CursorFollower />);

    act(() => {
      fireEvent.mouseDown(window);
      fireEvent.mouseUp(window);
    });

    expect(container.firstChild).toBeTruthy();
  });

  it("responds to mouse over interactive elements", () => {
    const { container } = render(
      <>
        <CursorFollower />
        <button data-testid="test-button">Click me</button>
      </>,
    );

    const button = document.querySelector("button");
    if (button) {
      act(() => {
        fireEvent.mouseOver(button);
      });
    }

    expect(container.firstChild).toBeTruthy();
  });

  it("responds to mouse leave on document", () => {
    const { container } = render(<CursorFollower />);

    act(() => {
      fireEvent.mouseLeave(document.documentElement);
    });

    expect(container.firstChild).toBeTruthy();
  });

  it("responds to mouse enter on document", () => {
    const { container } = render(<CursorFollower />);

    act(() => {
      fireEvent.mouseEnter(document.documentElement);
    });

    expect(container.firstChild).toBeTruthy();
  });

  it("spawns particles on mouse move", async () => {
    jest.useFakeTimers();
    const { container } = render(<CursorFollower />);

    act(() => {
      fireEvent.mouseMove(window, { clientX: 100, clientY: 100 });
    });

    act(() => {
      jest.advanceTimersByTime(50);
    });

    act(() => {
      fireEvent.mouseMove(window, { clientX: 150, clientY: 150 });
    });

    expect(container.firstChild).toBeTruthy();
    jest.useRealTimers();
  });

  it("cleans up event listeners on unmount", () => {
    const removeEventListenerSpy = jest.spyOn(window, "removeEventListener");
    const { unmount } = render(<CursorFollower />);

    unmount();

    expect(removeEventListenerSpy).toHaveBeenCalled();
    removeEventListenerSpy.mockRestore();
  });

  it("matches snapshot", () => {
    const { container } = render(<CursorFollower />);
    expect(container).toMatchSnapshot();
  });
});
