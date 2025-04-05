import { useCrosswordStore } from "../store/crosswrodStore";

/**
 *
 * @returns {Clue | null} Devuelve la pista activa o null si no hay ninguna.
 * @description Este hook se utiliza para obtener la pista activa en función de la celda seleccionada y la dirección activa del crucigrama.
 *
 */
export const useActiveClue = () => {
  const clues = useCrosswordStore((s) => s.clues); // Aqui se obtiene la lista de pistas del crucigrama

  const selectedCell = useCrosswordStore((s) => s.selectedCell); // Aquí se obtiene la celda seleccionada actualmente

  const activeDirection = useCrosswordStore((s) => s.activeDirection); // Aquí se obtiene la dirección activa (horizontal o vertical)

  if (!selectedCell) return null; // Si no hay celda seleccionada, devuelve null

  const { row, col } = selectedCell;

  const clue = clues.find((clue) => {
    if (clue.direction !== activeDirection) return false; // Verifica si la dirección de la pista coincide con la dirección activa
    const { start, answer } = clue;

    // Verifica si la celda seleccionada está dentro del rango de la pista
    // dependiendo de si es horizontal o vertical
    if (clue.direction === "across") {
      return (
        row === start.row && col >= start.col && col < start.col + answer.length
      );
    } else {
      return (
        col === start.col && row >= start.row && row < start.row + answer.length
      );
    }
  });
  return clue ?? null;
};
