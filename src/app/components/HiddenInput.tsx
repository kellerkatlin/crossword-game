"use client";

import { useEffect, useRef } from "react";
import { useCrosswordStore } from "../features/crossword/store/crosswrodStore";
import { useActiveClue } from "../features/crossword/hooks/useActiveClue";
import { handleCharacterInput } from "../features/crossword/utils/handlerCharacterInput";

export const HiddenInput = () => {
  const inputRef = useRef<HTMLInputElement>(null);

  const selectedCell = useCrosswordStore((s) => s.selectedCell);
  const updateCellInput = useCrosswordStore((s) => s.updateCellInput);
  const setSelectedCell = useCrosswordStore((s) => s.setSelectedCell);
  const validateClue = useCrosswordStore((s) => s.validateClue);
  const activeDirection = useCrosswordStore((s) => s.activeDirection);
  const grid = useCrosswordStore((s) => s.grid);

  const clue = useActiveClue();

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
        handleCharacterInput({
          value,
          selectedCell,
          grid,
          activeDirection,
          updateCellInput,
          setSelectedCell,
          validateClue,
          clueId: clue?.id,
        });
        e.target.value = "";
      }}
    />
  );
};
