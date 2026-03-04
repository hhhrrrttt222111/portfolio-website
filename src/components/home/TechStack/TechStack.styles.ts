import { styled, keyframes } from "@mui/material/styles";
import Box, { type BoxProps } from "@mui/material/Box";
import Typography, { type TypographyProps } from "@mui/material/Typography";
import type { ElementType } from "react";

const blink = keyframes`
  0%, 100% { opacity: 1; }
  50% { opacity: 0; }
`;

const scanline = keyframes`
  0% { top: -2px; }
  100% { top: 100%; }
`;

export const SectionRoot = styled(Box)<BoxProps & { component?: ElementType }>(({ theme }) => {
  const isDark = theme.palette.mode === "dark";
  return {
    paddingTop: theme.spacing(10),
    paddingBottom: theme.spacing(10),
    backgroundColor: isDark ? "#060d08" : "#f0f7ee",
    position: "relative",
    overflow: "hidden",
    "&::before": {
      content: '""',
      position: "absolute",
      inset: 0,
      backgroundImage: isDark
        ? "radial-gradient(circle at 1px 1px, rgba(102,187,106,0.16) 1px, transparent 0)"
        : "radial-gradient(circle at 1px 1px, rgba(46,125,50,0.14) 1px, transparent 0)",
      backgroundSize: "32px 32px",
      pointerEvents: "none",
    },
    [theme.breakpoints.up("md")]: {
      paddingTop: theme.spacing(14),
      paddingBottom: theme.spacing(14),
    },
  };
});

export const ScanlineOverlay = styled(Box)({
  position: "absolute",
  inset: 0,
  pointerEvents: "none",
  zIndex: 0,
  overflow: "hidden",
  "&::after": {
    content: '""',
    position: "absolute",
    width: "100%",
    height: 2,
    background: "rgba(102,187,106,0.24)",
    animation: `${scanline} 8s linear infinite`,
  },
});

export const SectionTitle = styled(Typography)<TypographyProps & { component?: ElementType }>(
  ({ theme }) => ({
    textAlign: "center",
    marginBottom: theme.spacing(1.5),
    fontWeight: 700,
    fontSize: "1.75rem",
    fontFamily: "'JetBrains Mono', 'Fira Code', 'Courier New', monospace",
    backgroundImage: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
    backgroundClip: "text",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    [theme.breakpoints.up("sm")]: { fontSize: "2rem" },
    [theme.breakpoints.up("md")]: { fontSize: "2.5rem" },
  }),
);

export const SectionSubtitle = styled(Typography)(({ theme }) => ({
  textAlign: "center",
  marginBottom: theme.spacing(6),
  color: theme.palette.text.secondary,
  maxWidth: 600,
  marginLeft: "auto",
  marginRight: "auto",
  fontSize: "0.9rem",
  lineHeight: 1.7,
  fontFamily: "'JetBrains Mono', 'Fira Code', 'Courier New', monospace",
  [theme.breakpoints.up("md")]: {
    marginBottom: theme.spacing(8),
    fontSize: "0.95rem",
  },
}));

export const MasonryGrid = styled(Box)(({ theme }) => ({
  columnCount: 1,
  columnGap: theme.spacing(3),
  [theme.breakpoints.up("md")]: {
    columnCount: 2,
  },
  "& > *": {
    breakInside: "avoid",
    marginBottom: theme.spacing(3),
  },
}));

export const TerminalWindow = styled(Box)(({ theme }) => {
  const isDark = theme.palette.mode === "dark";
  return {
    borderRadius: theme.spacing(2),
    overflow: "hidden",
    background: isDark ? "rgba(6, 13, 8, 0.9)" : "rgba(255, 255, 255, 0.7)",
    backdropFilter: "blur(20px)",
    WebkitBackdropFilter: "blur(20px)",
    border: `1px solid ${isDark ? "rgba(102,187,106,0.12)" : "rgba(46,125,50,0.1)"}`,
    boxShadow: isDark
      ? "0 8px 32px rgba(0,0,0,0.4), inset 0 1px 0 rgba(102,187,106,0.05)"
      : "0 8px 32px rgba(0,0,0,0.06), inset 0 1px 0 rgba(255,255,255,0.8)",
  };
});

export const TerminalTitleBar = styled(Box)(({ theme }) => {
  const isDark = theme.palette.mode === "dark";
  return {
    display: "flex",
    alignItems: "center",
    gap: theme.spacing(1),
    padding: `${theme.spacing(1.5)} ${theme.spacing(2)}`,
    background: isDark ? "rgba(18,38,26,0.6)" : "rgba(46,125,50,0.06)",
    borderBottom: `1px solid ${isDark ? "rgba(102,187,106,0.08)" : "rgba(46,125,50,0.06)"}`,
  };
});

