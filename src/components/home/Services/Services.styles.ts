import { styled, keyframes } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { fontFamilies } from "@/theme/theme";

const shimmer = keyframes`
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
`;

const pulse = keyframes`
  0%, 100% { transform: scale(1); opacity: 0.5; }
  50% { transform: scale(1.05); opacity: 0.8; }
`;

export const SectionRoot = styled("section")(({ theme }) => {
  const isDark = theme.palette.mode === "dark";
  return {
    paddingTop: theme.spacing(10),
    paddingBottom: theme.spacing(10),
    backgroundColor: isDark ? "rgba(8, 18, 12, 0.98)" : "rgba(252, 255, 252, 0.98)",
    position: "relative",
    overflow: "hidden",
    "&::before": {
      content: '""',
      position: "absolute",
      inset: 0,
      background: isDark
        ? `radial-gradient(ellipse 80% 50% at 50% -20%, rgba(102, 187, 106, 0.15), transparent),
           radial-gradient(ellipse 60% 40% at 100% 100%, rgba(128, 203, 196, 0.1), transparent)`
        : `radial-gradient(ellipse 80% 50% at 50% -20%, rgba(46, 125, 50, 0.08), transparent),
           radial-gradient(ellipse 60% 40% at 100% 100%, rgba(0, 137, 123, 0.06), transparent)`,
      pointerEvents: "none",
    },
    [theme.breakpoints.up("md")]: {
      paddingTop: theme.spacing(14),
      paddingBottom: theme.spacing(14),
    },
  };
});

export const CircuitPattern = styled(Box)(({ theme }) => ({
  position: "absolute",
  inset: 0,
  pointerEvents: "none",
  opacity: theme.palette.mode === "dark" ? 0.08 : 0.05,
  backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M10 10h80v80H10z' fill='none' stroke='%2366bb6a' stroke-width='0.5'/%3E%3Ccircle cx='10' cy='10' r='3' fill='%2366bb6a'/%3E%3Ccircle cx='90' cy='10' r='3' fill='%2366bb6a'/%3E%3Ccircle cx='10' cy='90' r='3' fill='%2366bb6a'/%3E%3Ccircle cx='90' cy='90' r='3' fill='%2366bb6a'/%3E%3Cpath d='M50 10v30M10 50h30M90 50h-30M50 90v-30' stroke='%2366bb6a' stroke-width='0.5'/%3E%3Ccircle cx='50' cy='50' r='5' fill='none' stroke='%2366bb6a' stroke-width='0.5'/%3E%3C/svg%3E")`,
  backgroundSize: "100px 100px",
}));

export const GlowOrb = styled(Box, {
  shouldForwardProp: (prop) => prop !== "placement",
})<{ placement: "top" | "bottom" }>(({ theme, placement }) => ({
  position: "absolute",
  width: 400,
  height: 400,
  borderRadius: "50%",
  background:
    theme.palette.mode === "dark"
      ? "radial-gradient(circle, rgba(102, 187, 106, 0.15) 0%, transparent 70%)"
      : "radial-gradient(circle, rgba(46, 125, 50, 0.1) 0%, transparent 70%)",
  filter: "blur(60px)",
  pointerEvents: "none",
  animation: `${pulse} 8s ease-in-out infinite`,
  ...(placement === "top"
    ? { top: -200, left: -100 }
    : { bottom: -200, right: -100, animationDelay: "4s" }),
}));

export const SectionHeader = styled(Box)(({ theme }) => ({
  textAlign: "center",
  marginBottom: theme.spacing(8),
  position: "relative",
  zIndex: 1,
  [theme.breakpoints.up("md")]: {
    marginBottom: theme.spacing(10),
  },
}));

export const SectionLabel = styled(Typography)(({ theme }) => ({
  fontFamily: fontFamilies.mono,
  fontSize: "0.75rem",
  fontWeight: 600,
  letterSpacing: "0.2em",
  textTransform: "uppercase",
  color: theme.palette.primary.main,
  marginBottom: theme.spacing(2),
  display: "inline-flex",
  alignItems: "center",
  gap: theme.spacing(1),
  "&::before, &::after": {
    content: '""',
    width: 20,
    height: 1,
    background: theme.palette.primary.main,
    opacity: 0.5,
  },
}));

export const SectionTitle = styled("h2")(({ theme }) => ({
  fontFamily: fontFamilies.heading,
  fontSize: "2rem",
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
    fontSize: "2.5rem",
  },
  [theme.breakpoints.up("md")]: {
    fontSize: "3rem",
  },
}));

export const SectionSubtitle = styled(Typography)(({ theme }) => ({
  fontFamily: fontFamilies.body,
  color: theme.palette.text.secondary,
  fontSize: "0.95rem",
  maxWidth: 550,
  margin: "0 auto",
  lineHeight: 1.7,
  [theme.breakpoints.up("md")]: {
    fontSize: "1.05rem",
  },
}));

export const ServicesGrid = styled(Box)(({ theme }) => ({
  display: "grid",
  gridTemplateColumns: "1fr",
  gap: theme.spacing(4),
  position: "relative",
  zIndex: 1,
  [theme.breakpoints.up("sm")]: {
    gridTemplateColumns: "repeat(2, 1fr)",
  },
}));

