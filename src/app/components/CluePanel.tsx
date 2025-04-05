"use client";

import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { useActiveClue } from "../features/crossword/hooks/useActiveClue";
import { useCrosswordStore } from "../features/crossword/store/crosswrodStore";

export const CluePanel = () => {
  const clue = useActiveClue();
  const clues = useCrosswordStore((s) => s.clues);
  const setSelectedCell = useCrosswordStore((s) => s.setSelectedCell);
  const setActiveDirection = useCrosswordStore((s) => s.setActiveDirection);

  if (!clue || clues.length === 0) return null;

  // Ordenamos pistas primero across, luego down
  const sortedClues = [...clues].sort((a, b) => {
    if (a.direction === b.direction) return a.number - b.number;
    return a.direction === "across" ? -1 : 1;
  });
  // Encontramos el índice actual
  const currentIndex = sortedClues.findIndex((c) => c.id === clue.id);

  const goToClue = (index: number) => {
    const nextClue = sortedClues[index];
    if (!nextClue) return;

    setSelectedCell({
      row: nextClue.start.row,
      col: nextClue.start.col,
    });

    setActiveDirection(nextClue.direction);
  };
  return (
    <div className="mt-4 p-3 w-full flex items-center   justify-between border rounded bg-gray-50 shadow-sm">
      <button
        onClick={() => goToClue(currentIndex - 1)}
        disabled={currentIndex === 0}
        className="text-gray-500 cursor-pointer hover:text-black disabled:opacity-30 shrink-0 mr-2"
      >
        <IoIosArrowBack size={20} />
      </button>
      <div className="flex-1 ">
        <p className="text-sm text-gray-500 uppercase">{clue.direction}</p>
        <p className="text-md font-semibold">
          {clue.number}. {clue.text}
        </p>
      </div>

      <button
        onClick={() => goToClue(currentIndex + 1)}
        disabled={currentIndex === sortedClues.length - 1}
        className="text-gray-500 cursor-pointer hover:text-black disabled:opacity-30 shrink-0 ml-2"
      >
        <IoIosArrowForward size={20} />
      </button>
    </div>
  );
};
