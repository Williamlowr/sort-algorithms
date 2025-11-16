import type { Step, AlgoGenerator } from "../types";

export const selection: AlgoGenerator = function* (arr) {
  const array = arr.slice();

  // For each element in the array
  for (let i = 0; i < array.length - 1; i++) {
    // Assume the minimum is the first element
    let min = i;
    // Test against elements after i to find the smallest
    for (let j = i + 1; j < array.length; j++) {
      // Compare with the current minimum
      yield { type: "compare", i: min, j } satisfies Step;
      // Update minimum if current element is smaller
      if (array[j] < array[min]) min = j;
    }
    // If the minimum is not the position of i,
    if (min !== i) {
      // Swap them
      [array[i], array[min]] = [array[min], array[i]];
      // Yield and swap; visualize swaps
      yield { type: "swap", i, j: min } satisfies Step;
    }
  }
  // Yield the final sorted array
  yield { type: "done" };
  return array;
};
