import { CrosswordState } from "../store/crosswrodStore";
import { CellPosition } from "../types";

interface HandleInputProps {
  value: string;
  selectedCell: CellPosition | null;
  grid: CrosswordState["grid"];
  activeDirection: "across" | "down";
  updateCellInput: CrosswordState["updateCellInput"];
  setSelectedCell: CrosswordState["setSelectedCell"];
  validateClue: CrosswordState["validateClue"];
  clueId?: number;
}

export const handleCharacterInput = ({
  value,
  selectedCell,
  grid,
  activeDirection,
  updateCellInput,
  setSelectedCell,
  validateClue,
  clueId,
}: HandleInputProps) => {
  if (!selectedCell) return;
  if (!/^[a-zA-Z]$/.test(value)) return;

  const letter = value.toUpperCase();
  const { row, col } = selectedCell;

  updateCellInput(row, col, letter);
  if (clueId) validateClue(clueId);

  let nextRow = row;
  let nextCol = col;

  if (activeDirection === "across") {
    nextCol++;
  } else {
    nextRow++;
  }

  const nextCell = grid[nextRow]?.[nextCol];

  if (nextCell && !nextCell.isBlack) {
    setSelectedCell({ row: nextRow, col: nextCol });
  }
};
