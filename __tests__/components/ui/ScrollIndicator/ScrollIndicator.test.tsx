import { render } from "@testing-library/react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import ScrollIndicator from "@/components/ui/ScrollIndicator/ScrollIndicator";

const mockTheme = createTheme({
  palette: {
    mode: "dark",
    primary: { main: "#66bb6a", light: "#a5d6a7" },
    secondary: { main: "#80cbc4" },
  },
});

const renderWithTheme = (component: React.ReactElement) => {
  return render(<ThemeProvider theme={mockTheme}>{component}</ThemeProvider>);
};

describe("ScrollIndicator", () => {
  it("renders without crashing", () => {
    renderWithTheme(<ScrollIndicator />);
  });

  it("renders a fixed position container", () => {
    const { container } = renderWithTheme(<ScrollIndicator />);
    const box = container.firstChild as HTMLElement;
    expect(box).toHaveStyle({ position: "fixed" });
  });

  it("renders at the top of the page", () => {
    const { container } = renderWithTheme(<ScrollIndicator />);
    const box = container.firstChild as HTMLElement;
    expect(box).toHaveStyle({ top: "0px" });
  });

  it("renders with correct height", () => {
    const { container } = renderWithTheme(<ScrollIndicator />);
    const box = container.firstChild as HTMLElement;
    expect(box).toHaveStyle({ height: "4px" });
  });

  it("contains a motion div for the progress bar", () => {
    const { container } = renderWithTheme(<ScrollIndicator />);
    const progressBar = container.querySelector("div > div");
    expect(progressBar).toBeInTheDocument();
  });
});
