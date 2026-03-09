import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { fontFamilies } from "@/theme/theme";

export const FooterRoot = styled(Box)(({ theme }) => ({
  position: "relative",
  overflow: "hidden",
  paddingTop: theme.spacing(12),
  paddingBottom: theme.spacing(4),
}));

export const WaveContainer = styled(Box)({
  position: "absolute",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  pointerEvents: "none",
  zIndex: 0,
});

export const FooterContent = styled(Box)({
  position: "relative",
  zIndex: 1,
});

export const SocialGrid = styled(Box)(({ theme }) => ({
  display: "flex",
  flexWrap: "wrap",
  justifyContent: "center",
  gap: theme.spacing(1.5),
  maxWidth: 750,
  marginLeft: "auto",
  marginRight: "auto",
  marginBottom: theme.spacing(4),
  [theme.breakpoints.up("sm")]: {
    gap: theme.spacing(2),
  },
}));

export const SocialIconButton = styled("a")(({ theme }) => {
  const isDark = theme.palette.mode === "dark";

  return {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: 44,
    height: 44,
    borderRadius: theme.spacing(1.5),
    background: isDark ? "rgba(18, 38, 26, 0.7)" : "rgba(255, 255, 255, 0.65)",
    backdropFilter: "blur(12px)",
    WebkitBackdropFilter: "blur(12px)",
    border: `1px solid ${isDark ? "rgba(102, 187, 106, 0.2)" : "rgba(46, 125, 50, 0.15)"}`,
    cursor: "pointer",
    transition: "border-color 0.3s ease, box-shadow 0.3s ease, background 0.3s ease",
    color: theme.palette.text.secondary,
    fontSize: 18,
    "& svg": {
      width: 18,
      height: 18,
      transition: "color 0.3s ease",
    },
    "&:hover": {
      borderColor: theme.palette.primary.main,
      background: isDark ? "rgba(102, 187, 106, 0.1)" : "rgba(46, 125, 50, 0.08)",
      boxShadow: isDark
        ? "0 8px 24px rgba(102, 187, 106, 0.15)"
        : "0 8px 24px rgba(46, 125, 50, 0.12)",
      color: theme.palette.primary.main,
    },
    [theme.breakpoints.up("sm")]: {
      width: 52,
      height: 52,
      borderRadius: theme.spacing(2),
      fontSize: 22,
      "& svg": {
        width: 22,
        height: 22,
      },
    },
  };
});

export const StyledTooltip = styled(Box)(({ theme }) => {
  const isDark = theme.palette.mode === "dark";
  return {
    backgroundColor: isDark ? "rgba(18, 38, 26, 0.95)" : "rgba(255, 255, 255, 0.95)",
    color: theme.palette.text.primary,
    fontSize: "0.8rem",
    fontWeight: 600,
    fontFamily: fontFamilies.body,
    padding: `${theme.spacing(0.75)} ${theme.spacing(1.5)}`,
    borderRadius: theme.spacing(1),
    backdropFilter: "blur(12px)",
    WebkitBackdropFilter: "blur(12px)",
    border: `1px solid ${isDark ? "rgba(102, 187, 106, 0.2)" : "rgba(46, 125, 50, 0.15)"}`,
    boxShadow: isDark ? "0 4px 16px rgba(0, 0, 0, 0.4)" : "0 4px 16px rgba(0, 0, 0, 0.1)",
  };
});

export const CopyrightText = styled(Typography)(({ theme }) => ({
  textAlign: "center",
  fontFamily: fontFamilies.body,
  color: theme.palette.text.secondary,
  fontSize: "0.85rem",
  marginTop: theme.spacing(2),
}));
