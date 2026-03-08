import { styled, keyframes, type Theme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { fontFamilies } from "@/theme/theme";

interface BlogVariantProps {
  blogVariant: "hacker" | "literary";
}

const pulse = keyframes`
  0%, 100% { opacity: 0.4; transform: scale(1); }
  50% { opacity: 0.8; transform: scale(1.05); }
`;

const glow = keyframes`
  0%, 100% { box-shadow: 0 0 20px rgba(0, 255, 65, 0.3); }
  50% { box-shadow: 0 0 40px rgba(0, 255, 65, 0.6); }
`;

const typewriter = keyframes`
  from { width: 0; }
  to { width: 100%; }
`;

const blink = keyframes`
  0%, 100% { opacity: 1; }
  50% { opacity: 0; }
`;

const particleFloat = keyframes`
  0% { transform: translateY(100vh) rotate(0deg); opacity: 0; }
  10% { opacity: 1; }
  90% { opacity: 1; }
  100% { transform: translateY(-100vh) rotate(720deg); opacity: 0; }
`;

export const SectionWrapper = styled(Box, {
  shouldForwardProp: (prop) => prop !== "variant",
})<{ variant: "hacker" | "literary" }>(({ theme, variant }) => {
  const isDark = theme.palette.mode === "dark";
  const isHacker = variant === "hacker";

  return {
    flex: 1,
    position: "relative",
    padding: theme.spacing(8, 2),
    overflow: "hidden",
    background: isHacker
      ? isDark
        ? "linear-gradient(135deg, #0a0f0a 0%, #0d1a10 50%, #081008 100%)"
        : "linear-gradient(135deg, #1a2e1a 0%, #243524 50%, #1a2e1a 100%)"
      : isDark
        ? "linear-gradient(135deg, #1a1512 0%, #2a2018 50%, #1a1512 100%)"
        : "linear-gradient(135deg, #faf6f0 0%, #f5ebe0 50%, #faf6f0 100%)",
    [theme.breakpoints.up("md")]: {
      padding: theme.spacing(10, 4),
    },
    [theme.breakpoints.up("lg")]: {
      padding: theme.spacing(12, 6),
    },
  };
});

export const HackerBackground = styled(Box)(({ theme }) => ({
  position: "absolute",
  inset: 0,
  pointerEvents: "none",
  opacity: theme.palette.mode === "dark" ? 0.15 : 0.08,
  backgroundImage: `
    linear-gradient(rgba(0, 255, 65, 0.03) 1px, transparent 1px),
    linear-gradient(90deg, rgba(0, 255, 65, 0.03) 1px, transparent 1px)
  `,
  backgroundSize: "20px 20px",
  "&::before": {
    content: '""',
    position: "absolute",
    inset: 0,
    background: "radial-gradient(ellipse at center, transparent 0%, rgba(0, 0, 0, 0.5) 100%)",
  },
}));

export const LiteraryBackground = styled(Box)(({ theme }) => {
  const isDark = theme.palette.mode === "dark";
  return {
    position: "absolute",
    inset: 0,
    pointerEvents: "none",
    opacity: isDark ? 0.1 : 0.15,
    backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M50 10 L50 90 M30 20 L30 80 M70 20 L70 80' stroke='%238B7355' stroke-width='2' fill='none' opacity='0.3'/%3E%3C/svg%3E")`,
    backgroundSize: "100px 100px",
    "&::before": {
      content: '""',
      position: "absolute",
      inset: 0,
      background: isDark
        ? "radial-gradient(ellipse at center, transparent 0%, rgba(26, 21, 18, 0.8) 100%)"
        : "radial-gradient(ellipse at center, transparent 0%, rgba(250, 246, 240, 0.8) 100%)",
    },
  };
});

export const TerminalGlow = styled(Box)(() => ({
  position: "absolute",
  top: "20%",
  left: "10%",
  width: 300,
  height: 300,
  borderRadius: "50%",
  background: "radial-gradient(circle, rgba(0, 255, 65, 0.1) 0%, transparent 70%)",
  filter: "blur(60px)",
  animation: `${pulse} 4s ease-in-out infinite`,
  pointerEvents: "none",
}));

export const WarmGlow = styled(Box)(() => ({
  position: "absolute",
  top: "30%",
  right: "10%",
  width: 350,
  height: 350,
  borderRadius: "50%",
  background: "radial-gradient(circle, rgba(255, 183, 77, 0.15) 0%, transparent 70%)",
  filter: "blur(80px)",
  animation: `${pulse} 5s ease-in-out infinite`,
  animationDelay: "1s",
  pointerEvents: "none",
}));

export const SectionHeader = styled(Box, {
  shouldForwardProp: (prop) => prop !== "variant",
})<{ variant: "hacker" | "literary" }>(({ theme, variant }) => {
  const isHacker = variant === "hacker";
  return {
    marginBottom: theme.spacing(6),
    position: "relative",
    zIndex: 1,
    textAlign: isHacker ? "left" : "center",
    [theme.breakpoints.up("md")]: {
      marginBottom: theme.spacing(8),
    },
  };
});

export const SectionTitle = styled("h2", {
  shouldForwardProp: (prop) => prop !== "variant",
})<{ variant: "hacker" | "literary" }>(({ theme, variant }) => {
  const isDark = theme.palette.mode === "dark";
  const isHacker = variant === "hacker";

  return {
    fontFamily: isHacker ? fontFamilies.mono : fontFamilies.heading,
    fontSize: "1.8rem",
    fontWeight: 700,
    marginBottom: theme.spacing(1.5),
    color: isHacker ? (isDark ? "#00ff41" : "#1a5c1a") : isDark ? "#d4a574" : "#5c4033",
    textShadow: isHacker ? (isDark ? "0 0 20px rgba(0, 255, 65, 0.5)" : "none") : "none",
    letterSpacing: isHacker ? "0.05em" : "-0.01em",
    ...(isHacker && {
      "&::before": {
        content: '">"',
        marginRight: theme.spacing(1),
        opacity: 0.7,
      },
    }),
    [theme.breakpoints.up("md")]: {
      fontSize: "2.2rem",
    },
  };
});

export const SectionTagline = styled(Typography, {
  shouldForwardProp: (prop) => prop !== "blogVariant",
})<BlogVariantProps>(({ theme, blogVariant }) => {
  const t = theme as Theme;
  const isDark = t.palette.mode === "dark";
  const isHacker = blogVariant === "hacker";

  return {
    fontFamily: isHacker ? fontFamilies.mono : fontFamilies.body,
    fontSize: "0.95rem",
    fontStyle: isHacker ? "normal" : "italic",
    color: isHacker
      ? isDark
        ? "rgba(0, 255, 65, 0.7)"
        : "rgba(26, 92, 26, 0.8)"
      : isDark
        ? "rgba(212, 165, 116, 0.8)"
        : "rgba(92, 64, 51, 0.8)",
    marginBottom: t.spacing(2),
    ...(isHacker && {
      overflow: "hidden",
      whiteSpace: "nowrap",
      borderRight: isDark ? "2px solid #00ff41" : "2px solid #1a5c1a",
      animation: `${typewriter} 2s steps(40) 1s forwards, ${blink} 0.75s step-end infinite`,
      width: "fit-content",
    }),
    [t.breakpoints.up("md")]: {
      fontSize: "1.05rem",
    },
  };
});

export const SectionDescription = styled(Typography, {
  shouldForwardProp: (prop) => prop !== "blogVariant",
})<BlogVariantProps>(({ theme, blogVariant }) => {
  const t = theme as Theme;
  const isDark = t.palette.mode === "dark";
  const isHacker = blogVariant === "hacker";

  return {
    fontFamily: fontFamilies.body,
    fontSize: "0.9rem",
    lineHeight: 1.8,
    color: isHacker
      ? isDark
        ? "rgba(200, 200, 200, 0.8)"
        : "rgba(255, 255, 255, 0.9)"
      : isDark
        ? "rgba(220, 200, 180, 0.9)"
        : "rgba(80, 60, 40, 0.9)",
    maxWidth: 500,
    marginBottom: t.spacing(3),
    ...(isHacker ? {} : { margin: "0 auto", marginBottom: t.spacing(3) }),
    [t.breakpoints.up("md")]: {
      fontSize: "0.95rem",
    },
  };
});

export const TopicsContainer = styled(Box, {
  shouldForwardProp: (prop) => prop !== "variant",
})<{ variant: "hacker" | "literary" }>(({ theme, variant }) => ({
  display: "flex",
  flexWrap: "wrap",
  gap: theme.spacing(1),
  marginBottom: theme.spacing(2),
  ...(variant === "literary" ? { justifyContent: "center" } : {}),
}));

export const TopicTag = styled(Box, {
  shouldForwardProp: (prop) => prop !== "variant",
})<{ variant: "hacker" | "literary" }>(({ theme, variant }) => {
  const isDark = theme.palette.mode === "dark";
  const isHacker = variant === "hacker";

  return {
    padding: theme.spacing(0.5, 1.5),
    borderRadius: isHacker ? theme.spacing(0.5) : theme.spacing(2),
    fontFamily: isHacker ? fontFamilies.mono : fontFamilies.body,
    fontSize: "0.7rem",
    fontWeight: 500,
    textTransform: isHacker ? "uppercase" : "capitalize",
    letterSpacing: isHacker ? "0.1em" : "0.02em",
    color: isHacker ? (isDark ? "#00ff41" : "#1a5c1a") : isDark ? "#d4a574" : "#5c4033",
    background: isHacker
      ? isDark
        ? "rgba(0, 255, 65, 0.1)"
        : "rgba(26, 92, 26, 0.15)"
      : isDark
        ? "rgba(212, 165, 116, 0.1)"
        : "rgba(92, 64, 51, 0.1)",
    border: `1px solid ${
      isHacker
        ? isDark
          ? "rgba(0, 255, 65, 0.3)"
          : "rgba(26, 92, 26, 0.3)"
        : isDark
          ? "rgba(212, 165, 116, 0.3)"
          : "rgba(92, 64, 51, 0.2)"
    }`,
  };
});

export const PostsGrid = styled(Box)(({ theme }) => ({
  display: "grid",
  gridTemplateColumns: "1fr",
  gap: theme.spacing(3),
  position: "relative",
  zIndex: 1,
  [theme.breakpoints.up("sm")]: {
    gridTemplateColumns: "repeat(2, 1fr)",
  },
  [theme.breakpoints.up("xl")]: {
    gridTemplateColumns: "repeat(3, 1fr)",
  },
}));

export const VisitBlogButton = styled(Button, {
  shouldForwardProp: (prop) => prop !== "blogVariant",
})<{ blogVariant: "hacker" | "literary" }>(({ theme, blogVariant }) => {
  const isDark = theme.palette.mode === "dark";
  const isHacker = blogVariant === "hacker";

  return {
    marginTop: theme.spacing(4),
    padding: theme.spacing(1.5, 4),
    fontFamily: isHacker ? fontFamilies.mono : fontFamilies.body,
    fontSize: "0.9rem",
    fontWeight: 600,
    textTransform: isHacker ? "uppercase" : "none",
    letterSpacing: isHacker ? "0.1em" : "0.02em",
    borderRadius: isHacker ? theme.spacing(0.5) : theme.spacing(3),
    color: isHacker ? (isDark ? "#00ff41" : "#1a5c1a") : isDark ? "#d4a574" : "#5c4033",
    background: isHacker
      ? isDark
        ? "rgba(0, 255, 65, 0.1)"
        : "rgba(26, 92, 26, 0.1)"
      : isDark
        ? "rgba(212, 165, 116, 0.1)"
        : "rgba(92, 64, 51, 0.1)",
    border: `2px solid ${
      isHacker
        ? isDark
          ? "rgba(0, 255, 65, 0.5)"
          : "rgba(26, 92, 26, 0.5)"
        : isDark
          ? "rgba(212, 165, 116, 0.5)"
          : "rgba(92, 64, 51, 0.3)"
    }`,
    transition: "all 0.3s ease",
    ...(isHacker && {
      animation: `${glow} 2s ease-in-out infinite`,
    }),
    "&:hover": {
      background: isHacker
        ? isDark
          ? "rgba(0, 255, 65, 0.2)"
          : "rgba(26, 92, 26, 0.2)"
        : isDark
          ? "rgba(212, 165, 116, 0.2)"
          : "rgba(92, 64, 51, 0.15)",
      transform: "translateY(-2px)",
      boxShadow: isHacker
        ? isDark
          ? "0 10px 40px rgba(0, 255, 65, 0.3)"
          : "0 10px 40px rgba(26, 92, 26, 0.2)"
        : isDark
          ? "0 10px 40px rgba(212, 165, 116, 0.2)"
          : "0 10px 40px rgba(92, 64, 51, 0.15)",
    },
  };
});

export const FloatingParticle = styled(Box, {
  shouldForwardProp: (prop) => prop !== "delay" && prop !== "variant",
})<{ delay?: number; variant: "hacker" | "literary" }>(({ theme, delay = 0, variant }) => {
  const isHacker = variant === "hacker";
  const isDark = theme.palette.mode === "dark";
  return {
    position: "absolute",
    width: isHacker ? 4 : 6,
    height: isHacker ? 4 : 6,
    borderRadius: isHacker ? "0" : "50%",
    background: isHacker ? (isDark ? "#00ff41" : "#1a5c1a") : isDark ? "#d4a574" : "#8B7355",
    opacity: 0.4,
    animation: `${particleFloat} ${8 + delay * 2}s linear infinite`,
    animationDelay: `${delay}s`,
    pointerEvents: "none",
    left: `${10 + ((delay * 10) % 80)}%`,
  };
});

export const LottieContainer = styled(Box)(({ theme }) => ({
  position: "absolute",
  width: 200,
  height: 200,
  opacity: 0.3,
  pointerEvents: "none",
  [theme.breakpoints.up("md")]: {
    width: 300,
    height: 300,
  },
}));

export const HackerLottiePosition = styled(LottieContainer)({
  bottom: "10%",
  right: "5%",
  opacity: 0.2,
});

export const LiteraryLottiePosition = styled(LottieContainer)({
  top: "15%",
  left: "5%",
  opacity: 0.25,
});

export const ButtonContainer = styled(Box, {
  shouldForwardProp: (prop) => prop !== "variant",
})<{ variant: "hacker" | "literary" }>(({ variant }) => ({
  display: "flex",
  justifyContent: variant === "literary" ? "center" : "flex-start",
  position: "relative",
  zIndex: 1,
}));
