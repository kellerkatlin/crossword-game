import { create } from "zustand";
import { Cell, Clue, Direction, CellPosition } from "../types";

export interface CrosswordState {
  grid: Cell[][]; // el grid que se va a usar para el crucigrama
  clues: Clue[]; // las pistas que se van a usar para el crucigrama
  selectedCell: CellPosition | null; // la celda seleccionada por el usuario
  activeDirection: Direction; // la direccion activa (horizontal o vertical)
  setGrid: (grid: Cell[][]) => void; // funcion para setear el grid
  setClues: (clues: Clue[]) => void; // funcion para setear las pistas
  setSelectedCell: (position: CellPosition) => void; // funcion para setear la celda seleccionada
  setActiveDirection: (direction: Direction) => void; // funcion para setear la direccion activa
  updateCellInput: (row: number, col: number, value: string) => void; // funcion para setear el input de la celda seleccionada
  validateClue: (clueId: number) => void; // funcion para validar la pista seleccionada
}

/**
 * Hook para manejar el estado del crucigrama.
 * Proporciona funciones para setear el grid, las pistas, la celda seleccionada y la dirección activa.
 * También proporciona funciones para actualizar el input de la celda seleccionada y validar la pista seleccionada.
 * 
 * @returns {CrosswordState} El estado del crucigrama y las funciones para manejarlo.
 
 * */

// Validando la existencia misma de una palabra

export const useCrosswordStore = create<CrosswordState>((set) => ({
  grid: [], // el grid que se va a usar para el crucigrama

  clues: [], // las pistas que se van a usar para el crucigrama

  selectedCell: null, // la celda seleccionada por el usuario

  activeDirection: "across", // la direccion activa (horizontal o vertical)

  setGrid: (grid) => set({ grid }), // funcion para setear el grid

  setClues: (clues) => set({ clues }), // funcion para setear las pistas

  setSelectedCell: (position) => set({ selectedCell: position }), // funcion para setear la celda seleccionada

  setActiveDirection: (direction) => set({ activeDirection: direction }), // funcion para setear la direccion activa

  // Funcion para setear el input de la celda seleccionada
  updateCellInput: (row, col, value) =>
    set((state) => {
      const updatedGrid = [...state.grid];
      updatedGrid[row][col] = {
        ...updatedGrid[row][col],
        userInput: value.toUpperCase(),
      };
      return { grid: updatedGrid };
    }),

  // Funcion para validar la pista seleccionada
  validateClue: (clueId: number) =>
    set((state) => {
      const clue = state.clues.find((c) => c.id === clueId);

      if (!clue) return {};

      const { direction, answer, start } = clue;

      let userWord = "";

      for (let i = 0; i < answer.length; i++) {
        const row = direction === "across" ? start.row : start.row + i; // obtiene la fila correspondiente

        const col = direction === "across" ? start.col + i : start.col; // obtiene la columna correspondiente

        const cell = state.grid[row]?.[col]; // obtiene la celda correspondiente

        userWord += cell?.userInput ?? ""; // si la celda no existe, se agrega una cadena vacía
      }

      const isCorrect = userWord.toUpperCase() === answer.toUpperCase();

      const updatedClues = state.clues.map((c) =>
        c.id === clueId ? { ...c, isCorrect } : c
      );

      return { clues: updatedClues };
    }),
}));
