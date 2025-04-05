"use client";

import { useEffect, useState } from "react";
import crosswordData from "../app/data/default-crossword.json";
import { useCrosswordStore } from "./features/crossword/store/crosswrodStore";
import { Clue, Direction } from "./features/crossword/types";
import { CluePanel } from "./components/CluePanel";
import CrosswordGrid from "./components/CrosswordGrid";
import VirtualKeyboard from "./components/VirtualKeyboard";
import { IoCloseSharp } from "react-icons/io5";
import clsx from "clsx";
import { HiddenInput } from "./components/HiddenInput";

export default function HomePage() {
  const [started, setStarted] = useState(false);
  const [finished, setFinished] = useState(false);
  const grid = useCrosswordStore((s) => s.grid);
  const setGrid = useCrosswordStore((state) => state.setGrid);
  const setClues = useCrosswordStore((state) => state.setClues);
  const setSelectedCell = useCrosswordStore((state) => state.setSelectedCell);
  const setActiveDirection = useCrosswordStore(
    (state) => state.setActiveDirection
  );

  // useEffect para verificar si todas las celdas están llenas
  useEffect(() => {
    const gridState = useCrosswordStore.getState().grid;

    const allFilled = gridState.every((row) =>
      row.every((cell) => {
        if (cell.isBlack) return true; // ignorar celdas negras
        return !!cell.userInput; // verificar si hay un valor en userInput
      })
    );

    if (allFilled && gridState.length > 0) {
      setFinished(true);
    }
  }, [grid]);

  // useEffect para inicializar el crucigrama despues de 10 segundos
  useEffect(() => {
    const timer = setTimeout(() => {
      setStarted(true);
    }, 5000);

    return () => clearTimeout(timer);
  }, [setStarted]);

  // useEffect para inicializar el crucigrama
  useEffect(() => {
    if (!started) return;
    const { grid, clues } = crosswordData;

    //  Aquí nace el caos organizado del crucigrama
    //  by Keller Pinedo: constructor de cuadrículas, soñador de palabras

    const parsedGrid = grid.map((row: string[], rowIndex: number) =>
      row.map((cell, colIndex) => ({
        position: { row: rowIndex, col: colIndex },
        solution: cell === "#" ? null : "",
        userInput: null,
        isBlack: cell === "#",
        letter: cell === "#" ? null : cell,
      }))
    );

    // Normalizar las pistas
    const normalizedClues: Clue[] = clues.map((clue) => ({
      ...clue,
      direction: clue.direction as Direction,
    }));

    setGrid(parsedGrid);

    setClues(normalizedClues);

    // Establecer la celda seleccionada inicial y la dirección activa
    const firstClue = normalizedClues.find((clue) => clue.id === 1);

    if (firstClue) {
      setSelectedCell({
        row: firstClue.start.row,
        col: firstClue.start.col,
      });
      setActiveDirection(firstClue.direction);
    }
  }, [setGrid, started, setClues, setSelectedCell, setActiveDirection]);
  const isMobile =
    typeof window !== "undefined" &&
    /Mobi|Android/i.test(window.navigator.userAgent);

  return (
    <main className="min-h-screen bg-gray-100">
      <div
        className={clsx(
          "flex relative flex-col p-6  items-center w-full min-h-screen h-full",
          "md:max-w-sm md:mx-auto md:justify-center  md:rounded md:shadow-md",
          started && !finished ? "bg-white" : "bg-[#5981B3]"
        )}
      >
        {finished ? (
          <div className="flex flex-col items-center justify-center h-full gap-4">
            <img
              src="/exit_text.png"
              alt="Crucigrama"
              className="size-96 object-contain md:-mt-52 z-50"
            />
            <img
              src="/exit_gif.gif"
              alt="Loading animation"
              className="size-64 -mt-44 object-contain"
            />
            <a
              href="https://perubn.com/"
              target="_blank"
              className="px-8 py-1 bg-white font-semibold text-base text-[#5981B3] mt-6 cursor-pointer  rounded-2xl   transition"
              rel="noopener noreferrer"
            >
              Get the App
            </a>
          </div>
        ) : !started ? (
          <>
            <div className="flex flex-col items-center justify-center h-full gap-4">
              <img
                src="/start_text.png"
                alt="Crucigrama"
                className="size-96 object-contain md:-mt-52 z-50"
              />
              <img
                src="/start_gif.gif"
                alt="Loading animation"
                className="size-64 -mt-44 object-contain"
              />

              <button
                onClick={() => setStarted(true)}
                className="px-8 py-1 bg-white font-semibold text-base text-[#5981B3] mt-6 cursor-pointer  rounded-2xl   transition"
              >
                Play
              </button>
            </div>
          </>
        ) : (
          <>
            <div className=" absolute top-3  right-3">
              <a
                href="https://perubn.com/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <IoCloseSharp className="size-6" />
              </a>
            </div>

            <div className=" text-[#5981B3] mb-2 underline decoration-[0.5px] ">
              <a
                href="https://perubn.com/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Get the App
              </a>
            </div>

            <div className="relative w-full flex flex-col items-center gap-4">
              <div className="z-10">
                <CrosswordGrid />
              </div>

              <div className="absolute top-7/12 mt-2 left-0 w-full">
                <CluePanel />
              </div>

              <div className="pt-28 w-full">
                <VirtualKeyboard />
              </div>
            </div>
          </>
        )}
        {isMobile && started && !finished && <HiddenInput />}
      </div>
    </main>
  );
}
