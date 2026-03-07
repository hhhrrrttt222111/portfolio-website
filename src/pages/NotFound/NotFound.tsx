import { useState, useCallback, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import HomeIcon from "@mui/icons-material/Home";
import {
  NotFoundRoot,
  ErrorCode,
  ErrorMessage,
  ErrorDescription,
  HomeButton,
  HomeLink,
  GameContainer,
  GameTitle,
  GameArea,
  ScoreDisplay,
  ScoreText,
  TimerText,
  GameInstructions,
  HighScoreText,
  StartButton,
  GameOverOverlay,
  GameOverText,
  FinalScoreText,
  BallStyled,
} from "./NotFound.styles";

type GameState = "idle" | "playing" | "ended";

const GAME_DURATION = 15;
const BALL_SIZE = 40;
const STORAGE_KEY = "notfound-highscore";

const NotFound = () => {
  const navigate = useNavigate();
  const gameAreaRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const [gameState, setGameState] = useState<GameState>("idle");
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(GAME_DURATION);
  const [ballPosition, setBallPosition] = useState({ x: 200, y: 100 });
  const [highScore, setHighScore] = useState(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? parseInt(saved, 10) : 0;
    }
    return 0;
  });

  const getRandomPosition = useCallback(() => {
    if (!gameAreaRef.current) return { x: 200, y: 100 };

    const rect = gameAreaRef.current.getBoundingClientRect();
    const padding = BALL_SIZE;
    const x = padding + Math.random() * (rect.width - padding * 2);
    const y = padding + Math.random() * (rect.height - padding * 2);

    return { x, y };
  }, []);

  const startGame = useCallback(() => {
    setGameState("playing");
    setScore(0);
    setTimeLeft(GAME_DURATION);
    setBallPosition(getRandomPosition());
  }, [getRandomPosition]);

  const endGame = useCallback(() => {
    setGameState("ended");
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }

    if (score > highScore) {
      setHighScore(score);
      localStorage.setItem(STORAGE_KEY, score.toString());
    }
  }, [score, highScore]);

  const handleBallClick = useCallback(() => {
    if (gameState !== "playing") return;

    setScore((prev) => prev + 1);
    setBallPosition(getRandomPosition());
  }, [gameState, getRandomPosition]);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.code === "Space" || e.key === " ") {
        e.preventDefault();
        if (gameState === "idle" || gameState === "ended") {
          startGame();
        }
      }
    },
    [gameState, startGame],
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  useEffect(() => {
    if (gameState === "playing") {
      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            endGame();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [gameState, endGame]);

  const handleNavigateHome = () => {
    navigate("/");
  };

  return (
    <NotFoundRoot>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <ErrorCode variant="h1" aria-label="Error 404">
          404
        </ErrorCode>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <ErrorMessage variant="h2">Page Not Found</ErrorMessage>
        <ErrorDescription>
          The page you&apos;re looking for doesn&apos;t exist or has been moved. While you&apos;re
          here, why not play a quick game?
        </ErrorDescription>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        <HomeLink to="/" aria-label="Go back to home page">
          <HomeButton variant="contained" startIcon={<HomeIcon />} onClick={handleNavigateHome}>
            Back to Home
          </HomeButton>
        </HomeLink>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
      >
        <GameContainer>
          <GameTitle>Catch the Ball</GameTitle>

          <GameArea
            ref={gameAreaRef}
            role="application"
            aria-label="Ball catching game area"
            tabIndex={0}
          >
            <AnimatePresence mode="wait">
              {gameState === "idle" && (
                <motion.div
                  key="start"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  style={{
                    position: "absolute",
                    inset: 0,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <StartButton onClick={startGame} aria-label="Start game">
                    Start Game
                  </StartButton>
                </motion.div>
              )}

              {gameState === "playing" && (
                <motion.div
                  key="ball"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                >
                  <BallStyled
                    x={ballPosition.x}
                    y={ballPosition.y}
                    onClick={handleBallClick}
                    role="button"
                    aria-label={`Click to catch ball. Current score: ${score}`}
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        handleBallClick();
                      }
                    }}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  />
                </motion.div>
              )}

              {gameState === "ended" && (
                <motion.div
                  key="gameover"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <GameOverOverlay>
                    <GameOverText>Time&apos;s Up!</GameOverText>
                    <FinalScoreText>Final Score: {score}</FinalScoreText>
                    {score > 0 && score >= highScore && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", stiffness: 500, damping: 15 }}
                      >
                        <HighScoreText>🎉 New High Score!</HighScoreText>
                      </motion.div>
                    )}
                    <StartButton
                      onClick={startGame}
                      sx={{ position: "relative", mt: 2 }}
                      aria-label="Play again"
                    >
                      Play Again
                    </StartButton>
                  </GameOverOverlay>
                </motion.div>
              )}
            </AnimatePresence>
          </GameArea>

          <ScoreDisplay>
            <ScoreText>
              Score: <span>{score}</span>
            </ScoreText>
            <TimerText>Time: {timeLeft}s</TimerText>
          </ScoreDisplay>

          {highScore > 0 && <HighScoreText>High Score: {highScore}</HighScoreText>}

          <GameInstructions>
            Click the ball as many times as you can in {GAME_DURATION} seconds! Press Space to
            start.
          </GameInstructions>
        </GameContainer>
      </motion.div>
    </NotFoundRoot>
  );
};

export default NotFound;
