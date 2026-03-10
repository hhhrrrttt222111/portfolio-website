/* eslint-disable no-console */
import { renderHook } from "@testing-library/react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { createElement } from "react";
import useDevToolsWarning from "@/hooks/useDevToolsWarning";

const mockTheme = createTheme({
  palette: {
    mode: "dark",
    primary: { main: "#66bb6a", light: "#a5d6a7", dark: "#43a047" },
    secondary: { main: "#80cbc4" },
    text: { primary: "#e0e8e0", secondary: "#a0b8a8" },
  },
  typography: {
    fontFamily: "'Syne', sans-serif",
  },
});

const wrapper = ({ children }: { children: React.ReactNode }) =>
  createElement(ThemeProvider, { theme: mockTheme }, children);

describe("useDevToolsWarning", () => {
  const originalConsole = {
    clear: console.clear,
    log: console.log,
  };

  beforeEach(() => {
    console.clear = jest.fn();
    console.log = jest.fn();
  });

  afterEach(() => {
    console.clear = originalConsole.clear;
    console.log = originalConsole.log;
  });

  it("clears the console on mount", () => {
    renderHook(() => useDevToolsWarning(), { wrapper });
    expect(console.clear).toHaveBeenCalled();
  });

  it("logs multiple styled messages", () => {
    renderHook(() => useDevToolsWarning(), { wrapper });
    expect(console.log).toHaveBeenCalled();
    expect((console.log as jest.Mock).mock.calls.length).toBeGreaterThan(0);
  });

  it("logs the title message with styling", () => {
    renderHook(() => useDevToolsWarning(), { wrapper });
    const calls = (console.log as jest.Mock).mock.calls;
    const titleCall = calls.find((call: string[]) => call[0]?.includes("HALT, CURIOUS WANDERER"));
    expect(titleCall).toBeDefined();
  });

  it("logs the warning message", () => {
    renderHook(() => useDevToolsWarning(), { wrapper });
    const calls = (console.log as jest.Mock).mock.calls;
    const warningCall = calls.find((call: string[]) => call[0]?.includes("Forbidden Forest"));
    expect(warningCall).toBeDefined();
  });

  it("logs the management signature", () => {
    renderHook(() => useDevToolsWarning(), { wrapper });
    const calls = (console.log as jest.Mock).mock.calls;
    const signatureCall = calls.find((call: string[]) => call[0]?.includes("Management"));
    expect(signatureCall).toBeDefined();
  });

  it("uses theme colors in styling", () => {
    renderHook(() => useDevToolsWarning(), { wrapper });
    const calls = (console.log as jest.Mock).mock.calls;
    const hasThemeColor = calls.some((call: string[]) =>
      call.some((arg: string) => typeof arg === "string" && arg.includes("#66bb6a")),
    );
    expect(hasThemeColor).toBe(true);
  });
});
