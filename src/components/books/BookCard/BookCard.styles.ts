import { styled, keyframes } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

const shimmer = keyframes`
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
`;

export const CardRoot = styled(Box)(({ theme }) => {
  const isDark = theme.palette.mode === "dark";
  return {
    position: "relative",
    borderRadius: theme.spacing(2.5),
    background: isDark ? "rgba(18,38,26,0.35)" : "rgba(255,255,255,0.7)",
    backdropFilter: "blur(24px)",
    WebkitBackdropFilter: "blur(24px)",
    border: `1px solid ${isDark ? "rgba(102,187,106,0.1)" : "rgba(46,125,50,0.08)"}`,
    boxShadow: isDark
      ? "0 4px 32px rgba(0,0,0,0.3), inset 0 1px 0 rgba(102,187,106,0.04)"
      : "0 4px 32px rgba(0,0,0,0.04), inset 0 1px 0 rgba(255,255,255,0.8)",
    overflow: "hidden",
    display: "flex",
    flexDirection: "column",
    height: "100%",
    cursor: "pointer",
    transition: "border-color 0.3s, box-shadow 0.4s cubic-bezier(0.25, 0.8, 0.25, 1)",
    "&:hover": {
      borderColor: isDark ? "rgba(102,187,106,0.25)" : "rgba(46,125,50,0.18)",
      boxShadow: isDark
        ? `0 16px 48px rgba(0,0,0,0.45), 0 0 0 1px ${theme.palette.primary.main}20`
        : `0 16px 48px rgba(0,0,0,0.1), 0 0 0 1px ${theme.palette.primary.main}15`,
    },
  };
});

export const CoverWrapper = styled(Box)(({ theme }) => {
  const isDark = theme.palette.mode === "dark";
  return {
    position: "relative",
    width: "100%",
    aspectRatio: "2 / 3",
    overflow: "hidden",
    background: isDark
      ? "linear-gradient(135deg, #0d2018, #12261a)"
      : "linear-gradient(135deg, #e8f5e9, #f1f8e9)",
    "&::after": {
      content: '""',
      position: "absolute",
      inset: 0,
      background: `linear-gradient(180deg, transparent 60%, ${isDark ? "rgba(10,26,15,0.9)" : "rgba(241,248,233,0.85)"})`,
      pointerEvents: "none",
    },
  };
});

export const CoverImage = styled("img")({
  width: "100%",
  height: "100%",
  objectFit: "cover",
  display: "block",
  transition: "transform 0.5s cubic-bezier(0.25, 0.8, 0.25, 1)",
});

export const CoverPlaceholder = styled(Box)(({ theme }) => {
  const isDark = theme.palette.mode === "dark";
  return {
    width: "100%",
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: isDark
      ? `linear-gradient(135deg, ${theme.palette.primary.dark}15, ${theme.palette.secondary.dark}10)`
      : `linear-gradient(135deg, ${theme.palette.primary.light}20, ${theme.palette.secondary.light}15)`,
    backgroundSize: "200% auto",
    animation: `${shimmer} 3s linear infinite`,
    "& .placeholder-icon": {
      fontSize: "2.5rem",
      opacity: 0.3,
    },
  };
});

export const CardContent = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2.5),
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing(1),
  flex: 1,
  [theme.breakpoints.up("md")]: {
    padding: theme.spacing(3),
  },
}));

export const CardTitle = styled(Typography)(({ theme }) => ({
  fontWeight: 700,
  fontSize: "0.95rem",
  lineHeight: 1.35,
  color: theme.palette.text.primary,
  display: "-webkit-box",
  WebkitLineClamp: 2,
  WebkitBoxOrient: "vertical",
  overflow: "hidden",
  minHeight: `calc(0.95rem * 1.35 * 2)`,
  [theme.breakpoints.up("md")]: {
    fontSize: "1.05rem",
    minHeight: `calc(1.05rem * 1.35 * 2)`,
  },
}));

export const CardAuthor = styled(Typography)(({ theme }) => ({
  fontSize: "0.8rem",
  fontWeight: 500,
  lineHeight: 1.4,
  color: theme.palette.text.secondary,
  display: "-webkit-box",
  WebkitLineClamp: 1,
  WebkitBoxOrient: "vertical",
  overflow: "hidden",
  minHeight: `calc(0.8rem * 1.4)`,
}));

export const CardMeta = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  marginTop: "auto",
  paddingTop: theme.spacing(1),
}));

export const RatingContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: theme.spacing(0.5),
}));

export const StarIcon = styled(Box, {
  shouldForwardProp: (prop) => prop !== "filled",
})<{ filled: boolean }>(({ theme, filled }) => {
  const isDark = theme.palette.mode === "dark";
  return {
    width: 14,
    height: 14,
    display: "inline-flex",
    color: filled ? "#f5a623" : isDark ? "rgba(255,255,255,0.15)" : "rgba(0,0,0,0.12)",
    "& svg": {
      width: "100%",
      height: "100%",
    },
  };
});

export const ReadDate = styled(Typography)(({ theme }) => ({
  fontSize: "0.68rem",
  fontWeight: 600,
  color: theme.palette.text.secondary,
  fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
  opacity: 0.7,
  letterSpacing: "0.02em",
}));
