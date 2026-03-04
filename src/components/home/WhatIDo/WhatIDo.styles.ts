import { styled } from "@mui/material/styles";
import Box, { type BoxProps } from "@mui/material/Box";
import Typography, { type TypographyProps } from "@mui/material/Typography";
import type { ElementType } from "react";

export const SectionRoot = styled(Box)<BoxProps & { component?: ElementType }>(({ theme }) => ({
  paddingTop: theme.spacing(8),
  paddingBottom: theme.spacing(8),
  backgroundColor: theme.palette.background.default,
  position: "relative",
  overflow: "hidden",
  [theme.breakpoints.up("md")]: {
    paddingTop: theme.spacing(12),
    paddingBottom: theme.spacing(12),
  },
}));

export const SectionTitle = styled(Typography)<TypographyProps & { component?: ElementType }>(
  ({ theme }) => ({
    textAlign: "center",
    marginBottom: theme.spacing(2),
    fontWeight: 700,
    fontSize: "1.75rem",
    backgroundImage: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
    backgroundClip: "text",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    [theme.breakpoints.up("sm")]: {
      fontSize: "2rem",
    },
    [theme.breakpoints.up("md")]: {
      fontSize: "2.5rem",
    },
  }),
);

export const SectionSubtitle = styled(Typography)(({ theme }) => ({
  textAlign: "center",
  marginBottom: theme.spacing(6),
  color: theme.palette.text.secondary,
  maxWidth: 600,
  marginLeft: "auto",
  marginRight: "auto",
  fontSize: "0.95rem",
  lineHeight: 1.7,
  [theme.breakpoints.up("md")]: {
    marginBottom: theme.spacing(8),
    fontSize: "1.05rem",
  },
}));

export const GlassCard = styled(Box)(({ theme }) => {
  const isDark = theme.palette.mode === "dark";

  return {
    padding: theme.spacing(4),
    height: "100%",
    borderRadius: theme.spacing(3),
    background: isDark ? "rgba(18, 38, 26, 0.6)" : "rgba(255, 255, 255, 0.45)",
    backdropFilter: "blur(16px)",
    WebkitBackdropFilter: "blur(16px)",
    border: `1px solid ${isDark ? "rgba(102, 187, 106, 0.15)" : "rgba(46, 125, 50, 0.12)"}`,
    transition: "border-color 0.3s ease, box-shadow 0.3s ease",
    cursor: "default",
    "&:hover": {
      borderColor: isDark ? "rgba(102, 187, 106, 0.35)" : "rgba(46, 125, 50, 0.25)",
      boxShadow: isDark
        ? "0 20px 60px rgba(102, 187, 106, 0.12), 0 8px 24px rgba(0, 0, 0, 0.3)"
        : "0 20px 60px rgba(46, 125, 50, 0.1), 0 8px 24px rgba(0, 0, 0, 0.08)",
      "& .accent-bar": {
        opacity: 1,
        transform: "scaleX(1)",
      },
    },
  };
});

export const CardTitle = styled(Typography)(({ theme }) => ({
  fontWeight: 600,
  marginBottom: theme.spacing(1.5),
  color: theme.palette.text.primary,
  fontSize: "1rem",
  [theme.breakpoints.up("md")]: {
    fontSize: "1.1rem",
  },
}));

export const CardDescription = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.secondary,
  lineHeight: 1.7,
  fontSize: "0.85rem",
  [theme.breakpoints.up("md")]: {
    fontSize: "0.875rem",
  },
}));

export const AccentBar = styled(Box)(({ theme }) => ({
  marginTop: theme.spacing(3),
  height: 3,
  borderRadius: theme.spacing(2),
  backgroundImage: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
  opacity: 0,
  transform: "scaleX(0)",
  transformOrigin: "left",
  transition: "opacity 0.3s ease, transform 0.4s ease",
}));

export const IconWrapper = styled(Box)(({ theme }) => {
  const isDark = theme.palette.mode === "dark";

  return {
    "& .MuiSvgIcon-root": {
      fontSize: 48,
      color: theme.palette.primary.main,
      marginBottom: theme.spacing(2),
      filter: isDark ? "drop-shadow(0 0 8px rgba(102, 187, 106, 0.3))" : "none",
    },
  };
});
