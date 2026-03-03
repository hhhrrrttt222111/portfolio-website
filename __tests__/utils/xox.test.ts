import {
  createEmptyBoard,
  getWinningCombo,
  checkWinner,
  getAvailableMoves,
  getBotMove,
  pickRandomMessage,
  type Board,
} from "@/utils/xox";

describe("createEmptyBoard", () => {
  it("returns an array of 9 nulls", () => {
    const board = createEmptyBoard();
    expect(board).toHaveLength(9);
    expect(board.every((c) => c === null)).toBe(true);
  });

  it("returns a new array each time", () => {
    const a = createEmptyBoard();
    const b = createEmptyBoard();
    expect(a).not.toBe(b);
  });
});

describe("getWinningCombo", () => {
  it("returns null for an empty board", () => {
    expect(getWinningCombo(createEmptyBoard())).toBeNull();
  });

  it("detects a top-row win", () => {
    const board: Board = ["X", "X", "X", null, null, null, null, null, null];
    expect(getWinningCombo(board)).toEqual([0, 1, 2]);
  });

  it("detects a middle-row win", () => {
    const board: Board = [null, null, null, "O", "O", "O", null, null, null];
    expect(getWinningCombo(board)).toEqual([3, 4, 5]);
  });

  it("detects a column win", () => {
    const board: Board = ["X", null, null, "X", null, null, "X", null, null];
    expect(getWinningCombo(board)).toEqual([0, 3, 6]);
  });

  it("detects a diagonal win (top-left to bottom-right)", () => {
    const board: Board = ["O", null, null, null, "O", null, null, null, "O"];
    expect(getWinningCombo(board)).toEqual([0, 4, 8]);
  });

  it("detects an anti-diagonal win", () => {
    const board: Board = [null, null, "X", null, "X", null, "X", null, null];
    expect(getWinningCombo(board)).toEqual([2, 4, 6]);
  });

  it("returns null when no winner yet", () => {
    const board: Board = ["X", "O", "X", null, null, null, null, null, null];
    expect(getWinningCombo(board)).toBeNull();
  });
});

describe("checkWinner", () => {
  it("returns null for an empty board", () => {
    expect(checkWinner(createEmptyBoard())).toBeNull();
  });

  it("returns 'X' when X wins", () => {
    const board: Board = ["X", "X", "X", "O", "O", null, null, null, null];
    expect(checkWinner(board)).toBe("X");
  });

  it("returns 'O' when O wins", () => {
    const board: Board = ["X", "X", null, "O", "O", "O", "X", null, null];
    expect(checkWinner(board)).toBe("O");
  });

  it("returns 'draw' when board is full with no winner", () => {
    const board: Board = ["X", "O", "X", "X", "O", "O", "O", "X", "X"];
    expect(checkWinner(board)).toBe("draw");
  });

  it("returns null for an in-progress game", () => {
    const board: Board = ["X", "O", null, null, "X", null, null, null, null];
    expect(checkWinner(board)).toBeNull();
  });
});

describe("getAvailableMoves", () => {
  it("returns all indices for an empty board", () => {
    expect(getAvailableMoves(createEmptyBoard())).toEqual([0, 1, 2, 3, 4, 5, 6, 7, 8]);
  });

  it("returns empty array for a full board", () => {
    const board: Board = ["X", "O", "X", "X", "O", "O", "O", "X", "X"];
    expect(getAvailableMoves(board)).toEqual([]);
  });

  it("returns only null indices", () => {
    const board: Board = ["X", null, "O", null, "X", null, null, "O", null];
    expect(getAvailableMoves(board)).toEqual([1, 3, 5, 6, 8]);
  });
});

describe("getBotMove", () => {
  beforeEach(() => {
    jest.spyOn(Math, "random").mockReturnValue(0.5);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("returns -1 for a full board", () => {
    const board: Board = ["X", "O", "X", "X", "O", "O", "O", "X", "X"];
    expect(getBotMove(board)).toBe(-1);
  });

  it("returns a valid index", () => {
    const board: Board = ["X", null, null, null, "O", null, null, null, null];
    const move = getBotMove(board);
    expect(move).toBeGreaterThanOrEqual(0);
    expect(move).toBeLessThan(9);
    expect(board[move]).toBeNull();
  });

  it("takes the winning move when available", () => {
    const board: Board = [null, null, null, null, "O", null, null, null, "O"];
    const move = getBotMove([...board]);
    expect(move).toBe(0);
  });

  it("blocks X from winning", () => {
    const board: Board = ["X", "X", null, "O", null, null, null, null, null];
    const move = getBotMove([...board]);
    expect(move).toBe(2);
  });

  it("makes a random move when Math.random < 0.3", () => {
    jest.spyOn(Math, "random").mockReturnValue(0.1);
    const board: Board = ["X", null, null, null, "O", null, null, null, null];
    const move = getBotMove([...board]);
    const available = getAvailableMoves(board);
    expect(available).toContain(move);
  });
});

describe("pickRandomMessage", () => {
  it("returns a message from the array", () => {
    const messages = ["hello", "world", "test"];
    const result = pickRandomMessage(messages);
    expect(messages).toContain(result);
  });

  it("works with a single-item array", () => {
    expect(pickRandomMessage(["only"])).toBe("only");
  });
});
