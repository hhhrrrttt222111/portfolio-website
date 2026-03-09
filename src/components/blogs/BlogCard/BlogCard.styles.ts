import { styled, keyframes, type Theme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { fontFamilies } from "@/theme/theme";

interface BlogVariantProps {
  blogVariant: "hacker" | "literary";
}

interface BoxVariantProps {
  variant: "hacker" | "literary";
}

const scanline = keyframes`
  0% { transform: translateY(-100%); }
  100% { transform: translateY(100%); }
`;

export const CardWrapper = styled(Box, {
  shouldForwardProp: (prop) => prop !== "variant",
})<BoxVariantProps>(({ theme, variant }) => {
  const isDark = theme.palette.mode === "dark";
  const isHacker = variant === "hacker";

  return {
    position: "relative",
    padding: theme.spacing(3),
    borderRadius: isHacker ? theme.spacing(1) : theme.spacing(2),
    cursor: "pointer",
    transition: "all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1)",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    background: isHacker
      ? isDark
        ? "linear-gradient(135deg, rgba(0, 20, 10, 0.8) 0%, rgba(0, 30, 15, 0.9) 100%)"
        : "linear-gradient(135deg, rgba(26, 46, 26, 0.95) 0%, rgba(36, 53, 36, 0.98) 100%)"
      : isDark
        ? "linear-gradient(135deg, rgba(42, 32, 24, 0.8) 0%, rgba(32, 24, 18, 0.9) 100%)"
        : "linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(250, 246, 240, 0.98) 100%)",
    border: `1px solid ${
      isHacker
        ? isDark
          ? "rgba(0, 255, 65, 0.2)"
          : "rgba(26, 92, 26, 0.3)"
        : isDark
          ? "rgba(212, 165, 116, 0.2)"
          : "rgba(92, 64, 51, 0.15)"
    }`,
    overflow: "hidden",
    "&::before": {
      content: '""',
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      height: isHacker ? 2 : 3,
      background: isHacker
        ? isDark
          ? "linear-gradient(90deg, transparent, #00ff41, transparent)"
          : "linear-gradient(90deg, transparent, #1a5c1a, transparent)"
        : isDark
          ? "linear-gradient(90deg, #8B7355, #d4a574, #8B7355)"
          : "linear-gradient(90deg, #8B7355, #a0826d, #8B7355)",
      transform: "scaleX(0)",
      transformOrigin: "left",
      transition: "transform 0.4s ease",
    },
    ...(isHacker && {
      "&::after": {
        content: '""',
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: "linear-gradient(transparent 50%, rgba(0, 0, 0, 0.1) 50%)",
        backgroundSize: "100% 4px",
        pointerEvents: "none",
        opacity: 0.1,
      },
    }),
    "&:hover": {
      transform: "translateY(-8px)",
      border: `1px solid ${
        isHacker
          ? isDark
            ? "rgba(0, 255, 65, 0.5)"
            : "rgba(26, 92, 26, 0.5)"
          : isDark
            ? "rgba(212, 165, 116, 0.4)"
            : "rgba(92, 64, 51, 0.3)"
      }`,
      boxShadow: isHacker
        ? isDark
          ? "0 20px 60px rgba(0, 255, 65, 0.15), 0 0 30px rgba(0, 255, 65, 0.1)"
          : "0 20px 60px rgba(26, 92, 26, 0.2)"
        : isDark
          ? "0 20px 60px rgba(212, 165, 116, 0.15)"
          : "0 20px 60px rgba(92, 64, 51, 0.1)",
      "&::before": {
        transform: "scaleX(1)",
      },
      "& .read-article-btn": {
        opacity: 1,
        transform: "translateX(0)",
      },
      "& .card-scanline": {
        opacity: 0.3,
      },
    },
  };
});

export const ScanlineEffect = styled(Box)({
  position: "absolute",
  top: 0,
  left: 0,
  right: 0,
  height: "100%",
  background: `linear-gradient(
    transparent 0%,
    rgba(0, 255, 65, 0.05) 50%,
    transparent 100%
  )`,
  animation: `${scanline} 3s linear infinite`,
  pointerEvents: "none",
  opacity: 0,
  transition: "opacity 0.3s ease",
});

export const CardTitle = styled(Typography, {
  shouldForwardProp: (prop) => prop !== "blogVariant",
})<BlogVariantProps>(({ theme, blogVariant }) => {
  const t = theme as Theme;
  const isDark = t.palette.mode === "dark";
  const isHacker = blogVariant === "hacker";

  return {
    fontFamily: isHacker ? fontFamilies.mono : fontFamilies.heading,
    fontWeight: 600,
    fontSize: "1rem",
    marginBottom: t.spacing(1.5),
    color: isHacker ? (isDark ? "#00ff41" : "#e8f5e9") : isDark ? "#d4a574" : "#3e2723",
    lineHeight: 1.4,
    display: "-webkit-box",
    WebkitLineClamp: 2,
    WebkitBoxOrient: "vertical",
    overflow: "hidden",
    position: "relative",
    zIndex: 1,
    [t.breakpoints.up("md")]: {
      fontSize: "1.1rem",
    },
  };
});

export const CardExcerpt = styled(Typography, {
  shouldForwardProp: (prop) => prop !== "blogVariant",
})<BlogVariantProps>(({ theme, blogVariant }) => {
  const t = theme as Theme;
  const isDark = t.palette.mode === "dark";
  const isHacker = blogVariant === "hacker";

  return {
    fontFamily: fontFamilies.body,
    fontSize: "0.85rem",
    lineHeight: 1.7,
    color: isHacker
      ? isDark
        ? "rgba(200, 200, 200, 0.8)"
        : "rgba(232, 245, 233, 0.85)"
      : isDark
        ? "rgba(220, 200, 180, 0.85)"
        : "rgba(62, 39, 35, 0.8)",
    marginBottom: t.spacing(2),
    display: "-webkit-box",
    WebkitLineClamp: 3,
    WebkitBoxOrient: "vertical",
    overflow: "hidden",
    position: "relative",
    zIndex: 1,
    flex: 1,
  };
});

export const CardMeta = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  flexWrap: "wrap",
  gap: theme.spacing(1),
  marginBottom: theme.spacing(2),
  position: "relative",
  zIndex: 1,
}));