export const ServiceCard = styled(Box)(({ theme }) => {
  const isDark = theme.palette.mode === "dark";
  return {
    position: "relative",
    padding: theme.spacing(5),
    background: isDark
      ? "linear-gradient(135deg, rgba(18, 38, 26, 0.6) 0%, rgba(8, 18, 12, 0.8) 100%)"
      : "linear-gradient(135deg, rgba(255, 255, 255, 0.8) 0%, rgba(248, 252, 248, 0.9) 100%)",
    borderRadius: theme.spacing(3),
    border: `1px solid ${isDark ? "rgba(102, 187, 106, 0.1)" : "rgba(46, 125, 50, 0.08)"}`,
    overflow: "hidden",
    transition: "all 0.5s cubic-bezier(0.25, 0.8, 0.25, 1)",
    cursor: "default",
    "&::before": {
      content: '""',
      position: "absolute",
      inset: 0,
      background: `linear-gradient(135deg, ${isDark ? "rgba(102, 187, 106, 0.05)" : "rgba(46, 125, 50, 0.03)"} 0%, transparent 50%)`,
      opacity: 0,
      transition: "opacity 0.5s ease",
    },
    "&:hover": {
      transform: "translateY(-12px) scale(1.02)",
      border: `1px solid ${isDark ? "rgba(102, 187, 106, 0.3)" : "rgba(46, 125, 50, 0.2)"}`,
      boxShadow: isDark
        ? "0 30px 80px rgba(102, 187, 106, 0.2), 0 15px 40px rgba(0, 0, 0, 0.4)"
        : "0 30px 80px rgba(46, 125, 50, 0.15), 0 15px 40px rgba(0, 0, 0, 0.08)",
      "&::before": {
        opacity: 1,
      },
      "& .service-icon-wrapper": {
        transform: "scale(1.1) rotate(5deg)",
        boxShadow: isDark
          ? "0 0 40px rgba(102, 187, 106, 0.4)"
          : "0 0 40px rgba(46, 125, 50, 0.25)",
      },
      "& .service-ring": {
        opacity: 1,
        transform: "scale(1)",
      },
      "& .feature-item": {
        transform: "translateX(8px)",
      },
    },
  };
});

export const IconWrapper = styled(Box)(({ theme }) => {
  const isDark = theme.palette.mode === "dark";
  return {
    width: 80,
    height: 80,
    borderRadius: theme.spacing(2.5),
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: theme.spacing(3),
    background: isDark
      ? "linear-gradient(135deg, rgba(102, 187, 106, 0.2) 0%, rgba(128, 203, 196, 0.15) 100%)"
      : "linear-gradient(135deg, rgba(46, 125, 50, 0.12) 0%, rgba(0, 137, 123, 0.08) 100%)",
    position: "relative",
    transition: "all 0.5s cubic-bezier(0.25, 0.8, 0.25, 1)",
    "& .MuiSvgIcon-root": {
      fontSize: 36,
      color: theme.palette.primary.main,
      position: "relative",
      zIndex: 1,
    },
  };
});

export const IconRing = styled(Box)(({ theme }) => ({
  position: "absolute",
  inset: -8,
  borderRadius: theme.spacing(3),
  border: `2px solid ${theme.palette.primary.main}`,
  opacity: 0,
  transform: "scale(0.8)",
  transition: "all 0.5s ease",
}));

export const ServiceTitle = styled(Typography)(({ theme }) => ({
  fontFamily: fontFamilies.heading,
  fontWeight: 600,
  fontSize: "1.35rem",
  marginBottom: theme.spacing(1.5),
  color: theme.palette.text.primary,
  [theme.breakpoints.up("md")]: {
    fontSize: "1.5rem",
  },
}));

export const ServiceDescription = styled(Typography)(({ theme }) => ({
  fontFamily: fontFamilies.body,
  color: theme.palette.text.secondary,
  fontSize: "0.9rem",
  lineHeight: 1.7,
  marginBottom: theme.spacing(3),
}));

export const FeaturesList = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing(1.5),
}));

export const FeatureItem = styled(Box)(({ theme }) => {
  return {
    display: "flex",
    alignItems: "center",
    gap: theme.spacing(1.5),
    fontFamily: fontFamilies.mono,
    fontSize: "0.8rem",
    color: theme.palette.text.secondary,
    transition: "transform 0.3s ease",
    "&::before": {
      content: '""',
      width: 6,
      height: 6,
      borderRadius: "50%",
      background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
      flexShrink: 0,
    },
  };
});

export const ServiceNumber = styled(Typography)(({ theme }) => ({
  position: "absolute",
  top: theme.spacing(3),
  right: theme.spacing(3),
  fontFamily: fontFamilies.mono,
  fontSize: "4rem",
  fontWeight: 700,
  color: theme.palette.mode === "dark" ? "rgba(102, 187, 106, 0.08)" : "rgba(46, 125, 50, 0.05)",
  lineHeight: 1,
  userSelect: "none",
}));

export const RotatingBorder = styled(Box)(({ theme }) => ({
  position: "absolute",
  inset: -2,
  borderRadius: theme.spacing(3.5),
  background: `conic-gradient(from 0deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main}, ${theme.palette.primary.main})`,
  opacity: 0,
  transition: "opacity 0.5s ease",
  zIndex: -1,
  "&::before": {
    content: '""',
    position: "absolute",
    inset: 2,
    borderRadius: theme.spacing(3),
    background: theme.palette.mode === "dark" ? "rgba(8, 18, 12, 1)" : "rgba(252, 255, 252, 1)",
  },
}));

export const ConnectorLine = styled(Box)(({ theme }) => ({
  position: "absolute",
  width: 2,
  height: 40,
  background: `linear-gradient(to bottom, ${theme.palette.primary.main}, transparent)`,
  left: "50%",
  bottom: -40,
  transform: "translateX(-50%)",
  opacity: 0.3,
  display: "none",
  [theme.breakpoints.up("sm")]: {
    display: "block",
  },
}));
