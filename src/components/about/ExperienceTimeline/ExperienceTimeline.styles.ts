import { styled, keyframes } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { fontFamilies } from "@/theme/theme";

const GRID_GAP = 8;
const MOBILE_DOT_SIZE = 16;
const MOBILE_LINE_LEFT = 20;
const MOBILE_CONTENT_LEFT = MOBILE_LINE_LEFT + 24;

const glowPulse = keyframes`
  0%, 100% { box-shadow: 0 0 6px currentColor; }
  50% { box-shadow: 0 0 18px currentColor, 0 0 36px currentColor; }
`;

export const SectionRoot = styled("section")(({ theme }) => {
  const isDark = theme.palette.mode === "dark";
  return {
    paddingTop: theme.spacing(12),
    paddingBottom: theme.spacing(12),
    position: "relative",
    overflow: "hidden",
    background: isDark
      ? "radial-gradient(ellipse 90% 50% at 50% 50%, rgba(13,34,22,0.8) 0%, #0a1a0f 70%)"
      : "radial-gradient(ellipse 90% 50% at 50% 50%, rgba(232,245,233,0.6) 0%, #f1f8e9 70%)",
    "&::before": {
      content: '""',
      position: "absolute",
      inset: 0,
      backgroundImage: isDark
        ? "radial-gradient(circle at 1px 1px, rgba(102,187,106,0.04) 1px, transparent 0)"
        : "radial-gradient(circle at 1px 1px, rgba(46,125,50,0.03) 1px, transparent 0)",
      backgroundSize: "40px 40px",
      pointerEvents: "none",
    },
    [theme.breakpoints.up("md")]: {
      paddingTop: theme.spacing(16),
      paddingBottom: theme.spacing(16),
    },
  };
});

export const SectionTitle = styled("h2")(({ theme }) => ({
  textAlign: "center",
  fontFamily: fontFamilies.heading,
  fontWeight: 700,
  fontSize: "2rem",
  letterSpacing: "-0.02em",
  marginBottom: theme.spacing(2),
  backgroundImage: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
  backgroundClip: "text",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  [theme.breakpoints.up("md")]: {
    fontSize: "2.75rem",
  },
}));

export const SectionSubtitle = styled(Typography)(({ theme }) => ({
  textAlign: "center",
  fontFamily: fontFamilies.body,
  color: theme.palette.text.secondary,
  fontSize: "0.95rem",
  marginBottom: theme.spacing(8),
  maxWidth: 500,
  marginLeft: "auto",
  marginRight: "auto",
  lineHeight: 1.6,
  [theme.breakpoints.up("md")]: {
    marginBottom: theme.spacing(10),
  },
}));

export const TimelineGrid = styled(Box)(({ theme }) => ({
  position: "relative",
  maxWidth: 1000,
  marginLeft: "auto",
  marginRight: "auto",
  paddingLeft: MOBILE_CONTENT_LEFT,
  [theme.breakpoints.up("md")]: {
    paddingLeft: 0,
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: `${theme.spacing(4)} ${theme.spacing(GRID_GAP)}`,
  },
}));

export const CenterLine = styled(Box)(({ theme }) => {
  const isDark = theme.palette.mode === "dark";
  return {
    position: "absolute",
    top: 0,
    bottom: 0,
    width: 2,
    left: MOBILE_LINE_LEFT,
    background: isDark
      ? `linear-gradient(180deg, ${theme.palette.primary.main}00, ${theme.palette.primary.main}80, ${theme.palette.secondary.main}80, ${theme.palette.primary.main}00)`
      : `linear-gradient(180deg, ${theme.palette.primary.dark}00, ${theme.palette.primary.dark}50, ${theme.palette.secondary.dark}50, ${theme.palette.primary.dark}00)`,
    [theme.breakpoints.up("md")]: {
      left: "50%",
      marginLeft: -1,
    },
  };
});

export const LeftColumn = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing(4),
  [theme.breakpoints.up("md")]: {
    textAlign: "right",
  },
}));

export const RightColumn = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing(4),
  [theme.breakpoints.up("md")]: {
    paddingTop: theme.spacing(16),
  },
}));