export const CardDate = styled(Typography, {
  shouldForwardProp: (prop) => prop !== "blogVariant",
})<BlogVariantProps>(({ theme, blogVariant }) => {
  const t = theme as Theme;
  const isDark = t.palette.mode === "dark";
  const isHacker = blogVariant === "hacker";

  return {
    fontFamily: fontFamilies.mono,
    fontSize: "0.7rem",
    color: isHacker
      ? isDark
        ? "rgba(0, 255, 65, 0.6)"
        : "rgba(232, 245, 233, 0.7)"
      : isDark
        ? "rgba(212, 165, 116, 0.6)"
        : "rgba(92, 64, 51, 0.6)",
  };
});

export const CardReadingTime = styled(Typography, {
  shouldForwardProp: (prop) => prop !== "blogVariant",
})<BlogVariantProps>(({ theme, blogVariant }) => {
  const t = theme as Theme;
  const isDark = t.palette.mode === "dark";
  const isHacker = blogVariant === "hacker";

  return {
    fontFamily: fontFamilies.mono,
    fontSize: "0.7rem",
    color: isHacker
      ? isDark
        ? "rgba(0, 255, 65, 0.6)"
        : "rgba(232, 245, 233, 0.7)"
      : isDark
        ? "rgba(212, 165, 116, 0.6)"
        : "rgba(92, 64, 51, 0.6)",
    display: "flex",
    alignItems: "center",
    gap: t.spacing(0.5),
  };
});

export const CardTagsContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  flexWrap: "wrap",
  gap: theme.spacing(0.75),
  marginBottom: theme.spacing(2),
  position: "relative",
  zIndex: 1,
  minHeight: 52,
  alignContent: "flex-start",
}));

export const CardTag = styled(Box, {
  shouldForwardProp: (prop) => prop !== "variant",
})<BoxVariantProps>(({ theme, variant }) => {
  const isDark = theme.palette.mode === "dark";
  const isHacker = variant === "hacker";

  return {
    padding: theme.spacing(0.25, 1),
    borderRadius: theme.spacing(0.5),
    fontFamily: fontFamilies.mono,
    fontSize: "0.65rem",
    fontWeight: 500,
    color: isHacker
      ? isDark
        ? "rgba(0, 255, 65, 0.8)"
        : "rgba(232, 245, 233, 0.9)"
      : isDark
        ? "rgba(212, 165, 116, 0.8)"
        : "rgba(92, 64, 51, 0.8)",
    background: isHacker
      ? isDark
        ? "rgba(0, 255, 65, 0.08)"
        : "rgba(232, 245, 233, 0.1)"
      : isDark
        ? "rgba(212, 165, 116, 0.08)"
        : "rgba(92, 64, 51, 0.08)",
    border: `1px solid ${
      isHacker
        ? isDark
          ? "rgba(0, 255, 65, 0.2)"
          : "rgba(232, 245, 233, 0.2)"
        : isDark
          ? "rgba(212, 165, 116, 0.15)"
          : "rgba(92, 64, 51, 0.15)"
    }`,
  };
});

export const ReadArticleButton = styled(Box, {
  shouldForwardProp: (prop) => prop !== "variant",
})<BoxVariantProps>(({ theme, variant }) => {
  const isDark = theme.palette.mode === "dark";
  const isHacker = variant === "hacker";

  return {
    display: "flex",
    alignItems: "center",
    gap: theme.spacing(0.5),
    fontFamily: fontFamilies.mono,
    fontSize: "0.75rem",
    fontWeight: 500,
    color: isHacker ? (isDark ? "#00ff41" : "#e8f5e9") : isDark ? "#d4a574" : "#5c4033",
    opacity: 0.7,
    transform: "translateX(-5px)",
    transition: "all 0.3s ease",
    marginTop: "auto",
    position: "relative",
    zIndex: 1,
    "& svg": {
      fontSize: "0.9rem",
      transition: "transform 0.3s ease",
    },
  };
});
