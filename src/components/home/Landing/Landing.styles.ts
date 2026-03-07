import { styled } from "@mui/material/styles";
import { Box, Typography } from "@mui/material";
import { fontFamilies } from "@/theme/theme";

export const LandingRoot = styled("section")(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === "dark" ? "rgba(10, 26, 15, 0.4)" : "rgba(241, 248, 233, 0.5)",
  backdropFilter: "blur(4px)",
  WebkitBackdropFilter: "blur(4px)",
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

export const HeroHeading = styled("h1")(({ theme }) => ({
  fontFamily: fontFamilies.heading,
  fontWeight: 700,
  fontSize: "clamp(2.5rem, 6vw, 5.5rem)",
  lineHeight: 1.05,
  letterSpacing: "-0.03em",
  color: theme.palette.text.primary,
  margin: 0,
  "& .highlight": {
    color: theme.palette.primary.main,
    display: "inline",
  },
}));

export const Subtitle = styled(Typography)(({ theme }) => ({
  fontFamily: fontFamilies.body,
  fontSize: "clamp(1rem, 1.5vw, 1.25rem)",
  fontWeight: 500,
  color: theme.palette.text.secondary,
  maxWidth: 480,
  lineHeight: 1.6,
}));

export const TagLine = styled("p")(({ theme }) => ({
  fontFamily: fontFamilies.heading,
  fontWeight: 600,
  fontSize: "clamp(1.1rem, 2vw, 1.5rem)",
  color: theme.palette.text.primary,
  lineHeight: 1.4,
  maxWidth: 320,
  margin: 0,
  "& .accent": {
    color: theme.palette.primary.light,
  },
}));

export const TagDescription = styled(Typography)(({ theme }) => ({
  fontFamily: fontFamilies.body,
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
