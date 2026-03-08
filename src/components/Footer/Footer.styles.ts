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
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(64px, 1fr))",
  gap: theme.spacing(2),
  maxWidth: 480,
  marginLeft: "auto",
  marginRight: "auto",
  marginBottom: theme.spacing(4),
  [theme.breakpoints.up("sm")]: {
    gridTemplateColumns: "repeat(auto-fit, minmax(72px, 1fr))",
    gap: theme.spacing(2.5),
  },
}));

export const SocialIconButton = styled("a")(({ theme }) => {
  const isDark = theme.palette.mode === "dark";

  return {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: 56,
    height: 56,
    borderRadius: theme.spacing(2),
    background: isDark ? "rgba(18, 38, 26, 0.7)" : "rgba(255, 255, 255, 0.65)",
    backdropFilter: "blur(12px)",
    WebkitBackdropFilter: "blur(12px)",
    border: `1px solid ${isDark ? "rgba(102, 187, 106, 0.2)" : "rgba(46, 125, 50, 0.15)"}`,
    cursor: "pointer",
    marginLeft: "auto",
    marginRight: "auto",
    transition: "border-color 0.3s ease, box-shadow 0.3s ease",
    "& .MuiSvgIcon-root": {
      fontSize: 24,
      color: theme.palette.text.secondary,
      transition: "color 0.3s ease",
    },
    "&:hover": {
      borderColor: theme.palette.primary.main,
      boxShadow: isDark
        ? "0 8px 24px rgba(102, 187, 106, 0.15)"
        : "0 8px 24px rgba(46, 125, 50, 0.12)",
      "& .MuiSvgIcon-root": {
        color: theme.palette.primary.main,
      },
    },
  };
});

export const CopyrightText = styled(Typography)(({ theme }) => ({
  textAlign: "center",
  fontFamily: fontFamilies.body,
  color: theme.palette.text.secondary,
  fontSize: "0.85rem",
  marginTop: theme.spacing(2),
}));