export const CardWrapper = styled(Box)(({ theme }) => ({
  position: "relative",
  marginBottom: theme.spacing(5),
  [theme.breakpoints.up("md")]: {
    marginBottom: 0,
  },
}));

const halfGap = (GRID_GAP * 8) / 2;
const desktopDotOffset = halfGap + MOBILE_DOT_SIZE / 2;

const mobileDotOffset = MOBILE_CONTENT_LEFT - MOBILE_LINE_LEFT - 1 + MOBILE_DOT_SIZE / 2;

export const TimelineDot = styled(Box)<{ side?: "left" | "right" }>(({ theme, side = "left" }) => {
  const isDark = theme.palette.mode === "dark";
  return {
    position: "absolute",
    left: -mobileDotOffset,
    top: theme.spacing(2.5),
    width: MOBILE_DOT_SIZE,
    height: MOBILE_DOT_SIZE,
    borderRadius: "50%",
    background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
    color: theme.palette.primary.main,
    animation: `${glowPulse} 3s ease-in-out infinite`,
    zIndex: 2,
    "&::after": {
      content: '""',
      position: "absolute",
      inset: -4,
      borderRadius: "50%",
      border: `1.5px solid ${isDark ? "rgba(102,187,106,0.15)" : "rgba(46,125,50,0.1)"}`,
    },
    [theme.breakpoints.up("md")]:
      side === "left"
        ? { left: "auto", right: -desktopDotOffset }
        : { right: "auto", left: -desktopDotOffset },
  };
});

export const TimelineCard = styled(Box)(({ theme }) => {
  const isDark = theme.palette.mode === "dark";
  return {
    padding: theme.spacing(3),
    borderRadius: theme.spacing(2.5),
    background: isDark ? "rgba(18,38,26,0.35)" : "rgba(255,255,255,0.65)",
    backdropFilter: "blur(24px)",
    WebkitBackdropFilter: "blur(24px)",
    border: `1px solid ${isDark ? "rgba(102,187,106,0.1)" : "rgba(46,125,50,0.08)"}`,
    boxShadow: isDark
      ? "0 4px 32px rgba(0,0,0,0.3), inset 0 1px 0 rgba(102,187,106,0.04)"
      : "0 4px 32px rgba(0,0,0,0.04), inset 0 1px 0 rgba(255,255,255,0.8)",
    transition:
      "transform 0.4s cubic-bezier(0.25, 0.8, 0.25, 1), box-shadow 0.4s cubic-bezier(0.25, 0.8, 0.25, 1), border-color 0.3s",
    "&:hover": {
      transform: "translateY(-4px)",
      borderColor: isDark ? "rgba(102,187,106,0.2)" : "rgba(46,125,50,0.15)",
      boxShadow: isDark
        ? `0 12px 48px rgba(0,0,0,0.4), 0 0 0 1px ${theme.palette.primary.main}15`
        : `0 12px 48px rgba(0,0,0,0.08), 0 0 0 1px ${theme.palette.primary.main}10`,
    },
    [theme.breakpoints.up("md")]: {
      padding: theme.spacing(4),
    },
  };
});

export const CardTitle = styled(Typography)(({ theme }) => ({
  fontFamily: fontFamilies.heading,
  fontWeight: 600,
  fontSize: "1.15rem",
  color: theme.palette.text.primary,
  marginBottom: theme.spacing(0.5),
  [theme.breakpoints.up("md")]: {
    fontSize: "1.25rem",
  },
}));

export const CardCompany = styled(Typography)(({ theme }) => ({
  fontWeight: 600,
  fontSize: "0.9rem",
  color: theme.palette.primary.main,
  marginBottom: theme.spacing(0.5),
}));

export const CardDate = styled(Typography)(({ theme }) => ({
  fontSize: "0.75rem",
  fontWeight: 600,
  color: theme.palette.text.secondary,
  fontFamily: fontFamilies.mono,
  marginBottom: theme.spacing(1.5),
  opacity: 0.7,
  letterSpacing: "0.02em",
}));

export const CardDescription = styled(Typography)(({ theme }) => ({
  fontFamily: fontFamilies.body,
  fontSize: "0.9rem",
  lineHeight: 1.75,
  color: theme.palette.text.secondary,
}));
