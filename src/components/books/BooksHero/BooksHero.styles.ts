import { styled, keyframes } from "@mui/material/styles";
import Box, { type BoxProps } from "@mui/material/Box";
import Typography, { type TypographyProps } from "@mui/material/Typography";
import type { ElementType } from "react";

const shimmer = keyframes`
  0% { background-position: -200% center; }
  100% { background-position: 200% center; }
`;

export const HeroRoot = styled(Box)<BoxProps & { component?: ElementType }>(({ theme }) => {
  const isDark = theme.palette.mode === "dark";
  return {
    paddingTop: theme.spacing(18),
    paddingBottom: theme.spacing(8),
    position: "relative",
    overflow: "hidden",
    textAlign: "center",
    background: isDark
      ? "radial-gradient(ellipse 80% 60% at 50% 30%, rgba(16,45,25,0.8) 0%, #0a1a0f 70%)"
      : "radial-gradient(ellipse 80% 60% at 50% 30%, rgba(200,230,201,0.5) 0%, #f1f8e9 70%)",
    [theme.breakpoints.up("md")]: {
      paddingTop: theme.spacing(22),
      paddingBottom: theme.spacing(10),
    },
  };
});

export const HeroTitle = styled(Typography)<TypographyProps & { component?: ElementType }>(({
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
    marginBottom: theme.spacing(2),
    [theme.breakpoints.up("sm")]: {
      fontSize: "3rem",
    },
    [theme.breakpoints.up("md")]: {
      fontSize: "3.5rem",
    },
  };
});

export const HeroSubtitle = styled(Typography)(({ theme }) => ({
  fontSize: "1rem",
  lineHeight: 1.7,
  color: theme.palette.text.secondary,
  maxWidth: 520,
  marginLeft: "auto",
  marginRight: "auto",
  [theme.breakpoints.up("md")]: {
    fontSize: "1.1rem",
  },
}));

export const BookCount = styled(Typography)(({ theme }) => ({
  fontSize: "0.8rem",
  fontWeight: 600,
  fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
  color: theme.palette.primary.main,
  letterSpacing: "0.1em",
  textTransform: "uppercase",
  marginBottom: theme.spacing(1.5),
}));
