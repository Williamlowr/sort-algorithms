import type { Step, AlgoGenerator } from "../types";

export const bubble: AlgoGenerator = function* (arr) {
  const array = arr.slice();
  const n = array.length;

  // For each element in the array
  for (let i = 0; i < n - 1; i++) {
    let swapped = false;
    // Compare adjacent elements
    for (let j = 0; j < n - 1 - i; j++) {
      // Yield and compare; visualize comparisons
      yield { type: "compare", i: j, j: j + 1 } satisfies Step;
      // If out of order,
      if (array[j] > array[j + 1]) {
        // Swap them
        [array[j], array[j + 1]] = [array[j + 1], array[j]];
        // Yield and swap; visualize swaps
        yield { type: "swap", i: j, j: j + 1 } satisfies Step;
        swapped = true;
      }
    }
    if (!swapped) break;
  }
  // Yield the final sorted array
  yield { type: "done" };
  return array;
};
