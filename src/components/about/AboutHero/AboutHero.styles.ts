import { styled, keyframes } from "@mui/material/styles";
import Box, { type BoxProps } from "@mui/material/Box";
import Typography, { type TypographyProps } from "@mui/material/Typography";
import type { ElementType } from "react";

const float1 = keyframes`
  0%, 100% { transform: translate(0, 0) scale(1); }
  25% { transform: translate(40px, -30px) scale(1.08); }
  50% { transform: translate(-10px, 20px) scale(0.95); }
  75% { transform: translate(30px, 10px) scale(1.03); }
`;

const float2 = keyframes`
  0%, 100% { transform: translate(0, 0) scale(1); }
  25% { transform: translate(-35px, 35px) scale(0.96); }
  50% { transform: translate(25px, -15px) scale(1.06); }
  75% { transform: translate(-20px, -25px) scale(0.98); }
`;

const float3 = keyframes`
  0%, 100% { transform: translate(0, 0) scale(1); }
  33% { transform: translate(20px, 40px) scale(1.1); }
  66% { transform: translate(-30px, -10px) scale(0.92); }
`;

const shimmer = keyframes`
  0% { background-position: -200% center; }
  100% { background-position: 200% center; }
`;

const pulseRing = keyframes`
  0% { transform: scale(0.8); opacity: 0.6; }
  50% { transform: scale(1.2); opacity: 0; }
  100% { transform: scale(0.8); opacity: 0; }
`;

export const HeroRoot = styled(Box)<BoxProps & { component?: ElementType }>(({ theme }) => {
  const isDark = theme.palette.mode === "dark";
  return {
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    overflow: "visible",
    padding: `${theme.spacing(14)} ${theme.spacing(3)} ${theme.spacing(10)}`,
    background: isDark
      ? "radial-gradient(ellipse 80% 60% at 50% 40%, rgba(16,45,25,0.8) 0%, #0a1a0f 70%)"
      : "radial-gradient(ellipse 80% 60% at 50% 40%, rgba(200,230,201,0.5) 0%, #f1f8e9 70%)",
    "&::before": {
      content: '""',
      position: "absolute",
      inset: 0,
      background: isDark
        ? "radial-gradient(circle at 20% 80%, rgba(102,187,106,0.04) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(128,203,196,0.03) 0%, transparent 50%)"
        : "radial-gradient(circle at 20% 80%, rgba(46,125,50,0.03) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(0,137,123,0.02) 0%, transparent 50%)",
      pointerEvents: "none",
    },
    [theme.breakpoints.up("md")]: {
      padding: `${theme.spacing(18)} ${theme.spacing(6)} ${theme.spacing(14)}`,
    },
  };
});

export const BlobContainer = styled(Box)({
  position: "absolute",
  inset: 0,
  overflow: "hidden",
  pointerEvents: "none",
});

export const FloatingBlob = styled(Box)<{ variant: 1 | 2 | 3 }>(({ theme, variant }) => {
  const isDark = theme.palette.mode === "dark";
  const configs: Record<
    number,
    {
      size: number;
      top: string;
      left: string;
      animation: ReturnType<typeof keyframes>;
      duration: string;
      opacity: number;
    }
  > = {
    1: {
      size: 500,
      top: "5%",
      left: "10%",
      animation: float1,
      duration: "24s",
      opacity: isDark ? 0.12 : 0.08,
    },
    2: {
      size: 400,
      top: "55%",
      left: "65%",
      animation: float2,
      duration: "28s",
      opacity: isDark ? 0.1 : 0.06,
    },
    3: {
      size: 300,
      top: "25%",
      left: "75%",
      animation: float3,
      duration: "20s",
      opacity: isDark ? 0.08 : 0.05,
    },
  };
  const c = configs[variant];

  return {
    position: "absolute",
    width: c.size,
    height: c.size,
    borderRadius: "50%",
    background: isDark
      ? `radial-gradient(circle, rgba(102,187,106,${c.opacity}) 0%, rgba(128,203,196,${c.opacity * 0.5}) 40%, transparent 70%)`
      : `radial-gradient(circle, rgba(46,125,50,${c.opacity}) 0%, rgba(0,137,123,${c.opacity * 0.5}) 40%, transparent 70%)`,
    filter: "blur(80px)",
    animation: `${c.animation} ${c.duration} ease-in-out infinite`,
    pointerEvents: "none",
    top: c.top,
    left: c.left,
    [theme.breakpoints.down("sm")]: {
      width: c.size * 0.5,
      height: c.size * 0.5,
      filter: "blur(50px)",
    },
  };
});

