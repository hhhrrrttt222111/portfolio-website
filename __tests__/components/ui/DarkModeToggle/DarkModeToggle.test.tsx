import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { ColorModeContext } from "@/context";
import DarkModeToggle from "@/components/ui/DarkModeToggle/DarkModeToggle";

const lightTheme = createTheme({ palette: { mode: "light" } });
const darkTheme = createTheme({ palette: { mode: "dark" } });

const renderToggle = (mode: "light" | "dark" = "light", toggleColorMode = jest.fn()) => {
  const theme = mode === "light" ? lightTheme : darkTheme;
  return {
    toggleColorMode,
    ...render(
      <ColorModeContext.Provider value={{ toggleColorMode }}>
        <ThemeProvider theme={theme}>
          <DarkModeToggle />
        </ThemeProvider>
      </ColorModeContext.Provider>,
    ),
  };
};

describe("DarkModeToggle", () => {
  it("renders without crashing", () => {
    renderToggle();
    expect(screen.getByRole("button", { name: /toggle dark mode/i })).toBeInTheDocument();
  });

  it("shows DarkModeIcon in light mode", () => {
    renderToggle("light");
    expect(screen.getByTestId("DarkModeIcon")).toBeInTheDocument();
  });

  it("shows LightModeIcon in dark mode", () => {
    renderToggle("dark");
    expect(screen.getByTestId("LightModeIcon")).toBeInTheDocument();
  });

  it("calls toggleColorMode when clicked", () => {
    const toggleColorMode = jest.fn();
    renderToggle("light", toggleColorMode);
    fireEvent.click(screen.getByRole("button", { name: /toggle dark mode/i }));
    expect(toggleColorMode).toHaveBeenCalledTimes(1);
  });

  it("matches snapshot in light mode", () => {
    const { container } = renderToggle("light");
    expect(container).toMatchSnapshot();
  });

  it("matches snapshot in dark mode", () => {
    const { container } = renderToggle("dark");
    expect(container).toMatchSnapshot();
  });
});
