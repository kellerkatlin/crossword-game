export type Direction = "across" | "down";

export interface CellPosition {
  row: number;
  col: number;
}

export interface Cell {
  position: CellPosition;
  solution: string | null;
  userInput: string | null;
  isBlack: boolean;
  clueNumber?: number;
  letter?: string | null;
  clues?: {
    across?: number;
    down?: number;
  };
}

export interface Clue {
  id: number;
  direction: Direction;
  number: number;
  text: string;
  answer: string;
  start: CellPosition;
  isCorrect?: boolean;
}
