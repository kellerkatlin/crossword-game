"use client";

import { useEffect } from "react";
import { useCrosswordStore } from "../features/crossword/store/crosswrodStore";
import { useActiveClue } from "../features/crossword/hooks/useActiveClue";

//  Si estás aquí es porque el usuario presionó una tecla...

// Hook para manejar el teclado virtual

/**
 *
 * @returns {JSX.Element} El teclado virtual
 *
 * @description Este componente maneja el teclado virtual del crucigrama.
 * Cuando el usuario presiona una tecla, se actualiza la celda seleccionada y se valida la pista.
 * También se encarga de manejar el evento de retroceso (Backspace) para borrar el valor de la celda seleccionada.
 *
 */
export default function VirtualKeyboard() {
  const grid = useCrosswordStore((s) => s.grid);
  const selectedCell = useCrosswordStore((s) => s.selectedCell);
  const activeDirection = useCrosswordStore((s) => s.activeDirection);
  const updateCellInput = useCrosswordStore((s) => s.updateCellInput);
  const setSelectedCell = useCrosswordStore((s) => s.setSelectedCell);
  const validateClue = useCrosswordStore((s) => s.validateClue);

  const clue = useActiveClue();

  // un efecto para manejar el teclado virtual
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!selectedCell || grid.length === 0) return;

      const { row, col } = selectedCell;

      if (e.key === "Backspace") {
        updateCellInput(row, col, "");
        return;
      }

      if (/^[a-zA-Z]$/.test(e.key)) {
        updateCellInput(row, col, e.key);

        // Validar si ya está completa
        if (clue) validateClue(clue.id);

        // Mover a la siguiente celda en la dirección activa
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
      }
    };

    window.addEventListener("keydown", handleKeyDown); // Agregar el evento de teclado
    return () => window.removeEventListener("keydown", handleKeyDown); // Limpiar el evento al desmontar el componente
  }, [
    selectedCell,
    grid,
    activeDirection,
    updateCellInput,
    setSelectedCell,
    validateClue,
    clue,
  ]);

  return null;
}
