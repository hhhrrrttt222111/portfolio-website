import { styled, keyframes } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { fontFamilies } from "@/theme/theme";

const float = keyframes`
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
`;

export const ContactRoot = styled("section")(({ theme }) => ({
  paddingTop: theme.spacing(10),
  paddingBottom: theme.spacing(6),
  backgroundColor:
    theme.palette.mode === "dark" ? "rgba(6, 18, 9, 0.4)" : "rgba(232, 245, 233, 0.5)",
  position: "relative",
  overflow: "hidden",
  [theme.breakpoints.up("md")]: {
    paddingTop: theme.spacing(14),
    paddingBottom: theme.spacing(8),
  },
}));

export const ContactTitle = styled("h2")(({ theme }) => ({
  textAlign: "center",
  marginBottom: theme.spacing(2),
  fontFamily: fontFamilies.heading,
  fontWeight: 700,
  fontSize: "1.75rem",
  letterSpacing: "-0.02em",
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
}));

export const ContactSubtitle = styled(Typography)(({ theme }) => ({
  textAlign: "center",
  marginBottom: theme.spacing(6),
  fontFamily: fontFamilies.body,
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

export const ContactWrapper = styled(Box)(({ theme }) => {
  const isDark = theme.palette.mode === "dark";

  return {
    display: "grid",
    gridTemplateColumns: "1fr",
    gap: theme.spacing(4),
    maxWidth: 1100,
    marginLeft: "auto",
    marginRight: "auto",
    [theme.breakpoints.up("md")]: {
      gridTemplateColumns: "1fr 1.5fr",
      gap: theme.spacing(5),
    },
    padding: theme.spacing(4),
    borderRadius: theme.spacing(4),
    background: isDark ? "rgba(18, 38, 26, 0.5)" : "rgba(255, 255, 255, 0.45)",
    backdropFilter: "blur(20px)",
    WebkitBackdropFilter: "blur(20px)",
    border: `1px solid ${isDark ? "rgba(102, 187, 106, 0.12)" : "rgba(46, 125, 50, 0.1)"}`,
    boxShadow: isDark ? "0 8px 32px rgba(0, 0, 0, 0.3)" : "0 8px 32px rgba(46, 125, 50, 0.08)",
    [theme.breakpoints.down("sm")]: {
      padding: theme.spacing(3),
    },
  };
});

export const InfoSection = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing(3),
  [theme.breakpoints.up("md")]: {
    justifyContent: "center",
  },
}));

export const InfoCard = styled("a")(({ theme }) => {
  const isDark = theme.palette.mode === "dark";

  return {
    padding: theme.spacing(3),
    borderRadius: theme.spacing(2),
    background: isDark ? "rgba(102, 187, 106, 0.08)" : "rgba(46, 125, 50, 0.06)",
    border: `1px solid ${isDark ? "rgba(102, 187, 106, 0.15)" : "rgba(46, 125, 50, 0.12)"}`,
    display: "flex",
    alignItems: "center",
    gap: theme.spacing(2),
    transition: "all 0.3s ease",
    cursor: "pointer",
    "&:hover": {
      transform: "translateX(8px)",
      background: isDark ? "rgba(102, 187, 106, 0.12)" : "rgba(46, 125, 50, 0.1)",
      borderColor: theme.palette.primary.main,
    },
    "& svg": {
      fontSize: "1.5rem",
      color: theme.palette.primary.main,
    },
  };
});

export const InfoLabel = styled(Typography)(({ theme }) => ({
  fontFamily: fontFamilies.body,
  fontSize: "0.75rem",
  fontWeight: 600,
  textTransform: "uppercase",
  letterSpacing: "0.1em",
  color: theme.palette.primary.main,
  marginBottom: theme.spacing(0.5),
}));

export const InfoText = styled(Typography)(({ theme }) => ({
  fontFamily: fontFamilies.body,
  color: theme.palette.text.primary,
  fontSize: "1rem",
  fontWeight: 500,
  lineHeight: 1.4,
}));

