import { useCallback, useMemo, useRef, useState } from "react";
import type { Algorithms, Step } from "./types";
import { ALGORITHMS } from "./Algorithms";
import { sleep } from "./utils";

export type EngineState = {
  array: number[];
  active: {
    i?: number;
    j?: number;
    pivot?: number;
    operation?: "compare" | "swap" | "write" | "pivot";
  };
  isSorting: boolean;
  stats: { compares: number; swaps: number; writes: number; pivots: number };
};

export function useSortEngine(initial: number[]) {
  const [array, setArray] = useState<number[]>(initial);
  const [isSorting, setIsSorting] = useState(false);

  const active = useRef<{
    i?: number;
    j?: number;
    pivot?: number;
    operation?: "compare" | "swap" | "write" | "pivot";
  }>({});
  const [stats, setStats] = useState({
    compares: 0,
    swaps: 0,
    writes: 0,
    pivots: 0,
  });

  const view = useMemo<EngineState>(
    () => ({
      array,
      active: { ...active.current },
      isSorting,
      stats,
    }),
    [array, isSorting, stats]
  );

   const play = useCallback(
    async (algorithm: Algorithms, speedMs: number) => {
      if (isSorting) return;
      setIsSorting(true);

      setStats({ compares: 0, swaps: 0, writes: 0, pivots: 0 });
      active.current = {};

      const gen = ALGORITHMS[algorithm](array);
      let currentPivot: number | undefined = undefined;

      for (let step = gen.next(); !step.done; step = gen.next()) {
        const s = step.value as Step;

        if (s.type === "compare") {
          active.current = {
            i: s.i,
            j: s.j,
            pivot: currentPivot,
            operation: "compare",
          };
          setStats((p) => ({ ...p, compares: p.compares + 1 }));
        } else if (s.type === "swap") {
          active.current = {
            i: s.i,
            j: s.j,
            pivot: currentPivot,
            operation: "swap",
          };
          setStats((p) => ({ ...p, swaps: p.swaps + 1 }));
          
          await sleep(speedMs);
          
          setArray((prev) => {
            const a = prev.slice();
            [a[s.i], a[s.j]] = [a[s.j], a[s.i]];
            return a;
          });
          
          active.current = { pivot: currentPivot };

          continue;
        } else if (s.type === "write") {
          setArray((prev) => {
            const a = prev.slice();
            a[s.i] = s.value;
            return a;
          });
          active.current = { i: s.i, pivot: currentPivot, operation: "write" };
          setStats((p) => ({
            ...p,
            writes: p.writes + 1,
          }));
        } else if (s.type === "pivot") {
          currentPivot = s.i;
          active.current = { pivot: currentPivot, operation: "pivot" };
          setStats((p) => ({ ...p, pivots: p.pivots + 1 }));
        }

        await sleep(speedMs);
      }

      active.current = {};
      setIsSorting(false);
    },
    [array, isSorting]
  );

  return { view, setArray, play, setIsSorting } as const;
}
