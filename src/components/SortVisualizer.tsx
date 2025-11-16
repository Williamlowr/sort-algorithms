import React, { useMemo, useState } from "react";
import Bars from "./Bars";
import Controls from "./Controls";
import { useSortEngine } from "./useSortEngine";
import { makeArray } from "./utils";
import { Algorithms } from "./types";
import { DEFAULT_ALGO, DEFAULT_SIZE, DEFAULT_SPEED_MS } from "./constants";

export default function SortVisualizer() {
  const [algorithm, setAlgorithm] = useState<Algorithms>(DEFAULT_ALGO);
  const [size, setSize] = useState<number>(DEFAULT_SIZE);
  const [speed, setSpeed] = useState<number>(DEFAULT_SPEED_MS);

  const [seed, setSeed] = useState<number>(0);
  const initial = useMemo(() => makeArray(size), [seed, size]);

  const { view, setArray, play } = useSortEngine(initial);

  const regen = () => setSeed((s) => s + 1);
  const start = () => play(algorithm, speed);

  // keep engine array in sync when size changes or we regenerate
  React.useEffect(() => setArray(initial), [initial, setArray]);

  return (
    <div className="w-full max-w-4xl mx-auto p-4 mt-16 bg-slate-800/60 bg-gradient-to-r from-slate-700/20 to-slate-800/60 rounded-2xl border border-zinc-800">
      <h2 className="text-xl font-semibold text-black ">
        Sort Algorithm Visualizer
      </h2>
      <h3 className="text-md font-medium mb-2 text-black">
        Made as a demo for my portfolio site{" "}
        <a
          href="https://william-lowrimore.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-400 hover:text-blue-200"
        >
          (https://william-lowrimore.com/)
        </a>
      </h3>
      <Controls
        algorithm={algorithm}
        setAlgorithm={setAlgorithm}
        size={size}
        setSize={setSize}
        speed={speed}
        setSpeed={setSpeed}
        onGenerate={regen}
        onSort={start}
        disabled={view.isSorting}
      />

      <div className="mt-2">
        <Bars values={view.array} active={view.active} />
      </div>

      {/* Live stats bar at the bottom */}
      <div className="mt-3 text-xs w-fit mx-auto">
        <div className="flex flex-wrap items-center gap-2 rounded-md border border-zinc-300 bg-zinc-900 px-3 py-2">
          <span className="text-zinc-200">Operations:</span>
          <span className="inline-flex items-center gap-1 rounded px-2 py-0.5 bg-sky-500/30 text-sky-200 border border-sky-400/70">
            <span className="w-2 h-2 rounded-full bg-sky-400" />
            Compares:{" "}
            <strong className="tabular-nums">{view.stats.compares}</strong>
          </span>

          {algorithm === "merge" ? (
            <span className="inline-flex items-center gap-1 rounded px-2 py-0.5 bg-fuchsia-500/30 text-fuchsia-200 border border-fuchsia-400/70">
              <span className="w-2 h-2 rounded-full bg-fuchsia-400" />
              Writes: <strong className="tabular-nums">{view.stats.writes}</strong>
            </span>
          ) : (
            <span className="inline-flex items-center gap-1 rounded px-2 py-0.5 bg-fuchsia-500/30 text-fuchsia-200 border border-fuchsia-400/70">
              <span className="w-2 h-2 rounded-full bg-fuchsia-400" />
              Swaps: <strong className="tabular-nums">{view.stats.swaps}</strong>
            </span>
          )}

          <span className="inline-flex items-center gap-1 rounded px-2 py-0.5 bg-emerald-500/30 text-emerald-200 border border-emerald-500/30">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            Pivots:{" "}
            <strong className="tabular-nums">{view.stats.pivots}</strong>
          </span>
        </div>
      </div>
    </div>
  );
}
