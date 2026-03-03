import { useMemo, useState } from "react";
import type { PaletteMode } from "@mui/material";
import { createAppTheme } from "@/theme";

const STORAGE_KEY = "color-mode";

const getInitialMode = (): PaletteMode => {
  if (typeof window === "undefined") return "dark";
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored === "light" || stored === "dark") return stored;
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
};

const useColorMode = () => {
  const [mode, setMode] = useState<PaletteMode>(getInitialMode);

  const toggleColorMode = () => {
    setMode((prev) => {
      const next = prev === "light" ? "dark" : "light";
      localStorage.setItem(STORAGE_KEY, next);
      return next;
    });
  };

  const theme = useMemo(() => createAppTheme(mode), [mode]);

  return { mode, theme, toggleColorMode };
};

export default useColorMode;
