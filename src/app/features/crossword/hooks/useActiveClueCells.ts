import { useCrosswordStore } from "../store/crosswrodStore";
import { CellPosition } from "../types";

/**
 * Hook para obtener las celdas activas de la pista seleccionada.
 * Devuelve un array de objetos con las posiciones de las celdas activas.
 * @returns {CellPosition[]} Array de objetos con las posiciones de las celdas activas.
 */
export const useActiveClueCells = (): CellPosition[] => {
  const clue = useCrosswordStore((s) => {
    const selectedCell = s.selectedCell; // La celda seleccionada por el usuario

    const direction = s.activeDirection;

    return s.clues.find((clue) => {
      if (!selectedCell || clue.direction !== direction) return false;

      const { start, answer } = clue;

      if (clue.direction === "across") {
        return (
          selectedCell.row === start.row &&
          selectedCell.col >= start.col &&
          selectedCell.col < start.col + answer.length
        );
      } else {
        return (
          selectedCell.col === start.col &&
          selectedCell.row >= start.row &&
          selectedCell.row < start.row + answer.length
        );
      }
    });
  });

  if (!clue) return [];

  const cells: CellPosition[] = [];

  const { start, answer, direction } = clue;

  for (let i = 0; i < answer.length; i++) {
    if (direction === "across") {
      cells.push({ row: start.row, col: start.col + i });
    } else {
      cells.push({ row: start.row + i, col: start.col });
    }
  }

  return cells;
};
