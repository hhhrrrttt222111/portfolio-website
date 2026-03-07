import { styled, keyframes } from "@mui/material/styles";
import { Box } from "@mui/material";

const pulse = keyframes`
  0%, 100% {
    transform: scale(1);
    opacity: 1;
  }
  50% {
    transform: scale(1.2);
    opacity: 0.7;
  }
`;

const orbit = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

const glow = keyframes`
  0%, 100% {
    box-shadow: 0 0 20px currentColor, 0 0 40px currentColor, 0 0 60px currentColor;
  }
  50% {
    box-shadow: 0 0 30px currentColor, 0 0 60px currentColor, 0 0 90px currentColor;
  }
`;

export const LoaderRoot = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  minHeight: "100vh",
  backgroundColor: theme.palette.background.default,
  gap: theme.spacing(4),
}));

export const NetworkContainer = styled(Box)({
  position: "relative",
  width: 120,
  height: 120,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});

export const CenterNode = styled(Box)(({ theme }) => ({
  width: 24,
  height: 24,
  borderRadius: "50%",
  backgroundColor: theme.palette.primary.main,
  animation: `${pulse} 2s ease-in-out infinite`,
  zIndex: 2,
  color: theme.palette.primary.main,
  boxShadow: `0 0 20px ${theme.palette.primary.main}, 0 0 40px ${theme.palette.primary.main}`,
}));

export const OrbitRing = styled(Box)<{ delay?: number; size: number; duration: number }>(
  ({ theme, delay = 0, size, duration }) => ({
    position: "absolute",
    width: size,
    height: size,
    borderRadius: "50%",
    border: `2px solid transparent`,
    borderTopColor: theme.palette.primary.light,
    borderRightColor: theme.palette.primary.main,
    animation: `${orbit} ${duration}s linear infinite`,
    animationDelay: `${delay}s`,
    opacity: 0.6,
  }),
);

export const OrbitNode = styled(Box)<{ angle: number; distance: number; delay: number }>(
  ({ theme, angle, distance, delay }) => ({
    position: "absolute",
    width: 10,
    height: 10,
    borderRadius: "50%",
    backgroundColor: theme.palette.secondary.main,
    transform: `rotate(${angle}deg) translateX(${distance}px)`,
    animation: `${pulse} 1.5s ease-in-out infinite`,
    animationDelay: `${delay}s`,
    color: theme.palette.secondary.main,
    "&::after": {
      content: '""',
      position: "absolute",
      inset: -2,
      borderRadius: "50%",
      animation: `${glow} 2s ease-in-out infinite`,
      animationDelay: `${delay}s`,
    },
  }),
);

export const ConnectionLine = styled("svg")(({ theme }) => ({
  position: "absolute",
  width: "100%",
  height: "100%",
  pointerEvents: "none",
  "& line": {
    stroke: theme.palette.primary.main,
    strokeWidth: 1,
    opacity: 0.3,
  },
}));

export const LoadingText = styled(Box)(({ theme }) => ({
  fontFamily: theme.typography.fontFamily,
  fontSize: "1rem",
  fontWeight: 500,
  color: theme.palette.text.secondary,
  letterSpacing: "0.1em",
  textTransform: "uppercase",
}));

export const ProgressBar = styled(Box)(({ theme }) => ({
  width: 200,
  height: 4,
  backgroundColor:
    theme.palette.mode === "dark" ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.1)",
  borderRadius: 2,
  overflow: "hidden",
  position: "relative",
}));

const progressAnimation = keyframes`
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(100%);
  }
`;

export const ProgressFill = styled(Box)(({ theme }) => ({
  position: "absolute",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  background: `linear-gradient(90deg, transparent, ${theme.palette.primary.main}, transparent)`,
  animation: `${progressAnimation} 1.5s ease-in-out infinite`,
}));
