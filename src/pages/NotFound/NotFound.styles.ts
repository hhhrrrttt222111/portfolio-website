import { styled, keyframes } from "@mui/material/styles";
import { Box, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const float = keyframes`
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
`;

const glitch = keyframes`
  0%, 100% {
    text-shadow: 2px 0 currentColor, -2px 0 currentColor;
  }
  25% {
    text-shadow: -2px 0 currentColor, 2px 0 currentColor;
  }
  50% {
    text-shadow: 2px 2px currentColor, -2px -2px currentColor;
  }
  75% {
    text-shadow: -2px 2px currentColor, 2px -2px currentColor;
  }
`;

export const NotFoundRoot = styled(Box)(({ theme }) => ({
  minHeight: "100vh",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: theme.palette.background.default,
  padding: theme.spacing(3),
  gap: theme.spacing(3),
  textAlign: "center",
}));

export const ErrorCode = styled(Typography)(({ theme }) => ({
  fontSize: "clamp(6rem, 20vw, 12rem)",
  fontWeight: 800,
  lineHeight: 1,
  color: theme.palette.primary.main,
  animation: `${float} 3s ease-in-out infinite`,
  textShadow: `0 0 40px ${theme.palette.primary.main}40`,
  "&:hover": {
    animation: `${glitch} 0.3s ease-in-out infinite`,
  },
}));

export const ErrorMessage = styled(Typography)(({ theme }) => ({
  fontSize: "clamp(1.25rem, 3vw, 1.75rem)",
  fontWeight: 600,
  color: theme.palette.text.primary,
  marginBottom: theme.spacing(1),
}));

export const ErrorDescription = styled(Typography)(({ theme }) => ({
  fontSize: "1rem",
  color: theme.palette.text.secondary,
  maxWidth: 400,
  marginBottom: theme.spacing(2),
}));

export const HomeButton = styled(Button)(({ theme }) => ({
  borderRadius: 50,
  padding: theme.spacing(1.5, 4),
  fontWeight: 600,
  textTransform: "none",
  fontSize: "1rem",
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.mode === "dark" ? "#0a1a0f" : "#ffffff",
  "&:hover": {
    backgroundColor: theme.palette.primary.dark,
    transform: "translateY(-2px)",
    boxShadow: `0 8px 24px ${theme.palette.primary.main}40`,
  },
  transition: "all 0.3s ease",
}));

export const HomeLink = styled(Link)({
  textDecoration: "none",
});

export const GameContainer = styled(Box)(({ theme }) => ({
  width: "100%",
  maxWidth: 400,
  marginTop: theme.spacing(2),
}));

export const GameTitle = styled(Typography)(({ theme }) => ({
  fontSize: "0.875rem",
  fontWeight: 600,
  color: theme.palette.text.secondary,
  marginBottom: theme.spacing(1),
  textTransform: "uppercase",
  letterSpacing: "0.1em",
}));

export const GameArea = styled(Box)(({ theme }) => ({
  position: "relative",
  width: "100%",
  height: 200,
  backgroundColor: theme.palette.background.paper,
  borderRadius: Number(theme.shape.borderRadius) * 2,
  border: `2px solid ${theme.palette.divider}`,
  overflow: "hidden",
  cursor: "pointer",
  userSelect: "none",
  touchAction: "none",
}));

export const Ball = styled(Box)<{ x: number; y: number }>(({ theme, x, y }) => ({
  position: "absolute",
  width: 40,
  height: 40,
  borderRadius: "50%",
  backgroundColor: theme.palette.primary.main,
  boxShadow: `0 0 20px ${theme.palette.primary.main}, 0 0 40px ${theme.palette.primary.main}40`,
  left: x,
  top: y,
  transform: "translate(-50%, -50%)",
  transition: "all 0.1s ease-out",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  "&:hover": {
    transform: "translate(-50%, -50%) scale(1.1)",
  },
  "&:active": {
    transform: "translate(-50%, -50%) scale(0.9)",
  },
}));

export const BallStyled = styled(motion.div)<{ x: number; y: number }>(({ theme, x, y }) => ({
  position: "absolute",
  width: 40,
  height: 40,
  borderRadius: "50%",
  backgroundColor: theme.palette.primary.main,
  boxShadow: `0 0 20px ${theme.palette.primary.main}, 0 0 40px ${theme.palette.primary.main}40`,
  left: x,
  top: y,
  transform: "translate(-50%, -50%)",
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

export const ScoreDisplay = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginTop: theme.spacing(1.5),
  padding: theme.spacing(1, 2),
  backgroundColor: theme.palette.background.paper,
  borderRadius: theme.shape.borderRadius,
  border: `1px solid ${theme.palette.divider}`,
}));

export const ScoreText = styled(Typography)(({ theme }) => ({
  fontSize: "0.875rem",
  fontWeight: 600,
  color: theme.palette.text.primary,
  "& span": {
    color: theme.palette.primary.main,
    fontWeight: 700,
  },
}));

export const TimerText = styled(Typography)(({ theme }) => ({
  fontSize: "0.875rem",
  fontWeight: 600,
  color: theme.palette.text.secondary,
}));

export const GameInstructions = styled(Typography)(({ theme }) => ({
  fontSize: "0.75rem",
  color: theme.palette.text.secondary,
  marginTop: theme.spacing(1),
}));

export const HighScoreText = styled(Typography)(({ theme }) => ({
  fontSize: "0.75rem",
  fontWeight: 600,
  color: theme.palette.secondary.main,
  marginTop: theme.spacing(0.5),
}));

export const StartButton = styled(Button)(({ theme }) => ({
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  borderRadius: 50,
  padding: theme.spacing(1, 3),
  fontWeight: 600,
  textTransform: "none",
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.mode === "dark" ? "#0a1a0f" : "#ffffff",
  "&:hover": {
    backgroundColor: theme.palette.primary.dark,
  },
}));

export const GameOverOverlay = styled(Box)(({ theme }) => ({
  position: "absolute",
  inset: 0,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  backgroundColor:
    theme.palette.mode === "dark" ? "rgba(10, 26, 15, 0.9)" : "rgba(241, 248, 233, 0.9)",
  gap: theme.spacing(1),
}));

export const GameOverText = styled(Typography)(({ theme }) => ({
  fontSize: "1.5rem",
  fontWeight: 700,
  color: theme.palette.text.primary,
}));

export const FinalScoreText = styled(Typography)(({ theme }) => ({
  fontSize: "1rem",
  color: theme.palette.primary.main,
  fontWeight: 600,
}));
