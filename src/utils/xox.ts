export type CellValue = "X" | "O" | null;
export type Board = CellValue[];
export type GameResult = "X" | "O" | "draw" | null;

const WIN_COMBOS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
] as const;

export const createEmptyBoard = (): Board => Array<CellValue>(9).fill(null);

export const getWinningCombo = (board: Board): readonly number[] | null => {
  for (const combo of WIN_COMBOS) {
    const [a, b, c] = combo;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return combo;
    }
  }
  return null;
};

export const checkWinner = (board: Board): GameResult => {
  const combo = getWinningCombo(board);
  if (combo) return board[combo[0]] as "X" | "O";
  if (board.every((cell) => cell !== null)) return "draw";
  return null;
};

export const getAvailableMoves = (board: Board): number[] =>
  board.reduce<number[]>((moves, cell, i) => {
    if (cell === null) moves.push(i);
    return moves;
  }, []);

const minimax = (board: Board, isMaximizing: boolean, depth: number): number => {
  const result = checkWinner(board);
  if (result === "O") return 10 - depth;
  if (result === "X") return depth - 10;
  if (result === "draw") return 0;

  const moves = getAvailableMoves(board);

  if (isMaximizing) {
    let best = -Infinity;
    for (const move of moves) {
      board[move] = "O";
      best = Math.max(best, minimax(board, false, depth + 1));
      board[move] = null;
    }
    return best;
  }

  let best = Infinity;
  for (const move of moves) {
    board[move] = "X";
    best = Math.min(best, minimax(board, true, depth + 1));
    board[move] = null;
  }
  return best;
};

export const getBotMove = (board: Board): number => {
  const available = getAvailableMoves(board);
  if (available.length === 0) return -1;

  // ~30% chance the bot makes a random move for beatable gameplay
  if (Math.random() < 0.3) {
    return available[Math.floor(Math.random() * available.length)];
  }

  let bestScore = -Infinity;
  let bestMove = available[0];

  for (const move of available) {
    board[move] = "O";
    const score = minimax(board, false, 0);
    board[move] = null;

    if (score > bestScore) {
      bestScore = score;
      bestMove = move;
    }
  }

  return bestMove;
};

export const pickRandomMessage = (messages: readonly string[]): string =>
  messages[Math.floor(Math.random() * messages.length)];
