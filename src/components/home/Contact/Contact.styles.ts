import { styled } from "@mui/material/styles";
import Box, { type BoxProps } from "@mui/material/Box";
import Typography, { type TypographyProps } from "@mui/material/Typography";
import type { ElementType } from "react";

export const ContactRoot = styled(Box)<BoxProps & { component?: ElementType }>(({ theme }) => ({
  paddingTop: theme.spacing(10),
  paddingBottom: theme.spacing(6),
  backgroundColor: theme.palette.mode === "dark" ? "#061209" : "#e8f5e9",
  position: "relative",
  overflow: "hidden",
  [theme.breakpoints.up("md")]: {
    paddingTop: theme.spacing(14),
    paddingBottom: theme.spacing(8),
  },
}));

export const ContactTitle = styled(Typography)<TypographyProps & { component?: ElementType }>(
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

export const ContactSubtitle = styled(Typography)(({ theme }) => ({
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

export const FormCard = styled(Box)(({ theme }) => {
  const isDark = theme.palette.mode === "dark";

  return {
    padding: theme.spacing(5),
    borderRadius: theme.spacing(3),
    background: isDark ? "rgba(18, 38, 26, 0.6)" : "rgba(255, 255, 255, 0.55)",
    backdropFilter: "blur(16px)",
    WebkitBackdropFilter: "blur(16px)",
    border: `1px solid ${isDark ? "rgba(102, 187, 106, 0.15)" : "rgba(46, 125, 50, 0.12)"}`,
    maxWidth: 720,
    marginLeft: "auto",
    marginRight: "auto",
    [theme.breakpoints.down("sm")]: {
      padding: theme.spacing(3),
    },
  };
});

export const InfoCard = styled(Box)(({ theme }) => {
  const isDark = theme.palette.mode === "dark";

  return {
    padding: theme.spacing(4),
    borderRadius: theme.spacing(3),
    background: isDark ? "rgba(18, 38, 26, 0.6)" : "rgba(255, 255, 255, 0.55)",
    backdropFilter: "blur(16px)",
    WebkitBackdropFilter: "blur(16px)",
    border: `1px solid ${isDark ? "rgba(102, 187, 106, 0.15)" : "rgba(46, 125, 50, 0.12)"}`,
    display: "flex",
    alignItems: "center",
    gap: theme.spacing(2),
    [theme.breakpoints.down("sm")]: {
      padding: theme.spacing(3),
    },
  };
});

export const InfoText = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.secondary,
  fontSize: "0.95rem",
  lineHeight: 1.6,
}));
