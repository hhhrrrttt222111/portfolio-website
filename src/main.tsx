/* eslint-disable react-refresh/only-export-components */
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { ColorModeContext } from "@/context";
import useColorMode from "@/hooks/useColorMode";
import App from "@/App";

const Root = () => {
  const { theme, toggleColorMode } = useColorMode();

  return (
    <StrictMode>
      <ColorModeContext.Provider value={{ toggleColorMode }}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <App />
        </ThemeProvider>
      </ColorModeContext.Provider>
    </StrictMode>
  );
};

createRoot(document.getElementById("root")!).render(<Root />);