export const FormSection = styled(Box)(({ theme }) => {
  const isDark = theme.palette.mode === "dark";

  return {
    padding: theme.spacing(4),
    borderRadius: theme.spacing(3),
    background: isDark ? "rgba(18, 38, 26, 0.6)" : "rgba(255, 255, 255, 0.7)",
    border: `1px solid ${isDark ? "rgba(102, 187, 106, 0.1)" : "rgba(46, 125, 50, 0.08)"}`,
    position: "relative",
    overflow: "hidden",
    [theme.breakpoints.down("sm")]: {
      padding: theme.spacing(3),
    },
  };
});

export const FormTitle = styled(Typography)(({ theme }) => ({
  fontFamily: fontFamilies.heading,
  fontWeight: 600,
  fontSize: "1.25rem",
  color: theme.palette.text.primary,
  marginBottom: theme.spacing(3),
  display: "flex",
  alignItems: "center",
  gap: theme.spacing(1),
  "& svg": {
    color: theme.palette.primary.main,
  },
}));

export const SendButton = styled("button")(({ theme }) => {
  const isDark = theme.palette.mode === "dark";

  return {
    width: "100%",
    padding: theme.spacing(1.75, 4),
    borderRadius: theme.spacing(1.5),
    border: "none",
    background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
    color: isDark ? "#0a1a0f" : "#ffffff",
    fontFamily: fontFamilies.body,
    fontSize: "1rem",
    fontWeight: 600,
    cursor: "pointer",
    transition: "all 0.3s ease",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: theme.spacing(1),
    position: "relative",
    overflow: "hidden",
    "&:hover": {
      transform: "translateY(-2px)",
      boxShadow: `0 8px 24px ${isDark ? "rgba(102, 187, 106, 0.3)" : "rgba(46, 125, 50, 0.3)"}`,
    },
    "&:active": {
      transform: "translateY(0)",
    },
    "&:disabled": {
      opacity: 0.7,
      cursor: "not-allowed",
      transform: "none",
    },
  };
});

export const PaperPlaneWrapper = styled(Box)({
  position: "fixed",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  zIndex: 9999,
  pointerEvents: "none",
});

export const FloatingIcon = styled(Box)({
  animation: `${float} 3s ease-in-out infinite`,
});

export const CustomSnackbar = styled(Box)(({ theme }) => {
  const isDark = theme.palette.mode === "dark";

  return {
    position: "fixed",
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 9998,
    padding: theme.spacing(1.5, 2),
    borderRadius: 0,
    backdropFilter: "blur(16px)",
    WebkitBackdropFilter: "blur(16px)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: theme.spacing(1.5),
    fontFamily: fontFamilies.body,
    fontWeight: 500,
    fontSize: "0.875rem",
    boxShadow: isDark ? "0 -4px 24px rgba(0, 0, 0, 0.4)" : "0 -4px 24px rgba(0, 0, 0, 0.15)",
    "& svg": {
      fontSize: "1.25rem",
      flexShrink: 0,
    },
    [theme.breakpoints.up("sm")]: {
      bottom: theme.spacing(4),
      left: "50%",
      right: "auto",
      transform: "translateX(-50%)",
      padding: theme.spacing(2, 4),
      borderRadius: theme.spacing(2),
      fontSize: "0.95rem",
      justifyContent: "flex-start",
      boxShadow: isDark ? "0 8px 32px rgba(0, 0, 0, 0.4)" : "0 8px 32px rgba(0, 0, 0, 0.15)",
    },
  };
});

export const SuccessSnackbar = styled(CustomSnackbar)(({ theme }) => {
  const isDark = theme.palette.mode === "dark";

  return {
    background: isDark ? "rgba(102, 187, 106, 0.9)" : "rgba(46, 125, 50, 0.95)",
    color: isDark ? "#0a1a0f" : "#ffffff",
    border: `1px solid ${isDark ? "rgba(165, 214, 167, 0.3)" : "rgba(200, 230, 201, 0.3)"}`,
  };
});

export const ErrorSnackbar = styled(CustomSnackbar)(({ theme }) => {
  const isDark = theme.palette.mode === "dark";

  return {
    background: isDark ? "rgba(239, 83, 80, 0.9)" : "rgba(211, 47, 47, 0.95)",
    color: "#ffffff",
    border: `1px solid ${isDark ? "rgba(255, 138, 128, 0.3)" : "rgba(255, 205, 210, 0.3)"}`,
  };
});
