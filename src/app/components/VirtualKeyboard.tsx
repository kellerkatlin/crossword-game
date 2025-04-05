"use client";

import { useEffect } from "react";
import { useCrosswordStore } from "../features/crossword/store/crosswrodStore";
import { useActiveClue } from "../features/crossword/hooks/useActiveClue";
import { handleCharacterInput } from "../features/crossword/utils/handlerCharacterInput";

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
      // 👉 Previene que se duplique si el foco está en un input
      if (document.activeElement?.tagName === "INPUT") return;

      if (!selectedCell || grid.length === 0) return;

      const { row, col } = selectedCell;

      if (e.key === "Backspace") {
        updateCellInput(row, col, "");
        return;
      }

      handleCharacterInput({
        value: e.key,
        selectedCell,
        grid,
        activeDirection,
        updateCellInput,
        setSelectedCell,
        validateClue,
        clueId: clue?.id,
      });
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
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
