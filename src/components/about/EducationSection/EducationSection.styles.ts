import { styled, keyframes } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

const shimmerLine = keyframes`
  0% { background-position: -200% center; }
  100% { background-position: 200% center; }
`;

export const SectionRoot = styled("section")(({ theme }) => {
  const isDark = theme.palette.mode === "dark";
  return {
    paddingTop: theme.spacing(12),
    paddingBottom: theme.spacing(12),
    position: "relative",
    overflow: "hidden",
    background: isDark
      ? "linear-gradient(180deg, #0a1a0f 0%, #0d2018 50%, #0a1a0f 100%)"
      : "linear-gradient(180deg, #f1f8e9 0%, #e0f2e0 50%, #f1f8e9 100%)",
    [theme.breakpoints.up("md")]: {
      paddingTop: theme.spacing(16),
      paddingBottom: theme.spacing(16),
    },
  };
});

export const SectionTitle = styled("h2")(({ theme }) => ({
  textAlign: "center",
  fontWeight: 800,
  fontSize: "2rem",
  marginBottom: theme.spacing(2),
  backgroundImage: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
  backgroundClip: "text",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  [theme.breakpoints.up("md")]: {
    fontSize: "2.75rem",
  },
}));

export const SectionSubtitle = styled(Typography)(({ theme }) => ({
  textAlign: "center",
  color: theme.palette.text.secondary,
  fontSize: "0.95rem",
  marginBottom: theme.spacing(8),
  maxWidth: 500,
  marginLeft: "auto",
  marginRight: "auto",
  lineHeight: 1.6,
  [theme.breakpoints.up("md")]: {
    marginBottom: theme.spacing(10),
  },
}));

export const CardsContainer = styled(Box)(({ theme }) => ({
  display: "grid",
  gridTemplateColumns: "1fr",
  gap: theme.spacing(3),
  maxWidth: 900,
  marginLeft: "auto",
  marginRight: "auto",
  [theme.breakpoints.up("sm")]: {
    gridTemplateColumns: "1fr 1fr",
    gap: theme.spacing(4),
  },
  [theme.breakpoints.up("md")]: {
    gridTemplateColumns: "repeat(3, 1fr)",
  },
}));

export const EducationCard = styled(Box)(({ theme }) => {
  const isDark = theme.palette.mode === "dark";
  return {
    position: "relative",
    padding: theme.spacing(4),
    borderRadius: theme.spacing(3),
    background: isDark ? "rgba(18,38,26,0.3)" : "rgba(255,255,255,0.6)",
    backdropFilter: "blur(24px)",
    WebkitBackdropFilter: "blur(24px)",
    border: `1px solid ${isDark ? "rgba(102,187,106,0.1)" : "rgba(46,125,50,0.08)"}`,
    boxShadow: isDark
      ? "0 4px 32px rgba(0,0,0,0.25), inset 0 1px 0 rgba(102,187,106,0.04)"
      : "0 4px 32px rgba(0,0,0,0.03), inset 0 1px 0 rgba(255,255,255,0.8)",
    transition:
      "transform 0.4s cubic-bezier(0.25, 0.8, 0.25, 1), box-shadow 0.4s, border-color 0.3s",
    overflow: "hidden",
    "&::before": {
      content: '""',
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      height: 3,
      background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main}, ${theme.palette.primary.main})`,
      backgroundSize: "200% auto",
      animation: `${shimmerLine} 4s linear infinite`,
      borderRadius: `${theme.spacing(3)} ${theme.spacing(3)} 0 0`,
    },
    "&:hover": {
      transform: "translateY(-6px)",
      borderColor: isDark ? "rgba(102,187,106,0.2)" : "rgba(46,125,50,0.15)",
      boxShadow: isDark
        ? `0 16px 48px rgba(0,0,0,0.4), 0 0 0 1px ${theme.palette.primary.main}15`
        : `0 16px 48px rgba(0,0,0,0.08), 0 0 0 1px ${theme.palette.primary.main}10`,
    },
    [theme.breakpoints.up("md")]: {
      padding: theme.spacing(4.5),
    },
  };
});

export const CardYearBadge = styled(Box)(({ theme }) => {
  const isDark = theme.palette.mode === "dark";
  return {
    display: "inline-flex",
    alignItems: "center",
    padding: `${theme.spacing(0.5)} ${theme.spacing(1.5)}`,
    borderRadius: theme.spacing(1),
    background: isDark ? "rgba(102,187,106,0.1)" : "rgba(46,125,50,0.06)",
    border: `1px solid ${isDark ? "rgba(102,187,106,0.15)" : "rgba(46,125,50,0.1)"}`,
    marginBottom: theme.spacing(2),
    "& .year-text": {
      fontSize: "0.72rem",
      fontWeight: 700,
      fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
      color: theme.palette.primary.main,
      letterSpacing: "0.03em",
    },
  };
});

export const CardLevel = styled(Typography)(({ theme }) => ({
  fontSize: "0.78rem",
  fontWeight: 600,
  color: theme.palette.primary.main,
  textTransform: "uppercase",
  letterSpacing: "0.08em",
  marginBottom: theme.spacing(1),
}));

export const CardInstitution = styled(Typography)(({ theme }) => ({
  fontWeight: 700,
  fontSize: "1.05rem",
  color: theme.palette.text.primary,
  lineHeight: 1.4,
  marginBottom: theme.spacing(0.5),
  [theme.breakpoints.up("md")]: {
    fontSize: "1.1rem",
  },
}));

export const CardDegree = styled(Typography)(({ theme }) => ({
  fontSize: "0.85rem",
  color: theme.palette.text.secondary,
  lineHeight: 1.5,
  fontStyle: "italic",
}));
