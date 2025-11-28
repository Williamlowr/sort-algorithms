import React from "react";
import { Algorithms } from "./types";
import { clamp } from "./utils";
import { MIN_SPEED_MS, MAX_SPEED_MS, MIN_SIZE, MAX_SIZE } from "./constants";

export default function Controls(props: {
  algorithm: Algorithms;
  setAlgorithm: (algorithm: Algorithms) => void;
  size: number;
  setSize: (number: number) => void;
  speed: number;
  setSpeed: (number: number) => void;
  onGenerate: () => void;
  onSort: () => void;
  disabled?: boolean;
}) {
  const {
    algorithm,
    setAlgorithm,
    size,
    setSize,
    speed,
    setSpeed,
    onGenerate,
    onSort,
    disabled,
  } = props;

  const [sizeText, setSizeText] = React.useState(String(size));

  function commitSize() {
    let n = parseInt(sizeText, 10);
    if (isNaN(n)) n = MIN_SIZE;
    n = clamp(n, MIN_SIZE, MAX_SIZE);
    setSize(n);
    setSizeText(String(n));
  }

  const [speedText, setSpeedText] = React.useState(String(speed));

  function commitSpeed() {
    let n = parseInt(speedText, 10);
    if (isNaN(n)) n = MIN_SPEED_MS;
    n = clamp(n, MIN_SPEED_MS, MAX_SPEED_MS);
    setSpeed(n);
    setSpeedText(String(n));
  }

  return (
    <div className="grid gap-3 grid-cols-4">
      <label className="flex items-center gap-2">
        <span className="w-20 text-lg text-white">Algorithm:</span>
        <select
          value={algorithm}
          onChange={(e) => setAlgorithm(e.target.value as Algorithms)}
          className="flex-1 rounded-md border border-zinc-700 bg-zinc-200 px-2 py-1"
        >
          <option value="insertion">Insertion</option>
          <option value="bubble">Bubble</option>
          <option value="selection">Selection</option>
          <option value="merge">Merge</option>
          <option value="quick">Quick</option>
          <option value="heap">Heap</option>
        </select>
      </label>

      <label className="flex items-center gap-3 pl-8 pr-12">
        <span className=" w-20 text-md whitespace-nowrap text-white">
          Size (5-128):
        </span>
        <input
          type="number"
          min={MIN_SIZE}
          max={MAX_SIZE}
          value={sizeText}
          onChange={(e) => setSizeText(e.target.value)}
          onBlur={commitSize}
          onKeyDown={(e) => e.key === "Enter" && commitSize()}
          className="flex-1 rounded-md border border-zinc-700 bg-zinc-200 px-2 py-1"
        />
      </label>

      <label className="flex items-center gap-2 pl-4 pr-8">
        <span className="text-md whitespace-nowrap text-white">
          Delay (5-256ms):
        </span>
        <input
          type="number"
          min={MIN_SPEED_MS}
          max={MAX_SPEED_MS}
          value={speedText}
          onChange={(e) => setSpeedText(e.target.value)}
          onBlur={commitSpeed}
          onKeyDown={(e) => e.key === "Enter" && commitSpeed()}
          className="flex-1 rounded-md border border-zinc-700 bg-zinc-200 px-2 py-1"
        />
      </label>

      <div className="flex items-center gap-2 pl-12">
        <button
          onClick={onGenerate}
          className="rounded-md border border-zinc-600 px-3 py-1 bg-zinc-900 text-zinc-200 hover:bg-zinc-800 overflow-hidden"
          disabled={disabled}
        >
          Generate
        </button>
        <button
          onClick={onSort}
          className="rounded-md border border-green-900 bg-green-500 text-zinc-900 px-3 py-1 hover:bg-green-600 overflow-hidden"
          disabled={disabled}
        >
          Sort
        </button>
      </div>
    </div>
  );
}
