import { styled } from "@mui/material/styles";
import { Box, Typography } from "@mui/material";
import type { BoxProps } from "@mui/material/Box";
import type { TypographyProps } from "@mui/material/Typography";
import type { ElementType } from "react";

export const LandingRoot = styled(Box)<BoxProps & { component?: ElementType }>(({ theme }) => ({
  backgroundColor: theme.palette.background.default,
  height: "100vh",
  position: "relative",
  overflow: "hidden",
  display: "flex",
  alignItems: "center",
  [theme.breakpoints.up("md")]: {
    padding: theme.spacing(0, 0, 0, 8),
  },
  [theme.breakpoints.up("lg")]: {
    padding: theme.spacing(0, 0, 0, 12),
  },
}));

export const HeroHeading = styled(Typography)<TypographyProps & { component?: ElementType }>(
  ({ theme }) => ({
    fontWeight: 800,
    fontSize: "clamp(2.5rem, 6vw, 5.5rem)",
    lineHeight: 1.05,
    letterSpacing: "-0.02em",
    color: theme.palette.text.primary,
    "& .highlight": {
      color: theme.palette.primary.main,
      display: "inline",
    },
  }),
);

export const Subtitle = styled(Typography)(({ theme }) => ({
  fontSize: "clamp(1rem, 1.5vw, 1.25rem)",
  fontWeight: 500,
  color: theme.palette.text.secondary,
  maxWidth: 480,
  lineHeight: 1.6,
}));

export const TagLine = styled(Typography)<TypographyProps & { component?: ElementType }>(
  ({ theme }) => ({
    fontWeight: 700,
    fontSize: "clamp(1.1rem, 2vw, 1.5rem)",
    color: theme.palette.text.primary,
    lineHeight: 1.4,
    maxWidth: 320,
    "& .accent": {
      color: theme.palette.primary.light,
    },
  }),
);

export const TagDescription = styled(Typography)(({ theme }) => ({
  fontSize: "0.9rem",
  color: theme.palette.text.secondary,
  maxWidth: 300,
  lineHeight: 1.6,
}));

export const ImageWrapper = styled(Box)(({ theme }) => ({
  position: "relative",
  display: "flex",
  alignItems: "flex-end",
  justifyContent: "flex-end",
  alignSelf: "flex-end",
  flexShrink: 0,
  "&::before": {
    content: '""',
    position: "absolute",
    bottom: 0,
    right: "20%",
    width: "90%",
    height: "70%",
    borderRadius: "50%",
    background: `radial-gradient(ellipse, ${theme.palette.primary.main}30 0%, transparent 70%)`,
    filter: "blur(40px)",
    zIndex: 0,
  },
  "& img": {
    position: "relative",
    zIndex: 1,
    width: "100%",
    maxWidth: 360,
    height: "auto",
    objectFit: "contain",
    pointerEvents: "none",
    filter: "drop-shadow(0 20px 40px rgba(0,0,0,0.3))",
    [theme.breakpoints.up("md")]: {
      maxWidth: 500,
    },
    [theme.breakpoints.up("lg")]: {
      maxWidth: 600,
    },
  },
}));
