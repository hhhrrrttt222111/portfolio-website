import { createTheme } from "@mui/material/styles";
import type { PaletteMode } from "@mui/material";

const fontFamilies = {
  heading: "'Space Grotesk', 'Helvetica Neue', sans-serif",
  body: "'Syne', 'Helvetica Neue', sans-serif",
  mono: "'JetBrains Mono', 'Fira Code', 'Consolas', monospace",
};

const scrollbar = (mode: PaletteMode) => {
  const isLight = mode === "light";
  const track = isLight ? "#e0e8dc" : "#0d1f14";
  const thumb = isLight ? "#5a8a5e" : "#66bb6a";
  const thumbHover = isLight ? "#3d6b40" : "#43a047";

  return {
    "*::-webkit-scrollbar": {
      width: 8,
    },
    "*::-webkit-scrollbar-track": {
      background: track,
    },
    "*::-webkit-scrollbar-thumb": {
      background: thumb,
      borderRadius: 4,
      "&:hover": {
        background: thumbHover,
      },
    },
    "*": {
      scrollbarWidth: "thin",
      scrollbarColor: `${thumb} ${track}`,
    },
  };
};

const getDesignTokens = (mode: PaletteMode) => ({
  palette: {
    mode,
    ...(mode === "light"
      ? {
          primary: {
            main: "#3d6b40",
            light: "#5a8a5e",
            dark: "#2d5030",
          },
          secondary: {
            main: "#4a7c72",
            light: "#6b9a90",
            dark: "#3a6258",
          },
          background: {
            default: "#d4ddd0",
            paper: "#e2e8de",
          },
          text: {
            primary: "#2a3d2a",
            secondary: "#5a6d5a",
          },
          divider: "rgba(0, 0, 0, 0.1)",
        }
      : {
          primary: {
            main: "#66bb6a",
            light: "#a5d6a7",
            dark: "#43a047",
          },
          secondary: {
            main: "#80cbc4",
            light: "#b2dfdb",
            dark: "#4db6ac",
          },
          background: {
            default: "#0a1a0f",
            paper: "#12261a",
          },
          text: {
            primary: "#e0e8e0",
            secondary: "#a0b8a8",
          },
          divider: "rgba(255, 255, 255, 0.12)",
        }),
  },
  typography: {
    fontFamily: fontFamilies.body,
    h1: {
      fontFamily: fontFamilies.heading,
      fontWeight: 700,
      letterSpacing: "-0.02em",
    },
    h2: {
      fontFamily: fontFamilies.heading,
      fontWeight: 700,
      letterSpacing: "-0.01em",
    },
    h3: {
      fontFamily: fontFamilies.heading,
      fontWeight: 600,
      letterSpacing: "-0.01em",
    },
    h4: {
      fontFamily: fontFamilies.heading,
      fontWeight: 600,
    },
    h5: {
      fontFamily: fontFamilies.heading,
      fontWeight: 500,
    },
    h6: {
      fontFamily: fontFamilies.heading,
      fontWeight: 500,
    },
    subtitle1: {
      fontFamily: fontFamilies.body,
      fontWeight: 500,
    },
    subtitle2: {
      fontFamily: fontFamilies.body,
      fontWeight: 500,
    },
    body1: {
      fontFamily: fontFamilies.body,
      fontWeight: 400,
      lineHeight: 1.7,
    },
    body2: {
      fontFamily: fontFamilies.body,
      fontWeight: 400,
      lineHeight: 1.6,
    },
    button: {
      fontFamily: fontFamilies.body,
      fontWeight: 600,
      textTransform: "none" as const,
    },
    caption: {
      fontFamily: fontFamilies.mono,
      fontWeight: 400,
    },
    overline: {
      fontFamily: fontFamilies.mono,
      fontWeight: 500,
      letterSpacing: "0.15em",
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: scrollbar(mode),
    },
  },
  shape: {
    borderRadius: 8,
  },
  spacing: 8,
});

export const createAppTheme = (mode: PaletteMode) => createTheme(getDesignTokens(mode));

export { fontFamilies };
