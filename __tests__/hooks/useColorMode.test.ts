import { renderHook, act } from "@testing-library/react";
import useColorMode from "@/hooks/useColorMode";

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

describe("useColorMode", () => {
  const originalLocalStorage = window.localStorage;
  let mockStorage: Record<string, string> = {};

  beforeEach(() => {
    mockStorage = {};
    Object.defineProperty(window, "localStorage", {
      value: {
        getItem: jest.fn((key: string) => mockStorage[key] || null),
        setItem: jest.fn((key: string, value: string) => {
          mockStorage[key] = value;
        }),
        removeItem: jest.fn((key: string) => {
          delete mockStorage[key];
        }),
        clear: jest.fn(() => {
          mockStorage = {};
        }),
      },
      writable: true,
    });
    mockMatchMedia(true);
  });

  afterEach(() => {
    Object.defineProperty(window, "localStorage", {
      value: originalLocalStorage,
      writable: true,
    });
  });

  it("returns dark mode when prefers-color-scheme is dark and no stored preference", () => {
    mockMatchMedia(true);
    const { result } = renderHook(() => useColorMode());
    expect(result.current.mode).toBe("dark");
  });

  it("returns light mode when prefers-color-scheme is light and no stored preference", () => {
    mockMatchMedia(false);
    const { result } = renderHook(() => useColorMode());
    expect(result.current.mode).toBe("light");
  });

  it("returns stored light mode preference", () => {
    mockStorage["color-mode"] = "light";
    const { result } = renderHook(() => useColorMode());
    expect(result.current.mode).toBe("light");
  });

  it("returns stored dark mode preference", () => {
    mockStorage["color-mode"] = "dark";
    const { result } = renderHook(() => useColorMode());
    expect(result.current.mode).toBe("dark");
  });

  it("toggles from dark to light mode", () => {
    mockMatchMedia(true);
    const { result } = renderHook(() => useColorMode());

    expect(result.current.mode).toBe("dark");

    act(() => {
      result.current.toggleColorMode();
    });

    expect(result.current.mode).toBe("light");
    expect(localStorage.setItem).toHaveBeenCalledWith("color-mode", "light");
  });

  it("toggles from light to dark mode", () => {
    mockStorage["color-mode"] = "light";
    const { result } = renderHook(() => useColorMode());

    expect(result.current.mode).toBe("light");

    act(() => {
      result.current.toggleColorMode();
    });

    expect(result.current.mode).toBe("dark");
    expect(localStorage.setItem).toHaveBeenCalledWith("color-mode", "dark");
  });

  it("returns a theme object", () => {
    const { result } = renderHook(() => useColorMode());
    expect(result.current.theme).toBeDefined();
    expect(result.current.theme.palette).toBeDefined();
    expect(result.current.theme.palette.mode).toBe(result.current.mode);
  });

  it("updates theme when mode changes", () => {
    mockMatchMedia(true);
    const { result } = renderHook(() => useColorMode());

    const initialTheme = result.current.theme;
    expect(initialTheme.palette.mode).toBe("dark");

    act(() => {
      result.current.toggleColorMode();
    });

    expect(result.current.theme.palette.mode).toBe("light");
  });
});
