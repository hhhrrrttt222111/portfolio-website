import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import WifiOffIcon from "@mui/icons-material/WifiOff";
import ReplayIcon from "@mui/icons-material/Replay";
import { useTheme } from "@mui/material/styles";
import {
  createEmptyBoard,
  checkWinner,
  getWinningCombo,
  getBotMove,
  pickRandomMessage,
  type Board,
  type CellValue,
  type GameResult,
} from "@/utils";
import { WIN_MESSAGES, LOSE_MESSAGES, DRAW_MESSAGES } from "@/constants";

const CELL_COLORS = {
  X: { light: "#2e7d32", dark: "#66bb6a" },
  O: { light: "#c62828", dark: "#ef5350" },
} as const;

const OfflineFallback = () => {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";

  const [board, setBoard] = useState<Board>(createEmptyBoard);
  const [result, setResult] = useState<GameResult>(null);
  const [winCombo, setWinCombo] = useState<readonly number[] | null>(null);
  const [snackbar, setSnackbar] = useState<{
    open: boolean;
    message: string;
    severity: "success" | "error" | "info";
  }>({ open: false, message: "", severity: "info" });
  const [score, setScore] = useState({ wins: 0, losses: 0, draws: 0 });
  const [botThinking, setBotThinking] = useState(false);

  const showSnackbar = useCallback((message: string, severity: "success" | "error" | "info") => {
    setSnackbar({ open: true, message, severity });
  }, []);

  const handleResult = useCallback(
    (gameResult: GameResult) => {
      if (!gameResult) return;
      setResult(gameResult);

      if (gameResult === "X") {
        setScore((s) => ({ ...s, wins: s.wins + 1 }));
        showSnackbar(pickRandomMessage(WIN_MESSAGES), "success");
      } else if (gameResult === "O") {
        setScore((s) => ({ ...s, losses: s.losses + 1 }));
        showSnackbar(pickRandomMessage(LOSE_MESSAGES), "error");
      } else {
        setScore((s) => ({ ...s, draws: s.draws + 1 }));
        showSnackbar(pickRandomMessage(DRAW_MESSAGES), "info");
      }
    },
    [showSnackbar],
  );

  const doBotMove = useCallback(
    (currentBoard: Board) => {
      setBotThinking(true);
      const delay = 400 + Math.random() * 400;

      setTimeout(() => {
        const move = getBotMove([...currentBoard]);
        if (move === -1) {
          setBotThinking(false);
          return;
        }

        const next = [...currentBoard] as Board;
        next[move] = "O";
        setBoard(next);
        setBotThinking(false);

        const combo = getWinningCombo(next);
        if (combo) setWinCombo(combo);
        handleResult(checkWinner(next));
      }, delay);
    },
    [handleResult],
  );

  const handleCellClick = useCallback(
    (index: number) => {
      if (board[index] || result || botThinking) return;

      const next = [...board] as Board;
      next[index] = "X";
      setBoard(next);

      const combo = getWinningCombo(next);
      if (combo) {
        setWinCombo(combo);
        handleResult(checkWinner(next));
        return;
      }

      const gameResult = checkWinner(next);
      if (gameResult) {
        handleResult(gameResult);
        return;
      }

      doBotMove(next);
    },
    [board, result, botThinking, handleResult, doBotMove],
  );

  const resetGame = useCallback(() => {
    setBoard(createEmptyBoard());
    setResult(null);
    setWinCombo(null);
  }, []);

  const getCellColor = (value: CellValue) => {
    if (!value) return "transparent";
    return isDark ? CELL_COLORS[value].dark : CELL_COLORS[value].light;
  };

  const isWinCell = (index: number) => winCombo?.includes(index) ?? false;

  return (
    <Stack
      alignItems="center"
      justifyContent="center"
      spacing={3}
      sx={{
        minHeight: "100vh",
        bgcolor: "background.default",
        color: "text.primary",
        textAlign: "center",
        px: 3,
        py: 4,
      }}
    >
      {/* Header */}
      <Stack direction="row" alignItems="center" spacing={1.5}>
        <WifiOffIcon sx={{ fontSize: 28, color: "text.secondary" }} />
        <Typography variant="h6" sx={{ fontWeight: 600, color: "text.secondary" }}>
          You&apos;re offline
        </Typography>
      </Stack>

      <Typography variant="h3" sx={{ fontWeight: 800, letterSpacing: 2 }}>
        <Box component="span" sx={{ color: CELL_COLORS.X[isDark ? "dark" : "light"] }}>
          X
        </Box>{" "}
        vs{" "}
        <Box component="span" sx={{ color: CELL_COLORS.O[isDark ? "dark" : "light"] }}>
          O
        </Box>
      </Typography>

      <Typography variant="body2" sx={{ color: "text.secondary" }}>
        You are <strong>X</strong>. Beat the bot while you wait!
      </Typography>

      {/* Scoreboard */}
      <Stack direction="row" spacing={4}>
        {[
          { label: "Wins", value: score.wins, color: "primary.main" },
          { label: "Draws", value: score.draws, color: "text.secondary" },
          { label: "Losses", value: score.losses, color: "error.main" },
        ].map((stat) => (
          <Stack key={stat.label} alignItems="center">
            <Typography variant="h5" sx={{ fontWeight: 700, color: stat.color }}>
              {stat.value}
            </Typography>
            <Typography variant="caption" sx={{ color: "text.secondary", fontWeight: 600 }}>
              {stat.label}
            </Typography>
          </Stack>
        ))}
      </Stack>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: 1.5,
          width: "100%",
          maxWidth: 340,
        }}
      >
        {board.map((cell, i) => (
          <motion.div
            key={i}
            whileHover={!cell && !result ? { scale: 1.05 } : {}}
            whileTap={!cell && !result ? { scale: 0.95 } : {}}
          >
            <Box
              onClick={() => handleCellClick(i)}
              sx={{
                aspectRatio: "1",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                bgcolor: isWinCell(i)
                  ? isDark
                    ? "rgba(102, 187, 106, 0.15)"
                    : "rgba(46, 125, 50, 0.1)"
                  : "background.paper",
                borderRadius: 3,
                cursor: !cell && !result ? "pointer" : "default",
                border: 2,
                borderColor: isWinCell(i) ? "primary.main" : "divider",
                transition: "all 0.2s ease",
                "&:hover": {
                  ...(!cell &&
                    !result && {
                      borderColor: "primary.light",
                      bgcolor: isDark ? "rgba(102, 187, 106, 0.05)" : "rgba(46, 125, 50, 0.04)",
                    }),
                },
              }}
            >
              <AnimatePresence mode="wait">
                {cell && (
                  <motion.div
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    exit={{ scale: 0 }}
                    transition={{
                      type: "spring",
                      stiffness: 260,
                      damping: 20,
                    }}
                  >
                    <Typography
                      variant="h3"
                      sx={{
                        fontWeight: 800,
                        color: getCellColor(cell),
                        lineHeight: 1,
                        userSelect: "none",
                      }}
                    >
                      {cell}
                    </Typography>
                  </motion.div>
                )}
              </AnimatePresence>
            </Box>
          </motion.div>
        ))}
      </Box>

      <Stack spacing={2} alignItems="center" sx={{ minHeight: 80 }}>
        <AnimatePresence mode="wait">
          {result && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
            >
              <Typography variant="h6" sx={{ fontWeight: 700 }}>
                {result === "X" && "You won! 🎉"}
                {result === "O" && "Bot wins! 🤖"}
                {result === "draw" && "It's a draw! 🤝"}
              </Typography>
            </motion.div>
          )}
          {!result && botThinking && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <Typography variant="body2" sx={{ color: "text.secondary" }}>
                Bot is thinking...
              </Typography>
            </motion.div>
          )}
        </AnimatePresence>

        <Button
          variant="outlined"
          startIcon={<ReplayIcon />}
          onClick={resetGame}
          sx={{
            borderRadius: 50,
            textTransform: "none",
            fontWeight: 600,
            px: 4,
          }}
        >
          {result ? "Play Again" : "Reset"}
        </Button>
      </Stack>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={() => setSnackbar((s) => ({ ...s, open: false }))}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={() => setSnackbar((s) => ({ ...s, open: false }))}
          severity={snackbar.severity}
          variant="filled"
          sx={{ width: "100%", fontWeight: 600, borderRadius: 3 }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Stack>
  );
};

export default OfflineFallback;