export const DotGroup = styled(Box)(({ theme }) => ({
  display: "flex",
  gap: theme.spacing(0.75),
  "& span": {
    width: 10,
    height: 10,
    borderRadius: "50%",
    display: "block",
  },
  "& span:nth-of-type(1)": { background: "#ff5f57" },
  "& span:nth-of-type(2)": { background: "#febc2e" },
  "& span:nth-of-type(3)": { background: "#28c840" },
}));

export const TerminalTitle = styled(Typography)(({ theme }) => ({
  fontSize: "0.7rem",
  color: theme.palette.text.secondary,
  fontFamily: "'JetBrains Mono', 'Fira Code', 'Courier New', monospace",
  marginLeft: "auto",
  marginRight: "auto",
  opacity: 0.6,
}));

export const TerminalBody = styled(Box)(({ theme }) => ({
  padding: theme.spacing(3),
  [theme.breakpoints.down("sm")]: {
    padding: theme.spacing(2),
  },
}));

export const CommandLine = styled(Typography)(({ theme }) => ({
  fontFamily: "'JetBrains Mono', 'Fira Code', 'Courier New', monospace",
  fontSize: "0.8rem",
  color: theme.palette.primary.main,
  marginBottom: theme.spacing(2),
  display: "flex",
  alignItems: "center",
  gap: theme.spacing(1),
  "& .prompt": {
    color: theme.palette.secondary.main,
    fontWeight: 700,
  },
  "& .cursor": {
    display: "inline-block",
    width: 8,
    height: 16,
    background: theme.palette.primary.main,
    animation: `${blink} 1s step-end infinite`,
    marginLeft: 2,
    verticalAlign: "middle",
  },
}));

export const CategoryLabel = styled(Typography)(({ theme }) => ({
  fontFamily: "'JetBrains Mono', 'Fira Code', 'Courier New', monospace",
  fontSize: "0.95rem",
  fontWeight: 600,
  color: theme.palette.text.primary,
  marginBottom: theme.spacing(2.5),
  [theme.breakpoints.up("md")]: {
    fontSize: "1.05rem",
  },
}));

export const SkillBarTrack = styled(Box)(({ theme }) => {
  const isDark = theme.palette.mode === "dark";
  return {
    height: 32,
    borderRadius: 8,
    background: isDark ? "rgba(18,38,26,0.5)" : "rgba(46,125,50,0.06)",
    overflow: "hidden",
    position: "relative",
    display: "flex",
    alignItems: "center",
    cursor: "default",
    transition: "all 0.45s cubic-bezier(0.25, 0.8, 0.25, 1)",
    "&:hover": {
      transform: "translateX(4px)",
      background: isDark ? "rgba(18,38,26,0.65)" : "rgba(46,125,50,0.09)",
      boxShadow: isDark ? "0 2px 16px rgba(102,187,106,0.1)" : "0 2px 16px rgba(46,125,50,0.07)",
      "& .skill-fill": {
        opacity: 1,
        filter: "brightness(1.3)",
      },
      "& .skill-dot": {
        transform: "scale(1.4)",
        boxShadow: "0 0 8px currentColor",
      },
      "& .skill-label": {
        letterSpacing: "0.03em",
      },
    },
  };
});

export const SkillBarFill = styled(Box)({
  height: "100%",
  borderRadius: 6,
  position: "absolute",
  top: 0,
  left: 0,
  display: "flex",
  alignItems: "center",
});

export const SkillName = styled(Typography)(({ theme }) => ({
  fontFamily: "'JetBrains Mono', 'Fira Code', 'Courier New', monospace",
  fontSize: "0.72rem",
  fontWeight: 500,
  color: theme.palette.text.primary,
  position: "relative",
  zIndex: 1,
  paddingLeft: theme.spacing(1.5),
  whiteSpace: "nowrap",
  [theme.breakpoints.up("md")]: {
    fontSize: "0.78rem",
  },
}));

export const SkillChip = styled(Box)(({ theme }) => {
  const isDark = theme.palette.mode === "dark";
  return {
    display: "inline-flex",
    alignItems: "center",
    padding: `${theme.spacing(0.5)} ${theme.spacing(1.5)}`,
    borderRadius: theme.spacing(1),
    fontFamily: "'JetBrains Mono', 'Fira Code', 'Courier New', monospace",
    fontSize: "0.72rem",
    fontWeight: 500,
    color: theme.palette.text.primary,
    background: isDark ? "rgba(18,38,26,0.6)" : "rgba(46,125,50,0.06)",
    border: `1px solid ${isDark ? "rgba(102,187,106,0.1)" : "rgba(46,125,50,0.08)"}`,
    cursor: "default",
    transition: "border-color 0.3s, box-shadow 0.3s, transform 0.3s",
    [theme.breakpoints.up("md")]: {
      fontSize: "0.78rem",
    },
  };
});

export const TotalCounter = styled(Typography)(({ theme }) => ({
  fontFamily: "'JetBrains Mono', 'Fira Code', 'Courier New', monospace",
  fontSize: "0.7rem",
  color: theme.palette.text.secondary,
  marginTop: theme.spacing(1.5),
  opacity: 0.7,
}));
