import React from "react";
import clsx from "clsx";
import { Cell as CellType } from "../features/crossword/types";

interface CellProps {
  readonly cell: CellType;
  readonly isSelected?: boolean;
  readonly isHighlighted?: boolean;
  readonly onClick?: () => void;
  readonly isCorrect?: boolean;
}

export default function Cell({
  cell,
  isSelected,
  onClick,
  isHighlighted,
  isCorrect,
}: CellProps) {
  const { isBlack, clueNumber, letter, userInput } = cell;
  return (
    <div
      onClick={onClick}
      className={clsx(
        "relative w-10 h-10 border border-gray-300 flex items-center justify-center text-lg font-bold cursor-pointer",
        {
          "bg-black": cell.isBlack,
          "bg-green-200": isCorrect && !cell.isBlack,
          "bg-yellow-200": isSelected && !isCorrect && !cell.isBlack,
          "bg-blue-100":
            isHighlighted && !isSelected && !isCorrect && !cell.isBlack,
          "bg-white":
            !isHighlighted && !isSelected && !isCorrect && !cell.isBlack,
          "text-black": cell.isBlack,
        }
      )}
    >
      {!isBlack && clueNumber && (
        <div className="absolute top-0 left-0 text-[0.5rem] p-1 text-gray-600">
          {userInput}
        </div>
      )}
      {!isBlack && letter && (
        <div className="absolute top-0 left-0 text-[0.7rem] p-1 text-black">
          {letter}
        </div>
      )}
      {!isBlack && <span className="text-xs ">{cell.userInput}</span>}
    </div>
  );
}
