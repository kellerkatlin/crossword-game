"use client";

import { useCrosswordStore } from "../features/crossword/store/crosswrodStore";
import { useActiveClueCells } from "../features/crossword/hooks/useActiveClueCells";
import Cell from "./Cell";
import { useActiveClue } from "../features/crossword/hooks/useActiveClue";

export default function CrosswordGrid() {
  const grid = useCrosswordStore((state) => state.grid);
  const activeClueCells = useActiveClueCells();
  const activeClue = useActiveClue();
  const selectedCell = useCrosswordStore((state) => state.selectedCell);
  const setSelectedCell = useCrosswordStore((state) => state.setSelectedCell);
  const activeDirection = useCrosswordStore((state) => state.activeDirection);

  const setActiveDirection = useCrosswordStore(
    (state) => state.setActiveDirection
  );

  if (grid.length === 0) return <p>Cargando...</p>;

  return (
    <div className="inline-block border border-gray-500  ">
      {grid.map((row, rowIndex) => (
        <div key={rowIndex} className="flex">
          {row.map((cell, colIndex) => {
            const isHighlighted = activeClueCells.some(
              (pos) => pos.row === rowIndex && pos.col === colIndex
            );
            const isPartOfCorrectWord =
              activeClue?.isCorrect &&
              activeClueCells.some(
                (pos) => pos.row === rowIndex && pos.col === colIndex
              );

            const isSelected =
              selectedCell?.row === rowIndex && selectedCell?.col === colIndex;

            return (
              <Cell
                key={`${rowIndex}-${colIndex}`}
                cell={cell}
                isSelected={isSelected}
                isHighlighted={isHighlighted}
                isCorrect={isPartOfCorrectWord}
                onClick={() => {
                  if (cell.isBlack) return;

                  if (
                    selectedCell?.row === rowIndex &&
                    selectedCell?.col === colIndex
                  ) {
                    setActiveDirection(
                      activeDirection === "across" ? "down" : "across"
                    );
                  } else {
                    setSelectedCell({ row: rowIndex, col: colIndex });
                  }
                }}
              />
            );
          })}
        </div>
      ))}
    </div>
  );
}