export const HeroContent = styled(Box)(({ theme }) => ({
  position: "relative",
  zIndex: 1,
  maxWidth: 800,
  textAlign: "center",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  [theme.breakpoints.up("md")]: {
    maxWidth: 900,
  },
}));

export const HeroHeading = styled(Typography)<TypographyProps & { component?: ElementType }>(({
  theme,
}) => {
  const isDark = theme.palette.mode === "dark";
  return {
    fontWeight: 800,
    fontSize: "2.2rem",
    lineHeight: 1.15,
    letterSpacing: "-0.03em",
    backgroundImage: isDark
      ? `linear-gradient(135deg, ${theme.palette.primary.light} 0%, ${theme.palette.secondary.light} 50%, ${theme.palette.primary.light} 100%)`
      : `linear-gradient(135deg, ${theme.palette.primary.dark} 0%, ${theme.palette.secondary.dark} 50%, ${theme.palette.primary.dark} 100%)`,
    backgroundSize: "200% auto",
    backgroundClip: "text",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    animation: `${shimmer} 6s linear infinite`,
    marginBottom: theme.spacing(4),
    [theme.breakpoints.up("sm")]: {
      fontSize: "3rem",
    },
    [theme.breakpoints.up("md")]: {
      fontSize: "3.75rem",
    },
  };
});

export const HeroSubheading = styled(Typography)(({ theme }) => ({
  fontSize: "1.1rem",
  fontWeight: 500,
  color: theme.palette.primary.main,
  letterSpacing: "0.15em",
  textTransform: "uppercase",
  marginBottom: theme.spacing(2),
  fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
  [theme.breakpoints.up("md")]: {
    fontSize: "1.2rem",
  },
}));

export const HeroParagraph = styled(Typography)(({ theme }) => ({
  fontSize: "1.05rem",
  lineHeight: 1.85,
  color: theme.palette.text.secondary,
  maxWidth: 620,
  marginLeft: "auto",
  marginRight: "auto",
  marginBottom: theme.spacing(4),
  [theme.breakpoints.up("md")]: {
    fontSize: "1.15rem",
  },
}));

export const ReadingNote = styled(Box)(({ theme }) => {
  const isDark = theme.palette.mode === "dark";
  return {
    display: "inline-flex",
    flexDirection: "column",
    alignItems: "center",
    gap: theme.spacing(1.5),
    padding: `${theme.spacing(2.5)} ${theme.spacing(3.5)}`,
    borderRadius: theme.spacing(2.5),
    background: isDark ? "rgba(18,38,26,0.45)" : "rgba(255,255,255,0.6)",
    border: `1px solid ${isDark ? "rgba(102,187,106,0.12)" : "rgba(46,125,50,0.1)"}`,
    backdropFilter: "blur(20px)",
    WebkitBackdropFilter: "blur(20px)",
    boxShadow: isDark
      ? "0 4px 24px rgba(0,0,0,0.2), inset 0 1px 0 rgba(102,187,106,0.05)"
      : "0 4px 24px rgba(0,0,0,0.03), inset 0 1px 0 rgba(255,255,255,0.8)",
    marginBottom: theme.spacing(2),
    maxWidth: 560,
    "& a": {
      color: theme.palette.primary.main,
      textDecoration: "none",
      fontWeight: 600,
      transition: "color 0.2s, letter-spacing 0.2s",
      "&:hover": {
        color: theme.palette.primary.light,
        letterSpacing: "0.02em",
      },
    },
  };
});

export const ScrollCue = styled(Box)(({ theme }) => {
  const isDark = theme.palette.mode === "dark";
  return {
    position: "absolute",
    bottom: theme.spacing(4),
    left: "50%",
    transform: "translateX(-50%)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: theme.spacing(1),
    zIndex: 1,
    "& .scroll-dot": {
      width: 6,
      height: 6,
      borderRadius: "50%",
      background: theme.palette.primary.main,
    },
    "& .scroll-ring": {
      position: "absolute",
      width: 24,
      height: 24,
      borderRadius: "50%",
      border: `1.5px solid ${isDark ? "rgba(102,187,106,0.3)" : "rgba(46,125,50,0.2)"}`,
      animation: `${pulseRing} 2s ease-in-out infinite`,
    },
    "& .scroll-text": {
      fontSize: "0.65rem",
      fontFamily: "'JetBrains Mono', monospace",
      color: theme.palette.text.secondary,
      opacity: 0.5,
      letterSpacing: "0.1em",
      textTransform: "uppercase",
      marginTop: theme.spacing(1.5),
    },
    [theme.breakpoints.down("sm")]: {
      bottom: theme.spacing(2),
    },
  };
});
