import { styled, keyframes } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

const glowPulse = keyframes`
  0%, 100% { box-shadow: 0 0 8px currentColor, 0 0 16px currentColor; }
  50% { box-shadow: 0 0 16px currentColor, 0 0 32px currentColor; }
`;

const MOBILE_DOT_SIZE = 14;
const MOBILE_LINE_LEFT = 20;
const MOBILE_CONTENT_LEFT = MOBILE_LINE_LEFT + 20;

export const TimelineRoot = styled(Box)(({ theme }) => ({
  position: "relative",
  marginTop: theme.spacing(6),
  paddingBottom: theme.spacing(2),
  [theme.breakpoints.up("md")]: {
    marginTop: theme.spacing(10),
    paddingTop: theme.spacing(18),
  },
}));

/* ── MOBILE: vertical list layout ── */

export const MobileList = styled(Box)(() => ({
  display: "flex",
  flexDirection: "column",
  position: "relative",
  paddingLeft: MOBILE_CONTENT_LEFT,
}));

export const MobileVerticalLine = styled(Box)(({ theme }) => {
  const isDark = theme.palette.mode === "dark";
  return {
    position: "absolute",
    left: MOBILE_LINE_LEFT,
    top: 0,
    bottom: 0,
    width: 2,
    background: isDark
      ? `linear-gradient(180deg, transparent, ${theme.palette.primary.main}80, transparent)`
      : `linear-gradient(180deg, transparent, ${theme.palette.primary.dark}50, transparent)`,
  };
});

export const MobileItem = styled(Box)(({ theme }) => ({
  position: "relative",
  cursor: "pointer",
  padding: `${theme.spacing(2)} 0`,
}));

export const MobileDot = styled(Box)(({ theme }) => {
  const isDark = theme.palette.mode === "dark";
  const offset = MOBILE_CONTENT_LEFT - MOBILE_LINE_LEFT - 1 + MOBILE_DOT_SIZE / 2;
  return {
    position: "absolute",
    left: -offset,
    top: 20,
    width: MOBILE_DOT_SIZE,
    height: MOBILE_DOT_SIZE,
    borderRadius: "50%",
    background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
    boxShadow: isDark
      ? `0 0 10px ${theme.palette.primary.main}40`
      : `0 0 6px ${theme.palette.primary.main}30`,
    zIndex: 1,
    transition: "transform 0.3s",
  };
});

export const MobileYear = styled(Typography)(({ theme }) => ({
  fontSize: "0.72rem",
  fontWeight: 700,
  color: theme.palette.primary.main,
  fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
  marginBottom: theme.spacing(0.25),
}));

export const MobileTitle = styled(Typography)(({ theme }) => ({
  fontSize: "0.9rem",
  fontWeight: 600,
  color: theme.palette.text.primary,
  lineHeight: 1.3,
}));

export const MobileDescription = styled(Typography)(({ theme }) => ({
  fontSize: "0.8rem",
  color: theme.palette.text.secondary,
  lineHeight: 1.6,
  marginTop: theme.spacing(0.75),
}));

/* ── DESKTOP: horizontal layout ── */

export const TimelineTrack = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "flex-start",
  position: "relative",
  justifyContent: "center",
  [theme.breakpoints.up("md")]: {
    gap: theme.spacing(1),
  },
}));

export const TimelineLine = styled(Box)(({ theme }) => {
  const isDark = theme.palette.mode === "dark";
  return {
    position: "absolute",
    top: 20,
    left: "10%",
    right: "10%",
    height: 2,
    background: isDark
      ? `linear-gradient(90deg, transparent, ${theme.palette.primary.main}, transparent)`
      : `linear-gradient(90deg, transparent, ${theme.palette.primary.dark}, transparent)`,
    transformOrigin: "left center",
  };
});

export const MilestoneNode = styled(Box)(() => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  position: "relative",
  flex: 1,
  cursor: "pointer",
}));

export const MilestoneDot = styled(Box)(({ theme }) => {
  const isDark = theme.palette.mode === "dark";
  return {
    width: 18,
    height: 18,
    borderRadius: "50%",
    background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
    color: theme.palette.primary.main,
    boxShadow: isDark
      ? `0 0 12px ${theme.palette.primary.main}40, 0 0 24px ${theme.palette.primary.main}20`
      : `0 0 8px ${theme.palette.primary.main}30`,
    position: "relative",
    zIndex: 2,
    transition: "transform 0.3s, box-shadow 0.3s",
    "&::after": {
      content: '""',
      position: "absolute",
      inset: -4,
      borderRadius: "50%",
      border: `1.5px solid ${isDark ? "rgba(102,187,106,0.2)" : "rgba(46,125,50,0.15)"}`,
      opacity: 0,
      transition: "opacity 0.3s",
    },
  };
});

export const MilestoneYear = styled("span")(({ theme }) => ({
  display: "block",
  fontSize: "0.75rem",
  fontWeight: 700,
  color: theme.palette.primary.main,
  marginTop: theme.spacing(1.5),
  fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
}));

export const MilestoneTitle = styled(Typography)(({ theme }) => ({
  fontSize: "0.82rem",
  fontWeight: 600,
  color: theme.palette.text.primary,
  marginTop: theme.spacing(0.5),
  textAlign: "center",
  maxWidth: 140,
  lineHeight: 1.3,
}));

export const TooltipCard = styled(Box)(({ theme }) => {
  const isDark = theme.palette.mode === "dark";
  return {
    padding: `${theme.spacing(1.5)} ${theme.spacing(2)}`,
    borderRadius: theme.spacing(1.5),
    background: isDark ? "rgba(18,38,26,0.95)" : "rgba(255,255,255,0.95)",
    backdropFilter: "blur(16px)",
    border: `1px solid ${isDark ? "rgba(102,187,106,0.15)" : "rgba(46,125,50,0.1)"}`,
    boxShadow: isDark ? "0 8px 32px rgba(0,0,0,0.4)" : "0 8px 32px rgba(0,0,0,0.08)",
    width: 220,
    pointerEvents: "none",
    "& .tooltip-text": {
      fontSize: "0.78rem",
      color: theme.palette.text.secondary,
      lineHeight: 1.5,
      textAlign: "center",
    },
  };
});

export const ActiveIndicator = styled(Box)(({ theme }) => ({
  width: 8,
  height: 8,
  borderRadius: "50%",
  background: theme.palette.primary.main,
  marginTop: theme.spacing(1),
  animation: `${glowPulse} 2s ease-in-out infinite`,
  color: theme.palette.primary.main,
}));
