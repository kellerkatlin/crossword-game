"use client";

import { useEffect, useRef } from "react";
import { useCrosswordStore } from "../features/crossword/store/crosswrodStore";

export const HiddenInput = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const selectedCell = useCrosswordStore((s) => s.selectedCell);
  const updateCellInput = useCrosswordStore((s) => s.updateCellInput);

  useEffect(() => {
    if (selectedCell && inputRef.current) {
      inputRef.current.focus();
    }
  }, [selectedCell]);

  return (
    <input
      ref={inputRef}
      type="text"
      maxLength={1}
      inputMode="text"
      autoFocus
      className="absolute opacity-0 pointer-events-none w-0 h-0"
      onChange={(e) => {
        const value = e.target.value;
        if (!selectedCell) return;

        if (/^[a-zA-Z]$/.test(value)) {
          updateCellInput(selectedCell.row, selectedCell.col, value);

          // limpia el input para la siguiente letra
          e.target.value = "";
        }
      }}
    />
  );
};
