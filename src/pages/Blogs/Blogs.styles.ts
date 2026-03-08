import { styled, keyframes } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { fontFamilies } from "@/theme/theme";

const shimmer = keyframes`
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
`;

export const PageRoot = styled(Box)(({ theme }) => ({
  minHeight: "100vh",
  backgroundColor: theme.palette.background.default,
  position: "relative",
  overflow: "hidden",
}));

export const HeroSection = styled(Box)(({ theme }) => {
  const isDark = theme.palette.mode === "dark";
  return {
    position: "relative",
    padding: theme.spacing(16, 0, 12),
    textAlign: "center",
    background: isDark
      ? "linear-gradient(180deg, #0a1a0f 0%, #0d2018 50%, #0a1a0f 100%)"
      : "linear-gradient(180deg, #f1f8e9 0%, #e8f0e0 50%, #f1f8e9 100%)",
    overflow: "hidden",
    "&::before": {
      content: '""',
      position: "absolute",
      inset: 0,
      background: isDark
        ? "radial-gradient(ellipse 80% 50% at 50% 0%, rgba(102, 187, 106, 0.15), transparent)"
        : "radial-gradient(ellipse 80% 50% at 50% 0%, rgba(46, 125, 50, 0.1), transparent)",
      pointerEvents: "none",
    },
    [theme.breakpoints.up("md")]: {
      padding: theme.spacing(20, 0, 16),
    },
  };
});

export const HeroTitle = styled("h1")(({ theme }) => ({
  fontFamily: fontFamilies.heading,
  fontSize: "2.5rem",
  fontWeight: 700,
  letterSpacing: "-0.02em",
  marginBottom: theme.spacing(2),
  background: `linear-gradient(135deg, ${theme.palette.text.primary} 0%, ${theme.palette.primary.main} 50%, ${theme.palette.secondary.main} 100%)`,
  backgroundSize: "200% auto",
  backgroundClip: "text",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  animation: `${shimmer} 4s linear infinite`,
  [theme.breakpoints.up("sm")]: {
    fontSize: "3rem",
  },
  [theme.breakpoints.up("md")]: {
    fontSize: "4rem",
  },
}));

export const HeroSubtitle = styled(Typography)(({ theme }) => ({
  fontFamily: fontFamilies.body,
  color: theme.palette.text.secondary,
  fontSize: "1rem",
  maxWidth: 600,
  margin: "0 auto",
  lineHeight: 1.7,
  [theme.breakpoints.up("md")]: {
    fontSize: "1.2rem",
  },
}));

export const BlogsContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: 0,
  [theme.breakpoints.up("lg")]: {
    flexDirection: "row",
    gap: 0,
  },
}));

export const SectionDivider = styled(Box)(({ theme }) => {
  const isDark = theme.palette.mode === "dark";
  return {
    display: "none",
    [theme.breakpoints.up("lg")]: {
      display: "block",
      width: 2,
      background: isDark
        ? "linear-gradient(180deg, transparent 0%, rgba(102, 187, 106, 0.3) 20%, rgba(212, 165, 116, 0.3) 80%, transparent 100%)"
        : "linear-gradient(180deg, transparent 0%, rgba(46, 125, 50, 0.2) 20%, rgba(92, 64, 51, 0.2) 80%, transparent 100%)",
      position: "relative",
      "&::before": {
        content: '""',
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: 12,
        height: 12,
        borderRadius: "50%",
        background: isDark
          ? "linear-gradient(135deg, #00ff41, #d4a574)"
          : "linear-gradient(135deg, #1a5c1a, #5c4033)",
        boxShadow: isDark ? "0 0 20px rgba(102, 187, 106, 0.5)" : "0 0 15px rgba(46, 125, 50, 0.3)",
      },
    },
  };
});
